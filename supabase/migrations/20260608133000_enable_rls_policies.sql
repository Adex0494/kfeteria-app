-- Row Level Security for the Kfeteria MVP schema.
-- Service-role requests bypass RLS in Supabase, so these policies focus on authenticated app users.

create or replace function public.current_user_business_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select p.business_id
  from public.profiles p
  where p.id = auth.uid()
    and p.is_active = true
  limit 1
$$;

create or replace function public.current_user_role()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select p.role
  from public.profiles p
  where p.id = auth.uid()
    and p.is_active = true
  limit 1
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_user_role() = 'admin'::public.user_role
$$;

create or replace function public.is_employee()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_user_role() = 'employee'::public.user_role
$$;

comment on function public.current_user_business_id() is
  'Returns the active authenticated user business id. Security definer avoids recursive RLS on profiles.';

comment on function public.current_user_role() is
  'Returns the active authenticated user role. Security definer avoids recursive RLS on profiles.';

comment on function public.is_admin() is
  'Returns true when the active authenticated user profile has admin role.';

comment on function public.is_employee() is
  'Returns true when the active authenticated user profile has employee role.';

revoke all on function public.current_user_business_id() from public;
revoke all on function public.current_user_role() from public;
revoke all on function public.is_admin() from public;
revoke all on function public.is_employee() from public;

grant execute on function public.current_user_business_id() to authenticated, service_role;
grant execute on function public.current_user_role() to authenticated, service_role;
grant execute on function public.is_admin() to authenticated, service_role;
grant execute on function public.is_employee() to authenticated, service_role;

alter table public.businesses enable row level security;
alter table public.profiles enable row level security;
alter table public.employees enable row level security;
alter table public.inventory_items enable row level security;
alter table public.purchases enable row level security;
alter table public.inventory_movements enable row level security;
alter table public.menu_items enable row level security;
alter table public.recipe_ingredients enable row level security;
alter table public.sales enable row level security;
alter table public.sale_items enable row level security;
alter table public.expenses enable row level security;
alter table public.payroll_payments enable row level security;
alter table public.owner_withdrawals enable row level security;
alter table public.capital_contributions enable row level security;
alter table public.assets enable row level security;
alter table public.waste_records enable row level security;
alter table public.cash_closings enable row level security;
alter table public.suppliers enable row level security;

-- Businesses: users can read their own business; only admins can update it.
create policy businesses_select_own_business
on public.businesses
for select
to authenticated
using (id = public.current_user_business_id());

create policy businesses_admin_update_own_business
on public.businesses
for update
to authenticated
using (public.is_admin() and id = public.current_user_business_id())
with check (public.is_admin() and id = public.current_user_business_id());

-- Profiles: security-definer helpers prevent profile policy recursion.
-- Users can read profiles in their business and their own profile.
-- Only admins can create, update, or delete profiles for their own business.
create policy profiles_select_own_business_or_self
on public.profiles
for select
to authenticated
using (
  id = auth.uid()
  or business_id = public.current_user_business_id()
);

create policy profiles_admin_insert_own_business
on public.profiles
for insert
to authenticated
with check (
  public.is_admin()
  and business_id = public.current_user_business_id()
);

create policy profiles_admin_update_own_business
on public.profiles
for update
to authenticated
using (
  public.is_admin()
  and business_id = public.current_user_business_id()
)
with check (
  public.is_admin()
  and business_id = public.current_user_business_id()
);

create policy profiles_admin_delete_own_business
on public.profiles
for delete
to authenticated
using (
  public.is_admin()
  and business_id = public.current_user_business_id()
);

-- Employees: admins manage employee records; employees can read same-business records.
-- A later view can expose a reduced employee shape if salary privacy becomes necessary.
create policy employees_admin_all_own_business
on public.employees
for all
to authenticated
using (public.is_admin() and business_id = public.current_user_business_id())
with check (public.is_admin() and business_id = public.current_user_business_id());

create policy employees_employee_select_own_business
on public.employees
for select
to authenticated
using (public.is_employee() and business_id = public.current_user_business_id());

-- Inventory items: employees can read stock; direct item maintenance is admin-only.
create policy inventory_items_admin_all_own_business
on public.inventory_items
for all
to authenticated
using (public.is_admin() and business_id = public.current_user_business_id())
with check (public.is_admin() and business_id = public.current_user_business_id());

create policy inventory_items_employee_select_own_business
on public.inventory_items
for select
to authenticated
using (public.is_employee() and business_id = public.current_user_business_id());

-- Purchases: employees can register purchases but cannot update or delete them.
create policy purchases_admin_all_own_business
on public.purchases
for all
to authenticated
using (public.is_admin() and business_id = public.current_user_business_id())
with check (public.is_admin() and business_id = public.current_user_business_id());

create policy purchases_employee_select_own_business
on public.purchases
for select
to authenticated
using (public.is_employee() and business_id = public.current_user_business_id());

create policy purchases_employee_insert_own_business
on public.purchases
for insert
to authenticated
with check (
  public.is_employee()
  and business_id = public.current_user_business_id()
  and created_by = auth.uid()
);

-- Inventory movements: employees can create operational movements but cannot alter history.
create policy inventory_movements_admin_all_own_business
on public.inventory_movements
for all
to authenticated
using (public.is_admin() and business_id = public.current_user_business_id())
with check (public.is_admin() and business_id = public.current_user_business_id());

create policy inventory_movements_employee_select_own_business
on public.inventory_movements
for select
to authenticated
using (public.is_employee() and business_id = public.current_user_business_id());

create policy inventory_movements_employee_insert_own_business
on public.inventory_movements
for insert
to authenticated
with check (
  public.is_employee()
  and business_id = public.current_user_business_id()
  and created_by = auth.uid()
);

