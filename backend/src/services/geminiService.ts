import axios from 'axios';

interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export class GeminiService {
  private apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  async chat(userMessage: string, history: GeminiMessage[] = [], context?: string): Promise<string> {
    try {
      const systemContext = context
        ? `Eres un asistente de productividad de Google Workspace. Contexto actual del usuario: ${context}\n\n`
        : 'Eres un asistente de productividad de Google Workspace. Ayuda al usuario con sus tareas, emails y calendario.\n\n';

      const contents: GeminiMessage[] = [
        ...history,
        {
          role: 'user',
          parts: [{ text: systemContext + userMessage }],
        },
      ];

      const response = await axios.post(
        `${this.apiUrl}?key=${process.env.GEMINI_API_KEY}`,
        { contents },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const candidate = response.data.candidates?.[0];
      return candidate?.content?.parts?.[0]?.text || 'No response from Gemini';
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw new Error('Failed to get Gemini response');
    }
  }
}

export default new GeminiService();
