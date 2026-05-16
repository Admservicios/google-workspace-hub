import { useCalendar } from '../hooks/useCalendar';
import { Calendar as CalendarIcon, Video, MapPin, Clock } from 'lucide-react';

export const CalendarView = () => {
  const { events } = useCalendar();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col h-[400px] transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center text-gray-900 dark:text-white">
          <CalendarIcon className="mr-2" size={20} /> Today's Schedule
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {events.slice(0, 4).map(event => {
          const startTime = new Date(event.start);
          const endTime = new Date(event.end);
          
          return (
            <div key={event.id} className="relative pl-4 border-l-2 border-blue-500">
              <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="mb-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{event.title}</h3>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <Clock size={12} className="mr-1" />
                  {startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
                  {endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
              
              {(event.meetLink || event.location) && (
                <div className="flex items-center space-x-3 mt-2">
                  {event.meetLink && (
                    <a href={event.meetLink} className="flex items-center text-xs text-blue-600 dark:text-blue-400 hover:underline">
                      <Video size={12} className="mr-1" /> Join Meet
                    </a>
                  )}
                  {event.location && (
                    <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <MapPin size={12} className="mr-1" /> {event.location}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button className="mt-4 w-full py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
        Open Calendar
      </button>
    </div>
  );
};
