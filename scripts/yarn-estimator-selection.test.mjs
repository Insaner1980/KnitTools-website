import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import test from "node:test";
import { runInNewContext } from "node:vm";

const source = readFileSync("src/components/YarnEstimator.astro", "utf8");
const script = stripTypeScriptTypes(
  source.match(/<script>([\s\S]*?)<\/script>/)[1].replace(/import .*?;/g, ""),
);

// Execute the entire production initializer; fake geometry tests visibility
// decisions only. Actual text fitting and wrapping require browser verification.
function setup() {
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
  const size = select("M", "M");
  const weight = select("Worsted / Medium", "worsted");
  const fields = [project, size, weight];
  let resize;
  let fontsReady;
  const observed = [];
  const elements = {
    "#project-type": project,
    "#project-size": size,
    "#yarn-weight": weight,
    ".estimate-btn": { addEventListener() {} },
    "#yarn-result": {},
    ".result-area": {},
  };
  runInNewContext(script, {
    document: {
      querySelectorAll: () => [
        {
          querySelector: (selector) => elements[selector],
          getAttribute: () =>
            JSON.stringify({
              "Twin (170×225cm)": "Yhden hengen (170 x 225 cm)",
              "Full (195×225cm)": "Kahden hengen (195 x 225 cm)",
            }),
        },
      ],
      createElement: (tag) =>
        tag === "canvas"
          ? {
              getContext: () => ({
                measureText: (text) => ({ width: text.length * 8 }),
              }),
            }
          : {},
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
    size,
    weight,
    fields,
    observed,
    verify,
    resize: () => resize(),
    fontsReady: () => fontsReady(),
  };
}

test("initial values and every selection change stay synchronized, including project size reset", () => {
  const h = setup();
  assert.deepEqual(
    h.fields.map((field) => field.value),
    ["sweater", "XS", "worsted"],
  );
  h.verify();
  h.project.change("Large blanket", "afghan");
  assert.equal(h.size.value, "Twin (170×225cm)");
  h.verify();
  h.size.change(null, "Full (195×225cm)");
  h.verify();
  h.weight.change("Super Bulky / Super Chunky", "super-bulky");
  h.verify();
  h.project.change("Adult Gloves", "adult-gloves");
  assert.equal(h.size.value, "S");
  h.verify();
});

test("only overflowing values are repeated and font readiness and resize refresh visibility", () => {
  const h = setup();
  assert.deepEqual(h.observed, h.fields);
  assert.ok(h.fields.every((field) => field.nextElementSibling.hidden));
  h.weight.change("Super Bulky / Super Chunky", "super-bulky");
  assert.equal(h.weight.nextElementSibling.hidden, false);
  h.weight.clientWidth = 600;
  h.resize();
  assert.equal(h.weight.nextElementSibling.hidden, true);
  h.weight.clientWidth = 212;
  h.resize();
  assert.equal(h.weight.nextElementSibling.hidden, false);
  h.weight.clientWidth = 600;
  h.fontsReady();
  assert.equal(h.weight.nextElementSibling.hidden, true);
  h.verify();
});

test("supplementary text is plain, non-focusable and hidden from duplicate accessibility output", () => {
  assert.equal(
    (
      source.match(
        /<p class="selected-label" aria-hidden="true" hidden><\/p>/g,
      ) ?? []
    ).length,
    3,
  );
  const h = setup();
  h.weight.change("<b>A long literal option label</b>", "super-bulky");
  assert.equal(
    h.weight.nextElementSibling.textContent,
    "<b>A long literal option label</b>",
  );
  assert.equal(h.weight.nextElementSibling.innerHTML, undefined);
});
