import { gallery } from '../../data/site';
import type { GalleryPhoto } from '../../types';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

const SHAPES: Record<GalleryPhoto['shape'], { cell: string; sizes: string }> = {
  tall: { cell: 'row-span-2', sizes: '(min-width: 1024px) 25vw, 50vw' },
  wide: { cell: 'col-span-2', sizes: '(min-width: 1024px) 50vw, 100vw' },
  square: { cell: '', sizes: '(min-width: 1024px) 25vw, 50vw' },
};

export function Gallery() {
  return (
    <section id="galeria" aria-labelledby="galeria-title" className="section pt-8 sm:pt-10">
      <div className="container-page">
        <SectionHeading id="galeria-title" eyebrow={gallery.eyebrow} title={gallery.title} intro={gallery.intro} />

        {/* Linhas com a altura da largura de uma coluna: célula quadrada 1:1, wide ≈ 2:1, tall ≈ 1:2, em qualquer tela. */}
        <div className="@container mt-12">
          <ul className="grid grid-flow-dense auto-rows-[calc((100cqw-0.75rem)/2)] grid-cols-2 gap-3 sm:auto-rows-[calc((100cqw-1rem)/2)] sm:gap-4 lg:auto-rows-[calc((100cqw-3rem)/4)] lg:grid-cols-4">
            {gallery.photos.map((photo: GalleryPhoto, index) => {
              const shape = SHAPES[photo.shape];
              return (
                <li key={photo.image} className={shape.cell}>
                  <Reveal delay={(index % 4) * 70} className="h-full">
                    <figure className="group relative h-full overflow-hidden rounded-[1.25rem] bg-creme-200 sm:rounded-[1.75rem]">
                      <Picture
                        image={photo.image}
                        alt={photo.alt}
                        position={photo.position}
                        sizes={shape.sizes}
                        className="block h-full"
                        imgClassName="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                      />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-castanho-900/85 via-castanho-900/50 to-transparent px-3 pt-10 pb-2.5 text-sm font-semibold text-creme-50 sm:px-5 sm:pb-4 sm:text-base">
                        {photo.caption}
                      </figcaption>
                    </figure>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
