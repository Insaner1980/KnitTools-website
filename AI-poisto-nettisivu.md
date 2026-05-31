# Obsidian-artikkelien tuonti Astro-sivustoon

## Summary

Päivitetään englanninkieliset Astro-artikkelit ObsidianVaultin uusista SEO-artikkeliversioista kansiosta `C:\Users\emmah\Documents\ObsidianVault\Projects\Active\KnitTools\Website\SEO\Articles`.

Käytetään artikkeleita numeroilta 04-41. Jos samasta numerosta on `-v2.md`, käytetään aina sitä. Muuten käytetään numerollista perusversiota. Vanhoja rinnakkaisversioita, `_NOTES-article-11-expansion.md`-tiedostoa, `.claude/`-kansiota ja `.remember/`-kansiota ei tuoda.

Astro-dokumentit tarkistettu suunnittelua varten: [Content collections](https://docs.astro.build/en/guides/content-collections/) ja [Markdown content](https://docs.astro.build/en/guides/markdown-content/).

## Key Changes

- Päivitä nykyiset `src/content/articles/*.md`-artikkelit Obsidian-sisällöillä. Slug muodostetaan poistamalla numeroprefix ja `-v2`, esim. `06-increase-decrease-evenly-v2.md` → `src/content/articles/increase-decrease-evenly.md`.
- Säilytä nykyisestä Astro-frontmatterista `category`, `categoryOrder`, `publishDate`, `tags`, `lang`, `translationKey`, `draft` ja mahdollinen nykyinen `updatedDate`. Älä lisää uutta `updatedDate`-kenttää tässä työssä.
- Muunna Obsidianin metadata näin:
  - `# H1` → Astro `title`
  - `META DESCRIPTION` → Astro `description`
  - `TITLE TAG` → uusi Astro `browserTitle`
  - `PRIMARY KEYWORD`, `SECONDARY KEYWORDS`, `ARTICLE TYPE`, `TARGET WORD COUNT`, `INTERNAL LINKS` → ei julkaista bodyyn eikä frontmatteriin
- Lisää `browserTitle?: string` content collection -skeemaan ja välitä se article-reitiltä `ArticleLayout`in kautta `PageLayout`ille. Kortit ja sivun näkyvä H1 käyttävät edelleen `title`-kenttää.
- Poista julkaistavasta Markdown-bodysta Obsidianin alun HTML-kommenttiblokki, mahdollinen Obsidian-YAML ja ensimmäinen `# H1`, koska Astro renderöi H1:n layoutista.
- Normalisoi sisäiset linkit:
  - `/some-article-slug` → `/articles/some-article-slug/`, jos slug on englanninkielinen artikkeli
  - `/tools/...` → säilytetään tool-linkkinä ja lisätään trailing slash
  - erityismappaukset: `/knitting-gauge-swatch` → `/articles/gauge-swatch-step-by-step/`, `/needle-size-chart` → `/tools/needle-size-chart/`, `/yarn-weight-chart` → `/tools/yarn-weight-chart/`
- Pidä scope vain englanninkielisissä artikkeleissa. Älä koske lokalisoituihin artikkeleihin, `articleTranslations`-karttaan tai reitteihin, koska kaikki 04-41 slugit vastaavat jo olemassa olevia englanninkielisiä Astro-artikkeleita.

## AI-Poiston Sisältölinja

- Poista tai muotoile Obsidian-sisällöstä kaikki KnitTools-lupaukset, jotka viittaavat AI:hin, OCR:ään, scanneriin, kameraan, ääneen, mikrofoniin, transcriptiin, parseriin, automaattiseen pattern-tulkintaan tai project summaryihin.
- Tunnetut tarkat riskikohdat ennen toteutusta:
  - `09-how-to-read-yarn-label.md`: Yarn Label Scanner / camera -kappale poistetaan.
  - `12-identify-mystery-yarn.md`: Yarn Label Scanner -maininta poistetaan tai korvataan manuaalisella yarn card / project notes -muotoilulla.
  - `31-best-knitting-apps.md`: label scanner, camera scanning, AI-powered tools, microphone, AI instruction parser ja yarn scanning poistetaan; KnitTools-kappale kirjoitetaan vain hyväksytyillä ei-AI-ominaisuuksilla.
  - `36-free-knitting-calculators.md`: yarn label scanning ja voice commands poistetaan app-kappaleesta.
  - `37-organize-knitting-projects.md`: scanning / Yarn Label Scanner -kappale poistetaan tai muotoillaan manuaaliseksi label-tietojen tallentamiseksi.
- Sallittuja ei-AI-ominaisuuksia: row counter, multiple counters, project management, session history, pattern viewer / saved PDF patterns, Ravelry, calculators, reference library, project notes, progress photos, project stats/session tracking, rows per hour, home-screen widget.
- Vältä myös liioittelevia muotoiluja kuten `everything a working knitter needs`, `complete toolkit`, `every tool`, ellei lause selvästi rajoitu artikkelin omaan aiheeseen.

## Test Plan

- Ennen buildiä aja lähdehaku englanninkielisiin artikkeleihin:
  ```powershell
  rg -n -i "\b(ai|a\.i\.|artificial intelligence|machine learning|llm|gpt|openai|ocr|voice|mic|microphone|transcript|camera|scanner|scanning|aloud|instruction parser|project summaries|voice command|yarn scanner|pattern help)\b" src/content/articles/*.md
  ```
  Odotus: ei osumia julkaistaviin englanninkielisiin artikkeleihin.
- Aja Obsidian-metadata- ja H1-jäämähaku:
  ```powershell
  rg -n "TITLE TAG|META DESCRIPTION|PRIMARY KEYWORD|SECONDARY KEYWORDS|ARTICLE TYPE|TARGET WORD COUNT|INTERNAL LINKS|<!--|-->|^# " src/content/articles/*.md
  ```
  Odotus: ei osumia.
- Aja sisäisten linkkien tarkistus:
  ```powershell
  rg -n --pcre2 "\]\(/(?!articles/|tools/|about/|$)" src/content/articles/*.md
  ```
  Odotus: ei virheellisiä root-artikkelilinkkejä.
- Aja projektin tarkistus:
  ```powershell
  npm run verify
  ```
- Buildin jälkeen tarkista renderöidyt englanninkieliset artikkelit:
  ```powershell
  rg -n -i "\b(ai|ocr|voice|mic|microphone|transcript|camera|scanner|scanning|instruction parser|project summaries|voice command|yarn scanner|pattern help)\b" dist/articles
  ```
  Odotus: ei osumia.
- Tee selaimessa pistokoe: `/articles/`, yksi v2-päivitetty artikkeli, `best-knitting-apps`, `organize-knitting-projects` ja `track-knitting-time`. Tarkista H1, meta title, kuvaus, linkit, artikkelikortit ja ettei Obsidian-metadata näy.

## Assumptions

- ObsidianVault on sisältölähde, mutta Astro-frontmatter ja julkiset URLit pysyvät repon nykyisen rakenteen mukaisina.
- Numero 41 ei ole uusi URL, vaan päivittää nykyisen `track-knitting-time.md`-artikkelin.
- Julkaisupäivämäärät säilytetään nykyisistä Astro-artikkeleista, jotta vanhojen julkaistujen sivujen metadata ei muutu ilman erillistä päätöstä.
- AGENTS.md- tai memory-päivitystä ei tarvita, koska tämä on sisältötuonti ja pieni content schema -laajennus, ei arkkitehtuurin tai datavastuiden muutos.
