interface RoleCardProps {
  id: string;
  title: string;
  teamName: string;
  projectName: string;
  requirements: string[];
  description: string;
  deadline: Date;
  onApply: (id: string) => void;
}

const RoleCard = ({
  id,
  title,
  teamName,
  projectName,
  requirements,
  description,
  deadline,
  onApply,
}: RoleCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="text-gray-600">
          <p>Team: {teamName}</p>
          <p>Project: {projectName}</p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Description:</h4>
        <p className="text-gray-600">{description}</p>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Requirements:</h4>
        <ul className="list-disc list-inside text-gray-600">
          {requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Apply by: {deadline.toLocaleDateString()}
        </span>
        <button
          onClick={() => onApply(id)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default RoleCard; 