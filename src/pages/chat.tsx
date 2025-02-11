import { useChatContext } from '@/context/ChatContext';
import { X, Search, Send, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chat() {
  const { isExpanded, setIsExpanded } = useChatContext();

  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed right-0 bottom-0 w-[380px] h-[600px] bg-white shadow-lg border-l border-t border-gray-200 rounded-tl-lg flex flex-col z-40"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Messages</h2>
              <button 
                onClick={() => setIsExpanded(false)}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search messages"
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Chat Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Chat messages will go here */}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button className="p-2 text-black hover:bg-gray-100 rounded-full transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 