# 🗳️ VoteWise India – Election Learning Assistant

A free, non-partisan practice space for India's first-time voters. Check if you can vote, learn how
elections work, practise on a real-feel EVM and VVPAT, and test yourself before polling day.

Built as part of the **PromptWars Virtual Challenge**, this project focuses on civic awareness using
modern web technologies.

> VoteWise is an independent learning project and is **not affiliated with the Election Commission of
> India**. For registration and official information, use [voters.eci.gov.in](https://voters.eci.gov.in/)
> or call the voter helpline **1950**.

---

## 🚀 Features

| Page | What it does |
| --- | --- |
| `/` | Home: the inked-finger hero and the path to the booth |
| `/eligibility` | **Can I vote?** Works out when you can enrol using ECI's four qualifying dates (1 Jan, 1 Apr, 1 Jul, 1 Oct), including applying in advance at 17, and points to Form 6, 6A or 8 |
| `/learn` | Five-step guide from enrolment to results, myth-vs-fact flip cards, and an election-day checklist saved on the device |
| `/simulation` | EVM practice in the real booth order: ID check, ink, ballot enabled, blue button, beep, 7-second VVPAT slip |
| `/quiz` | Ten questions with keyboard answers (1–4), streaks and a saved best score |
| `/about` | What the project is, and what it doesn't do |

- 🤖 **Pucho**, a small offline help chat, is on every page.
- 📱 **Installable PWA** that keeps visited pages working offline.

Candidates and parties in the simulator are fictional. Nothing is tracked or sent anywhere: the
checklist and quiz score live in the browser's `localStorage`.

---

## 🎯 Purpose

Many people find the election process confusing, especially when voting for the first time.
VoteWise simplifies it through interactive design and plain explanations.

---

## 🎨 Design

- **Palette:** neel (indigo night) `#140c3a`, genda (marigold) `#ffb627`, rani pink `#f2258c`,
  mor (peacock) `#10b5a6`, syahi (ink) `#8b6cff`, EVM blue `#2d6bff`. Tokens live in
  `src/app/globals.css` under `@theme`.
- **Type:** Baloo 2 for display and Hind for body, both with Devanagari, self-hosted via `next/font`.
- **Surfaces:** `liquid` (glossy nav pill), `glass` / `glass-flat` (reading panels), and `clay` with
  colour variants (`clay-genda`, `clay-rani`, `clay-mor`, …) plus `clay-press` for anything you tap.
  Glass with backdrop blur is used sparingly because it's expensive to render.
- Motion respects `prefers-reduced-motion`.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router, all routes prerendered as static pages), React 19
- **Styling:** Tailwind CSS 4
- **Icons and motion:** lucide-react, framer-motion (chat panel only)
- **PWA:** service worker (`public/sw.js`) + web manifest
- **Testing:** Playwright end-to-end tests, run in CI

---

## 🏁 Getting Started

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

When deploying anywhere other than Vercel, set `NEXT_PUBLIC_SITE_URL` (for example
`https://votewise.example`) so share previews link to the right domain.

---

## 🌐 Live Demo

(Will be added after deployment)

---

## 📸 Screenshots

(Add screenshots here)

---

## 🧩 Project Structure

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

---

## 📌 Future Improvements

- Hindi / English language toggle
- Countdown to upcoming elections by state
- Smarter AI assistant

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork and improve the project.

---

## 📜 License

This project is open-source and available under the MIT License.
