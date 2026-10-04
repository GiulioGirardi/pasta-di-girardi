import type { ImageKey } from '../types';

/** Formato devolvido pelo vite-imagetools com `as=picture`. */
export interface PictureData {
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
}

// Cada foto vira AVIF + WebP em quatro larguras no build (vite-imagetools).
const modules = import.meta.glob<PictureData>('../assets/images/*.jpg', {
  eager: true,
  import: 'default',
  query: '?w=480;800;1200;1600&format=avif;webp&as=picture',
});

const pictures = Object.fromEntries(
  Object.entries(modules).map(([path, data]) => [path.split('/').pop()!.replace('.jpg', ''), data]),
) as Record<ImageKey, PictureData>;

export function getPicture(key: ImageKey): PictureData {
  const picture = pictures[key];
  if (!picture) throw new Error(`Imagem não encontrada: ${key}`);
  return picture;
}
