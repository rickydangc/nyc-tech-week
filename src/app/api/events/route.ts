import { NextRequest, NextResponse } from 'next/server';
import { loadEvents, filterEvents } from '@/lib/events';
import { getRecommendations } from '@/lib/scoring';
import { Persona } from '@/lib/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const events = await loadEvents();

  const filtered = filterEvents(events, {
    date: searchParams.get('date') || undefined,
    neighborhood: searchParams.get('neighborhood') || undefined,
    topic: searchParams.get('topic') || undefined,
    daypart: searchParams.get('daypart') || undefined,
    inviteOnly: searchParams.has('inviteOnly') ? searchParams.get('inviteOnly') === 'true' : undefined,
    search: searchParams.get('search') || undefined,
  });

  const persona = searchParams.get('persona') as Persona | null;
  if (persona) {
    const recommended = getRecommendations(filtered, persona);
    return NextResponse.json({ events: recommended, total: recommended.length });
  }

  return NextResponse.json({ events: filtered, total: filtered.length });
}
