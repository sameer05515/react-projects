import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="header-logo">
          <h1>Munshi Project</h1>
        </Link>
        <nav className="header-nav">
          <Link to="/projects" className="nav-link">
            Projects
          </Link>
          <Link to="/projects/new" className="nav-link nav-link-primary">
            + New Project
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

