// src/pages/AdminPage.tsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminPage: React.FC = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Verificar si el usuario está logueado, por ejemplo revisando un token en localStorage
    const token = localStorage.getItem('token')
    
    if (!token) {
      // Si no hay token, redirigir al login
      navigate('/login')
      return
    }

    // Cargar información del usuario (o roles) desde el backend:
    // Ejemplo: fetch user data => /users/me
    // O si guardaste user en localStorage, lo lees directamente:
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [navigate])

  if (!user) {
    return <p>Cargando...</p>
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Panel de Administración</h1>
      <p>Bienvenido, {user.name} ({user.email})</p>
      
      {/* Sección de pedidos, configuración de cuenta, etc. */}
      <section>
        <h2>Tus Pedidos</h2>
        <p>Aquí podrías listar los pedidos que el usuario ha realizado.</p>
      </section>

      <section>
        <h2>Configuración de cuenta</h2>
        <p>Información personal, direcciones de envío, etc.</p>
      </section>
    </div>
  )
}

export default AdminPage
