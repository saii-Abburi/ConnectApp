import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { 
  Users,
  Rocket,
  Target,
  Lightbulb,
  Globe,
  Code,
  ArrowRight,
  Building,
  GraduationCap,
  Briefcase
} from 'lucide-react';

const stats = [
  {
    icon: Users,
    number: "50+",
    label: "Teams Formed",
    description: "Active student teams collaborating"
  },
  {
    icon: Globe,
    number: "10,000+",
    label: "Student Connections",
    description: "Global network of learners"
  },
  {
    icon: Code,
    number: "100+",
    label: "Projects Built",
    description: "Innovative solutions created"
  }
];

const features = [
  {
    icon: Target,
    title: "Team Collaboration",
    description: "Form and join teams for projects & hackathons. Work with like-minded peers on innovative solutions."
  },
  {
    icon: Building,
    title: "Industry Exposure",
    description: "Connect directly with companies and industry experts. Get real-world project experience."
  },
  {
    icon: Briefcase,
    title: "Career Opportunities",
    description: "Access internships and full-time roles. Launch your career with leading tech companies."
  }
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Encouraging students to explore and experiment with new technologies"
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Building bridges between students, mentors, and industry leaders"
  },
  {
    icon: Rocket,
    title: "Growth",
    description: "Fostering continuous learning and skill development"
  }
];

const About: NextPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Empowering Students,<br />Building Futures
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Connecting ambitious students with opportunities to learn, collaborate, and build their dream careers in technology.
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white -z-10" />
      </div>

      {/* Vision & Mission */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Guided by our commitment to student success and technological advancement
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black text-white mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black text-white mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-lg font-medium text-gray-900 mb-2">{stat.label}</div>
                  <p className="text-gray-600">{stat.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* How We Help */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Help Students</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Providing the tools and opportunities students need to succeed
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-xl border border-gray-100 p-8 hover:border-gray-200 hover:shadow-sm transition-all duration-200"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black text-white mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{feature.description}</p>
                  <button className="text-black font-medium inline-flex items-center hover:opacity-80 transition-opacity">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of students building their future in technology
          </p>
          <button 
            onClick={() => router.push('/register')}
            className="px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors inline-flex items-center"
          >
            Get Started <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default About; 