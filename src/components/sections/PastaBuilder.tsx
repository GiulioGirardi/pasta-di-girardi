import { useId, useRef, useState } from 'react';
import { builder } from '../../data/site';
import { usePastaBuilder } from '../../hooks/usePastaBuilder';
import { MAX_QTY } from '../../lib/builder';
import { formatBRL, formatPrice } from '../../lib/format';
import { whatsappUrl } from '../../lib/whatsapp';
import type { BuilderOption } from '../../types';
import { DietBadges } from '../ui/DietBadges';
import { IconCheck, IconChat, IconMinus, IconPlus } from '../ui/Icons';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { Wave } from '../ui/Wave';

interface OptionCardProps {
  type: 'radio' | 'checkbox';
  name: string;
  option: BuilderOption;
  checked: boolean;
  disabled?: boolean;
  priceLabel: string;
  onChange: () => void;
}

function OptionCard({ type, name, option, checked, disabled, priceLabel, onChange }: OptionCardProps) {
  return (
    <label
      className={`relative flex h-full cursor-pointer flex-col rounded-2xl border-2 p-4 transition-colors has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-trigo-300 ${
        checked
          ? 'border-trigo-300 bg-castanho-700'
          : 'border-creme-50/15 bg-castanho-800 hover:border-creme-50/40'
      } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      <input
        type={type}
        name={name}
        value={option.id}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="sr-only"
      />
      <span className="flex items-start justify-between gap-3">
        <span className="font-semibold text-creme-50">{option.name}</span>
        <span
          aria-hidden="true"
          className={`grid size-6 shrink-0 place-items-center border-2 ${type === 'radio' ? 'rounded-full' : 'rounded-md'} ${
            checked ? 'border-trigo-300 bg-trigo-300 text-castanho-900' : 'border-creme-50/40'
          }`}
        >
          {checked && <IconCheck className="size-4" strokeWidth={3} />}
        </span>
      </span>
      {option.description && <span className="mt-1 text-sm text-creme-200">{option.description}</span>}
      <span className="mt-auto flex items-center justify-between gap-2 pt-3">
        <span className="text-sm font-semibold text-trigo-200">{priceLabel}</span>
        <DietBadges tags={option.tags} />
      </span>
    </label>
  );
}

export function PastaBuilder() {
  const baseId = useId();
  const [stepIndex, setStepIndex] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLHeadingElement>(null);
  const {
    massaId,
    molhoId,
    extraIds,
    qty,
    note,
    massa,
    molho,
    extras,
    extrasPrice,
    total,
    complete,
    tags,
    limitReached,
    touched,
    canOpen,
    selections,
    message,
    setMassaId,
    setMolhoId,
    toggleExtra,
    setQty,
    setNote,
    reset,
  } = usePastaBuilder();

  const goTo = (index: number) => {
    setStepIndex(index);
    // Leva o foco para o novo passo, para quem navega por teclado ou leitor de tela.
    requestAnimationFrame(() => panelRef.current?.querySelector<HTMLInputElement>('input:not(:disabled)')?.focus());
  };

  const restart = () => {
    reset();
    goTo(0);
  };

  const step = builder.steps[stepIndex];

  return (
    <section id="monte-sua-massa" aria-labelledby="builder-title" className="on-dark relative bg-castanho-900 text-creme-50">
      <div className="container-page section">
        <SectionHeading id="builder-title" eyebrow={builder.eyebrow} title={builder.title} intro={builder.intro} />

        <Reveal className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <ol className="grid grid-cols-3 gap-2" aria-label="Passos">
              {builder.steps.map((s, index) => {
                const current = index === stepIndex;
                const done = Boolean(selections[index]) && !current;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => goTo(index)}
                      disabled={!canOpen[index]}
                      aria-current={current ? 'step' : undefined}
                      className={`flex h-full w-full flex-col items-start gap-0.5 rounded-xl border-b-4 px-3 pt-2 pb-2.5 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-55 ${
                        current ? 'border-trigo-300 bg-castanho-800' : 'border-creme-50/15 enabled:hover:bg-castanho-800'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-trigo-200 uppercase">
                        {done ? <IconCheck className="size-3.5" strokeWidth={3} /> : `${index + 1}.`} {s.title}
                      </span>
                      <span className="line-clamp-1 text-sm text-creme-200">{selections[index] ?? s.hint}</span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div ref={panelRef} className="mt-6">
              <fieldset key={step.id} className="animate-fade-down">
                <legend className="font-serif text-2xl font-semibold [font-variation-settings:'SOFT'_100]">
                  {step.legend}
                </legend>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {step.options.map((option) => {
                    if (step.id === 'adicionais') {
                      const checked = extraIds.includes(option.id);
                      return (
                        <OptionCard
                          key={option.id}
                          type="checkbox"
                          name={`${baseId}-adicionais`}
                          option={option}
                          checked={checked}
                          disabled={!checked && limitReached}
                          priceLabel={`+ R$ ${formatPrice(option.price)}`}
                          onChange={() => toggleExtra(option.id)}
                        />
                      );
                    }
                    const isMassa = step.id === 'massa';
                    return (
                      <OptionCard
                        key={option.id}
                        type="radio"
                        name={`${baseId}-${step.id}`}
                        option={option}
                        checked={(isMassa ? massaId : molhoId) === option.id}
                        priceLabel={isMassa ? `R$ ${formatPrice(option.price)}` : option.price ? `+ R$ ${formatPrice(option.price)}` : 'Incluso'}
                        onChange={() => (isMassa ? setMassaId(option.id) : setMolhoId(option.id))}
                      />
                    );
                  })}
                </div>
                {step.id === 'adicionais' && (
                  <p className="mt-3 text-sm text-creme-200" aria-live="polite">
                    {limitReached ? `Você chegou ao limite de ${builder.maxExtras} adicionais.` : 'Os adicionais são opcionais.'}
                  </p>
                )}
              </fieldset>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {stepIndex > 0 && (
                <button
                  type="button"
                  onClick={() => goTo(stepIndex - 1)}
                  className="btn border-2 border-creme-50/40 text-creme-50 hover:bg-creme-50 hover:text-castanho-900"
                >
                  Voltar
                </button>
              )}
              {stepIndex < 2 ? (
                <button
                  type="button"
                  onClick={() => goTo(stepIndex + 1)}
                  disabled={!canOpen[stepIndex + 1]}
                  className="btn btn-primary disabled:cursor-not-allowed disabled:bg-castanho-700 disabled:text-creme-200"
                >
                  Próximo: {builder.steps[stepIndex + 1].title.toLowerCase()}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    summaryRef.current?.focus();
                    summaryRef.current?.scrollIntoView({ block: 'start' });
                  }}
                  className="btn btn-primary lg:hidden"
                >
                  Ver resumo
                </button>
              )}
            </div>
          </div>

          <aside aria-labelledby={`${baseId}-summary`} className="lg:col-span-5">
            <div className="on-light rounded-[1.75rem] bg-creme-50 p-6 text-castanho-900 sm:p-8 lg:sticky lg:top-24">
              <h3
                id={`${baseId}-summary`}
                ref={summaryRef}
                tabIndex={-1}
                className="text-2xl font-semibold"
              >
                Seu prato
              </h3>

              <dl className="mt-5 divide-y divide-castanho-900/10 border-y border-castanho-900/10">
                <SummaryRow label="Massa" value={massa?.name} price={massa ? `R$ ${formatPrice(massa.price)}` : undefined} />
                <SummaryRow
                  label="Molho"
                  value={molho?.name}
                  price={molho ? (molho.price ? `+ R$ ${formatPrice(molho.price)}` : 'Incluso') : undefined}
                />
                <SummaryRow
                  label="Adicionais"
                  value={extras.length ? extras.map((e) => e.name).join(', ') : complete ? 'Nenhum' : undefined}
                  price={extras.length ? `+ R$ ${formatPrice(extrasPrice)}` : undefined}
                />
              </dl>

              {complete && tags.length > 0 && (
                <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-castanho-700">
                  Este prato é <DietBadges tags={tags} full />
                </p>
              )}

              <div className="mt-6 flex items-center justify-between gap-4">
                <span id={`${baseId}-qty-label`} className="font-semibold">
                  Quantidade
                </span>
                <div role="group" aria-labelledby={`${baseId}-qty-label`} className="flex items-center gap-1 rounded-full border-2 border-castanho-900/15 p-1">
                  <button
                    type="button"
                    onClick={() => setQty(qty - 1)}
                    disabled={qty <= 1}
                    className="grid size-9 place-items-center rounded-full hover:bg-creme-200 disabled:opacity-40"
                  >
                    <IconMinus className="size-4" />
                    <span className="sr-only">Diminuir quantidade</span>
                  </button>
                  <output aria-live="polite" className="w-8 text-center font-semibold tabular-nums">
                    {qty}
                  </output>
                  <button
                    type="button"
                    onClick={() => setQty(qty + 1)}
                    disabled={qty >= MAX_QTY}
                    className="grid size-9 place-items-center rounded-full hover:bg-creme-200 disabled:opacity-40"
                  >
                    <IconPlus className="size-4" />
                    <span className="sr-only">Aumentar quantidade</span>
                  </button>
                </div>
              </div>

              <label htmlFor={`${baseId}-note`} className="mt-5 block text-sm font-semibold">
                Observações <span className="font-normal text-castanho-600">(opcional)</span>
              </label>
              <textarea
                id={`${baseId}-note`}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                maxLength={200}
                placeholder="Ex.: sem pimenta, ponto da massa mais firme"
                className="field-input mt-1.5 min-h-0 resize-none"
              />

              <div className="mt-6 flex items-end justify-between gap-4 border-t-2 border-dashed border-castanho-900/15 pt-5">
                <span className="font-semibold">Total</span>
                <p aria-live="polite" aria-atomic="true" className="font-serif text-4xl font-semibold text-terracota-700 tabular-nums">
                  <span className="sr-only">Total: </span>
                  {formatBRL(total)}
                </p>
              </div>

              {message ? (
                <a
                  href={whatsappUrl(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp mt-6 w-full"
                >
                  <IconChat className="size-5" />
                  Enviar pedido pelo WhatsApp
                  <span className="sr-only">(abre em nova aba)</span>
                </a>
              ) : (
                <>
                  <button
                    type="button"
                    disabled
                    aria-describedby={`${baseId}-hint`}
                    className="btn mt-6 w-full cursor-not-allowed bg-creme-200 text-castanho-600"
                  >
                    <IconChat className="size-5" />
                    Enviar pedido pelo WhatsApp
                  </button>
                  <p id={`${baseId}-hint`} className="mt-2 text-center text-sm text-castanho-600">
                    Escolha a massa e o molho para enviar.
                  </p>
                </>
              )}

              {touched && (
                <button
                  type="button"
                  onClick={restart}
                  className="mt-4 w-full text-center text-sm font-semibold text-castanho-700 underline underline-offset-4 hover:text-terracota-800"
                >
                  Recomeçar
                </button>
              )}
              <p className="mt-4 text-xs text-castanho-600">
                Valor estimado. A confirmação final e o tempo de preparo chegam pelo WhatsApp.
              </p>
            </div>
          </aside>
        </Reveal>
      </div>
      <Wave flip className="absolute inset-x-0 top-full text-castanho-900" />
    </section>
  );
}

function SummaryRow({ label, value, price }: { label: string; value?: string; price?: string }) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-x-4 py-3">
      <dt className="text-xs font-bold tracking-wider text-castanho-600 uppercase">{label}</dt>
      <dd className={`col-start-1 ${value ? 'font-semibold' : 'text-castanho-600'}`}>{value ?? 'A escolher'}</dd>
      {price && (
        <dd className="col-start-2 row-span-2 row-start-1 self-end text-sm font-semibold whitespace-nowrap text-castanho-700">
          {price}
        </dd>
      )}
    </div>
  );
}
