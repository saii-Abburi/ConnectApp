export interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
  skills: string[];
  education: string;
  [x: string]: string | string[] | undefined;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  projects: Project[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  deadline: Date;
  status: 'planning' | 'active' | 'completed';
  members: TeamMember[];
  tags: string[];
}

export interface Role {
  id: string;
  title: string;
  teamName: string;
  projectName: string;
  requirements: string[];
  description: string;
  deadline: Date;
} 