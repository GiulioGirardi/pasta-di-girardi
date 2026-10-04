import { builder, whatsappMessages } from '../data/site';
import type { BuilderOption, BuilderStep, DietTag } from '../types';
import { formatBRL } from './format';

export const MAX_QTY = 10;

export function stepById(id: BuilderStep['id']): BuilderStep {
  const step = builder.steps.find((s) => s.id === id);
  if (!step) throw new Error(`Passo do montador não encontrado: ${id}`);
  return step;
}

export function optionById(step: BuilderStep, id: string | null): BuilderOption | null {
  return step.options.find((o) => o.id === id) ?? null;
}

/** Selos que valem para o prato inteiro: só os que todos os componentes têm (vegano implica vegetariano). */
export function combinedTags(options: BuilderOption[]): DietTag[] {
  const normalize = (tags: DietTag[] = []) => new Set<DietTag>(tags.includes('vegano') ? [...tags, 'vegetariano'] : tags);
  const [first, ...rest] = options.map((o) => normalize(o.tags));
  if (!first) return [];
  const common = [...first].filter((tag) => rest.every((set) => set.has(tag)));
  return common.includes('vegano') ? common.filter((t) => t !== 'vegetariano') : common;
}

export interface Order {
  massa: BuilderOption;
  molho: BuilderOption;
  extras: BuilderOption[];
  qty: number;
  total: number;
  note: string;
}

export function buildMessage({ massa, molho, extras, qty, total, note }: Order): string {
  const t = whatsappMessages.order;
  const lines = [t.intro, '', `${qty}× ${massa.name} com molho ${molho.name.toLowerCase()}`];
  if (extras.length) lines.push(`${t.extras}: ${extras.map((e) => e.name.toLowerCase()).join(', ')}`);
  lines.push('', `${t.total}: ${formatBRL(total)}`);
  if (note.trim()) lines.push(`${t.note}: ${note.trim()}`);
  lines.push('', t.closing);
  return lines.join('\n');
}
