import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavbarComp from './components/NavbarComp'
import LandingPage from './pages/LandingPage'
import FeaturesPage from './pages/FeaturesPage'
import ShopPage from './pages/ShopPage'
import CartPage from './pages/CartPage'
import SubmitPage from './pages/SubmitPage'
import { CartProvider } from './context/CartContext'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavbarComp />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/submit" element={<SubmitPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
