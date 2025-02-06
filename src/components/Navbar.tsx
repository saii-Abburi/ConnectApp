import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Users, 
  Award, 
  FileText, 
  Star, 
  Info, 
  UserPlus,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [router.pathname]);

  const navLinks = [
    { href: '/teams', label: 'Teams', icon: Users },
    { href: '/hackathons', label: 'Hackathons', icon: Award },
    { href: '/posts', label: 'Posts', icon: FileText },
    { href: '/contributions', label: 'Contributions', icon: Star },
    { href: '/about', label: 'About Us', icon: Info },
  ];

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-lg shadow-md' : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-black font-bold text-xl"
            >
              <span>Connect</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navLinks.map(({ href, label, icon: Icon }) => {
                const isActive = router.pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? 'text-black' 
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    <span>{label}</span>
                    <span 
                      className={`block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black ${
                        isActive ? 'max-w-full' : ''
                      }`}
                    />
                  </Link>
                );
              })}
              <Link
                href="/register"
                className="inline-flex items-center px-4 py-2 border-2 border-black text-black rounded-md hover:bg-black hover:text-white transition-colors duration-200"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Register
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`fixed inset-y-0 right-0 transform w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out md:hidden ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="pt-20 pb-6 px-4">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = router.pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg mb-2 transition-colors ${
                    isActive 
                      ? 'text-black bg-gray-100' 
                      : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <Icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </Link>
              );
            })}
            <Link
              href="/register"
              className="flex items-center justify-center px-4 py-3 mt-4 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/25 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar; 