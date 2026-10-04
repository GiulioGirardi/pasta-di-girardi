import { describe, expect, it } from 'vitest';
import { formatBRL, formatLongDate, formatPrice, maskPhone } from './format';

/** Simula a digitação: cada tecla chega ao onChange com o valor já mascarado + o novo caractere. */
const type = (keys: string) => [...keys].reduce((value, key) => maskPhone(value + key), '');

describe('maskPhone', () => {
  it('mascara enquanto a pessoa digita', () => {
    expect(maskPhone('5')).toBe('(5');
    expect(maskPhone('51')).toBe('(51');
    expect(maskPhone('519')).toBe('(51) 9');
    expect(maskPhone('5133334444')).toBe('(51) 3333-4444');
    expect(type('51999998888')).toBe('(51) 99999-8888');
  });

  it('corta no 11º dígito', () => {
    expect(maskPhone('(51) 99999-88887')).toBe('(51) 99999-8888');
  });

  it('remove o DDI de um número colado', () => {
    expect(maskPhone('+55 51 99999-8888')).toBe('(51) 99999-8888');
    expect(maskPhone('+55 (51) 3333-4444')).toBe('(51) 3333-4444');
    expect(maskPhone('5551999998888')).toBe('(51) 99999-8888');
  });

  it('mantém o DDD 55 digitado normalmente', () => {
    expect(type('55999998888')).toBe('(55) 99999-8888');
    // Uma tecla a mais com o campo cheio não pode ser confundida com DDI.
    expect(maskPhone('(55) 99999-88881')).toBe('(55) 99999-8888');
    expect(maskPhone('55999998888')).toBe('(55) 99999-8888');
  });
});

describe('preços e datas', () => {
  it('formatPrice usa vírgula só quando há centavos', () => {
    expect(formatPrice(72)).toBe('72');
    expect(formatPrice(7.5)).toBe('7,50');
  });

  it('formatBRL não quebra linha entre R$ e o valor', () => {
    expect(formatBRL(136)).toBe('R$ 136,00');
  });

  it('formatLongDate não depende do fuso', () => {
    expect(formatLongDate('2026-10-02')).toBe('sexta-feira, 2 de outubro');
  });
});
