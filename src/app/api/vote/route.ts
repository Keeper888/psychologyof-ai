import { NextRequest, NextResponse } from 'next/server';
import { getVotes, addVote } from '@/lib/votes';

export async function GET() {
  const votes = getVotes();
  return NextResponse.json(votes);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { questionId, option } = body;

  if (!questionId || typeof questionId !== 'string') {
    return NextResponse.json({ error: 'Invalid questionId' }, { status: 400 });
  }
  if (!option || typeof option !== 'string') {
    return NextResponse.json({ error: 'Invalid option' }, { status: 400 });
  }

  const votes = addVote(questionId, option);
  return NextResponse.json(votes);
}
