// src/pages/CheckoutPage.tsx
import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import '../styles/CheckoutPage.css'

// Carga la clave pública (Publishable Key) de tu cuenta de Stripe
const stripePromise = loadStripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX')

const CheckoutForm: React.FC = () => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    // Aquí vendría la lógica real de pago con PaymentIntent
    alert('Procesando pago. Aquí iría la lógica real de Stripe.')
  }

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Checkout</h2>
      <div className="card-element-wrapper">
        <CardElement />
      </div>
      <button type="submit" disabled={!stripe}>
        Pagar
      </button>
    </form>
  )
}

const CheckoutPage: React.FC = () => {
  return (
    <div className="checkout-page">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  )
}

export default CheckoutPage
