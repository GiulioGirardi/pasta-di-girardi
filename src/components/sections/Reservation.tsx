import { useId, useRef, useState, type FormEvent } from 'react';
import { business, hours, reservation } from '../../data/site';
import { useNow } from '../../hooks/useNow';
import { maskPhone } from '../../lib/format';
import { addDays, formatClock, formatRanges, zonedParts } from '../../lib/hours';
import {
  FIELDS,
  buildMessage,
  closedDayMessage,
  slotsFor,
  validate,
  type Errors,
  type Field,
  type Today,
  type Values,
} from '../../lib/reservation';
import { whatsappUrl } from '../../lib/whatsapp';
import type { Clock } from '../../types';
import { IconAlert, IconChat, IconCheck, IconClock, IconPhone } from '../ui/Icons';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function Reservation() {
  const baseId = useId();
  const now = useNow();
  const today: Today | null = now ? zonedParts(now, business.timeZone) : null;
  const [values, setValues] = useState<Values>({ name: '', phone: '', date: '', time: '', people: '2' });
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const id = (field: Field) => `${baseId}-${field}`;
  const slots = values.date && !closedDayMessage(values.date) ? slotsFor(values.date, today) : [];

  const update = (field: Field, raw: string) => {
    const next = { ...values, [field]: field === 'phone' ? maskPhone(raw) : raw };
    // Ao trocar a data, descarta um horário que não existe mais.
    if (field === 'date' && !slotsFor(raw, today).includes(next.time as Clock)) next.time = '';
    setValues(next);
    setSentUrl(null);
    if (attempted) setErrors(validate(next, today));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setAttempted(true);
    const found = validate(values, today);
    setErrors(found);
    const firstInvalid = FIELDS.find((f) => found[f]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id(firstInvalid))}`)?.focus();
      return;
    }
    const url = whatsappUrl(buildMessage(values));
    setSentUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const fieldProps = (field: Field) => ({
    id: id(field),
    name: field,
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `${id(field)}-error` : undefined,
  });

  const errorText = (field: Field) =>
    errors[field] ? (
      <p id={`${id(field)}-error`} className="field-error">
        <IconAlert className="mt-0.5 size-4 shrink-0" />
        {errors[field]}
      </p>
    ) : null;

  const errorCount = Object.keys(errors).length;

  return (
    <section id="reserva" aria-labelledby="reserva-title" className="section relative bg-creme-50 pt-24 sm:pt-28">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading id="reserva-title" eyebrow={reservation.eyebrow} title={reservation.title} intro={reservation.intro} />

          <Reveal className="mt-10 space-y-4">
            <div className="flex gap-4 rounded-2xl bg-creme-200 p-5">
              <IconClock className="mt-0.5 size-6 shrink-0 text-terracota-700" />
              <div>
                <h3 className="font-sans font-semibold">{reservation.hoursTitle}</h3>
                <ul className="mt-2 space-y-1 text-[0.9375rem] text-castanho-700">
                  {hours.map((day) => (
                    <li key={day.day} className="flex flex-wrap justify-between gap-x-4">
                      <span>{day.label}</span>
                      <span className="whitespace-nowrap">{formatRanges(day)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl bg-creme-200 p-5">
              <IconPhone className="mt-0.5 size-6 shrink-0 text-terracota-700" />
              <p className="text-castanho-700">
                {reservation.callPrompt} <a href={`tel:${business.phone.e164}`} className="font-semibold text-castanho-900 underline underline-offset-4">{business.phone.display}</a>
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7">
          <form
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            aria-describedby={`${baseId}-required`}
            className="rounded-[2rem] bg-white p-6 shadow-[0_24px_60px_-34px_rgb(43_29_20/0.55)] sm:p-10"
          >
            <p id={`${baseId}-required`} className="text-sm text-castanho-600">
              {reservation.requiredNote}
            </p>

            <div role="alert" className="empty:hidden">
              {attempted && errorCount > 0 && (
                <p className="mt-4 flex items-start gap-2 rounded-xl bg-terracota-600/10 p-4 font-semibold text-terracota-800">
                  <IconAlert className="mt-0.5 size-5 shrink-0" />
                  {errorCount === 1 ? 'Corrija 1 campo para continuar.' : `Corrija ${errorCount} campos para continuar.`}
                </p>
              )}
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor={id('name')} className="field-label">
                  {reservation.labels.name}
                </label>
                <input
                  {...fieldProps('name')}
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={(e) => update('name', e.target.value)}
                  className="field-input"
                />
                {errorText('name')}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={id('phone')} className="field-label">
                  {reservation.labels.phone}
                </label>
                <input
                  {...fieldProps('phone')}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder={reservation.phonePlaceholder}
                  value={values.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  className="field-input"
                />
                {errorText('phone')}
              </div>

              <div>
                <label htmlFor={id('date')} className="field-label">
                  {reservation.labels.date}
                </label>
                <input
                  {...fieldProps('date')}
                  type="date"
                  min={today?.isoDate}
                  max={today ? addDays(today.isoDate, reservation.maxDaysAhead) : undefined}
                  value={values.date}
                  onChange={(e) => update('date', e.target.value)}
                  className="field-input"
                />
                {errorText('date')}
              </div>

              <div>
                <label htmlFor={id('time')} className="field-label">
                  {reservation.labels.time}
                </label>
                <select
                  {...fieldProps('time')}
                  value={values.time}
                  onChange={(e) => update('time', e.target.value)}
                  disabled={!values.date}
                  className="field-input disabled:cursor-not-allowed disabled:bg-creme-100"
                >
                  <option value="">{values.date ? (slots.length ? 'Selecione' : 'Sem horários') : 'Escolha a data antes'}</option>
                  {slots.map((slot) => (
                    <option key={slot} value={slot}>
                      {formatClock(slot)}
                    </option>
                  ))}
                </select>
                {errorText('time')}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={id('people')} className="field-label">
                  {reservation.labels.people}
                </label>
                <select
                  {...fieldProps('people')}
                  value={values.people}
                  onChange={(e) => update('people', e.target.value)}
                  className="field-input sm:max-w-[14rem]"
                >
                  {Array.from({ length: reservation.maxPeople }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'pessoa' : 'pessoas'}
                    </option>
                  ))}
                </select>
                {errorText('people')}
              </div>
            </div>

            <button type="submit" className="btn btn-whatsapp mt-8 w-full sm:w-auto">
              <IconChat className="size-5" />
              {reservation.submitLabel}
            </button>
            <p className="mt-3 text-sm text-castanho-600">{reservation.submitHelp}</p>

            <div role="status" className="empty:hidden">
              {sentUrl && (
                <div className="mt-6 flex gap-3 rounded-xl bg-manjericao-50 p-4 text-manjericao-800">
                  <IconCheck className="mt-0.5 size-5 shrink-0" strokeWidth={3} />
                  <p>
                    <strong>{reservation.success.title}</strong> {reservation.success.text}{' '}
                    <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">
                      {reservation.success.linkLabel}
                      <span className="sr-only"> (abre em nova aba)</span>
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
