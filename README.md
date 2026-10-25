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

## Application link

All Apply buttons read `APPLY_URL` from `lib/config.ts`. Paste the Notion form link there and the buttons open it in a new tab. Leave it empty to keep the built-in form below.

```ts
export const APPLY_URL = 'https://www.notion.so/...'
```

## Application webhook (built-in form)

The form posts to `/api/apply` (a Next.js route handler) which accepts a `multipart/form-data` payload (name, email, project name, one-line description, video file, optional notes) and forwards it to the URL in `DISCORD_WEBHOOK_URL`.

Create `.env.local`:

```
DISCORD_WEBHOOK_URL=https://your-endpoint.example.com/ingest
```

If unset, the route **logs the parsed payload to the server console** and returns success — handy for local UI testing without standing up the receiver.

> The endpoint is a placeholder. The current plan is to wire it to a small script running on the Mac Mini that drops applications into Discord or storage.

## Body size

Route handlers in self-hosted Next.js have no body-size limit, so 100 MB uploads work locally. On Vercel, serverless functions cap requests at ~4.5 MB by default — for large videos, host this route on a long-running server (the Mac Mini) rather than on Vercel's edge.

## Structure

```
app/
  layout.tsx          fonts, ModalProvider, shared modal mount
  page.tsx            composes sections
  globals.css         Tailwind + base styles
  api/apply/route.ts  form receiver
lib/
  config.ts           APPLY_URL – application link (Notion)
components/
  SiteHeader.tsx      sticky header: Microfund lockup + Apply
  Hero.tsx
  WhatItIs.tsx
  Stats.tsx
  HowItWorks.tsx
  Manifesto.tsx
  ApplyCTA.tsx
  Footer.tsx          "In cooperation with" Spinoff Factory · TU Wien
  ApplyButton.tsx
  ApplyModal.tsx
  ModalContext.tsx
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
