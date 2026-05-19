import { loadEvents } from '@/lib/events';
import { personas } from '@/lib/personas';
import { neighborhoods } from '@/lib/neighborhoods';
import { getRecommendations } from '@/lib/scoring';
import { HeroSection } from '@/components/HeroSection';
import { EventCard } from '@/components/EventCard';
import { PersonaCard } from '@/components/PersonaCard';
import { NeighborhoodCard } from '@/components/NeighborhoodCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default async function HomePage() {
  const events = await loadEvents();

  const neighborhoodCounts = events.reduce((acc, e) => {
    acc[e.neighborhood] = (acc[e.neighborhood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const neighborhoodsWithCounts = neighborhoods
    .map(n => ({ ...n, eventCount: neighborhoodCounts[n.id] || 0 }))
    .filter(n => n.eventCount > 0)
    .sort((a, b) => b.eventCount - a.eventCount);

  const topPicks = getRecommendations(events, 'ai-founder').slice(0, 6);

  const hiddenGems = events
    .filter(e => !e.isInviteOnly && e.scores.networking_quality >= 7 && e.scores.hype <= 5)
    .slice(0, 4);

  return (
    <div className="pb-24 md:pb-0">
      <HeroSection eventCount={events.length} />

      {/* Editor's Picks */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Editor&apos;s Picks</h2>
            <p className="text-sm text-muted mt-1">Top events for AI founders this week</p>
          </div>
          <Link href="/events" className="flex items-center gap-1 text-sm text-accent hover:text-accent-soft">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topPicks.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </section>

      {/* Hidden Gems */}
      {hiddenGems.length > 0 && (
        <section className="px-6 py-12 max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Hidden Gems</h2>
            <p className="text-sm text-muted mt-1">High-quality events flying under the radar</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hiddenGems.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} compact />
            ))}
          </div>
        </section>
      )}

      {/* Personas */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Find Your Persona</h2>
            <p className="text-sm text-muted mt-1">Curated recommendations based on who you are</p>
          </div>
          <Link href="/personas" className="flex items-center gap-1 text-sm text-accent hover:text-accent-soft">
            All personas <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {personas.slice(0, 6).map((persona, i) => (
            <PersonaCard key={persona.id} persona={persona} index={i} />
          ))}
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Explore by Neighborhood</h2>
            <p className="text-sm text-muted mt-1">Every corner of Manhattan has its own tech week energy</p>
          </div>
          <Link href="/neighborhoods" className="flex items-center gap-1 text-sm text-accent hover:text-accent-soft">
            Map view <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {neighborhoodsWithCounts.slice(0, 8).map((n, i) => (
            <NeighborhoodCard key={n.id} neighborhood={n} index={i} />
          ))}
        </div>
      </section>

      {/* AI-native CTA */}
      <section className="px-6 py-16 max-w-4xl mx-auto text-center">
        <div className="rounded-3xl border border-border bg-surface p-10 glow">
          <h2 className="text-3xl font-bold mb-3">
            <span className="gradient-text">Build your perfect week</span>
          </h2>
          <p className="text-muted mb-6 max-w-lg mx-auto">
            Tell us your vibe and we&apos;ll generate a personalized daily schedule — optimized for walking routes, networking quality, and signal-to-noise.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {[
              'I only have evenings',
              'I want to meet investors',
              "I'm introverted",
              'Find me high-signal events',
              'I want real builders',
            ].map(prompt => (
              <Link
                key={prompt}
                href="/planner"
                className="px-3 py-1.5 text-xs bg-surface-2 border border-border rounded-full text-muted hover:text-foreground hover:border-accent/50 transition-all"
              >
                &ldquo;{prompt}&rdquo;
              </Link>
            ))}
          </div>
          <Link
            href="/planner"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent rounded-xl text-sm font-semibold text-white hover:bg-accent-soft transition-all"
          >
            Start Planning <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
