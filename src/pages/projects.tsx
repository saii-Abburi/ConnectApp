import { NextPage } from 'next';
import { useState } from 'react';
import ProjectCard from '../components/ProjectCard';

const Projects: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');

  // Mock data - replace with actual data fetching
  const projects = [
    {
      id: '1',
      title: 'Project 1',
      description: 'Description...',
      progress: 75,
      deadline: new Date('2024-12-31'),
      members: [{ id: '1', name: 'John', role: 'Developer' }],
      tags: ['React', 'TypeScript'],
    },
    // Add more projects...
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Projects</h1>

          {/* Filters and Search */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              placeholder="Search projects..."
              className="p-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="p-2 border rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="planning">Planning</option>
            </select>
            <select
              className="p-2 border rounded-md"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="deadline">Sort by Deadline</option>
              <option value="progress">Sort by Progress</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>

          {/* Create Project Button */}
          <button
            onClick={() => {/* Implement create project logic */}}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Create New Project
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              {...project}
              onViewProject={(id) => {/* Implement view project logic */}}
            />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No projects found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects; 