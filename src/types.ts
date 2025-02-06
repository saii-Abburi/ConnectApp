export interface Project {
  id: string;
  name: string;
  projectStatus: 'planning' | 'active' | 'completed';
  // ... other existing project properties ...
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  lead: string;
  members: TeamMember[];
  projects: Project[];
} 
