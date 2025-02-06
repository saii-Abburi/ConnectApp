import { TeamMember } from '../types';

interface TeamCardProps {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  projectCount: number;
  onViewTeam: (id: string) => void;
}

const TeamCard = ({ id, name, description, members, projectCount, onViewTeam }: TeamCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Team Members</h4>
        <div className="flex flex-wrap gap-2">
          {members.map(member => (
            <span
              key={member.id}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {member.name} • {member.role}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {projectCount} {projectCount === 1 ? 'Project' : 'Projects'}
        </span>
        <button
          onClick={() => onViewTeam(id)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          View Team
        </button>
      </div>
    </div>
  );
};

export default TeamCard; 