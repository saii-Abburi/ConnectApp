import Link from 'next/link';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Mail, 
  ExternalLink 
} from 'lucide-react';

const quickLinks = [
  { name: 'Teams', href: '/teams' },
  { name: 'Hackathons', href: '/hackathons' },
  { name: 'Posts', href: '/posts' },
  { name: 'Contributions', href: '/contributions' },
  { name: 'About Us', href: '/about' }
];

const legalLinks = [
  { name: 'Terms & Conditions', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Cookie Policy', href: '/cookies' }
];

const socialLinks = [
  { 
    name: 'GitHub',
    href: 'https://github.com',
    icon: Github
  },
  { 
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: Linkedin
  },
  { 
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: Twitter
  },
  { 
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: Instagram
  }
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Connect</h3>
              <p className="text-neutral/80 leading-relaxed">
                Empowering students to collaborate, innovate, and build their future in technology.
              </p>
              {/* Social Links */}
              <div className="flex items-center space-x-4 pt-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral hover:text-accent transition-all duration-300 hover:scale-110"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-neutral/80 hover:text-accent relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-accent after:left-0 after:-bottom-0.5 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-neutral/80 hover:text-accent relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-accent after:left-0 after:-bottom-0.5 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="space-y-3">
                <a
                  href="mailto:support@connect.com"
                  className="flex items-center text-neutral/80 hover:text-accent transition-colors duration-300"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  support@connect.com
                </a>
                <p className="text-neutral/60 text-sm leading-relaxed">
                  Have questions? We're here to help you on your journey.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral/60 text-sm">
              © {new Date().getFullYear()} Connect. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-neutral/60 hover:text-accent text-sm transition-colors duration-300"
              >
                Status
              </a>
              <a
                href="#"
                className="text-neutral/60 hover:text-accent text-sm transition-colors duration-300"
              >
                Sitemap
              </a>
              <a
                href="#"
                className="text-neutral/60 hover:text-accent text-sm transition-colors duration-300 flex items-center"
              >
                Documentation
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 