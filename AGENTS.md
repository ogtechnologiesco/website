# AGENTS.md

## Project Overview

OG Technologies EU corporate website — a React 18 single-page application built with Vite, deployed on Netlify with static prerendering for SEO. The backend API runs on Heroku (`https://og-technologies.herokuapp.com/`).

The site includes public marketing pages, a blog, free online tools, a CRM module, a helpdesk system, user authentication, and Stripe-based subscription payments.

## Tech Stack

- **Framework**: React 18 (JSX, not TypeScript)
- **Build tool**: Vite 4 with `vite-plugin-prerender` (Puppeteer-based) and `vite-plugin-imagemin`
- **Styling**: Tailwind CSS 3 (primary), MUI 5 + Emotion (components), custom CSS in `src/css/`
- **Routing**: React Router v6 (lazy-loaded routes with `React.lazy` + `Suspense`)
- **HTTP client**: Axios with JWT auth, retry logic, and request deduplication (`src/services/api.jsx`)
- **Forms**: React Hook Form
- **Animations**: AOS (Animate On Scroll)
- **SEO**: React Helmet Async for meta tags, prerendered HTML with injected meta/JSON-LD in `vite.config.js`
- **Payments**: Stripe (via `src/services/stripeService.js` and `src/hooks/useStripePayment.jsx`)
- **Deployment**: Netlify (`public/_redirects`, `public/_headers`)

## Directory Structure

```
src/
├── App.jsx              # Route definitions (lazy imports)
├── main.jsx             # Entry point (BrowserRouter + StrictMode)
├── components/          # Shared components (ConsentBanner, SiteSearch, ProtectedRoute, etc.)
│   └── shared/          # Utility files (cookieUtils.js)
├── contexts/            # React contexts (AuthContext)
├── css/                 # Tailwind config, style.css, additional-styles/
├── data/                # Static data (blogPosts.js, searchIndex.js)
├── hooks/               # Custom hooks (useAuth, useApi, useSubscription, useStripePayment, useAdminProActivation)
├── images/              # Static images
├── pages/               # Route page components
│   ├── Blogs/            # Blog post pages
│   ├── blockchainCompliance/  # Blockchain compliance checker tool
│   ├── pdfTools/         # PDF manipulation tools
│   └── securityTools/    # Security scanner tool
├── partials/            # Layout components (Header, Footer, HeroHome, FeaturesBlocks, etc.)
├── services/            # API client (api.jsx) and Stripe service
└── utils/               # UI utilities (Dropdown, Modal, Transition)
```

## Coding Standards

- Use **functional components with hooks** — no class components
- Use **named exports** for components (not default exports)
- Use **JSX** (`.jsx`) for all React components — do not introduce TypeScript
- Use **lazy loading** (`React.lazy` + `Suspense`) for non-critical routes in `App.jsx`
- Use the **`useAuth` hook** (`src/hooks/useAuth.jsx`) for auth state and actions — do not access `AuthContext` directly
- Use **`apiGet`, `apiPost`, `apiPut`, `apiDelete`** from `src/services/api.jsx` for API calls — do not create ad-hoc axios instances
- Use **Tailwind utility classes** for styling; reference custom theme colors (gray, purple scales) defined in `src/css/tailwind.config.js`
- Use **React Helmet Async** (`<Helmet>`) for per-page meta tags on every route page
- Use **React Hook Form** for form handling
- Use **AOS** for scroll animations (initialized in `App.jsx`)

## File Naming Conventions

- **Components/Pages**: PascalCase with `.jsx` extension (e.g., `ConsentBanner.jsx`, `HtmlToImage.jsx`)
- **Hooks**: camelCase with `.jsx` extension, prefixed with `use` (e.g., `useApi.jsx`, `useAuth.jsx`)
- **Services/Utils**: camelCase with `.jsx` or `.js` extension (e.g., `api.jsx`, `stripeService.js`)
- **Config/Data**: camelCase with `.js` extension (e.g., `tailwind.config.js`, `blogPosts.js`)
- **CSS**: kebab-case with `.css` extension (e.g., `hero-animations.css`, `utility-patterns.css`)

## Architecture Guide

### Routing

