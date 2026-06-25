import React, { useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../assets/imgs/logo.svg'
import ProductCard from '../components/ProductCard'
import './LandingPage.css'

const featuredPuzzles = [
  { id: 1, title: 'Forest at Dawn', price: '$48.00' },
  { id: 2, title: 'Coastal Cliffs', price: '$52.00' },
  { id: 3, title: 'Autumn Village', price: '$44.00' },
]

function LandingPage() {
  return (
    <div className="landing-page">

      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={6}>
              <div className="hero-logo-panel">
                <img src={logo} alt="Top Shelf Puzzle Haus logo" />
              </div>
            </Col>
            <Col lg={6} className="text-center text-lg-start hero-text">
              <p className="hero-eyebrow">Handmade Puzzles</p>
              <h1 className="hero-heading">
                Where Every Piece<br />Tells a Story
              </h1>
              <p className="hero-description">
                Each puzzle is hand-cut and crafted with care in small batches.
                From serene landscapes to bold patterns — find a piece that speaks to you.
              </p>
              <Button href="#shop" className="hero-btn">
                Browse the Shop
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Pieces Section */}
      <section className="featured-section">
        <Container>
          <h2 className="featured-heading">Featured Pieces</h2>
          <Row className="g-4">
            {featuredPuzzles.map(puzzle => (
              <Col key={puzzle.id} sm={6} lg={4}>
                <ProductCard title={puzzle.title} price={puzzle.price} img={puzzle.img} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Submit Teaser */}
      <section className="submit-teaser">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={7}>
              <p className="submit-teaser-eyebrow">Open Call · Community Submissions</p>
              <h2 className="submit-teaser-heading">Your Art Could Become a Puzzle</h2>
              <p className="submit-teaser-body">
                Each month we hand-select original artwork from our community to feature in the next batch.
                Selected artists receive a free finished puzzle and full credit on the product page.
              </p>
              <ul className="submit-teaser-perks">
                <li>You keep all rights — we license for one print run only</li>
                <li>Free finished puzzle sent to selected artists</li>
                <li>Featured on the site with your name and handle</li>
              </ul>
              <Button as={Link} to="/submit" className="submit-teaser-btn">
                Submit Your Artwork
              </Button>
            </Col>
            <Col lg={5} className="d-none d-lg-block">
              <div className="submit-teaser-mosaic">
                {[1, 2, 3, 4].map(n => (
                  <div key={n} className="submit-teaser-tile">
                    <span>Artwork</span>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="footer">
        <Container>
          <Row className="g-5">

            <Col md={4}>
              <h3 className="footer-brand">Top Shelf Puzzle Haus</h3>
              <p className="footer-tagline">Handcrafted · Est. 2026</p>
              <p className="footer-about">
                Small-batch, hand-cut puzzles made with love. Every piece is crafted to bring joy and calm to your table.
              </p>
            </Col>

            <Col md={4}>
              <h4 className="footer-heading">Get in Touch</h4>
              <ul className="footer-contact-list">
                <li>
                  <span className="footer-contact-label">Email</span>
                  <a href="mailto:hello@topshelfpuzzlehaus.com" className="footer-link">
                    hello@topshelfpuzzlehaus.com
                  </a>
                </li>
                <li>
                  <span className="footer-contact-label">Instagram</span>
                  <a href="https://instagram.com" className="footer-link" target="_blank" rel="noreferrer">
                    @topshelfpuzzlehaus
                  </a>
                </li>
                <li>
                  <span className="footer-contact-label">Location</span>
                  <span className="footer-text">Small-batch studio, USA</span>
                </li>
              </ul>
            </Col>

            <Col md={4}>
              <h4 className="footer-heading">Send a Message</h4>
              <ContactForm />
            </Col>

          </Row>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Top Shelf Puzzle Haus. All rights reserved.</span>
          </div>
        </Container>
      </footer>

    </div>
  )
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="footer-success">
        Thanks for reaching out! We'll get back to you soon.
      </p>
    )
  }

  return (
    <Form onSubmit={handleSubmit} className="footer-form">
      <Form.Group className="mb-2">
        <Form.Control
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
          className="footer-input"
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Control
          type="email"
          name="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          required
          className="footer-input"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          name="message"
          placeholder="Your message"
          rows={3}
          value={form.message}
          onChange={handleChange}
          required
          className="footer-input"
        />
      </Form.Group>
      <Button type="submit" className="hero-btn w-100">Send Message</Button>
    </Form>
  )
}

export default LandingPage
