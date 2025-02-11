import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  ArrowLeft, 
  Search, 
  Plus, 
  Filter, 
  ExternalLink, 
  Users, 
  Heart,
  MoreVertical,
  Mail,
  Share,
  Flag
} from 'lucide-react';
import { fakeTeams } from '../data/fakeTeams';
import Image from 'next/image';
import { useTeam } from '../context/TeamContext';

const Teams: NextPage = () => {
  const router = useRouter();
  const { teams } = useTeam();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [likedTeams, setLikedTeams] = useState<number[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredTeams = fakeTeams.filter(team => {
    const matchesSearch = team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleLike = (teamId: number) => {
    setLikedTeams(prev => 
      prev.includes(teamId) 
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId]
    );
  };

  const handleDropdownToggle = (teamId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdownId(openDropdownId === teamId ? null : teamId);
  };

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdownId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Teams</h1>
            <button
              onClick={() => router.push('/teams/create')}
              className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-all"
            >
              <Plus className="w-5 h-5 mr-1" />
              Create Team
            </button>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map(team => (
            <div
              key={team.id}
              className="bg-white rounded-lg border border-gray-100 p-6 hover:border-gray-200 hover:shadow-sm transition-all"
            >
              <div className="relative h-40 bg-gray-50 rounded-lg mb-4 overflow-hidden">
                <Image
                  src={team.teamImage}
                  alt={team.teamName}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={team.leaderImage}
                      alt={team.leader}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{team.teamName}</h3>
                    <p className="text-sm text-gray-600">Led by {team.leader}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleLike(team.id)}
                    className={`p-2 rounded-full transition-colors hover:bg-gray-50`}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        likedTeams.includes(team.id) 
                          ? 'fill-black text-black' 
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                  <div className="relative">
                    <button
                      onClick={(e) => handleDropdownToggle(team.id, e)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {openDropdownId === team.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                        <button
                          onClick={() => {/* Add follow logic */}}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                        >
                          <Users className="w-4 h-4 mr-2" />
                          Follow Team
                        </button>
                        <button
                          onClick={() => router.push(`/chat/${team.id}`)}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Message Team
                        </button>
                        <button
                          onClick={() => {/* Add share logic */}}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                        >
                          <Share className="w-4 h-4 mr-2" />
                          Share Team
                        </button>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button
                          onClick={() => {/* Add report logic */}}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center"
                        >
                          <Flag className="w-4 h-4 mr-2" />
                          Report Team
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{team.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {team.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-1" />
                  <span className="text-sm">{team.membersCount} members</span>
                </div>
                <div className="flex items-center space-x-3">
                  <a
                    href={team.links.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => router.push(team.links.view)}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTeams.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No teams found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams; 