// src/context/CartContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react'

export interface CartItem {
  id: number
  title: string
  price: number
  description: string
  image: string
  quantity: number
}

// Definimos qué métodos y datos expondrá este contexto
interface CartContextProps {
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

// Creamos el contexto sin valor inicial (undefined)
const CartContext = createContext<CartContextProps | undefined>(undefined)

// Componente proveedor del contexto
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Añadir un item al carrito
  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setCartItems((prevItems) => {
      // Ver si ya existe un item con el mismo ID en el carrito
      const existingIndex = prevItems.findIndex((i) => i.id === item.id)
      if (existingIndex >= 0) {
        // Si ya existe, sumamos la cantidad
        const updated = [...prevItems]
        updated[existingIndex].quantity += quantity
        return updated
      }
      // Si no existe, lo agregamos con la cantidad indicada
      return [...prevItems, { ...item, quantity }]
    })
  }

  // Eliminar un item por su id
  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== id))
  }

  // Vaciar el carrito
  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

// Hook para acceder más fácilmente al contexto
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe usarse dentro de un <CartProvider>')
  }
  return context
}
