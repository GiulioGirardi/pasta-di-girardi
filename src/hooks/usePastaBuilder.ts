import { useState } from 'react';
import { builder } from '../data/site';
import { MAX_QTY, buildMessage, combinedTags, optionById, stepById } from '../lib/builder';
import type { BuilderOption } from '../types';

const massaStep = stepById('massa');
const molhoStep = stepById('molho');
const extrasStep = stepById('adicionais');

/** Estado e regras do "Monte sua massa": escolhas, preço, selos e mensagem do pedido. */
export function usePastaBuilder() {
  const [massaId, setMassaId] = useState<string | null>(null);
  const [molhoId, setMolhoId] = useState<string | null>(null);
  const [extraIds, setExtraIds] = useState<string[]>([]);
  const [qty, setQtyState] = useState(1);
  const [note, setNote] = useState('');

  const massa = optionById(massaStep, massaId);
  const molho = optionById(molhoStep, molhoId);
  const extras = extrasStep.options.filter((o) => extraIds.includes(o.id));
  const extrasPrice = extras.reduce((sum, e) => sum + e.price, 0);
  const unitPrice = (massa?.price ?? 0) + (molho?.price ?? 0) + extrasPrice;
  const total = unitPrice * qty;
  const complete = Boolean(massa && molho);
  const tags = combinedTags([massa, molho, ...extras].filter((o): o is BuilderOption => o !== null));
  const limitReached = extraIds.length >= builder.maxExtras;
  const touched = Boolean(massaId || molhoId || extraIds.length);

  /** Quais passos podem ser abertos, na ordem de builder.steps. */
  const canOpen = [true, Boolean(massa), complete];
  /** Resumo curto de cada passo, para a barra de passos. */
  const selections = [
    massa?.name,
    molho?.name,
    extras.length ? `${extras.length} escolhido${extras.length > 1 ? 's' : ''}` : undefined,
  ];

  const message = massa && molho ? buildMessage({ massa, molho, extras, qty, total, note }) : null;

  const toggleExtra = (id: string) =>
    setExtraIds((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]));

  const setQty = (value: number) => setQtyState(Math.min(MAX_QTY, Math.max(1, value)));

  const reset = () => {
    setMassaId(null);
    setMolhoId(null);
    setExtraIds([]);
    setQtyState(1);
    setNote('');
  };

  return {
    massaId,
    molhoId,
    extraIds,
    qty,
    note,
    massa,
    molho,
    extras,
    extrasPrice,
    unitPrice,
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
  };
}
