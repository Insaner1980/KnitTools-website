import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import test from "node:test";
import { runInNewContext } from "node:vm";

import {
  yarnReferences,
  referenceQuantity,
} from "../src/lib/yarnReferences.ts";

const source = readFileSync("src/components/YarnEstimator.astro", "utf8");
const scriptBlockPattern = /<script\b[^>]*>([\s\S]*?)<\/script\b[^>]*>/i;
const script = stripTypeScriptTypes(
  source.match(scriptBlockPattern)[1].replace(/import .*?;/g, ""),
);

test("script extraction accepts HTML closing-tag variants without matching other tags", () => {
  for (const closingTag of [
    "</script>",
    "</SCRIPT >",
    "</script\t\n bar>",
    "</script/>",
  ]) {
    const fixture = `<SCRIPT type="module">const value = 1;${closingTag}`;
    assert.equal(fixture.match(scriptBlockPattern)?.[1], "const value = 1;");
  }
  assert.equal("<scripture>text</scripture>".match(scriptBlockPattern), null);
});

// Execute the entire production initializer; fake geometry tests visibility
// decisions only. Actual text fitting and wrapping require browser verification.
function setup() {
  const element = () => ({
    children: [],
    text: "",
    get textContent() {
      return (
        this.text + this.children.map((child) => child.textContent).join("")
      );
    },
    set textContent(value) {
      this.text = value;
      this.children = [];
    },
    appendChild(child) {
      this.children.push(child);
    },
    setAttribute() {},
  });
  const select = (text, value) => ({
    value,
    options: [{ textContent: text, value }],
    get selectedOptions() {
      return this.options.filter((option) => option.value === this.value);
    },
    set textContent(_text) {
      this.options = [];
    },
    appendChild(option) {
      this.options.push(option);
      if (this.options.length === 1) this.value = option.value;
    },
    clientWidth: 212,
    previousElementSibling: { setAttribute() {} },
    nextElementSibling: { textContent: "", hidden: true },
    listeners: [],
    addEventListener(type, callback) {
      assert.equal(type, "change");
      this.listeners.push(callback);
    },
    change(text, value) {
      if (text !== null) this.options = [{ textContent: text, value }];
      this.value = value;
      this.listeners.forEach((callback) => callback());
    },
  });
  const project = select("Sweater", "sweater");
  const pattern = select("PetiteKnit — Novice Sweater", "novice");
  const size = select("XS", "novice-XS");
  const weight = select("meters", "m");
  const fields = [project, pattern, size, weight];
  let resize;
  let fontsReady;
  const observed = [];
  let click;
  const result = element();
  const classes = new Set();
  const elements = {
    "#project-type": project,
    "#reference-pattern": pattern,
    "#project-size": size,
    "#length-unit": weight,
    ".estimate-btn": {
      addEventListener: (_type, callback) => (click = callback),
    },
    "#yarn-result": result,
    ".result-area": {
      classList: {
        add: (name) => classes.add(name),
        remove: (name) => classes.delete(name),
      },
    },
  };
  runInNewContext(script, {
    referenceQuantity,
    document: {
      querySelectorAll: () => [
        {
          querySelector: (selector) => elements[selector],
          getAttribute: (name) =>
            ({
              "data-references": JSON.stringify(
                yarnReferences.map((r) => ({
                  ...r,
                  label: r.name + " / " + r.size,
                  sizeLabel:
                    r.size + " / " + r.dimensionsCm.join(" × ") + " cm",
                  details: [r.basis, r.yarn, r.materials],
                })),
              ),
              "data-unavailable": "No supported estimate",
              "data-meters-label": "meters",
              "data-yards-label": "yards",
              "data-lang": "en",
              "data-source-label": "Original pattern",
            })[name] ?? "",
        },
      ],
      createElement: (tag) =>
        tag === "canvas"
          ? {
              getContext: () => ({
                measureText: (text) => ({ width: text.length * 8 }),
              }),
            }
          : element(),
      fonts: { ready: { then: (callback) => (fontsReady = callback) } },
    },
    getComputedStyle: () => ({
      font: "16px General Sans",
      paddingLeft: "18px",
      paddingRight: "44px",
    }),
    ResizeObserver: class {
      constructor(callback) {
        resize = callback;
      }
      observe(element) {
        observed.push(element);
      }
    },
    countUp: (target, value) => {
      target.textContent = String(value);
    },
  });
  const verify = () => {
    fields.forEach((field) => {
      assert.equal(
        field.nextElementSibling.textContent,
        field.selectedOptions[0].textContent,
      );
    });
  };
  return {
    project,
    pattern,
    size,
    weight,
    fields,
    observed,
    verify,
    resize: () => resize(),
    fontsReady: () => fontsReady(),
    click: () => click(),
    result,
    classes,
  };
}

