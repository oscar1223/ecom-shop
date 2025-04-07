// src/pages/AdminPage.tsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminPage: React.FC = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Ajusta a tu URL base. Si usas Vite, puedes usar import.meta.env.VITE_API_BASE_URL
  const API_BASE_URL = 'http://localhost:3000'

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      // Si no hay token, redirigir al login
      navigate('/login')
      return
    }

    const userData = localStorage.getItem('user')
    if (!userData) {
      // Si no se guardó, obliga a loguear de nuevo
      navigate('/login')
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)


    // Función para obtener datos del usuario desde el backend
    const fetchUserData = async (uid: number) => {
      try {
        setLoading(true)

        // Llamada GET /users/me (o el endpoint que maneje tu backend)
        const response = await fetch(`${API_BASE_URL}/users/${uid}`, {
          headers: {
            // Pasamos el token JWT en la cabecera Authorization
            Authorization: `Bearer ${token}`
          }
        })

        if (!response.ok) {
          // Si la respuesta no es 2xx, puede deberse a token expirado, usuario no encontrado, etc.
          throw new Error('No se pudo obtener el usuario')
        }

        const data = await response.json()
        setUser(data) // Guardamos la info del usuario en el state
      } catch (err: any) {
        console.error(err)
        setError(err.message)
        // En caso de error, podrías redirigir a login o mostrar un mensaje
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }

    fetchUserData(parsedUser.id)
  }, [navigate])

  if (loading) return <p>Cargando...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!user) return <p>No se encontraron datos de usuario</p>

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
