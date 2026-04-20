# Add closing CTA section to both tool pages

Add a closing/CTA section to both calculator pages, positioned between the existing content and the footer. This should match the style of the landing page's closing section (AtmosphereImage.astro) but lighter — no tagline, just a short CTA.

## Structure for both pages

- Full-width background image with dark overlay (same treatment as the landing page closing section)
- Centered text: "Get the full toolkit" (Playfair Display, same style as section headings)
- Gold solid CTA button below, linking to the Play Store (same link as the navbar GET THE APP)
- "Coming soon on Android" text below the button (same as landing page)

## Images

- **Cast On Calculator:** use the existing craft-table-flatlay.png from the root folder
- **Yarn Estimator:** use yarn-skeins-flatlaye.png from the root folder
- Transform the png images to webp first

## Notes

- Keep the same dark overlay opacity and blur as the landing page closing section
- Respect prefers-reduced-motion
- The section should be responsive — works on both mobile and desktop
- Reuse a shared component if it makes sense, since both pages use the same structure with only the image differing
