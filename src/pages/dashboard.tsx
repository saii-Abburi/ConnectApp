import { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

const Dashboard: NextPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h1>
          <p className="text-gray-600">Here's your project overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">My Teams</h3>
            <p className="text-3xl font-bold text-blue-600">3</p>
            <Link href="/teams" className="text-blue-600 hover:text-blue-700 text-sm">
              View all teams →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">Active Projects</h3>
            <p className="text-3xl font-bold text-green-600">5</p>
            <Link href="/projects" className="text-blue-600 hover:text-blue-700 text-sm">
              View all projects →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">Open Roles</h3>
            <p className="text-3xl font-bold text-purple-600">2</p>
            <Link href="/role-board" className="text-blue-600 hover:text-blue-700 text-sm">
              View role board →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="font-medium">New team member joined Team Alpha</p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
              <div className="border-l-4 border-green-600 pl-4">
                <p className="font-medium">Project "E-Learning Platform" updated</p>
                <p className="text-sm text-gray-600">5 hours ago</p>
              </div>
              <div className="border-l-4 border-purple-600 pl-4">
                <p className="font-medium">New role opening in Team Beta</p>
                <p className="text-sm text-gray-600">1 day ago</p>
              </div>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">UI Design Review</p>
                  <p className="text-sm text-gray-600">Team Alpha</p>
                </div>
                <span className="text-red-600">Tomorrow</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Backend API Documentation</p>
                  <p className="text-sm text-gray-600">Team Beta</p>
                </div>
                <span className="text-yellow-600">In 3 days</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Project Presentation</p>
                  <p className="text-sm text-gray-600">Team Alpha</p>
                </div>
                <span className="text-green-600">In 1 week</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 