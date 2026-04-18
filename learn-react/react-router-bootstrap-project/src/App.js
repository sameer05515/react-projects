import { Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProductsPage from './pages/ProductsPage';
import BlogPage from './pages/BlogPage';

const navLinkClass = ({ isActive }) =>
  `nav-link${isActive ? ' active' : ''}`;

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand mb-0 h1">Router + Bootstrap</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={navLinkClass} end to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navLinkClass} to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navLinkClass} to="/contact">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navLinkClass} to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navLinkClass} to="/blog">
                  Blog
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container flex-grow-1 py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
      </main>

      <footer className="border-top py-3 mt-auto bg-light">
        <div className="container small text-muted text-center">
          Five routes: /, /about, /contact, /products, /blog
        </div>
      </footer>
    </div>
  );
}

export default App;
