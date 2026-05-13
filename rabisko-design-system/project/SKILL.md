---
name: rabisko-design
description: Use this skill to generate well-branded interfaces and assets for Rabisko, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation

- `README.md` — full company / product / content / visual / iconography overview
- `colors_and_type.css` — drop-in CSS with all design tokens and base element styles. Import as the first stylesheet on any new artifact.
- `assets/` — logos, photography
- `preview/` — example renderings of each token group
- `ui_kits/mobile-app/` — JSX recreation of the Rabisko mobile app with an interactive prototype. Start here when mocking screens.

## When in doubt

- Brazilian Portuguese (pt-BR) for all copy.
- Black ink on cream surface is the default. Use plum (`#602C66`) **once** per screen for a single accent.
- Bebas Neue for screen titles (renders uppercase). Inter for body. DM Sans for human names.
- Icons load from the Iconify CDN — see `README.md` for the canonical slug map.
- No emoji. No gradients. No drop-shadow elevation.
