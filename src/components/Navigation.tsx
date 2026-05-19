'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Users, Calendar, Compass } from 'lucide-react';

const links = [
  { href: '/', label: 'Home', icon: Sparkles },
  { href: '/events', label: 'Events', icon: Compass },
  { href: '/personas', label: 'For You', icon: Users },
  { href: '/neighborhoods', label: 'Map', icon: MapPin },
  { href: '/planner', label: 'Planner', icon: Calendar },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 glass px-6 py-3 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg">NYC Tech Week</span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-muted hover:text-foreground'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-surface-2 rounded-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </Link>
            );
          })}
        </div>

        <Link
          href="/planner"
          className="px-4 py-2 bg-accent rounded-lg text-sm font-medium text-white hover:bg-accent-soft transition-colors"
        >
          Build My Week
        </Link>
      </nav>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass px-2 py-2 flex items-center justify-around safe-area-bottom">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${
                isActive ? 'text-accent' : 'text-muted'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Spacers */}
      <div className="hidden md:block h-16" />
      <div className="md:hidden h-0" />
    </>
  );
}
