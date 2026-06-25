import React, { useState, useMemo, useRef } from 'react'
import { Container, Row, Col, Form, Button, Pagination } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'
import { puzzles, CATEGORIES, PRICE_RANGES, PIECE_COUNTS } from '../data/puzzles'
import './LandingPage.css'
import './ShopPage.css'

const PAGE_SIZE = 12

function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedPriceRange, setSelectedPriceRange] = useState(null)
  const [selectedPieceCounts, setSelectedPieceCounts] = useState([])
  const [page, setPage] = useState(1)
  const gridRef = useRef(null)

  function changePage(n) {
    setPage(n)
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function toggleCategory(cat) {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
    setPage(1)
  }

  function togglePieceCount(count) {
    setSelectedPieceCounts(prev =>
      prev.includes(count) ? prev.filter(c => c !== count) : [...prev, count]
    )
    setPage(1)
  }

  function selectPriceRange(range) {
    setSelectedPriceRange(prev => (prev === range ? null : range))
    setPage(1)
  }

  function clearFilters() {
    setSelectedCategories([])
    setSelectedPriceRange(null)
    setSelectedPieceCounts([])
    setPage(1)
  }

  const filtered = useMemo(() => {
    return puzzles
      .filter(p => selectedCategories.length === 0 || selectedCategories.includes(p.category))
      .filter(p => {
        if (!selectedPriceRange) return true
        const range = PRICE_RANGES.find(r => r.label === selectedPriceRange)
        return range ? p.price >= range.min && p.price <= range.max : true
      })
      .filter(p => selectedPieceCounts.length === 0 || selectedPieceCounts.includes(p.pieces))
      .sort((a, b) => a.title.localeCompare(b.title))
  }, [selectedCategories, selectedPriceRange, selectedPieceCounts])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const hasFilters = selectedCategories.length > 0 || selectedPriceRange || selectedPieceCounts.length > 0

  return (
    <div className="shop-page">

      <div className="shop-hero">
        <Container>
          <p className="shop-eyebrow">Browse</p>
          <h1 className="shop-heading">Explore All Puzzles</h1>
          <p className="shop-description">
            {filtered.length} puzzle{filtered.length !== 1 ? 's' : ''} available
            {hasFilters && ' · filters applied'}
          </p>
        </Container>
      </div>

      <Container className="shop-body">
        <Row className="g-4">

          {/* Sidebar */}
          <Col lg={3}>
            <aside className="shop-sidebar">
              <div className="sidebar-header">
                <span className="sidebar-title">Filters</span>
                {hasFilters && (
                  <button className="sidebar-clear" onClick={clearFilters}>Clear all</button>
                )}
              </div>

              {/* Category */}
              <div className="sidebar-group">
                <p className="sidebar-group-label">Category</p>
                {CATEGORIES.map(cat => (
                  <Form.Check
                    key={cat}
                    type="checkbox"
                    id={`cat-${cat}`}
                    label={cat}
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="sidebar-check"
                  />
                ))}
              </div>

              {/* Price */}
              <div className="sidebar-group">
                <p className="sidebar-group-label">Price</p>
                {PRICE_RANGES.map(range => (
                  <Form.Check
                    key={range.label}
                    type="radio"
                    id={`price-${range.label}`}
                    name="priceRange"
                    label={range.label}
                    checked={selectedPriceRange === range.label}
                    onChange={() => selectPriceRange(range.label)}
                    className="sidebar-check"
                  />
                ))}
              </div>

              {/* Piece Count */}
              <div className="sidebar-group">
                <p className="sidebar-group-label">Piece Count</p>
                {PIECE_COUNTS.map(count => (
                  <Form.Check
                    key={count}
                    type="checkbox"
                    id={`pieces-${count}`}
                    label={`${count} pieces`}
                    checked={selectedPieceCounts.includes(count)}
                    onChange={() => togglePieceCount(count)}
                    className="sidebar-check"
                  />
                ))}
              </div>
            </aside>
          </Col>

          {/* Grid */}
          <Col lg={9} ref={gridRef}>
            {paginated.length === 0 ? (
              <div className="shop-empty">
                <p>No puzzles match your filters.</p>
                <Button className="hero-btn" onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <>
                <Row className="g-4">
                  {paginated.map(puzzle => (
                    <Col key={puzzle.id} sm={6} xl={4}>
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

                {totalPages > 1 && (
                  <div className="shop-pagination">
                    <Pagination>
                      <Pagination.Prev
                        disabled={page === 1}
                        onClick={() => changePage(page - 1)}
                      />
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                        <Pagination.Item
                          key={n}
                          active={n === page}
                          onClick={() => changePage(n)}
                        >
                          {n}
                        </Pagination.Item>
                      ))}
                      <Pagination.Next
                        disabled={page === totalPages}
                        onClick={() => changePage(page + 1)}
                      />
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </Col>

        </Row>
      </Container>
    </div>
  )
}

export default ShopPage
