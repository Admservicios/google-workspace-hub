import { useProductivity } from '../hooks/useProductivity';
import { Target, CheckCircle, Mail, Calendar as CalendarIcon } from 'lucide-react';

export const ProductivityMeter = () => {
  const { metrics, percentage } = useProductivity();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Productivity Score</h2>
        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{percentage}%</span>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-8 overflow-hidden">
        <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${percentage}%` }}></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
            <CheckCircle size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Tasks</p>
            <p className="font-semibold text-gray-900 dark:text-white">{metrics.tasksCompleted}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
            <Mail size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Emails</p>
            <p className="font-semibold text-gray-900 dark:text-white">{metrics.emailsProcessed}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
            <CalendarIcon size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Meetings</p>
            <p className="font-semibold text-gray-900 dark:text-white">{metrics.meetingsAttended}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
            <Target size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Score</p>
            <p className="font-semibold text-gray-900 dark:text-white">{metrics.score}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
