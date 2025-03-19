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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validaciones básicas
    if (!email || !name || !password || !confirmPassword) {
      alert('Completa todos los campos.')
      return
    }

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.')
      return
    }

    // Aquí harías una petición a tu backend para registrar al usuario
    // Ejemplo ficticio:
    alert(`Registro exitoso del usuario: ${name} con correo: ${email}`)

    // Luego puedes redirigirlo a login o a la home
    navigate('/login')
  }

  return (
    <div className="register-container">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit} className="register-form">
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
