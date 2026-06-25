import { Link, NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo from '../assets/imgs/navbar_logo.svg'
import cart from '../assets/imgs/cart.png'
import { useCart } from '../context/CartContext'
import './NavbarComp.css'

function NavbarComp() {
  const { totalItems } = useCart()

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Top Shelf Puzzle Haus
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/features">Features</Nav.Link>
              <Nav.Link as={Link} to="/shop">Explore</Nav.Link>
              <Nav.Link as={NavLink} to="/submit" className={({ isActive }) => isActive ? 'nav-submit-link active-submit' : 'nav-submit-link'}>Submit Your Art</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/cart" className="d-flex align-items-center gap-1">
                <img alt="cart" src={cart} width="25" height="25" className="d-inline-block align-top" />
                {totalItems > 0 && (
                  <span style={{
                    background: '#A07840',
                    color: '#fff',
                    borderRadius: '50%',
                    fontSize: '0.7rem',
                    width: '18px',
                    height: '18px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}>
                    {totalItems}
                  </span>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavbarComp
