import { madeInHouse } from '../../data/site';
import type { Photo } from '../../types';
import { BrandMark } from '../ui/BrandMark';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';

export function MadeInHouse() {
  const [main, second, third]: Photo[] = madeInHouse.photos;
  const { chef } = madeInHouse;
  const initials = chef.name
    .split(' ')
    .map((part) => part[0])
    .join('');

  return (
    <section id="feita-na-casa" aria-labelledby="casa-title" className="section relative overflow-hidden">
      <div className="container-page grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="relative grid grid-cols-6 gap-3 sm:gap-4 lg:sticky lg:top-28 lg:col-span-6">
          <Picture
            image={main.image}
            alt={main.alt}
            position={main.position}
            sizes="(min-width: 1024px) 34vw, 66vw"
            className="col-span-4 row-span-2"
            imgClassName="aspect-[4/5] h-full w-full rounded-[2rem] rounded-br-md object-cover"
          />
          <Picture
            image={second.image}
            alt={second.alt}
            position={second.position}
            sizes="(min-width: 1024px) 16vw, 33vw"
            className="col-span-2"
            imgClassName="aspect-[3/4] h-full w-full rounded-[1.5rem] rounded-bl-md object-cover"
          />
          <Picture
            image={third.image}
            alt={third.alt}
            position={third.position}
            sizes="(min-width: 1024px) 16vw, 33vw"
            className="col-span-2"
            imgClassName="aspect-[3/4] h-full w-full rounded-[1.5rem] rounded-tl-md object-cover"
          />
          <BrandMark className="absolute -right-3 -bottom-8 size-20 sm:size-24" />
        </Reveal>

        <div className="lg:col-span-6 lg:pt-6">
          <Reveal>
            <p className="eyebrow">{madeInHouse.eyebrow}</p>
            <h2 id="casa-title" className="heading-lg mt-3">
              {madeInHouse.title}
            </h2>
            <div className="mt-6 space-y-4 text-lg text-castanho-700">
              {madeInHouse.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <figure className="mt-10 rounded-[1.75rem] bg-creme-200 p-6 sm:p-8">
              <blockquote>
                <p className="font-serif text-2xl leading-snug font-medium italic [font-variation-settings:'SOFT'_100]">
                  “{chef.quote}”
                </p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="grid size-14 shrink-0 place-items-center rounded-full bg-terracota-600 font-serif text-xl font-semibold text-white"
                >
                  {initials}
                </span>
                <span>
                  <span className="block font-semibold">{chef.name}</span>
                  <span className="block text-sm text-castanho-600">{chef.role}</span>
                </span>
              </figcaption>
              <p className="mt-5 text-castanho-700">{chef.bio}</p>
            </figure>
          </Reveal>
        </div>
      </div>

      <div className="container-page mt-16 lg:mt-20">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {madeInHouse.steps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 90} className="h-full rounded-[1.5rem] border-2 border-castanho-900/10 p-6">
                <span aria-hidden="true" className="font-serif text-5xl font-semibold text-terracota-500 [font-variation-settings:'SOFT'_100]">
                  {index + 1}
                </span>
                <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-castanho-700">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
