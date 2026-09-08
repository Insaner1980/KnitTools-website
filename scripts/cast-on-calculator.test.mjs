import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  calculateCastOn,
  CAST_ON_LOCALE_CONFIGS,
  getSteppedInputValue,
  initCastOnCalculators,
  parseCastOnNumber,
} from "../src/scripts/castOnCalculator.ts";

const GAUGE_SPIN = { step: "0.5", min: "1", max: "100" };
const WIDTH_SPIN = { step: "0.1", min: "0.1", max: "1000" };
const LANGUAGES = ["en", "fi", "de", "sv", "no", "fr", "nl", "da"];

const stepValue = (rawValue, direction, limits, usesDecimalComma = false) =>
  getSteppedInputValue({
    rawValue,
    direction,
    usesDecimalComma,
    ...limits,
  });

class FakeClassList {
  constructor(classNames = []) {
    this.values = new Set(classNames);
  }

  add(className) {
    this.values.add(className);
  }

  contains(className) {
    return this.values.has(className);
  }
}

class FakeElement {
  constructor(ownerDocument, options = {}) {
    this.ownerDocument = ownerDocument;
    this.attributes = new Map();
    this.children = [];
    this.listeners = new Map();
    this.queries = new Map();
    this.queryLists = new Map();
    this.eventTypes = [];
    this.value = options.value ?? "";
    this.type = options.type ?? "";
    this.name = options.name ?? "";
    this.id = options.id ?? "";
    this.checked = options.checked ?? false;
    this.closestElement = null;
    this.unitRadios = [];
    this.className = options.className ?? "";

    for (const [name, value] of Object.entries(options.attributes ?? {})) {
      this.setAttribute(name, value);
    }
  }

  set className(value) {
    this._className = value;
    this.classList = new FakeClassList(value.split(/\s+/).filter(Boolean));
  }

  get className() {
    return this._className;
  }

  set textContent(value) {
    this._textContent = String(value);
    this.children = [];
  }

  get textContent() {
    if (this.children.length > 0) {
      return this.children.map((child) => child.textContent).join("");
    }
    return this._textContent ?? "";
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }

  appendChild(child) {
    this.children.push(child);
    return child;
  }

  addEventListener(type, listener) {
    const listeners = this.listeners.get(type) ?? [];
    listeners.push(listener);
    this.listeners.set(type, listeners);
  }

  dispatchEvent(event) {
    this.eventTypes.push(event.type);
    for (const listener of this.listeners.get(event.type) ?? [])
      listener(event);
    return true;
  }

  click() {
    this.dispatchEvent(new Event("click"));
  }

  closest(selector) {
    return selector === ".number-input-wrap" ? this.closestElement : null;
  }

  querySelector(selector) {
    if (
      selector.startsWith('input[name="unit-') &&
      selector.endsWith(":checked")
    ) {
      return this.unitRadios.find((radio) => radio.checked) ?? null;
    }
    return this.queries.get(selector) ?? null;
  }

  querySelectorAll(selector) {
    return this.queryLists.get(selector) ?? [];
  }
}

class FakeDocument {
  constructor() {
    this.queryLists = new Map();
  }

  createElement() {
    return new FakeElement(this);
  }

  querySelectorAll(selector) {
    return this.queryLists.get(selector) ?? [];
  }
}

const createSpinButton = (document, wrap, className) => {
  const button = new FakeElement(document, {
    className: `spin-btn ${className}`,
  });
  button.closestElement = wrap;
  return button;
};

