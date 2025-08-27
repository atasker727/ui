## NASA Visualizer UI

A Vite + React + TypeScript single-page app for browsing NASA images:
- Photo of the Day (APOD)
- Mars Rover photos (Curiosity) with sol and camera filters

### Tech stack
- React + TypeScript
- Vite
- SCSS modules (global partials under `src/styles`)
- PNPM workspaces (this package lives under the monorepo `nasa-vis/ui`)

### Prerequisites
- Node.js v24+
- pnpm v10+
- API server running locally at `/api` (see `../api` package)


### Getting started
```bash
# from repo root (recommended)
pnpm install
```

### Scripts
```bash
# run prettier & eslint (uses the package eslint.config.js)
pnpm lint-fix

# start dev server with HMR on http://localhost:5173
pnpm dev

# type-check and build production assets to dist/
pnpm build

# preview the production build locally
pnpm preview
```

### Environment
The UI expects the API to be reachable at the relative path `/api`. In development, the Vite dev server proxies requests to the API server if configured. Make sure the API is running (see `../api/README.md`).

set env vars VITE_BACKEND_URL & VITE_API_PREFIX for production api address, otherwise use port 3000 & localhost for development

- Photo of the Day endpoint: `GET /api/photo-of-the-day?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD`
- Mars photos endpoint: `GET /api/mars-photos?sol=NUMBER&camera=FHAZ|RHAZ|MAST|CHEMCAM|MAHLI|MARDI|NAVCAM`

### Common Configuration
A shared folder of types and requests exists outside this repo, copied to this project and the api to ensure parity
excercise caution modifying files in the common folder as these are expected to match the api versions

### Troubleshooting
- If the UI loads but data doesn’t appear:
  - Ensure the API server is running and reachable at `/api`
  - Check the browser console and network tab for errors
- If TypeScript complains about React types, run `pnpm install` at repo root to ensure workspace dependencies are installed

### License
This project uses the NASA public APIs. Respect their rate limits and attribution guidelines. See NASA API docs for details.
