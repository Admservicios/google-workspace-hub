import { useAppStore } from '../store/appStore';

export const useCalendar = () => {
  const events = useAppStore(state => state.events);
  return { events, loading: false, error: null };
};
