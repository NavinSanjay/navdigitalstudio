# Runbook — Nav Digital Studio
## Prereqs
- Node 20+
- npm or pnpm
## First run
```bash
npm install
npm run dev
# open http://localhost:3000
```
Fill `.env` from `.env.example` for analytics/email.
## Deploy (Vercel)
- Import repo to Vercel
- Set env vars (same as `.env.example`)
- Deploy
## Notes
- CSP is set in `next.config.mjs`
- Rate limiter is in-memory (best-effort)
