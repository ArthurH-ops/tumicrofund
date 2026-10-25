# TU Microfund — Landing

Single-page landing site. **Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion.**
Styled with the **TU Microfund design system** (sister system of the TU Student Incubator; part of The Spinoff Factory, TU Wien).

## Run

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Build & start

```bash
npm run build
npm start
```

## Application form

The questionnaire is a **Notion form**, embedded in a modal so applicants never leave
the site. Responses land directly in the Notion database behind the form — nothing
passes through this app, and there is no backend to run or deploy.

The embed URL lives at the top of `components/ApplyModal.tsx`:

```ts
const FORM_URL = 'https://sprinkle-celery-f30.notion.site/ebd/<form-id>'
```

To swap in a different form, copy its embed link from Notion (Share → Embed) and
replace that constant. Use the `/ebd/<id>` form of the URL.

Two things are outside our control, since the frame is cross-origin:

- **Theme** — the embed follows the *viewer's* OS light/dark setting. It cannot be
  forced from this page; `?theme=light` is ignored.
- **Notion's own chrome** — the cookie notice and "Get Notion free" button inside the
  frame are Notion's, and only disappear on a paid Notion plan.

Notion sets its own cookies inside that frame, which is why `/privacy` names Notion
as a processor. Keep that page in step with whatever the form collects.

## Application link (optional)

All Apply buttons read `APPLY_URL` from `lib/config.ts`. It is empty by default, which
is what makes the buttons open the embedded form above. Set it to a URL and they become
plain links to that URL in a new tab instead.

```ts
export const APPLY_URL = 'https://www.notion.so/...'
```

## Structure

```
app/
  layout.tsx          fonts, ModalProvider, shared modal mount
  page.tsx            composes sections
  globals.css         Tailwind + base styles
  impressum/page.tsx  legal disclosure
  privacy/page.tsx    privacy policy
lib/
  config.ts           APPLY_URL – optional external application link
components/
  SiteHeader.tsx      sticky header: Microfund lockup + Apply
  Hero.tsx
  WhatItIs.tsx
  Stats.tsx
  HowItWorks.tsx
  Manifesto.tsx
  ApplyCTA.tsx
  Footer.tsx          "In cooperation with" Spinoff Factory · TU Wien
  ApplyButton.tsx     opens the modal (or links out if APPLY_URL is set)
  ApplyModal.tsx      modal hosting the embedded Notion form
  ModalContext.tsx
  LegalLayout.tsx     shell for /impressum and /privacy
  Asterisk.tsx        brand asterisk
  Eyebrow.tsx         asterisk + tracked caps section label
public/logos/
  microfund.svg              stack lockup (asterisk + MICRO / FUND)
  spinoff-factory-tuwien.svg partner lockup (footer only)
  favicon.svg, apple-touch-icon.png
```

## Design tokens

From the TU Microfund design system (`tokens/colors.css`, `typography.css`, `spacing.css`), mapped in `tailwind.config.ts`.

| Token        | Value     | Use                                         |
| ------------ | --------- | ------------------------------------------- |
| brand        | `#FCEE64` | primary: hero, highlights, last step, focus |
| brand-deep   | `#F3DC35` | asterisk watermark, hover on yellow         |
| brand-ink    | `#574C00` | link hover on white                         |
| brand-pale   | `#FFF6BF` | soft yellow backgrounds                     |
| ink          | `#111010` | text, 1.5px outlines, primary buttons       |
| paper        | `#FFFFFF` | page background                             |
| stone        | `#EEEFEA` | quiet surfaces, button hover                |
| hairline     | `#D5D6D0` | 1px rules                                   |

Outlines `1.5px` (Tailwind `border`), corners `8px` (`rounded-md`) / `12px` (`rounded-lg`), no shadows.

Display font: **Space Grotesk** · Body: **Inter** (both via `next/font/google`).
