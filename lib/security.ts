// Funciones de seguridad y gestión de PIN

const PIN_STORAGE_KEY = 'munci_pin'
const PIN_ATTEMPTS_KEY = 'munci_pin_attempts'
const PIN_LOCKOUT_TIME_KEY = 'munci_pin_lockout'

export const hashPin = (pin: string): string => {
  // Implementación simple de hash (en producción usar bcrypt)
  return Buffer.from(pin).toString('base64')
}

export const verifyPin = (pin: string, hashedPin: string): boolean => {
  return hashPin(pin) === hashedPin
}

export const setPinCode = (pin: string): boolean => {
  if (!isValidPin(pin)) return false
  const hashedPin = hashPin(pin)
  localStorage.setItem(PIN_STORAGE_KEY, hashedPin)
  localStorage.removeItem(PIN_ATTEMPTS_KEY)
  localStorage.removeItem(PIN_LOCKOUT_TIME_KEY)
  return true
}

export const getPinHash = (): string | null => {
  return localStorage.getItem(PIN_STORAGE_KEY)
}

export const isPinSet = (): boolean => {
  return getPinHash() !== null
}

export const checkPin = (pin: string): boolean => {
  const storedHash = getPinHash()
  if (!storedHash) return false

  // Verificar bloqueo temporal
  const lockoutTime = localStorage.getItem(PIN_LOCKOUT_TIME_KEY)
  if (lockoutTime) {
    const now = Date.now()
    const lockoutUntil = parseInt(lockoutTime)
    if (now < lockoutUntil) {
      return false
    }
    localStorage.removeItem(PIN_LOCKOUT_TIME_KEY)
    localStorage.removeItem(PIN_ATTEMPTS_KEY)
  }

  const isCorrect = verifyPin(pin, storedHash)

  if (!isCorrect) {
    // Incrementar intentos fallidos
    const attempts = parseInt(localStorage.getItem(PIN_ATTEMPTS_KEY) || '0')
    const newAttempts = attempts + 1

    if (newAttempts >= 5) {
      // Bloquear por 15 minutos después de 5 intentos
      const lockoutUntil = Date.now() + 15 * 60 * 1000
      localStorage.setItem(PIN_LOCKOUT_TIME_KEY, lockoutUntil.toString())
      localStorage.removeItem(PIN_ATTEMPTS_KEY)
    } else {
      localStorage.setItem(PIN_ATTEMPTS_KEY, newAttempts.toString())
    }
  } else {
    // PIN correcto, limpiar intentos
    localStorage.removeItem(PIN_ATTEMPTS_KEY)
    localStorage.removeItem(PIN_LOCKOUT_TIME_KEY)
  }

  return isCorrect
}

export const removePinCode = (): void => {
  localStorage.removeItem(PIN_STORAGE_KEY)
  localStorage.removeItem(PIN_ATTEMPTS_KEY)
  localStorage.removeItem(PIN_LOCKOUT_TIME_KEY)
}

export const isValidPin = (pin: string): boolean => {
  // PIN debe tener entre 4 y 8 dígitos
  return /^\d{4,8}$/.test(pin)
}

export const getRemainingAttempts = (): number => {
  const attempts = parseInt(localStorage.getItem(PIN_ATTEMPTS_KEY) || '0')
  return Math.max(0, 5 - attempts)
}

export const isLocked = (): boolean => {
  const lockoutTime = localStorage.getItem(PIN_LOCKOUT_TIME_KEY)
  if (!lockoutTime) return false

  const now = Date.now()
  const lockoutUntil = parseInt(lockoutTime)
  return now < lockoutUntil
}

export const getRemainingLockoutTime = (): number => {
  const lockoutTime = localStorage.getItem(PIN_LOCKOUT_TIME_KEY)
  if (!lockoutTime) return 0

  const now = Date.now()
  const lockoutUntil = parseInt(lockoutTime)
  const remaining = Math.max(0, lockoutUntil - now)
  return Math.ceil(remaining / 1000) // Retornar en segundos
}
