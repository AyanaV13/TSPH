import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import './FeaturesPage.css'
import './SubmitPage.css'

const monthlyFeatured = [
  { id: 1,  title: 'Forest at Dawn',       price: '$48.00', pieces: 500,  difficulty: 'Medium',    img: null },
  { id: 2,  title: 'Coastal Cliffs',        price: '$52.00', pieces: 750,  difficulty: 'Hard',      img: null },
  { id: 3,  title: 'Autumn Village',        price: '$44.00', pieces: 500,  difficulty: 'Medium',    img: null },
  { id: 4,  title: 'Midnight Bloom',        price: '$56.00', pieces: 1000, difficulty: 'Expert',    img: null },
  { id: 5,  title: 'Snowy Cabin',           price: '$40.00', pieces: 300,  difficulty: 'Easy',      img: null },
  { id: 6,  title: 'Desert Sunset',         price: '$48.00', pieces: 500,  difficulty: 'Medium',    img: null },
]

const now = new Date()
const monthLabel = now.toLocaleString('default', { month: 'long', year: 'numeric' })

const communitySpotlight = [
  { id: 1, title: 'Ember Hollow',      handle: '@rowandraws',    category: 'Landscape', medium: 'Watercolor'   },
  { id: 2, title: 'Sea Glass Morning', handle: '@coralstudio',   category: 'Coastal',   medium: 'Oil paint'    },
  { id: 3, title: 'Urban Dusk',        handle: '@mika.creates',  category: 'Urban',     medium: 'Digital art'  },
  { id: 4, title: 'Bloom Grid',        handle: '@pressedpetal',  category: 'Abstract',  medium: 'Mixed media'  },
]

function FeaturesPage() {
  return (
    <div className="features-page">
      <div className="features-hero">
        <Container>
          <p className="features-eyebrow">Monthly Collection</p>
          <h1 className="features-heading">Featured Puzzles</h1>
          <p className="features-subheading">{monthLabel}</p>
          <p className="features-description">
            Each month we hand-select a fresh set of puzzles from our studio.
            Limited quantities — once they're gone, they're gone.
          </p>
        </Container>
      </div>

      <section className="features-grid-section">
        <Container>
          <Row className="g-4">
            {monthlyFeatured.map(puzzle => (
              <Col key={puzzle.id} sm={6} lg={4}>
                <ProductCard
                  id={puzzle.id}
                  title={puzzle.title}
                  price={puzzle.price}
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

      {/* Community Spotlight */}
      <section className="spotlight-section features-spotlight">
        <Container>
          <div className="spotlight-header">
            <div>
              <p className="spotlight-eyebrow">Community Spotlight</p>
              <h2 className="spotlight-heading">This Month's Submissions</h2>
            </div>
            <span className="spotlight-note">{monthLabel}</span>
          </div>

          <Row className="g-3">
            {communitySpotlight.map(item => (
              <Col key={item.id} sm={6} lg={3}>
                <div className="spotlight-card">
                  <div className="spotlight-card-img"><span>Artwork</span></div>
                  <div className="spotlight-card-body">
                    <p className="spotlight-card-title">{item.title}</p>
                    <p className="spotlight-card-handle">{item.handle}</p>
                    <p className="spotlight-card-meta">{item.category} · {item.medium}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          <div className="features-spotlight-cta">
            <p className="features-spotlight-cta-text">
              Are you an artist? We'd love to see your work.
            </p>
            <Link to="/submit" className="features-spotlight-cta-link">
              Submit Your Artwork →
            </Link>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default FeaturesPage
