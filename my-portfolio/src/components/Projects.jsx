import { useState } from 'react';
import { FolderGit2, ExternalLink, Star } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { portfolioData } from '../data/portfolioData';

export default function Projects() {
  const { projects } = portfolioData;
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Full Stack', 'Frontend'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section className="section-container" id="projects">
      <div className="section-header">
        <div className="section-badge">
          <FolderGit2 size={16} /> Portfolio
        </div>
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">
          A selection of recent projects showcasing web apps, APIs, and interfaces
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="project-filter-container">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-image-wrapper">
              <img src={project.image} alt={project.title} loading="lazy" />
              {project.featured && (
                <span className="featured-badge">
                  <Star size={12} fill="currentColor" /> Featured
                </span>
              )}
            </div>

            <div className="project-content">
              <span className="project-category">{project.category}</span>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>

              <div className="project-tags">
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="tag">{tag}</span>
                ))}
              </div>

              <div className="project-links">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link primary"
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link secondary"
                >
                  <GithubIcon size={16} /> Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
