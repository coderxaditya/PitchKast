import { getLenis } from "./smoothScroll";

export const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  if (!href.startsWith('#')) return;
  e.preventDefault();

  const target = document.querySelector(href);
  if (!target) return;

  /* getLenis() rather than window.__lenis: the hook only publishes the
     window handle in development, so a production build used to fall through
     to the native smooth scroll below and animate the same scroll position
     Lenis was already animating. */
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target as HTMLElement, { offset: 0 });
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
  window.history.pushState(null, '', href);
};
