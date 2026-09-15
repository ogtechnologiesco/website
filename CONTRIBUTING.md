# Contributing to OG Technologies EU Website

Thank you for your interest in contributing! This document covers everything you need to get started.

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
git clone https://github.com/ogtechnologiesco/website.git
cd website
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

## Tech Stack

- **Framework**: React 18 (JSX, not TypeScript)
- **Build tool**: Vite 4 with prerendering
- **Styling**: Tailwind CSS 3 (primary), MUI 5 (components)
- **Routing**: React Router v6 (lazy-loaded routes)
- **HTTP client**: Axios (`src/services/api.jsx`)
- **Forms**: React Hook Form
- **SEO**: React Helmet Async + `vite-plugin-prerender`

## Coding Standards

- Use **functional components with hooks** — no class components
- Use **named exports** for components (not default exports)
- Use **JSX** (`.jsx`) for all React components — do not introduce TypeScript
- Use **Tailwind utility classes** for styling — avoid inline styles
- Use **React Helmet** (`<Helmet>`) for per-page meta tags on every route page
- Use **`apiGet`, `apiPost`, `apiPut`, `apiDelete`** from `src/services/api.jsx` for API calls
- Use the **`useAuth` hook** (`src/hooks/useAuth.jsx`) for auth state — do not access `AuthContext` directly

### File Naming

| Type | Convention | Example |
|---|---|---|
| Components/Pages | PascalCase `.jsx` | `ConsentBanner.jsx` |
| Hooks | camelCase `.jsx`, `use` prefix | `useAuth.jsx` |
| Services/Utils | camelCase `.jsx` or `.js` | `api.jsx` |
| Config/Data | camelCase `.js` | `tailwind.config.js` |
| CSS | kebab-case `.css` | `hero-animations.css` |

## Adding a New Page

1. Create the page component in `src/pages/`
2. Add a lazy import in `src/App.jsx`
3. Add a `<Route>` entry in the `<Routes>` block
4. If prerendering is needed, add the route to both `routeMeta` and the `routes` array in `vite.config.js`
5. Add a `<url>` entry to `public/sitemap.xml`

## Adding a New Tool

Tools follow a tabbed interface pattern. See `src/pages/xmlTools/` or `src/pages/ethereumToolkit/` as references.

1. Create a directory under `src/pages/` for the tool category
2. Create an `index.jsx` with the tabbed shell (Helmet SEO, tabs, component rendering)
3. Create individual tool components as separate `.jsx` files
4. For individual SEO-optimized pages, create `*Page.jsx` wrappers using `src/components/ToolShell.jsx`
5. Wire up routes in `App.jsx` and prerendering in `vite.config.js`

## Pull Request Process

1. **Fork** the repository and create a branch from `main`
2. **Write clear commit messages** — describe what and why, not just how
3. **Test your changes** — run `npm run build` to verify the build passes
4. **Keep PRs focused** — one feature or fix per PR
5. **Update docs** — if you add a route, update `sitemap.xml` and `vite.config.js`
6. **Open a PR** — describe the change, link any related issues

### PR Checklist

- [ ] `npm run build` passes without errors
- [ ] New routes are added to `App.jsx`, `vite.config.js` (if prerendered), and `sitemap.xml`
- [ ] New pages include `<Helmet>` with title, description, canonical URL, and OG/Twitter tags
- [ ] No new npm dependencies added without compatibility check (MUI 5, Tailwind 3)
- [ ] No hardcoded secrets, API keys, or credentials
- [ ] No TypeScript introduced — project uses JSX throughout

## Security

- Never hardcode API keys, secrets, or credentials
- JWT tokens are stored in `localStorage` — do not store sensitive data in cookies
- Use `<ProtectedRoute>` for any route requiring authentication
- Admin-only features must check `isAdmin()` from the `useAuth` hook
- Any new external scripts/styles must be added to the CSP allowlist in `public/_headers`

## Questions?

Open a [GitHub Discussion](https://github.com/ogtechnologiesco/website/discussions) or email **hi@ogtechnologies.co**.

By participating, you agree to abide by the [Code of Conduct](CODE_OF_CONDUCT.md).
