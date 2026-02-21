# Technology Stack

**Analysis Date:** 2026-02-21

## Languages

**Primary:**
- TypeScript 5.x - All source files (.ts, .tsx)
- JavaScript - Configuration files (ESLint, PostCSS)

**Secondary:**
- CSS - Global styles and Tailwind directives (`src/app/globals.css`)
- YAML - CMS configuration (`public/admin/config.yml`)

## Runtime

**Environment:**
- Node.js 24.13.0 (current)
- npm 11.6.2

**Package Manager:**
- npm
- Lockfile: `package-lock.json` (present)

## Frameworks

**Core:**
- Next.js 16.1.6 - Full-stack React framework with App Router, static export
- React 19.2.3 - UI library
- React DOM 19.2.3 - DOM rendering

**Styling:**
- Tailwind CSS 4.x - Utility-first CSS framework
- @tailwindcss/postcss 4.x - PostCSS plugin for Tailwind
- PostCSS - CSS transformation (`postcss.config.mjs`)

**CMS:**
- Decap CMS 3.x - Content management system (loaded via CDN: `https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js`)

## Key Dependencies

**Critical:**
- next 16.1.6 - Framework runtime and build tools
- react 19.2.3 - React core library
- react-dom 19.2.3 - React DOM bindings
- tailwindcss 4.x - CSS generation and compilation

**Development:**
- typescript 5.x - Type checking and compilation
- @types/react 19.x - React type definitions
- @types/react-dom 19.x - React DOM type definitions
- @types/node 20.x - Node.js type definitions
- eslint 9.x - Code linting
- eslint-config-next 16.1.6 - Next.js specific ESLint rules

## Configuration

**Environment:**
- Configured via `next.config.ts`:
  - Static export mode (`output: 'export'`)
  - Unoptimized images for static build compatibility
- TypeScript paths configured in `tsconfig.json`:
  - `@/*` maps to `./src/*` for clean imports

**Build:**
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript compiler options
- `postcss.config.mjs` - PostCSS and Tailwind configuration
- `eslint.config.mjs` - ESLint configuration

## Platform Requirements

**Development:**
- Node.js 24.x (v24.13.0 currently installed)
- npm 11.x (11.6.2 currently installed)
- TypeScript 5.x for type checking
- Modern browser with ES2017+ support

**Production:**
- Static file hosting (no Node.js runtime required)
- Static HTML/CSS/JS export via `next build`
- Deployment target: Static hosting (Vercel, GitHub Pages, S3, etc.)

---

*Stack analysis: 2026-02-21*
