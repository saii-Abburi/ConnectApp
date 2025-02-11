import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Github, MessageSquare, X } from 'lucide-react';
import { useChatContext } from '@/context/ChatContext';
import toast, { Toaster } from 'react-hot-toast';
// Fix the teamsData structure - remove the extra array nesting
const teamsData = [
  {
    "id": 1,
    "teamName": "Team Spark",
    "leader": "Sai Praveen",
    "description": "Greyboard divinely holds exciting opportunities for open-source enthusiasts.",
    "membersCount": 8,
    "tags": ["Web Development", "Open Source"],
    "teamImage": "https://via.placeholder.com/300",
    "leaderImage": "https://via.placeholder.com/80",
    "links": {
      "view": "/teams/1",
      "external": "https://github.com/TeamSpark"
    },
    "members": [
      { "name": "Ajay Kumar", "role": "Frontend Developer", "profilePic": "https://via.placeholder.com/100" },
      { "name": "Sneha Reddy", "role": "Backend Developer", "profilePic": "https://via.placeholder.com/100" },
      { "name": "Rahul Verma", "role": "UI/UX Designer", "profilePic": "https://via.placeholder.com/100" },
      { "name": "Priya Sharma", "role": "Full Stack Developer", "profilePic": "https://via.placeholder.com/100" }
    ],
    "projects": [
      {
        "projectName": "OpenBoard",
        "description": "A collaborative whiteboard for remote teams.",
        "techStack": ["React", "Node.js", "WebSockets"],
        "status": "In Progress"
      },
      {
        "projectName": "CodeHub",
        "description": "A central platform for developers to collaborate on open-source projects.",
        "techStack": ["Next.js", "Firebase", "TailwindCSS"],
        "status": "Completed"
      }
    ]
  },
  {
    "id": 2,
    "teamName": "Code Crusaders",
    "leader": "Ananya Reddy",
    "description": "Empowering developers to build better with cutting-edge technologies.",
    "membersCount": 6,
    "tags": ["AI/ML", "Competitive Coding"],
    "teamImage": "https://via.placeholder.com/300",
    "leaderImage": "https://via.placeholder.com/80",
    "links": {
      "view": "/teams/2",
      "external": "https://github.com/CodeCrusaders"
    },
    "members": [
      { "name": "Karthik Das", "role": "ML Engineer", "profilePic": "https://via.placeholder.com/100" },
      { "name": "Aarav Patel", "role": "Data Scientist", "profilePic": "https://via.placeholder.com/100" },
      { "name": "Sanya Mehta", "role": "AI Researcher", "profilePic": "https://via.placeholder.com/100" }
    ],
    "projects": [
      {
        "projectName": "AI Chess",
        "description": "An AI-powered chess game with adaptive difficulty.",
        "techStack": ["Python", "TensorFlow", "React"],
        "status": "Ongoing"
      },
      {
        "projectName": "CodeRank",
        "description": "An AI system that ranks coding submissions based on efficiency.",
        "techStack": ["Flask", "Scikit-learn", "MongoDB"],
        "status": "Completed"
      }
    ]
  },
  {
    "id": 3,
    "teamName": "InnovateX",
    "leader": "Rohan Sharma",
    "description": "A team focused on solving real-world problems using technology.",
    "membersCount": 10,
    "tags": ["Blockchain", "IoT"],
    "teamImage": "https://via.placeholder.com/300",
    "leaderImage": "https://via.placeholder.com/80",
    "links": {
      "view": "/teams/3",
      "external": "https://github.com/InnovateX"
    },
    "members": [
      { "name": "Divya Agarwal", "role": "Blockchain Developer", "profilePic": "https://via.placeholder.com/100" },
      { "name": "Neha Verma", "role": "IoT Specialist", "profilePic": "https://via.placeholder.com/100" }
    ],
    "projects": [
      {
        "projectName": "AgriChain",
        "description": "A blockchain-powered supply chain for farmers.",
        "techStack": ["Ethereum", "Solidity", "React"],
        "status": "Completed"
      }
    ]
  },
  {
    "id": 4,
    "teamName": "Dev Dynasty",
    "leader": "Meera Kapoor",
    "description": "Building scalable applications with a focus on performance and security.",
    "membersCount": 7,
    "tags": ["Cybersecurity", "Cloud Computing"],
    "teamImage": "https://via.placeholder.com/300",
    "leaderImage": "https://via.placeholder.com/80",
    "links": {
      "view": "/teams/4",
      "external": "https://github.com/DevDynasty"
    },
    "members": [
      { "name": "Rohit Singh", "role": "Cloud Architect", "profilePic": "https://via.placeholder.com/100" },
      { "name": "Simran Kaur", "role": "Security Engineer", "profilePic": "https://via.placeholder.com/100" }
    ],
    "projects": [
      {
        "projectName": "SecuCloud",
        "description": "A cloud security suite for enterprises.",
        "techStack": ["AWS", "Kubernetes", "Terraform"],
        "status": "In Progress"
      }
    ]
  },
  {
    "id": 5,
    "teamName": "Tech Titans",
    "leader": "Vikram Iyer",
    "description": "Exploring innovations in AI and automation.",
    "membersCount": 9,
    "tags": ["Machine Learning", "Deep Learning"],
    "teamImage": "https://via.placeholder.com/300",
    "leaderImage": "https://via.placeholder.com/80",
    "links": {
      "view": "/teams/5",
      "external": "https://github.com/TechTitans"
    },
    "members": [
      { "name": "Arjun Mehta", "role": "AI Engineer", "profilePic": "https://via.placeholder.com/100" },
      { "name": "Mira Shah", "role": "NLP Researcher", "profilePic": "https://via.placeholder.com/100" }
    ],
    "projects": [
      {
        "projectName": "AutoBot",
        "description": "An AI chatbot that assists with customer service.",
        "techStack": ["Python", "Dialogflow", "React"],
        "status": "Ongoing"
      }
    ]
  }
];

