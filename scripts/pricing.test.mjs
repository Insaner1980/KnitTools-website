import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { parse } from "parse5";
import * as pricing from "../src/config/pricing.ts";

test("an unset or malformed campaign remains prelaunch", () => {
  for (const [start, end] of [
    [null, null],
    [1000, null],
    [null, 2000],
    [2000, 1000],
    [1000, 1000],
    [NaN, 2000],
  ]) {
    assert.equal(pricing.getLaunchPhase?.(1500, start, end), "prelaunch");
  }
});

test("campaign start is inclusive and end is exclusive", () => {
  for (const [now, expected] of [
    [999, "prelaunch"],
    [1000, "launch"],
    [1999, "launch"],
    [2000, "regular"],
    [2001, "regular"],
  ]) {
    assert.equal(pricing.getLaunchPhase?.(now, 1000, 2000), expected);
  }
});

test("visible and structured prices use the same campaign phase", () => {
  for (const [campaign, expectedPrice] of [
    ["prelaunch", "$9.99"],
    ["launch", "$9.99"],
    ["regular", "$14.99"],
  ]) {
    const phase = pricing.getPricePhase?.(campaign);
    assert.equal(pricing.getPrice(phase, "US"), expectedPrice);
    const offer = pricing
      .getStructuredOffers(phase)
      .find((item) => item.priceCurrency === "USD");
    assert.equal(`$${offer.price}`, expectedPrice);
  }
});

test("configured regional amounts survive campaign selection", () => {
  assert.equal(pricing.getPrice("launch", "BR"), "BRL 24.90");
  assert.equal(pricing.getPrice("permanent", "BR"), "BRL 32.90");
  assert.equal(pricing.getPrice("launch", "EU"), "€9.99");
  assert.equal(pricing.getPrice("permanent", "EU"), "€14.99");
});

test("built landing page renders the configured phase and matching structured prices", () => {
  const document = parse(
    readFileSync(new URL("../dist/index.html", import.meta.url), "utf8"),
  );
  const nodes = [];
  const visit = (node) => {
    nodes.push(node);
    node.childNodes?.forEach(visit);
  };
  visit(document);
  const attribute = (node, name) =>
    node.attrs?.find((item) => item.name === name)?.value;
  const visibleText = (node) => {
    if (
      attribute(node, "hidden") !== undefined ||
      ["script", "style"].includes(node.tagName)
    )
      return "";
    return node.value ?? node.childNodes?.map(visibleText).join(" ") ?? "";
  };
  const phase = pricing.getLaunchPhase(
    Date.now(),
    pricing.PRICING.launchStartMs,
    pricing.PRICING.launchEndMs,
  );
  const pricePhase = pricing.getPricePhase(phase);
  const currentPrice = nodes.find(
    (node) => attribute(node, "data-current-price") !== undefined,
  );
  assert.equal(visibleText(currentPrice).trim(), pricing.getPrice(pricePhase));
  const schema = nodes.find(
    (node) => attribute(node, "data-pricing-schema") !== undefined,
  );
  const data = JSON.parse(schema.childNodes[0].value);
  const app = data["@graph"].find(
    (item) => item["@type"] === "SoftwareApplication",
  );
  assert.deepEqual(app.offers, pricing.getStructuredOffers(pricePhase));
  const body = visibleText(document).replace(/\s+/g, " ");
  assert.doesNotMatch(body, /Fall 2026|Eleven languages|price.*?later\./);
  assert.match(body, /Twelve languages/);
  assert.match(
    body,
    /Google Play confirms your price and currency for your billing country/,
  );
  if (phase === "prelaunch") {
    assert.match(body, /The release date has not been announced yet/);
    assert.match(
      body,
      /Planned launch price .*? for one month from the public release/,
    );
  } else if (phase === "regular") {
    assert.doesNotMatch(body, /Launch price ends|Planned launch price/);
  }
});
