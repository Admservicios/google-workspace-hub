import { useAppStore } from '../store/appStore';

export const useGemini = () => {
  const chatHistory = useAppStore(state => state.chatHistory);
  const addChatMessage = useAppStore(state => state.addChatMessage);

  const sendMessage = async (content: string) => {
    // Add user message
    addChatMessage({
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    });

    // Mock API call to get assistant response
    setTimeout(() => {
      addChatMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Esta es una respuesta simulada de Gemini. ¡Hola! ¿En qué puedo ayudarte?',
        timestamp: new Date().toISOString(),
      });
    }, 1000);
  };

  return { chatHistory, sendMessage };
};
