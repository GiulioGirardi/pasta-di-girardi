import { menu } from '../../data/site';
import type { MenuCategory } from '../../types';
import { formatPrice } from '../../lib/format';
import { DietBadges, DietLegend } from '../ui/DietBadges';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { Tabs } from '../ui/Tabs';
import { Wave } from '../ui/Wave';

function CategoryPanel({ category }: { category: MenuCategory }) {
  return (
    <div className="rounded-[2rem] bg-creme-50 p-2 shadow-[0_20px_50px_-30px_rgb(43_29_20/0.5)]">
      <div className="rounded-[1.6rem] border-2 border-castanho-900/10 px-5 py-8 sm:px-10 sm:py-10">
        {category.intro && <p className="max-w-2xl text-castanho-700 italic">{category.intro}</p>}
        <ul className={`grid gap-x-14 md:grid-cols-2 ${category.intro ? 'mt-6' : ''}`}>
          {category.items.map((item) => (
            <li key={item.name} className="border-b border-castanho-900/10 py-5 last:border-0 md:[&:nth-last-child(2):nth-child(odd)]:border-0">
              <div className="flex items-baseline gap-3">
                <h3 className="text-xl leading-snug font-semibold">{item.name}</h3>
                <span aria-hidden="true" className="min-w-6 flex-1 -translate-y-1 border-b-2 border-dotted border-castanho-900/25" />
                <p className="shrink-0 font-semibold whitespace-nowrap text-terracota-700">
                  <span className="text-sm">R$</span> {formatPrice(item.price)}
                </p>
              </div>
              <p className="mt-1.5 text-castanho-700">{item.description}</p>
              <DietBadges tags={item.tags} className="mt-2.5" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Menu() {
  return (
    <section id="cardapio" aria-labelledby="cardapio-title" className="relative bg-creme-200">
      <Wave className="absolute inset-x-0 bottom-full text-creme-200" />
      <div className="container-page section">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="cardapio-title" eyebrow={menu.eyebrow} title={menu.title} intro={menu.intro} />
          <Reveal>
            <DietLegend className="lg:justify-end" />
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <Tabs
            label="Categorias do cardápio"
            tabs={menu.categories.map((category) => ({
              id: category.id,
              label: category.label,
              panel: <CategoryPanel category={category} />,
            }))}
          />
        </Reveal>

        <p className="mt-6 max-w-3xl text-sm text-castanho-700">{menu.note}</p>
      </div>
      <Wave flip className="absolute inset-x-0 top-full text-creme-200" />
    </section>
  );
}
