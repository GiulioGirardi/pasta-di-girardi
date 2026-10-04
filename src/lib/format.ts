const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export function formatBRL(value: number): string {
  // Intl usa espaço não separável entre "R$" e o número; mantém-se assim para não quebrar linha.
  return brl.format(value);
}

/** Preço curto para listas: 72 → "72", 7.5 → "7,50". */
export function formatPrice(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace('.', ',');
}

/** "2026-10-02" → "sexta-feira, 2 de outubro" */
export function formatLongDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

/**
 * Máscara de telefone brasileiro: (51) 99999-9999 ou (51) 3333-3333.
 * Um número colado com DDI ("+55 51 …", "5551…") perde o 55 antes do corte. O texto
 * já mascarado começa com "(", então quem digita um DDD 55 não cai nessa regra.
 */
export function maskPhone(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  if (digits.length >= 12 && /^\s*\+?\s*55/.test(raw)) digits = digits.slice(2);
  digits = digits.slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);
  if (rest.length <= 4) return `(${ddd}) ${rest}`;
  const split = rest.length === 9 ? 5 : 4;
  return `(${ddd}) ${rest.slice(0, split)}-${rest.slice(split)}`;
}
