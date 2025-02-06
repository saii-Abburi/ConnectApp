import axios, { AxiosInstance } from 'axios';
import mockAPI from './mockApi';

// Create an axios instance for real API calls
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors to the axios instance
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Use mock API for development
const api = mockAPI;

export const authAPI = {
  login: async (email: string, password: string) => {
    return api.auth.login(email, password);
  },
  register: async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    return api.auth.register(userData);
  },
};

export const teamsAPI = {
  getTeams: async () => {
    return api.teams.getAll();
  },
  createTeam: async (teamData: any) => {
    return api.teams.create(teamData);
  },
  updateTeam: async (id: string, teamData: any) => {
    return api.teams.update(id, teamData);
  },
};

export const projectsAPI = {
  getProjects: async () => {
    return api.projects.getAll();
  },
  createProject: async (teamId: string, projectData: any) => {
    return api.projects.create(teamId, projectData);
  },
  updateProject: async (teamId: string, projectId: string, projectData: any) => {
    return api.projects.update(teamId, projectId, projectData);
  },
};

export const rolesAPI = {
  getRoles: async () => {
    return api.roles.getAll();
  },
  createRole: async (roleData: any) => {
    return api.roles.create(roleData);
  },
  applyToRole: async (roleId: string, userId: string) => {
    return api.roles.apply(roleId, userId);
  },
};

// Export both the mock API and the axios instance
export { axiosInstance };
export default api; 