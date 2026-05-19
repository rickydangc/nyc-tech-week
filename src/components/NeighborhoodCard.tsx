'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Link from 'next/link';

interface NeighborhoodCardProps {
  neighborhood: {
    id: string;
    name: string;
    vibe: string;
    description: string;
    eventCount: number;
  };
  index?: number;
}

export function NeighborhoodCard({ neighborhood, index = 0 }: NeighborhoodCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        href={`/neighborhoods/${neighborhood.id}`}
        className="block card-hover rounded-2xl border border-border bg-surface p-5 h-full"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <MapPin className="w-5 h-5 text-accent" />
          </div>
          <span className="text-xs font-mono text-muted">
            {neighborhood.eventCount} events
          </span>
        </div>
        <h3 className="font-bold text-base mb-1">{neighborhood.name}</h3>
        <p className="text-xs text-accent-soft font-medium mb-2">{neighborhood.vibe}</p>
        <p className="text-xs text-muted leading-relaxed">{neighborhood.description}</p>
      </Link>
    </motion.div>
  );
}
