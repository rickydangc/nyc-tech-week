import { loadEvents } from '@/lib/events';
import { neighborhoods } from '@/lib/neighborhoods';
import { EventCard } from '@/components/EventCard';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin } from 'lucide-react';

export function generateStaticParams() {
  return neighborhoods.map(n => ({ id: n.id }));
}

export default async function NeighborhoodDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const neighborhood = neighborhoods.find(n => n.id === id);
  if (!neighborhood) notFound();

  const events = await loadEvents();
  const neighborhoodEvents = events
    .filter(e => e.neighborhood === id)
    .sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return a.time.localeCompare(b.time);
    });

  const byDaypart = {
    morning: neighborhoodEvents.filter(e => e.daypart === 'morning'),
    afternoon: neighborhoodEvents.filter(e => e.daypart === 'afternoon'),
    evening: neighborhoodEvents.filter(e => e.daypart === 'evening'),
    night: neighborhoodEvents.filter(e => e.daypart === 'night'),
  };

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto pb-24 md:pb-8">
      <Link href="/neighborhoods" className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> All neighborhoods
      </Link>

      <div className="mb-10 p-8 rounded-2xl border border-border bg-surface">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <MapPin className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{neighborhood.name}</h1>
            <p className="text-accent-soft font-medium">{neighborhood.vibe}</p>
          </div>
        </div>
        <p className="text-muted">{neighborhood.description}</p>
        <p className="text-sm text-muted mt-2">{neighborhoodEvents.length} events this week</p>
      </div>

      {(['morning', 'afternoon', 'evening', 'night'] as const).map(daypart => {
        const daypartEvents = byDaypart[daypart];
        if (daypartEvents.length === 0) return null;
        return (
          <section key={daypart} className="mb-10">
            <h2 className="text-xl font-bold mb-4 capitalize">{daypart}
              <span className="text-sm font-normal text-muted ml-2">{daypartEvents.length} events</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {daypartEvents.slice(0, 9).map((event, i) => (
                <EventCard key={event.id} event={event} index={i} compact />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
