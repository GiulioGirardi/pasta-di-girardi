import { describe, expect, it } from 'vitest';
import { hours } from '../data/site';
import { addDays, formatClock, formatRanges, getOpenStatus, reservationSlots, weekdayOf, zonedParts } from './hours';

const TZ = 'America/Sao_Paulo';
/** Horário de Brasília (UTC−3, sem horário de verão) → Date. */
const brt = (iso: string) => new Date(`${iso}:00-03:00`);

describe('getOpenStatus', () => {
  it('aberto no almoço de terça, com horário de fechamento do turno', () => {
    expect(getOpenStatus(brt('2026-10-06T12:00'), hours, TZ)).toEqual({ isOpen: true, detail: 'fecha às 14h30' });
  });

  it('entre os turnos, abre hoje à noite', () => {
    expect(getOpenStatus(brt('2026-10-06T15:00'), hours, TZ)).toEqual({ isOpen: false, detail: 'abre hoje às 19h' });
  });

  it('segunda fechada: abre amanhã', () => {
    expect(getOpenStatus(brt('2026-10-05T12:00'), hours, TZ)).toEqual({ isOpen: false, detail: 'abre amanhã às 11h30' });
  });

  it('domingo à noite: pula a segunda e abre na terça', () => {
    expect(getOpenStatus(brt('2026-10-04T18:00'), hours, TZ)).toEqual({ isOpen: false, detail: 'abre terça às 11h30' });
  });

  it('usa o fuso da casa, não o do visitante', () => {
    // 02:30 UTC de quarta = 23:30 de terça em Porto Alegre, depois do fechamento (23h).
    const now = new Date('2026-10-07T02:30:00Z');
    expect(zonedParts(now, TZ)).toEqual({ weekday: 2, minutes: 23 * 60 + 30, isoDate: '2026-10-06' });
    expect(getOpenStatus(now, hours, TZ).isOpen).toBe(false);
    // Na sexta o salão fecha às 23h30.
    expect(getOpenStatus(brt('2026-10-09T23:15'), hours, TZ)).toEqual({ isOpen: true, detail: 'fecha às 23h30' });
  });

  it('turno que atravessa a meia-noite', () => {
    const late = [{ day: 6 as const, label: 'Sábado', ranges: [{ open: '20:00' as const, close: '02:00' as const }] }];
    expect(getOpenStatus(brt('2026-10-11T01:00'), late, TZ)).toEqual({ isOpen: true, detail: 'fecha às 2h' });
  });
});

describe('reservationSlots', () => {
  const opts = { step: 30, lastSlotBeforeClose: 60 };

  it('vai do início de cada turno até uma hora antes de fechar', () => {
    expect(reservationSlots('2026-10-06', hours, opts)).toEqual([
      '11:30', '12:00', '12:30', '13:00', '13:30',
      '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00',
    ]);
  });

  it('descarta horários que já passaram', () => {
    expect(reservationSlots('2026-10-06', hours, { ...opts, afterMinutes: 21 * 60 })).toEqual(['21:30', '22:00']);
  });

  it('dia fechado não tem horários', () => {
    expect(reservationSlots('2026-10-05', hours, opts)).toEqual([]);
  });
});

describe('datas', () => {
  it('weekdayOf não depende do fuso do navegador', () => {
    expect(weekdayOf('2026-10-05')).toBe(1);
    expect(weekdayOf('2026-10-04')).toBe(0);
  });

  it('addDays vira mês e ano', () => {
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
    expect(addDays('2028-02-28', 1)).toBe('2028-02-29');
    expect(addDays('2026-10-06', 60)).toBe('2026-12-05');
  });

  it('formata horários e turnos', () => {
    expect(formatClock('23:00')).toBe('23h');
    expect(formatClock('11:30')).toBe('11h30');
    expect(formatRanges(hours[1])).toBe('11h30 – 14h30 · 19h – 23h');
    expect(formatRanges(hours[0])).toBe('Fechado');
  });
});
