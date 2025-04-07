// src/pages/LoginPage.tsx
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/LoginPage.css'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()

  // Estados locales para email y contraseña
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Manejo de estados para feedback
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
  
  // Manejador del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Llamar a tu endpoint de login en el backend NestJS
    // Ajusta la ruta según tu implementación (por ejemplo: /auth/login).
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      // si no es 200 OK
      if (!response.ok) {
        // Podrías verificar si es 401, 403, etc.
        throw new Error('Credenciales inválidas o error en el servidor.')
      }

      // Suponiendo que recibes un objeto con { token, user }
      const data = await response.json()
      console.log('Login exitoso:', data)

      // Ejemplo: guardar el token en localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      // Si quieres guardar información de usuario
      //localStorage.setItem('user', JSON.stringify(data.user))
      console.log('Usuario:', data.user)

      // Redirigir a la Home o a un dashboard:
      console.log('Token y user recibidos. Navegando a /admin...')
      navigate('/admin')

    } catch (err: any) {
      setError(err.message)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            placeholder="ej. usuario@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn-login" disabled={loading}>
          {loading ? 'Cargando...' : 'Acceder'}
        </button>

        <div className="register-link">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>.
        </div>
      </form>
    </div>
  )
}

export default LoginPage
