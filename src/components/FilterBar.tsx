'use client';

import { motion } from 'framer-motion';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  filters: {
    id: string;
    label: string;
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
  }[];
}

export function FilterBar({ filters }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map(filter => (
        <div key={filter.id} className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase tracking-wider text-muted font-medium">
            {filter.label}
          </label>
          <div className="flex gap-1 flex-wrap">
            {filter.options.map(option => {
              const isActive = filter.value === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => filter.onChange(isActive ? '' : option.value)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'text-white'
                      : 'text-muted hover:text-foreground bg-surface-2 hover:bg-surface-3'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId={`filter-${filter.id}`}
                      className="absolute inset-0 bg-accent rounded-lg"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
