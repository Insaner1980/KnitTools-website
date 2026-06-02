import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const REVEALED_CLASS = "is-revealed";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const CONTENT_REVEAL_SELECTOR = "[data-reveal-content]";
const CONTENT_FADE_SELECTOR = "h3, p, ul, ol, table";

gsap.registerPlugin(ScrollTrigger);

const hasRevealAttribute = (element: HTMLElement) =>
  Object.prototype.hasOwnProperty.call(element.dataset, "reveal");

const prepareContentReveal = () => {
  document
    .querySelectorAll<HTMLElement>(CONTENT_REVEAL_SELECTOR)
    .forEach((container) => {
      container.querySelectorAll<HTMLElement>("h2").forEach((element) => {
        if (hasRevealAttribute(element)) return;

        element.dataset.reveal = "clip";
      });

      container
        .querySelectorAll<HTMLElement>(CONTENT_FADE_SELECTOR)
        .forEach((element) => {
          if (hasRevealAttribute(element)) return;

          element.dataset.reveal = "";
        });
    });
};

const revealAll = (elements: HTMLElement[]) => {
  const clipRevealElements = elements.filter(
    (element) => element.dataset.reveal === "clip",
  );

  gsap.set(elements, {
    opacity: 1,
    y: 0,
    scale: 1,
  });
  gsap.set(clipRevealElements, {
    clipPath: "inset(0 0 0 0)",
  });
  elements.forEach((element) => element.classList.add(REVEALED_CLASS));
};

const markRevealed = (element: HTMLElement) => {
  element.classList.add(REVEALED_CLASS);
};

const getFadeFromVars = (element: HTMLElement) => {
  switch (element.dataset.reveal) {
    case "heading":
      return { opacity: 0, y: 12 };
    case "scale":
      return { opacity: 0, y: 18, scale: 0.985 };
    default:
      return { opacity: 0, y: 24 };
  }
};

const initClipReveal = (element: HTMLElement) => {
  gsap.set(element, { clipPath: "inset(0 100% 0 0)" });
  gsap.to(element, {
    clipPath: "inset(0 0% 0 0)",
    duration: 0.8,
    ease: "power3.inOut",
    overwrite: "auto",
    onComplete: () => markRevealed(element),
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      once: true,
    },
  });
};

const initFadeReveal = (element: HTMLElement) => {
  const isCard = element.dataset.reveal === "scale";
  gsap.fromTo(element, getFadeFromVars(element), {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: isCard ? 0.5 : 0.6,
    ease: isCard ? "power3.out" : "power2.out",
    overwrite: "auto",
    onComplete: () => markRevealed(element),
    scrollTrigger: {
      trigger: element,
      start: "top 88%",
      once: true,
    },
  });
};

const initScrollReveal = () => {
  prepareContentReveal();

  const elements = gsap.utils.toArray<HTMLElement>("[data-reveal]");
  if (elements.length === 0) return;

  if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
    revealAll(elements);
    return;
  }

  elements.forEach((element) => {
    if (element.dataset.reveal === "clip") {
      initClipReveal(element);
      return;
    }

    initFadeReveal(element);
  });

  ScrollTrigger.refresh();
};

const resetAnimatedBody = (body: HTMLElement) => {
  gsap.set(body, { clearProps: "height,opacity,overflow" });
};

const getAnimatedBody = (details: HTMLDetailsElement) =>
  details.querySelector<HTMLElement>("[data-animate-body], .cat-body, p");

const animateDetailsOpen = (details: HTMLDetailsElement, body: HTMLElement) => {
  details.open = true;
  gsap.fromTo(
    body,
    { height: 0, opacity: 0, overflow: "hidden" },
    {
      height: body.scrollHeight,
      opacity: 1,
      duration: 0.22,
      ease: "power3.out",
      onComplete: () => resetAnimatedBody(body),
    },
  );
};

const animateDetailsClose = (
  details: HTMLDetailsElement,
  body: HTMLElement,
) => {
  gsap.fromTo(
    body,
    { height: body.scrollHeight, opacity: 1, overflow: "hidden" },
    {
      height: 0,
      opacity: 0,
      duration: 0.18,
      ease: "power2.inOut",
      onComplete: () => {
        details.open = false;
        resetAnimatedBody(body);
      },
    },
  );
};

const initAnimatedDetails = () => {
  if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

  document
    .querySelectorAll<HTMLDetailsElement>("details[data-animate-details]")
    .forEach((details) => {
      if (details.dataset.animatedDetailsInitialized === "true") return;
      details.dataset.animatedDetailsInitialized = "true";

      const summary = details.querySelector("summary");
      const body = getAnimatedBody(details);

      if (!summary || !body) return;

      summary.addEventListener("click", (event) => {
        event.preventDefault();
        gsap.killTweensOf(body);

        if (details.open) {
          animateDetailsClose(details, body);
        } else {
          animateDetailsOpen(details, body);
        }
      });
    });
};

export const initRevealAnimations = () => {
  initScrollReveal();
  initAnimatedDetails();
};
