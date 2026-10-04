import { describe, expect, it } from 'vitest';
import { business } from '../data/site';
import type { BuilderStep } from '../types';
import { buildMessage, combinedTags, optionById, stepById } from './builder';

const massa = stepById('massa');
const molho = stepById('molho');
const extras = stepById('adicionais');
const pick = (step: BuilderStep, id: string) => {
  const option = optionById(step, id);
  if (!option) throw new Error(`Opção inexistente: ${id}`);
  return option;
};

describe('stepById', () => {
  it('encontra os três passos com seus títulos', () => {
    expect([massa, molho, extras].map((s) => s.legend)).toEqual(['Escolha a massa', 'Escolha o molho', 'Adicionais (até 4)']);
  });

  it('lança erro se o passo não existir', () => {
    expect(() => stepById('sobremesa' as BuilderStep['id'])).toThrow();
  });
});

describe('combinedTags', () => {
  it('vegano + sem glúten quando todos os componentes são', () => {
    expect(combinedTags([pick(massa, 'sem-gluten'), pick(molho, 'pomodoro'), pick(extras, 'rucula')])).toEqual([
      'vegano',
      'sem-gluten',
    ]);
  });

  it('vegano conta como vegetariano ao combinar', () => {
    expect(combinedTags([pick(massa, 'espaguete'), pick(molho, 'pesto')])).toEqual(['vegetariano']);
  });

  it('um componente com carne derruba os selos de dieta', () => {
    expect(combinedTags([pick(massa, 'sem-gluten'), pick(molho, 'pomodoro'), pick(extras, 'bacon')])).toEqual(['sem-gluten']);
    expect(combinedTags([pick(massa, 'talharim'), pick(molho, 'bolonhesa')])).toEqual([]);
  });

  it('sem componentes, sem selos', () => {
    expect(combinedTags([])).toEqual([]);
  });
});

describe('buildMessage', () => {
  it('monta o pedido com quantidade, adicionais, total e observação', () => {
    const order = {
      massa: pick(massa, 'talharim'),
      molho: pick(molho, 'quatro-queijos'),
      extras: [pick(extras, 'burrata')],
      qty: 2,
      total: (40 + 10 + 18) * 2,
      note: '  sem pimenta ',
    };
    expect(buildMessage(order)).toBe(
      [
        `Olá, ${business.name}! Quero fazer um pedido montado pelo site:`,
        '',
        '2× Talharim com molho quatro queijos',
        'Adicionais: burrata',
        '',
        'Total estimado: R$ 136,00',
        'Observações: sem pimenta',
        '',
        'Pode me confirmar o tempo de preparo?',
      ].join('\n'),
    );
  });

  it('omite adicionais e observação vazios', () => {
    const message = buildMessage({ massa: pick(massa, 'nhoque'), molho: pick(molho, 'pomodoro'), extras: [], qty: 1, total: 42, note: ' ' });
    expect(message).not.toContain('Adicionais');
    expect(message).not.toContain('Observações');
  });
});
