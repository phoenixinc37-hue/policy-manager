# control/policy-manager.md

## Project
- P*policy manager
- Also referenced as P*PM
- Quadrant: QD2

## Current version lanes
- FD1 = locked finished demo
- V10 = approved reference/template lane
- V11 = saved checkpoint version with leadership team setup in place
- V12 = archived checkpoint version of completed core pathways
- V13 = new embryo / working development lane
- V21 = clean beta template (data stripped) for general testing
- V31 = live beta for Rosslyn/UPC Rosslyn (cloned from V21)

## Live URLs
- FD1 demo: `https://policy-manager-a37a.vercel.app`
- V10: `https://policy-manager-v10.vercel.app`
- V11: `https://policy-manager-v11.vercel.app`
- V12: `https://policy-manager-v12.vercel.app`

## Current priorities
- All new development, modifications, and feature iterations happen in V13 only.
- Deploy V21 and V31 to their own distinct Vercel URLs.
- Set up initial blank state for V21 (strip all existing `localStorage` data).
- Test V31 for live production usage (full setup + live data).

## Current facts
- Current V12 state is the archived core pathways embryo (completed Create -> Approval -> Circulate -> Team View -> Acknowledge -> Completion -> History pathway with browser localStorage).
- V13 is a clone of V12, now the new active dev lane.
- V21 is a clone of V12, for stripping data and clean beta deployment.
- V31 is a clone of V21, for live beta deployment and your own setup.
- Saved Drafts, Approval, Circulating, and Library all use browser localStorage.
- V11 is the last known good state with setup only, prior to full pathway build out in V12.
- V13 Gemini direct env is not set.
- n8n webhook path is live and app-side parsing was added for returned markdown drafts.
- Drafting logic was improved so it rewrites and expands better than before.
- Scott wants subscriber-specific editable setup for sites, people, access, authority, and approval levels.

## Done definition
- Scott can open the live URL and judge the exact feature himself
- If described as AI, output must clearly show meaningful drafting help, not just echo input

## Current blocker
- No `GEMINI_API_KEY` set in V11 Vercel production env

## Next likely actions
- Treat V11 as the saved fallback checkpoint
- Begin pathway design/build work inside V12
- Point a new live deployment at V12 when ready
- Test pathway logic live there before pushing anything downstream
