# VoteWise India

A free, non-partisan practice space for India's first-time voters. Check if you can vote, learn how
elections work, practise on a real-feel EVM and VVPAT, and test yourself before polling day.

> VoteWise is an independent learning project and is **not affiliated with the Election Commission of
> India**. For registration and official information, use [voters.eci.gov.in](https://voters.eci.gov.in/)
> or call the voter helpline **1950**.

## What's inside

| Page | What it does |
| --- | --- |
| `/` | Home: the inked-finger hero and the path to the booth |
| `/eligibility` | **Can I vote?** Works out when you can enrol using ECI's four qualifying dates (1 Jan, 1 Apr, 1 Jul, 1 Oct), including applying in advance at 17, and points to Form 6, 6A or 8 |
| `/learn` | Five-step guide from enrolment to results, myth-vs-fact flip cards, and an election-day checklist saved on the device |
| `/simulation` | EVM practice in the real booth order: ID check, ink, ballot enabled, blue button, beep, 7-second VVPAT slip |
| `/quiz` | Ten questions with keyboard answers (1–4), streaks and a saved best score |
| `/about` | What the project is, and what it doesn't do |

There's also **Pucho**, a small offline help chat, on every page.

Candidates and parties in the simulator are fictional. Nothing is tracked or sent anywhere: the
checklist and quiz score live in the browser's `localStorage`.

## Design

- **Palette:** neel (indigo night) `#140c3a`, genda (marigold) `#ffb627`, rani pink `#f2258c`,
  mor (peacock) `#10b5a6`, syahi (ink) `#8b6cff`, EVM blue `#2d6bff`. Tokens live in
  `src/app/globals.css` under `@theme`.
- **Type:** Baloo 2 for display and Hind for body, both with Devanagari, self-hosted via `next/font`.
- **Surfaces:** `liquid` (glossy nav pill), `glass` / `glass-flat` (reading panels), and `clay` with
  colour variants (`clay-genda`, `clay-rani`, `clay-mor`, …) plus `clay-press` for anything you tap.
  Glass with backdrop blur is used sparingly because it's expensive to render.
- Motion respects `prefers-reduced-motion`.

## Tech

Next.js 16 (App Router, all routes prerendered as static pages), React 19, Tailwind CSS 4,
lucide-react icons and framer-motion (chat panel only). A service worker (`public/sw.js`) keeps
visited pages working offline, and the site installs as a PWA.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run lint       # ESLint
npm run build      # production build
npm run test:e2e   # Playwright end-to-end tests (builds and starts the app on port 3100)
```

The first time you run the end-to-end tests, install the browser with `npx playwright install chromium`.

## Project layout

```
src/
  app/
    page.tsx                 home
    eligibility/             Can I vote? checker
    learn/                   step guide, myth cards, checklist
    simulation/              EVM + VVPAT simulator
    quiz/                    quiz and question bank
    about/
    opengraph-image.tsx      share preview image
  components/                Navbar, Footer, Chatbot (Pucho), InkFinger, ServiceWorker
  lib/useStoredState.ts      localStorage-backed state hook
e2e/                         Playwright tests
```
