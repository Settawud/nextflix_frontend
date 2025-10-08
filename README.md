# Nextflix Frontend

Modern Netflix-inspired catalog built with Next.js 15 (App Router) and Tailwind CSS.  
This application consumes the Nextflix backend to present featured movies with rich artwork overlays that adapt gracefully across breakpoints.

## Live Resources

- Web app: https://nextflix-frontend-hl577w1cq-settawuds-projects.vercel.app/
- Backend API: https://nextflix-backend-j6ve.onrender.com/api/movies
- API playground: append `/api/movies/featured` or `/api/movies/{id}/assets` to inspect responses.

## Stack at a Glance

- **UI**: Next.js 15, React 19, Tailwind CSS 4, React Server Components
- **State / data**: `@tanstack/react-query`, lightweight repository/use-case layer
- **Tooling**: TypeScript 5, ESLint 9, Turbopack dev/build, Vercel hosting

## Getting Started Locally

Prerequisites: Node.js 20+, npm 10+, access to the backend (local or remote).

1. Install dependencies

   ```bash
   npm install
   ```

2. Configure environment variables

   ```bash
   cp .env.local.example .env.local
   # edit values as needed
   ```

   | Variable | Purpose | Default |
   | --- | --- | --- |
   | `NEXT_PUBLIC_API_BASE_URL` | Base URL of the backend API | `http://localhost:3001/api` |
   | `NEXT_PUBLIC_API_DOCS_URL` | External API docs link for the header CTA | `https://apidog.com/` |

3. Run locally

   ```bash
   npm run dev
   ```

   Visit http://localhost:3000 (Turbopack provides HMR).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Production build (Turbopack) |
| `npm run start` | Run the compiled production build |
| `npm run lint` | ESLint code quality checks |

## Architecture Overview

- **App entry**: `src/app` wires providers (React Query) and layout shell.
- **Config**: `src/config/environment.ts` normalises runtime environment variables.
- **Domain**: `src/domain` defines movie entities.
- **Data layer**: `src/data` contains the HTTP client and repository implementation that map DTOs to domain types.
- **Application layer**: `src/application` exposes use-cases (`get-featured-rails`, `search`, `get-movie-detail`).
- **Presentation**: `src/presentation` holds composable UI (Hero, MovieRail, cards) styled with Tailwind.
- **Providers**: `src/presentation/providers/dependency-provider.tsx` injects the repository/use-cases into React components.

This layered split mirrors the backend contracts, enabling easy swapping of the API client (HTTP vs. mock).

## UI / UX Notes

- **Responsive layout**: Major components (`SiteHeader`, `Hero`, `MovieRail`, `MovieCard`) expose breakpoint-specific Tailwind classes to tailor typography, spacing, and grid interactions from mobile to desktop.
- **State handling**: Loading, error, and empty states are surfaced using `HeroSkeleton`, `RailSkeleton`, and `StateBanner`, matching the figma flow.
- **Title overlays**: The `TitleOverlay` component prefers TMDB logo artwork (via `/movies/{id}/assets`) and falls back to typographic titles, preventing duplicate text overlays on posters.
- **Accessibility**: Interactive elements include descriptive `aria-label`s, focus-visible styles, and keyboard-friendly buttons.

## Quality & Verification

- **Lint**: `npm run lint`
- **End-to-end smoke**: Start backend + frontend locally, visit `/` and verify
  - Featured hero renders with backdrop and logo overlay
  - Rails scroll horizontally (keyboard + pointer)
  - Loading skeletons appear while the API call is in-flight (simulate via throttling)
  - Error / empty banners show when the backend returns failure (mock via devtools)
- **PageSpeed**: Run https://pagespeed.web.dev/ against the deployed URL; aim for >90 on Performance and Best Practices. Use Lighthouse in Chrome for iterative tuning.

## Notable Enhancements (beyond base requirements)

1. **Dynamic movie branding** – per-title assets (logo, textless backdrop) fetched on demand with caching to reduce API chatter.
2. **Hero overview enrichment** – client fetches detailed movie info to display curated summaries without overloading the initial payload.
3. **Fine-grained responsiveness** – mask gradients on rails, backdrop gradient overlays, and header behaviour adapt smoothly across breakpoints.
4. **Light/Dark theme toggle** – powered by `next-themes`, stored per-user with smooth transitions across the entire surface.

## Deployment

- Hosted on **Vercel** with Turbopack builds; environment variables managed through project settings.
- CI-friendly: run `npm ci && npm run lint && npm run build` to validate before deploy.

## Next Steps & Maintenance

- Add integration tests (Playwright) for header/link flows.
- Integrate i18n (Next.js routing) to widen localisation support.
- Wire live search UI powered by the existing backend search endpoint.
