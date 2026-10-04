import { hero } from '../../data/site';
import type { Photo } from '../../types';
import { BrandMark } from '../ui/BrandMark';
import { IconArrowRight } from '../ui/Icons';
import { Picture } from '../ui/Picture';

const photo: Photo = hero.photo;

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden pt-18">
      {/* No celular: texto → chamadas → foto → números. No desktop, os números voltam para baixo do texto. */}
      <div className="container-page relative grid items-center gap-10 pt-10 pb-16 sm:pt-14 lg:min-h-[min(calc(100svh-4.5rem),820px)] lg:grid-cols-2 lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-16 lg:gap-y-0 lg:py-20">
        <div className="relative z-10 max-w-xl lg:col-start-1 lg:row-start-2">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title" className="heading-xl mt-4">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-lg text-lg text-castanho-700 sm:text-xl">{hero.subtitle}</p>

          <div className="mt-8 flex flex-col gap-3 min-[400px]:flex-row">
            <a href={hero.primaryCta.href} className="btn btn-primary group">
              {hero.primaryCta.label}
              <IconArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href={hero.secondaryCta.href} className="btn btn-secondary">
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>

        <div className="relative lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:h-full">
          <BrandMark className="pointer-events-none absolute -top-9 -left-2 z-10 size-20 sm:-left-6 sm:size-28 lg:-top-6 lg:-left-12" />
          <div className="relative -mr-4 overflow-hidden rounded-l-[2.5rem] rounded-tr-[2.5rem] sm:-mr-6 sm:rounded-r-none lg:absolute lg:inset-y-0 lg:left-0 lg:-mr-0 lg:w-[calc(50vw-1rem)] lg:rounded-tr-none">
            <Picture
              image={photo.image}
              alt={photo.alt}
              position={photo.position}
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              className="block h-full"
              imgClassName="aspect-[5/4] h-full w-full object-cover sm:aspect-[16/11] lg:aspect-auto"
            />
          </div>
          <div className="absolute -bottom-6 left-4 z-10 max-w-[16rem] rounded-2xl bg-creme-50 p-4 shadow-[0_14px_40px_-12px_rgb(43_29_20/0.45)] sm:left-8 lg:bottom-10 lg:-left-10">
            <p className="text-xs font-bold tracking-[0.14em] text-manjericao-700 uppercase">{hero.todayCard.label}</p>
            <p className="mt-1 font-serif text-lg leading-snug font-semibold [font-variation-settings:'SOFT'_100]">
              {hero.todayCard.text}
            </p>
          </div>
        </div>

        <dl className="relative z-10 mt-8 grid max-w-md grid-cols-3 gap-4 border-t-2 border-castanho-900/10 pt-6 lg:col-start-1 lg:row-start-3 lg:mt-12">
          {hero.facts.map((fact) => (
            <div key={fact.label} className="flex flex-col-reverse justify-end gap-1">
              <dt className="text-sm leading-snug text-castanho-600">{fact.label}</dt>
              <dd className="font-serif text-3xl font-semibold text-terracota-700 [font-variation-settings:'SOFT'_100]">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
