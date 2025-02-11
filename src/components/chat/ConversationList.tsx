import Image from 'next/image';
import { ConversationListProps } from './types';

export const ConversationList = ({ conversations, activeChat, onSelectChat }: ConversationListProps) => {
  return (
    <div className="flex-1 overflow-y-auto conversation">
      {conversations.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onSelectChat(chat.id)}
          className={`p-4 hover:bg-gray-50 cursor-pointer ${
            activeChat === chat.id ? 'bg-gray-50' : ''
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src={chat.avatar}
                alt={chat.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                <span className="text-xs text-gray-500">{chat.timestamp}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 