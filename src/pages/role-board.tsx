import { NextPage } from 'next';
import { useState } from 'react';
import RoleCard from '../components/RoleCard';
import { rolesAPI } from '../utils/api';
import { Role } from '../types';

const RoleBoard: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('all');
  const [roles, setRoles] = useState<Role[]>([]);

  const handleApply = async (roleId: string) => {
    try {
      await rolesAPI.applyToRole(roleId, 'current-user-id');
      // Add success notification
    } catch (error) {
      // Add error notification
      console.error('Failed to apply for role:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Available Roles</h1>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search roles..."
              className="flex-1 p-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="p-2 border rounded-md"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
            >
              <option value="all">All Skills</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="design">Design</option>
            </select>
          </div>

          {/* Post Role Button */}
          <button
            onClick={() => {/* Implement post role logic */}}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Post New Role
          </button>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map(role => (
            <RoleCard
              key={role.id}
              {...role}
              onApply={() => handleApply(role.id)}
            />
          ))}
        </div>

        {roles.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No roles found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleBoard; 