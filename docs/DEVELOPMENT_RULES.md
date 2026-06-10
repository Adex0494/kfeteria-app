# Kfeteria Development Rules

## How Codex should use this document

Future development tasks must read and follow this document before coding unless the user explicitly instructs otherwise. This file is the permanent source of truth for implementation standards, architecture rules, testing expectations, and project-level development discipline.

This document should be used together with:

- `docs/PROJECT_CONTEXT.md` for business and product rules
- `docs/DESIGN_GUIDE.md` for visual and UI rules

## Required reading order

Before major changes:

1. Read `docs/PROJECT_CONTEXT.md`
2. Read `docs/DESIGN_GUIDE.md` for UI-related work
3. Read `docs/DEVELOPMENT_RULES.md`

Future work should assume these files exist and should use them as baseline guidance.

## High-autonomy execution rules

- Proceed without asking for confirmation for normal development actions.
- You may create, edit, move, and delete project files when needed.
- You may install normal npm dependencies when they are clearly required.
- You may run normal development commands such as `npm install`, `npm run web`, `npm run lint`, `npm run test`, `npm run typecheck`, and `npx expo start --web`.
- You may fix errors discovered during checks and rerun the relevant command.
- You may refactor code when it improves maintainability and still follows the project documents.

Ask before:

- deleting large parts of the app
- changing git history
- force pushing
- removing dependencies without clear reason
- editing files outside this repository
- exposing secrets or modifying `.env` values
- running destructive commands
- changing production or deployment settings
- making paid cloud changes
- changing Supabase production data

Failure handling rules:

- Diagnose failing commands instead of stopping at the first error.
- Apply safe fixes when the cause is clear.
- Rerun the relevant verification after the fix.
- Continue until the task is complete or genuinely blocked.

## Architecture rules

- Prefer reusable components over duplicated UI.
- Keep components small and focused.
- Use TypeScript everywhere practical.
- Use the `@/` path alias for internal imports.
- Separate business logic from UI whenever possible.
- Keep formatting, calculation, and data-transformation logic out of large screen components.
- Prefer composition over large monolithic files.
- Avoid duplicating business rules across modules.
- Keep domain logic explicit and readable.

## Project structure rules

- Shared design tokens belong in theme files.
- Reusable components should live in shared component areas when they emerge.
- Business-specific features should be grouped by feature or module.
- Translation files are part of feature delivery, not optional follow-up work.
- New code should fit the existing structure unless there is a strong reason to refactor.

## UI rules

- Use theme colors.
- Never hardcode colors in feature UI when a theme token should be used.
- Use translation keys for all visible text.
- Follow `docs/DESIGN_GUIDE.md`.
- Build mobile-first.
- Ensure screens remain usable on web.
- Use cards, spacing, radius, and shadows consistently with the theme.
- Avoid placeholder-looking UI when building production-facing screens.

## Internationalization rules

- Spanish is the default language.
- English support is mandatory.
- Never hardcode user-facing text directly in JSX.
- Add new strings to both Spanish and English locale files.
- Prefer clear translation key organization by feature.
- Layouts must tolerate text-length differences between languages.

## Business logic rules

- Use `docs/PROJECT_CONTEXT.md` as the source of truth for business behavior.
- Preserve distinctions between sales, expenses, payroll, owner withdrawals, capital contributions, and assets.
- Never represent owner withdrawals as normal business expenses.
- Never represent capital contributions as sales or profit.
- Do not hide units from inventory or recipe quantities.
- Financial and quantity values should remain explicit and traceable.

## Testing rules

- New utilities should be tested.
- Reusable logic should be tested.
- Prefer maintainable code and maintainable tests.
- Favor simple unit tests for formatters, calculations, and shared logic.
- Reusable UI components should have tests where practical.
- If tests are not yet configured for a new area, note that gap clearly.

## Quality rules

- Prefer clarity over cleverness.
- Prefer predictable code over fragile abstractions.
- Avoid premature optimization.
- Keep code easy to review and modify.
- Add comments only when the code would otherwise be hard to understand.

## Routing and navigation rules

- Use Expo Router as the official navigation direction for the app.
- New navigation work should align with the documented product navigation structure.
- Mobile and desktop navigation patterns must follow the responsive rules in `docs/DESIGN_GUIDE.md`.

## Data and integration rules

- Do not implement Supabase business logic unless the task requires it.
- Keep external integration code isolated from UI components.
- Prefer typed interfaces for data coming from backend services.
- Keep storage, auth, realtime, and database concerns separated where practical.

## Documentation rules

- Read `docs/PROJECT_CONTEXT.md` before major changes.
- Read `docs/DESIGN_GUIDE.md` before UI work.
- Read `docs/DEVELOPMENT_RULES.md` before coding.
- Update these documents when product rules or implementation standards materially change.
- Do not let code evolve silently away from documented business rules.

## Delivery rules

- Changes should be scoped to the task.
- Avoid introducing unrelated refactors unless necessary.
- Verify work when possible using available checks.
- If tests or lint do not exist, state that clearly in the summary.
- End-of-task summaries should include files changed, commands run, packages installed, and remaining issues.
