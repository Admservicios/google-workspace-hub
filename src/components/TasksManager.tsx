import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { CheckSquare, Circle, CheckCircle, Plus } from 'lucide-react';

export const TasksManager = () => {
  const { tasks, toggleTaskStatus } = useTasks();
  const [filter, setFilter] = useState<'all' | 'needsAction' | 'completed'>('needsAction');

  const filteredTasks = tasks.filter(task => filter === 'all' ? true : task.status === filter);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col h-[400px] transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center text-gray-900 dark:text-white">
          <CheckSquare className="mr-2" size={20} /> Tasks
        </h2>
        <div className="flex space-x-1">
          <button 
            onClick={() => setFilter('needsAction')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${filter === 'needsAction' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            Pending
          </button>
          <button 
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${filter === 'completed' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            Done
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-2">
        {filteredTasks.slice(0, 8).map(task => (
          <div key={task.id} className="flex items-start group">
            <button 
              onClick={() => toggleTaskStatus(task.id)}
              className="mt-0.5 mr-3 text-gray-400 hover:text-blue-500 transition-colors"
            >
              {task.status === 'completed' ? (
                <CheckCircle size={18} className="text-green-500" />
              ) : (
                <Circle size={18} />
              )}
            </button>
            <div className="flex-1">
              <p className={`text-sm ${task.status === 'completed' ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-700 dark:text-gray-200'}`}>
                {task.title}
              </p>
              {task.due && task.status !== 'completed' && (
                <p className="text-xs text-red-500 mt-0.5">
                  Due {new Date(task.due).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <button className="mt-4 flex items-center justify-center w-full py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg transition-colors">
        <Plus size={16} className="mr-1" /> Add Task
      </button>
    </div>
  );
};
