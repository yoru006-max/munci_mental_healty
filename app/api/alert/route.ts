import { NextResponse } from 'next/server'

// Nota: requiere instalar `twilio` y `nodemailer` y configurar variables de entorno.

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { method, to, subject, message } = body as {
      method: 'sms' | 'whatsapp' | 'email'
      to: string
      subject?: string
      message: string
    }

    if (!method || !to || !message) {
      return NextResponse.json({ ok: false, error: 'Faltan campos' }, { status: 400 })
    }

    // Envío vía Twilio para SMS/WhatsApp
    if (method === 'sms' || method === 'whatsapp') {
      const accountSid = process.env.TWILIO_ACCOUNT_SID ?? process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID
      const authToken = process.env.TWILIO_AUTH_TOKEN ?? process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN
      const fromNumber = process.env.TWILIO_PHONE_NUMBER ?? process.env.NEXT_PUBLIC_TWILIO_PHONE_NUMBER
      const whatsappFrom = process.env.TWILIO_WHATSAPP_FROM ?? process.env.NEXT_PUBLIC_TWILIO_WHATSAPP_FROM

      if (!accountSid || !authToken) {
        return NextResponse.json({ ok: false, error: 'Twilio no configurado. Revisa TWILIO_ACCOUNT_SID y TWILIO_AUTH_TOKEN.' }, { status: 500 })
      }

      const twilioModule = await import('twilio')
      const client = typeof twilioModule === 'function'
        ? twilioModule(accountSid, authToken)
        : twilioModule.default
          ? twilioModule.default(accountSid, authToken)
          : twilioModule(accountSid, authToken)

      const cleanTo = method === 'whatsapp' ? `whatsapp:${to.replace(/^whatsapp:/, '')}` : to
      const from = method === 'whatsapp'
        ? whatsappFrom || (fromNumber ? `whatsapp:${fromNumber.replace(/^whatsapp:/, '')}` : undefined)
        : fromNumber

      if (!from) {
        return NextResponse.json({ ok: false, error: `Número remitente Twilio no configurado. Usa ${method === 'whatsapp' ? 'TWILIO_WHATSAPP_FROM' : 'TWILIO_PHONE_NUMBER'}.` }, { status: 500 })
      }

      const resp = await client.messages.create({
        from,
        to: cleanTo,
        body: message,
      })

      return NextResponse.json({ ok: true, provider: 'twilio', sid: resp.sid })
    }

    // Envío por correo usando nodemailer (SMTP)
    if (method === 'email') {
      const nodemailer = await import('nodemailer')

      const user = process.env.MAIL_USER
      const pass = process.env.MAIL_PASS

      if (!user || !pass) {
        return NextResponse.json({ ok: false, error: 'Mail no configurado' }, { status: 500 })
      }

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user,
          pass,
        },
      })

      const mailOptions = {
        from: user,
        to,
        subject: subject || 'Necesito apoyo',
        text: message,
      }

      const info = await transporter.sendMail(mailOptions)
      return NextResponse.json({ ok: true, provider: 'smtp', info })
    }

    return NextResponse.json({ ok: false, error: 'Método no soportado' }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 })
  }
}
