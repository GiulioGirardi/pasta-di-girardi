import { business, footer, hours, imageCredits, nav } from '../../data/site';
import { useNow } from '../../hooks/useNow';
import { formatRanges, zonedParts } from '../../lib/hours';
import { whatsappUrl } from '../../lib/whatsapp';
import { BrandMark } from '../ui/BrandMark';
import { IconChat, IconExternal, IconMapPin, IconPhone } from '../ui/Icons';
import { OpenStatus } from '../ui/OpenStatus';
import { Wave } from '../ui/Wave';

const { lat, lng } = business.address;
const bbox = [lng - 0.008, lat - 0.005, lng + 0.008, lat + 0.005].map((n) => n.toFixed(4)).join('%2C');
const mapEmbed = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
const mapLink = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=17/${lat}/${lng}`;

function HoursTable() {
  const now = useNow();
  const today = now ? zonedParts(now, business.timeZone).weekday : null;
  return (
    <table className="w-full text-left">
      <caption className="sr-only">Horário de funcionamento por dia da semana</caption>
      <tbody>
        {hours.map((day) => {
          const isToday = day.day === today;
          return (
            <tr
              key={day.day}
              className={`border-b border-creme-50/10 last:border-0 ${isToday ? 'text-trigo-300' : ''}`}
              aria-current={isToday ? 'date' : undefined}
            >
              <th scope="row" className="py-2 pr-4 font-semibold whitespace-nowrap">
                {day.label}
                {isToday && <span className="ml-2 text-xs tracking-wider uppercase">hoje</span>}
              </th>
              <td className={`py-2 text-right ${day.ranges.length ? '' : 'text-creme-200/70'}`}>{formatRanges(day)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function Footer() {
  const { address } = business;
  return (
    <footer id="contato" className="on-dark relative bg-castanho-900 text-creme-100">
      <Wave className="absolute inset-x-0 bottom-full text-castanho-900" />
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:pt-20">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <BrandMark className="size-11" />
            <p className="font-serif text-2xl font-semibold [font-variation-settings:'SOFT'_100]">{business.name}</p>
          </div>
          <p className="mt-4 max-w-sm text-creme-200">{footer.about}</p>

          <address className="mt-8 space-y-3 not-italic">
            <p className="flex gap-3">
              <IconMapPin className="mt-1 size-5 shrink-0 text-trigo-300" />
              <span>
                {address.street} – {address.district}
                <br />
                {business.city} – {business.state}, CEP {address.postalCode}
              </span>
            </p>
            <p className="flex gap-3">
              <IconPhone className="mt-1 size-5 shrink-0 text-trigo-300" />
              <a href={`tel:${business.phone.e164}`} className="underline-offset-4 hover:underline">
                {business.phone.display}
              </a>
            </p>
            <p className="flex gap-3">
              <IconChat className="mt-1 size-5 shrink-0 text-trigo-300" />
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                WhatsApp {business.whatsapp.display}
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </p>
          </address>
        </div>

        <div className="lg:col-span-4">
          <h2 className="font-serif text-2xl font-semibold">Horários</h2>
          <OpenStatus variant="inline" className="mt-3 text-trigo-200" />
          <div className="mt-5">
            <HoursTable />
          </div>
          <p className="mt-4 text-sm text-creme-200">{footer.hoursNote}</p>
        </div>

        <div className="lg:col-span-4">
          <h2 className="font-serif text-2xl font-semibold">Como chegar</h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-creme-50/15 bg-castanho-800">
            <iframe
              title={`Mapa com a localização ilustrativa da ${business.name}`}
              src={mapEmbed}
              loading="lazy"
              className="block aspect-[4/3] w-full grayscale-[35%] sepia-[20%]"
            />
          </div>
          <p className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-creme-200">
            <span>{footer.mapNote}</span>
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-trigo-200 underline underline-offset-4"
            >
              Abrir mapa ampliado
              <IconExternal className="size-4" />
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-creme-50/10">
        <div className="container-page flex flex-col gap-6 py-8 pb-28 text-sm text-creme-200 sm:pb-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl space-y-2">
            <p>
              © {business.name}. {footer.demoNotice}
            </p>
            <details className="group">
              <summary className="cursor-pointer font-semibold text-trigo-200 underline underline-offset-4">
                Créditos das fotos
              </summary>
              <ul className="mt-3 space-y-1.5">
                {imageCredits.map((credit) => (
                  <li key={credit.image}>
                    <a href={credit.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                      “{credit.title}”
                    </a>
                    , {credit.author},{' '}
                    {credit.licenseUrl ? (
                      <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                        {credit.license}
                      </a>
                    ) : (
                      credit.license
                    )}
                    . Via {credit.provider}, redimensionada.
                  </li>
                ))}
              </ul>
            </details>
          </div>
          <nav aria-label="Rodapé">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {nav.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="underline-offset-4 hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#inicio" className="underline-offset-4 hover:underline">
                  Voltar ao topo
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
