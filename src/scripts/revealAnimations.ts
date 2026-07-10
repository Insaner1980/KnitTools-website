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
  // Clear inline GSAP styles so CSS hover transforms can take over.
  gsap.set(element, { clearProps: "opacity,transform,clipPath" });
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

const initGroupReveals = () => {
  const grouped = new Set<HTMLElement>();

  gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
    const members = gsap.utils
      .toArray<HTMLElement>("[data-reveal]", group)
      .filter((element) => element.dataset.reveal !== "clip");
    if (members.length < 2) return;

    members.forEach((member) => grouped.add(member));

    // Initial hidden state comes from the html.reveal-animations CSS,
    // so a single staggered tween per group is enough.
    gsap.to(members, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.55,
      ease: "power3.out",
      stagger: 0.08,
      overwrite: "auto",
      onComplete: () => members.forEach(markRevealed),
      scrollTrigger: {
        trigger: group,
        start: "top 85%",
        once: true,
      },
    });
  });

  return grouped;
};

const initScrollReveal = () => {
  prepareContentReveal();

  const elements = gsap.utils.toArray<HTMLElement>("[data-reveal]");
  if (elements.length === 0) return;

  if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
    revealAll(elements);
    return;
  }

  const grouped = initGroupReveals();

  elements.forEach((element) => {
    if (grouped.has(element)) return;

    if (element.dataset.reveal === "clip") {
      initClipReveal(element);
      return;
    }

    initFadeReveal(element);
  });

  ScrollTrigger.refresh();
};

const initYarnPaths = () => {
  const paths = gsap.utils.toArray<SVGPathElement>("[data-yarn-path]");
  if (paths.length === 0) return;

  // With reduced motion (or without JS) the full thread stays visible.
  if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

  paths.forEach((path) => {
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: path.closest(".yarn-path") ?? path,
        start: "top 92%",
        end: "bottom 50%",
        scrub: 0.6,
      },
    });
  });
};

const initPullQuotes = () => {
  const reduceMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;

  gsap.utils.toArray<HTMLElement>("[data-pull-quote]").forEach((quoteEl) => {
    const words = gsap.utils.toArray<HTMLElement>("[data-pq-word]", quoteEl);
    const marks = gsap.utils.toArray<HTMLElement>("[data-pq-mark]", quoteEl);
    const rules = gsap.utils.toArray<HTMLElement>("[data-pq-rule]", quoteEl);
    if (words.length === 0) return;

    const finish = () => quoteEl.classList.add(REVEALED_CLASS);

    if (reduceMotion) {
      gsap.set([...words, ...marks], { opacity: 1, y: 0, scale: 1 });
      gsap.set(rules, { scaleX: 1 });
      finish();
      return;
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: quoteEl,
        start: "top 78%",
        once: true,
      },
      onComplete: finish,
    });

    timeline.to(rules, { scaleX: 1, duration: 0.5, ease: "power2.out" }, 0);
    if (marks[0]) {
      timeline.to(
        marks[0],
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" },
        0.05,
      );
    }
    timeline.to(
      words,
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power3.out",
        stagger: 0.05,
      },
      0.12,
    );
    if (marks[1]) {
      timeline.to(
        marks[1],
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" },
        ">-0.2",
      );
    }
  });
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
  initYarnPaths();
  initPullQuotes();
  initAnimatedDetails();
  ScrollTrigger.refresh();
};
