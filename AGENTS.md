# Kfeteria Agent Instructions

## Expo version rule

Expo has changed. Read the exact versioned docs at `https://docs.expo.dev/versions/v56.0.0/` before writing or changing Expo code.

## Required project documents

Before major changes, read:

1. `docs/PROJECT_CONTEXT.md`
2. `docs/DESIGN_GUIDE.md`
3. `docs/DEVELOPMENT_RULES.md`

Future tasks should assume these documents exist and should follow them unless the user explicitly instructs otherwise.

## High-autonomy execution

Operate with high autonomy for normal development work.

Proceed without asking for confirmation for normal actions such as:

- creating, editing, moving, and deleting project files
- installing normal npm dependencies when clearly required
- running normal development commands
- fixing issues discovered during checks
- refactoring code when it improves maintainability and still follows the project docs

Preferred development commands include:

- `npm install`
- `npm run web`
- `npm run lint`
- `npm run test`
- `npm run typecheck`
- `npx expo start --web`

If a command fails:

- diagnose the failure
- fix the issue if it is safe
- rerun the relevant check
- continue until the task is complete or genuinely blocked

## Ask before risky actions

Ask before:

- deleting large parts of the app
- changing git history
- force pushing
- removing dependencies without a clear reason
- editing files outside this repository
- exposing secrets or modifying `.env` values
- running destructive commands
- changing production or deployment settings
- making paid cloud changes
- changing Supabase production data

## End-of-task reporting

At the end of each task, report:

- files changed
- commands run
- packages installed
- remaining issues
