import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  /** id do h2, usado no aria-labelledby da seção. */
  id: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ id, eyebrow, title, intro, align = 'left', className = '' }: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <Reveal className={`${centered ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="heading-lg mt-3">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg">{intro}</p>}
    </Reveal>
  );
}
