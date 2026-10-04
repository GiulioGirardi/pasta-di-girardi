import { useEffect, useState } from 'react';
import { whatsappMessages } from '../../data/site';
import { whatsappUrl } from '../../lib/whatsapp';
import { IconChat } from '../ui/Icons';

/** Seções que já têm um botão de WhatsApp: com uma delas na tela, o botão flutuante sai de cena. */
const SECTIONS_WITH_CTA = ['reserva', 'contato'];

export function WhatsAppFab() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setHidden(visible.size > 0);
    });
    for (const id of SECTIONS_WITH_CTA) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={whatsappUrl(whatsappMessages.general)}
      target="_blank"
      rel="noopener noreferrer"
      inert={hidden}
      className={`group fixed right-4 bottom-4 z-30 flex h-14 items-center gap-2 rounded-full bg-manjericao-700 pr-4 pl-4 text-white shadow-[0_10px_30px_-8px_rgb(43_29_20/0.55)] transition-[background-color,opacity,translate] duration-300 hover:bg-manjericao-800 motion-reduce:transition-none sm:right-6 sm:bottom-6 sm:pr-5 ${
        hidden ? 'pointer-events-none translate-y-3 opacity-0' : ''
      }`}
    >
      <IconChat className="size-7" />
      <span className="hidden font-semibold sm:inline">WhatsApp</span>
      <span className="sr-only sm:hidden">Conversar pelo WhatsApp</span>
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  );
}
