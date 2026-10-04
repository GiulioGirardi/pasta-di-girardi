import { getPicture } from '../../lib/images';
import type { ImageKey } from '../../types';

interface PictureProps {
  image: ImageKey;
  alt: string;
  /** Atributo sizes do srcset; descreve a largura ocupada em cada breakpoint. */
  sizes: string;
  className?: string;
  imgClassName?: string;
  /** Ponto de foco do recorte com object-fit: cover (CSS object-position). */
  position?: string;
  /** Imagem principal da dobra: carrega sem lazy e com prioridade alta. */
  priority?: boolean;
}

export function Picture({ image, alt, sizes, className, imgClassName, position, priority = false }: PictureProps) {
  const { sources, img } = getPicture(image);
  return (
    <picture className={className}>
      {Object.entries(sources).map(([format, srcSet]) => (
        <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={sizes} />
      ))}
      <img
        src={img.src}
        width={img.w}
        height={img.h}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={imgClassName}
        style={position ? { objectPosition: position } : undefined}
      />
    </picture>
  );
}
