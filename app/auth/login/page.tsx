'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { login, register } from '@/lib/auth/auth'

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (isLogin) {
        const user = login(email, password)
        if (user) {
          router.push('/')
        } else {
          setError('Email o contraseña incorrectos')
        }
      } else {
        const success = register(email, password, name || email)
        if (success) {
          const user = login(email, password)
          if (user) {
            router.push('/')
          }
        } else {
          setError('El email ya está registrado o la contraseña es muy corta (mín. 4 caracteres)')
        }
      }
    } catch (err) {
      setError('Ocurrió un error. Intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-amber-50 to-orange-100 flex items-center justify-center px-6 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-900 mb-2">Munci</h1>
          <p className="text-amber-700 text-sm">Tu refugio emocional</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {isLogin ? '¿Todo listo para entrar a tu espacio seguro?' : 'Crea tu cuenta'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email/Usuario Input */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                {isLogin ? 'Tu Correo / Usuario' : 'Tu Correo'}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tunombre@email.com"
                required
                className="w-full px-4 py-3 rounded-full border-2 border-amber-200 focus:border-amber-400 focus:outline-none bg-amber-50 text-gray-800 placeholder-gray-400 transition-colors"
              />
            </div>

            {/* Name Input (solo para registro) */}
            {!isLogin && (
              <div>
                <label className="block text-sm text-gray-600 mb-2">Tu Nombre</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full px-4 py-3 rounded-full border-2 border-amber-200 focus:border-amber-400 focus:outline-none bg-amber-50 text-gray-800 placeholder-gray-400 transition-colors"
                />
              </div>
            )}

            {/* Password Input */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Tu Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-full border-2 border-amber-200 focus:border-amber-400 focus:outline-none bg-amber-50 text-gray-800 placeholder-gray-400 transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-400 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-md"
            >
              {isLoading ? 'Cargando...' : isLogin ? 'ENTRAR A MI REFUGIO' : 'CREAR CUENTA'}
            </Button>
          </form>

          {/* Toggle Login/Register */}
          <div className="text-center text-sm text-gray-600 space-y-2">
            {isLogin ? (
              <>
                <p>¿Primera vez aquí?</p>
                <button
                  onClick={() => {
                    setIsLogin(false)
                    setError('')
                    setEmail('')
                    setPassword('')
                    setName('')
                  }}
                  className="text-red-400 hover:text-red-500 font-semibold underline transition-colors"
                >
                  Crea tu cuenta
                </button>
              </>
            ) : (
              <>
                <p>¿Ya tienes cuenta?</p>
                <button
                  onClick={() => {
                    setIsLogin(true)
                    setError('')
                    setEmail('')
                    setPassword('')
                    setName('')
                  }}
                  className="text-red-400 hover:text-red-500 font-semibold underline transition-colors"
                >
                  Inicia sesión
                </button>
              </>
            )}
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8 text-center text-xs text-gray-600 bg-white rounded-2xl p-4 border border-gray-200">
          <p className="font-semibold mb-2 text-gray-700">Demo - Credenciales de prueba:</p>
          <p>Email: <span className="font-mono text-gray-700">demo@example.com</span></p>
          <p>Contraseña: <span className="font-mono text-gray-700">1234</span></p>
          <button
            onClick={() => {
              setEmail('demo@example.com')
              setPassword('1234')
              setIsLogin(true)
              // Pre-crear el usuario demo si no existe
              const allUsers = JSON.parse(localStorage.getItem('munci_users') || '{}')
              if (!allUsers['demo@example.com']) {
                allUsers['demo@example.com'] = {
                  email: 'demo@example.com',
                  password: Buffer.from('1234').toString('base64'),
                  name: 'Usuario Demo'
                }
                localStorage.setItem('munci_users', JSON.stringify(allUsers))
              }
            }}
            className="mt-3 px-4 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full text-xs font-semibold transition-colors"
          >
            Rellenar Demo
          </button>
        </div>
      </div>
    </div>
  )
}
