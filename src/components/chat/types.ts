import { Conversation, Message } from '@/types/chat';

export interface ChatButtonProps {
  unreadCount: number;
  onClick: () => void;
}

export interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: Conversation[];
  activeChat: string | null;
  setActiveChat: (id: string) => void;
}

export interface ConversationListProps {
  conversations: Conversation[];
  activeChat: string | null;
  onSelectChat: (id: string) => void;
}

export interface MessageInputProps {
  onSend: (message: string) => void;
} 