const createCalculatorHarness = (lang = "en") => {
  const config = CAST_ON_LOCALE_CONFIGS[lang];
  const document = new FakeDocument();
  const calculator = new FakeElement(document, {
    className: "cast-on-calculator",
    attributes: {
      "data-error": config.copy.error,
      "data-result-label": config.copy.resultLabel,
    },
  });
  const gaugeInput = new FakeElement(document, {
    id: "gauge",
    type: config.numericInputType,
    attributes: GAUGE_SPIN,
  });
  const widthInput = new FakeElement(document, {
    id: "width",
    type: config.numericInputType,
    attributes: WIDTH_SPIN,
  });
  const gaugeLabel = new FakeElement(document, {
    attributes: { for: "gauge" },
  });
  const widthLabel = new FakeElement(document, {
    attributes: { for: "width" },
  });
  const calculateButton = new FakeElement(document, { className: "calc-btn" });
  const resultElement = new FakeElement(document, {
    id: "cast-on-result",
    className: "result-value",
  });
  const resultArea = new FakeElement(document, {
    className: "result-area",
    attributes: { "aria-live": "polite" },
  });
  const gaugeWrap = new FakeElement(document);
  const widthWrap = new FakeElement(document);
  gaugeWrap.queries.set("input", gaugeInput);
  widthWrap.queries.set("input", widthInput);

  const gaugeDown = createSpinButton(document, gaugeWrap, "spin-down");
  const gaugeUp = createSpinButton(document, gaugeWrap, "spin-up");
  const widthDown = createSpinButton(document, widthWrap, "spin-down");
  const widthUp = createSpinButton(document, widthWrap, "spin-up");

  const unitRadios = config.metricOnly
    ? []
    : [
        new FakeElement(document, {
          type: "radio",
          name: "unit",
          value: "cm",
          checked: true,
        }),
        new FakeElement(document, {
          type: "radio",
          name: "unit",
          value: "inches",
        }),
      ];
  calculator.unitRadios = unitRadios;
  calculator.queries.set("#gauge", gaugeInput);
  calculator.queries.set("#width", widthInput);
  calculator.queries.set('label[for="gauge"]', gaugeLabel);
  calculator.queries.set('label[for="width"]', widthLabel);
  calculator.queries.set(".calc-btn", calculateButton);
  calculator.queries.set("#cast-on-result", resultElement);
  calculator.queries.set(".result-area", resultArea);
  calculator.queryLists.set('input[name="unit"]', unitRadios);
  document.queryLists.set(".cast-on-calculator", [calculator]);
  document.queryLists.set(".spin-btn", [
    gaugeDown,
    gaugeUp,
    widthDown,
    widthUp,
  ]);

  const animations = [];
  initCastOnCalculators(document, (element, value) => {
    animations.push({ element, value });
    element.textContent = String(value);
  });

  return {
    animations,
    calculateButton,
    calculator,
    config,
    gaugeDown,
    gaugeInput,
    gaugeLabel,
    gaugeUp,
    resultArea,
    resultElement,
    unitRadios,
    widthDown,
    widthInput,
    widthLabel,
    widthUp,
  };
};

describe("cast-on calculator input boundaries", () => {
  test("accepts each inclusive minimum and maximum", () => {
    for (const [gauge, width, stitches] of [
      ["1", "50", 6],
      ["100", "50", 500],
      ["20", "0.1", 0],
      ["20", "1000", 2000],
    ]) {
      assert.deepEqual(calculateCastOn(gauge, width, "cm"), {
        ok: true,
        stitches,
      });
    }
  });

  test("rejects each input immediately outside its inclusive boundaries", () => {
    for (const [gauge, width, invalidFields] of [
      ["0.999", "50", ["gauge"]],
      ["100.001", "50", ["gauge"]],
      ["20", "0.099", ["width"]],
      ["20", "1000.001", ["width"]],
    ]) {
      assert.deepEqual(calculateCastOn(gauge, width, "cm"), {
        ok: false,
        invalidFields,
      });
    }
  });

  test("rejects empty, zero, negative, non-numeric, and non-finite gauge values", () => {
    for (const gauge of [
      "",
      "   ",
      "0",
      "-1",
      "knit",
      "NaN",
      "Infinity",
      "-Infinity",
    ]) {
      assert.deepEqual(calculateCastOn(gauge, "50", "cm"), {
        ok: false,
        invalidFields: ["gauge"],
      });
    }
  });

  test("rejects empty, zero, negative, non-numeric, and non-finite width values", () => {
    for (const width of [
      "",
      "   ",
      "0",
      "-1",
      "wide",
      "NaN",
      "Infinity",
      "-Infinity",
    ]) {
      assert.deepEqual(calculateCastOn("20", width, "cm"), {
        ok: false,
        invalidFields: ["width"],
      });
    }
  });

  test("reports both fields when both are invalid", () => {
    assert.deepEqual(calculateCastOn("", "Infinity", "cm"), {
      ok: false,
      invalidFields: ["gauge", "width"],
    });
  });
});

