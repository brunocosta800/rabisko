# Rabisko — Design System

> **Rabisko** is a Brazilian tattoo-booking mobile app that connects clients with tattoo artists and studios. The name plays on _rabisco_ (Portuguese for "doodle / scribble") — the brand is built around the idea that a great tattoo starts as a sketch and **transforms your life**.

The product is a single mobile app (~402×874pt frames) serving three user types:

| Role | Portuguese | What they do in the app |
|---|---|---|
| Client | **Cliente** | Searches for artists, books sessions, chats with the artist, pays, generates references with Bisko AI |
| Artist | **Tatuador** | Manages portfolio, takes bookings, replies to messages |
| Studio | **Estúdio** | Manages location, opening hours, the artists working there |

The standout feature is **Bisko AI**, an in-app assistant that helps clients explore styles, generate reference images, and simulate tattoos on the body.

---

## Source materials

- **Figma file:** `Untitled.fig` — mounted as a read-only virtual filesystem during this build. Page `/Page-1` contains 20 top-level frames covering every screen of the app plus dedicated reference frames (`CORES`, `CORES2`, `TIPOGRAFIA`).
- No codebase, no slide deck, no marketing site — Figma was the only source of truth. UI kit components in this system are recreations of those frames, not ports of production code.

The Figma file is the canonical reference. If you find a disagreement between this system and the Figma, **trust the Figma**.

---

## Content Fundamentals

**Language.** Brazilian Portuguese (pt-BR) throughout. All copy in the source is Portuguese; English appears only in product-name fragments (e.g. **BISKO AI**, **Apple Pay**). When extending the system, write Portuguese first and translate only if explicitly asked.

**Voice.** Direct, warm, second-person informal (**você**, not _o senhor / a senhora_). The tone is that of a tattooist talking to a client they already know — confident, encouraging, never corporate. Avoid hype words ("incrível!", "amazing!", exclamation marks); the brand earns trust through calm authority, not enthusiasm.

**Casing.**

- **Bebas Neue is naturally uppercase** — screen titles ("BUSQUE SEU ARTISTA", "BEM-VINDO DE VOLTA", "CONFIGURAÇÕES", "PAGAMENTO", "FINALIZAR RESERVA") render as caps without manual `text-transform`. Treat the typeface as the casing rule.
- **Title Case** on primary CTAs and section headings rendered in Inter / DM Sans ("Iniciar Conversa", "Confirmar Pagamento", "Ver Todos", "Meu Perfil").
- **Sentence case** on body copy, helper text, placeholder text ("Acesse sua conta para continuar gerenciando seu portifólio e agendamentos.", "Artistas, estúdios...").
- **CHIP CAPS** for preference / style chips on the client profile ("REALISMO", "ANIMAIS", "FLORES", "AQUARELA") — Inter Bold tracked.

**Punctuation.** Use proper Portuguese accents (ç, ã, õ, é). Periods end sentences in helper text but are dropped from button labels and chips. Brazilian decimal/currency: `4,9` (rating), `R$ 220,00` (money).

**No emoji.** None appear in the source. Use Iconify icons (see ICONOGRAPHY below) when a glyph is needed.

**Example copy lifted from the source:**

- Landing hero — _"Transforme sua vida com um Rabisko"_
- Welcome (login) — _"Bem-vindo de volta · Acesse sua conta para continuar gerenciando seu portifólio e agendamentos."_
- AI greeting — _"Olá! Inicie uma conversa para criar sua tatuagem personalizada."_
- AI response after a sim — _"Essa é uma simulação em tons de cinza, com visão lateral, se quiser, posso ajustar o tamanho, o posicionamento ou o estilo do desenho."_
- Settings subtitle — _"Gerencie sua conta, pedidos, pagamentos e preferências"_
- Bio sample — _"Tatuador profissional, com trabalhos que transitam entre o minimalismo e o traço mais pesado. @joao.santos"_
- Review sample — _"Atendimento excelente, ambiente seguro e tatuagem com qualidade absurda."_

---

## Visual Foundations

### Colors

A monochrome system anchored on **black ink on cream paper**, plus a single deep plum accent. There are no gradients, no rainbows, no semantic color sets in the source. Tattooing is high-contrast art on skin — the palette honors that.

| Token | Value | Role |
|---|---|---|
| `--rbk-bg` | `#F8F9FA` | Page background — barely off-white, prevents glare |
| `--rbk-surface` | `#EAE0D5` | **Workhorse cream.** Cards, bottom nav, secondary buttons, input fields, AI bubbles |
| `--rbk-ink` | `#000000` | Headlines, icons, primary CTAs, artist cards |
| `--rbk-on-ink` | `#FFFFFF` | Text on black surfaces |
| `--rbk-plum` | `#602C66` | The _only_ accent. Active nav tab, selected calendar day, the "Próxima" booking badge, AI avatar accents |
| `--rbk-indigo` | `#2C4466` | Used once in source; reserved as secondary accent if absolutely needed |
| `--rbk-hairline` | `#D9D9D9` | Dividers, disabled borders |

