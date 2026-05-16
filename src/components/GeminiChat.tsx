import { useState } from 'react';
import { useGemini } from '../hooks/useGemini';
import { MessageSquare, Send, Bot, User as UserIcon } from 'lucide-react';

export const GeminiChat = () => {
  const { chatHistory, sendMessage } = useGemini();
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-0 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col h-[400px] overflow-hidden transition-colors">
      <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center">
          <Bot className="mr-2" size={20} /> Gemini Assistant
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
        {chatHistory.slice(-6).map((msg) => (
          <div 
            key={msg.id} 
            className={`flex items-start max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-blue-100 text-blue-600 ml-3' : 'bg-indigo-100 text-indigo-600 mr-3'}`}>
              {msg.role === 'user' ? <UserIcon size={16} /> : <Bot size={16} />}
            </div>
            <div 
              className={`p-3 rounded-2xl text-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none shadow-sm'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <form onSubmit={handleSend} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Gemini to summarize..."
            className="w-full pl-4 pr-12 py-2.5 rounded-full border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm"
          />
          <button 
            type="submit"
            className="absolute right-1.5 top-1.5 w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            <Send size={14} className="ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
