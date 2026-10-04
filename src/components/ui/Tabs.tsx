import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

export interface TabItem {
  id: string;
  label: string;
  panel: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  /** Rótulo acessível da lista de abas. */
  label: string;
}

/** Abas no padrão WAI-ARIA: setas, Home e End trocam de aba; Tab leva ao painel. */
export function Tabs({ tabs, label }: TabsProps) {
  const baseId = useId();
  const [active, setActive] = useState(tabs[0]?.id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    const i = (index + tabs.length) % tabs.length;
    setActive(tabs[i].id);
    const el = tabRefs.current[i];
    el?.focus();
    el?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const targets: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    if (!(event.key in targets)) return;
    event.preventDefault();
    select(targets[event.key]);
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {tabs.map((tab, index) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(e) => onKeyDown(e, index)}
              className={`min-h-11 shrink-0 rounded-full border-2 px-4 py-2 font-semibold whitespace-nowrap transition-colors ${
                selected
                  ? 'border-castanho-900 bg-castanho-900 text-creme-50'
                  : 'border-castanho-900/20 bg-creme-50 text-castanho-800 hover:border-castanho-900/60'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          // Painel focável, como recomenda o padrão WAI-ARIA de abas.
          tabIndex={0}
          hidden={tab.id !== active}
          className="mt-8 animate-fade-down rounded-sm"
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}
