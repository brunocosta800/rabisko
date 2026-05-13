# Rabisko · Mobile App UI Kit

Recreation of the Rabisko tattoo-booking mobile app, lifted from the Figma source.

## What's in here

- **`index.html`** — interactive click-thru prototype framed inside an iOS device bezel. Tap through:
  Landing → Login → Home (search) → Artist Profile → Booking (calendar + summary) → Payment → Chat (Bisko AI).
- **`components/`** — JSX components used by the prototype. They are loaded as separate Babel files in order.

## Components

| File | Description |
|---|---|
| `Frame.jsx` | The 402×874 mobile frame + bottom nav, the wrapper every screen uses. |
| `BottomNav.jsx` | Cream 80pt bar with Home / Chat / Calendar / Settings. Marks the active tab in plum. |
| `Header.jsx` | Back chevron + Bebas Neue screen title (32pt). |
| `Button.jsx` | Primary pill (black on cream), secondary, and small variants. |
| `Field.jsx` | Pill-shaped input with leading icon + optional trailing icon. |
| `Chip.jsx` | Cream filter chips, black preference chips, plum status chips. |
| `ArtistCard.jsx` | Big black artist card with rating + style tags + cream footer. |
| `CalendarMini.jsx` | The little month calendar used on the booking screen. |
| `Screens.jsx` | Each top-level screen: Landing, Login, Home, ArtistProfile, Booking, Payment, Chat. |

## Caveats

The components are **cosmetic recreations**, not production code — no form validation, no real navigation library, fake calendar logic. State is a single React `screen` string switched by tap targets. Use them as a starting place for high-fi mockups and motion explorations.
