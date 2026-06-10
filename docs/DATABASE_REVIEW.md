# Kfeteria Database Migration Review

## Review scope

Reviewed migration:

- `supabase/migrations/20260608120600_initial_schema.sql`

Reference documents read:

- `docs/PROJECT_CONTEXT.md`
- `docs/DATABASE_PLAN.md`
- `docs/DEVELOPMENT_RULES.md`

This review is a schema review before applying the migration. No migration was run and no schema was pushed to Supabase.

## Tables reviewed

All 18 MVP tables were reviewed:

- `businesses`
- `profiles`
- `employees`
- `inventory_items`
- `purchases`
- `inventory_movements`
- `menu_items`
- `recipe_ingredients`
- `sales`
- `sale_items`
- `expenses`
- `payroll_payments`
- `owner_withdrawals`
- `capital_contributions`
- `assets`
- `waste_records`
- `cash_closings`
- `suppliers`

## Enums reviewed

All 9 requested enums were reviewed:

- `user_role`: `admin`, `employee`
- `payment_method`: `cash`, `transfer`, `card`, `credit`
- `expense_type`: `gas`, `electricity`, `rent`, `payroll`, `transport`, `packaging`, `cleaning`, `other`
- `movement_type`: `purchase`, `sale`, `adjustment`, `waste`
- `item_type`: `countable`, `weight`, `liquid`, `package`
- `base_unit`: `unit`, `lb`, `kg`, `oz`, `liter`, `ml`, `gallon`, `package`, `bottle`
- `contribution_type`: `capital`, `business_loan`, `partner_investment`, `cash_replenishment`
- `salary_type`: `daily`, `weekly`, `biweekly`, `monthly`
- `asset_status`: `active`, `damaged`, `sold`, `retired`

Result:

- No invalid enum usage found.
- Enum values match the migration request.
- `payment_method` does not include `mixed`; this matches the request but means mixed payments will need a later `sale_payments` table or another explicit design.

## Relationships reviewed

Reviewed direct ownership and parent-child relationships:

- `profiles.id` references `auth.users(id)`.
- Every business-owned table references `businesses(id)`.
- `employees.profile_id` references `profiles(id)`.
- `created_by` fields reference `profiles(id)` where user actions are recorded.
- `reviewed_by` on `cash_closings` references `profiles(id)`.
- `purchases` references `suppliers` and `inventory_items`.
- `inventory_movements` references `inventory_items`.
- `recipe_ingredients` references `menu_items` and `inventory_items`.
- `sales` owns `sale_items`.
- `sale_items` references `sales` and `menu_items`.
- `expenses` references `suppliers`.
- `payroll_payments` references `employees` and optionally `expenses`.
- `assets` references `suppliers` and optionally `expenses`.
- `waste_records` references `inventory_items`.

Result:

- No circular dependency issue found.
- Core foreign keys are present.
- `inventory_movements.source_table` and `source_id` remain polymorphic by design, so they are not hard foreign keys.
- Tenant consistency is now enforced for business-owned relationships through added composite foreign keys.

## Indexes reviewed

Reviewed index coverage for:

- `business_id` filters.
- Report date fields, including sale, purchase, expense, payroll, withdrawal, contribution, waste, asset purchase, cash closing, and movement dates.
- Frequently used foreign keys.
- Status and type fields used in reports.
- Inventory low-stock query pattern.

Result:

- Basic index coverage is good for MVP reporting and common relationships.
- Composite unique constraints on `(business_id, id)` also add indexes that support tenant-consistent foreign keys.
- Future query plans may justify additional composite indexes such as `(business_id, supplier_id)` or `(business_id, inventory_item_id, occurred_at)` after real report queries exist.

## Constraints reviewed

Reviewed constraints for:

- Required names and descriptions.
- Non-negative money fields.
- Positive transaction quantities.
- Non-negative inventory quantities and cost values.
- Valid statuses for purchases, sales, and cash closings.
- Valid payroll and employment date ordering.
- Positive `assets.useful_life_months` when provided.
- Unit consistency for inventory-linked records.

Result:

- Money fields use `numeric(12,2)`.
- Quantity fields use `numeric(12,3)`.
- Date fields use `date` where business-day reporting is expected.
- Timestamp fields use `timestamptz`.
- No `float` money fields found.
- `cash_closings.difference` correctly allows negative values.
- Estimated profit fields correctly allow negative values.

