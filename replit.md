# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Artifacts

### AL-YAMEN Dashboard (`artifacts/al-yamen`)
- A premium business management dashboard for AL-YAMEN
- Dark glass-panel UI theme inspired by the original HTML designs
- Pages: Dashboard, Transactions (Add/All/Recent), Sales & Orders (New Order/History/Customers), Inventory (Add Product/Stock List/Categories), HR Management, Accounting, Settings
- No backend — pure frontend with mock/demo data
- Uses: React, Vite, Tailwind CSS v4, Recharts, Wouter, Lucide React, Framer Motion

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
