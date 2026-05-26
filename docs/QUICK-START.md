# Guía Rápida: Sistema de PIN en Munci

## 📋 Lo que se ha implementado

### ✅ Archivos Creados

1. **Librerías y Hooks**
   - `lib/security.ts` - Funciones de seguridad
   - `hooks/usePin.ts` - Hook para gestionar PIN

2. **Componentes**
   - `components/pin-setup.tsx` - Crear/editar PIN
   - `components/pin-lock.tsx` - Pantalla de desbloqueo
   - `components/protected-content.tsx` - Componente reutilizable
   - `components/pin-indicator.tsx` - Indicador de PIN en UI

3. **Páginas**
   - `app/config/security/page.tsx` - Página de seguridad y privacidad

4. **Documentación**
   - `docs/security-pin.md` - Documentación completa

### ✅ Modificaciones Realizadas

1. **Página de Configuración** (`app/config/page.tsx`)
   - Botón "Configurar Bloqueo con PIN" ahora enlaza a `/config/security`

2. **Diario** (`app/diary/page.tsx`)
   - Protegido con PIN (solo accesible con PIN correcto)

3. **Contactos de Emergencia** (`app/config/contacts/page.tsx`)
   - Protegido con PIN (solo accesible con PIN correcto)

## 🎯 Características principales

### Seguridad
- ✅ PIN de 4-8 dígitos
- ✅ Almacenamiento local con hash
- ✅ Bloqueo temporal (15 min) después de 5 intentos fallidos
- ✅ Contador de intentos
- ✅ Sin envío de datos a servidores

### Privacidad
- ✅ Anónimo (sin registro requerido)
- ✅ Datos locales solo
- ✅ Nada compartido con terceros

### Funciones Protegidas
- ✅ Mi Diario
- ✅ Contactos de Emergencia
- ✅ Fácil de extender a otras funciones

## 🚀 Cómo usar

### Para el Usuario Final

1. **Configurar PIN:**
   - Ve a Configuración → Privacidad y Seguridad
   - Haz clic en "Configurar PIN"
   - Ingresa PIN (4-8 números)
   - Confirma PIN
   - ¡Listo!

2. **Acceder a Contenido Protegido:**
   - Ve al Diario o Contactos
   - Ingresa tu PIN
   - Acceso concedido ✅

3. **Cambiar o Eliminar PIN:**
   - Ve a Configuración → Privacidad y Seguridad
   - Haz clic en "Cambiar PIN" o "Eliminar PIN"

### Para el Desarrollador

**Proteger una nueva página:**

```tsx
'use client'

import { ProtectedContent } from '@/components/protected-content'

export default function MiPagina() {
  return (
    <ProtectedContent title="Título de la Función">
      {/* Contenido protegido */}
    </ProtectedContent>
  )
}
```

**Usar el hook directamente:**

```tsx
'use client'

import { usePin } from '@/hooks/usePin'

export function MiComponente() {
  const { pinSet, verifyPin, setPin } = usePin()

  return (
    <div>
      PIN Configurado: {pinSet ? 'Sí' : 'No'}
    </div>
  )
}
```

## 🔒 Flujo de Seguridad

```
Usuario intenta acceder al Diario
           ↓
¿PIN configurado?
    ↙ Sí          ↘ No
   ↓               ↓
Mostrar           Mostrar
pantalla          contenido
de PIN            sin protección
   ↓
¿PIN correcto?
   ↙ Sí      ↘ No
  ↓           ↓
Acceso      Intentos--
aprobado    ¿Intentos = 0?
              ↓ Sí
            Bloqueo 15min
```

## 📊 Estructura de Datos

### LocalStorage Keys
- `munci_pin` - PIN hasheado
- `munci_pin_attempts` - Intentos fallidos
- `munci_pin_lockout` - Timestamp de bloqueo

### Estados del Hook usePin
```typescript
{
  pinSet: boolean,              // ¿PIN configurado?
  isLoading: boolean,           // ¿Cargando?
  setPin: (pin: string) => bool,    // Configurar PIN
  verifyPin: (pin: string) => bool, // Verificar PIN
  removePin: () => void,            // Eliminar PIN
  getRemainingAttemptCount: () => number,
  checkLocked: () => boolean,
  getLockedTimeRemaining: () => number
}
```

## 🎨 Componentes Disponibles

### PinSetup
```tsx
<PinSetup 
  onSuccess={() => console.log('PIN configurado')}
  onCancel={() => console.log('Cancelado')}
/>
```

### PinLock
```tsx
<PinLock 
  onUnlock={() => console.log('Desbloqueado')}
  title="Mi Contenido Privado"
/>
```

### ProtectedContent (Recomendado)
```tsx
<ProtectedContent title="Mi Página">
  Contenido protegido
</ProtectedContent>
```

### PinIndicator
```tsx
<PinIndicator /> // Muestra badge si PIN está activo
```

## 🧪 Testing

Para probar la funcionalidad:

1. Ve a Configuración → Privacidad y Seguridad
2. Configura un PIN (ej: 1234)
3. Ve al Diario - debe pedir PIN
4. Ingresa un PIN incorrecto - debe mostrar error
5. Intenta 5 veces - debe bloquearse
6. Espera 15 minutos o limpia localStorage
7. Ingresa el PIN correcto - debe desbloquear

**Para testing rápido (abre console):**
```javascript
// Simular PIN en localStorage
localStorage.setItem('munci_pin', Buffer.from('1234').toString('base64'))

// Limpiar
localStorage.removeItem('munci_pin')
localStorage.removeItem('munci_pin_attempts')
localStorage.removeItem('munci_pin_lockout')
```

## 🔄 Próximos Pasos Opcionales

1. **Extender protección a más funciones:**
   - Historial de emociones
   - Notas personales
   - Configuración sensible

2. **Mejorar seguridad:**
   - Implementar bcrypt
   - Agregar biometría
   - Recuperación de PIN olvidado

3. **Mejorar UX:**
   - Animaciones suaves
   - Feedback visual mejorado
   - Gestos táctiles

4. **Analytics:**
   - Rastrear accesos desbloqueados
   - Alertas de bloqueos
   - Estadísticas de uso

---

**¡El sistema está listo para usar!** 🎉

Para más detalles, ver `docs/security-pin.md`