describe("cast-on calculator increment controls", () => {
  test("starts empty gauge and width increments at their declared minimums", () => {
    assert.equal(stepValue("", "up", GAUGE_SPIN), "1");
    assert.equal(stepValue("", "up", WIDTH_SPIN), "0.1");
  });

  test("does not increment above maximum or decrement below minimum", () => {
    assert.equal(stepValue("100", "up", GAUGE_SPIN), "100");
    assert.equal(stepValue("1", "down", GAUGE_SPIN), "1");
    assert.equal(stepValue("1000", "up", WIDTH_SPIN), "1000");
    assert.equal(stepValue("0.1", "down", WIDTH_SPIN), "0.1");
  });

  test("brings out-of-range starting values back inside either boundary", () => {
    assert.equal(stepValue("0.2", "up", GAUGE_SPIN), "1");
    assert.equal(stepValue("1000.2", "down", WIDTH_SPIN), "1000");
  });

  test("repeats decimal increments and decrements without display artifacts", () => {
    let gauge = "19.5";
    gauge = stepValue(gauge, "up", GAUGE_SPIN);
    assert.equal(gauge, "20");
    gauge = stepValue(gauge, "up", GAUGE_SPIN);
    assert.equal(gauge, "20.5");
    gauge = stepValue(gauge, "down", GAUGE_SPIN);
    assert.equal(gauge, "20");

    let width = "0.1";
    width = stepValue(width, "up", WIDTH_SPIN);
    assert.equal(width, "0.2");
    width = stepValue(width, "up", WIDTH_SPIN);
    assert.equal(width, "0.3");
    width = stepValue(width, "up", WIDTH_SPIN);
    assert.equal(width, "0.4");
    width = stepValue(width, "down", WIDTH_SPIN);
    assert.equal(width, "0.3");
    width = stepValue(width, "down", WIDTH_SPIN);
    assert.equal(width, "0.2");
  });

  test("preserves localized decimal-comma input through the controls", () => {
    assert.equal(stepValue("20,5", "up", GAUGE_SPIN, true), "21");
    assert.equal(stepValue("0,2", "up", WIDTH_SPIN, true), "0,3");
  });
});

describe("cast-on calculator calculations", () => {
  test("preserves centimeter and inch formulas", () => {
    assert.deepEqual(calculateCastOn("20", "50", "cm"), {
      ok: true,
      stitches: 100,
    });
    assert.deepEqual(calculateCastOn("20", "10", "inches"), {
      ok: true,
      stitches: 50,
    });
  });

  test("accepts representative in-range decimal and off-step measurements", () => {
    assert.deepEqual(calculateCastOn("21.5", "37.5", "cm"), {
      ok: true,
      stitches: 80,
    });
    assert.deepEqual(calculateCastOn("20.25", "10.05", "cm"), {
      ok: true,
      stitches: 20,
    });
  });

  test("rounds on both sides of an even-stitch boundary", () => {
    assert.deepEqual(calculateCastOn("20", "49.45", "cm"), {
      ok: true,
      stitches: 98,
    });
    assert.deepEqual(calculateCastOn("20", "49.55", "cm"), {
      ok: true,
      stitches: 100,
    });
  });

  test("preserves the existing upward tie behavior", () => {
    assert.deepEqual(calculateCastOn("20", "49.5", "cm"), {
      ok: true,
      stitches: 100,
    });
  });
});

describe("cast-on calculator localization", () => {
  test("parses equivalent decimal-point and decimal-comma inputs", () => {
    assert.equal(parseCastOnNumber(" 20.5 "), 20.5);
    assert.equal(parseCastOnNumber(" 20,5 "), 20.5);
    assert.deepEqual(calculateCastOn("20.5", "10.5", "cm"), {
      ok: true,
      stitches: 22,
    });
    assert.deepEqual(calculateCastOn("20,5", "10,5", "cm"), {
      ok: true,
      stitches: 22,
    });
  });

  test("keeps all eight locale configurations complete and correctly unit-scoped", () => {
    assert.deepEqual(Object.keys(CAST_ON_LOCALE_CONFIGS), LANGUAGES);

    for (const lang of LANGUAGES) {
      const config = CAST_ON_LOCALE_CONFIGS[lang];
      assert.ok(config.copy.error.length > 0, `${lang} error`);
      assert.ok(config.copy.resultLabel.length > 0, `${lang} result label`);
      assert.equal(config.numericInputType, lang === "en" ? "number" : "text");
      assert.equal(config.metricOnly, ["fr", "nl", "da"].includes(lang));
    }
  });

  test("shows each locale's own boundary error and recovers to its valid result", () => {
    for (const lang of LANGUAGES) {
      const harness = createCalculatorHarness(lang);
      harness.gaugeInput.value = "0.9";
      harness.widthInput.value = "50";
      harness.calculateButton.click();

      assert.equal(harness.resultElement.children.length, 1, lang);
      assert.equal(
        harness.resultElement.children[0].className,
        "form-error",
        lang,
      );
      assert.equal(
        harness.resultElement.children[0].textContent,
        harness.config.copy.error,
        lang,
      );
      assert.equal(
        harness.resultElement.children[0].getAttribute("role"),
        "alert",
      );

      harness.gaugeInput.value = lang === "en" ? "20.5" : "20,5";
      harness.widthInput.value = lang === "en" ? "10.5" : "10,5";
      harness.calculateButton.click();

      assert.equal(harness.resultElement.children.length, 1, lang);
      assert.equal(
        harness.resultElement.children[0].className,
        "tool-result",
        lang,
      );
      assert.equal(harness.animations.at(-1).value, 22, lang);
      assert.equal(
        harness.unitRadios.length,
        harness.config.metricOnly ? 0 : 2,
      );
    }
  });
});

