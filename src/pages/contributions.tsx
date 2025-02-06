import type { NextPage } from 'next';
import { useState } from 'react';
import { 
  Search, 
  Filter,
  Calendar,
  Star,
  Plus,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Users
} from 'lucide-react';
import { teamProjects } from '../data/fakeContributions';

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-50 text-green-700';
    case 'ongoing':
      return 'bg-blue-50 text-blue-700';
    default:
      return 'bg-gray-50 text-gray-700';
  }
};

const Contributions: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isTeamLead, setIsTeamLead] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showHiringMessage, setShowHiringMessage] = useState(false);

  // Flatten projects and their members into contributions
  const allContributions = teamProjects.flatMap(team => 
    team.projects.flatMap(project => 
      project.members.map(member => ({
        id: `${team.team_name}-${project.project_name}-${member.name}`,
        teamName: team.team_name,
        projectName: project.project_name,
        description: member.contribution,
        status: project.status,
        member: member,
        teamLead: team.lead
      }))
    )
  );

  const filteredContributions = allContributions.filter(contribution => {
    const matchesSearch = 
      contribution.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contribution.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contribution.teamName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || contribution.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Contributions</h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Track your impact and team contributions
            </p>
          </div>
          
          {isTeamLead && (
            <div className="flex gap-4 w-full md:w-auto">
              <button
                onClick={() => setShowCreatePost(true)}
                className="flex-1 md:flex-none px-6 py-2.5 bg-black text-white rounded-lg flex items-center justify-center hover:bg-gray-900 transition-all duration-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Contribution
              </button>
              <button
                onClick={() => setShowHiringMessage(true)}
                className="flex-1 md:flex-none px-6 py-2.5 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                Hiring Message
              </button>
            </div>
          )}
        </div>

        {/* Filters Section */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search contributions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-base"
              />
            </div>
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all appearance-none bg-white text-base min-w-[160px]"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="ongoing">Ongoing</option>
          </select>
        </div>

        {/* Contributions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredContributions.map((contribution) => (
            <div
              key={contribution.id}
              className="bg-white rounded-xl border border-gray-100 p-6 hover:border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-gray-900 leading-tight">
                    {contribution.projectName}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">
                    {contribution.teamName}
                  </p>
                </div>
                <span className={`px-3 py-1.5 ${getStatusColor(contribution.status)} text-sm font-medium rounded-full`}>
                  {contribution.status}
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Users className="w-4 h-4" />
                  <span>{contribution.member.role}</span>
                </div>
                <p className="text-gray-600 line-clamp-2 leading-relaxed">
                  {contribution.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-500 font-medium">
                  <span className="text-sm font-medium text-gray-900">
                    By -  {contribution.member.name}
                  </span>
                </div>
                {contribution.teamLead === contribution.member.name && (
                  <span className="text-sm font-medium text-blue-600">
                    Team Lead
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredContributions.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No contributions found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default Contributions; 