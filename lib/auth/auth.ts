// Sistema de autenticación simple con localStorage

const AUTH_STORAGE_KEY = 'munci_auth_user'
const AUTH_TOKEN_KEY = 'munci_auth_token'
const LAST_ACTIVITY_KEY = 'munci_last_activity'
const SESSION_TIMEOUT = 40 * 60 * 1000 // 40 minutos en milisegundos

export interface User {
  id: string
  email: string
  name: string
}

// Base de datos simple de usuarios (en producción usar una BD real)
const users: Record<string, { email: string; password: string; name: string }> = {}

// Función para crear un hash simple de contraseña (en producción usar bcrypt)
const hashPassword = (password: string): string => {
  return Buffer.from(password).toString('base64')
}

export const verifyPassword = (password: string, hash: string): boolean => {
  return hashPassword(password) === hash
}

export const generateToken = (userId: string): string => {
  return `token_${userId}_${Date.now()}`
}

export const register = (email: string, password: string, name: string): boolean => {
  if (users[email]) {
    return false // El usuario ya existe
  }

  if (password.length < 4) {
    return false // La contraseña debe tener al menos 4 caracteres
  }

  users[email] = {
    email,
    password: hashPassword(password),
    name,
  }

  // Guardar usuarios en localStorage
  const allUsers = JSON.parse(localStorage.getItem('munci_users') || '{}')
  allUsers[email] = users[email]
  localStorage.setItem('munci_users', JSON.stringify(allUsers))

  return true
}

export const login = (email: string, password: string): User | null => {
  // Cargar usuarios desde localStorage
  const allUsers = JSON.parse(localStorage.getItem('munci_users') || '{}')
  const user = allUsers[email]

  if (!user) {
    return null // Usuario no encontrado
  }

  if (!verifyPassword(password, user.password)) {
    return null // Contraseña incorrecta
  }

  const userId = `user_${Date.now()}`
  const userData: User = {
    id: userId,
    email: user.email,
    name: user.name,
  }

  const token = generateToken(userId)

  // Guardar sesión
  localStorage.setItem(AUTH_TOKEN_KEY, token)
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData))
  updateLastActivity()

  return userData
}

export const logout = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(AUTH_STORAGE_KEY)
  localStorage.removeItem(LAST_ACTIVITY_KEY)
}

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem(AUTH_STORAGE_KEY)
  if (!userStr) return null

  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(AUTH_TOKEN_KEY)
}

// Funciones para manejo de inactividad
export const updateLastActivity = (): void => {
  if (isAuthenticated()) {
    localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString())
  }
}

export const getLastActivityTime = (): number => {
  const lastActivity = localStorage.getItem(LAST_ACTIVITY_KEY)
  return lastActivity ? parseInt(lastActivity, 10) : 0
}

export const isSessionExpired = (): boolean => {
  if (!isAuthenticated()) {
    return true
  }

  const lastActivity = getLastActivityTime()
  if (!lastActivity) {
    return true
  }

  const timeSinceLastActivity = Date.now() - lastActivity
  return timeSinceLastActivity > SESSION_TIMEOUT
}

export const checkAndLogoutIfExpired = (): boolean => {
  if (isSessionExpired()) {
    logout()
    return true
  }
  return false
}
