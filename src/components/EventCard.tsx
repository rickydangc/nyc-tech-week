'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Users, ExternalLink, Lock } from 'lucide-react';
import { Event } from '@/lib/types';

function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-muted w-16 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-surface-3 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value * 10}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <span className="text-[10px] text-muted w-4 text-right">{value}</span>
    </div>
  );
}

export function EventCard({ event, index = 0, compact = false }: { event: Event; index?: number; compact?: boolean }) {
  const daypartColors: Record<string, string> = {
    morning: '#f59e0b',
    afternoon: '#6366f1',
    evening: '#a855f7',
    night: '#ec4899',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="card-hover rounded-2xl border border-border bg-surface p-5 flex flex-col gap-3"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: daypartColors[event.daypart] || '#6366f1' }}
            />
            <span className="text-xs text-muted">{event.daypart}</span>
            {event.isInviteOnly && (
              <span className="flex items-center gap-0.5 text-[10px] text-warning bg-warning/10 px-1.5 py-0.5 rounded-full">
                <Lock className="w-2.5 h-2.5" />
                Invite Only
              </span>
            )}
          </div>
          <h3 className="font-semibold text-sm leading-tight line-clamp-2">{event.name}</h3>
          <p className="text-xs text-muted mt-1">{event.company}</p>
        </div>
        {event.externalHref && (
          <a
            href={event.externalHref}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 p-2 rounded-lg bg-surface-2 hover:bg-surface-3 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-muted" />
          </a>
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-3 text-xs text-muted">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {event.time?.slice(0, 5)}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {event.location}
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          {event.whoShouldGo}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {event.tags.map(tag => (
          <span
            key={tag}
            className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-accent/10 text-accent-soft border border-accent/20"
          >
            {tag}
          </span>
        ))}
        {event.topics.slice(0, 2).map(topic => (
          <span
            key={topic}
            className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-surface-2 text-muted"
          >
            {topic}
          </span>
        ))}
      </div>

      {/* Vibe check */}
      {!compact && (
        <p className="text-xs text-muted/80 italic">&ldquo;{event.vibeCheck}&rdquo;</p>
      )}

      {/* Scores */}
      {!compact && (
        <div className="space-y-1.5 pt-2 border-t border-border">
          <ScoreBar label="Technical" value={event.scores.technical_depth} color="#6366f1" />
          <ScoreBar label="Networking" value={event.scores.networking_quality} color="#22c55e" />
          <ScoreBar label="Investor" value={event.scores.investor_density} color="#f59e0b" />
          <ScoreBar label="Hype" value={event.scores.hype} color="#ec4899" />
          <ScoreBar label="Exclusive" value={event.scores.exclusivity} color="#a855f7" />
        </div>
      )}

      {/* Skip if */}
      {!compact && event.skipIf && (
        <p className="text-[10px] text-muted">
          <span className="text-danger">Skip if:</span> {event.skipIf}
        </p>
      )}
    </motion.div>
  );
}
