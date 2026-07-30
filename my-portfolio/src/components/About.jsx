import { User, Code2, Layout, Zap, Rocket } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function About() {
  const { about } = portfolioData;

  const getIcon = (index) => {
    switch (index) {
      case 0: return <Code2 size={24} className="highlight-icon" />;
      case 1: return <Layout size={24} className="highlight-icon" />;
      case 2: return <Zap size={24} className="highlight-icon" />;
      case 3: return <Rocket size={24} className="highlight-icon" />;
      default: return <Code2 size={24} className="highlight-icon" />;
    }
  };

  return (
    <section className="section-container" id="about">
      <div className="section-header">
        <div className="section-badge">
          <User size={16} /> Background
        </div>
        <h2 className="section-title">{about.title}</h2>
        <p className="section-subtitle">{about.subtitle}</p>
      </div>

      <div className="about-grid">
        <div className="about-text-content">
          {about.description.map((paragraph, i) => (
            <p key={i} className="about-paragraph">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="about-highlights-grid">
          {about.highlights.map((item, idx) => (
            <div key={idx} className="highlight-card">
              <div className="highlight-icon-wrapper">
                {getIcon(idx)}
              </div>
              <h3 className="highlight-title">{item.title}</h3>
              <p className="highlight-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
