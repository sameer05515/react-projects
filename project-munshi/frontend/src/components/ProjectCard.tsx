import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectResponse } from '../types/project';
import MarkdownRenderer from './MarkdownRenderer';
import './ProjectCard.css';

interface ProjectCardProps {
  project: ProjectResponse;
  onDelete: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDelete }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusClass = (status: string) => {
    const statusMap: { [key: string]: string } = {
      ACTIVE: 'status-active',
      COMPLETED: 'status-completed',
      ON_HOLD: 'status-on-hold',
      CANCELLED: 'status-cancelled',
    };
    return statusMap[status] || 'status-default';
  };

  return (
    <div className="project-card">
      <div className="project-card-header">
        <h3 className="project-card-title">{project.name}</h3>
        <span className={`project-status ${getStatusClass(project.status)}`}>
          {project.status}
        </span>
      </div>

      {project.description && (
        <div className="project-description">
          <MarkdownRenderer content={project.description} className="project-description-markdown" />
        </div>
      )}

      <div className="project-card-details">
        {project.owner && (
          <div className="project-detail-item">
            <strong>Owner:</strong> {project.owner}
          </div>
        )}
        <div className="project-detail-item">
          <strong>Start Date:</strong> {formatDate(project.startDate)}
        </div>
        {project.endDate && (
          <div className="project-detail-item">
            <strong>End Date:</strong> {formatDate(project.endDate)}
          </div>
        )}
      </div>

      {project.tags && project.tags.length > 0 && (
        <div className="project-tags">
          {project.tags.map((tag, index) => (
            <span key={index} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="project-card-actions">
        <Link to={`/projects/${project.id}`} className="btn btn-sm btn-primary">
          View Details
        </Link>
        <Link to={`/projects/${project.id}/edit`} className="btn btn-sm btn-secondary">
          Edit
        </Link>
        <button
          onClick={() => onDelete(project.id!)}
          className="btn btn-sm btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;

