import { Briefcase, Calendar, Building2, GraduationCap } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Experience() {
  const { experience, education } = portfolioData;

  return (
    <section className="section-container" id="experience">
      <div className="section-header">
        <div className="section-badge">
          <Briefcase size={16} /> Career History
        </div>
        <h2 className="section-title">Professional Experience</h2>
        <p className="section-subtitle">
          Over 14.5 years of architectural leadership, system design, and enterprise software engineering
        </p>
      </div>

      <div className="timeline-container">
        {experience.map((item, idx) => (
          <div key={idx} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-card">
              <div className="timeline-header">
                <div>
                  <h3 className="timeline-role">{item.role}</h3>
                  <div className="timeline-company">
                    <Building2 size={16} /> {item.company}
                  </div>
                </div>
                <div className="timeline-period">
                  <Calendar size={14} /> {item.period}
                </div>
              </div>
              <p className="timeline-desc">{item.description}</p>
              <div className="timeline-skills">
                {item.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="timeline-skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Education Item */}
        {education && (
          <div className="timeline-item education-item">
            <div className="timeline-dot education-dot"></div>
            <div className="timeline-card education-card">
              <div className="timeline-header">
                <div>
                  <h3 className="timeline-role">{education.degree}</h3>
                  <div className="timeline-company">
                    <GraduationCap size={18} /> {education.institution}
                  </div>
                </div>
                <div className="timeline-period">
                  <Calendar size={14} /> {education.period}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
