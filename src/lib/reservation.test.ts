import { describe, expect, it } from 'vitest';
import { business } from '../data/site';
import { buildMessage, slotsFor, validate, type Today, type Values } from './reservation';

// Terça, 6 de outubro de 2026, meio-dia em Porto Alegre.
const today: Today = { isoDate: '2026-10-06', minutes: 12 * 60 };
const valid: Values = { name: 'Ana', phone: '(51) 99999-8888', date: '2026-10-07', time: '19:00', people: '2' };

describe('validate', () => {
  it('aceita uma reserva completa', () => {
    expect(validate(valid, today)).toEqual({});
  });

  it('recusa data passada', () => {
    expect(validate({ ...valid, date: '2026-10-05' }, today).date).toBe('A data já passou.');
  });

  it('recusa dia em que a casa não abre', () => {
    expect(validate({ ...valid, date: '2026-10-12' }, today).date).toBe('Não abrimos às segundas. Escolha outra data.');
  });

  it('recusa data além do limite', () => {
    expect(validate({ ...valid, date: '2026-12-06' }, today).date).toBe('Aceitamos reservas para até 60 dias.');
  });

  it('recusa horário fora dos turnos', () => {
    expect(validate({ ...valid, time: '14:30' }, today).time).toBe('Horário indisponível. Escolha outro.');
  });

  it('para hoje, exige 30 minutos de antecedência', () => {
    expect(validate({ ...valid, date: today.isoDate, time: '12:30' }, today).time).toBe('Horário indisponível. Escolha outro.');
    expect(validate({ ...valid, date: today.isoDate, time: '13:00' }, today)).toEqual({});
    expect(slotsFor(today.isoDate, today)[0]).toBe('13:00');
  });

  it('valida nome, telefone e pessoas', () => {
    const errors = validate({ ...valid, name: ' ', phone: '(01) 9999', people: '13' }, today);
    expect(Object.keys(errors).sort()).toEqual(['name', 'people', 'phone']);
  });
});

describe('buildMessage', () => {
  it('monta a mensagem com o nome da casa e a data por extenso', () => {
    const message = buildMessage(valid);
    expect(message).toContain(`Olá, ${business.name}!`);
    expect(message).toContain('Data: quarta-feira, 7 de outubro');
    expect(message).toContain('Horário: 19h');
    expect(message).toContain('Pessoas: 2');
  });
});
