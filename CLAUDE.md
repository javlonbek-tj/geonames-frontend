# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # start Vite dev server
npm run build         # tsc -b (via vite build) + production build
npm run lint          # eslint .
npm run format:fix    # prettier --write .
npm run preview       # preview a production build locally
```

There is no test suite in this repo. A husky `pre-commit` hook runs `npm run lint` —
fix lint errors rather than bypassing the hook.

`VITE_API_URL` is required (`src/shared/config/env.ts` throws at import time if it's
missing) — see `.env.example`. In dev it points at the sibling backend, normally
`http://localhost:3000/api`.

## Architecture

This is the **public citizen-facing portal** for Uzbekistan's state registry of
geographic object names ("Geonomlar"). A sibling repo one level up,
`../Geonames-backend` (Express + Drizzle/Postgres), is the API this app talks to —
read it too when a task spans both. There is also `../Geonames-cabinet`, the internal
staff-facing frontend for the same backend (not covered here).

Domain shape worth knowing: staff submit geographic-naming proposals that move through
a many-step approval workflow on the backend; one step opens a 10-day **public
discussion** where citizens vote support/oppose. This app exposes exactly two public
surfaces of that workflow — a browsable **registry** of approved objects, and the
**discussions** citizens can vote on — plus Telegram-OTP login.

### Feature-Sliced Design (FSD)

Code is organized in strict FSD layers, each only importing from itself or layers
below:

```
src/app        providers (App.tsx), router/, global styles
src/pages      route components — thin, compose widgets/features
src/widgets    layout/ (Header, Footer, PublicLayout), registries-section/
src/features   vote/, telegram-login/, discussions-filter/, registry-excerpt/
src/entities   citizen/, discussion/, location/, registry/
src/shared     api/axios.ts, config/env.ts, lib/queryClient.ts, ui/, assets/
```

Within a slice, sub-folders are consistent: `api/*.api.ts` (axios calls + response
types), `model/` (query/mutation hooks, derived-state hooks, zustand stores, plain
types), `ui/` (components), `lib/` (pure helpers, e.g. AntD column factories).

Import conventions: use the `@/*` alias (configured in both `vite.config.ts` and
`tsconfig.app.json`) for everything outside the current slice; use relative `../`
imports only within a slice. There are no barrel `index.ts` re-exports — import the
concrete file (e.g. `@/entities/registry/model/useRegistry`), not a slice root.

### Routing

`src/app/router/index.tsx` defines one `createBrowserRouter` with a single
`PublicLayout` parent (shared `errorElement: RouteErrorPage`) and lazy-loaded route
children:

```
/                     home
/discussions          list
/discussions/:id      detail + voting
/registry             list
/registry/:id         detail (map, excerpt PDF)
/guide
/login                Telegram OTP flow
*                     not-found
```

Every route uses `lazy: () => import('@/pages/.../XPage').then(m => ({ Component: m.default }))`
and sets `handle: { title: '...' }`. `PublicLayout` reads the active route's `handle`
via `useMatches()` to set `document.title`, resets scroll on path change, and shows a
top progress bar driven by `useNavigation().state`. Follow this pattern for any new
route.

### Server state — TanStack Query

All server data goes through TanStack Query; there is no other data-fetching
convention.

- Query keys: `['public-<thing>', ...params]`, e.g. `['public-registry', filters]`,
  `['public-discussion', id]`.
- Defaults (`src/shared/lib/queryClient.ts`): `retry: 1`, `staleTime: 0`,
  `refetchOnWindowFocus: false`. Rarely-changing reference data (regions, categories)
  overrides to `staleTime: Infinity` at the call site.
- Paginated list hooks use `placeholderData: (prev) => prev` to avoid layout flicker
  while refetching.
- Entity-layer hooks (`entities/*/model/use*.ts`) don't just wrap `useQuery` — they
  return view-ready derived values. E.g. `useDiscussion` computes `left` (days
  remaining), `isActive`, `supportPct`/`opposePct` from the raw response. Prefer
  extending these over computing derived fields in page components.