interface Team {
  id: number;
  teamName: string;
  leader: string;
  description: string;
  membersCount: number;
  tags: string[];
  teamImage: string;
  leaderImage: string;
  links: {
    view: string;
    external: string;
  };
  members: {
    name: string;
    role: string;
    profilePic: string;
  }[];
  projects: {
    projectName: string;
    description: string;
    techStack: string[];
    status: string;
  }[];
}

// Add RegistrationForm interface
interface RegistrationFormData {
  name: string;
  email: string;
  role: string;
  experience: string;
  message: string;
}

const TeamDetails: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { setIsExpanded } = useChatContext();
  const [team, setTeam] = useState<Team | null>(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: '',
    email: '',
    role: '',
    experience: '',
    message: ''
  });

  // Handle chat actions
  const handleChatClick = (type: 'page' | 'quick') => {
    if (type === 'page') {
      // Navigate to messages page with team ID
      router.push({
        pathname: '/messages',
        query: { teamId: id }
      });
    } else {
      // Open quick chat
      setIsExpanded(true);
    }
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast.custom((t: { visible: boolean; id: string }) => (
      <div className="relative w-[350px]">
        {/* Main Toast Container */}
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          {/* Progress Bar */}
          <div 
            className="absolute bottom-0 left-0 h-1 bg-green-500 transition-all duration-4000 ease-linear rounded-b-lg"
            style={{ 
              width: t.visible ? '100%' : '0%',
              transition: 'width 4000ms linear'
            }}
          />
          
          {/* Content */}
          <div className="flex-1 w-0 p-4">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Application Submitted Successfully!
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  We'll review your application and get back to you soon.
                </p>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-500 focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <svg 
                className="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    ), {
      duration: 4000,
      position: 'top-right',
    });

    // Existing form handling
    console.log('Registration data:', formData);
    setShowRegistrationModal(false);
    setFormData({
      name: '',
      email: '',
      role: '',
      experience: '',
      message: ''
    });
  };

  useEffect(() => {
    if (id) {
      // Find team from local data instead of API fetch
      const foundTeam = teamsData.find(t => t.id === Number(id));
      setTeam(foundTeam || null);
    }
  }, [id]);

  if (!team) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Team not found</h1>
          <Link href="/teams" className="text-blue-600 hover:text-blue-800 flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 mr-2" />Back to Teams
          </Link>
        </div>
      </div>
    );
  }

  // Calculate total team size including leader
  const totalTeamSize = team.members.length + 1; // +1 for the leader

  return (
    <>
      {/* Updated Toaster component */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'transparent',
            boxShadow: 'none',
            padding: '12px',
          },
        }}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link href="/teams" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />Back to Teams
            </Link>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{team.teamName}</h1>
                <div className="flex items-center mb-6">
                  <Image
                    src={team.leaderImage}
                    alt={team.leader}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">Team Leader</p>
                    <p className="font-medium">{team.leader}</p>
                  </div>
                  <div className="ml-6 px-3 py-1 bg-gray-100 rounded-full">
                    <p className="text-sm text-gray-600">{totalTeamSize} members</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{team.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {team.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                {team.links.external && (
                  <a
                    href={team.links.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <Github className="w-5 h-5 mr-2 " />GitHub
                  </a>
                  
                )}
                <button
                  onClick={() => setShowRegistrationModal(true)}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors ml-8 items-center"
                >
                  Join with us
                </button>
              </div>
              <div className="md:w-1/3">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image src={team.teamImage} alt={team.teamName} fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Members Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
            <span className="text-gray-600">{totalTeamSize} members</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Show leader first */}
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <Image
                src={team.leaderImage}
                alt={team.leader}
                width={56}
                height={56}
                className="rounded-full"
              />
              <div className="ml-4">
                <h3 className="font-medium">{team.leader}</h3>
                <p className="text-sm text-gray-600">Team Leader</p>
              </div>
            </div>
            {/* Show other members */}
            {team.members.map((member) => (
              <div key={member.name} className="bg-white rounded-lg shadow p-6 flex items-center">
                <Image
                  src={member.profilePic}
                  alt={member.name}
                  width={56}
                  height={56}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.projects.map((project) => (
              <div key={project.projectName} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">{project.projectName}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    project.status === 'Completed' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Buttons */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleChatClick('page')}
              className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Open Chat Page
            </button>
            <button
              onClick={() => handleChatClick('quick')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Quick Chat
            </button>
          </div>
        </div>

        {/* Registration Modal */}
        {showRegistrationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Join {team.teamName}</h2>
                <button
                  onClick={() => setShowRegistrationModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Desired Role
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Years of Experience
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Why do you want to join?
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowRegistrationModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// Add getInitialProps to handle SSR
TeamDetails.getInitialProps = async () => {
  return { props: {} };
};

export default TeamDetails; 