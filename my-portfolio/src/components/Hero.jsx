import { ArrowRight, Mail, Terminal, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';
import { portfolioData } from '../data/portfolioData';

export default function Hero() {
  const { personal, stats } = portfolioData;

  return (
    <section className="hero-section" id="hero">
      <div className="hero-bg-glow"></div>
      <div className="hero-container">
        <div className="hero-content">
          <div className="status-badge">
            <span className="status-dot"></span>
            {personal.availability}
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">{personal.name}</span>
          </h1>
          <h2 className="hero-subtitle">{personal.title}</h2>
          <p className="hero-description">{personal.bio}</p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              Explore Work <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn btn-secondary">
              Contact Me
            </a>
          </div>

          <div className="social-links">
            <a href={`mailto:${personal.email}`} aria-label="Email">
              <Mail size={20} />
            </a>
            <a href={personal.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedinIcon size={20} />
            </a>
            <a href={personal.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubIcon size={20} />
            </a>
            <a href={personal.twitter} target="_blank" rel="noreferrer" aria-label="Twitter">
              <TwitterIcon size={20} />
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="terminal-card">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="terminal-title">
                <Terminal size={14} /> architect.config.java
              </div>
            </div>
            <div className="terminal-body">
              <pre>
<code>
<span className="code-keyword">public class</span> <span className="code-var">SolutionArchitect</span> &#123;<br />
&nbsp;&nbsp;String name = <span className="code-string">"{personal.name}"</span>;<br />
&nbsp;&nbsp;String role = <span className="code-string">"Java Solution Architect"</span>;<br />
&nbsp;&nbsp;double experience = <span className="code-string">14.5</span>; <span className="code-keyword">// Years</span><br />
&nbsp;&nbsp;String[] coreStack = &#123;<br />
&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-string">"Java 21"</span>, <span className="code-string">"Spring Boot"</span>,<br />
&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-string">"Microservices"</span>, <span className="code-string">"System Design"</span>,<br />
&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-string">"AWS"</span>, <span className="code-string">"Kubernetes"</span>, <span className="code-string">"ReactJS"</span><br />
&nbsp;&nbsp;&#125;;<br />
&nbsp;&nbsp;String status = <span className="code-string">"{personal.availability}"</span>;<br />
&#125;
</code>
              </pre>
            </div>
            <div className="terminal-footer">
              <span className="code-success"><CheckCircle2 size={14} /> Ready for Solution Architect & Lead roles</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="stats-container">
        {stats.map((stat, idx) => (
          <div className="stat-card" key={idx}>
            <div className="stat-value gradient-text">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
