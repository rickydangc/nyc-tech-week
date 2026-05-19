import { Event, EventScores, Persona, PersonaProfile } from './types';
import { personas } from './personas';

function inferScores(event: {
  topics: string[];
  formats: string[];
  isInviteOnly: boolean;
  description: string;
  company: string;
  name: string;
}): EventScores {
  const desc = (event.description + ' ' + event.name).toLowerCase();
  const topics = event.topics;
  const formats = event.formats;

  let founder_value = 3;
  let technical_depth = 3;
  let networking_quality = 3;
  let creator_energy = 3;
  let investor_density = 3;
  let hype = 3;
  let exclusivity = 3;

  if (topics.includes('Founder fundraising / VC')) { founder_value += 3; investor_density += 3; }
  if (topics.includes('AI / Agents / GenAI')) { technical_depth += 2; hype += 1; }
  if (topics.includes('AI infra / devtools / cloud')) { technical_depth += 3; }
  if (topics.includes('Consumer / creative / media')) { creator_energy += 3; }
  if (topics.includes('GTM / marketing / creator')) { creator_energy += 2; networking_quality += 1; }
  if (topics.includes('Climate / deeptech / hardware')) { technical_depth += 2; }
  if (topics.includes('Health / bio / wellness')) { technical_depth += 1; }
  if (topics.includes('Fintech / finance')) { investor_density += 2; }
  if (topics.includes('Diversity / women / international')) { networking_quality += 2; }

  if (formats.includes('technical_talk_workshop')) { technical_depth += 2; }
  if (formats.includes('fundraising_vc')) { investor_density += 2; founder_value += 2; }
  if (formats.includes('community_networking')) { networking_quality += 2; }
  if (formats.includes('product_demo_showcase')) { technical_depth += 1; hype += 1; }
  if (formats.includes('wellness_social')) { creator_energy += 1; }

  if (event.isInviteOnly) { exclusivity += 4; networking_quality += 1; }

  if (desc.includes('pitch')) { founder_value += 2; investor_density += 1; }
  if (desc.includes('demo day')) { hype += 2; technical_depth += 1; }
  if (desc.includes('hackathon')) { technical_depth += 3; founder_value += 1; }
  if (desc.includes('fireside')) { networking_quality += 1; }
  if (desc.includes('dinner')) { exclusivity += 2; networking_quality += 2; }
  if (desc.includes('happy hour') || desc.includes('drinks')) { networking_quality += 2; creator_energy += 1; }
  if (desc.includes('party') || desc.includes('afterparty')) { hype += 2; creator_energy += 2; }
  if (desc.includes('workshop')) { technical_depth += 2; }
  if (desc.includes('keynote')) { hype += 2; }
  if (desc.includes('investor') || desc.includes('lp') || desc.includes('allocator')) { investor_density += 3; }
  if (desc.includes('founder')) { founder_value += 1; }
  if (desc.includes('women') || desc.includes('female') || desc.includes('diverse')) { networking_quality += 1; }

  const normalize = (v: number) => Math.min(10, Math.max(1, Math.round(v)));

  return {
    founder_value: normalize(founder_value),
    technical_depth: normalize(technical_depth),
    networking_quality: normalize(networking_quality),
    creator_energy: normalize(creator_energy),
    investor_density: normalize(investor_density),
    hype: normalize(hype),
    exclusivity: normalize(exclusivity),
  };
}

function generateVibeCheck(event: { name: string; topics: string[]; formats: string[]; isInviteOnly: boolean; description: string; scores: EventScores }): string {
  const { scores, isInviteOnly } = event;
  const parts: string[] = [];

  if (scores.exclusivity >= 8) parts.push('Ultra-exclusive.');
  else if (isInviteOnly) parts.push('Invite-only — know someone who knows someone.');

  if (scores.technical_depth >= 8) parts.push('Deep technical content.');
  else if (scores.technical_depth >= 6) parts.push('Solid technical discussions.');

  if (scores.investor_density >= 8) parts.push('VCs everywhere.');
  if (scores.hype >= 8) parts.push('Maximum hype energy.');
  if (scores.creator_energy >= 8) parts.push('Creator-coded vibes.');
  if (scores.networking_quality >= 8) parts.push('A-tier networking.');

  if (parts.length === 0) parts.push('Solid community event.');
  return parts.join(' ');
}

