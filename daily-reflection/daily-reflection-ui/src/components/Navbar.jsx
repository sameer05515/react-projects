import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          Daily Reflection
        </Link>

        <div className="nav-links">
          <Link to="/add">Add Reflection</Link>

          <Link to="/reflections">
            View Reflections
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;