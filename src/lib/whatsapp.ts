import { business } from '../data/site';

/** Link wa.me com a mensagem já preenchida. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${business.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
