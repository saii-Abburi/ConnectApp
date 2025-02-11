import { createContext, useContext, useState, ReactNode } from 'react';
import { Conversation, Message } from '@/types/chat';

interface ChatContextType {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <ChatContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
} 