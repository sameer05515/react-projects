import { Project, ProjectRequest, ProjectResponse } from '../types/project';

const API_BASE_URL = '/api';

export const projectApi = {
  // Get all projects
  getAllProjects: async (): Promise<ProjectResponse[]> => {
    const response = await fetch(`${API_BASE_URL}/projects`);
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    return response.json();
  },

  // Get project by ID
  getProjectById: async (id: string): Promise<ProjectResponse> => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch project');
    }
    return response.json();
  },

  // Create a new project
  createProject: async (project: ProjectRequest): Promise<ProjectResponse> => {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create project');
    }
    return response.json();
  },

  // Update a project
  updateProject: async (id: string, project: ProjectRequest): Promise<ProjectResponse> => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update project');
    }
    return response.json();
  },

  // Delete a project
  deleteProject: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete project');
    }
  },

  // Search projects by name
  searchProjectsByName: async (name: string): Promise<ProjectResponse[]> => {
    const response = await fetch(`${API_BASE_URL}/projects/search?name=${encodeURIComponent(name)}`);
    if (!response.ok) {
      throw new Error('Failed to search projects');
    }
    return response.json();
  },

  // Get projects by status
  getProjectsByStatus: async (status: string): Promise<ProjectResponse[]> => {
    const response = await fetch(`${API_BASE_URL}/projects/status/${encodeURIComponent(status)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch projects by status');
    }
    return response.json();
  },

  // Get projects by owner
  getProjectsByOwner: async (owner: string): Promise<ProjectResponse[]> => {
    const response = await fetch(`${API_BASE_URL}/projects/owner/${encodeURIComponent(owner)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch projects by owner');
    }
    return response.json();
  },

  // Create multiple projects (bulk import)
  createProjectsBulk: async (projects: ProjectRequest[]): Promise<ProjectResponse[]> => {
    const response = await fetch(`${API_BASE_URL}/projects/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projects),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create projects');
    }
    return response.json();
  },
};

