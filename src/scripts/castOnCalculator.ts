import type { Lang } from "../i18n/config";

type CastOnCopy = {
  legend: string;
  gauge: string;
  decreaseGauge: string;
  increaseGauge: string;
  gaugePlaceholder: string;
  width: string;
  decreaseWidth: string;
  increaseWidth: string;
  widthPlaceholder: string;
  unitSelection: string;
  inches: string;
  calculate: string;
  error: string;
  resultLabel: string;
};

export type CastOnLocaleConfig = {
  metricOnly: boolean;
  numericInputType: "number" | "text";
  copy: CastOnCopy;
};

export const CAST_ON_LOCALE_CONFIGS: Record<Lang, CastOnLocaleConfig> = {
  en: {
    metricOnly: false,
    numericInputType: "number",
    copy: {
      legend: "Cast On Calculator",
      gauge: "Gauge (stitches per 10 cm / 4 in)",
      decreaseGauge: "Decrease gauge",
      increaseGauge: "Increase gauge",
      gaugePlaceholder: "e.g. 20",
      width: "Desired width",
      decreaseWidth: "Decrease width",
      increaseWidth: "Increase width",
      widthPlaceholder: "e.g. 50",
      unitSelection: "Unit selection",
      inches: "inches",
      calculate: "Calculate",
      error: "Please enter valid gauge and width values.",
      resultLabel: "stitches to cast on",
    },
  },
  fi: {
    metricOnly: false,
    numericInputType: "text",
    copy: {
      legend: "Silmukkalaskuri",
      gauge: "Neuletiheys (silmukkaa / 10 cm tai 4 in)",
      decreaseGauge: "Pienennä neuletiheyttä",
      increaseGauge: "Suurenna neuletiheyttä",
      gaugePlaceholder: "esim. 20",
      width: "Haluttu leveys",
      decreaseWidth: "Pienennä leveyttä",
      increaseWidth: "Suurenna leveyttä",
      widthPlaceholder: "esim. 50",
      unitSelection: "Mittayksikkö",
      inches: "tuumaa",
      calculate: "Laske",
      error: "Syötä kelvollinen neuletiheys ja leveys.",
      resultLabel: "luotavaa silmukkaa",
    },
  },
  de: {
    metricOnly: false,
    numericInputType: "text",
    copy: {
      legend: "Maschenanschlag-Rechner",
      gauge: "Maschenprobe (Maschen pro 10 cm / 4 Zoll)",
      decreaseGauge: "Maschenprobe verkleinern",
      increaseGauge: "Maschenprobe vergrößern",
      gaugePlaceholder: "z. B. 20",
      width: "Gewünschte Breite",
      decreaseWidth: "Breite verkleinern",
      increaseWidth: "Breite vergrößern",
      widthPlaceholder: "z. B. 50",
      unitSelection: "Einheit",
      inches: "Zoll",
      calculate: "Berechnen",
      error: "Gib eine gültige Maschenprobe und Breite ein.",
      resultLabel: "anzuschlagende Maschen",
    },
  },
  sv: {
    metricOnly: false,
    numericInputType: "text",
    copy: {
      legend: "Uppläggningskalkylator",
      gauge: "Stickfasthet (maskor per 10 cm / 4 tum)",
      decreaseGauge: "Minska stickfastheten",
      increaseGauge: "Öka stickfastheten",
      gaugePlaceholder: "t.ex. 20",
      width: "Önskad bredd",
      decreaseWidth: "Minska bredden",
      increaseWidth: "Öka bredden",
      widthPlaceholder: "t.ex. 50",
      unitSelection: "Måttenhet",
      inches: "tum",
      calculate: "Räkna ut",
      error: "Ange giltiga värden för stickfasthet och bredd.",
      resultLabel: "maskor att lägga upp",
    },
  },
  no: {
    metricOnly: false,
    numericInputType: "text",
    copy: {
      legend: "Oppleggskalkulator",
      gauge: "Strikkefasthet (masker per 10 cm / 4 in)",
      decreaseGauge: "Reduser strikkefastheten",
      increaseGauge: "Øk strikkefastheten",
      gaugePlaceholder: "f.eks. 20",
      width: "Ønsket bredde",
      decreaseWidth: "Reduser bredden",
      increaseWidth: "Øk bredden",
      widthPlaceholder: "f.eks. 50",
      unitSelection: "Måleenhet",
      inches: "tommer",
      calculate: "Beregn",
      error: "Skriv inn gyldig strikkefasthet og bredde.",
      resultLabel: "masker å legge opp",
    },
  },
  fr: {
    metricOnly: true,
    numericInputType: "text",
    copy: {
      legend: "Calculateur de mailles à monter",
      gauge: "Échantillon (mailles pour 10 cm)",
      decreaseGauge: "Réduire l'échantillon",
      increaseGauge: "Augmenter l'échantillon",
      gaugePlaceholder: "ex. 20",
      width: "Largeur souhaitée (cm)",
      decreaseWidth: "Réduire la largeur",
      increaseWidth: "Augmenter la largeur",
      widthPlaceholder: "ex. 50",
      unitSelection: "Unité",
      inches: "pouces",
      calculate: "Calculer",
      error: "Entre un échantillon et une largeur valides.",
      resultLabel: "mailles à monter",
    },
  },
  nl: {
    metricOnly: true,
    numericInputType: "text",
    copy: {
      legend: "Opzetcalculator",
      gauge: "Stekenverhouding (steken per 10 cm)",
      decreaseGauge: "Stekenverhouding verlagen",
      increaseGauge: "Stekenverhouding verhogen",
      gaugePlaceholder: "bijv. 20",
      width: "Gewenste breedte (cm)",
      decreaseWidth: "Breedte verlagen",
      increaseWidth: "Breedte verhogen",
      widthPlaceholder: "bijv. 50",
      unitSelection: "Maateenheid",
      inches: "inch",
      calculate: "Berekenen",
      error: "Vul een geldige stekenverhouding en breedte in.",
      resultLabel: "op te zetten steken",
    },
  },
  da: {
    metricOnly: true,
    numericInputType: "text",
    copy: {
      legend: "Opslagsberegner",
      gauge: "Strikkefasthed (masker pr. 10 cm)",
      decreaseGauge: "Sænk strikkefastheden",
      increaseGauge: "Øg strikkefastheden",
      gaugePlaceholder: "fx 20",
      width: "Ønsket bredde (cm)",
      decreaseWidth: "Sænk bredden",
      increaseWidth: "Øg bredden",
      widthPlaceholder: "fx 50",
      unitSelection: "Måleenhed",
      inches: "inch",
      calculate: "Beregn",
      error: "Skriv en gyldig strikkefasthed og bredde.",
      resultLabel: "masker der skal slås op",
    },
  },
};

