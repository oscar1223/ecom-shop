// src/pages/CartPage.tsx
import React from 'react'
import { useCart } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/CartPage.css'

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, clearCart } = useCart()
  const navigate = useNavigate()

  // Ejemplo: Al pulsar "Proceder al Checkout", iremos a Shipping
  const handleCheckout = () => {
    navigate('/shipping')
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Tu carrito está vacío</h2>
        <Link to="/">Volver a inicio</Link>
      </div>
    )
  }

  // Suma total (opcional)
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>
      <ul className="cart-list">
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <div>
              <span className="cart-item__title">{item.title}</span> x {item.quantity}
              <span className="cart-item__price">(${item.price} c/u)</span>
            </div>
            <button className="cart-item__remove" onClick={() => removeFromCart(item.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <p>Total: <strong>${totalPrice.toFixed(2)}</strong></p>
      </div>
      <div className="cart-actions">
        <button onClick={clearCart} className="btn-clear">Vaciar Carrito</button>
        <button onClick={handleCheckout} className="btn-checkout">Proceder al Checkout</button>
      </div>
    </div>
  )
}

export default CartPage
