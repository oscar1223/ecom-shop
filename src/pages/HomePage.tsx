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
  },
  {
    id: 4,
    title: 'Producto 4',
    image: '/vstar.png'
  },
  {
    id: 5,
    title: 'Producto 5',
    image: '/vstar.png'
  },
  {
    id: 6,
    title: 'Producto 6',
    image: '/vstar.png'
  },
  {
    id: 7,
    title: 'Producto 7',
    image: '/vstar.png'
  },
  {
    id: 8,
    title: 'Producto 8',
    image: '/vstar.png'
  },
  {
    id: 9,
    title: 'Producto 9',
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
