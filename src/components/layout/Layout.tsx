import { ReactNode } from 'react';
import Navbar from './Navbar';
import { ChatButton } from '../chat/ChatButton';
import { useChatContext } from '@/context/ChatContext';
import Footer from '../Footer';

interface LayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  const { isExpanded, setIsExpanded } = useChatContext();

  return (
    <div className="relative min-h-screen">
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </div>

      
    </div>
  );
};

export default Layout; 