test("initial reference and project changes synchronize options and visible labels", () => {
  const h = setup();
  assert.deepEqual(
    h.fields.map((f) => f.value),
    ["sweater", "novice", "novice-XS", "m"],
  );
  h.verify();
  h.project.change("Cowl", "cowl");
  assert.equal(h.size.value, "cowl-0");
  h.verify();
  h.size.change(null, "cowl-1");
  h.verify();
  h.project.change("Wrap", "wrap");
  assert.equal(h.size.value, "");
  h.click();
  assert.equal(h.result.textContent, "No supported estimate");
  h.verify();
});

test("every selector clears both supported results and unsupported feedback", () => {
  const h = setup();
  for (const [field, value] of [
    [h.size, "novice-M"],
    [h.weight, "yd"],
    [h.project, "cowl"],
  ]) {
    h.click();
    assert.ok(h.result.textContent.includes("Original pattern"));
    field.change(null, value);
    assert.equal(h.result.textContent, "");
    assert.equal(h.classes.has("is-open"), false);
  }
  h.project.change("Wrap", "wrap");
  h.click();
  h.project.change("Sweater", "sweater");
  assert.equal(h.result.textContent, "");
  h.click();
  assert.ok(h.result.textContent.includes("820yards"));
});

test("source quantities render in both units without carrying a previous result", () => {
  const h = setup();
  h.click();
  assert.ok(h.result.textContent.includes("750meters"));
  h.weight.change(null, "yd");
  h.click();
  assert.ok(h.result.textContent.includes("820yards"));
  h.project.change("Cowl", "cowl");
  h.click();
  assert.ok(h.result.textContent.includes("230yards"));
  h.weight.change(null, "m");
  h.click();
  assert.ok(h.result.textContent.includes("210meters"));
  assert.equal(
    h.result.children[0].children.at(-1).href,
    "https://www.purlsoho.com/create/2023/09/27/garter-ridge-cowl/",
  );
});

test("invalid or mismatched inputs never produce a number and recover", () => {
  for (const fieldName of ["project", "pattern", "size", "weight"]) {
    const h = setup();
    h.click();
    h[fieldName].change(null, "__proto__");
    h.click();
    assert.equal(h.result.textContent, "No supported estimate");
    h.project.change("Sweater", "sweater");
    h.weight.change(null, "m");
    h.click();
    assert.ok(h.result.textContent.includes("750meters"));
  }
  const h = setup();
  h.size.change(null, "cowl-0");
  h.click();
  assert.equal(h.result.textContent, "No supported estimate");
});

test("overflow labels respond to resize and font loading without duplicate accessible text", () => {
  const h = setup();
  assert.deepEqual(h.observed, h.fields);
  assert.equal(h.pattern.nextElementSibling.hidden, false);
  h.pattern.clientWidth = 2000;
  h.resize();
  assert.equal(h.pattern.nextElementSibling.hidden, true);
  h.pattern.clientWidth = 212;
  h.fontsReady();
  assert.equal(h.pattern.nextElementSibling.hidden, false);
  assert.equal(
    (
      source.match(
        /<p class="selected-label" aria-hidden="true" hidden><\/p>/g,
      ) ?? []
    ).length,
    4,
  );
  h.weight.change("<b>A long literal option label</b>", "m");
  assert.equal(
    h.weight.nextElementSibling.textContent,
    "<b>A long literal option label</b>",
  );
});

test("pattern changes clear results, restrict sizes and reject a foreign pattern size", () => {
  const h = setup();
  h.click();
  h.pattern.change(null, "flax");
  assert.equal(h.result.textContent, "");
  assert.equal(h.classes.has("is-open"), false);
  assert.equal(h.size.value, "flax-7");
  assert.equal(h.size.options.length, 12);
  h.size.change(null, "novice-5XL");
  h.click();
  assert.equal(h.result.textContent, "No supported estimate");
  h.pattern.change(null, "flax");
  h.size.change(null, "flax-17");
  h.weight.change(null, "yd");
  h.click();
  assert.ok(h.result.textContent.includes("2,200yards"));
  h.project.change("Cardigan", "cardigan");
  h.pattern.change(null, "eva");
  h.weight.change(null, "m");
  h.click();
  assert.ok(h.result.textContent.includes("1,001–1,092meters"));
  h.verify();
});
