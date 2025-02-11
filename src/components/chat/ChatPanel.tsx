import { Search, X } from 'lucide-react';
import { ConversationList } from './ConversationList';
import { ChatPanelProps } from './types';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatPanel = ({
  isOpen, 
  onClose, 
  conversations, 
  activeChat, 
  setActiveChat 
}: ChatPanelProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
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
                onClick={onClose}
                className="p-1.5 hover:bg-gray-100 rounded-full"
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

          {/* Conversations */}
          <ConversationList
            conversations={conversations}
            activeChat={activeChat}
            onSelectChat={setActiveChat}
          />

          {/* Message Input */}
          {activeChat && (
            <div className="border-t border-gray-200">
              <MessageInput onSend={(message) => console.log('Sending:', message)} />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 