export const CAST_ON_INPUT_LIMITS = {
  gauge: { min: 1, max: 100, step: 0.5 },
  width: { min: 0.1, max: 1000, step: 0.1 },
} as const;

export type CastOnInputName = "gauge" | "width";

export type CastOnCalculation =
  | { ok: true; stitches: number }
  | { ok: false; invalidFields: CastOnInputName[] };

export const parseCastOnNumber = (raw: string | null) => {
  const normalized = (raw || "").trim().replace(/\s+/g, "").replace(",", ".");
  const value = Number(normalized);
  return Number.isFinite(value) ? value : NaN;
};

export const calculateCastOn = (
  gaugeRaw: string,
  widthRaw: string,
  unit: string,
): CastOnCalculation => {
  const gauge = parseCastOnNumber(gaugeRaw);
  const width = parseCastOnNumber(widthRaw);
  const invalidFields: CastOnInputName[] = [];

  if (
    !Number.isFinite(gauge) ||
    gauge < CAST_ON_INPUT_LIMITS.gauge.min ||
    gauge > CAST_ON_INPUT_LIMITS.gauge.max
  )
    invalidFields.push("gauge");
  if (
    !Number.isFinite(width) ||
    width < CAST_ON_INPUT_LIMITS.width.min ||
    width > CAST_ON_INPUT_LIMITS.width.max
  )
    invalidFields.push("width");

  if (invalidFields.length > 0) return { ok: false, invalidFields };

  const stitches = unit === "cm" ? (gauge / 10) * width : (gauge / 4) * width;
  return { ok: true, stitches: Math.round(stitches / 2) * 2 };
};

type StepInputOptions = {
  rawValue: string;
  step: string | null;
  min: string | null;
  max: string | null;
  direction: "up" | "down";
  usesDecimalComma: boolean;
};

