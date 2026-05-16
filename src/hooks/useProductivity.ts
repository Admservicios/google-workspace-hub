import { useAppStore } from '../store/appStore';

export const useProductivity = () => {
  const metrics = useAppStore(state => state.metrics);
  
  // Calculate a mock percentage
  const percentage = Math.min(100, Math.round((metrics.tasksCompleted / 20) * 100));

  return { metrics, percentage };
};
