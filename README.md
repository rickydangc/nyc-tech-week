# NYC Tech Week — AI Insider Guide

A Xiaohongshu-inspired interactive city guide for NYC Tech Week 2026. Personalized recommendations, neighborhood routes, and vibe-based scheduling for the AI community.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Features

- **9 Personas** — AI Builder, Founder, VC, Creator, Student, etc. with weighted event scoring
- **Smart Planner** — "I only have evenings", "I'm introverted", "I want to meet investors"
- **Neighborhood Clustering** — 18 NYC neighborhoods with curated walking routes
- **7-Dimension Scoring** — Founder value, technical depth, networking, creator energy, investor density, hype, exclusivity
- **Editorial Content** — Auto-generated vibe checks, "who should go", "skip if..." for every event
- **Event Density Map** — Visual heatmap of where the action is

## Tech Stack

Next.js 16 | Tailwind CSS 4 | Framer Motion | Leaflet | TypeScript

## Data

Place CSV files in `data/`. The app parses them at build time — no database needed.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
