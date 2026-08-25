import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { method, to, message } = body as {
      method?: 'call' | 'phone'
      to?: string
      message?: string
    }

    if (!method || !to || !message) {
      return NextResponse.json({ ok: false, error: 'Faltan campos' }, { status: 400 })
    }

    if (method === 'call' || method === 'phone') {
      return NextResponse.json({
        ok: true,
        provider: 'device-call',
        instruction: 'La llamada se realiza desde el dispositivo con tel:<numero>.',
        to,
        message,
      })
    }

    return NextResponse.json({ ok: false, error: 'Solo se soportan llamadas telefónicas.' }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 })
  }
}