## Issues found

### Fixed: Cross-business references were structurally possible

Original issue:

- Tables had `business_id`, but foreign keys such as `sale_items.sale_id`, `recipe_ingredients.inventory_item_id`, and `purchases.supplier_id` only referenced target IDs.
- That would allow a row for one business to point at a parent row owned by another business.

Risk:

- Incorrect reports.
- Broken multi-business boundaries.
- More complex Row Level Security policies later.

Resolution applied:

- Added `(business_id, id)` unique constraints to business-owned tables.
- Added composite foreign keys such as `(business_id, sale_id)` to `sales(business_id, id)` and `(business_id, inventory_item_id)` to `inventory_items(business_id, id)`.

### Fixed: Inventory-linked units were not enforced

Original issue:

- `purchases`, `recipe_ingredients`, `waste_records`, and `inventory_movements` could store a `unit` that did not match the referenced inventory item's `base_unit`.

Risk:

- Incorrect recipe costing.
- Incorrect inventory consumption.
- Confusing inventory reports.

Resolution applied:

- Added `public.validate_inventory_item_base_unit()`.
- Added validation triggers on:
  - `purchases`
  - `recipe_ingredients`
  - `waste_records`
  - `inventory_movements`

### Open: Mixed payment support is not modeled

Current state:

- `payment_method` supports `cash`, `transfer`, `card`, and `credit`.
- There is no `mixed` enum value and no `sale_payments` table.

Risk:

- A sale paid partly in cash and partly by card cannot be represented precisely.
- Cash closing can be inaccurate if mixed payments are common.

Recommendation:

- Keep as-is if mixed payments are out of MVP scope.
- Add a later `sale_payments` table before relying on detailed payment reconciliation.

### Open: Inventory source records are polymorphic

Current state:

- `inventory_movements.source_table` and `source_id` are not hard foreign keys.

Risk:

- The database cannot guarantee that a source record exists.

Reason accepted:

- This avoids circular dependency and supports multiple source tables in one movement table.

Recommendation:

- Validate source creation in application logic or later database functions.
- Consider explicit nullable source columns later if strict source integrity becomes more important than flexibility.

### Open: Inventory item `base_unit` updates can affect historical meaning

Current state:

- New linked rows are validated against the current inventory item `base_unit`.
- Existing linked rows are not automatically rewritten or protected if an inventory item's `base_unit` changes later.

Risk:

- Historical recipes, purchases, waste, and movements can become semantically inconsistent.

Recommendation:

- Treat `inventory_items.base_unit` as immutable after the item has linked records.
- Add a later trigger to block base unit changes once an item is used.

## Improvements applied to the migration

Applied directly to `supabase/migrations/20260608120600_initial_schema.sql`:

1. Added tenant-consistency unique constraints on `(business_id, id)`.
2. Added composite foreign keys for business-owned relationships.
3. Added composite foreign keys for `created_by` and `reviewed_by` profile references.
4. Added `public.validate_inventory_item_base_unit()`.
5. Added base-unit validation triggers for inventory-linked tables.

## Schema score

Score: 8/10

Reasoning:

- The schema covers the full MVP table list and has a sound business ownership model.
- Money, quantity, timestamp, and date types are appropriate.
- Core relationships, constraints, and indexes are present.
- The migration now protects against cross-business relationship mistakes.
- Remaining score deductions are for missing runtime SQL validation, lack of mixed payment modeling, polymorphic movement sources, and no immutability protection for inventory base units.

## Validation performed

Static checks performed:

- Confirmed 9 enum definitions.
- Confirmed 18 table definitions.
- Confirmed no `enable row level security` statements.
- Confirmed `profiles.id` references `auth.users(id)`.
- Confirmed composite tenant foreign keys were added for business-owned relationships.
- Confirmed base-unit validation triggers exist for inventory-linked tables.

Runtime validation attempted:

- `supabase db lint --local`
- `supabase db reset --no-seed`
- Direct local Postgres validation with a temporary database:
  - `createdb kfeteria_migration_validation`
  - Prepared minimal local Supabase prerequisites: `extensions` schema, `auth` schema, and `auth.users`
  - `psql -v ON_ERROR_STOP=1 -f supabase/migrations/20260608120600_initial_schema.sql`
  - Object count sanity check
  - `dropdb kfeteria_migration_validation`

