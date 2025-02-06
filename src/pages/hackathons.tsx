import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  Search, 
  Filter as FilterIcon, 
  Calendar,
  Trophy,
  Users,
  ChevronRight,
  X,
  Clock
} from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';
import { hackathons, hackathonTypes, hackathonGenres, Hackathon } from '../data/fakeHackathons';

const Hackathons: NextPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredHackathons = hackathons.filter(hackathon => {
    const matchesSearch = hackathon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hackathon.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedTypes.length === 0 || 
                       selectedTypes.some(type => hackathon.type.includes(type));
    const matchesGenre = selectedGenres.length === 0 || 
                        selectedGenres.some(genre => hackathon.genre.includes(genre));
    const matchesStatus = statusFilter === 'all' || hackathon.status === statusFilter;

    return matchesSearch && matchesType && matchesGenre && matchesStatus;
  });

  const resetFilters = () => {
    setSelectedTypes([]);
    setSelectedGenres([]);
    setStatusFilter('all');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Hackathons</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join exciting hackathons, showcase your skills, and win amazing prizes.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search hackathons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden px-4 py-2 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <FilterIcon className="w-5 h-5 mr-2" />
            Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 space-y-6 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            {/* Status Filter */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Status</h3>
              <div className="space-y-2">
                {['all', 'upcoming', 'ongoing', 'completed'].map(status => (
                  <label key={status} className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      checked={statusFilter === status}
                      onChange={() => setStatusFilter(status)}
                      className="w-4 h-4 border-gray-300 text-black focus:ring-gray-400"
                    />
                    <span className="ml-2 text-gray-700 capitalize">
                      {status === 'all' ? 'All' : status}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Type</h3>
              <div className="space-y-2">
                {hackathonTypes.map(type => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => {
                        setSelectedTypes(prev =>
                          prev.includes(type)
                            ? prev.filter(t => t !== type)
                            : [...prev, type]
                        );
                      }}
                      className="w-4 h-4 border-gray-300 text-black focus:ring-gray-400 rounded"
                    />
                    <span className="ml-2 text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Genre Filter */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Genre</h3>
              <div className="space-y-2">
                {hackathonGenres.map(genre => (
                  <label key={genre} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedGenres.includes(genre)}
                      onChange={() => {
                        setSelectedGenres(prev =>
                          prev.includes(genre)
                            ? prev.filter(g => g !== genre)
                            : [...prev, genre]
                        );
                      }}
                      className="w-4 h-4 border-gray-300 text-black focus:ring-gray-400 rounded"
                    />
                    <span className="ml-2 text-gray-700">{genre}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Reset Filters */}
            <button
              onClick={resetFilters}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              Reset Filters
            </button>
          </div>

          {/* Hackathons Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredHackathons.map(hackathon => (
                <div
                  key={hackathon.id}
                  className="bg-white rounded-lg border border-gray-100 p-6 hover:border-gray-200 hover:shadow-sm transition-all"
                >
                  <div className="relative h-40 bg-gray-50 rounded-lg mb-4 overflow-hidden">
                    <Image
                      src={hackathon.image}
                      alt={hackathon.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{hackathon.name}</h3>
                      <p className="text-sm text-gray-600">by {hackathon.organizer}</p>
                    </div>

                    <p className="text-gray-700">{hackathon.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {hackathon.type.map(type => (
                        <span
                          key={type}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-md"
                        >
                          {type}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>
                          {format(new Date(hackathon.startDate), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{hackathon.participants} participants</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-black font-medium">
                        <Trophy className="w-4 h-4 mr-1" />
                        {hackathon.prizePool}
                      </div>
                      <button
                        onClick={() => router.push(`/hackathons/${hackathon.id}`)}
                        className={`px-4 py-2 rounded-lg flex items-center ${
                          hackathon.status === 'completed' 
                            ? 'border border-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-black text-white hover:bg-gray-900'
                        } transition-colors`}
                        disabled={hackathon.status === 'completed'}
                      >
                        Register
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredHackathons.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No hackathons found matching your criteria
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hackathons; 