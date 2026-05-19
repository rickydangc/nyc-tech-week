import { Event, RawEvent } from './types';
import { enrichEvent } from './scoring';
import { getNeighborhoodId } from './neighborhoods';

let cachedEvents: Event[] | null = null;

function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  fields.push(current.trim());
  return fields;
}

function parseCSV(text: string): RawEvent[] {
  const lines = text.split('\n').filter(l => l.trim());
  if (lines.length === 0) return [];

  const headers = parseCSVLine(lines[0]);
  const events: RawEvent[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length < headers.length) continue;

    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => { obj[h] = values[idx] || ''; });
    events.push(obj as unknown as RawEvent);
  }

  return events;
}

function transformEvent(raw: RawEvent): Event {
  const topics = raw.topics ? raw.topics.split(';').map(t => t.trim()).filter(Boolean) : [];
  const formats = raw.formats ? raw.formats.split(';').map(f => f.trim()).filter(Boolean) : [];
  const neighborhood = getNeighborhoodId(raw.location || '');

  return enrichEvent({
    id: raw.id,
    date: raw.date,
    time: raw.time,
    daypart: raw.daypart || 'morning',
    name: raw.name,
    company: raw.company,
    location: raw.location,
    neighborhood,
    isInviteOnly: raw.isInviteOnly === 'True',
    topics,
    formats,
    description: raw.description || '',
    externalHref: raw.externalHref || '',
  });
}

export async function loadEvents(): Promise<Event[]> {
  if (cachedEvents) return cachedEvents;

  const fs = await import('fs');
  const path = await import('path');

  const dataDir = path.join(process.cwd(), 'data');
  const files = ['techweek_nyc_v2.csv', 'techweek_nyc_v1.csv'];

  const allRawEvents: RawEvent[] = [];
  const seenIds = new Set<string>();

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    try {
      const text = fs.readFileSync(filePath, 'utf-8');
      const events = parseCSV(text);
      for (const event of events) {
        if (!seenIds.has(event.id)) {
          seenIds.add(event.id);
          allRawEvents.push(event);
        }
      }
    } catch {
      continue;
    }
  }

  cachedEvents = allRawEvents.map(transformEvent);
  return cachedEvents;
}

export function filterEvents(events: Event[], filters: {
  date?: string;
  neighborhood?: string;
  topic?: string;
  daypart?: string;
  inviteOnly?: boolean;
  search?: string;
}): Event[] {
  return events.filter(event => {
    if (filters.date && event.date !== filters.date) return false;
    if (filters.neighborhood && event.neighborhood !== filters.neighborhood) return false;
    if (filters.topic && !event.topics.includes(filters.topic)) return false;
    if (filters.daypart && event.daypart !== filters.daypart) return false;
    if (filters.inviteOnly !== undefined && event.isInviteOnly !== filters.inviteOnly) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const searchable = `${event.name} ${event.company} ${event.description} ${event.topics.join(' ')}`.toLowerCase();
      if (!searchable.includes(q)) return false;
    }
    return true;
  });
}
