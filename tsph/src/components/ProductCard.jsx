import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useCart } from '../context/CartContext'
import '../pages/LandingPage.css'
import '../pages/FeaturesPage.css'

function ProductCard({ id, title, price, pieces, difficulty, img, showAddToCart = false }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  function handleAddToCart() {
    addToCart({ id, title, price })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Card className="product-card">
      <div className="product-card-img-placeholder">
        {img
          ? <img src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span>Product Image</span>
        }
      </div>
      <Card.Body>
        {(pieces || difficulty) && (
          <div className="product-card-meta">
            {pieces && <span className="product-card-badge">{pieces} pcs</span>}
            {difficulty && <span className="product-card-badge">{difficulty}</span>}
          </div>
        )}
        <Card.Title>{title}</Card.Title>
        <Card.Text>{price}</Card.Text>
        {showAddToCart && (
          <Button
            className={`add-to-cart-btn${added ? ' added' : ''}`}
            onClick={handleAddToCart}
          >
            {added ? '✓ Added to Cart' : 'Add to Cart'}
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default ProductCard
