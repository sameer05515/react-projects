import { Cpu, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Skills() {
  const { skillCategories } = portfolioData;

  return (
    <section className="section-container" id="skills">
      <div className="section-header">
        <div className="section-badge">
          <Cpu size={16} /> Expertise
        </div>
        <h2 className="section-title">Skills & Tech Stack</h2>
        <p className="section-subtitle">
          Technologies and tools I use to turn ideas into digital products
        </p>
      </div>

      <div className="skills-grid">
        {skillCategories.map((category, idx) => (
          <div key={idx} className="skill-category-card">
            <h3 className="category-title">{category.name}</h3>
            <div className="skills-list">
              {category.skills.map((skill, sIdx) => (
                <div key={sIdx} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">
                      <CheckCircle2 size={16} className="skill-check" />
                      {skill.name}
                    </span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div
                      className="skill-bar-fill"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
