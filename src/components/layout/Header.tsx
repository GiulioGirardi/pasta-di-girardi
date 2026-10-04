import { useEffect, useRef, useState } from 'react';
import { business, nav } from '../../data/site';
import { BrandMark } from '../ui/BrandMark';
import { IconClose, IconMenu } from '../ui/Icons';
import { OpenStatus } from '../ui/OpenStatus';

function Logo() {
  return (
    <a href="#inicio" className="group flex items-center gap-2.5 rounded-md">
      <BrandMark className="size-8 shrink-0 sm:size-9 transition-transform duration-500 group-hover:rotate-45 motion-reduce:transition-none" />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-lg font-semibold tracking-tight whitespace-nowrap [font-variation-settings:'SOFT'_100] sm:text-xl">
          {business.name}
        </span>
        <span className="mt-1 text-[0.6875rem] font-semibold tracking-[0.16em] whitespace-nowrap text-castanho-600 uppercase">
          {business.tagline}
        </span>
      </span>
    </a>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // O <dialog> modal cuida do foco preso, do Esc e de devolver o foco ao botão.
  const openMenu = () => {
    dialogRef.current?.showModal();
    setMenuOpen(true);
  };
  const closeMenu = () => dialogRef.current?.close();

  // Ao fechar, o <dialog> devolve o foco ao botão do menu; no quadro seguinte o foco vai para a seção de destino.
  const goToSection = (href: string) => {
    closeMenu();
    requestAnimationFrame(() => {
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
        scrolled ? 'bg-creme-50/95 shadow-[0_1px_0_rgb(43_29_20/0.1)] backdrop-blur-md' : 'bg-creme-50/80 backdrop-blur-sm'
      }`}
    >
      <div className="container-page flex h-18 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3 py-2 font-semibold text-castanho-800 transition-colors hover:bg-creme-200 hover:text-castanho-900"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden xl:block">
            <OpenStatus />
          </div>
          <a href="#reserva" className="btn btn-primary hidden min-h-11 px-5 min-[400px]:inline-flex">
            Reservar mesa
          </a>
          <button
            type="button"
            onClick={openMenu}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            className="grid size-11 place-items-center rounded-full border-2 border-castanho-900/20 text-castanho-900 lg:hidden"
          >
            <IconMenu className="size-6" />
            <span className="sr-only">Abrir menu</span>
          </button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        onClose={() => setMenuOpen(false)}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-creme-50 p-0 text-castanho-900 backdrop:bg-castanho-900/40 open:animate-fade-down"
      >
        <div className="container-page flex h-18 items-center justify-between">
          <Logo />
          <button
            type="button"
            onClick={closeMenu}
            className="grid size-11 place-items-center rounded-full border-2 border-castanho-900/20"
          >
            <IconClose className="size-6" />
            <span className="sr-only">Fechar menu</span>
          </button>
        </div>
        <nav aria-label="Menu móvel" className="container-page pt-6 pb-10">
          <ul className="divide-y divide-castanho-900/10 border-y border-castanho-900/10">
            {nav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => goToSection(link.href)}
                  className="block py-4 font-serif text-2xl font-semibold [font-variation-settings:'SOFT'_100]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#reserva" onClick={() => goToSection('#reserva')} className="btn btn-primary mt-8 w-full">
            Reservar mesa
          </a>
          <OpenStatus variant="inline" className="mt-6" />
        </nav>
      </dialog>
    </header>
  );
}
