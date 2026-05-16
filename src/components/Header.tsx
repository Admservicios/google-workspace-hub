import { Bell, Search, Moon, Sun } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export const Header = () => {
  const { user, isDarkMode, toggleDarkMode } = useAppStore();

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 transition-colors duration-200">
      <div className="flex items-center w-96">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search across Workspace..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center space-x-3 border-l border-gray-200 dark:border-gray-700 pl-4">
          <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600" />
          <div className="hidden md:block text-sm">
            <p className="font-medium text-gray-900 dark:text-white">{user?.name}</p>
            <p className="text-gray-500 dark:text-gray-400 text-xs">{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
