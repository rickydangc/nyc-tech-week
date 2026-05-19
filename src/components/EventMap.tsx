'use client';

import { useEffect, useRef, useState } from 'react';
import { neighborhoods } from '@/lib/neighborhoods';
import { MapPin } from 'lucide-react';

interface MapEvent {
  neighborhood: string;
  count: number;
}

export function EventMap({ eventsByNeighborhood }: { eventsByNeighborhood: Record<string, number> }) {
  const [selectedHood, setSelectedHood] = useState<string | null>(null);

  const hoods = neighborhoods
    .map(n => ({ ...n, count: eventsByNeighborhood[n.id] || 0 }))
    .filter(n => n.count > 0)
    .sort((a, b) => b.count - a.count);

  const maxCount = Math.max(...hoods.map(n => n.count));

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-accent" />
        Event Density Map
      </h3>

      {/* Visual grid representation */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {hoods.map(hood => {
          const intensity = hood.count / maxCount;
          const isSelected = selectedHood === hood.id;
          return (
            <button
              key={hood.id}
              onClick={() => setSelectedHood(isSelected ? null : hood.id)}
              className={`relative p-3 rounded-xl border transition-all text-center ${
                isSelected
                  ? 'border-accent bg-accent/10'
                  : 'border-border hover:border-accent/50 bg-surface-2'
              }`}
            >
              <div
                className="absolute inset-0 rounded-xl opacity-20"
                style={{
                  background: `rgba(99, 102, 241, ${intensity * 0.5})`,
                }}
              />
              <div className="relative">
                <div className="text-lg font-bold" style={{ color: `rgba(99, 102, 241, ${0.5 + intensity * 0.5})` }}>
                  {hood.count}
                </div>
                <div className="text-[10px] text-muted truncate">{hood.name}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected neighborhood detail */}
      {selectedHood && (
        <div className="mt-4 p-4 rounded-xl bg-surface-2 border border-border">
          {(() => {
            const hood = neighborhoods.find(n => n.id === selectedHood);
            if (!hood) return null;
            return (
              <div>
                <h4 className="font-bold">{hood.name}</h4>
                <p className="text-sm text-accent-soft">{hood.vibe}</p>
                <p className="text-xs text-muted mt-1">{hood.description}</p>
                <p className="text-xs text-muted mt-2">
                  {eventsByNeighborhood[selectedHood] || 0} events this week
                </p>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
