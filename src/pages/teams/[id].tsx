import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useTeam } from '../../context/TeamContext';
import { useState, useEffect } from 'react';

const TeamDetails: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { teams } = useTeam();
  const [loading, setLoading] = useState(true);

  const team = teams.find(t => t.id === id);

  useEffect(() => {
    if (router.isReady) {
      setLoading(false);
    }
  }, [router.isReady]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!team) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">Team not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-6">{team.name}</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">About</h2>
            <p className="text-gray-600">{team.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Team Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {team.members.map(member => (
                <div
                  key={member.id}
                  className="bg-gray-50 rounded-lg p-4"
                >
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-gray-600 text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {team.projects.map(project => (
                <div
                  key={project.id}
                  className="bg-gray-50 rounded-lg p-4"
                >
                  <h3 className="font-medium">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => router.back()}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors mr-4"
            >
              Back
            </button>
            <button
              onClick={() => {/* Implement edit team logic */}}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Edit Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails; 