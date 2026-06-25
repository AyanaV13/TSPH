import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CheckoutModal from '../components/CheckoutModal'
import ProductCard from '../components/ProductCard'
import { puzzles } from '../data/puzzles'
import './LandingPage.css'
import './FeaturesPage.css'
import './CartPage.css'

function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, subtotal } = useCart()
  const [showModal, setShowModal] = useState(false)
  const [checkedOut, setCheckedOut] = useState(false)

  const cartIds = new Set(cart.map(i => i.id))
  const recommendations = puzzles
    .filter(p => !cartIds.has(p.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)

  function handleConfirm() {
    clearCart()
    setShowModal(false)
    setCheckedOut(true)
  }

  if (checkedOut) {
    return (
      <div className="cart-page">
        <Container className="cart-confirmation">
          <div className="cart-confirmation-box">
            <div className="cart-confirmation-icon">✓</div>
            <h2 className="cart-confirmation-heading">Order Placed!</h2>
            <p className="cart-confirmation-text">
              Thank you for your order. We'll be in touch soon with shipping details.
            </p>
            <Button as={Link} to="/shop" className="cart-btn-primary">
              Continue Shopping
            </Button>
          </div>
        </Container>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <Container className="cart-empty">
          <h2 className="cart-empty-heading">Your cart is empty</h2>
          <p className="cart-empty-text">Looks like you haven't added anything yet.</p>
          <Button as={Link} to="/shop" className="cart-btn-primary">
            Browse the Shop
          </Button>
        </Container>
      </div>
    )
  }

  const shippingCost = subtotal >= 60 ? 0 : 6.99
  const total = subtotal + shippingCost

  return (
    <div className="cart-page">
      <div className="cart-hero">
        <Container>
          <h1 className="cart-heading">Your Cart</h1>
          <p className="cart-subheading">
            {cart.reduce((s, i) => s + i.quantity, 0)} item{cart.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''}
          </p>
        </Container>
      </div>

      <Container className="cart-body">
        <Row className="g-5">

          {/* Item list */}
          <Col lg={8}>
            <div className="cart-list">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-img">
                    <span>Image</span>
                  </div>

                  <div className="cart-item-info">
                    <p className="cart-item-title">{item.title}</p>
                    <p className="cart-item-price">{item.price}</p>
                  </div>

                  <div className="cart-item-controls">
                    <div className="cart-qty-control">
                      <button
                        className="cart-qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="cart-qty-value">{item.quantity}</span>
                      <button
                        className="cart-qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <p className="cart-item-line-total">
                      ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                    </p>
                    <button
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-back-link">
              <Link to="/shop" className="cart-link">← Keep Shopping</Link>
            </div>
          </Col>

          {/* Order summary */}
          <Col lg={4}>
            <div className="cart-summary">
              <h3 className="cart-summary-heading">Order Summary</h3>

              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Shipping</span>
                <span>
                  {shippingCost === 0
                    ? <span className="cart-free-ship">Free</span>
                    : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              {shippingCost > 0 && (
                <p className="cart-ship-note">Free shipping on orders over $60</p>
              )}

              <div className="cart-summary-divider" />

              <div className="cart-summary-row cart-summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Button
                className="cart-btn-primary cart-checkout-btn"
                onClick={() => setShowModal(true)}
              >
                Checkout
              </Button>
            </div>
          </Col>

        </Row>
      </Container>

      <CheckoutModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        total={total.toFixed(2)}
      />

      <section className="cart-recommendations">
        <Container>
          <h2 className="cart-recommendations-heading">You Might Also Like</h2>
          <Row className="g-4">
            {recommendations.map(puzzle => (
              <Col key={puzzle.id} sm={6} lg={4}>
                <ProductCard
                  id={puzzle.id}
                  title={puzzle.title}
                  price={`$${puzzle.price}.00`}
                  pieces={puzzle.pieces}
                  difficulty={puzzle.difficulty}
                  img={puzzle.img}
                  showAddToCart
                />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default CartPage
