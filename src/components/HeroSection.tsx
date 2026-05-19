'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function HeroSection({ eventCount }: { eventCount: number }) {
  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[128px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-2 border border-border text-xs text-muted mb-6">
            <Sparkles className="w-3 h-3 text-accent" />
            <span>AI-curated for NYC Tech Week 2026</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold tracking-tight leading-[0.9] mb-6">
            <span className="gradient-text">Your insider guide</span>
            <br />
            <span className="text-foreground">to Tech Week NYC</span>
          </h1>

          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            {eventCount}+ events. 7 days. Every neighborhood.
            <br className="hidden md:block" />
            Curated like a friend who knows every founder in the city made this for you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="/planner"
            className="group flex items-center gap-2 px-6 py-3 bg-accent rounded-xl text-sm font-semibold text-white hover:bg-accent-soft transition-all glow"
          >
            Build My Tech Week
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/personas"
            className="flex items-center gap-2 px-6 py-3 bg-surface-2 border border-border rounded-xl text-sm font-medium text-foreground hover:border-accent/50 transition-all"
          >
            Find My Persona
          </Link>
          <Link
            href="/events"
            className="flex items-center gap-2 px-6 py-3 bg-surface-2 border border-border rounded-xl text-sm font-medium text-foreground hover:border-accent/50 transition-all"
          >
            Browse All Events
          </Link>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          {[
            { label: 'Events', value: `${eventCount}+` },
            { label: 'Days', value: 'Jun 1–7' },
            { label: 'Neighborhoods', value: '18+' },
            { label: 'Personas', value: '9' },
          ].map(stat => (
            <div key={stat.label} className="p-3 rounded-xl bg-surface/50 border border-border">
              <div className="text-lg font-bold text-foreground">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
