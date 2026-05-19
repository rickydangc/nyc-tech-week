'use client';

import { useState, useEffect } from 'react';
import { Event, Persona } from '@/lib/types';
import { personas } from '@/lib/personas';
import { EventCard } from '@/components/EventCard';
import { DaySelector } from '@/components/DaySelector';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Clock, MapPin, Zap } from 'lucide-react';

const VIBES = [
  { id: 'evenings-only', label: 'I only have evenings', icon: '🌙' },
  { id: 'meet-investors', label: 'I want to meet investors', icon: '💰' },
  { id: 'introverted', label: "I'm introverted", icon: '🤫' },
  { id: 'real-builders', label: 'I want real builders, not influencers', icon: '🛠' },
  { id: 'high-signal', label: 'Find me high-signal side events', icon: '📡' },
  { id: 'ai-infra', label: 'I want AI infra engineers', icon: '⚙️' },
  { id: 'first-timer', label: "It's my first Tech Week", icon: '🌟' },
  { id: 'parties', label: 'Where are the best parties?', icon: '🎉' },
];

function buildSchedule(events: Event[], persona: Persona, vibes: string[], date: string): Event[] {
  let filtered = events;

  if (date) filtered = filtered.filter(e => e.date === date);

  if (vibes.includes('evenings-only')) {
    filtered = filtered.filter(e => e.daypart === 'evening' || e.daypart === 'night');
  }
  if (vibes.includes('introverted')) {
    filtered = filtered.filter(e => e.scores.hype <= 6 && e.scores.networking_quality >= 5);
  }
  if (vibes.includes('meet-investors')) {
    filtered = filtered.filter(e => e.scores.investor_density >= 6);
  }
  if (vibes.includes('real-builders')) {
    filtered = filtered.filter(e => e.scores.technical_depth >= 6 && e.scores.hype <= 6);
  }
  if (vibes.includes('high-signal')) {
    filtered = filtered.filter(e => !e.isInviteOnly && e.scores.networking_quality >= 6 && e.scores.hype <= 5);
  }
  if (vibes.includes('ai-infra')) {
    filtered = filtered.filter(e => e.topics.includes('AI infra / devtools / cloud') || e.scores.technical_depth >= 7);
  }
  if (vibes.includes('first-timer')) {
    filtered = filtered.filter(e => !e.isInviteOnly && e.scores.networking_quality >= 5);
  }
  if (vibes.includes('parties')) {
    filtered = filtered.filter(e => e.daypart === 'evening' || e.daypart === 'night')
      .filter(e => e.scores.hype >= 6 || e.scores.creator_energy >= 6);
  }

  const personaProfile = personas.find(p => p.id === persona);
  if (personaProfile) {
    filtered.sort((a, b) => {
      let scoreA = 0, scoreB = 0;
      for (const [key, weight] of Object.entries(personaProfile.scoreWeights)) {
        scoreA += (a.scores[key as keyof typeof a.scores] || 0) * (weight || 0);
        scoreB += (b.scores[key as keyof typeof b.scores] || 0) * (weight || 0);
      }
      return scoreB - scoreA;
    });
  }

  const schedule: Event[] = [];
  const usedTimes = new Set<string>();

  for (const event of filtered) {
    const timeKey = `${event.date}-${event.daypart}`;
    if (usedTimes.has(timeKey)) continue;
    usedTimes.add(timeKey);
    schedule.push(event);
    if (schedule.length >= 4) break;
  }

  return schedule;
}

export default function PlannerPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPersona, setSelectedPersona] = useState<Persona>('ai-founder');
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState('2026-06-03');
  const [schedule, setSchedule] = useState<Event[]>([]);

  useEffect(() => {
    fetch('/api/events')
      .then(r => r.json())
      .then(data => { setEvents(data.events); setLoading(false); });
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      setSchedule(buildSchedule(events, selectedPersona, selectedVibes, selectedDate));
    }
  }, [events, selectedPersona, selectedVibes, selectedDate]);

  const toggleVibe = (id: string) => {
    setSelectedVibes(prev =>
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
  };

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs text-accent mb-4">
          <Sparkles className="w-3 h-3" />
          AI-Powered Planner
        </div>
        <h1 className="text-3xl font-bold mb-2">Build My Tech Week</h1>
        <p className="text-muted max-w-xl mx-auto">
          Tell us who you are and what you want. We&apos;ll build your perfect schedule — no filler, no impossible commutes.
        </p>
      </div>

      {/* Persona selector */}
      <section className="mb-8">
        <h2 className="text-sm font-medium text-muted uppercase tracking-wider mb-3">I am a...</h2>
        <div className="flex flex-wrap gap-2">
          {personas.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPersona(p.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedPersona === p.id
                  ? 'bg-accent text-white'
                  : 'bg-surface-2 text-muted hover:text-foreground border border-border hover:border-accent/50'
              }`}
            >
              {p.emoji} {p.name}
            </button>
          ))}
        </div>
      </section>

      {/* Vibe selector */}
      <section className="mb-8">
        <h2 className="text-sm font-medium text-muted uppercase tracking-wider mb-3">My vibe is...</h2>
        <div className="flex flex-wrap gap-2">
          {VIBES.map(vibe => (
            <button
              key={vibe.id}
              onClick={() => toggleVibe(vibe.id)}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                selectedVibes.includes(vibe.id)
                  ? 'bg-accent/20 text-accent-soft border border-accent/40'
                  : 'bg-surface-2 text-muted hover:text-foreground border border-border hover:border-accent/50'
              }`}
            >
              {vibe.icon} {vibe.label}
            </button>
          ))}
        </div>
      </section>

      {/* Day selector */}
      <section className="mb-8">
        <h2 className="text-sm font-medium text-muted uppercase tracking-wider mb-3">Plan for...</h2>
        <DaySelector selected={selectedDate} onChange={setSelectedDate} />
      </section>

      {/* Generated schedule */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-accent" />
          <h2 className="text-lg font-bold">Your Schedule</h2>
          {schedule.length > 0 && (
            <span className="text-xs text-muted">{schedule.length} events</span>
          )}
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl bg-surface h-48" />
            ))}
          </div>
        ) : schedule.length === 0 ? (
          <div className="text-center py-12 rounded-2xl border border-border bg-surface">
            <p className="text-muted">No events match your criteria for this day.</p>
            <p className="text-sm text-muted mt-1">Try adjusting your vibes or picking a different day.</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedDate}-${selectedPersona}-${selectedVibes.join(',')}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {schedule.map((event, i) => (
                <div key={event.id} className="flex gap-4">
                  {/* Timeline */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">
                      {i + 1}
                    </div>
                    {i < schedule.length - 1 && (
                      <div className="flex-1 w-px bg-border my-2" />
                    )}
                  </div>
                  {/* Event */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-2 mb-2 text-xs text-muted">
                      <Clock className="w-3 h-3" />
                      <span>{event.time?.slice(0, 5)}</span>
                      <MapPin className="w-3 h-3 ml-2" />
                      <span>{event.location}</span>
                    </div>
                    <EventCard event={event} index={i} />
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>
    </div>
  );
}