describe("cast-on calculator controller integration", () => {
  test("connects generated input IDs to their labels and preserves the live region", () => {
    const harness = createCalculatorHarness();

    assert.match(harness.gaugeInput.id, /^gauge-[a-z0-9]+$/);
    assert.equal(harness.gaugeLabel.getAttribute("for"), harness.gaugeInput.id);
    assert.match(harness.widthInput.id, /^width-[a-z0-9]+$/);
    assert.equal(harness.widthLabel.getAttribute("for"), harness.widthInput.id);
    assert.equal(harness.resultArea.getAttribute("aria-live"), "polite");
  });

  test("routes actual spin-button clicks through the corrected boundary logic", () => {
    const harness = createCalculatorHarness();
    harness.gaugeUp.click();
    harness.widthUp.click();
    assert.equal(harness.gaugeInput.value, "1");
    assert.equal(harness.widthInput.value, "0.1");

    harness.gaugeDown.click();
    harness.widthDown.click();
    assert.equal(harness.gaugeInput.value, "1");
    assert.equal(harness.widthInput.value, "0.1");
    assert.deepEqual(harness.gaugeInput.eventTypes, ["input", "input"]);
    assert.deepEqual(harness.widthInput.eventTypes, ["input", "input"]);
  });

  test("routes localized decimal input through the actual spin listener", () => {
    const harness = createCalculatorHarness("fi");
    harness.gaugeInput.value = "20,5";
    harness.widthInput.value = "0,2";
    harness.gaugeUp.click();
    harness.widthUp.click();
    assert.equal(harness.gaugeInput.value, "21");
    assert.equal(harness.widthInput.value, "0,3");
  });

  test("valid then invalid input removes the old successful result", () => {
    const harness = createCalculatorHarness();
    harness.gaugeInput.value = "20";
    harness.widthInput.value = "50";
    harness.calculateButton.click();
    const successfulResult = harness.resultElement.children[0];
    assert.equal(successfulResult.className, "tool-result");
    assert.equal(harness.animations.at(-1).value, 100);

    harness.gaugeInput.value = "0.9";
    harness.calculateButton.click();
    assert.equal(harness.resultElement.children.length, 1);
    assert.notEqual(harness.resultElement.children[0], successfulResult);
    assert.equal(harness.resultElement.children[0].className, "form-error");
    assert.equal(
      harness.resultElement.children[0].getAttribute("role"),
      "alert",
    );
    assert.equal(harness.animations.length, 1);
  });

  test("invalid then valid input clears the error and updates the result", () => {
    const harness = createCalculatorHarness();
    harness.gaugeInput.value = "100.1";
    harness.widthInput.value = "50";
    harness.calculateButton.click();
    const error = harness.resultElement.children[0];
    assert.equal(error.className, "form-error");

    harness.gaugeInput.value = "20";
    harness.calculateButton.click();
    assert.equal(harness.resultElement.children.length, 1);
    assert.notEqual(harness.resultElement.children[0], error);
    assert.equal(harness.resultElement.children[0].className, "tool-result");
    assert.equal(
      harness.resultElement.children[0].children[0].textContent,
      "100",
    );
    assert.equal(harness.animations.at(-1).value, 100);
  });

  test("uses the selected inch unit in the actual Calculate listener", () => {
    const harness = createCalculatorHarness();
    harness.unitRadios[0].checked = false;
    harness.unitRadios[1].checked = true;
    harness.gaugeInput.value = "20";
    harness.widthInput.value = "10";
    harness.calculateButton.click();
    assert.equal(harness.animations.at(-1).value, 50);
  });
});
