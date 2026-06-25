import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="site-footer">
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
            <h4 className="footer-heading">Navigate</h4>
            <ul className="footer-nav-list">
              <li><Link to="/features" className="footer-link">Features</Link></li>
              <li><Link to="/shop" className="footer-link">Explore</Link></li>
              <li><Link to="/submit" className="footer-link">Submit Your Art</Link></li>
            </ul>
          </Col>

        </Row>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Top Shelf Puzzle Haus. All rights reserved.</span>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
