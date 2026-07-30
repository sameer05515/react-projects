import { ArrowUp, Heart } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <p>© {new Date().getFullYear()} {portfolioData.personal.name}. Built with React & Vite.</p>
        </div>

        <div className="footer-center">
          <p className="footer-made">
            Made with <Heart size={14} className="heart-icon" /> for the web
          </p>
        </div>

        <div className="footer-right">
          <button onClick={scrollToTop} className="back-to-top-btn" aria-label="Back to top">
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
