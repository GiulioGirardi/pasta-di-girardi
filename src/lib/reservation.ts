import { hours, reservation, whatsappMessages } from '../data/site';
import type { Clock, ReservationField } from '../types';
import { formatLongDate } from './format';
import { addDays, formatClock, reservationSlots, weekdayOf } from './hours';

export type Field = ReservationField;
export type Values = Record<Field, string>;
export type Errors = Partial<Record<Field, string>>;

export const FIELDS: Field[] = ['name', 'phone', 'date', 'time', 'people'];
const MIN_NOTICE_MINUTES = 30;

/** Data e hora atuais no fuso da casa; `null` antes da hidratação. */
export interface Today {
  isoDate: string;
  minutes: number;
}

export function slotsFor(date: string, today: Today | null): Clock[] {
  if (!date) return [];
  return reservationSlots(date, hours, {
    step: reservation.slotStep,
    lastSlotBeforeClose: reservation.lastSlotBeforeClose,
    afterMinutes: today && date === today.isoDate ? today.minutes + MIN_NOTICE_MINUTES : undefined,
  });
}

export function closedDayMessage(date: string): string | null {
  const day = hours.find((h) => h.day === weekdayOf(date));
  if (day && day.ranges.length) return null;
  return `Não abrimos ${day ? `às ${day.label.toLowerCase()}s` : 'neste dia'}. Escolha outra data.`;
}

export function validate(values: Values, today: Today | null): Errors {
  const errors: Errors = {};
  const name = values.name.trim();
  if (!name) errors.name = 'Informe seu nome.';
  else if (name.length < 2) errors.name = 'O nome parece curto demais.';

  const digits = values.phone.replace(/\D/g, '');
  if (!digits) errors.phone = 'Informe um telefone para contato.';
  else if (digits.length < 10 || digits.length > 11 || digits.startsWith('0'))
    errors.phone = 'Use DDD + número, ex.: (51) 99999-9999.';

  if (!values.date) errors.date = 'Escolha a data.';
  else if (today && values.date < today.isoDate) errors.date = 'A data já passou.';
  else if (today && values.date > addDays(today.isoDate, reservation.maxDaysAhead))
    errors.date = `Aceitamos reservas para até ${reservation.maxDaysAhead} dias.`;
  else {
    const closed = closedDayMessage(values.date);
    if (closed) errors.date = closed;
  }

  if (!errors.date) {
    const slots = slotsFor(values.date, today);
    if (!values.time) errors.time = slots.length ? 'Escolha o horário.' : 'Não há mais horários nesta data.';
    else if (!slots.includes(values.time as Clock)) errors.time = 'Horário indisponível. Escolha outro.';
  }

  const people = Number(values.people);
  if (!Number.isInteger(people) || people < 1 || people > reservation.maxPeople)
    errors.people = `Escolha de 1 a ${reservation.maxPeople} pessoas.`;

  return errors;
}

export function buildMessage(values: Values): string {
  const t = whatsappMessages.reservation;
  return [
    t.intro,
    '',
    `${t.labels.name}: ${values.name.trim()}`,
    `${t.labels.phone}: ${values.phone}`,
    `${t.labels.date}: ${formatLongDate(values.date)}`,
    `${t.labels.time}: ${formatClock(values.time)}`,
    `${t.labels.people}: ${Number(values.people)}`,
    '',
    t.closing,
  ].join('\n');
}
