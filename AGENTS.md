# Project handoff

This repository is the source of truth for **Royaume en Guerre**.

## Current product state

- Production: https://royaumes-en-guerre.vercel.app
- Framework: Next.js 16 / React 19
- Campaign: 15 missions
- Mobile troop selector: `¼`, `½`, `TOUT`
- Opposing armies fight when they meet on a road
- Missions 6–15 open with a dedicated narrative scene before gameplay
- Battle HUD text is deliberately kept at the edges of the canvas
- Terrain, moving armies and collision effects are rendered procedurally on canvas
- Browser progression key: `royaumes-campaign-v1`

## Code map

- `app/page.js`: mission data and complete game loop
- `app/immersion-audio.js`: procedural music and action sound effects
- `app/globals.css`: all game and responsive styles
- `app/layout.tsx`: fonts, metadata and mobile viewport
- `public/sw.js`: service worker
- `public/manifest.webmanifest`: installable mobile app metadata

Mission definitions start near the top of `app/page.js`. The game component starts at `export default function Game()`. Road-battle resolution is around the message `Les armées s’affrontent sur la route`. The selected troop percentage is stored in the `D` state / `v` ref.

## Before publishing

Run:

```bash
npm install
npm run build
```

Preserve the current live game behavior unless the requested change explicitly modifies it.

## Delivery workflow

- `main` is the integration branch and the source of the production deployment.
- When a requested change is complete, passes code-level validation, and is mergeable, merge it into `main` instead of maintaining a long-lived integration branch.
- Keep a single Vercel production deployment. Do not create Vercel preview or branch deployments unless the user explicitly requests one.
- Before merging, check the latest `main` and open pull requests so concurrent agent work is preserved.

## Validation ownership

- The user performs visual review, manual UX checks, and end-to-end gameplay testing.
- By default, agents run code-level validation only: TypeScript, lint, production build, static checks, and relevant runtime error checks.
- Do not run browser screenshots, automated visual validation, or end-to-end tests unless the user explicitly requests them.
