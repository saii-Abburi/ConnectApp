import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Users, 
  Rocket, 
  Link as LinkIcon, 
  UserPlus,
  ChevronRight,
  ArrowRight,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Team Registration',
    description: 'Create and manage your teams effortlessly. Find the perfect teammates for your next project.'
  },
  {
    icon: Rocket,
    title: 'Project Showcasing',
    description: 'Display your work to the world. Get feedback and recognition from the community.'
  },
  {
    icon: LinkIcon,
    title: 'Inter-Team Collaboration',
    description: 'Connect with other teams, share knowledge, and learn from each other.'
  },
  {
    icon: UserPlus,
    title: 'Role Sharing',
    description: 'Find the right people with the skills you need for your project.'
  }
];

const testimonials = [
  {
    name: 'Alex Johnson',
    role: 'Computer Science Student',
    image: '/images/placeholder-avatar.png',
    quote: 'Connect helped me find the perfect team for my final year project. The collaboration features are amazing!'
  },
  {
    name: 'Sarah Chen',
    role: 'UI/UX Designer',
    image: '/images/placeholder-avatar.png',
    quote: 'As a designer, I love how easy it is to showcase my work and find developers to collaborate with.'
  },
  {
    name: 'Michael Park',
    role: 'Full Stack Developer',
    image: '/images/placeholder-avatar.png',
    quote: 'The platform made it simple to manage multiple project collaborations and track contributions.'
  }
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
              <motion.h1 
                className="text-5xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Connect, Collaborate, Create
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Join the community of student developers and bring your ideas to life.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link
                  href="/register"
                  className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-900 text-center"
                >
                  Get Started
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-center"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <p className="text-gray-500">Illustration Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <feature.icon className="w-12 h-12 text-black mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-white p-8 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-6">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full grayscale"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Ready to Start Collaborating?
          </h2>
          <Link
            href="/register"
            className="inline-flex items-center px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-900 transition-all hover:scale-105"
          >
            Join Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 