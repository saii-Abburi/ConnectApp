import { MessageCircle } from 'lucide-react';
import { ChatButtonProps } from './types';

export const ChatButton = ({ unreadCount, onClick }: ChatButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className="fixed bottom-6 right-6 p-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-900 transition-colors z-50"
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </div>
    </button>
  );
}; 