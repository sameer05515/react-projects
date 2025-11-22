import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectApi } from '../services/projectApi';
import { ProjectResponse } from '../types/project';
import ProjectCard from './ProjectCard';
import ConfirmationModal from './ConfirmationModal';
import CsvImport from './CsvImport';
import './ProjectList.css';

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; projectId: string | null; projectName: string }>({
    isOpen: false,
    projectId: null,
    projectName: '',
  });
  const [showCsvImport, setShowCsvImport] = useState<boolean>(false);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    } else if (statusFilter) {
      handleStatusFilter(statusFilter);
    } else {
      loadProjects();
    }
  }, [searchTerm, statusFilter]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectApi.getAllProjects();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (term: string) => {
    if (!term.trim()) {
      loadProjects();
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const data = await projectApi.searchProjectsByName(term);
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search projects');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusFilter = async (status: string) => {
    if (!status) {
      loadProjects();
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const data = await projectApi.getProjectsByStatus(status);
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to filter projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteConfirm({
      isOpen: true,
      projectId: id,
      projectName: name,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.projectId) return;

    try {
      await projectApi.deleteProject(deleteConfirm.projectId);
      setProjects(projects.filter((p) => p.id !== deleteConfirm.projectId));
      setDeleteConfirm({ isOpen: false, projectId: null, projectName: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
      setDeleteConfirm({ isOpen: false, projectId: null, projectName: '' });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ isOpen: false, projectId: null, projectName: '' });
  };

  return (
    <div className="project-list-container">
      <div className="project-list-header">
        <h2>Projects</h2>
        <div className="header-actions">
          <button
            onClick={() => setShowCsvImport(true)}
            className="btn btn-secondary"
          >
            📥 Import CSV
          </button>
          <Link to="/projects/new" className="btn btn-primary">
            + New Project
          </Link>
        </div>
      </div>

      <div className="project-list-filters">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setStatusFilter('');
            }}
            className="search-input"
          />
        </div>
        <div className="filter-group">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setSearchTerm('');
            }}
            className="status-filter"
          >
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="COMPLETED">Completed</option>
            <option value="ON_HOLD">On Hold</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
        <button onClick={loadProjects} className="btn btn-secondary">
          Reset Filters
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="no-projects">
          <p>No projects found.</p>
          <Link to="/projects/new" className="btn btn-primary">
            Create your first project
          </Link>
        </div>
      ) : (
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={() => handleDeleteClick(project.id!, project.name)}
            />
          ))}
        </div>
      )}

      <ConfirmationModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteConfirm.projectName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        variant="danger"
      />

      {showCsvImport && (
        <CsvImport
          onImportComplete={loadProjects}
          onClose={() => setShowCsvImport(false)}
        />
      )}
    </div>
  );
};

export default ProjectList;

