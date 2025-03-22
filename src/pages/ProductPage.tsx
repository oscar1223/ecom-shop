// src/pages/ProductPage.tsx
import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../styles/ProductPage.css'
import { useCart } from '../context/CartContext'

interface Product {
  id: number
  title: string
  description: string
  image: string
  price: number
  quantity: number
}

const ProductPage: React.FC = () => {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const API_BASE_URL: string = 'http://localhost:3000'

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${API_BASE_URL}/products/${id}`)
        if (!res.ok) throw new Error('Error al obtener producto')
        const data = await res.json()
        setProduct(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [API_BASE_URL, id])

  if (loading) return <p>Cargando producto...</p>
  if (error) return <p>Error: {error}</p>
  if (!product) return <p>No hay datos del producto.</p>



  // Función que se ejecuta al pulsar el botón
  const handleBuy = () => {
    addToCart({ id: product.id, title: product.title, price: product.price, description: product.description, image: product.image })
    navigate('/cart')
  }

  return (
    <div className="product-page">
      <div className="product-page__image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-page__image"
        />
      </div>
      <div className="product-page__details">
        <h1>{product.title}</h1>
        <p className="product-page__description">{product.description}</p>
        <p className="product-page__price">{product.description}</p>
        <button  className="product-page__add-to-cart" onClick={handleBuy}>Añadir al carrito</button>
      </div>
    </div>
  )
}

export default ProductPage
