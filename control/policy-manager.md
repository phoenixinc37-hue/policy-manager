# control/policy-manager.md

## Project
- P*policy manager
- Also referenced as P*PM

## Current version lanes
- FD1 = locked finished demo
- V10 = approved reference/template lane
- V11 = embryo / shaping lane
- V20 = blank subscriber/base beta version
- V30 = live company-fill sandbox

## Live URLs
- FD1 demo: `https://policy-manager-a37a.vercel.app`
- V10: `https://policy-manager-v10.vercel.app`
- V11: `https://policy-manager-v11.vercel.app`
- V20: `https://policy-manager-v20.vercel.app`
- V30: `https://policy-manager-v30.vercel.app`

## Current priorities
- Make V11 AI Assistant actually useful and visibly better
- Keep improving Saved Drafts lane
- Propagate approved V11 changes into V20/V30
- Build real persistence for drafts/import flow later

## Current facts
- V11 Saved Drafts first pass is live
- Saved Drafts currently uses browser localStorage only
- V11 Gemini/Vercel env is not set, so real Gemini generation is not active yet
- V11 fallback drafting logic was improved so it rewrites and expands better than before

## Done definition
- Scott can open the live URL and judge the exact feature himself
- If described as AI, output must clearly show meaningful drafting help, not just echo input

## Current blocker
- No `GEMINI_API_KEY` set in V11 Vercel production env

## Next likely actions
- Help Scott add Gemini key through browser/Vercel settings
- Redeploy V11
- Test AI Assistant live with real input
