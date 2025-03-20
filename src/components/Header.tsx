// src/components/Header.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import '../styles/Header.css'


const Header: React.FC = () => {
  const { cartItems } = useCart()

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)


  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">MyStore</Link>
      </div>
      <nav className="header__nav">
        <ul>
          <li>
            <Link to="/cart">Carrito ({totalItems})</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
