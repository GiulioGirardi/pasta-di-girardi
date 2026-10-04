import { faq, whatsappMessages } from '../../data/site';
import { whatsappUrl } from '../../lib/whatsapp';
import { Accordion } from '../ui/Accordion';
import { IconChat } from '../ui/Icons';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function Faq() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-title" className="section pt-24 pb-32 sm:pt-28 sm:pb-36">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading id="duvidas-title" eyebrow={faq.eyebrow} title={faq.title} />
          <Reveal className="mt-6">
            <p className="text-castanho-700">{faq.cta.text}</p>
            <a
              href={whatsappUrl(whatsappMessages.question)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 font-semibold text-terracota-700 underline underline-offset-4 hover:text-terracota-800"
            >
              <IconChat className="size-5" />
              {faq.cta.label}
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-8">
          <Accordion items={faq.items} />
        </Reveal>
      </div>
    </section>
  );
}
