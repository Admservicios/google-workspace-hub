import { NextResponse } from 'next/server';
import { mockTasks } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json({ data: mockTasks });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newTask = {
    ...body,
    id: `task-${Date.now()}`,
    updated: new Date().toISOString(),
  };
  return NextResponse.json({ data: newTask }, { status: 201 });
}
