import { NextResponse } from 'next/server';
import { mockEmails } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json({ data: mockEmails });
}
