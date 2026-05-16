import { NextResponse } from 'next/server';
import { mockNotes } from '../../../../lib/mockData';

export async function GET() {
  return NextResponse.json({ data: mockNotes });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newNote = {
    ...body,
    id: `note-${Date.now()}`,
    updated: new Date().toISOString(),
  };
  return NextResponse.json({ data: newNote }, { status: 201 });
}