function generateWhoShouldGo(event: { topics: string[]; formats: string[]; scores: EventScores }): string {
  const parts: string[] = [];
  if (event.scores.founder_value >= 7) parts.push('founders actively raising');
  if (event.scores.technical_depth >= 7) parts.push('engineers who want depth');
  if (event.scores.investor_density >= 7) parts.push('investors scouting deals');
  if (event.scores.creator_energy >= 7) parts.push('creators and content builders');
  if (event.scores.networking_quality >= 7) parts.push('anyone building their network');
  if (parts.length === 0) parts.push('anyone curious about the space');
  return parts.slice(0, 3).join(', ');
}

function generateSkipIf(event: { scores: EventScores; isInviteOnly: boolean; formats: string[] }): string {
  const parts: string[] = [];
  if (event.scores.hype >= 8 && event.scores.technical_depth <= 4) parts.push('you want substance over vibes');
  if (event.scores.technical_depth >= 8) parts.push('you\'re not technical');
  if (event.isInviteOnly) parts.push('you don\'t have an invite');
  if (event.scores.investor_density >= 8 && event.scores.technical_depth <= 3) parts.push('you hate pitch culture');
  if (event.formats.includes('wellness_social')) parts.push('you\'re not a morning person');
  if (parts.length === 0) parts.push('you have better options at this time slot');
  return parts[0];
}

function generateTags(event: { topics: string[]; formats: string[]; scores: EventScores; isInviteOnly: boolean; name: string; description: string }): string[] {
  const tags: string[] = [];
  const desc = (event.description + ' ' + event.name).toLowerCase();

  if (event.isInviteOnly) tags.push('invite-only');
  if (event.scores.exclusivity >= 8) tags.push('exclusive');
  if (event.scores.technical_depth >= 8) tags.push('deep-tech');
  if (event.scores.hype >= 8) tags.push('high-hype');
  if (event.scores.networking_quality >= 8) tags.push('top-networking');
  if (event.scores.investor_density >= 8) tags.push('vc-heavy');
  if (event.scores.founder_value >= 8) tags.push('founder-must');
  if (event.scores.creator_energy >= 8) tags.push('creator-vibes');

  if (desc.includes('women') || desc.includes('female') || desc.includes('lgbtq')) tags.push('diversity');
  if (desc.includes('dinner')) tags.push('dinner');
  if (desc.includes('happy hour') || desc.includes('drinks') || desc.includes('cocktail')) tags.push('drinks');
  if (desc.includes('party') || desc.includes('afterparty')) tags.push('party');
  if (desc.includes('run') || desc.includes('wellness') || desc.includes('yoga')) tags.push('wellness');
  if (desc.includes('hackathon')) tags.push('hackathon');
  if (desc.includes('demo')) tags.push('demo-day');
  if (desc.includes('pitch')) tags.push('pitch');
  if (desc.includes('workshop')) tags.push('workshop');

  return tags.slice(0, 5);
}

export function enrichEvent(raw: {
  id: string;
  date: string;
  time: string;
  daypart: string;
  name: string;
  company: string;
  location: string;
  neighborhood: string;
  isInviteOnly: boolean;
  topics: string[];
  formats: string[];
  description: string;
  externalHref: string;
}): Event {
  const scores = inferScores(raw);
  const withScores = { ...raw, scores };

  return {
    ...raw,
    daypart: raw.daypart as Event['daypart'],
    scores,
    tags: generateTags(withScores),
    vibeCheck: generateVibeCheck(withScores),
    whoShouldGo: generateWhoShouldGo(withScores),
    skipIf: generateSkipIf(withScores),
  };
}

export function scoreForPersona(event: Event, persona: PersonaProfile): number {
  let score = 0;
  let maxWeight = 0;

  for (const topic of event.topics) {
    const weight = persona.topicWeights[topic] || 0;
    score += weight * 10;
    maxWeight += 10;
  }

  for (const format of event.formats) {
    const weight = persona.formatWeights[format] || 0;
    score += weight * 8;
    maxWeight += 8;
  }

  for (const [key, weight] of Object.entries(persona.scoreWeights)) {
    const eventScore = event.scores[key as keyof EventScores] || 0;
    score += eventScore * (weight || 0);
    maxWeight += 10 * (weight || 0);
  }

  return maxWeight > 0 ? Math.round((score / maxWeight) * 100) : 0;
}

export function getRecommendations(events: Event[], personaId: Persona, date?: string): Event[] {
  const persona = personas.find(p => p.id === personaId);
  if (!persona) return events;

  let filtered = events;
  if (date) filtered = events.filter(e => e.date === date);

  return filtered
    .map(event => ({ event, score: scoreForPersona(event, persona) }))
    .sort((a, b) => b.score - a.score)
    .map(({ event }) => event);
}
