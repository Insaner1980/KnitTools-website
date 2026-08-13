const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** Yksi lähde koko sivuston reduced-motion-tarkistukselle. */
export const prefersReducedMotion = () =>
  window.matchMedia(REDUCED_MOTION_QUERY).matches;

const COUNT_UP_DURATION = 800;

/**
 * Laskee elementin numeron nollasta arvoon `value` expo-out-easingilla.
 * Tama on laskurisivujen ainoa hetki jossa kayttaja nakee tuloksen
 * syntyvan, joten animaatio omistetaan yhdessa paikassa.
 * Reduced motion -tilassa loppuarvo asetetaan suoraan.
 */
export const countUp = (
  element: HTMLElement,
  value: number,
  duration = COUNT_UP_DURATION,
) => {
  if (prefersReducedMotion()) {
    element.textContent = String(value);
    return;
  }

  const start = performance.now();
  const step = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    element.textContent = String(Math.round(eased * value));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
