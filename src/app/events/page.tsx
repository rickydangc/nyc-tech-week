'use client';

import { useState, useEffect, useMemo } from 'react';
import { Event } from '@/lib/types';
import { EventCard } from '@/components/EventCard';
import { DaySelector } from '@/components/DaySelector';
import { SearchInput } from '@/components/SearchInput';
import { FilterBar } from '@/components/FilterBar';
import { motion } from 'framer-motion';

const TOPICS = [
  'AI / Agents / GenAI',
  'AI infra / devtools / cloud',
  'Founder fundraising / VC',
  'Consumer / creative / media',
  'GTM / marketing / creator',
  'Health / bio / wellness',
  'Fintech / finance',
  'Climate / deeptech / hardware',
  'Diversity / women / international',
];

const DAYPARTS = ['morning', 'afternoon', 'evening', 'night'];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDaypart, setSelectedDaypart] = useState('');
  const [showInviteOnly, setShowInviteOnly] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    fetch('/api/events')
      .then(r => r.json())
      .then(data => { setEvents(data.events); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    return events.filter(event => {
      if (selectedDate && event.date !== selectedDate) return false;
      if (selectedTopic && !event.topics.includes(selectedTopic)) return false;
      if (selectedDaypart && event.daypart !== selectedDaypart) return false;
      if (showInviteOnly !== undefined && event.isInviteOnly !== showInviteOnly) return false;
      if (search) {
        const q = search.toLowerCase();
        const searchable = `${event.name} ${event.company} ${event.description} ${event.topics.join(' ')} ${event.location}`.toLowerCase();
        if (!searchable.includes(q)) return false;
      }
      return true;
    });
  }, [events, selectedDate, selectedTopic, selectedDaypart, showInviteOnly, search]);

  const eventCounts = useMemo(() => {
    return events.reduce((acc, e) => {
      acc[e.date] = (acc[e.date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [events]);

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Events</h1>
        <p className="text-muted">
          {loading ? 'Loading...' : `${filtered.length} events${selectedDate ? ' on this day' : ' across the week'}`}
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <SearchInput value={search} onChange={setSearch} />
      </div>

      {/* Day selector */}
      <div className="mb-6">
        <DaySelector selected={selectedDate} onChange={setSelectedDate} eventCounts={eventCounts} />
      </div>

      {/* Filters */}
      <div className="mb-8">
        <FilterBar
          filters={[
            {
              id: 'daypart',
              label: 'Time of Day',
              options: DAYPARTS.map(d => ({ value: d, label: d.charAt(0).toUpperCase() + d.slice(1) })),
              value: selectedDaypart,
              onChange: setSelectedDaypart,
            },
            {
              id: 'topic',
              label: 'Topic',
              options: TOPICS.map(t => ({ value: t, label: t.split('/')[0].trim() })),
              value: selectedTopic,
              onChange: setSelectedTopic,
            },
            {
              id: 'access',
              label: 'Access',
              options: [
                { value: 'open', label: 'Open' },
                { value: 'invite', label: 'Invite Only' },
              ],
              value: showInviteOnly === true ? 'invite' : showInviteOnly === false ? 'open' : '',
              onChange: (v) => {
                if (v === 'open') setShowInviteOnly(false);
                else if (v === 'invite') setShowInviteOnly(true);
                else setShowInviteOnly(undefined);
              },
            },
          ]}
        />
      </div>

      {/* Event Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-2xl bg-surface h-64" />
          ))}
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filtered.slice(0, 60).map((event, i) => (
            <EventCard key={event.id} event={event} index={i} compact />
          ))}
        </motion.div>
      )}

      {filtered.length > 60 && (
        <p className="text-center text-sm text-muted mt-8">
          Showing 60 of {filtered.length} events. Use filters to narrow down.
        </p>
      )}
    </div>
  );
}
