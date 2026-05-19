'use client';

import { motion } from 'framer-motion';
import { PersonaProfile } from '@/lib/types';
import Link from 'next/link';

export function PersonaCard({ persona, index = 0 }: { persona: PersonaProfile; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        href={`/personas/${persona.id}`}
        className="block card-hover rounded-2xl border border-border bg-surface p-6 h-full"
      >
        <div className="text-3xl mb-3">{persona.emoji}</div>
        <h3 className="font-bold text-lg mb-1">{persona.name}</h3>
        <p className="text-sm text-accent-soft font-medium mb-2">{persona.tagline}</p>
        <p className="text-xs text-muted leading-relaxed">{persona.description}</p>

        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex flex-wrap gap-1">
            {Object.keys(persona.topicWeights).slice(0, 3).map(topic => (
              <span
                key={topic}
                className="px-2 py-0.5 text-[10px] rounded-full bg-surface-2 text-muted"
              >
                {topic.split('/')[0].trim()}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
