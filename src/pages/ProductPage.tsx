// src/pages/ProductPage.tsx
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../styles/ProductPage.css'
import { useCart } from '../context/CartContext'

const ProductPage: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  // Simular datos de producto
  const productData = {
    id: Number(id),
    title: `Producto ${id}`,
    description: `Esta es la descripción del producto con ID = ${id}`,
    image: `/jordan.png`
  }

  // Función que se ejecuta al pulsar el botón
  const handleBuy = () => {
    addToCart({ id: productData.id, title: productData.title, price: 9.99 })
    // Navegamos a la ruta "/cart"
    navigate('/cart')
  }

  return (
    <div className="product-page">
      <div className="product-page__image-container">
        <img
          src={productData.image}
          alt={productData.title}
          className="product-page__image"
        />
      </div>
      <div className="product-page__details">
        <h1>{productData.title}</h1>
        <p className="product-page__description">{productData.description}</p>
        <p className="product-page__price">$ 9.99</p>
        <button  className="product-page__add-to-cart" onClick={handleBuy}>Añadir al carrito</button>
      </div>
    </div>
  )
}

export default ProductPage
