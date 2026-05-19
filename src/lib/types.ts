export interface RawEvent {
  id: string;
  date: string;
  time: string;
  daypart: string;
  name: string;
  company: string;
  location: string;
  isInviteOnly: string;
  topics: string;
  formats: string;
  description: string;
  externalHref: string;
}

export interface Event {
  id: string;
  date: string;
  time: string;
  daypart: 'morning' | 'afternoon' | 'evening' | 'night';
  name: string;
  company: string;
  location: string;
  neighborhood: string;
  isInviteOnly: boolean;
  topics: string[];
  formats: string[];
  description: string;
  externalHref: string;
  scores: EventScores;
  tags: string[];
  vibeCheck: string;
  whoShouldGo: string;
  skipIf: string;
}

export interface EventScores {
  founder_value: number;
  technical_depth: number;
  networking_quality: number;
  creator_energy: number;
  investor_density: number;
  hype: number;
  exclusivity: number;
}

export type Persona =
  | 'ai-builder'
  | 'ai-founder'
  | 'vc-investor'
  | 'gtm-marketing'
  | 'creator-media'
  | 'student'
  | 'deeptech-robotics'
  | 'healthcare-ai'
  | 'international-founder';

export interface PersonaProfile {
  id: Persona;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  topicWeights: Record<string, number>;
  formatWeights: Record<string, number>;
  scoreWeights: Partial<EventScores>;
}

export interface Neighborhood {
  id: string;
  name: string;
  vibe: string;
  description: string;
  coordinates: [number, number];
  eventCount: number;
}

export interface DayPlan {
  date: string;
  persona: Persona;
  slots: PlanSlot[];
  walkingMinutes: number;
  neighborhoods: string[];
}

export interface PlanSlot {
  event: Event;
  startTime: string;
  endTime: string;
  travelFromPrevious?: string;
  note?: string;
}
