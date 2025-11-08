export interface Project {
  id?: string;
  name: string;
  description?: string;
  status: string;
  startDate: string;
  endDate?: string;
  owner?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectRequest {
  name: string;
  description?: string;
  status: string;
  startDate: string;
  endDate?: string;
  owner?: string;
  tags?: string[];
}

export interface ProjectResponse extends Project {
  id: string;
  createdAt: string;
  updatedAt: string;
}

