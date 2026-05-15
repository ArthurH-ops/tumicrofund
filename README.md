# The 1040 Voucher — Landing

Single-page landing site. **Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion.**

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

## Application webhook

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
components/
  Hero.tsx
  WhatItIs.tsx
  Stats.tsx
  HowItWorks.tsx
  Manifesto.tsx
  ApplyCTA.tsx
  Footer.tsx
  ApplyButton.tsx
  ApplyModal.tsx
  ModalContext.tsx
```

## Design tokens

| Token  | Value     | Use                          |
| ------ | --------- | ---------------------------- |
| brand  | `#FCED62` | accents, CTAs, highlights    |
| paper  | `#FAFAF7` | page background              |
| ink    | `#0A0A0A` | text, borders, dividers      |

Display font: **Inter Tight** · Mono: **JetBrains Mono** (both via `next/font/google`).
