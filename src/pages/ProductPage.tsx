// src/pages/ProductPage.tsx
import React from 'react'
import { useParams } from 'react-router-dom'
import '../styles/ProductPage.css'

const ProductPage: React.FC = () => {
  const { id, image } = useParams()

  // Simular datos de producto
  const productData = {
    id,
    title: `Producto ${id}`,
    description: `Esta es la descripción del producto con ID = ${id}`,
    image: `/${image}`
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
        <button className="product-page__add-to-cart">Agregar al carrito</button>
      </div>
    </div>
  )
}

export default ProductPage
