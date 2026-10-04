import { highlights } from '../../data/site';
import { formatPrice } from '../../lib/format';
import type { Highlight } from '../../types';
import { DietBadges } from '../ui/DietBadges';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function Highlights() {
  return (
    <section id="destaques" aria-labelledby="destaques-title" className="pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-16 lg:pb-28">
      <div className="container-page">
        <SectionHeading
          id="destaques-title"
          eyebrow={highlights.eyebrow}
          title={highlights.title}
          intro={highlights.intro}
        />

        <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.items.map((item: Highlight, index) => (
            <li key={item.name}>
              <Reveal delay={index * 90} className={`h-full ${index % 2 === 1 ? 'lg:mt-12' : ''}`}>
                <article className="group flex h-full flex-col">
                  <div className="relative overflow-hidden rounded-[1.75rem] bg-creme-200">
                    <Picture
                      image={item.image}
                      alt={item.alt}
                      position={item.position}
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw"
                      imgClassName="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute top-4 left-4 grid size-10 place-items-center rounded-full bg-creme-50/95 font-serif text-sm font-semibold text-terracota-700"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <h3 className="text-2xl leading-tight font-semibold">{item.name}</h3>
                    <p className="shrink-0 pt-1 font-semibold text-terracota-700">
                      <span className="text-sm">R$</span> {formatPrice(item.price)}
                    </p>
                  </div>
                  <p className="mt-2 text-castanho-700">{item.description}</p>
                  <DietBadges tags={item.tags} full className="mt-3" />
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