All routes are defined in `src/App.jsx` using React Router v6. Public pages are imported directly; all other pages use `React.lazy` with `Suspense`. Auth-gated routes are wrapped in `<ProtectedRoute>`.

When adding a new route:
1. Create the page component in `src/pages/`
2. Add a lazy import in `App.jsx`
3. Add a `<Route>` entry in the `<Routes>` block
4. Complete the full SEO checklist below — every public route must be discoverable and prerendered

### Authentication

- `AuthContext` (`src/contexts/AuthContext.jsx`) manages auth state via `useReducer` with JWT tokens stored in `localStorage`
- `useAuth` hook (`src/hooks/useAuth.jsx`) wraps the context with utility methods (role checks, token expiry, subscription status)
- `ProtectedRoute` (`src/components/ProtectedRoute.jsx`) guards authenticated routes
- API requests automatically attach JWT via interceptor in `src/services/api.jsx`
- 401 responses trigger automatic logout and redirect to `/signin`
- Admin detection: role check, `isAdmin` flag, or `@ogtechnologies.co` / `@admin.ogtechnologies.co` email domain

### API Layer

`src/services/api.jsx` provides:
- `api` — authenticated axios instance with JWT interceptor, retry logic (3 retries with exponential backoff), and request deduplication
- `publicApi` — unauthenticated axios instance for public endpoints (e.g., quote submissions)
- Domain-specific API modules: `authAPI`, `subscriptionAPI`, `paymentAPI`, `crmAPI`, `doraAPI`, `legacyAPI`
- `handleApiError` — centralized error handler returning user-friendly messages

### Prerendering & SEO

`vite.config.js` configures `vite-plugin-prerender` to generate static HTML for all routes. The `postProcess` function injects:
- Page-specific `<title>`, `<meta name="description">`, canonical URL
- Open Graph and Twitter Card meta tags (including `og:type` when `ogType` is set in `routeMeta`)
- JSON-LD structured data: BreadcrumbList (all non-root routes), BlogPosting (`/blog/*`), Article (`/insights/*`), WebApplication (`/tools/*`), FAQPage (when `faq` is set), plus arbitrary schemas via `jsonLd`

All JSON-LD is generated by `postProcess` from `routeMeta` fields — **do not put `<script type="application/ld+json">` in `<Helmet>`**. Helmet-injected head mutations are captured unreliably by the prerenderer (roughly half of pages lost them), so schema was moved to build-time injection. `routeMeta` supports these optional fields:

| Field | Effect |
|---|---|
| `featureList: [...]` | Added to the `WebApplication` schema (`/tools/*` routes) |
| `appCategory: 'X'` | `applicationCategory` override (default `DeveloperApplication`; e.g. `FinanceApplication`, `SecurityApplication`, `BusinessApplication`, `UtilitiesApplication`) |
| `faq: [{q, a}]` | Emits a `FAQPage` schema — keep it in sync with any visible FAQ section on the page |
| `article: {...}` | Extra fields merged into `BlogPosting`/`Article` (`datePublished`, `dateModified`, `author`, `image`, `inLanguage`) |
| `ogType: 'article'` | Rewrites the `og:type` meta tag (default is `website`) |
| `jsonLd: [{...}]` | Raw schema objects injected verbatim — for types not auto-generated (Organization, VideoObject, CollectionPage, WebPage, etc.) |

All canonical URLs use `https://www.ogtechnologies.co` with a trailing slash.

#### SEO checklist for every new public page (all steps required)

