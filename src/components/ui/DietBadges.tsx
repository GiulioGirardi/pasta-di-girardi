import type { DietTag } from '../../types';

const DIET_LABELS: Record<DietTag, { short: string; long: string; className: string }> = {
  vegetariano: {
    short: 'V',
    long: 'Vegetariano',
    className: 'border-manjericao-700/40 bg-manjericao-50 text-manjericao-800',
  },
  vegano: {
    short: 'VG',
    long: 'Vegano',
    className: 'border-manjericao-700 bg-manjericao-700 text-white',
  },
  'sem-gluten': {
    short: 'SG',
    long: 'Sem glúten',
    className: 'border-trigo-400 bg-trigo-200 text-castanho-900',
  },
};

const ORDER: DietTag[] = ['vegetariano', 'vegano', 'sem-gluten'];

function Badge({ tag, full = false }: { tag: DietTag; full?: boolean }) {
  const { short, long, className } = DIET_LABELS[tag];
  return (
    <span
      className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full border px-1.5 text-xs leading-none font-bold tracking-wide ${className}`}
      title={long}
    >
      {full ? (
        long
      ) : (
        <>
          <span aria-hidden="true">{short}</span>
          <span className="sr-only">{long}</span>
        </>
      )}
    </span>
  );
}

/** Selos compactos (V, VG, SG) com nome completo para leitores de tela. */
export function DietBadges({ tags, full = false, className = '' }: { tags?: DietTag[]; full?: boolean; className?: string }) {
  if (!tags?.length) return null;
  const sorted = ORDER.filter((t) => tags.includes(t));
  return (
    <span className={`inline-flex flex-wrap gap-1 ${className}`}>
      {sorted.map((tag) => (
        <Badge key={tag} tag={tag} full={full} />
      ))}
    </span>
  );
}

/** Legenda dos selos, exibida acima do cardápio. */
export function DietLegend({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-5 gap-y-2 text-sm text-castanho-700 ${className}`} aria-label="Legenda dos selos">
      {ORDER.map((tag) => (
        <li key={tag} className="inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full border px-1.5 text-xs font-bold ${DIET_LABELS[tag].className}`}
          >
            {DIET_LABELS[tag].short}
          </span>
          {DIET_LABELS[tag].long}
        </li>
      ))}
    </ul>
  );
}
