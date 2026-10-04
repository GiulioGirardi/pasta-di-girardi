import { business, hours } from '../../data/site';
import { useNow } from '../../hooks/useNow';
import { getOpenStatus } from '../../lib/hours';

interface OpenStatusProps {
  variant?: 'pill' | 'inline';
  className?: string;
}

/** "Aberto agora · fecha às 23h" / "Fechado · abre amanhã às 11h30", calculado no fuso de Porto Alegre. */
export function OpenStatus({ variant = 'pill', className = '' }: OpenStatusProps) {
  const now = useNow();

  // No HTML pré-renderizado não se sabe a hora do visitante: reserva o espaço sem texto.
  if (!now) {
    return <span aria-hidden="true" className={`inline-block h-8 ${variant === 'pill' ? 'w-36' : 'w-56'} ${className}`} />;
  }

  const { isOpen, detail } = getOpenStatus(now, hours, business.timeZone);
  const label = isOpen ? 'Aberto agora' : 'Fechado';

  if (variant === 'inline') {
    return (
      <p className={`inline-flex items-center gap-2 font-semibold ${className}`}>
        <Dot isOpen={isOpen} />
        <span>
          {label}
          <span className="font-normal"> · {detail}</span>
        </span>
      </p>
    );
  }

  return (
    <p
      className={`inline-flex h-8 items-center gap-2 rounded-full border px-3 text-sm font-semibold whitespace-nowrap ${
        isOpen
          ? 'border-manjericao-700/30 bg-manjericao-50 text-manjericao-800'
          : 'border-terracota-800/25 bg-creme-100 text-terracota-800'
      } ${className}`}
      title={`${label} · ${detail}`}
    >
      <Dot isOpen={isOpen} />
      {label}
      <span className="sr-only">, {detail}</span>
    </p>
  );
}

function Dot({ isOpen }: { isOpen: boolean }) {
  return (
    <span aria-hidden="true" className="relative flex size-2.5">
      {isOpen && (
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-manjericao-600 opacity-60 motion-reduce:hidden" />
      )}
      <span className={`relative inline-flex size-2.5 rounded-full ${isOpen ? 'bg-manjericao-600' : 'bg-terracota-700'}`} />
    </span>
  );
}
