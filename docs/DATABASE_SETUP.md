# Kfeteria Database Setup Guide

## Purpose

This guide explains how to work with the Kfeteria Supabase database safely during local development and future remote deployment.

Use this document together with:

- `docs/PROJECT_CONTEXT.md`
- `docs/DATABASE_PLAN.md`
- `docs/DATABASE_REVIEW.md`
- `docs/DEVELOPMENT_RULES.md`

Do not use this guide as permission to push to a production Supabase project. Remote database changes must be intentional and validated locally first.

## Current Database Status

Current database artifacts:

- Initial schema migration exists: `supabase/migrations/20260608120600_initial_schema.sql`
- Row Level Security migration exists: `supabase/migrations/20260608133000_enable_rls_policies.sql`
- Local seed data exists: `supabase/seed.sql`
- TypeScript database types exist: `src/types/database.types.ts`

Current validation status from `docs/DATABASE_REVIEW.md`:

- The initial schema migration was statically reviewed.
- `supabase db lint --local` completed successfully.
- The migration was validated with a temporary local PostgreSQL database through `psql`.
- Seed data was validated against a temporary local database.
- TypeScript database types were generated from the current local schema and validated with `npm run typecheck`.
- No schema has been pushed to remote Supabase as part of the documented validation work.

## Local Setup Commands

Start local Supabase:

```bash
supabase start
```

Check local Supabase status:

```bash
supabase status
```

Lint the local database schema:

```bash
supabase db lint --local
```

Reset the local database and apply migrations:

```bash
supabase db reset
```

`supabase db reset` applies local migrations and normally runs `supabase/seed.sql` automatically when seed configuration is enabled by the Supabase CLI project setup.

To reset without seed data:

```bash
supabase db reset --no-seed
```

To apply seed data manually to the local database:

```bash
psql postgresql://postgres:postgres@127.0.0.1:54322/postgres -f supabase/seed.sql
```

Use the local connection details from `supabase status` if the port or credentials differ.

## Remote Setup Commands

Link this repository to a Supabase project:

```bash
supabase link --project-ref <project-ref>
```

Push validated local migrations to the linked Supabase project:

```bash
supabase db push
```

Remote setup rules:

- Run remote commands only after local validation succeeds.
- Confirm the linked project is the intended target before pushing.
- Do not push to production from an uncertain terminal session.
- Do not use remote commands to experiment with schema changes.

## Safety Rules

Required safety rules:

- Never push migrations to remote before local validation.
- Never expose `.env` secrets.
- Never use the Supabase service role key in frontend code.
- Never run destructive reset commands against production.
- Always commit migrations before remote push.
- Keep migrations append-only after they have been applied remotely.
- Do not edit historical migrations that may already exist in a shared or remote environment.
- Keep seed data free of real secrets, private customer data, and production credentials.
- Keep owner withdrawals, capital contributions, expenses, payroll, assets, and sales distinct in both schema and seed data.

Frontend key rule:

- The frontend may use the public anon key.
- The frontend must not use the service role key.
- Service role operations belong only in trusted server-side code or controlled administrative scripts.

## Type Generation

Recommended local command:

```bash
supabase gen types typescript --local --schema public > src/types/database.types.ts
```

Recommended linked-project command after remote schema is intentionally managed:

```bash
supabase gen types typescript --project-id <project-ref> --schema public > src/types/database.types.ts
```

Use remote type generation only when the remote schema is the intended source of truth. For normal development, prefer local schema generation after applying migrations locally.

After generating types, verify:

```bash
npm run typecheck
```

The generated file should include:

- `Database` interface
- `Tables`
- `Enums`
- `Row` types
- `Insert` types
- `Update` types

Current fallback note:

- Supabase CLI type generation was attempted with `--local` and `--db-url`.
- Both paths were blocked by Docker Desktop pipe inspection returning `Access is denied`.
- Types were generated from the running local PostgreSQL schema at `127.0.0.1:54322` using schema introspection as a fallback.
- Prefer the Supabase CLI command again once Docker access is fixed.

## Known Local Issue

Known issue:

- Docker Desktop pipe access denied affected `supabase db reset` and type generation on this machine.

Observed error pattern:

```text
open //./pipe/dockerDesktopLinuxEngine: Access is denied
```

Impact:

- Supabase CLI commands that inspect local Docker containers may fail before reaching the database.
- `supabase db reset --no-seed` could not complete during validation because of Docker pipe access.
- Supabase CLI type generation could not complete because it attempted Docker container inspection.

Validated fallback:

- The migration was validated with a local PostgreSQL and `psql` fallback.
- Seed data was validated with a temporary local PostgreSQL database.
- TypeScript types were generated from the currently running local PostgreSQL schema.

## Basic Troubleshooting

### Supabase is not running

Run:

```bash
supabase start
supabase status
```

If startup fails, confirm Docker Desktop is running and accessible from the current user session.

### Docker pipe access is denied

Try:

- Restart Docker Desktop.
- Restart the terminal.
- Confirm the current Windows user has Docker Desktop access.
- Run `supabase status` again.
- Use `psql` against the running local database only when the database is already running and the task can safely use direct SQL validation.

### Local database connection fails

Check the local connection details:

```bash
supabase status
```

Then retry with the reported local database URL. The commonly used local URL is:

```text
postgresql://postgres:postgres@127.0.0.1:54322/postgres
```

### Migration lint fails

Do not push to remote.

Fix the migration locally, then rerun:

```bash
supabase db lint --local
supabase db reset
```

### Seed fails

Check for:

- Foreign key order problems.
- Unit mismatches against `inventory_items.base_unit`.
- Duplicate IDs without matching `on conflict` handling.
- References to auth profiles that do not exist in local `auth.users`.

After fixing seed data, rerun local reset or manual seed application.

### Type generation fails

First try:

```bash
supabase gen types typescript --local --schema public > src/types/database.types.ts
```

If Docker inspection fails but the local database is running, use the local PostgreSQL schema as the fallback source and document that fallback in `docs/DATABASE_REVIEW.md`.

After any type generation path, run:

```bash
npm run typecheck
```

## Recommended Workflow

For local schema work:

1. Create a new migration in `supabase/migrations/`.
2. Run `supabase db lint --local`.
3. Run `supabase db reset`.
4. Validate seed data if the change affects seeded rows.
5. Generate TypeScript types.
6. Run `npm run typecheck`.
7. Commit migrations, seed changes, generated types, and relevant docs together.

For remote schema work:

1. Confirm local validation is complete.
2. Confirm migrations are committed.
3. Confirm the target Supabase project.
4. Run `supabase link --project-ref <project-ref>` if needed.
5. Run `supabase db push`.
6. Regenerate types from the intended source of truth.
7. Verify the app still typechecks.
