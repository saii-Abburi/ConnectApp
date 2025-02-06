import type { NextPage } from 'next';
import { useState } from 'react';
import { 
  Search, 
  Filter as FilterIcon,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  Clock,
  BarChart
} from 'lucide-react';
import Image from 'next/image';
import { posts, categories, sortOptions } from '../data/fakePosts';

const Posts: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState('latest');
  const [view, setView] = useState<'trending' | 'recent' | 'engaged'>('recent');
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const handleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'likes':
          return b.likes - a.likes;
        case 'comments':
          return b.comments - a.comments;
        default:
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
    });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Posts</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news, achievements, and announcements from our community.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="flex gap-4">
            {/* View Toggle */}
            <div className="flex rounded-lg border border-gray-200 p-1">
              <button
                onClick={() => setView('trending')}
                className={`px-4 py-1 rounded-md flex items-center ${
                  view === 'trending' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <TrendingUp className="w-4 h-4 mr-1" />
                Trending
              </button>
              <button
                onClick={() => setView('recent')}
                className={`px-4 py-1 rounded-md flex items-center ${
                  view === 'recent' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Clock className="w-4 h-4 mr-1" />
                Recent
              </button>
              <button
                onClick={() => setView('engaged')}
                className={`px-4 py-1 rounded-md flex items-center ${
                  view === 'engaged' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <BarChart className="w-4 h-4 mr-1" />
                Most Engaged
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all appearance-none bg-white"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <div
              key={post.id}
              className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-sm transition-all"
            >
              {/* Post Image */}
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                {/* Author Info */}
                <div className="flex items-center mb-4">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={post.author.profileImage}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">{post.author.name}</h3>
                    <p className="text-sm text-gray-500">{post.author.role}</p>
                  </div>
                </div>

                {/* Content */}
                <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Engagement */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center text-sm ${
                        likedPosts.includes(post.id)
                          ? 'text-black'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 mr-1 ${
                          likedPosts.includes(post.id) ? 'fill-current' : ''
                        }`}
                      />
                      {post.likes}
                    </button>
                    <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                      <MessageCircle className="w-5 h-5 mr-1" />
                      {post.comments}
                    </button>
                    <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                      <Share2 className="w-5 h-5 mr-1" />
                      {post.shares}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts; 