# Project handoff

This repository is the source of truth for **Royaume en Guerre**.

## Current product state

- Production: https://royaumes-en-guerre.vercel.app
- Framework: Next.js 16 / React 19
- Campaign: 15 missions
- Mobile troop selector: `¼`, `½`, `TOUT`
- Opposing armies fight when they meet on a road
- Browser progression key: `royaumes-campaign-v1`

## Code map

- `app/page.js`: mission data and complete game loop
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
