# Configuración de envío automático de alertas

Este documento explica cómo configurar y probar el envío automático de alertas (SMS, WhatsApp y correo) desde la aplicación.

## Dependencias

Instala las dependencias añadidas:

```bash
pnpm install twilio nodemailer
# o con npm
npm install twilio nodemailer
```

## Variables de entorno necesarias

Crea un archivo `.env.local` en la raíz con las variables necesarias según el proveedor que vayas a usar.

Para Twilio (SMS y WhatsApp):

```
TWILIO_ACCOUNT_SID=tu_account_sid
TWILIO_AUTH_TOKEN=tu_auth_token
TWILIO_PHONE_NUMBER=+1234567890        # para SMS (desde Twilio)
TWILIO_WHATSAPP_FROM=whatsapp:+1415XXXXXXX # por ejemplo 'whatsapp:+1415XXXXXXX'
```

Para WhatsApp con Twilio debes usar un número habilitado por Twilio. En desarrollo puedes usar el sandbox de WhatsApp de Twilio y el remitente con el prefijo `whatsapp:`.

Ejemplo de pasos rápidos para WhatsApp con Twilio:
1. Entra en tu consola de Twilio.
2. Activa el sandbox de WhatsApp.
3. Copia el número de remitente que te da Twilio, por ejemplo `whatsapp:+1415XXXXXXX`.
4. Usa ese valor en `TWILIO_WHATSAPP_FROM`.

Si el backend no está configurado, el modo automático mostrará un error y el mensaje no se enviará sin interacción.

Para envío de correo por SMTP (Gmail):

```
MAIL_USER=tu.email@gmail.com
MAIL_PASS=tu_app_password_o_smtp_password
```

Notas:
- Para Gmail puedes usar una "App Password" si tienes 2FA activado. Alternativamente, configura OAuth2 y ajusta `app/api/alert/route.ts`.
- Para WhatsApp con Twilio puedes usar el sandbox de Twilio (sigue la documentación de Twilio). El número remitente para WhatsApp suele tener el prefijo `whatsapp:`.

## Probar localmente

1. Instala dependencias.
2. Añade `.env.local` con las variables arriba.
3. Ejecuta la app en modo desarrollo:

```bash
pnpm dev
# o
npm run dev
```

4. Abre la app, pulsa `No estoy bien` → `Enviar alerta`. Marca "Enviar automáticamente" y completa destinatario y mensaje.

5. Pulsa "Enviar alerta". El botón usará la API `POST /api/alert` para enviar el mensaje.

## Qué hace la API

La ruta `app/api/alert/route.ts` envía:
- SMS o WhatsApp vía Twilio (requiere `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN` y número remitente).
- Correo vía SMTP (requiere `MAIL_USER` y `MAIL_PASS`).

La función responde JSON con `{ ok: true }` o `{ ok: false, error: '...' }`.

## Siguientes pasos (opcionales)

- Usar la API de WhatsApp Cloud (Meta) en vez de Twilio.
- Implementar envío por Gmail API con OAuth2 para evitar usar contraseñas.
- Añadir validación y guardado de contactos en la app.
