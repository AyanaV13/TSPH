import React, { useState } from 'react'
import { Modal, Form, Row, Col, Button } from 'react-bootstrap'
import './CheckoutModal.css'

const EMPTY_ADDRESS = {
  firstName: '', lastName: '', address: '', apt: '',
  city: '', state: '', zip: '', country: 'US',
}

const EMPTY_PAYMENT = { cardName: '', cardNumber: '', expiry: '', cvv: '' }

function CheckoutModal({ show, onClose, onConfirm, total }) {
  const [step, setStep] = useState(1)
  const [shipping, setShipping] = useState(EMPTY_ADDRESS)
  const [billing, setBilling] = useState(EMPTY_ADDRESS)
  const [payment, setPayment] = useState(EMPTY_PAYMENT)
  const [sameAsShipping, setSameAsShipping] = useState(true)
  const [errors, setErrors] = useState({})

  function handleShippingChange(e) {
    setShipping(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  function handleBillingChange(e) {
    setBilling(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  function handlePaymentChange(e) {
    let { name, value } = e.target
    if (name === 'cardNumber') value = formatCardNumber(value)
    if (name === 'expiry') value = formatExpiry(value)
    if (name === 'cvv') value = value.replace(/\D/g, '').slice(0, 4)
    setPayment(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  function formatCardNumber(val) {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  }

  function formatExpiry(val) {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    return digits.length >= 3 ? digits.slice(0, 2) + '/' + digits.slice(2) : digits
  }

  function validateShipping() {
    const required = ['firstName', 'lastName', 'address', 'city', 'state', 'zip']
    const e = {}
    required.forEach(f => { if (!shipping[f].trim()) e[f] = 'Required' })
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function validateBilling() {
    if (sameAsShipping) return true
    const required = ['firstName', 'lastName', 'address', 'city', 'state', 'zip']
    const e = {}
    required.forEach(f => { if (!billing[f].trim()) e[f] = 'Required' })
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function validatePayment() {
    const e = {}
    if (!payment.cardName.trim()) e.cardName = 'Required'
    if (payment.cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Enter a valid 16-digit card number'
    if (payment.expiry.length < 5) e.expiry = 'Enter a valid expiry (MM/YY)'
    if (payment.cvv.length < 3) e.cvv = 'Enter a valid CVV'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleNext() {
    if (step === 1 && validateShipping()) setStep(2)
    if (step === 2 && validateBilling()) setStep(3)
  }

  function handleBack() {
    setErrors({})
    setStep(s => s - 1)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (validatePayment()) onConfirm()
  }

  function handleClose() {
    setStep(1)
    setShipping(EMPTY_ADDRESS)
    setBilling(EMPTY_ADDRESS)
    setPayment(EMPTY_PAYMENT)
    setSameAsShipping(true)
    setErrors({})
    onClose()
  }

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" className="checkout-modal">
      <Modal.Header closeButton className="checkout-modal-header">
        <Modal.Title className="checkout-modal-title">Checkout</Modal.Title>
        <div className="checkout-steps">
          {['Shipping', 'Billing', 'Payment'].map((label, i) => (
            <div key={label} className={`checkout-step ${step === i + 1 ? 'active' : ''} ${step > i + 1 ? 'done' : ''}`}>
              <span className="checkout-step-dot">{step > i + 1 ? '✓' : i + 1}</span>
              <span className="checkout-step-label">{label}</span>
            </div>
          ))}
        </div>
      </Modal.Header>

      <Modal.Body className="checkout-modal-body">
        <Form onSubmit={handleSubmit} noValidate>

          {/* Step 1 — Shipping */}
          {step === 1 && (
            <>
              <p className="checkout-section-title">Shipping Address</p>
              <Row className="g-3">
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label className="checkout-label">First Name</Form.Label>
                    <Form.Control name="firstName" value={shipping.firstName} onChange={handleShippingChange}
                      isInvalid={!!errors.firstName} className="checkout-input" placeholder="Jane" />
                    <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label className="checkout-label">Last Name</Form.Label>
                    <Form.Control name="lastName" value={shipping.lastName} onChange={handleShippingChange}
                      isInvalid={!!errors.lastName} className="checkout-input" placeholder="Smith" />
                    <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={8}>
                  <Form.Group>
                    <Form.Label className="checkout-label">Street Address</Form.Label>
                    <Form.Control name="address" value={shipping.address} onChange={handleShippingChange}
                      isInvalid={!!errors.address} className="checkout-input" placeholder="123 Puzzle Lane" />
                    <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Form.Group>
                    <Form.Label className="checkout-label">Apt / Suite <span className="checkout-optional">(optional)</span></Form.Label>
                    <Form.Control name="apt" value={shipping.apt} onChange={handleShippingChange}
                      className="checkout-input" placeholder="Apt 2B" />
                  </Form.Group>
                </Col>
                <Col sm={5}>
                  <Form.Group>
                    <Form.Label className="checkout-label">City</Form.Label>
                    <Form.Control name="city" value={shipping.city} onChange={handleShippingChange}
                      isInvalid={!!errors.city} className="checkout-input" placeholder="Portland" />
                    <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={3}>
                  <Form.Group>
                    <Form.Label className="checkout-label">State</Form.Label>
                    <Form.Control name="state" value={shipping.state} onChange={handleShippingChange}
                      isInvalid={!!errors.state} className="checkout-input" placeholder="OR" maxLength={2} />
                    <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Form.Group>
                    <Form.Label className="checkout-label">ZIP Code</Form.Label>
                    <Form.Control name="zip" value={shipping.zip} onChange={handleShippingChange}
                      isInvalid={!!errors.zip} className="checkout-input" placeholder="97201" />
                    <Form.Control.Feedback type="invalid">{errors.zip}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}

          {/* Step 2 — Billing */}
          {step === 2 && (
            <>
              <p className="checkout-section-title">Billing Address</p>
              <Form.Check
                type="checkbox"
                id="same-as-shipping"
                label="Same as shipping address"
                checked={sameAsShipping}
                onChange={e => { setSameAsShipping(e.target.checked); setErrors({}) }}
                className="checkout-same-check mb-3"
              />
              {!sameAsShipping && (
                <Row className="g-3">
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label className="checkout-label">First Name</Form.Label>
                      <Form.Control name="firstName" value={billing.firstName} onChange={handleBillingChange}
                        isInvalid={!!errors.firstName} className="checkout-input" placeholder="Jane" />
                      <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label className="checkout-label">Last Name</Form.Label>
                      <Form.Control name="lastName" value={billing.lastName} onChange={handleBillingChange}
                        isInvalid={!!errors.lastName} className="checkout-input" placeholder="Smith" />
                      <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col sm={8}>
                    <Form.Group>
                      <Form.Label className="checkout-label">Street Address</Form.Label>
                      <Form.Control name="address" value={billing.address} onChange={handleBillingChange}
                        isInvalid={!!errors.address} className="checkout-input" placeholder="123 Puzzle Lane" />
                      <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col sm={4}>
                    <Form.Group>
                      <Form.Label className="checkout-label">Apt / Suite <span className="checkout-optional">(optional)</span></Form.Label>
                      <Form.Control name="apt" value={billing.apt} onChange={handleBillingChange}
                        className="checkout-input" placeholder="Apt 2B" />
                    </Form.Group>
                  </Col>
                  <Col sm={5}>
                    <Form.Group>
                      <Form.Label className="checkout-label">City</Form.Label>
                      <Form.Control name="city" value={billing.city} onChange={handleBillingChange}
                        isInvalid={!!errors.city} className="checkout-input" placeholder="Portland" />
                      <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col sm={3}>
                    <Form.Group>
                      <Form.Label className="checkout-label">State</Form.Label>
                      <Form.Control name="state" value={billing.state} onChange={handleBillingChange}
                        isInvalid={!!errors.state} className="checkout-input" placeholder="OR" maxLength={2} />
                      <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col sm={4}>
                    <Form.Group>
                      <Form.Label className="checkout-label">ZIP Code</Form.Label>
                      <Form.Control name="zip" value={billing.zip} onChange={handleBillingChange}
                        isInvalid={!!errors.zip} className="checkout-input" placeholder="97201" />
                      <Form.Control.Feedback type="invalid">{errors.zip}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              )}
              {sameAsShipping && (
                <div className="checkout-same-address-preview">
                  <p>{shipping.firstName} {shipping.lastName}</p>
                  <p>{shipping.address}{shipping.apt ? `, ${shipping.apt}` : ''}</p>
                  <p>{shipping.city}, {shipping.state} {shipping.zip}</p>
                </div>
              )}
            </>
          )}

          {/* Step 3 — Payment */}
          {step === 3 && (
            <>
              <p className="checkout-section-title">Payment Details</p>
              <Row className="g-3">
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label className="checkout-label">Name on Card</Form.Label>
                    <Form.Control name="cardName" value={payment.cardName} onChange={handlePaymentChange}
                      isInvalid={!!errors.cardName} className="checkout-input" placeholder="Jane Smith" />
                    <Form.Control.Feedback type="invalid">{errors.cardName}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label className="checkout-label">Card Number</Form.Label>
                    <Form.Control name="cardNumber" value={payment.cardNumber} onChange={handlePaymentChange}
                      isInvalid={!!errors.cardNumber} className="checkout-input" placeholder="1234 5678 9012 3456" />
                    <Form.Control.Feedback type="invalid">{errors.cardNumber}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label className="checkout-label">Expiry Date</Form.Label>
                    <Form.Control name="expiry" value={payment.expiry} onChange={handlePaymentChange}
                      isInvalid={!!errors.expiry} className="checkout-input" placeholder="MM/YY" />
                    <Form.Control.Feedback type="invalid">{errors.expiry}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label className="checkout-label">CVV</Form.Label>
                    <Form.Control name="cvv" value={payment.cvv} onChange={handlePaymentChange}
                      isInvalid={!!errors.cvv} className="checkout-input" placeholder="123" />
                    <Form.Control.Feedback type="invalid">{errors.cvv}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <div className="checkout-order-total">
                <span>Order Total</span>
                <span className="checkout-total-amount">${total}</span>
              </div>
            </>
          )}

          {/* Footer nav */}
          <div className="checkout-footer">
            {step > 1
              ? <button type="button" className="checkout-back-btn" onClick={handleBack}>← Back</button>
              : <button type="button" className="checkout-back-btn" onClick={handleClose}>Cancel</button>
            }
            {step < 3
              ? <Button type="button" className="checkout-next-btn" onClick={handleNext}>Continue →</Button>
              : <Button type="submit" className="checkout-next-btn">Place Order</Button>
            }
          </div>

        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CheckoutModal
