// src/pages/CheckoutPage.tsx

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import '../styles/CheckoutPage.css'

// Importa tu contexto del carrito. Ajusta la ruta si tu contexto se encuentra en otro lugar.
import { useCart } from '../context/CartContext' 

// Carga tu clave pública de Stripe (publishable key)
const stripePromise = loadStripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX')

const CheckoutPage: React.FC = () => {
  return (
    <div className="checkout-container">
      {/* Configuramos Stripe Elements para poder usar CardElement */}
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  )
}

/**
 * Este componente maneja:
 * - Resumen del pedido (cart items)
 * - Datos de envío (shipping)
 * - Datos de pago (Stripe)
 */
const CheckoutForm: React.FC = () => {
  const navigate = useNavigate()

  // 1. Acceder a los items del carrito desde el contexto
  const { cartItems } = useCart()

  // 2. Estados para datos del usuario y envío
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  // 3. Hooks de Stripe
  const stripe = useStripe()
  const elements = useElements()

  // 4. Calcular total de los productos en el carrito
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  // Al enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validar datos de envío (puedes refinar las validaciones a tu gusto)
    if (!name || !lastName || !phone || !email || !address || !city || !postalCode || !country) {
      alert('Por favor, completa todos los campos de envío.')
      return
    }

    // Verificar que Stripe está listo
    if (!stripe || !elements) {
      alert('Stripe no está listo aún.')
      return
    }

    // Obtenemos el elemento de tarjeta
    const cardElement = elements.getElement(CardElement)
    if (!cardElement) {
      alert('No se encontró el elemento de tarjeta.')
      return
    }

    try {
      // En una aplicación real, tu backend crearía un PaymentIntent y
      // te devolvería un clientSecret. Aquí solo se simula:
      const clientSecret = 'pi_XXXX_secret_XXXX'

      // Confirmamos el pago con Stripe (ejemplo simplificado)
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${name} ${lastName}`,
            phone: phone,
            email: email,
            address: {
              line1: address,
              city: city,
              country: country,
              postal_code: postalCode
            }
          }
        }
      })

      if (error) {
        alert(`Error procesando el pago: ${error.message}`)
        return
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // ¡Pago completado!
        alert('Compra realizada con éxito. ¡Gracias!')

        // Aquí podrías vaciar el carrito y/o guardar datos en tu backend
        // Navegar a una página de "Gracias por tu compra"
        navigate('/')
      }
    } catch (err: any) {
      console.error(err)
      alert('Ocurrió un error al procesar el pago.')
    }
  }

  // Si el carrito está vacío, podrías redirigir o mostrar un mensaje
  if (cartItems.length === 0) {
    return (
      <div>
        <h2>No hay productos en tu carrito</h2>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="checkout-form">

      {/* ==== Datos de Envío ==== */}
      <h2>Datos de Envío</h2>
      <div className="form-group">
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Apellidos</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Telefono</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Dirección</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="city">Ciudad</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="postalCode">Código Postal</label>
        <input
          type="text"
          id="postalCode"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="country">País</label>
        <input
          type="text"
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </div>

      

      {/* ==== Datos de Pago ==== */}
      <h2>Datos de Pago</h2>
      <ul className="order-summary-list">
        {cartItems.map((item) => (
          <li key={item.id} className="order-summary-item">
            {/* Muestra nombre del producto, cantidad y subtotal */}
            <span>{item.title}</span> x {item.quantity}
            <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="order-summary-total">
        Total a pagar: <strong>${totalPrice.toFixed(2)}</strong>
      </div>
      <div className="form-group">
        <label>Tarjeta</label>
        <div className="card-element-wrapper">
          <CardElement />
        </div>
      </div>

      <button type="submit" className="btn-submit">Realizar Pago</button>
    </form>
  )
}

export default CheckoutPage