Result:

- `supabase db lint --local` completed successfully with no schema errors.
- `supabase db reset --no-seed` could not run because Docker Desktop pipe access was denied.
- The migration file executed successfully against the temporary local validation database.
- The validation database contained the expected `9` enums and `18` public tables after applying the migration.
- The temporary validation database was dropped after validation.
- No schema was pushed to remote Supabase.
- No seed data was created.

Errors found during local validation:

- No SQL parser or dependency errors were found in the migration.
- The only command failure was environmental: Docker pipe access was denied for `supabase db reset --no-seed`.

Fixes applied during local validation:

- No migration changes were required after runtime validation.

## Seed validation

Seed file reviewed:

- `supabase/seed.sql`

Seed entities included:

- `1` business: Kfeteria.
- `3` employees: Kdie, Stanley, Ayudante.
- `5` suppliers.
- `11` inventory items.
- `11` purchases.
- `23` inventory movements.
- `6` menu items.
- `10` recipe ingredients.
- `3` sales.
- `5` sale items.
- `6` expenses.
- `3` payroll payments.
- `1` owner withdrawal.
- `1` capital contribution.
- `3` assets.
- `2` waste records.
- `1` cash closing.

Seed validation performed:

- Created a temporary local database named `kfeteria_seed_validation`.
- Prepared minimal local Supabase prerequisites for validation: `extensions`, `auth`, `auth.users`, `auth.uid()`, `authenticated`, and `service_role`.
- Applied `20260608120600_initial_schema.sql`.
- Applied `20260608133000_enable_rls_policies.sql`.
- Applied `supabase/seed.sql`.
- Re-applied `supabase/seed.sql` to verify stable UUID and `on conflict` behavior.
- Checked row counts.
- Checked inventory item `current_quantity` against net `inventory_movements`.
- Dropped the temporary validation database.

Seed validation result:

- Seed executed successfully.
- Repeat execution succeeded without duplicate key errors.
- Inventory movement totals matched `inventory_items.current_quantity` for all `11` inventory items.
- Unit validation triggers accepted all seeded purchase, recipe, waste, and movement units.
- No remote Supabase changes were made.

Seed limitations:

- Auth users and profiles are not seeded.
- `profiles.id` references `auth.users(id)`, and Supabase Auth rows have environment-managed fields. To keep the seed portable and avoid fragile assumptions about auth internals, the seed leaves `created_by` and `profile_id` values null.
- The seed is repeatable for the included stable UUID rows, but it does not remove unrelated local rows a developer may have created manually.

## TypeScript type generation

Generated file:

- `src/types/database.types.ts`

Generation notes:

- Regenerated types from the current local schema on June 8, 2026.
- Attempted Supabase CLI generation with `supabase gen types typescript --local --schema public`.
- Attempted Supabase CLI generation with `supabase gen types typescript --db-url postgresql://postgres:postgres@127.0.0.1:54322/postgres --schema public`.
- Both Supabase CLI generation paths failed because Docker Desktop pipe inspection returned `Access is denied`.
- Used the currently running local PostgreSQL database at `127.0.0.1:54322` as the fallback source of truth and generated Supabase-style TypeScript database types from local schema introspection.

Validation result:

- `npm run typecheck` completed successfully after type generation.
- Generated types include the `Database` interface, public tables, public enums, and `Row`, `Insert`, and `Update` table shapes.

## Recommended changes before applying migration

Required before remote application:

- Review whether Kfeteria needs mixed payment support in MVP. If yes, add a `sale_payments` table before applying.

Recommended but not blocking:

- Resolve local Docker Desktop permission access if the team wants to use `supabase db reset --no-seed` as the standard validation command.
- Add a later trigger to prevent changing `inventory_items.base_unit` after related purchases, recipes, waste records, or movements exist.
- Add RLS policies in a separate migration, as planned.
- Add seed data in a separate step, as planned.
- Generate TypeScript types only after the migration is successfully applied to a local or linked Supabase database.

## Readiness

Static review result:

- Structurally ready after the applied fixes.

Application readiness:

- Ready to apply locally from a SQL parsing and dependency standpoint.
- Ready to apply remotely from a migration syntax standpoint, but remote application should wait until the team intentionally performs that deployment step.
