// src/pages/LoginPage.tsx
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/LoginPage.css'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()

  // Estados locales para email y contraseña
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Aquí podrías validar credenciales. Ejemplo ficticio:
    if (email === 'admin@test.com' && password === '123456') {
      alert('¡Login exitoso!')
      // Redirigir a donde quieras, ej: la home o el dashboard
      navigate('/')
    } else {
      alert('Credenciales inválidas.')
    }
  }

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
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
          />
        </div>

        <button type="submit" className="btn-login">Acceder</button>

        <div className="register-link">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>.
        </div>
      </form>
    </div>
  )
}

export default LoginPage
