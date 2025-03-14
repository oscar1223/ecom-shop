// src/pages/ShippingPage.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/ShippingPage.css'

const ShippingPage: React.FC = () => {
  const navigate = useNavigate()
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Guardar datos de envío en tu store/context si es necesario
    navigate('/checkout')
  }

  return (
    <div className="shipping-page">
      <h1>Envío</h1>
      <form onSubmit={handleSubmit} className="shipping-form">
        <div className="form-group">
          <label>Dirección</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Ciudad</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Código Postal</label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>País</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Continuar</button>
      </form>
    </div>
  )
}

export default ShippingPage
