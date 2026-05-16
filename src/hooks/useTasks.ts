import { useAppStore } from '../store/appStore';

export const useTasks = () => {
  const tasks = useAppStore(state => state.tasks);
  const addTask = useAppStore(state => state.addTask);
  const updateTask = useAppStore(state => state.updateTask);
  const toggleTaskStatus = useAppStore(state => state.toggleTaskStatus);

  return { tasks, loading: false, error: null, addTask, updateTask, toggleTaskStatus };
};
