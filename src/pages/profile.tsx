import { NextPage } from 'next';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

interface User {
  name?: string;
  bio?: string;
  skills?: string[];
  education?: string;
  // ... other existing user properties ...
}

const Profile: NextPage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>({
    name: user?.name || '',
    bio: user?.bio || '',
    skills: user?.skills || [],
    education: user?.education || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement profile update logic here
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-center">Please login to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Profile</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-blue-600 hover:text-blue-700"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-1 block w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="mt-1 block w-full p-2 border rounded-md"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Education
                </label>
                <input
                  type="text"
                  value={formData.education}
                  onChange={(e) => setFormData({...formData, education: e.target.value})}
                  className="mt-1 block w-full p-2 border rounded-md"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">About</h2>
                <p className="text-gray-600">{formData.bio || 'No bio added yet.'}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Education</h2>
                <p className="text-gray-600">{formData.education || 'No education details added.'}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                  {formData.skills.length === 0 && (
                    <p className="text-gray-600">No skills added yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 