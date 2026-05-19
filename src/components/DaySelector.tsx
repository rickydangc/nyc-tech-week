'use client';

import { motion } from 'framer-motion';

const DAYS = [
  { date: '2026-06-01', label: 'Sun', day: '1', full: 'June 1' },
  { date: '2026-06-02', label: 'Mon', day: '2', full: 'June 2' },
  { date: '2026-06-03', label: 'Tue', day: '3', full: 'June 3' },
  { date: '2026-06-04', label: 'Wed', day: '4', full: 'June 4' },
  { date: '2026-06-05', label: 'Thu', day: '5', full: 'June 5' },
  { date: '2026-06-06', label: 'Fri', day: '6', full: 'June 6' },
  { date: '2026-06-07', label: 'Sat', day: '7', full: 'June 7' },
];

export function DaySelector({
  selected,
  onChange,
  eventCounts,
}: {
  selected: string;
  onChange: (date: string) => void;
  eventCounts?: Record<string, number>;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      <button
        onClick={() => onChange('')}
        className={`relative shrink-0 px-4 py-3 rounded-xl text-center transition-all ${
          !selected ? 'text-white' : 'text-muted hover:text-foreground bg-surface-2'
        }`}
      >
        {!selected && (
          <motion.div
            layoutId="day-selector"
            className="absolute inset-0 bg-accent rounded-xl"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
          />
        )}
        <span className="relative z-10 text-xs font-medium">All</span>
      </button>
      {DAYS.map(day => {
        const isActive = selected === day.date;
        const count = eventCounts?.[day.date] || 0;
        return (
          <button
            key={day.date}
            onClick={() => onChange(day.date)}
            className={`relative shrink-0 flex flex-col items-center px-4 py-2 rounded-xl transition-all min-w-[56px] ${
              isActive ? 'text-white' : 'text-muted hover:text-foreground bg-surface-2'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="day-selector"
                className="absolute inset-0 bg-accent rounded-xl"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 text-[10px] font-medium uppercase">{day.label}</span>
            <span className="relative z-10 text-lg font-bold">{day.day}</span>
            {count > 0 && (
              <span className="relative z-10 text-[9px] opacity-70">{count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
