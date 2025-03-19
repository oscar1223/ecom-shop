// src/pages/HomePage.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/HomePage.css'

interface Product {
  id: number
  title: string
  image: string
}

const products: Product[] = [
  {
    id: 1,
    title: 'Producto 1',
    image: '/jordan.png'
  },
  {
    id: 2,
    title: 'Producto 2',
    image: '/oncloud.png'
  },
  {
    id: 3,
    title: 'Producto 3',
    image: '/vstar.png'
  }
]

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Productos</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.title}
              className="product-card__image"
            />
            <h2 className="product-card__title">{product.title}</h2>
            <Link to={`/product/${product.id}`} className="product-card__link">
              Ver detalles
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
