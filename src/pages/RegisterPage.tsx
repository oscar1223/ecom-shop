// src/pages/RegisterPage.tsx
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/RegisterPage.css'

const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const API_BASE_URL: string = 'http://localhost:3000'

  // Manejo de estado para posibles mensajes o errores
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)



  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirmPassword){
      setError('Las contraseñas no coinciden')
      return
    }

    try {
      setError(null)
      setSuccess(false)


      const body = {
        email,
        password,
        name
      }
      const res = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error('Error al crear usuario')
      const userCreated = await res.json()
      console.log('Usuario creado:', userCreated)
      setSuccess(true)
      navigate('/login')
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Error al crear usuario')
    }
  }

  return (
    <div className="register-container">
      <h1>Registro</h1>

      {/* Mostrar un posible error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>¡Usuario creado con éxito!</p>}

      <form onSubmit={handleRegister} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            placeholder="Ej. Juan Pérez"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
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
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Repite tu contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-register">Crear Cuenta</button>

        <div className="login-link">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>.
        </div>
      </form>
    </div>
  )
}

export default RegisterPage
