/**
 * Divisor ondulado entre seções, lembrando uma fita de massa.
 * A cor vem de `currentColor`: use uma classe text-* igual ao fundo da seção vizinha.
 */
export function Wave({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none z-10 block h-6 w-full sm:h-10 ${flip ? 'rotate-180' : ''} ${className}`}
    >
      <path fill="currentColor" d="M0 30c120-16 240-24 360-12s240 30 360 18 240-30 360-24 240 18 360 12v24H0z" />
    </svg>
  );
}
