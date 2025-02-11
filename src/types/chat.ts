export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  online: boolean;
}

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: string;
  isRead: boolean;
} 