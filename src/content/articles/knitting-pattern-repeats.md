---
title: "Knitting pattern repeats explained"
browserTitle: "Knitting Pattern Repeats: Asterisks & Brackets"
description: "Understand how repeats work in knitting patterns. Clear examples of asterisk, bracket, and nested repeats, plus how to handle remainders and multi-row repeats."
category: "techniques"
categoryOrder: 6
publishDate: "2026-05-01"
tags:
  - "knitting pattern repeats"
  - "asterisk knitting pattern"
  - "bracket repeat knitting"
  - "how to read knitting repeats"
updatedDate: 2026-10-18
---

A 200-stitch row of `k2, p2` contains 50 executions of that four-stitch group. Writing `*k2, p2; rep from * to end` saves writing the group out 50 times. Each knit or purl uses one original stitch and leaves one stitch; the row still has 200 stitches.

The examples below use the repeat conventions described by the [Craft Yarn Council](https://www.craftyarncouncil.com/standards/how-to-read-knitting-pattern). Punctuation is not a universal code: read the pattern's own definitions. A stitch-pattern repeat is a unit of stitches and sometimes rows; repeating an action does not necessarily repeat a whole stitch pattern. Each example here is separate, with no extra edge stitches unless stated.

## Asterisk repeats

Here a single asterisk marks the start; the following repeat instruction specifies the endpoint. Paired stars `* ... *` can enclose a group. A double asterisk `**` can mark another reference point: follow the instruction that names it, rather than assuming it means “twice.”

**Basic repeat:** `*K3, p1; rep from * to end.`

With 12 stitches, work `k3, p1` three times. Each group uses and produces 4 stitches; 8, 4, then 0 original stitches remain. Final count: 12. The formula is 4n, where n is the total number of groups.

**With remainders:** `K1, *k2, p2; rep from * to last 3 sts, k3.`

Start with 20 stitches: knit 1, work `k2, p2` four times, then knit the last 3. The unworked count is 19, 15, 11, 7, 3, then 0; the final count is 20. Formula: 1 + 4n + 3 = 4n + 4. Those four outside stitches are already included; do not add them again as a border. They are deliberately reserved, not accidental leftovers, and outside stitches do not always make a pattern symmetrical.

**With a count:** `*Yo, k2tog; rep from * 5 more times.`

“5 more times” means one initial execution plus five additional executions: six total. With 12 starting stitches, each yarn over uses 0 and produces 1; each k2tog uses 2 and produces 1. Work `yo, k2tog` six times, leaving 10, 8, 6, 4, 2, then 0 original stitches and 12 stitches in total. “Repeat 5 times” without “more” needs the publisher's convention and context; stitch arithmetic is a cross-check, not permission to guess.

## Bracket and parenthesis repeats

More visual than asterisks.

**Brackets:** `[K1, p1] 4 times.`

Here the group is worked four times in total: `k1, p1, k1, p1, k1, p1, k1, p1`. Start and finish with 8 stitches; each pair uses and produces 2. This interpretation comes from the wording used here, not from brackets alone.

**Parentheses:** `(K2tog, yo) across.`

Here the parentheses group separate operations across the row. With 8 stitches, work `k2tog, yo` four times: 2→1 followed by 0→1, so 8→8 with none left. Elsewhere, “(k1, p1, k1) into the next stitch” means all three operations into one original stitch, keeping it on the left needle until the last operation: 1→3. Parentheses can also list alternative sizes; choose your size's value rather than repeating the list.

**Mixed notation:** `K2, [k1, p1] 3 times, *k4, p2; rep from * to last 2 sts, k2.`

Start with 22 stitches: `k2`, then `k1, p1` three times (6 stitches), then `k4, p2` twice (12 stitches), then `k2`. Unworked stitches: 20, 14, 8, 2, 0. The fixed bracket group occurs once before the starred section; it is not repeated with that section. Formula: 2 + 6 + 6n + 2 = 6n + 10; final count 22.

## Nested repeats

Sometimes a repeat lives inside another repeat. Usually in complex lace or colorwork.

`*[K1, p1] 3 times, k2tog, yo; rep from * to end.`

For 16 starting stitches, expand the outer group to `k1, p1, k1, p1, k1, p1, k2tog, yo` and work that entire sequence twice. Each inner pair uses/produces 2, then k2tog is 2→1 and yo is 0→1: each outer group is 8→8. There are six inner pairs altogether, two decreases and two yarn overs; final count 16, no remainder. “3 times” applies only to the bracketed pair.

Read nested repeats from the inside out. Resolve the bracket first, then treat the full asterisk section as your repeating unit.

## Set-up rows and established patterns

A set-up row prepares the stitch arrangement before a repeat. In this separate 18-stitch example, work `k2, *p2, k2; rep from * to end`: knit 2, then work `p2, k2` four times. That uses and produces 2 + 4 × 4 = 18 stitches.

Here the set-up row is worked once and is excluded from the subsequent numbered cycle. Follow the actual pattern if it specifies more preparation rows.

“As established” means maintaining the pattern's alignment and row sequence while carrying out the stated shaping. It does not mean restarting the repeat or knitting every row the same way.

## Multi-row repeats

For a separate flat-knitting practice example, start with 16 stitches, no extra edges, and call the first right-side row row 1:

```text
Rows 1–4: *K2, p2; rep from * to end.
Row 5: Knit.
Row 6: Purl.
Repeat rows 1–6 as instructed.
```

Each of rows 1–4 contains four `k2, p2` groups; row 5 knits all 16 and row 6 purls all 16. Every row is 16→16. Turn after each row. Here rows 1–4 form ribbing; rows 5–6 form a stockinette band. These are flat rows, not interchangeable instructions for rounds.

Rows 1–6 include six rows. Three complete executions are 18 rows, ending with cycle row 6. After the first six rows, three **more** executions give 24 rows. “Repeat the last 2 rows” after row 6 refers to rows 5–6; “repeat rows 3–4” names a different pair. Each pair contains two rows. A length target such as 10 inches does not determine a row total without row gauge and a specified finishing row.

KnitTools' [Row Counter](/) can show your position in a repeat section that you configure. You enter the range and repetitions and advance the counter yourself; this is not automatic interpretation or correction of pattern text. A paper tally also works.

## Stitch markers for repeats

Markers between repeats help you check a section's expected stitch count. They do not prove where an error occurred: the boundary may have shifted, or an earlier row may be wrong. Check both the count and the stitch arrangement before undoing anything.

A lace repeat need not preserve its count on every row. Use that row's expected consumption and output, and follow instructions for moving markers or working across a boundary. A matching total alone cannot detect a missed yarn over paired with a missed decrease.

In nested patterns, two colors of markers help. One color marks the outer repeat boundaries, another marks inner repeats. The first time you use this for a complex stole or shawl, the habit stops feeling fussy and starts feeling necessary.

## Charts with repeat boxes

Repeat boxes identify a group according to the chart notes. Unboxed stitches may be worked once before and after it, or the pattern may assign different panels or size-specific starting points. Do not automatically treat everything outside a box as an edge.

A common convention reads charts bottom to top: right-side rows right to left, wrong-side rows left to right; rounds right to left when the right side faces throughout. Follow the row labels and the key's right/wrong-side meanings. Work omitted rows as the text directs; do not skip them.

Horizontal repetition stays on the same chart row. Vertical repetition returns to the first row of the specified range only after completing its last row, including any intervening uncharted rows. Follow any new starting point or marker movement on the next row or round.

Chart width is not automatically the number of live stitches: a decrease uses several stitches, a yarn over uses none, and a cell explicitly defined as “no stitch” uses/produces 0. Skip that cell in the chart, not a stitch on the needle. The [Tin Can Knits chart guide](https://blog.tincanknits.com/2014/06/06/how-to-read-a-knitting-chart/) explains reading direction and repeat boundaries.

## Lifelines for complex repeats

A lifeline is a smooth contrasting thread passed through all live stitches at a checked point. Leave the stitches on the needle, include yarn-over loops, avoid threading through stitch markers, and secure the ends against slipping out.

Choose a row you can identify and check, such as the end of a repeat, and note its number. There is no universal 10–20-row interval or ban on yarn-over rows. If you unravel to the lifeline, return every loop to the needle and check its orientation and count before continuing.

## Half-drop and other shifted repeats

Some patterns move the repeat's starting point between rows. A horizontal half-drop shifts the motif by half its width; the pattern determines when it occurs. Not every shift is half a repeat.

For a complete flat example on 16 stitches, define A as `k3, p5` (8→8):

```text
Row 1 (RS): work A twice.
Row 2 (WS): purl all 16 stitches.
Row 3 (RS): k3, work A once, k5.
Row 4 (WS): purl all 16 stitches.
Repeat rows 1–4.
```

Row 1 is `k3, p5, k3, p5`; row 3 is `k3, k3, p5, k5`. Both use and produce 16 stitches, with none left. The start of A moves by 3 stitches, not half its width (4). Rows 2 and 4 are included; after row 4 return to row 1. Check any unexpected shift against the specified row, not just a similar-looking earlier section.

## When the math doesn't work

If you follow the repeat and end up with leftover stitches (or run out too early), something's off.

1. Check your stitch count. Count live stitches on the needle. Does it match what the pattern says for your size?

2. Check the repeat's input width. For `k3, p2`, each group uses/produces 5 stitches. With no edges, 15 stitches give three groups and finish at 15. In general: starting count = stitches before + n × input width + stitches after. A separate border is added only if it is not already included. With shaping, calculate the output separately for each row.

3. Check the size notation. In a multi-size pattern, it's common to grab the wrong number from a parenthetical string.

4. Check the pattern version and the publisher's official errata. Other knitters' project notes can offer clues, but do not replace a correction from the publisher. If the wording still permits incompatible readings, ask the publisher rather than forcing the arithmetic.

For the broader context on [reading knitting patterns](/articles/how-to-read-knitting-pattern/), including sizes, abbreviations, and charts, that's covered separately.

## FAQ

**What does "rep from \* to last X sts" mean?**
Work complete groups until X original stitches remain unworked, then follow the ending instruction. Do not start a group that would consume those reserved stitches. If the count does not fit, check the instructions rather than inventing a partial repeat.

**Do I count the first time through?**
“One initial execution, then 3 more” gives 4 total; for the two-stitch `yo, k2tog` group, that is 8→8. Three executions total would be 6→6. Without “more,” check the publisher's definition and context; the stitch count alone does not always settle an ambiguous instruction.

**How do I track my place in a long repeat?**
Use markers where the pattern's boundaries permit them, and record both the total row and the row within the cycle. A marker is a checkpoint, not a command to restart the entire pattern.

**Why asterisks vs brackets?**
They are grouping conventions chosen by the publisher. Here `[k1, p1] 4 times` means four total executions. Brackets alone do not override words such as “more,” and parentheses may also mean sizes or several operations in one stitch.

**Can I add a lifeline mid-row?**
For the method described here, use a complete, verified row. If you notice an error mid-row, resolve it before choosing a lifeline row; do not finish an incorrect row just to insert one. Record the row and include all live loops.

**What if my repeat shifts unexpectedly?**
Check the row number, repeat boundaries, shaping and any stated offset or marker movement. A matching stitch count or resemblance to an earlier row does not by itself prove the pattern is correct. Locate the error before choosing how far to undo.
