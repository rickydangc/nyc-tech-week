import { loadEvents } from '@/lib/events';
import { personas } from '@/lib/personas';
import { getRecommendations } from '@/lib/scoring';
import { EventCard } from '@/components/EventCard';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function generateStaticParams() {
  return personas.map(p => ({ id: p.id }));
}

export default async function PersonaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const persona = personas.find(p => p.id === id);
  if (!persona) notFound();

  const events = await loadEvents();
  const recommended = getRecommendations(events, persona.id);

  const byDate = recommended.reduce((acc, e) => {
    if (!acc[e.date]) acc[e.date] = [];
    acc[e.date].push(e);
    return acc;
  }, {} as Record<string, typeof recommended>);

  const dates = Object.keys(byDate).sort();

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto pb-24 md:pb-8">
      <Link href="/personas" className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> All personas
      </Link>

      {/* Persona header */}
      <div className="mb-10 p-8 rounded-2xl border border-border bg-surface">
        <div className="text-4xl mb-3">{persona.emoji}</div>
        <h1 className="text-3xl font-bold mb-1">{persona.name}</h1>
        <p className="text-accent-soft font-medium mb-3">{persona.tagline}</p>
        <p className="text-muted max-w-2xl">{persona.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(persona.topicWeights).map(([topic, weight]) => (
            <span
              key={topic}
              className="px-3 py-1 text-xs rounded-full border border-border bg-surface-2"
              style={{ opacity: 0.5 + weight * 0.5 }}
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Daily recommendations */}
      {dates.map(date => (
        <section key={date} className="mb-10">
          <h2 className="text-xl font-bold mb-4 sticky top-16 z-10 bg-background py-2">
            {new Date(date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            <span className="text-sm font-normal text-muted ml-2">{byDate[date].length} events</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {byDate[date].slice(0, 9).map((event, i) => (
              <EventCard key={event.id} event={event} index={i} compact />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
