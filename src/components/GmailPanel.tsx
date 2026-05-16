import { useGmail } from '../hooks/useGmail';
import { Mail, Star, Clock } from 'lucide-react';

export const GmailPanel = () => {
  const { emails } = useGmail();
  const unreadCount = emails.filter(e => !e.isRead).length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col h-[400px] transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center text-gray-900 dark:text-white">
          <Mail className="mr-2" size={20} /> Inbox
        </h2>
        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {unreadCount} new
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        {emails.slice(0, 5).map(email => (
          <div 
            key={email.id} 
            className={`p-3 rounded-lg border ${
              email.isRead 
                ? 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700' 
                : 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/50'
            } transition-colors`}
          >
            <div className="flex justify-between items-start mb-1">
              <span className={`text-sm ${email.isRead ? 'font-medium text-gray-700 dark:text-gray-300' : 'font-bold text-gray-900 dark:text-white'}`}>
                {email.from.split('@')[0]}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(email.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </span>
            </div>
            <h3 className={`text-sm mb-1 truncate ${email.isRead ? 'text-gray-600 dark:text-gray-400' : 'font-semibold text-gray-800 dark:text-gray-200'}`}>
              {email.subject}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-500 truncate">{email.snippet}</p>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
        View All in Gmail
      </button>
    </div>
  );
};
