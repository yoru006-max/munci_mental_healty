#!/bin/bash

# Script para hacer commit de cambios del sistema de PIN

cd /workspaces/v0-mental-wellness-app

git add .

git commit -m "✨ feat: Sistema completo de privacidad y seguridad con PIN/contraseña

Implementación de sistema de protección de funciones sensibles:

🔐 Funcionalidades principales:
- Creación de PIN de 4-8 dígitos
- Autenticación con PIN para acceder a funciones protegidas
- Bloqueo temporal (15 min) después de 5 intentos fallidos
- Almacenamiento local con hash (sin servidores)
- Componente reutilizable para proteger cualquier contenido
- UI intuitiva y amigable

📁 Nuevos archivos:
- lib/security.ts - Funciones de seguridad
- hooks/usePin.ts - Hook personalizado
- components/pin-setup.tsx - UI para crear/cambiar PIN
- components/pin-lock.tsx - Pantalla de desbloqueo
- components/protected-content.tsx - Wrapper reutilizable
- components/pin-indicator.tsx - Badge indicador
- app/config/security/page.tsx - Página de seguridad
- docs/security-pin.md - Documentación técnica
- docs/QUICK-START.md - Guía rápida

🛡️ Funciones protegidas:
- Diario privado
- Contactos de emergencia

📝 Modificaciones en archivos existentes:
- app/config/page.tsx
- app/diary/page.tsx
- app/config/contacts/page.tsx"

git log --oneline -1
