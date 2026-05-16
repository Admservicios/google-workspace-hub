import { useAppStore } from '../store/appStore';

export const useGmail = () => {
  const emails = useAppStore(state => state.emails);
  return { emails, loading: false, error: null };
};
