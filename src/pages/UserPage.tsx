// src/pages/UserPage.tsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface User {
  id: number
  name: string
  email: string
  phone?: string
  // cualquier otro campo...
}

interface Order {
  id: number
  createdAt: string
  totalAmount: number
  // y cualquier otro campo...
}

const UserPage: React.FC = () => {
  const navigate = useNavigate()
  
  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [editMode, setEditMode] = useState(false)
  const [updatedName, setUpdatedName] = useState('')
  const [updatedPhone, setUpdatedPhone] = useState('')

  // Ajusta a tu URL base. Si usas Vite, podrías usar import.meta.env.VITE_API_BASE_URL
  const API_BASE_URL = 'http://localhost:3000'

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      // Si no hay token, redirigir al login
      navigate('/login')
      return
    }

    const fetchUserData = async () => {
      try {
        setLoading(true)

        // 1. Obtener info del usuario
        const userRes = await fetch(`${API_BASE_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!userRes.ok) {
          throw new Error('No se pudo obtener la información del usuario')
        }
        const userData = await userRes.json()
        setUser(userData)

        // 2. Obtener pedidos del usuario
        //    Podría ser /orders/me o /orders/user/ID, según tu backend
        const ordersRes = await fetch(`${API_BASE_URL}/orders/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!ordersRes.ok) {
          throw new Error('No se pudo obtener la lista de pedidos')
        }
        const ordersData = await ordersRes.json()
        setOrders(ordersData)

      } catch (err: any) {
        setError(err.message)
        console.error(err)
        // Si falla, podemos redirigir a login o mostrar un mensaje
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [navigate, API_BASE_URL])

  // Entrar en modo edición
  const handleEdit = () => {
    if (!user) return
    setEditMode(true)
    setUpdatedName(user.name)
    setUpdatedPhone(user.phone || '')
  }

  // Guardar cambios
  const handleSave = async () => {
    try {
      if (!user) return
      const token = localStorage.getItem('token')
      if (!token) return navigate('/login')

      // PATCH o PUT /users/me, según hayas definido
      const res = await fetch(`${API_BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: updatedName,
          phone: updatedPhone,
        }),
      })
      if (!res.ok) {
        throw new Error('No se pudo actualizar la información')
      }
      const updatedUser = await res.json()
      setUser(updatedUser)
      setEditMode(false)
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) return <p>Cargando...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!user) return <p>No se pudo cargar la información del usuario.</p>

  return (
    <div style={{ padding: '20px' }}>
      <h1>Mi Cuenta</h1>
      <section style={{ marginBottom: '20px' }}>
        <h2>Información Personal</h2>
        {!editMode ? (
          <>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Teléfono:</strong> {user.phone || 'No definido'}</p>
            <button onClick={handleEdit}>Editar Datos</button>
          </>
        ) : (
          <>
            <div>
              <label>Nombre: </label>
              <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </div>
            <div>
              <label>Teléfono: </label>
              <input
                type="text"
                value={updatedPhone}
                onChange={(e) => setUpdatedPhone(e.target.value)}
              />
            </div>
            <button onClick={handleSave}>Guardar</button>
            <button onClick={() => setEditMode(false)}>Cancelar</button>
          </>
        )}
      </section>

      <section>
        <h2>Mis Pedidos</h2>
        {orders.length === 0 ? (
          <p>No hay pedidos registrados.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {orders.map((order) => (
              <li key={order.id} style={{ marginBottom: '10px' }}>
                <p><strong>Pedido #:</strong> {order.id}</p>
                <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
                {/* Podrías mostrar el desglose de items, estados del pedido, etc. */}
                <hr />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default UserPage
