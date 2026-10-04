import { takeaway, whatsappMessages } from '../../data/site';
import { formatPrice } from '../../lib/format';
import { whatsappUrl } from '../../lib/whatsapp';
import type { Photo, TakeawayProduct } from '../../types';
import { DietBadges } from '../ui/DietBadges';
import { IconBag, IconChat, IconExternal } from '../ui/Icons';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { Wave } from '../ui/Wave';

function PriceList({ title, items }: { title: string; items: TakeawayProduct[] }) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-2xl font-semibold">
        <IconBag className="size-6 text-terracota-700" />
        {title}
      </h3>
      <ul className="mt-4 divide-y divide-castanho-900/10 border-y border-castanho-900/10">
        {items.map((item) => (
          <li key={item.name} className="flex items-start justify-between gap-4 py-3.5">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-castanho-700">{item.description}</p>
              <DietBadges tags={item.tags} className="mt-1.5" />
            </div>
            <p className="shrink-0 text-right font-semibold whitespace-nowrap text-terracota-700">
              <span className="text-sm">R$</span> {formatPrice(item.price)}
              <span className="block text-xs font-normal text-castanho-600">
                {item.unit === 'kg' ? 'por quilo' : 'por pote'}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const photo: Photo = takeaway.photo;

export function Takeaway() {
  return (
    <section id="para-levar" aria-labelledby="levar-title" className="relative bg-creme-200">
      <Wave className="absolute inset-x-0 bottom-full text-creme-200" />
      <div className="container-page section">
        <SectionHeading id="levar-title" eyebrow={takeaway.eyebrow} title={takeaway.title} intro={takeaway.intro} />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <Picture
                image={photo.image}
                alt={photo.alt}
                position={photo.position}
                sizes="(min-width: 1024px) 38vw, 100vw"
                imgClassName="aspect-[4/3] w-full rounded-[2rem] object-cover"
              />
            </div>

            <div className="on-dark relative -mt-16 mr-4 ml-4 rounded-[1.75rem] bg-castanho-900 p-6 text-creme-50 sm:mr-10 sm:ml-10 sm:p-8">
              <h3 className="text-2xl font-semibold">{takeaway.deliveryTitle}</h3>
              <p className="mt-2 text-creme-200">{takeaway.deliveryText}</p>
              <a
                href={whatsappUrl(whatsappMessages.delivery)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp mt-5 w-full"
              >
                <IconChat className="size-5" />
                Pedir pelo WhatsApp
                <span className="sr-only">(abre em nova aba)</span>
              </a>
              <ul className="mt-3 grid gap-2">
                {takeaway.deliveryApps.map((app) => (
                  <li key={app.name}>
                    <a
                      href={app.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn min-h-11 w-full border-2 border-creme-50/30 px-4 text-sm text-creme-50 hover:bg-creme-50 hover:text-castanho-900"
                    >
                      {app.name}
                      <IconExternal className="size-4" />
                      <span className="sr-only">(abre em nova aba)</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-center text-xs text-creme-200">{takeaway.deliveryAppsNote}</p>
            </div>
          </Reveal>

          <Reveal className="grid content-start gap-10 md:grid-cols-2 lg:col-span-7 lg:gap-8">
            <PriceList title={takeaway.pastaTitle} items={takeaway.pasta} />
            <div>
              <PriceList title={takeaway.saucesTitle} items={takeaway.sauces} />
              <div className="mt-8 rounded-2xl border-2 border-dashed border-castanho-900/20 p-5">
                <p className="font-semibold">{takeaway.cookingTip.title}</p>
                <p className="mt-1 text-sm text-castanho-700">{takeaway.cookingTip.text}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      <Wave flip className="absolute inset-x-0 top-full text-creme-200" />
    </section>
  );
}