**Rule of thumb.** A screen has **one** plum element at most — it draws the eye to the next action or the selected state. If you find yourself reaching for plum twice, one of those should be black.

### Type

Three families, sharply separated by job:

- **Bebas Neue Regular** — display & screen titles. ALWAYS UPPERCASE (the font is). Used at 64px for the wordmark, 32px for screen titles, 20px for card eyebrows ("BISKO AI"). Tight letter-spacing (`.01em`).
- **Inter** — workhorse for body, labels, buttons, placeholders. Sizes 10–24px. Weights 300 (timestamps), 400 (body), 700 (buttons / emphasis).
- **DM Sans** — auxiliary for "human-name" headings on profile screens (e.g. **João Santos** at 32px Bold) and a few section headings ("Sobre", "Histórico de tatuagens"). Softer, friendlier counterforms than Inter — use when the content is about a _person_.

### Surfaces, cards, borders

- **Cards** are flat cream rectangles with **no shadow** and **no border**. Radius is `16px` for content cards, `32px` (pill) for input fields and primary CTAs. Nested elements inside cards use `8px` radius.
- **Borders** are reserved for outlined chips (1px black) and disabled inputs. Most surfaces lean on the bg/surface contrast alone.
- **Shadows.** The reference has effectively none. Don't invent elevation. If you absolutely must, use `--sh-1` (a 1px hairline shadow) and reserve `--sh-2` for floating menus.

### Imagery

- **Photographs are warm, desaturated portrait and tattoo work** — moody studio lighting, neutral backgrounds. No filters, no duotones. Subjects are tattooists and tattooed clients; the imagery does the cultural work of placing the brand inside tattoo culture.
- **Full-bleed photos** are rare; images appear inside cards (cropped to circle for avatars, 32px-radius squares for portfolio thumbs at ~120px).
- **No illustration, no patterns, no textures.** The cream surface _is_ the texture. Don't add noise, paper grain, or hand-drawn flourishes — that would compete with the real ink in the photos.

### Backgrounds

Solid color only. The bg/surface contrast is the entire layering system: page is `--rbk-bg` (off-white), cards are `--rbk-surface` (cream), CTAs and selected-state items are `--rbk-ink` (black) or `--rbk-plum`. Don't tint, don't blur, don't gradient.

### Layout rules

- **Frame:** mobile portrait, 402×874pt (matches a tall iPhone). The bottom nav is a fixed `80pt` cream bar.
- **Edge padding:** 32pt left/right on most screens.
- **Vertical rhythm:** 8pt grid. Screen title sits 64pt from top, subtitle 110pt, content blocks 160pt+.
- **Bottom nav** is always visible except possibly in immersive flows; never hide it for marketing reasons.
- **Back chevron** lives top-left at 32,32 (24×24 icon inside a 32×32 hit area) — black, no circle, no label.

### Hover / press / motion

The Figma doesn't encode states explicitly. Apply these conservative defaults:

