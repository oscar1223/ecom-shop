// src/components/Footer.tsx
import React from 'react'
import '../styles/Footer.css'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="footer">
      <p>&copy; {currentYear} MyStore. All rights reserved.</p>
    </footer>
  )
}

export default Footer