1. **`<Helmet>` in the page component** — title, `meta description`, `meta keywords`, `meta robots` (`index, follow`), `link canonical`, full Open Graph block (`og:type`, `og:url`, `og:title`, `og:description`, `og:image`), Twitter Card block (`twitter:card`, `twitter:url`, `twitter:title`, `twitter:description`, `twitter:image`). Copy the block from an existing tool page (e.g. `src/pages/hashGenerator/index.jsx`) and adapt. **Do NOT add a JSON-LD `<script>` — schema belongs in `routeMeta`** (see table above).
2. **`vite.config.js`** — add the route to BOTH the `routeMeta` object AND the prerender `routes` array. `routeMeta` needs `title` + `description` at minimum; add `featureList`/`appCategory` for tools, `article` + `ogType: 'article'` for blog/insights posts, `faq` when the page has a visible FAQ, or `jsonLd` for other schema types. Missing `routeMeta` means no meta injection; missing `routes` means no static HTML.
3. **`public/sitemap.xml`** — add a `<url>` entry with `<loc>` (canonical URL with trailing slash), `<lastmod>`, `<changefreq>monthly</changefreq>`, `<priority>0.8</priority>` (0.8 for tools, adjust per existing entries).
4. **`src/data/searchIndex.js`** — add `{ title, description, path }` so the page appears in site search.
5. **`public/llms.txt`** — add a link under `## Tools` (or the appropriate section) for AI-crawler discoverability.
6. **`src/pages/Tools.jsx`** — if it's a tool, add it to `TOOL_CATEGORIES` under the right category.
7. **Verify** — run `npm run build` and confirm the route appears in the prerendered output (`dist/<route>/index.html` contains the injected meta and JSON-LD).

Notes:
- `robots.txt` allows all crawlers including AI bots — only touch it to disallow a route.
- `public/_redirects` SPA fallback (`/* /index.html 200`) covers new routes automatically; no edit needed.
- `/insights`'s `CollectionPage` schema in `routeMeta` contains a static `hasPart` article list — when adding a new insights post, append its `{headline, description, url}` there too.
- **Trailing slashes**: canonical URLs, sitemap, and internal links all use trailing slashes. Without a redirect, `/tools/foo` serves a 200 (duplicate of `/tools/foo/`) — Search Console showed this splitting impressions across duplicate URLs. Netlify's **Pretty URLs** asset optimization (Site settings → Build & deploy → Post processing) 301s `/foo` → `/foo/` for prerendered routes — keep it enabled.

### Styling

- Tailwind CSS is the primary styling system, configured in `src/css/tailwind.config.js`
- Custom theme extends gray and purple color scales, spacing, fontSize, letterSpacing
- `src/css/style.css` imports Tailwind layers and additional style files from `src/css/additional-styles/`
- MUI components are used alongside Tailwind where component libraries are needed
- `postcss.config.js` uses CommonJS (`require`) — not ES module imports

## Build & Deploy

- `npm run dev` — Start Vite dev server (http://localhost:5173)
- `npm run build` — Production build with image optimization and prerendering
- `npm run preview` — Preview production build locally
- Deployment is automatic on push to `main` via Netlify
- `public/_redirects` — SPA fallback routing, HTTPS redirects, security blocks for common attack paths
- `public/_headers` — Security headers (CSP, HSTS, X-Frame-Options, etc.)
- `public/sitemap.xml` and `public/robots.txt` — SEO configuration (sitemap must list every public route)

## Security Guidelines

- JWT tokens stored in `localStorage` — do not store sensitive data in cookies
- Use `<ProtectedRoute>` for any route requiring authentication
- CSP headers are defined in `public/_headers` — any new external scripts/styles must be added to the CSP allowlist
- Never hardcode API keys, secrets, or credentials in source code
- Stripe keys are handled via `src/services/stripeService.js` and environment configuration
- Admin-only features must check `isAdmin()` from the `useAuth` hook

## Do NOT

- Introduce TypeScript — the project uses JSX throughout
- Use default exports for components — use named exports
- Add new npm dependencies without checking compatibility with MUI 5 and Tailwind 3
- Modify `public/_redirects` or `public/_headers` without understanding Netlify routing and CSP implications
- Create new axios instances — use the existing `api` or `publicApi` from `src/services/api.jsx`
- Access `AuthContext` directly — use the `useAuth` hook instead
- Add routes without completing the full SEO checklist above (`App.jsx`, `vite.config.js` routeMeta + routes, `sitemap.xml`, `searchIndex.js`, `llms.txt`)
- Put `<script type="application/ld+json">` in `<Helmet>` — JSON-LD is injected at build time from `routeMeta` fields in `vite.config.js` (`featureList`, `appCategory`, `faq`, `article`, `ogType`, `jsonLd`)
- Use inline styles when Tailwind utility classes can achieve the same result
