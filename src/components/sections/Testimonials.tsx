import { testimonials } from '../../data/site';
import { IconAlert } from '../ui/Icons';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { Wave } from '../ui/Wave';

export function Testimonials() {
  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-title"
      className="on-dark on-terracota relative bg-terracota-700 text-white"
    >
      <Wave className="absolute inset-x-0 bottom-full text-terracota-700" />
      <div className="container-page section">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="depoimentos-title" eyebrow={testimonials.eyebrow} title={testimonials.title} />
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-sm font-semibold">
              <IconAlert className="size-4 shrink-0" />
              {testimonials.disclaimer}
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.items.map((item, index) => (
            <li key={item.author}>
              <Reveal delay={index * 90} className="h-full">
                <figure className="flex h-full flex-col rounded-[1.75rem] bg-creme-50 p-7 text-castanho-900">
                  <span aria-hidden="true" className="font-serif text-6xl leading-none text-terracota-500">
                    “
                  </span>
                  <blockquote className="mt-1 flex-1">
                    <p className="text-lg">{item.quote}</p>
                  </blockquote>
                  <figcaption className="mt-6 border-t border-castanho-900/10 pt-4">
                    <span className="block font-semibold">{item.author}</span>
                    <span className="mt-0.5 inline-block rounded-full bg-trigo-200 px-2.5 py-0.5 text-xs font-bold tracking-wide text-castanho-900 uppercase">
                      {item.context}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
      <Wave flip className="absolute inset-x-0 top-full text-terracota-700" />
    </section>
  );
}
