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
- Human campaign power from mission 6: `La Bannière du Roi`
- Command fills passively and gains bonuses from human captures and road-battle victories
- At full command, the player targets a human base: directly connected human bases send 25% and the target gains +65% production for 8 seconds
- From mission 7 onward, ordinary villages and towers start as bonus-free level-I cities
- A city can become a village, fortress or tower for 10 soldiers, then take one of two branch-specific specializations for 16 soldiers
- Construction takes time, slows production while active, is cancelled by capture and is also used strategically by the Orc AI
- Orc AI telegraphs planned assaults, coordinated attacks, reinforcements and neutral expansion before executing them
- Product shell: animated title screen, continue action and progression summary
- Campaign navigation: three acts, connected mission nodes and detailed pre-battle sheets
- Mission sheets expose the objective, special rule and all three crown conditions before launch
- Battle results include crowns, duration, surviving positions, soldiers and the next unlocked front
- Browser progression key: `royaumes-campaign-v1`

## Code map

- `app/page.js`: mission data and complete game loop
- `app/immersion-audio.js`: procedural music and action sound effects
- `app/globals.css`: all game and responsive styles
- `app/layout.tsx`: fonts, metadata and mobile viewport
- `public/sw.js`: service worker
- `public/manifest.webmanifest`: installable mobile app metadata

Mission definitions start near the top of `app/page.js`. The game component starts at `export default function Game()`. Road-battle resolution is around the message `Les armées s’affrontent sur la route`. The selected troop percentage is stored in the `D` state / `v` ref.

The command-power runtime is stored in the `commandPower` ref. UI snapshots use `commandUi`. `gainCommand`, `beginPowerTargeting`, and `activateRoyalBanner` contain the power flow.

The strategic Orc AI runtime is stored in the `orcMind` ref. Its planning and execution run inside the canvas game loop; pending orders are also rendered there as animated red or orange intent arrows.

Building progression is configured in `developmentChoices`. Runtime buildings use `specialization` and `construction`; all production, defense and movement calculations must resolve through `getBaseStats` so specialization bonuses remain consistent.

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
