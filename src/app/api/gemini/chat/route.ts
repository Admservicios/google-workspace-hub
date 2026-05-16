import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { message } = await request.json();
  
  return NextResponse.json({
    data: {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: `Recibí tu mensaje: "${message}". Esta es una respuesta de prueba de la API.`,
      timestamp: new Date().toISOString()
    }
  });
}
