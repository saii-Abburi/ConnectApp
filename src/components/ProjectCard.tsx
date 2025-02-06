interface ProjectMember {
  id: string;
  name: string;
  role: string;
}

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  deadline: Date;
  members: ProjectMember[];
  tags: string[];
  onViewProject: (id: string) => void;
}

const ProjectCard = ({
  id,
  title,
  description,
  progress,
  deadline,
  members,
  tags,
  onViewProject,
}: ProjectCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="flex gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm text-gray-600">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 rounded-full h-2"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Team Members:</h4>
        <div className="flex flex-wrap gap-2">
          {members.map((member) => (
            <span
              key={member.id}
              className="bg-gray-100 px-2 py-1 rounded-full text-sm"
            >
              {member.name} ({member.role})
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Deadline: {deadline.toLocaleDateString()}
        </span>
        <button
          onClick={() => onViewProject(id)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          View Project
        </button>
      </div>
    </div>
  );
};

export default ProjectCard; 