# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with React 19, TypeScript, and Vite. Features 3D elements using React Three Fiber and cyberpunk-style HUD interface.

## Commands

```bash
npm run dev      # Start dev server on port 3000
npm run build    # Build for production (outputs to dist/)
npm run preview  # Preview production build locally
npm run lint     # TypeScript type check only
npm run clean    # Remove dist folder
```

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite 6
- **Styling:** Tailwind CSS v4 (via @tailwindcss/vite)
- **3D:** Three.js + React Three Fiber + Drei + Postprocessing
- **Animation:** Framer Motion + GSAP
- **State:** Zustand

## Architecture

- Entry: `src/main.tsx` → renders `App.tsx`
- Components: `src/components/` (HUD, Particles)
- Utils: `src/utils/` (cn.ts for className merging)
- Path alias: `@/` maps to project root
- 3D canvas component in `src/components/Particles.tsx`
- HUD overlay in `src/components/HUD.tsx` (cyberpunk terminal aesthetic)

## Environment

- `GEMINI_API_KEY` - Required for certain features (see .env.example)
- Vite loads env via `loadEnv()` in vite.config.ts
