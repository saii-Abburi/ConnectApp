export interface Member {
  name: string;
  role: string;
  contribution: string;
}

export interface Project {
  project_name: string;
  description: string;
  status: 'Completed' | 'Ongoing';
  members: Member[];
}

export interface TeamProject {
  team_name: string;
  lead: string;
  projects: Project[];
}

export const teamProjects: TeamProject[] = [
  {
    team_name: "Team Spark",
    lead: "Sai Praveen",
    projects: [
      {
        project_name: "EduConnect",
        description: "A platform to connect students and teachers for interactive learning.",
        status: "Completed",
        members: [
          {
            name: "Alex",
            role: "Frontend Developer",
            contribution: "Developed the UI using React.js"
          },
          {
            name: "Nina",
            role: "Backend Developer",
            contribution: "Built authentication and API endpoints"
          }
        ]
      },
      // ... rest of the data
    ]
  },
  // ... rest of the teams
]; 