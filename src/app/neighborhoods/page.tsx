import { loadEvents } from '@/lib/events';
import { neighborhoods } from '@/lib/neighborhoods';
import { NeighborhoodCard } from '@/components/NeighborhoodCard';
import { EventCard } from '@/components/EventCard';
import { EventMap } from '@/components/EventMap';

export default async function NeighborhoodsPage() {
  const events = await loadEvents();

  const neighborhoodCounts = events.reduce((acc, e) => {
    acc[e.neighborhood] = (acc[e.neighborhood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const neighborhoodsWithCounts = neighborhoods
    .map(n => ({ ...n, eventCount: neighborhoodCounts[n.id] || 0 }))
    .filter(n => n.eventCount > 0)
    .sort((a, b) => b.eventCount - a.eventCount);

  const topByNeighborhood = neighborhoodsWithCounts.slice(0, 5).map(n => ({
    ...n,
    topEvents: events
      .filter(e => e.neighborhood === n.id)
      .sort((a, b) => b.scores.networking_quality - a.scores.networking_quality)
      .slice(0, 3),
  }));

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto pb-24 md:pb-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Explore by Neighborhood</h1>
        <p className="text-muted max-w-2xl">
          Every neighborhood in NYC has its own tech week energy. From the VC offices of Flatiron to the warehouse parties in Brooklyn.
        </p>
      </div>

      {/* Map */}
      <div className="mb-10">
        <EventMap eventsByNeighborhood={neighborhoodCounts} />
      </div>

      {/* Neighborhood grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
        {neighborhoodsWithCounts.map((n, i) => (
          <NeighborhoodCard key={n.id} neighborhood={n} index={i} />
        ))}
      </div>

      {/* Curated routes */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2">Curated Routes</h2>
        <p className="text-sm text-muted mb-6">Walking-optimized neighborhood crawls</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'The VC Hopping Route',
              description: 'Flatiron → Nomad → Midtown. Hit 5 investor-heavy events in one afternoon.',
              neighborhoods: ['Flatiron', 'Nomad', 'Midtown'],
              time: 'Afternoon',
              vibe: 'Business casual, bring cards',
            },
            {
              title: 'Builder Crawl',
              description: 'SoHo → East Village → Lower East Side. Technical talks into demo nights into late-night hacks.',
              neighborhoods: ['SoHo', 'East Village', 'Lower East Side'],
              time: 'Evening → Night',
              vibe: 'Laptop in backpack energy',
            },
            {
              title: 'AI Founder Night Route',
              description: 'Chelsea → Meatpacking → West Village. Gallery openings, rooftop mixers, intimate dinners.',
              neighborhoods: ['Chelsea', 'Meatpacking District', 'West Village'],
              time: 'Evening',
              vibe: 'Black tee, white sneakers',
            },
            {
              title: 'Morning Wellness Loop',
              description: 'Central Park → Upper Manhattan. Founder runs, coffee meetups, sunrise networking.',
              neighborhoods: ['Central Park', 'Upper Manhattan'],
              time: 'Morning',
              vibe: 'Athleisure + ambition',
            },
          ].map(route => (
            <div key={route.title} className="rounded-2xl border border-border bg-surface p-6 card-hover">
              <h3 className="font-bold text-lg mb-2">{route.title}</h3>
              <p className="text-sm text-muted mb-3">{route.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {route.neighborhoods.map(n => (
                  <span key={n} className="px-2 py-0.5 text-[10px] rounded-full bg-accent/10 text-accent-soft">
                    {n}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 text-xs text-muted">
                <span>{route.time}</span>
                <span>{route.vibe}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top events by neighborhood */}
      {topByNeighborhood.map(n => (
        <section key={n.id} className="mb-10">
          <h2 className="text-xl font-bold mb-1">{n.name}</h2>
          <p className="text-sm text-muted mb-4">{n.vibe}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {n.topEvents.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} compact />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
