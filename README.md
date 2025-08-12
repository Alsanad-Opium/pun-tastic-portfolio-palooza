# Ridiculously Fun, Pun-Filled, Animated Portfolio (React + Vite)

A single-page React + Vite portfolio that feels like an interactive comedy-adventure. It’s playful, full of animations, puns, and hidden surprises — hackers, meme-lovers, and recruiters will be delighted.

## Quick start

```sh
npm install
npm run dev
```

Open http://localhost:8080

## Tech stack

- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn-ui (Radix primitives)
- Framer Motion animations
- Optional sounds via Web Audio API (muted by default)

## Project structure

- `src/pages/Index.tsx`: App composition and providers
- `src/components/*`: Sections and fun UI (Hero, About, Projects, Skills, Contact, FloatingJokes, KeyboardShortcuts, FakeCrashIntro, CursorTrail)
- `src/components/ui/*`: shadcn-ui components
- `src/contexts/ThemeContext.tsx`: Theme and fun modes (`light`, `neon-hacker`, `punny-mode`)
- `src/components/AchievementSystem.tsx`: Achievements + localStorage persistence
- `public/assets/jokes.json`: Editable jokes database for floating buttons

## Features implemented

- Fake crash intro with ESC/Skip and progress bar
- Floating joke buttons with modal, respawn, and local analytics
- Theme toggles: Light, Neon Hacker (scanlines, glow), Punny Mode (comic fonts)
- Keyboard shortcuts: P x3 (Punny Mode), F (grayscale 3s), L (party 10s), ? (help)
- Achievement toasts: first joke, 10 jokes, keyboard ninja, party animal, etc.
- Rage-click toasts and tracking in Hero
- Cursor trail with theme-specific particles
- Accessibility: skip intro, keyboardable dialogs, motion kept subtle; respects user input focus

## Editing copy, jokes, and Easter eggs

- Change jokes in `public/assets/jokes.json` (array of strings). No code changes required.
- Update section copy in component files under `src/components/*`.
- Add new Easter eggs by placing small interactive elements in any section and using `useToast` for feedback.

## Keyboard shortcuts

- P x3: Toggle Punny Mode
- F: Grayscale for 3s ("Paying respects…")
- L: Disco party for ~10s
- ?: Show help modal
- ESC: Close dialogs / skip intro

## Performance notes

- Heavy animations kept minimal; consider lazy-loading any Lottie/GSAP additions per section.
- Sounds are muted by default; Web Audio API generates small tones only when enabled.

## Where to edit

- Colors and fonts: `src/index.css` and `tailwind.config.ts`
- Theme logic: `src/contexts/ThemeContext.tsx`
- Achievements: `src/components/AchievementSystem.tsx`
- Keyboard: `src/hooks/useKeyboardShortcuts.ts`
- Floating jokes: `src/components/FloatingJokes.tsx`

## Roadmap ideas

- Add Lottie JSON assets and trigger them contextually
- GSAP scroll effects for section entrances
- Mini-game in Contact (Flappy-like)
