import { personas } from '@/lib/personas';
import { PersonaCard } from '@/components/PersonaCard';

export default function PersonasPage() {
  return (
    <div className="px-6 py-8 max-w-7xl mx-auto pb-24 md:pb-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Find Your Persona</h1>
        <p className="text-muted max-w-2xl">
          NYC Tech Week has 1200+ events. Not all of them are for you.
          Pick your persona and get curated recommendations — who to meet, where to go, what to skip.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {personas.map((persona, i) => (
          <PersonaCard key={persona.id} persona={persona} index={i} />
        ))}
      </div>
    </div>
  );
}
