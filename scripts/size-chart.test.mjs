import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

// Independent CYC evidence reviewed 2026-10-17, not copied from an English page.
// https://www.craftyarncouncil.com/standards/baby-size-chart
// https://www.craftyarncouncil.com/standards/child-youth-sizes
// https://www.craftyarncouncil.com/standards/woman-size
// https://www.craftyarncouncil.com/standards/man-size
// https://www.craftyarncouncil.com/standards/head-circumference-chart
// https://www.craftyarncouncil.com/standards/foot-size-charts
// https://www.craftyarncouncil.com/standards/hand-size-charts
// CYC PDF pp. 17–18: 5X upper arm 19.5 in; men's Back HIP Length.
// https://media.craftyarncouncil.com/sites/default/files/images/standards/CYC_YarnStandards-2018-11-06.pdf
// Published rounding is intentional. Six inconsistent source pairs remain
// unresolved at the publisher (rechecked 2026-10-19). B05-03 withdraws both
// values in each affected cell; never choose a unit or calculate a substitute.
const pages = {
  en: "src/pages/tools/knitting-size-charts.astro",
  fi: "src/pages/fi/tyokalut/neulekokotaulukot.astro",
  sv: "src/pages/sv/verktyg/storlekstabeller-stickning.astro",
  no: "src/pages/no/verktoy/storrelsestabeller-strikking.astro",
  da: "src/components/danish-tools/DanishKnittingSizeChartsPage.astro",
  de: "src/pages/de/werkzeuge/groessentabellen-stricken.astro",
  fr: "src/pages/fr/outils/tableaux-tailles-tricot.astro",
  nl: "src/components/dutch-tools/DutchKnittingSizeChartsPage.astro",
};
const expected = [
  [
    ["40.5;43;45.5;48;50.5", "16;17;18;19;20"],
    ["15.5;17.5;19;20.5;21.5", "6;7;7.5;8;8.5"],
    ["18.5;19.5;21;21.5;22", "7.25;7.75;8.25;8.5;8.75"],
    ["15.5;16.5;19;20.5;21.5", "6;6.5;7.5;8;8.5"],
    ["14;15.5;16.5;17.5;19", "5.5;6;6.5;7;7.5"],
    ["8.5;9;9.5;10;10.5", "3.25;3.5;3.75;4;4.25"],
    ["45.5;48;50.5;52;53.5", "18;19;20;20.5;21"],
    ["48;50.5;50.5;53.5;56", "19;20;20;21;22"],
    ["26.5;29;31.5;35.5;45.5", "10.5;11.5;12.5;14;18"],
  ],
  [
    ["53;58.5;63.5;67;71", "21;23;25;26.5;28"],
    ["21.5;24;26.5;31.5;35.5", "8.5;9.5;10.5;12.5;14"],
    ["23.5;25;26;27;28.5", "9.25;9.75;10.25;10.75;11.25"],
    ["21.5;26.5;29;31.5;34.5", "8.5;10.5;11.5;12.5;13.5"],
    ["17.5;19;20.5;21.5;22", "7;7.5;8;8.5;8.75"],
    ["10.5;12;12.5;14;15.5", "4.25;4.75;5;5.5;6"],
    ["53.5;54.5;57;59.5;62", "21;21.5;22.5;23.5;24.5"],
    ["56;59.5;63.5;71;75", "22;23.5;25;28;29.5"],
    ["45.5;49.5;52;56;61", "18;19.5;20.5;22;24"],
  ],
  [
    ["76;80;82.5", "30;31.5;32.5"],
    ["38;39.5;40.5", "15;15.5;16"],
    ["30.5;31;33", "12;12.25;13"],
    ["38;40.5;42", "15;16;16.5"],
    ["23;23.5;24", "9;9.25;9.5"],
    ["16.5;17.5;19", "6.5;7;7.5"],
    ["63.5;67.5;69.5", "25;26.5;27.5"],
    ["80;83.5;90", "31.5;33;35.5"],
    ["66;68.5;71", "26;27;28"],
  ],
  [
    [
      "71–76;81–86;91.5–96.5;101.5–106.5;111.5–117",
      "28–30;32–34;36–38;40–42;44–46",
    ],
    ["42;43;43.5;44.5;45", "16.5;17;17.25;17.5;17.75"],
    [
      "35.5–37;37–38;39.5–40.5;42–43;44.5",
      "14–14.5;14.5–15;15.5–16;16.5–17;17.5",
    ],
    ["42;43;43;44.5;44.5", "16.5;17;17;17.5;17.5"],
    ["25;26;28;30.5;34.5", "9.75;10.25;11;12;13.5"],
    [
      "15.5–16.5;16.5–17.5;17.5–19;19–20.5;20.5–21.5",
      "6–6.5;6.5–7;7–7.5;7.5–8;8–8.5",
    ],
    [
      "58.5–61;63.5–67.5;71–76;81.5–86.5;91.5–96.5",
      "23–24;25–26.5;28–30;32–34;36–38",
    ],
    [
      "83.5–86;89–91.5;96.5–101.5;106.5–111.5;116.5–122",
      "33–34;35–36;38–40;42–44;46–48",
    ],
    [
      "66–68.5;68.5–70;71–72.5;73.5–75;73.5–75",
      "26–26.5;27–27.5;28–28.5;29–29.5;29–29.5",
    ],
  ],
  [
    ["122–127;132–137;142–147;152–158", "48–50;52–54;56–58;60–62"],
    ["45.5;45.5;47;47", "18;18;18.5;18.5"],
    ["45.5;45.5;47;47", "18;18;18.5;18.5"],
    ["45.5;45.5;47;47", "18;18;18.5;18.5"],
    ["39.5;43;47;49.5", "15.5;17;18.5;19.5"],
    ["21.5–23;23–24;24–25.5;25.5–26.5", "8.5–9;9–9.5;9.5–10;10–10.5"],
    ["101.5–106.5;111.5–114;116.5–119;124–127", "40–42;44–45;46–47;49–50"],
    ["132–134.5;137–139.5;142–144.5;155–157", "52–53;54–55;56–57;61–62"],
    ["76.5–77.5;77.5–79;80–81.5;80–81.5", "30–30.5;30.5–31;31.5–32;31.5–32"],
  ],
  [
    ["86–91.5;96.5–101.5;106.5–111.5;116.5–122", "34–36;38–40;42–44;46–48"],
    ["58.5–61;63.5–66;66–68.5;71", "23–24;25–26;26–27;28"],
    ["39.5–40.5;42–43;44.5–45.5;45.5–47", "15.5–16;16.5–17;17.5–18;18–18.5"],
    ["45.5;47;49.5;50.5", "18;18.5;19.5;20"],
    ["30.5;33;38;39.5", "12;13;15;15.5"],
    ["21.5–23;23–24;24–25.5;25.5–26", "8.5–9;9–9.5;9.5–10;10–10.5"],
    ["71–76;81.5–86.5;91.5–96.5;106.5–112", "28–30;32–34;36–38;42–44"],
    ["89–94;99–104;109–114;119–124.5", "35–37;39–41;43–45;47–49"],
    ["81–82.5;83.5–85;86.5–87.5;89–90", "32–32.5;33–33.5;34–34.5;35–35.5"],
  ],
  [
    ["127–132;137–142;147.5–152;157.5–162.5", "50–52;54–56;58–60;62–64"],
    ["73.5;76;76;79", "29;30;30;31"],
    ["48–51;48–51;51–54.5;56–57", "19–20;20–21;21–21.5;22–22.5"],
    ["52;52;49.5;53.5–54.5", "20.5;20.5;21;21.5"],
    ["42;44.5;47;48", "16.5;17.5;18.5;20"],
    ["28;29;30.5;32", "11;11.5;12;12.5"],
    ["117–122;127–132;137–142;147.5–152.5", "46–48;50–52;54–56;58–60"],
    ["129–134;137–142;142–147.5;147.5–152.5", "51–53;54–56;56–58;58–60"],
    ["91.5–92.5;94–95;96.5–97.5;99–100.5", "36–36.5;37–37.5;38–38.5;39–39.5"],
  ],
  [
    ["23–30.5", "9–12"],
    ["35.5–40.5", "14–16"],
    ["40.5–46", "16–18"],
    ["45.5–51", "18–20"],
    ["51–56", "20–22"],
    ["53–58.5", "21–23"],
    ["56–61", "22–24"],
  ],
  [
    ["7.75–11.5", "3–4.5"],
    ["12–15.25", "4.75–6"],
    ["16.5–19", "6.5–7.5"],
    ["19.75–21.5", "7.75–8.5"],
    ["22.25–24", "8.75–9.5"],
    ["20.25–23", "8–9"],
    ["23.5–25.5", "9.25–10"],
    ["26–28", "10.25–11"],
    ["23.5–25.5", "9.25–10"],
    ["26–28", "10.25–11"],
    ["28.5–30.5", "11.25–12"],
  ],
  [
    ["13", "5"],
    ["15", "6"],
    ["16.5", "6.5"],
    ["18", "7"],
    ["19", "7.5"],
    ["20.5", "8"],
    ["20.5", "8"],
    ["21.5", "8.5"],
    ["23.5", "9"],
  ],
];
const unavailable = new Set([
  "3/8/0",
  "6/2/1",
  "6/2/2",
  "6/3/2",
  "6/3/3",
  "6/4/3",
]);
const unavailableLabels = {
  en: "No verified source value",
  fi: "Ei vahvistettua lähdearvoa",
  sv: "Saknar verifierat källvärde",
  no: "Ingen bekreftet kildeverdi",
  da: "Ingen bekræftet kildeværdi",
  de: "Kein verifizierter Quellenwert",
  fr: "Aucune valeur de source vérifiée",
  nl: "Geen geverifieerde bronwaarde",
};
const hipLabels = [
  "Back Hip Length",
  "Selän pituus lantiolle",
  "Rygglängd till höft",
  "Rygglengde til hofte",
  "Ryglængde til hofte",
  "Rückenlänge bis Hüfte",
  "Longueur dos jusqu’aux hanches",
  "Ruglengte tot heup",
];
const normalize = (s) =>
  s
    .replace(/ cm|"| †/g, "")
    .replaceAll(",", ".")
    .replaceAll("-", "–");
function readPanels(source) {
  const code = source.slice(
    source.indexOf("const c ="),
    source.indexOf("const defaultPanel"),
  );
  const js = ts.transpileModule(code, {
    compilerOptions: { target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const expression = (unit) => {
    const match = source.match(
      new RegExp(`class="unit-${unit}">\\s*\\{([^}]+)\\}`),
    );
    assert.ok(match, `Missing ${unit} renderer`);
    return match[1];
  };
  const render = `panels.forEach(p => p.tables.forEach(t => t.rows.forEach(r => {
    r.cells = r.cells.map(cell => ({rawCm: cell.cm, rawInch: cell.inch, cm: ${expression("cm")}, inch: ${expression("inch")}}));
  }))); panels;`;
  return JSON.parse(JSON.stringify(vm.runInNewContext(js + render)));
}
for (const [languageIndex, [lang, path]] of Object.entries(pages).entries()) {
  const source = readFileSync(path, "utf8");
  const panels = readPanels(source);
  const tables = panels.flatMap((p) => p.tables);
  test(
    lang +
      ": every size-chart value matches independently reviewed CYC evidence",
    () => {
      assert.equal(panels.length, 6);
      assert.equal(tables.length, expected.length);
      tables.forEach((table, ti) => {
        assert.equal(table.rows.length, expected[ti].length, "table " + ti);
        table.rows.forEach((row, ri) => {
          for (const [ui, unit] of ["cm", "inch"].entries()) {
            assert.deepEqual(
              row.cells.map((c) => normalize(c[unit])),
              expected[ti][ri][ui]
                .split(";")
                .map((value, ci) =>
                  unavailable.has(ti + "/" + ri + "/" + ci)
                    ? unavailableLabels[lang]
                    : normalize(value),
                ),
              ti + "/" + ri + "/" + unit,
            );
          }
          row.cells.forEach((cell) => {
            for (const unit of ["cm", "inch"]) {
              assert.equal(
                cell[unit].includes("†"),
                false,
                "withdrawn values must not retain obsolete warning markers",
              );
              if (lang !== "en")
                assert.doesNotMatch(
                  cell[unit],
                  /\d\.\d/,
                  "localized decimal comma",
                );
            }
          });
        });
      });
    },
  );
  for (const key of unavailable) {
    test(lang + ": unavailable in both units at " + key, () => {
      const [ti, ri, ci] = key.split("/").map(Number);
      const cell = tables[ti].rows[ri].cells[ci];
      assert.equal(cell.rawCm, null);
      assert.equal(cell.rawInch, null);
      assert.equal(cell.cm, unavailableLabels[lang]);
      assert.equal(cell.inch, unavailableLabels[lang]);
      assert.doesNotMatch(cell.cm + cell.inch, /[0-9]|NaN|undefined|null|†/);
    });
  }
  test(
    lang +
      ": body endpoints, accessory size conventions and focus remain explicit",
    () => {
      assert.equal(tables[5].rows[1].label, hipLabels[languageIndex]);
      assert.equal(tables[6].rows[1].label, hipLabels[languageIndex]);
      assert.notEqual(tables[0].rows[1].label, hipLabels[languageIndex]);
      assert.match(tables[8].sizeHeader, /US/);
      assert.deepEqual(
        tables[8].rows.map((r) =>
          r.label.match(/US ([0-9.,–]+)/)[1].replaceAll(",", "."),
        ),
        [
          "0–4",
          "5–9",
          "10–13",
          "1–3",
          "4–6",
          "4–6.5",
          "7–9.5",
          "10–12.5",
          "6–8.5",
          "9–11.5",
          "12–14",
        ],
      );
      assert.deepEqual(
        tables[9].rows.slice(0, 3).map((r) => r.label.match(/\d–\d/)[0]),
        ["2–4", "4–6", "6–8"],
      );
      assert.deepEqual(
        tables[9].rows.slice(3).map((r) => r.label.slice(-1)),
        ["S", "M", "L", "S", "M", "L"],
      );
      assert.match(source, /role="tabpanel"\s+tabindex="0"/);
      assert.match(source, /data-mobile-size-label="[^"\n]+"/);
      assert.doesNotMatch(source, /†/);
      assert.match(source, /id="size-source-note"/);
      assert.match(
        source,
        /aria-describedby=\{\s*cell\.cm === null\s*\? "size-source-note"\s*: undefined\s*\}/,
      );
      assert.match(source, /<th scope="col">\{(?:s|size)\}<\/th>/);
      assert.ok(
        source.includes(
          "https://www.craftyarncouncil.com/standards/body-sizing",
        ),
      );
    },
  );
}
