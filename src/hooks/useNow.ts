import { useMemo, useSyncExternalStore } from 'react';

/**
 * Em desenvolvimento, `?agora=2026-10-06T20:00` simula outro momento
 * (horário de Brasília) para testar o selo de aberto/fechado e a reserva.
 */
function readOverride(): number | null {
  if (!import.meta.env.DEV || typeof window === 'undefined') return null;
  const value = new URLSearchParams(window.location.search).get('agora');
  if (!value) return null;
  const ts = Date.parse(/[zZ]|[+-]\d\d:\d\d$/.test(value) ? value : `${value}-03:00`);
  return Number.isNaN(ts) ? null : ts;
}

const override = readOverride();

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
}

// Arredonda para o minuto: o snapshot só muda quando o minuto vira.
const getSnapshot = () => override ?? Math.floor(Date.now() / 60_000) * 60_000;

/** Hora atual, atualizada a cada minuto. `null` no HTML pré-renderizado e na hidratação. */
export function useNow(): Date | null {
  const ts = useSyncExternalStore(subscribe, getSnapshot, () => null);
  return useMemo(() => (ts === null ? null : new Date(ts)), [ts]);
}
