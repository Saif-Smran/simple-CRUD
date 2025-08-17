<div align="center">

# Simple CRUD

A minimal full‑stack user management demo built with **Next.js App Router (v15)**, **TypeScript**, **Drizzle ORM**, **Neon Postgres (serverless)**, **React Hook Form + Zod**, **Radix UI + custom shadcn‑style components**, and **Sonner** for toasts.

</div>

## ✨ Features

- List users (server component fetch via `getUsers`)
- Create user (client form with validation + toast feedback)
- Update user (inline dialog with prefilled form, loading + password visibility toggle)
- Delete user (confirmation dialog, loading state, success/error toasts)
- Server Actions style functions located in `server/user.ts` with cache revalidation (`revalidatePath('/')`)
- Drizzle schema + Neon HTTP driver (`neon-http`) / serverless ready
- Fully typed data layer (`UserInsert`, `UserSelect`)
- Tailwind (v4) utility styling + small UI abstraction components

## 🗂 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| DB / ORM | Postgres (Neon) + Drizzle ORM |
| Validation | Zod |
| Forms | React Hook Form |
| UI Primitives | Radix UI Dialog + custom wrappers (`src/components/ui`) |
| Icons | lucide-react |
| Toasts | sonner |

## 📁 Project Structure (excerpt)

```
src/
	app/               # App Router entrypoints
	components/        # Reusable UI + feature components
		forms/           # Form components (create / update logic)
		ui/              # UI primitives (button, dialog, input, table, etc.)
	db/                # Drizzle schema + db init
server/              # Server action-like functions (CRUD)
drizzle.config.ts    # Drizzle CLI config
```

## 🔐 Environment Variables

Create a `.env.local` file (not committed) with:

```
DATABASE_URL=postgres://<user>:<password>@<host>/<database>?sslmode=require
```

The value should be the connection string from Neon (or any Postgres provider). `sslmode=require` recommended for serverless.

## 🛠 Setup

Clone + install dependencies (pnpm recommended):

```bash
pnpm install
```

Generate / push migrations (optional — current demo may work with on‑the‑fly table creation depending on Neon setup). Add/modify schema then:

```bash
pnpm drizzle-kit generate
pnpm drizzle-kit push
```

> Drizzle commands derive paths from `drizzle.config.ts`.

## 🚀 Development

```bash
pnpm dev
```

Visit http://localhost:3000

## 🧩 Key Files

- `src/db/schema.ts` – Drizzle table + TS types
- `src/db/db.ts` – Drizzle + Neon HTTP client initialization
- `server/user.ts` – CRUD operations (server layer) with `revalidatePath`
- `src/components/forms/UserForm.tsx` – Create form
- `src/components/UpdateUserBtn.tsx` – Update dialog (password toggle, validation)
- `src/components/DeleteUserBtn.tsx` – Delete confirmation dialog
- `src/components/UsersTable.tsx` – Server component rendering user list

## 🔄 Data Flow Overview

1. Server component (`UsersTable`) calls `getUsers()` directly (runs on server).
2. Client forms (create/update/delete) invoke server functions imported from `server/user.ts`.
3. After mutation, `revalidatePath('/')` triggers updated server render for the home page.
4. Client triggers `router.refresh()` for immediate UI sync.

## ✅ Validation & Forms

- Zod schemas ensure runtime + compile‑time safety.
- react-hook-form manages minimal re-renders.
- Age is coerced from input string to number before validation.

## 🧪 Potential Enhancements (Not Implemented Yet)

- Authentication / authorization
- Pagination & filtering for users
- Optimistic UI updates (currently relies on refresh + revalidation)
- Separate password change flow instead of editing raw password
- Unit tests (Jest / Vitest) & integration tests
- CI workflow (lint, type-check, drizzle diff)

## ⚠️ Notes / Caveats

- Passwords are stored & displayed in plain text in this demo – do NOT use in production. Replace with hashing (e.g., bcrypt) and never return the hash to the client UI.
- Error handling is minimal; expand with proper logging / monitoring in real apps.

## 🧹 Scripts

```bash
pnpm dev       # Start dev server (Turbopack)
pnpm build     # Production build
pnpm start     # Start production server
pnpm lint      # Lint sources
```

## 📦 Dependencies Highlights

- `drizzle-orm` – lightweight SQL builder + types
- `@neondatabase/serverless` – HTTP Postgres driver for edge/serverless
- `radix-ui` – accessible primitives (dialog)
- `sonner` – toasts
- `lucide-react` – icons

## 📄 License

MIT (add a LICENSE file if you plan to open source formally).

---

Feel free to open issues or extend the demo. PRs welcome.
