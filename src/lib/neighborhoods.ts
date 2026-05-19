import { Neighborhood } from './types';

export const neighborhoods: Neighborhood[] = [
  { id: 'midtown', name: 'Midtown', vibe: 'Corporate AI meets demo day energy', description: 'The epicenter of enterprise AI events and big-stage keynotes.', coordinates: [40.7549, -73.9840], eventCount: 0 },
  { id: 'soho', name: 'SoHo', vibe: 'Design-forward founders and gallery pop-ups', description: 'Where creative AI meets consumer startups. Boutique venues and intimate panels.', coordinates: [40.7233, -73.9985], eventCount: 0 },
  { id: 'flatiron', name: 'Flatiron', vibe: 'VC offices and pitch competitions', description: 'Investor-dense neighborhood. Every coffee shop has a term sheet on the table.', coordinates: [40.7411, -73.9897], eventCount: 0 },
  { id: 'chelsea', name: 'Chelsea', vibe: 'Art galleries turned AI showcases', description: 'Creative tech events in stunning gallery spaces. High production value.', coordinates: [40.7465, -74.0014], eventCount: 0 },
  { id: 'financial-district', name: 'Financial District', vibe: 'Fintech and institutional capital', description: 'Where Wall Street meets AI. Expect suits mixed with hoodies.', coordinates: [40.7075, -74.0113], eventCount: 0 },
  { id: 'brooklyn', name: 'Brooklyn', vibe: 'Indie builders and underground demos', description: 'The counterculture side of tech week. Warehouse parties and hacker meetups.', coordinates: [40.6782, -73.9442], eventCount: 0 },
  { id: 'union-square', name: 'Union Square', vibe: 'Community hubs and open meetups', description: 'Accessible events near transit hubs. Great for first-timers.', coordinates: [40.7359, -73.9911], eventCount: 0 },
  { id: 'lower-east-side', name: 'Lower East Side', vibe: 'After-dark networking and rooftop bars', description: 'Evening events with a downtown edge. Casual networking over cocktails.', coordinates: [40.7150, -73.9843], eventCount: 0 },
  { id: 'tribeca', name: 'Tribeca', vibe: 'Exclusive dinners and intimate gatherings', description: 'High-signal, low-noise. Invite-only dinners with serious operators.', coordinates: [40.7163, -74.0086], eventCount: 0 },
  { id: 'nomad', name: 'Nomad', vibe: 'Hotel lobbies and rooftop mixers', description: 'Boutique hotel events and polished networking. The sweet spot between casual and professional.', coordinates: [40.7448, -73.9867], eventCount: 0 },
  { id: 'east-village', name: 'East Village', vibe: 'Scrappy builders and late-night hacks', description: 'Dive bars turned demo nights. The most authentic builder energy.', coordinates: [40.7265, -73.9815], eventCount: 0 },
  { id: 'greenwich-village', name: 'Greenwich Village', vibe: 'Academic AI and NYU connections', description: 'Where research meets product. University-adjacent talks and faculty mixers.', coordinates: [40.7336, -74.0027], eventCount: 0 },
  { id: 'west-village', name: 'West Village', vibe: 'Intimate founder dinners', description: 'Quiet streets, powerful conversations. Small-group events with outsized impact.', coordinates: [40.7358, -74.0036], eventCount: 0 },
  { id: 'hudson-yards', name: 'Hudson Yards', vibe: 'Big tech and enterprise showcases', description: 'Shiny new venues for shiny new products. Corporate but impressive.', coordinates: [40.7538, -74.0013], eventCount: 0 },
  { id: 'meatpacking-district', name: 'Meatpacking District', vibe: 'Swanky after-parties and brand activations', description: 'Where tech meets luxury. High-energy evenings and beautiful venues.', coordinates: [40.7409, -74.0077], eventCount: 0 },
  { id: 'williamsburg', name: 'Williamsburg', vibe: 'Creator economy and indie hacks', description: 'Brooklyn\'s startup heartbeat. Loft spaces and rooftop views.', coordinates: [40.7081, -73.9571], eventCount: 0 },
  { id: 'central-park', name: 'Central Park', vibe: 'Morning runs and outdoor networking', description: 'Start your day with founder runs and wellness-meets-tech energy.', coordinates: [40.7829, -73.9654], eventCount: 0 },
  { id: 'virtual', name: 'Virtual (NYC)', vibe: 'Remote-friendly tech week', description: 'For those who want in on the conversation without the commute.', coordinates: [40.7128, -74.0060], eventCount: 0 },
];

export function getNeighborhoodId(location: string): string {
  const loc = location.toLowerCase();
  if (loc.includes('midtown')) return 'midtown';
  if (loc.includes('soho')) return 'soho';
  if (loc.includes('flatiron')) return 'flatiron';
  if (loc.includes('chelsea')) return 'chelsea';
  if (loc.includes('financial') || loc.includes('fidi')) return 'financial-district';
  if (loc.includes('williamsburg')) return 'williamsburg';
  if (loc.includes('brooklyn')) return 'brooklyn';
  if (loc.includes('union square')) return 'union-square';
  if (loc.includes('lower east')) return 'lower-east-side';
  if (loc.includes('tribeca')) return 'tribeca';
  if (loc.includes('nomad') || loc.includes('noMad')) return 'nomad';
  if (loc.includes('east village')) return 'east-village';
  if (loc.includes('greenwich')) return 'greenwich-village';
  if (loc.includes('west village')) return 'west-village';
  if (loc.includes('hudson yards')) return 'hudson-yards';
  if (loc.includes('meatpacking')) return 'meatpacking-district';
  if (loc.includes('central park')) return 'central-park';
  if (loc.includes('virtual')) return 'virtual';
  if (loc.includes('upper')) return 'midtown';
  if (loc.includes('queens')) return 'brooklyn';
  return 'midtown';
}
