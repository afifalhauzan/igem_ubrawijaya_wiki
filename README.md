# iGEM Universitas Brawijaya Wiki

## 1. Project Overview
This repository contains the official iGEM Universitas Brawijaya Wiki foundation.
The project is built as a static, content-first scientific documentation and storytelling website with clear navigation and scalable structure.

## 2. Chosen Stack
- Vite
- React
- TypeScript
- React Router
- Tailwind CSS (`tailwindcss` + `@tailwindcss/vite`)
- Framer Motion
- GSAP

## 3. Folder Structure
```text
src/
+-- assets/
+-- components/
¦   +-- layout/
¦   ¦   +-- Navbar/
¦   ¦   +-- Footer/
¦   +-- ui/
¦   ¦   +-- Button/
¦   ¦   +-- Card/
¦   ¦   +-- Container/
¦   ¦   +-- Section/
¦   +-- animations/
+-- layouts/
¦   +-- MainLayout.tsx
+-- pages/
¦   +-- Home/
¦   +-- Project/
¦   +-- Design/
¦   +-- Experiments/
¦   +-- Results/
¦   +-- HumanPractices/
¦   +-- Safety/
¦   +-- Team/
¦   +-- NotFound/
+-- routes/
¦   +-- AppRouter.tsx
+-- styles/
¦   +-- globals.css
¦   +-- tokens.css
+-- hooks/
+-- utils/
+-- types/
+-- App.tsx
+-- main.tsx
```

## 4. Route Structure
- `/`
- `/project`
- `/design`
- `/experiments`
- `/results`
- `/human-practices`
- `/safety`
- `/team`
- `*` (redirects to `/404`)

All page routes are lazy loaded with `React.lazy` and rendered through `Suspense`.

## 5. Development Commands
```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## 6. Future Animation Strategy (Framer Motion + GSAP)
- Use Framer Motion for React-native component/page motion patterns (entrances, transitions, micro-interactions).
- Use GSAP for timeline-driven choreography and advanced scroll storytelling sequences.
- Keep animation modules isolated under `src/components/animations/` so page/content architecture stays clean.
- Introduce animation progressively only after content hierarchy and section structures are stable.
