import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectApi } from '../services/projectApi';
import { ProjectResponse } from '../types/project';
import './ProjectDetails.css';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadProject(id);
    }
  }, [id]);

  const loadProject = async (projectId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectApi.getProjectById(projectId);
      setProject(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!project?.id || !window.confirm('Are you sure you want to delete this project?')) {
      return;
    }
    try {
      await projectApi.deleteProject(project.id);
      navigate('/projects');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
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

  if (loading) {
    return <div className="loading">Loading project details...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button onClick={() => navigate('/projects')} className="btn btn-primary">
          Back to Projects
        </button>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="error-container">
        <div className="error-message">Project not found</div>
        <button onClick={() => navigate('/projects')} className="btn btn-primary">
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="project-details-container">
      <div className="project-details-header">
        <h2>{project.name}</h2>
        <span className={`project-status ${getStatusClass(project.status)}`}>
          {project.status}
        </span>
      </div>

      <div className="project-details-content">
        {project.description && (
          <div className="detail-section">
            <h3>Description</h3>
            <p>{project.description}</p>
          </div>
        )}

        <div className="detail-section">
          <h3>Project Information</h3>
          <div className="detail-grid">
            {project.owner && (
              <div className="detail-item">
                <strong>Owner:</strong>
                <span>{project.owner}</span>
              </div>
            )}
            <div className="detail-item">
              <strong>Start Date:</strong>
              <span>{formatDate(project.startDate)}</span>
            </div>
            {project.endDate && (
              <div className="detail-item">
                <strong>End Date:</strong>
                <span>{formatDate(project.endDate)}</span>
              </div>
            )}
            <div className="detail-item">
              <strong>Created:</strong>
              <span>{formatDate(project.createdAt)}</span>
            </div>
            {project.updatedAt && (
              <div className="detail-item">
                <strong>Last Updated:</strong>
                <span>{formatDate(project.updatedAt)}</span>
              </div>
            )}
          </div>
        </div>

        {project.tags && project.tags.length > 0 && (
          <div className="detail-section">
            <h3>Tags</h3>
            <div className="tags-list">
              {project.tags.map((tag, index) => (
                <span key={index} className="tag-item">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="project-details-actions">
        <button
          onClick={() => navigate(`/projects/${project.id}/edit`)}
          className="btn btn-primary"
        >
          Edit Project
        </button>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete Project
        </button>
        <button onClick={() => navigate('/projects')} className="btn btn-secondary">
          Back to Projects
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;

