const activeClass = "is-active";

const nextIndex = (current: number, length: number, key: string) => {
  if (key === "Home") return 0;
  if (key === "End") return length - 1;
  if (key === "ArrowRight" || key === "ArrowDown") {
    return (current + 1) % length;
  }
  if (key === "ArrowLeft" || key === "ArrowUp") {
    return (current - 1 + length) % length;
  }
  return current;
};

function activateTab(root: HTMLElement, target: string, focus = false) {
  const tabs = [...root.querySelectorAll<HTMLButtonElement>(".tab-btn")];
  const panels = [...root.querySelectorAll<HTMLElement>(".panel")];

  tabs.forEach((tab) => {
    const isActive = tab.dataset.tab === target;
    tab.classList.toggle(activeClass, isActive);
    tab.setAttribute("aria-selected", isActive ? "true" : "false");
    tab.tabIndex = isActive ? 0 : -1;
    if (isActive && focus) tab.focus();
  });

  panels.forEach((panel) => {
    const isActive = panel.dataset.panel === target;
    panel.classList.toggle(activeClass, isActive);
    panel.toggleAttribute("hidden", !isActive);
  });
}

function activateUnit(root: HTMLElement, unit: string, focus = false) {
  const unitButtons = [
    ...root.querySelectorAll<HTMLButtonElement>(".unit-btn"),
  ];
  const chartWrap = root.querySelector<HTMLElement>(".chart-wrap");
  if (!chartWrap) return;

  unitButtons.forEach((button) => {
    const isActive = button.dataset.unit === unit;
    button.classList.toggle(activeClass, isActive);
    button.setAttribute("aria-checked", isActive ? "true" : "false");
    button.tabIndex = isActive ? 0 : -1;
    if (isActive && focus) button.focus();
  });

  chartWrap.classList.toggle("show-cm", unit === "cm");
  chartWrap.classList.toggle("show-inch", unit === "inch");
}

function initSizeChart(root: HTMLElement) {
  if (root.dataset.sizeChartInitialized === "true") return;
  root.dataset.sizeChartInitialized = "true";

  const tabs = [...root.querySelectorAll<HTMLButtonElement>(".tab-btn")];
  const unitButtons = [
    ...root.querySelectorAll<HTMLButtonElement>(".unit-btn"),
  ];

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;
      if (target) activateTab(root, target);
    });

    tab.addEventListener("keydown", (event) => {
      const activeIndex = tabs.indexOf(tab);
      if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) {
        event.preventDefault();
        const target = tabs[nextIndex(activeIndex, tabs.length, event.key)];
        if (target?.dataset.tab) activateTab(root, target.dataset.tab, true);
      }
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        const target = tab.dataset.tab;
        if (target) activateTab(root, target, true);
      }
    });
  });

  unitButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const unit = button.dataset.unit;
      if (unit) activateUnit(root, unit);
    });

    button.addEventListener("keydown", (event) => {
      const activeIndex = unitButtons.indexOf(button);
      if (
        [
          "ArrowRight",
          "ArrowLeft",
          "ArrowDown",
          "ArrowUp",
          "Home",
          "End",
        ].includes(event.key)
      ) {
        event.preventDefault();
        const target =
          unitButtons[nextIndex(activeIndex, unitButtons.length, event.key)];
        if (target?.dataset.unit) activateUnit(root, target.dataset.unit, true);
      }
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        const unit = button.dataset.unit;
        if (unit) activateUnit(root, unit, true);
      }
    });
  });
}

export function initSizeChartControls() {
  document
    .querySelectorAll<HTMLElement>("[data-size-chart]")
    .forEach(initSizeChart);
}
