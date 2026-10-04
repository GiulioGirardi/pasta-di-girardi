/**
 * Geração de SEO a partir de src/data/site.ts. Roda no Node (vite.config.ts),
 * por isso não usa nada do navegador.
 */
import { business, hours, menu, seo } from '../data/site.ts';
import type { MenuCategory } from '../types.ts';

const DAY_URIS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(
  (d) => `https://schema.org/${d}`,
);

const absolute = (path: string) => new URL(path, business.url).href;

export function restaurantJsonLd() {
  const categories: MenuCategory[] = menu.categories;
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${business.url}/#restaurante`,
    name: business.name,
    description: seo.description,
    url: business.url,
    image: absolute(seo.ogImage),
    logo: absolute('/favicon.svg'),
    telephone: business.phone.e164,
    email: business.email,
    priceRange: business.priceRange,
    servesCuisine: ['Italiana', 'Massas artesanais'],
    acceptsReservations: true,
    currenciesAccepted: 'BRL',
    paymentAccepted: 'Pix, cartão de crédito, cartão de débito, vale-refeição',
    foundingDate: String(business.foundedYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.city,
      addressRegion: business.state,
      postalCode: business.address.postalCode,
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.address.lat,
      longitude: business.address.lng,
    },
    openingHoursSpecification: hours.flatMap((day) =>
      day.ranges.map((range) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: DAY_URIS[day.day],
        opens: range.open,
        closes: range.close,
      })),
    ),
    hasMenu: {
      '@type': 'Menu',
      url: absolute('/#cardapio'),
      inLanguage: 'pt-BR',
      hasMenuSection: categories.map((category) => ({
        '@type': 'MenuSection',
        name: category.label,
        hasMenuItem: category.items.map((item) => ({
          '@type': 'MenuItem',
          name: item.name,
          description: item.description,
          offers: { '@type': 'Offer', price: item.price.toFixed(2), priceCurrency: 'BRL' },
          ...(item.tags?.length
            ? {
                suitableForDiet: item.tags.map(
                  (tag) =>
                    ({
                      vegetariano: 'https://schema.org/VegetarianDiet',
                      vegano: 'https://schema.org/VeganDiet',
                      'sem-gluten': 'https://schema.org/GlutenFreeDiet',
                    })[tag],
                ),
              }
            : {}),
        })),
      })),
    },
  };
}

const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Tags do <head>: title, description, canonical, Open Graph, Twitter e JSON-LD. */
export function headTags(): string {
  const ogImage = absolute(seo.ogImage);
  const json = JSON.stringify(restaurantJsonLd()).replace(/</g, '\\u003c');
  return [
    `<title>${escapeAttr(seo.title)}</title>`,
    `<meta name="description" content="${escapeAttr(seo.description)}" />`,
    `<link rel="canonical" href="${business.url}/" />`,
    `<meta name="theme-color" content="${seo.themeColor}" />`,
    `<meta property="og:type" content="restaurant" />`,
    `<meta property="og:site_name" content="${escapeAttr(business.name)}" />`,
    `<meta property="og:locale" content="${seo.locale}" />`,
    `<meta property="og:title" content="${escapeAttr(seo.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(seo.description)}" />`,
    `<meta property="og:url" content="${business.url}/" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeAttr(seo.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(seo.description)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    `<script type="application/ld+json">${json}</script>`,
  ].join('\n    ');
}

export function robotsTxt(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${business.url}/sitemap.xml\n`;
}

export function sitemapXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${business.url}/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>
</urlset>
`;
}
