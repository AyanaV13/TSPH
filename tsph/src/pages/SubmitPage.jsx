import React, { useState, useRef } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Footer from '../components/Footer'
import './LandingPage.css'
import './SubmitPage.css'

const CATEGORIES = ['Nature', 'Landscape', 'Abstract', 'Colorful', 'Vintage', 'Seasonal', 'Urban', 'Coastal']

const pastSelections = [
  { id: 1, title: 'Misty Pines',    handle: '@sarahdraws',    date: 'June 2026',  category: 'Nature'    },
  { id: 2, title: 'City at Dusk',   handle: '@tomillustrates', date: 'May 2026',   category: 'Urban'     },
  { id: 3, title: 'Tide Pool',      handle: '@marineart',     date: 'May 2026',   category: 'Coastal'   },
  { id: 4, title: 'Golden Fields',  handle: '@lukepaintings', date: 'April 2026', category: 'Landscape' },
]

const EMPTY_FORM = {
  fullName: '', email: '', instagram: '', artworkTitle: '',
  description: '', categories: [],
}

function SubmitPage() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [file, setFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const fileInputRef = useRef(null)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  function toggleCategory(cat) {
    setForm(prev => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat],
    }))
  }

  function handleFileDrop(e) {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) validateAndSetFile(dropped)
  }

  function handleFileInput(e) {
    if (e.target.files[0]) validateAndSetFile(e.target.files[0])
  }

  function validateAndSetFile(f) {
    const allowed = ['image/png', 'image/jpeg', 'image/tiff']
    if (!allowed.includes(f.type)) {
      setErrors(prev => ({ ...prev, file: 'Only PNG, JPG, or TIFF files are accepted.' }))
      return
    }
    if (f.size > 50 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, file: 'File must be under 50MB.' }))
      return
    }
    setFile(f)
    setErrors(prev => ({ ...prev, file: '' }))
  }

  function validate() {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.artworkTitle.trim()) e.artworkTitle = 'Required'
    if (!form.description.trim()) e.description = 'Required'
    if (!file) e.file = 'Please attach your artwork file'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (validate()) setSubmitted(true)
  }

  if (submitted) {
    return (
      <>
        <div className="submit-page">
          <div className="submit-hero">
            <Container className="text-center">
              <div className="submit-success-icon">✓</div>
              <h1 className="submit-heading">Submission Received!</h1>
              <p className="submit-description">
                Thanks, {form.fullName.split(' ')[0]}! We'll review your piece and get back to you within 2 weeks.
              </p>
            </Container>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const nextBatch = 'August 2026'
  const deadline = 'July 15, 2026'

  return (
    <>
      <div className="submit-page">

        {/* Hero */}
        <section className="submit-hero">
          <Container className="text-center">
            <p className="submit-eyebrow">Community Submissions</p>
            <h1 className="submit-heading">Submit Your Artwork</h1>
            <p className="submit-batch">Featured batch · {nextBatch}</p>
            <p className="submit-description">
              Each month we hand-select community submissions to feature in our next batch.<br />
              Selected artists receive a free puzzle and full credit on the product page.
            </p>
          </Container>
        </section>

        {/* Community Spotlight */}
        <section className="spotlight-section">
          <Container>
            <div className="spotlight-header">
              <div>
                <p className="spotlight-eyebrow">Past Selections</p>
                <h2 className="spotlight-heading">Community Spotlight</h2>
              </div>
              <span className="spotlight-note">Showing selections from previous months</span>
            </div>

            <Row className="g-3">
              {pastSelections.map(item => (
                <Col key={item.id} sm={6} lg={3}>
                  <div className="spotlight-card">
                    <div className="spotlight-card-img"><span>Artwork</span></div>
                    <div className="spotlight-card-body">
                      <p className="spotlight-card-title">{item.title}</p>
                      <p className="spotlight-card-handle">{item.handle}</p>
                      <p className="spotlight-card-meta">{item.date} · {item.category}</p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

            <div className="spotlight-ticker">
              <span>Deadline for {nextBatch} batch: <strong>{deadline}</strong></span>
              <span className="ticker-dot">·</span>
              <span>Selected artists are notified within 2 weeks</span>
              <span className="ticker-dot">·</span>
              <span>You keep all rights to your work</span>
            </div>
          </Container>
        </section>

        {/* Submission Form */}
        <section className="submit-form-section">
          <Container>
            <Form onSubmit={handleSubmit} noValidate>
              <Row className="g-4">

                {/* Left column — text fields */}
                <Col lg={6}>
                  <div className="submit-form-card">
                    <h3 className="submit-form-card-title">Your Details</h3>
                    <Row className="g-3">
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label className="submit-label">Full Name</Form.Label>
                          <Form.Control name="fullName" value={form.fullName} onChange={handleChange}
                            isInvalid={!!errors.fullName} className="submit-input" placeholder="Your name" />
                          <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label className="submit-label">Email</Form.Label>
                          <Form.Control type="email" name="email" value={form.email} onChange={handleChange}
                            isInvalid={!!errors.email} className="submit-input" placeholder="your@email.com" />
                          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label className="submit-label">
                            Instagram <span className="submit-optional">(optional)</span>
                          </Form.Label>
                          <Form.Control name="instagram" value={form.instagram} onChange={handleChange}
                            className="submit-input" placeholder="@yourhandle" />
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label className="submit-label">Artwork Title</Form.Label>
                          <Form.Control name="artworkTitle" value={form.artworkTitle} onChange={handleChange}
                            isInvalid={!!errors.artworkTitle} className="submit-input" placeholder="Name your piece" />
                          <Form.Control.Feedback type="invalid">{errors.artworkTitle}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>

                  <div className="submit-form-card mt-4">
                    <h3 className="submit-form-card-title">About Your Artwork</h3>
                    <Row className="g-3">
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label className="submit-label">Description</Form.Label>
                          <Form.Control as="textarea" rows={4} name="description" value={form.description}
                            onChange={handleChange} isInvalid={!!errors.description}
                            className="submit-input" placeholder="Tell us about your piece..." />
                          <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Label className="submit-label">Style / Category</Form.Label>
                        <div className="submit-category-grid">
                          {CATEGORIES.map(cat => (
                            <button
                              key={cat}
                              type="button"
                              className={`submit-category-tag${form.categories.includes(cat) ? ' selected' : ''}`}
                              onClick={() => toggleCategory(cat)}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>

                {/* Right column — file upload + guidelines */}
                <Col lg={6}>
                  <div
                    className={`submit-dropzone${dragOver ? ' drag-over' : ''}${errors.file ? ' has-error' : ''}`}
                    onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleFileDrop}
                    onClick={() => fileInputRef.current.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".png,.jpg,.jpeg,.tiff,.tif"
                      className="submit-file-input"
                      onChange={handleFileInput}
                    />
                    <div className="submit-dropzone-icon">
                      {file ? '🖼' : '⬆'}
                    </div>
                    {file ? (
                      <>
                        <p className="submit-dropzone-title">{file.name}</p>
                        <p className="submit-dropzone-hint">
                          {(file.size / (1024 * 1024)).toFixed(1)} MB · Click to replace
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="submit-dropzone-title">Drop your file here</p>
                        <p className="submit-dropzone-hint">PNG, JPG, or TIFF · Min 3000px wide · Max 50MB</p>
                      </>
                    )}
                    <button type="button" className="submit-browse-btn" onClick={e => { e.stopPropagation(); fileInputRef.current.click() }}>
                      Browse Files
                    </button>
                    {errors.file && <p className="submit-file-error">{errors.file}</p>}
                  </div>

                  <div className="submit-guidelines">
                    <h4 className="submit-guidelines-title">Submission guidelines</h4>
                    <ul className="submit-guidelines-list">
                      <li>Minimum resolution of 3000px on the shortest side</li>
                      <li>Must be original artwork — no AI-generated images</li>
                      <li>You retain all rights; we license for one print run only</li>
                      <li>Selected artists receive a free finished puzzle</li>
                    </ul>
                  </div>

                  <Button type="submit" className="submit-cta-btn">
                    Submit for Review
                  </Button>
                  <p className="submit-cta-note">We review all submissions within 2 weeks and notify you by email.</p>
                </Col>

              </Row>
            </Form>
          </Container>
        </section>

      </div>
      <Footer />
    </>
  )
}

export default SubmitPage
