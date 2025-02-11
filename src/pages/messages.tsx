import { NextPage } from 'next';
import { Search, Send, Paperclip, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const dummyConversations = [
  {
    id: '1',
    name: 'Team Spark',
    avatar: 'https://via.placeholder.com/40',
    lastMessage: 'Great work on the latest update!',
    timestamp: '2:30 PM',
    unread: true,
    online: true
  },
  {
    id: '2',
    name: 'Dev Dynasty',
    avatar: 'https://via.placeholder.com/40',
    lastMessage: 'When is the next meeting?',
    timestamp: '1:45 PM',
    unread: false,
    online: false
  }
];

const dummyMessages = [
  {
    id: '1',
    content: "Hey team, how's the project coming along?",
    sender: 'other',
    timestamp: '2:25 PM',
    avatar: 'https://via.placeholder.com/32'
  },
  {
    id: '2',
    content: 'Going great! Just pushed some updates to the repository.',
    sender: 'me',
    timestamp: '2:26 PM'
  },
  {
    id: '3',
    content: 'The new features look amazing! Great job everyone.',
    sender: 'other',
    timestamp: '2:28 PM',
    avatar: 'https://via.placeholder.com/32'
  },
  {
    id: '4',
    content: 'Thanks! We should be ready for the demo next week.',
    sender: 'me',
    timestamp: '2:30 PM'
  }
];

const MessagesPage: NextPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex h-[calc(100vh-8rem)] bg-white rounded-lg shadow-lg border border-gray-200">
          {/* Sidebar */}
          <div className="w-80 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Messages</h2>
              <button
                onClick={() => router.back()}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search messages"
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {dummyConversations.map((chat) => (
                <div
                  key={chat.id}
                  className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
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
                      <p className={`text-sm truncate ${
                        chat.unread ? 'text-gray-900 font-medium' : 'text-gray-500'
                      }`}>
                        {chat.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Image
                  src="https://via.placeholder.com/40"
                  alt="Team Avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h2 className="text-lg font-semibold">Team Spark</h2>
                  <p className="text-sm text-gray-500">3 members • 2 online</p>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {dummyMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end space-x-2 max-w-[70%] ${
                    message.sender === 'me' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    {message.sender === 'other' && (
                      <Image
                        src={message.avatar}
                        alt="Avatar"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    )}
                    <div className={`rounded-2xl px-4 py-2 ${
                      message.sender === 'me'
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'me' ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage; 