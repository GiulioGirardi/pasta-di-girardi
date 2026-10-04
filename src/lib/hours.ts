import type { Clock, DayHours, Weekday } from '../types';

const MINUTES_PER_DAY = 24 * 60;
const MINUTES_PER_WEEK = 7 * MINUTES_PER_DAY;

const WEEKDAY_NAMES = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];

export function toMinutes(clock: Clock): number {
  const [h, m] = clock.split(':').map(Number);
  return h * 60 + m;
}

/** "23:00" → "23h", "11:30" → "11h30" */
export function formatClock(clock: Clock | string): string {
  const [h, m] = clock.split(':');
  return m === '00' ? `${Number(h)}h` : `${Number(h)}h${m}`;
}

function minutesToClock(total: number): Clock {
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}` as Clock;
}

/** Dia da semana, minutos desde a meia-noite e data ISO no fuso informado. */
export function zonedParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? '';
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday')) as Weekday;
  return {
    weekday,
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
    isoDate: `${get('year')}-${get('month')}-${get('day')}`,
  };
}

interface Interval {
  start: number;
  end: number;
}

/** Converte os horários em intervalos na linha do tempo da semana (minutos desde domingo 00:00). */
function weeklyIntervals(hours: DayHours[]): Interval[] {
  return hours.flatMap(({ day, ranges }) =>
    ranges.map(({ open, close }) => {
      const start = day * MINUTES_PER_DAY + toMinutes(open);
      let end = day * MINUTES_PER_DAY + toMinutes(close);
      if (end <= start) end += MINUTES_PER_DAY; // atravessa a meia-noite
      return { start, end };
    }),
  );
}

export interface OpenStatus {
  isOpen: boolean;
  /** Frase curta, ex.: "fecha às 23h" ou "abre amanhã às 11h30". */
  detail: string;
}

export function getOpenStatus(now: Date, hours: DayHours[], timeZone: string): OpenStatus {
  const { weekday, minutes } = zonedParts(now, timeZone);
  const t = weekday * MINUTES_PER_DAY + minutes;
  const intervals = weeklyIntervals(hours);
  if (intervals.length === 0) return { isOpen: false, detail: 'sem horário definido' };

  // Considera a semana anterior e a seguinte para cobrir intervalos que dão a volta no domingo.
  const shifted = [-MINUTES_PER_WEEK, 0, MINUTES_PER_WEEK].flatMap((offset) =>
    intervals.map((i) => ({ start: i.start + offset, end: i.end + offset })),
  );

  const current = shifted.find((i) => t >= i.start && t < i.end);
  if (current) {
    return { isOpen: true, detail: `fecha às ${formatClock(minutesToClock(current.end % MINUTES_PER_DAY))}` };
  }

  const next = shifted.filter((i) => i.start > t).sort((a, b) => a.start - b.start)[0];
  const nextDay = Math.floor(next.start / MINUTES_PER_DAY);
  const today = Math.floor(t / MINUTES_PER_DAY);
  const time = formatClock(minutesToClock(next.start % MINUTES_PER_DAY));
  const when =
    nextDay === today
      ? 'hoje'
      : nextDay === today + 1
        ? 'amanhã'
        : WEEKDAY_NAMES[((nextDay % 7) + 7) % 7];
  return { isOpen: false, detail: `abre ${when} às ${time}` };
}

/** Dia da semana de uma data "AAAA-MM-DD", sem depender do fuso do navegador. */
export function weekdayOf(isoDate: string): Weekday {
  const [y, m, d] = isoDate.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay() as Weekday;
}

export function addDays(isoDate: string, days: number): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

/**
 * Horários de reserva para uma data: do início de cada turno até `lastSlotBeforeClose`
 * minutos antes de fechar, de `step` em `step` minutos. Se `afterMinutes` for informado
 * (reserva para hoje), descarta horários que já passaram.
 */
export function reservationSlots(
  isoDate: string,
  hours: DayHours[],
  { step, lastSlotBeforeClose, afterMinutes }: { step: number; lastSlotBeforeClose: number; afterMinutes?: number },
): Clock[] {
  const day = hours.find((h) => h.day === weekdayOf(isoDate));
  if (!day) return [];
  return day.ranges.flatMap(({ open, close }) => {
    const start = toMinutes(open);
    let end = toMinutes(close);
    if (end <= start) end += MINUTES_PER_DAY;
    const slots: Clock[] = [];
    for (let m = start; m <= end - lastSlotBeforeClose; m += step) {
      if (afterMinutes !== undefined && m <= afterMinutes) continue;
      slots.push(minutesToClock(m));
    }
    return slots;
  });
}

/** Turnos de um dia em texto, ex.: "11h30 – 14h30 · 19h – 23h". */
export function formatRanges(day: DayHours): string {
  if (day.ranges.length === 0) return 'Fechado';
  return day.ranges.map((r) => `${formatClock(r.open)} – ${formatClock(r.close)}`).join(' · ');
}