-- Menu and recipes: employees can read; admins manage prices and recipe definitions.
create policy menu_items_admin_all_own_business
on public.menu_items
for all
to authenticated
using (public.is_admin() and business_id = public.current_user_business_id())
with check (public.is_admin() and business_id = public.current_user_business_id());

create policy menu_items_employee_select_own_business
on public.menu_items
for select
to authenticated
using (public.is_employee() and business_id = public.current_user_business_id());

create policy recipe_ingredients_admin_all_own_business
on public.recipe_ingredients
for all
to authenticated
using (public.is_admin() and business_id = public.current_user_business_id())
with check (public.is_admin() and business_id = public.current_user_business_id());

create policy recipe_ingredients_employee_select_own_business
on public.recipe_ingredients
for select
to authenticated
using (public.is_employee() and business_id = public.current_user_business_id());

-- Sales: employees can register sales and line items, but cannot update or delete them.
create policy sales_admin_all_own_business
on public.sales
for all
to authenticated
using (public.is_admin() and business_id = public.current_user_business_id())
with check (public.is_admin() and business_id = public.current_user_business_id());

create policy sales_employee_select_own_business
on public.sales
for select
to authenticated
using (public.is_employee() and business_id = public.current_user_business_id());

create policy sales_employee_insert_own_business
on public.sales
for insert
to authenticated
with check (
  public.is_employee()
  and business_id = public.current_user_business_id()
  and created_by = auth.uid()
);

create policy sale_items_admin_all_own_business
on public.sale_items
for all
to authenticated
using (public.is_admin() and business_id = public.current_user_business_id())
with check (public.is_admin() and business_id = public.current_user_business_id());

create policy sale_items_employee_select_own_business
on public.sale_items
for select
to authenticated
using (public.is_employee() and business_id = public.current_user_business_id());

create policy sale_items_employee_insert_own_business
on public.sale_items
for insert
to authenticated
with check (
  public.is_employee()
  and business_id = public.current_user_business_id()
  and created_by = auth.uid()
);

-- Expenses: employees can register ordinary expenses but cannot update or delete them.
create policy expenses_admin_all_own_business
on public.expenses
for all
to authenticated
using (public.is_admin() and business_id = public.current_user_business_id())
with check (public.is_admin() and business_id = public.current_user_business_id());

create policy expenses_employee_select_own_business
on public.expenses
for select
to authenticated
using (public.is_employee() and business_id = public.current_user_business_id());

create policy expenses_employee_insert_own_business
on public.expenses
for insert
to authenticated
with check (
  public.is_employee()
  and business_id = public.current_user_business_id()
  and created_by = auth.uid()
);

-- Payroll is sensitive finance data and remains admin-only for MVP.
create policy payroll_payments_admin_all_own_business
on public.payroll_payments
for all
to authenticated
using (public.is_admin() and business_id = public.current_user_business_id())
with check (public.is_admin() and business_id = public.current_user_business_id());

-- Owner withdrawals and capital contributions are admin-only because they are not ordinary operations.
create policy owner_withdrawals_admin_all_own_business
on public.owner_withdrawals
for all
to authenticated
using (public.is_admin() and business_id = public.current_user_business_id())
with check (public.is_admin() and business_id = public.current_user_business_id());

create policy capital_contributions_admin_all_own_business
on public.capital_contributions
for all
to authenticated
using (public.is_admin() and business_id = public.current_user_business_id())
with check (public.is_admin() and business_id = public.current_user_business_id());

-- Assets: employees can read assets; admins manage asset records.
create policy assets_admin_all_own_business
on public.assets
for all
to authenticated
using (public.is_admin() and business_id = public.current_user_business_id())
with check (public.is_admin() and business_id = public.current_user_business_id());

create policy assets_employee_select_own_business
on public.assets
for select
to authenticated
using (public.is_employee() and business_id = public.current_user_business_id());

-- Waste: employees can register waste and view same-business waste records.
create policy waste_records_admin_all_own_business
on public.waste_records
for all
to authenticated
using (public.is_admin() and business_id = public.current_user_business_id())
with check (public.is_admin() and business_id = public.current_user_business_id());

create policy waste_records_employee_select_own_business
on public.waste_records
for select
to authenticated
using (public.is_employee() and business_id = public.current_user_business_id());

create policy waste_records_employee_insert_own_business
on public.waste_records
for insert
to authenticated
with check (
  public.is_employee()
  and business_id = public.current_user_business_id()
  and created_by = auth.uid()
);

-- Cash closings: employees can create and read closings, but only admins can update/review/delete them.
create policy cash_closings_admin_all_own_business
on public.cash_closings
for all
to authenticated
using (public.is_admin() and business_id = public.current_user_business_id())
with check (public.is_admin() and business_id = public.current_user_business_id());

create policy cash_closings_employee_select_own_business
on public.cash_closings
for select
to authenticated
using (public.is_employee() and business_id = public.current_user_business_id());

create policy cash_closings_employee_insert_own_business
on public.cash_closings
for insert
to authenticated
with check (
  public.is_employee()
  and business_id = public.current_user_business_id()
  and created_by = auth.uid()
);

-- Suppliers: employees can read supplier context; supplier maintenance is admin-only.
create policy suppliers_admin_all_own_business
on public.suppliers
for all
to authenticated
using (public.is_admin() and business_id = public.current_user_business_id())
with check (public.is_admin() and business_id = public.current_user_business_id());

create policy suppliers_employee_select_own_business
on public.suppliers
for select
to authenticated
using (public.is_employee() and business_id = public.current_user_business_id());
