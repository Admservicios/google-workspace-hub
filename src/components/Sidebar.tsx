import { LayoutDashboard, Mail, Calendar, CheckSquare, FileText, MessageSquare, Settings } from 'lucide-react';

export const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: Mail, label: 'Gmail' },
    { icon: Calendar, label: 'Calendar' },
    { icon: CheckSquare, label: 'Tasks' },
    { icon: FileText, label: 'Notes' },
    { icon: MessageSquare, label: 'Gemini' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen flex flex-col transition-colors duration-200">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Workspace Hub</h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <a
              key={index}
              href="#"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                index === 0
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </a>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <a
          href="#"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </a>
      </div>
    </aside>
  );
};
