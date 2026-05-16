import { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { FileText, Plus } from 'lucide-react';

export const NotesEditor = () => {
  const { notes } = useAppStore();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col h-[400px] transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center text-gray-900 dark:text-white">
          <FileText className="mr-2" size={20} /> Quick Notes
        </h2>
        <button className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 p-1.5 rounded-md transition-colors">
          <Plus size={18} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        {notes.slice(0, 4).map(note => (
          <div key={note.id} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800/30 rounded-lg hover:shadow-sm cursor-pointer transition-all">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">{note.title}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{note.content}</p>
            <p className="text-[10px] text-gray-400 mt-2 text-right">
              {new Date(note.updated).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
