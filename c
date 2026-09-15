# 💜 Rubby Ann — Date Planner

A three-act interactive web app that asks Rubby Ann out on a date, lets her
plan the perfect evening, and produces a beautiful **shareable ticket** she
can screenshot and send straight to her lover.

Built with **Vite + React**. No backend, no accounts, no email — 100% local.

---

## 📁 Project Structure

```
kennethProj/
├── index.html                  # Entry HTML (fonts: Playfair Display + Poppins)
├── vite.config.js              # Vite config (React plugin, auto-open dev server)
├── package.json                # Scripts & dependencies
├── .gitignore
│
└── src/
    ├── main.jsx                # React bootstrap (loads App + index.css)
    ├── App.jsx                 # Act router: Question → Planner → Ticket
    ├── index.css               # Stylesheet hub (imports everything below)
    │
    ├── components/             # One component per "Act"
    │   ├── ActOne.jsx          #   Act 1 · The Question (YES/NO dodge game)
    │   ├── ActTwo.jsx          #   Act 2 · The Planner (selections + lock-in)
    │   └── ActThree.jsx        #   Act 3 · The Digital Ticket (screenshot & share)
    │
    ├── data/                   # Editable content — no logic lives here
    │   └── constants.js        #   Button texts, planner categories, tuning values
    │
    ├── music/                  # Optional audio assets (e.g. lover.mp3)
    │
    └── styles/                 # CSS split by act for easy debugging
        ├── base.css            #   Design tokens, app shell, transitions, shared card
        ├── actOne.css          #   Hero, question card, YES/NO buttons
        ├── actTwo.css          #   Surprise card, option cards, fields, CTA
        └── actThree.css        #   Retro ticket + share actions
```

---

## 🧭 App Flow (the three Acts)

| Act | Component | What happens |
|-----|-----------|--------------|
| **1** | `ActOne.jsx` | "Will you go out on a date with me?" The **NO** button dodges on hover/touch/click with spring physics, cycles witty labels, and grows the **YES!** button by +0.3x per dodge (max 3.5x). |
| **2** | `ActTwo.jsx` | The planner. She picks Vibe / Main Event / Food, or toggles **"✨ Want me to plan everything?"**. Availability is required; special notes optional. **"Lock In Our Date! 🥂"** seals the plan. |
| **3** | `ActThree.jsx` | A retro 🎟️ ticket itemizing her choices, with canvas confetti. **She screenshots it (or taps "📋 Copy Plan as Text") and sends it to her lover.** |

State transitions live in `App.jsx`:
`act: 1 → 2 → 3` (Act 3 receives the `dateSelection` object to render the ticket).

---

## 🔧 Setup

```bash
npm install        # install dependencies
npm run dev        # start dev server → http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build
```

No API keys, no environment variables, no backend required — everything
runs entirely in the browser.

---

## 🐛 Debugging Guide

- **Styling issue?** Find the act in `src/styles/<actN>.css`; shared
  tokens/colors are in `src/styles/base.css` under `:root`.
- **Wording / option changes?** Edit `src/data/constants.js` only.
- **Flow/state bugs?** Start at `src/App.jsx` (the act router), then the
  relevant `src/components/Act<N>.jsx`.
- **Ticket content?** `src/components/ActThree.jsx` renders the breakdown
  rows and the "Copy Plan as Text" clipboard text.