- **Hover** on dark buttons: lighten background to `--rbk-ink-soft` (#1A1A1A).
- **Hover** on cream surfaces: nudge to `#F2EBE0` (`--rbk-surface-2`).
- **Active / pressed:** scale to `.97` and drop opacity to `.9`.
- **Selected** (nav item, calendar day, chip): swap to `--rbk-plum`. This is the brand's signal that a thing is "on".
- **Transitions:** 120ms `--ease-out` for color/opacity, 220ms for transforms. Never bounce. Tattoos heal slow; the UI moves calmly.

### Transparency & blur

Not used in source. Reserve `backdrop-filter: blur` only for modal overlays if absolutely needed; the rest of the system is fully opaque.

---

## Iconography

The Figma uses **Iconify** icons (Boxicons, Solar, Majesticons, Line MD, Tabler, MDI, IcRound, Fluent, Famicons, Mage, Mingcute, Ion, Weui, etc.) at three working sizes: **16px** (inline / inside inputs), **24px** (chevrons / actions in cards), and **48px** (bottom nav).

**Approach in this system:** load icons live from the Iconify CDN as inline SVG via the official web component or `<img>` tag. This is faster and more honest than maintaining a local sprite of mixed-set icons.

```html
<!-- Web component (preferred) -->
<script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
<iconify-icon icon="boxicons:home-filled" width="48" style="color: var(--rbk-ink)"></iconify-icon>

<!-- Or as an img -->
<img src="https://api.iconify.design/solar/settings-bold.svg?color=%23602C66" width="48" height="48" alt="">
```

**Canonical icon set** (lifted from the Figma usage counts):

| Concept | Iconify slug |
|---|---|
| Home (nav) | `boxicons:home-filled` |
| Chat (nav) | `majesticons:chat` |
| Calendar (nav) | `line-md:calendar` |
| Settings (nav) | `solar:settings-bold` |
| Back chevron | `ion:chevron-back-outline` |
| Forward chevron | `ic:round-chevron-right` |
| Search | `tabler:search` |
| Filter | `mdi:filter` |
| Star (rating) | `ic:round-star` |
| AI sparkles | `bi:stars` / `mage:stars-c-fill` |
| Mail | `famicons:mail` |
| Lock | `boxicons:lock-filled` |
| Hide password | `weui:eyes-off-filled` |
| Clock | `tabler:clock-filled` |
| Pin / location | `icon-park-solid:local` |
| Pix (BR payment) | `ic:baseline-pix` |
| Card | `solar:card-bold` |
| Apple Pay | `fa6-brands:apple-pay` |
| Send | `wordpress:send` |
| Pencil (edit) | `mingcute:pencil-fill` |
| Bell (notifications) | `mynaui:bell-solid` |
| User avatar | `qlementine-icons:user-16` |
| Help | `material-symbols:help-rounded` |
| Move / drag | `mingcute:move-line` |
| Rotate | `tabler:rotate-2` |
| Scale-to-fit | `fluent:scale-fill-20-filled` |
| Crop | `icon-park:cutting` |
| AI magic-wand | `mdi:magic` |
| Add (chat) | `fluent:chat-add-16-filled` |

**Coloring.** Icons are single-color, `currentColor`-driven. Black (`--rbk-ink`) by default; plum (`--rbk-plum`) when the icon represents the active/selected nav tab.

**Substitution flag.** No icons are checked into the repo — the system loads them all from the Iconify CDN. If you need to ship fully offline, mirror the SVGs locally with `<your-app>/icons/<set>-<name>.svg`.

**No emoji. No unicode characters used as icons.**

---

## Fonts — substitution flag

The source uses **Bebas Neue**, **Inter**, and **DM Sans**. All three are Google Fonts and are loaded directly from `fonts.googleapis.com` in `colors_and_type.css`. **No font files are bundled locally** in this build; if you need offline operation, mirror them into `fonts/`. There are no proprietary brand fonts to ask the user for — the Figma uses standard Google Fonts as the rendered text.

---

## Index — what's in this folder

```
README.md                ← this file
SKILL.md                 ← packaged-skill manifest (Claude Code compatible)
colors_and_type.css      ← all CSS variables + element defaults

assets/                  ← logos, photos, brand imagery (lifted from Figma)
  logo-bisko-mark.png      Wordless mark — for splash / loading
  logo-bisko-mark-2.png    Same mark on transparent bg
  portrait-artist.png      Reference portrait (used for João Santos card)
  tattoo-work-1.png        Portfolio sample (sleeve)
  tattoo-work-2.png        Portfolio sample (linework)

preview/                 ← Design System cards (Type / Colors / Spacing / Components / Brand)

ui_kits/
  mobile-app/              The Rabisko mobile app, recreated
    README.md
    index.html             Click-thru prototype (Landing → Login → Home → Profile → Booking → Pay)
    components/            JSX components used by index.html
```

---

## Index — manifest

```
README.md                 ← this file (start here)
SKILL.md                  ← packaged-skill manifest
colors_and_type.css       ← all design tokens + base element styles

assets/                   ← brand-lifted imagery
  logo-bisko-mark.png       Bisko wordless mark
  logo-bisko-mark-2.png     Bisko mark, transparent bg
  portrait-artist.png       Artist portrait
  tattoo-work-1.png         Portfolio sample
  tattoo-work-2.png         Portfolio sample

preview/                  ← Design System tab cards (Brand / Colors / Type / Spacing / Components)

ui_kits/
  mobile-app/               Rabisko mobile app recreation
    README.md
    index.html              Click-thru prototype
    components/             Frame · BottomNav · Header · Button · Field ·
                            Chip · ArtistCard · CalendarMini · Screens
```

## Caveats & assumptions

- **States not in Figma.** Hover / press / disabled / focus styles were not encoded in the source. The values in this system are educated guesses consistent with the visual language; please confirm with the user before shipping production code.
- **No marketing surface.** The Figma is entirely the in-app product. If asked to make a landing page or marketing site, ask the user for direction — the current visual vocabulary is built for a 402pt phone canvas, not a 1440pt desktop hero.
- **AI feature copy is sparse.** "Bisko AI" appears as a chat partner with a sparkle mascot, but only two sample messages exist in the source. Treat its persona (warm Portuguese, technical-but-friendly) as best inferred, not officially documented.
- **One studio shown.** Studio (`Estúdio`) profile is implied by `Perfil-Studio` but lightly designed in the Figma; the mobile UI kit focuses on Client and Artist flows.
