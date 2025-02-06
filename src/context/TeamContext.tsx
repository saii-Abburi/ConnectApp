import { createContext, useContext, useState, ReactNode } from 'react';
import { fakeTeams } from '../data/fakeTeams';

interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  projects: Project[];
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  deadline: Date;
  projectStatus: 'planning' | 'active' | 'completed';
  members: TeamMember[];
  tags: string[];
}

interface TeamContextType {
  teams: Team[];
  currentTeam: Team | null;
  setCurrentTeam: (team: Team | null) => void;
  addTeam: (team: Team) => void;
  updateTeam: (team: Team) => void;
  deleteTeam: (teamId: string) => void;
  createTeam: (team: Omit<Team, 'id'>) => Promise<void>;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export function TeamProvider({ children }: { children: ReactNode }) {
  const [teams, setTeams] = useState<Team[]>(fakeTeams);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);

  const addTeam = (newTeam: Team) => {
    setTeams(prevTeams => [...prevTeams, newTeam]);
  };

  const updateTeam = (updatedTeam: Team) => {
    setTeams(teams.map(team => 
      team.id === updatedTeam.id ? updatedTeam : team
    ));
  };

  const deleteTeam = (teamId: string) => {
    setTeams(teams.filter(team => team.id !== teamId));
  };

  const createTeam = async (teamData: Omit<Team, 'id'>) => {
    const newTeam = {
      ...teamData,
      id: `team-${Date.now()}`, // Generate a unique ID (you might want to use UUID in production)
    };

    // In a real app, you would make an API call here
    setTeams(prevTeams => [...prevTeams, newTeam]);
  };

  return (
    <TeamContext.Provider
      value={{
        teams,
        currentTeam,
        setCurrentTeam,
        addTeam,
        updateTeam,
        deleteTeam,
        createTeam,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
} 