export const getSteppedInputValue = ({
  rawValue,
  step: stepRaw,
  min: minRaw,
  max: maxRaw,
  direction,
  usesDecimalComma,
}: StepInputOptions) => {
  const step = parseCastOnNumber(stepRaw) || 1;
  const min = parseCastOnNumber(minRaw);
  const max = parseCastOnNumber(maxRaw);
  const parsedValue = parseCastOnNumber(rawValue);
  const hasValue = rawValue.trim() !== "" && Number.isFinite(parsedValue);
  let value = hasValue ? parsedValue : Number.isNaN(min) ? 0 : min;

  if (hasValue) value += direction === "up" ? step : -step;
  if (!Number.isNaN(min) && value < min) value = min;
  if (!Number.isNaN(max) && value > max) value = max;

  const formatted = String(Number(value.toFixed(2)));
  return usesDecimalComma ? formatted.replace(".", ",") : formatted;
};

type CountUp = (element: HTMLElement, value: number) => void;

export const initCastOnCalculators = (
  root: ParentNode,
  animateResult: CountUp,
) => {
  const calculators = root.querySelectorAll(".cast-on-calculator");

  calculators.forEach((calc) => {
    const gaugeInput = calc.querySelector("#gauge") as HTMLInputElement;
    const widthInput = calc.querySelector("#width") as HTMLInputElement;
    const gaugeLabel = calc.querySelector(
      'label[for="gauge"]',
    ) as HTMLLabelElement;
    const widthLabel = calc.querySelector(
      'label[for="width"]',
    ) as HTMLLabelElement;
    const unitRadios = calc.querySelectorAll('input[name="unit"]');
    const calcBtn = calc.querySelector(".calc-btn") as HTMLButtonElement;
    const resultEl = calc.querySelector("#cast-on-result") as HTMLElement;
    const resultArea = calc.querySelector(".result-area") as HTMLElement;

    if (
      !gaugeInput ||
      !widthInput ||
      !gaugeLabel ||
      !widthLabel ||
      !calcBtn ||
      !resultEl ||
      !resultArea
    )
      return;

    const id = Math.random().toString(36).slice(2, 8);
    gaugeInput.id = `gauge-${id}`;
    gaugeLabel.setAttribute("for", gaugeInput.id);
    widthInput.id = `width-${id}`;
    widthLabel.setAttribute("for", widthInput.id);
    resultEl.id = `cast-on-result-${id}`;
    unitRadios.forEach((radio) => {
      (radio as HTMLInputElement).name = `unit-${id}`;
    });

    calcBtn.addEventListener("click", () => {
      const unit =
        (
          calc.querySelector(
            `input[name="unit-${id}"]:checked`,
          ) as HTMLInputElement
        )?.value || "cm";
      const calculation = calculateCastOn(
        gaugeInput.value,
        widthInput.value,
        unit,
      );

      resultEl.textContent = "";
      resultEl.className = "result-value";

      if (!calculation.ok) {
        const errorSpan = calc.ownerDocument.createElement("span");
        errorSpan.className = "form-error";
        errorSpan.setAttribute("role", "alert");
        errorSpan.textContent = calc.getAttribute("data-error") || "";
        resultEl.appendChild(errorSpan);
        resultArea.classList.add("is-open");
        return;
      }

      const wrapper = calc.ownerDocument.createElement("div");
      wrapper.className = "tool-result";
      const numberEl = calc.ownerDocument.createElement("span");
      numberEl.className = "result-number";
      numberEl.textContent = "0";
      const labelEl = calc.ownerDocument.createElement("span");
      labelEl.className = "result-label";
      labelEl.textContent = calc.getAttribute("data-result-label") || "";
      wrapper.appendChild(numberEl);
      wrapper.appendChild(labelEl);
      resultEl.appendChild(wrapper);

      resultArea.classList.add("is-open");
      animateResult(numberEl, calculation.stitches);
    });
  });

  root.querySelectorAll(".spin-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const wrap = button.closest(".number-input-wrap");
      if (!wrap) return;
      const input = wrap.querySelector("input") as HTMLInputElement;
      if (!input) return;

      input.value = getSteppedInputValue({
        rawValue: input.value,
        step: input.getAttribute("step"),
        min: input.getAttribute("min"),
        max: input.getAttribute("max"),
        direction: button.classList.contains("spin-up") ? "up" : "down",
        usesDecimalComma: input.type === "text",
      });
      input.dispatchEvent(new Event("input"));
    });
  });
};