- Mutations live under `features/*/model/` (`useVote`, `useTelegramLogin`), show
  success/error via `App.useApp().message`, and invalidate the relevant
  `public-*` query keys on success.

### Client state — Zustand

Exactly one store: `src/entities/citizen/model/citizenStore.ts`, persisted to
localStorage (`citizen-auth`) via the `persist` middleware. Holds `accessToken` and
`citizen`. Don't add new global stores for things TanStack Query or URL state can
already express.

Filter state has two established patterns — pick based on whether the filters should
be shareable/bookmarkable:
- URL-backed via `useSearchParams` (`widgets/registries-section/model/useRegistriesFilters.ts`)
- local `useState` (`features/discussions-filter/model/useDiscussionsFilter.ts`)

Both expose the same shape: `{ params/filters, hasFilters, searchInput, setSearchInput,
applySearch, clearFilters, on*Change }`.

### API layer

A single axios instance, `src/shared/api/axios.ts`:
- `baseURL: env.apiUrl`, `withCredentials: true` (needed for the citizen refresh
  cookie), 30s timeout.
- Request interceptor injects `Authorization: Bearer <accessToken>` from the Zustand
  store.
- Response interceptor implements 401 → refresh → replay: on a 401 (not already
  retried, not the refresh call itself) it calls `/public/auth/refresh`, queues any
  other requests that 401 while the refresh is in flight (`failedQueue`), then replays
  them with the new token. On refresh failure it clears auth and hard-redirects to
  `/login`.

Backend responses are always enveloped as `{ data: T }` or
`{ data: T[], meta: { total, page, limit, totalPages } }`; `*.api.ts` modules type the
axios calls and `model/` hooks unwrap with `.then(r => r.data.data)`.
`entities/registry/api/registry.api.ts` is the one place this typing is loose
(`unknown[]`/`unknown`, cast to `GeoObject` in the hook) — don't propagate that
pattern to new entities.

### Styling

Tailwind 4 utility classes inline, Ant Design 6 for interactive primitives (Table,
Select, Modal, Result, Spin, Breadcrumb, etc.). The CSS layer order is declared
explicitly in `src/app/styles/index.css` (`@layer theme, base, antd, components,
utilities`) together with `<StyleProvider layer>` in `App.tsx` so Tailwind utilities
don't accidentally override AntD component styles — keep both in sync if you touch
either. AntD is configured globally in `App.tsx`: `uz_UZ` locale, Inter Variable font
token, custom `renderEmpty`. Brand colors are hardcoded hex, not design tokens
(`#1565c0` primary blue, `#0f1f3d` dark navy, `#e3e8f0`/`#e2e8f4` borders, `#f9fafc`
page background) — match these rather than introducing new ad-hoc colors.

All user-facing copy is Uzbek (Latin script), hardcoded inline — there is no i18n
layer.

### Notable non-obvious pieces

- `src/shared/ui/GeoMap/` renders Leaflet imperatively inside `useEffect` (no
  react-leaflet wrapper), draws GeoJSON with `fitBounds`, and toggles between OSM and
  satellite tile layers. Reuse this component for any new map, don't add a second map
  abstraction.
- `src/features/registry-excerpt/` generates an official QR-coded extract document and
  exports it to PDF via dynamically-imported `html2canvas` + `jspdf`
  (`utils.ts:downloadAsPdf`). Its `onclone` hook walks the cloned DOM and rewrites any
  computed `oklch()` color to `rgb()` first, because html2canvas can't parse Tailwind
  4's default `oklch()` output — keep this in mind if you add more printable/exported
  views.
- `src/shared/ui/ErrorBoundary.tsx` (class component) wraps the whole router in
  `App.tsx` for render errors; `src/shared/ui/RouteErrorPage.tsx` is the router's
  `errorElement` for navigation/loader errors (handles 404 specially). Use whichever
  matches the failure mode when adding error handling.
