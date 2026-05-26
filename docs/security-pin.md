# Sistema de Seguridad y PIN de Munci

## Descripción General

El sistema de seguridad y PIN de Munci permite a los usuarios proteger funciones sensibles de la aplicación con una contraseña numérica personalizada. Esto es especialmente importante para aquellos que comparten dispositivos o desean una capa adicional de privacidad.

## Características

### ✅ Funcionalidades Principales

1. **Creación de PIN**: Los usuarios pueden crear un PIN de 4-8 dígitos
2. **Confirmación de PIN**: Verificación de PIN antes de acceder a contenido protegido
3. **Protección de Contenido**: Las siguientes funciones están protegidas:
   - Mi Diario (entradas personales)
   - Contactos de Emergencia
   - Historial Emocional (futuro)

4. **Seguridad**:
   - Almacenamiento local con hash (Base64)
   - Bloqueo temporal después de 5 intentos fallidos (15 minutos)
   - Contador de intentos fallidos
   - Sin transmisión de datos a servidores

## Uso

### Configurar PIN

1. Ve a **Configuración** → **Privacidad y Seguridad**
2. Haz clic en **"Configurar PIN"**
3. Ingresa un PIN de 4-8 dígitos (solo números)
4. Confirma el PIN ingresándolo nuevamente
5. ¡Listo! Tu PIN está activo

### Cambiar o Eliminar PIN

1. Ve a **Configuración** → **Privacidad y Seguridad**
2. Haz clic en **"Cambiar PIN"** o **"Eliminar PIN"**
3. Sigue las instrucciones en pantalla

### Acceder a Contenido Protegido

Cuando intentes acceder a una función protegida (como el Diario):

1. Se abrirá la pantalla de desbloqueo con PIN
2. Ingresa tu PIN
3. Si es correcto, accederás al contenido
4. Si es incorrecto, aparecerá un mensaje de error
5. Después de 5 intentos fallidos, la app se bloqueará por 15 minutos

## Privacidad y Seguridad

- **Almacenamiento Local**: Todo se almacena localmente en tu dispositivo. No se envía a servidores.
- **Anónimo**: No requiere crear una cuenta. Puedes usar Munci completamente anónimo.
- **Encriptación**: Los PINs se almacenan usando hash en Base64 (en producción usar bcrypt).
- **Sin Cookies de Rastreo**: No hay seguimiento de usuario.

## Componentes del Sistema

### 1. `lib/security.ts`
Funciones principales para gestión de PIN:
- `setPinCode(pin)`: Guardar PIN
- `checkPin(pin)`: Verificar PIN
- `removePinCode()`: Eliminar PIN
- `isValidPin(pin)`: Validar formato de PIN
- `isLocked()`: Verificar bloqueo temporal
- `getRemainingAttempts()`: Obtener intentos restantes

### 2. `hooks/usePin.ts`
Hook personalizado para gestionar el estado del PIN:
- `pinSet`: Estado del PIN (true/false)
- `setPin(pin)`: Configurar PIN
- `verifyPin(pin)`: Verificar PIN
- `removePin()`: Eliminar PIN
- `getRemainingAttemptCount()`: Intentos restantes
- `checkLocked()`: Verificar bloqueo
- `getLockedTimeRemaining()`: Tiempo de bloqueo restante

### 3. `components/pin-setup.tsx`
Componente para crear/editar PIN:
- Interfaz amigable para crear PIN
- Confirmación de PIN
- Opción para eliminar PIN existente
- Validación en tiempo real

### 4. `components/pin-lock.tsx`
Componente de pantalla de desbloqueo:
- Solicita PIN para acceder
- Muestra intentos restantes
- Bloqueo temporal después de 5 intentos
- Contador de tiempo de bloqueo

### 5. `components/protected-content.tsx`
Componente reutilizable para proteger contenido:
- Verifica si hay PIN configurado
- Muestra pantalla de desbloqueo si es necesario
- Renderiza contenido protegido si está desbloqueado

### 6. `app/config/security/page.tsx`
Página principal de seguridad:
- Gestión de PIN
- Tips de seguridad
- Información sobre funciones protegidas
- Estado del PIN configurado

## Cómo Usar en Nuevas Páginas

### Proteger una página completa:

```tsx
'use client'

import { ProtectedContent } from '@/components/protected-content'

export default function MiPagina() {
  return (
    <ProtectedContent title="Mi Página Protegida">
      {/* Tu contenido aquí */}
    </ProtectedContent>
  )
}
```

### Proteger solo una sección:

```tsx
import { ProtectedContent } from '@/components/protected-content'

export function MiComponente() {
  return (
    <div>
      <div>Contenido público</div>
      <ProtectedContent title="Sección Privada">
        {/* Contenido protegido */}
      </ProtectedContent>
    </div>
  )
}
```

## Mejoras Futuras

- [ ] Biometría (huella dactilar, reconocimiento facial)
- [ ] Recuperación de PIN olvidado (preguntas de seguridad)
- [ ] Múltiples niveles de protección
- [ ] Historial de accesos bloqueados
- [ ] Notificaciones de acceso
- [ ] Integración con autenticación de dispositivo

## Consideraciones de Seguridad

⚠️ **En producción, se recomienda:**
- Usar bcrypt en lugar de Base64
- Implementar salt para hashes
- Usar algoritmos de hashing más seguros
- Considerar server-side validation si es posible
- Implementar autenticación biométrica

## Sugerencias de Uso

💡 **Para el usuario:**
1. Elige un PIN que no sea fácil de adivinar
2. No uses fechas de cumpleaños o secuencias obvias (1234, 0000)
3. Recuerda tu PIN, no se puede recuperar sin reinstalar la app
4. Ten cuidado con la pantalla cuando ingreses el PIN
5. Usa el PIN para proteger tus momentos más vulnerables

---

**Versión**: 1.0  
**Última actualización**: Junio 2026
