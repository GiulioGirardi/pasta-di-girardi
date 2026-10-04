// Gera favicon, ícones PNG e a imagem de compartilhamento (Open Graph) em public/.
// Rode com `npm run assets` sempre que trocar a foto do hero ou a marca.
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('..', import.meta.url));
const pub = `${root}public`;
await mkdir(pub, { recursive: true });

const COLORS = {
  creme: '#FBF5EA',
  trigo: '#E8B64C',
  trigoClaro: '#EFCB73',
  castanho: '#2B1D14',
  terracota: '#B5532F',
};

// Ninho de talharim: mesma geometria de src/components/ui/BrandMark.tsx.
const RIBBON =
  'M25.7 25.7C25.41 26.3 24.8 26.85 24 27.07C23.2 27.3 22.2 27.18 21.35 26.65C20.5 26.11 19.81 25.16 19.58 24C19.36 22.84 19.62 21.5 20.4 20.4C21.18 19.3 22.49 18.46 24 18.24C25.51 18.01 27.2 18.42 28.55 19.45C29.9 20.48 30.88 22.14 31.11 24C31.33 25.86 30.78 27.9 29.5 29.5C28.22 31.1 26.21 32.23 24 32.45C21.79 32.68 19.39 31.99 17.55 30.45C15.7 28.92 14.42 26.57 14.2 24C13.98 21.43 14.81 18.69 16.59 16.59C18.37 14.5 21.08 13.08 24 12.85C26.92 12.63 30.01 13.61 32.36 15.64C34.7 17.67 36.27 20.73 36.49 24C36.72 27.27 35.59 30.71 33.31 33.31C31.03 35.9 27.62 37.61 24 37.84C20.38 38.06 16.59 36.79 13.74 34.26C10.9 31.73 9.04 27.97 8.82 24C8.59 20.03 10.01 15.88 12.79 12.79C15.57 9.7 19.67 7.7 24 7.47C28.33 7.25 32.82 8.81 36.16 11.84';

const brandMark = (size, { x = 0, y = 0 } = {}) => `
  <g transform="translate(${x} ${y}) scale(${size / 48})">
    <circle cx="24" cy="24" r="24" fill="${COLORS.terracota}"/>
    <path d="${RIBBON}" fill="none" stroke="${COLORS.trigoClaro}" stroke-width="3.2" stroke-linecap="round"/>
  </g>`;

// Favicon SVG: o símbolo da marca.
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">${brandMark(48)}</svg>\n`;
await writeFile(`${pub}/favicon.svg`, faviconSvg);

// PNG 32x32 para navegadores sem suporte a favicon SVG.
await sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toFile(`${pub}/favicon-32.png`);

// apple-touch-icon: fundo sólido (o iOS não aceita transparência) e margem.
const touchSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
  <rect width="180" height="180" fill="${COLORS.creme}"/>${brandMark(132, { x: 24, y: 24 })}</svg>`;
await sharp(Buffer.from(touchSvg)).png().toFile(`${pub}/apple-touch-icon.png`);

// Imagem Open Graph 1200x630: foto do hero à direita, marca à esquerda.
const W = 1200;
const H = 630;
const photoW = 640;
const photo = await sharp(`${root}src/assets/images/hero-talharim.jpg`)
  .resize(photoW, H, { fit: 'cover', position: 'attention' })
  .toBuffer();

const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W - photoW + 40}" height="${H}" rx="0" fill="${COLORS.creme}"/>
  <path d="M${W - photoW + 40} 0 C ${W - photoW + 80} 160, ${W - photoW} 330, ${W - photoW + 50} ${H} L ${W - photoW - 20} ${H} L ${W - photoW - 20} 0 Z" fill="${COLORS.creme}"/>
  ${brandMark(88, { x: 72, y: 72 })}
  <text x="72" y="270" font-family="Georgia, 'Times New Roman', serif" font-size="68" font-weight="700" fill="${COLORS.castanho}">La Pasta</text>
  <text x="72" y="345" font-family="Georgia, 'Times New Roman', serif" font-size="68" font-weight="700" fill="${COLORS.castanho}">di Girardi</text>
  <rect x="72" y="380" width="56" height="5" rx="2.5" fill="${COLORS.trigo}"/>
  <text x="72" y="432" font-family="Segoe UI, Arial, sans-serif" font-size="30" fill="${COLORS.castanho}">Massa fresca feita todos os dias</text>
  <text x="72" y="472" font-family="Segoe UI, Arial, sans-serif" font-size="30" fill="${COLORS.castanho}">Porto Alegre</text>
  <text x="72" y="566" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="${COLORS.terracota}" letter-spacing="2">PROJETO DE DEMONSTRAÇÃO</text>
</svg>`;

await sharp({ create: { width: W, height: H, channels: 3, background: COLORS.creme } })
  .composite([
    { input: photo, left: W - photoW, top: 0 },
    { input: Buffer.from(overlay), left: 0, top: 0 },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(`${pub}/og-image.jpg`);

console.log('✓ favicon.svg, favicon-32.png, apple-touch-icon.png e og-image.jpg gerados em public/');
