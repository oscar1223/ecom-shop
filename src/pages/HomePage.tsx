// src/pages/HomePage.tsx
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import '../styles/HomePage.css'

interface Product {
  id: number
  title: string
  description?: string
  price: number
  image?: string
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const API_BASE_URL: string = 'http://localhost:3000'

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${API_BASE_URL}/products/list`)
        if (!res.ok) throw new Error('Error al obtener productos')
        const data = await res.json()
        setProducts(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [API_BASE_URL])

  if (loading) return <p>Cargando productos...</p>
  if (error) return <p>Error al cargar productos: {error}</p>

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
            <p className="product-card__price">${product.price}</p>
            <p className="product-card__description">{product.description}</p>
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
