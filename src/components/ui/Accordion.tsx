import { useId, useState } from 'react';
import { IconChevronDown } from './Icons';

interface AccordionItem {
  question: string;
  answer: string;
}

/** Acordeão com botões de cabeçalho; cada item abre e fecha de forma independente. */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(() => new Set());

  const toggle = (index: number) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <div className="divide-y-2 divide-castanho-900/10 border-y-2 border-castanho-900/10">
      {items.map((item, index) => {
        const isOpen = open.has(index);
        const buttonId = `${baseId}-q-${index}`;
        const panelId = `${baseId}-a-${index}`;
        return (
          <div key={item.question}>
            <h3 className="font-sans text-lg font-semibold">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left hover:text-terracota-800"
              >
                {item.question}
                <span
                  aria-hidden="true"
                  className={`grid size-9 shrink-0 place-items-center rounded-full border-2 transition duration-300 ${
                    isOpen
                      ? 'rotate-180 border-castanho-900 bg-castanho-900 text-creme-50'
                      : 'border-castanho-900/15 group-hover:border-terracota-800/40'
                  }`}
                >
                  <IconChevronDown className="size-5" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="animate-fade-down pr-4 pb-6 text-castanho-700 sm:pr-14"
            >
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
