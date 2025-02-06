import { User, Team, Project, Role } from '../types';

// Mock data with correct types
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123', // In real app, this would be hashed
    bio: 'Full-stack developer with passion for React and Node.js',
    skills: ['React', 'Node.js', 'TypeScript'],
    education: 'BS Computer Science, Tech University',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    bio: 'UI/UX designer and frontend developer',
    skills: ['UI/UX', 'React', 'Figma'],
    education: 'BA Design, Art Institute',
  },
];

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Team Alpha',
    description: 'Building an innovative e-learning platform',
    members: [
      { id: '1', name: 'John Doe', role: 'Team Lead' },
      { id: '2', name: 'Jane Smith', role: 'UI Designer' },
    ],
    projects: [
      {
        id: '1',
        title: 'E-Learning Platform',
        description: 'A modern platform for online education',
        progress: 75,
        deadline: new Date('2024-06-30'),
        status: 'active',
        members: [
          { id: '1', name: 'John Doe', role: 'Team Lead' },
          { id: '2', name: 'Jane Smith', role: 'UI Designer' },
        ],
        tags: ['React', 'Node.js', 'MongoDB'],
      },
    ],
  },
  {
    id: '2',
    name: 'Team Beta',
    description: 'Developing a project management tool',
    members: [
      { id: '3', name: 'Mike Johnson', role: 'Backend Developer' },
    ],
    projects: [
      {
        id: '2',
        title: 'Project Management Tool',
        description: 'Streamlined project tracking and collaboration',
        progress: 30,
        deadline: new Date('2024-08-15'),
        status: 'planning',
        members: [
          { id: '3', name: 'Mike Johnson', role: 'Backend Developer' },
        ],
        tags: ['Vue.js', 'Express', 'PostgreSQL'],
      },
    ],
  },
];

const mockRoles: Role[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    teamName: 'Team Alpha',
    projectName: 'E-Learning Platform',
    requirements: ['React', 'TypeScript', 'UI/UX'],
    description: 'Looking for a frontend developer with strong React skills and eye for design',
    deadline: new Date('2024-04-30'),
  },
  {
    id: '2',
    title: 'Backend Developer',
    teamName: 'Team Beta',
    projectName: 'Project Management Tool',
    requirements: ['Node.js', 'PostgreSQL', 'API Design'],
    description: 'Seeking experienced backend developer for building scalable APIs',
    deadline: new Date('2024-05-15'),
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
const mockAPI = {
  auth: {
    login: async (email: string, password: string) => {
      // Add console.log to debug
      console.log('Login attempt:', { email, password });
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find user with exact email and password match
      const user = mockUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase() && 
        u.password === password
      );
      
      // Debug log
      console.log('Found user:', user);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Create a new object without the password
      const { password: _, ...userWithoutPassword } = user;
      
      // Return user data and token
      return {
        user: userWithoutPassword,
        token: `mock_token_${user.id}_${Date.now()}`
      };
    },

    register: async (userData: { name: string; email: string; password: string }) => {
      await new Promise(resolve => setTimeout(resolve, 500));

      // Check if user already exists
      if (mockUsers.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
        throw new Error('Email already registered');
      }

      // Create new user
      const newUser = {
        id: `${mockUsers.length + 1}`,
        ...userData,
        bio: '',
        skills: [],
        education: '',
      };

      // Add to mock database
      mockUsers.push(newUser);

      // Return without password
      const { password: _, ...userWithoutPassword } = newUser;
      
      return {
        user: userWithoutPassword,
        token: `mock_token_${newUser.id}_${Date.now()}`
      };
    },

    logout: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
  },

  teams: {
    getAll: async () => {
      await delay(800);
      return mockTeams;
    },
    getById: async (id: string) => {
      await delay(500);
      const team = mockTeams.find(t => t.id === id);
      if (!team) throw new Error('Team not found');
      return team;
    },
    create: async (teamData: Omit<Team, 'id'>) => {
      await delay(1000);
      const newTeam: Team = {
        id: String(mockTeams.length + 1),
        ...teamData,
      };
      mockTeams.push(newTeam);
      return newTeam;
    },
    update: async (id: string, teamData: Partial<Team>) => {
      await delay(800);
      const index = mockTeams.findIndex(t => t.id === id);
      if (index === -1) throw new Error('Team not found');
      mockTeams[index] = { ...mockTeams[index], ...teamData };
      return mockTeams[index];
    },
  },

  projects: {
    getAll: async () => {
      await delay(800);
      return mockTeams.flatMap(team => team.projects);
    },
    create: async (teamId: string, projectData: Omit<Project, 'id'>) => {
      await delay(1000);
      const team = mockTeams.find(t => t.id === teamId);
      if (!team) throw new Error('Team not found');
      const newProject: Project = {
        id: String(team.projects.length + 1),
        ...projectData,
      };
      team.projects.push(newProject);
      return newProject;
    },
    update: async (teamId: string, projectId: string, projectData: Partial<Project>) => {
      await delay(800);
      const team = mockTeams.find(t => t.id === teamId);
      if (!team) throw new Error('Team not found');
      const projectIndex = team.projects.findIndex(p => p.id === projectId);
      if (projectIndex === -1) throw new Error('Project not found');
      team.projects[projectIndex] = { ...team.projects[projectIndex], ...projectData };
      return team.projects[projectIndex];
    },
  },

  roles: {
    getAll: async () => {
      await delay(800);
      return mockRoles;
    },
    create: async (roleData: Omit<Role, 'id'>) => {
      await delay(1000);
      const newRole: Role = {
        id: String(mockRoles.length + 1),
        ...roleData,
      };
      mockRoles.push(newRole);
      return newRole;
    },
    apply: async (roleId: string, userId: string) => {
      await delay(1000);
      const role = mockRoles.find(r => r.id === roleId);
      if (!role) throw new Error('Role not found');
      // Simulate application process
      return { success: true, message: 'Application submitted successfully' };
    },
  },
};

export default mockAPI; 