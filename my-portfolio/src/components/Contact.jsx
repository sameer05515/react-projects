import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Check, Copy } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const { personal } = portfolioData;
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="section-container" id="contact">
      <div className="section-header">
        <div className="section-badge">
          <Mail size={16} /> Get In Touch
        </div>
        <h2 className="section-title">Let's Connect</h2>
        <p className="section-subtitle">
          Open to Architecture, Lead, and Senior Developer roles. ({personal.availability})
        </p>
      </div>

      <div className="contact-grid">
        {/* Direct Contact Info */}
        <div className="contact-info">
          <h3 className="contact-info-title">Contact Details</h3>
          <p className="contact-info-text">
            Feel free to reach out directly via email, phone, or by submitting a message below.
          </p>

          <div className="contact-methods">
            <div className="contact-method-card">
              <div className="method-icon"><Mail size={20} /></div>
              <div>
                <div className="method-label">Email</div>
                <div className="method-value">{personal.email}</div>
              </div>
              <button
                className="copy-btn"
                onClick={handleCopyEmail}
                title="Copy Email"
              >
                {copied ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
              </button>
            </div>

            <div className="contact-method-card">
              <div className="method-icon"><Phone size={20} /></div>
              <div>
                <div className="method-label">Phone</div>
                <div className="method-value">{personal.phone}</div>
              </div>
            </div>

            <div className="contact-method-card">
              <div className="method-icon"><MapPin size={20} /></div>
              <div>
                <div className="method-label">Location</div>
                <div className="method-value">{personal.location}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-card">
          {submitted ? (
            <div className="form-success-state">
              <div className="success-icon"><Check size={32} /></div>
              <h3>Message Sent Successfully!</h3>
              <p>Thank you for reaching out. I'll get back to you promptly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="Recruiter / Hiring Manager"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  placeholder="Architect Opportunity / Technical Discussion"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Share details about the role or project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary form-submit-btn">
                Send Message <Send size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
