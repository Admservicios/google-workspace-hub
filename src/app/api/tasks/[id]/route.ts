import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  return NextResponse.json({ data: { id: params.id, ...body, updated: new Date().toISOString() } });
}
