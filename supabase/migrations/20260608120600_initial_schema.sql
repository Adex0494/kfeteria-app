create extension if not exists "pgcrypto" with schema extensions;

create type public.user_role as enum ('admin', 'employee');
create type public.payment_method as enum ('cash', 'transfer', 'card', 'credit');
create type public.expense_type as enum ('gas', 'electricity', 'rent', 'payroll', 'transport', 'packaging', 'cleaning', 'other');
create type public.movement_type as enum ('purchase', 'sale', 'adjustment', 'waste');
create type public.item_type as enum ('countable', 'weight', 'liquid', 'package');
create type public.base_unit as enum ('unit', 'lb', 'kg', 'oz', 'liter', 'ml', 'gallon', 'package', 'bottle');
create type public.contribution_type as enum ('capital', 'business_loan', 'partner_investment', 'cash_replenishment');
create type public.salary_type as enum ('daily', 'weekly', 'biweekly', 'monthly');
create type public.asset_status as enum ('active', 'damaged', 'sold', 'retired');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.businesses (
  id uuid primary key default extensions.gen_random_uuid(),
  name text not null,
  legal_name text,
  tax_id text,
  phone text,
  email text,
  address text,
  currency text not null default 'DOP',
  timezone text not null default 'America/Santo_Domingo',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint businesses_name_not_empty check (length(trim(name)) > 0)
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  business_id uuid not null references public.businesses(id) on delete restrict,
  full_name text not null,
  email text,
  phone text,
  role public.user_role not null default 'employee',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_full_name_not_empty check (length(trim(full_name)) > 0)
);

create table public.suppliers (
  id uuid primary key default extensions.gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete restrict,
  name text not null,
  contact_name text,
  phone text,
  email text,
  address text,
  notes text,
  is_active boolean not null default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint suppliers_name_not_empty check (length(trim(name)) > 0)
);

create table public.employees (
  id uuid primary key default extensions.gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete restrict,
  profile_id uuid references public.profiles(id) on delete set null,
  full_name text not null,
  position text,
  phone text,
  salary_amount numeric(12,2) not null default 0,
  salary_type public.salary_type not null,
  hire_date date,
  termination_date date,
  is_active boolean not null default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint employees_full_name_not_empty check (length(trim(full_name)) > 0),
  constraint employees_salary_amount_non_negative check (salary_amount >= 0),
  constraint employees_termination_after_hire check (
    termination_date is null
    or hire_date is null
    or termination_date >= hire_date
  )
);

create table public.inventory_items (
  id uuid primary key default extensions.gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete restrict,
  name text not null,
  sku text,
  item_type public.item_type not null,
  base_unit public.base_unit not null,
  current_quantity numeric(12,3) not null default 0,
  average_unit_cost numeric(12,2) not null default 0,
  low_stock_threshold numeric(12,3) not null default 0,
  is_active boolean not null default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint inventory_items_name_not_empty check (length(trim(name)) > 0),
  constraint inventory_items_current_quantity_non_negative check (current_quantity >= 0),
  constraint inventory_items_average_unit_cost_non_negative check (average_unit_cost >= 0),
  constraint inventory_items_low_stock_threshold_non_negative check (low_stock_threshold >= 0),
  constraint inventory_items_sku_unique_per_business unique (business_id, sku)
);

create table public.menu_items (
  id uuid primary key default extensions.gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete restrict,
  name text not null,
  description text,
  category text,
  sale_price numeric(12,2) not null default 0,
  estimated_cost numeric(12,2) not null default 0,
  estimated_profit numeric(12,2) not null default 0,
  estimated_margin_percent numeric(6,2),
  is_active boolean not null default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint menu_items_name_not_empty check (length(trim(name)) > 0),
  constraint menu_items_sale_price_non_negative check (sale_price >= 0),
  constraint menu_items_estimated_cost_non_negative check (estimated_cost >= 0)
);

create table public.recipe_ingredients (
  id uuid primary key default extensions.gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete restrict,
  menu_item_id uuid not null references public.menu_items(id) on delete cascade,
  inventory_item_id uuid not null references public.inventory_items(id) on delete restrict,
  quantity numeric(12,3) not null,
  unit public.base_unit not null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint recipe_ingredients_quantity_positive check (quantity > 0),
  constraint recipe_ingredients_unique_item_per_menu_item unique (menu_item_id, inventory_item_id)
);

create table public.purchases (
  id uuid primary key default extensions.gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete restrict,
  supplier_id uuid references public.suppliers(id) on delete set null,
  inventory_item_id uuid not null references public.inventory_items(id) on delete restrict,
  purchase_date date not null default current_date,
  quantity numeric(12,3) not null,
  unit public.base_unit not null,
  unit_cost numeric(12,2) not null default 0,
  total_cost numeric(12,2) not null default 0,
  payment_method public.payment_method not null default 'cash',
  status text not null default 'completed',
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint purchases_quantity_positive check (quantity > 0),
  constraint purchases_unit_cost_non_negative check (unit_cost >= 0),
  constraint purchases_total_cost_non_negative check (total_cost >= 0),
  constraint purchases_status_valid check (status in ('completed', 'cancelled'))
);

create table public.sales (
  id uuid primary key default extensions.gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete restrict,
  sale_date date not null default current_date,
  subtotal numeric(12,2) not null default 0,
  discount_total numeric(12,2) not null default 0,
  tax_total numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  payment_method public.payment_method not null default 'cash',
  cash_received numeric(12,2) not null default 0,
  change_given numeric(12,2) not null default 0,
  status text not null default 'completed',
  estimated_cost numeric(12,2) not null default 0,
  estimated_profit numeric(12,2) not null default 0,
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint sales_subtotal_non_negative check (subtotal >= 0),
  constraint sales_discount_total_non_negative check (discount_total >= 0),
  constraint sales_tax_total_non_negative check (tax_total >= 0),
  constraint sales_total_non_negative check (total >= 0),
  constraint sales_cash_received_non_negative check (cash_received >= 0),
  constraint sales_change_given_non_negative check (change_given >= 0),
  constraint sales_estimated_cost_non_negative check (estimated_cost >= 0),
  constraint sales_status_valid check (status in ('completed', 'voided', 'refunded'))
);

create table public.sale_items (
  id uuid primary key default extensions.gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete restrict,
  sale_id uuid not null references public.sales(id) on delete cascade,
  menu_item_id uuid not null references public.menu_items(id) on delete restrict,
  quantity numeric(12,3) not null,
  unit_price numeric(12,2) not null default 0,
  line_total numeric(12,2) not null default 0,
  estimated_unit_cost numeric(12,2) not null default 0,
  estimated_total_cost numeric(12,2) not null default 0,
  estimated_profit numeric(12,2) not null default 0,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint sale_items_quantity_positive check (quantity > 0),
  constraint sale_items_unit_price_non_negative check (unit_price >= 0),
  constraint sale_items_line_total_non_negative check (line_total >= 0),
  constraint sale_items_estimated_unit_cost_non_negative check (estimated_unit_cost >= 0),
  constraint sale_items_estimated_total_cost_non_negative check (estimated_total_cost >= 0)
);

create table public.expenses (
  id uuid primary key default extensions.gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete restrict,
  supplier_id uuid references public.suppliers(id) on delete set null,
  expense_date date not null default current_date,
  expense_type public.expense_type not null default 'other',
  description text not null,
  amount numeric(12,2) not null,
  payment_method public.payment_method not null default 'cash',
  receipt_url text,
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint expenses_description_not_empty check (length(trim(description)) > 0),
  constraint expenses_amount_non_negative check (amount >= 0)
);

create table public.payroll_payments (
  id uuid primary key default extensions.gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete restrict,
  employee_id uuid not null references public.employees(id) on delete restrict,
  expense_id uuid references public.expenses(id) on delete set null,
  pay_period_start date,
  pay_period_end date,
  payment_date date not null default current_date,
  salary_type public.salary_type not null,
  amount numeric(12,2) not null,
  payment_method public.payment_method not null default 'cash',
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint payroll_payments_amount_non_negative check (amount >= 0),
  constraint payroll_payments_period_order check (
    pay_period_start is null
    or pay_period_end is null
    or pay_period_end >= pay_period_start
  )
);

create table public.owner_withdrawals (
  id uuid primary key default extensions.gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete restrict,
  withdrawal_date date not null default current_date,
  amount numeric(12,2) not null,
  payment_method public.payment_method not null default 'cash',
  reason text,
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint owner_withdrawals_amount_non_negative check (amount >= 0)
);

create table public.capital_contributions (
  id uuid primary key default extensions.gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete restrict,
  contribution_date date not null default current_date,
  contribution_type public.contribution_type not null,
  amount numeric(12,2) not null,
  payment_method public.payment_method not null default 'cash',
  description text,
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint capital_contributions_amount_non_negative check (amount >= 0)
);

create table public.assets (
  id uuid primary key default extensions.gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete restrict,
  supplier_id uuid references public.suppliers(id) on delete set null,
  expense_id uuid references public.expenses(id) on delete set null,
  name text not null,
  category text,
  purchase_date date,
  purchase_value numeric(12,2) not null default 0,
  estimated_current_value numeric(12,2),
  useful_life_months integer,
  status public.asset_status not null default 'active',
  condition text,
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint assets_name_not_empty check (length(trim(name)) > 0),
  constraint assets_purchase_value_non_negative check (purchase_value >= 0),
  constraint assets_estimated_current_value_non_negative check (
    estimated_current_value is null
    or estimated_current_value >= 0
  ),
  constraint assets_useful_life_months_positive check (
    useful_life_months is null
    or useful_life_months > 0
  )
);

create table public.waste_records (
  id uuid primary key default extensions.gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete restrict,
  inventory_item_id uuid not null references public.inventory_items(id) on delete restrict,
  waste_date date not null default current_date,
  quantity numeric(12,3) not null,
  unit public.base_unit not null,
  estimated_unit_cost numeric(12,2) not null default 0,
  estimated_total_loss numeric(12,2) not null default 0,
  reason text,
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint waste_records_quantity_positive check (quantity > 0),
  constraint waste_records_estimated_unit_cost_non_negative check (estimated_unit_cost >= 0),
  constraint waste_records_estimated_total_loss_non_negative check (estimated_total_loss >= 0)
);

create table public.inventory_movements (
  id uuid primary key default extensions.gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete restrict,
  inventory_item_id uuid not null references public.inventory_items(id) on delete restrict,
  movement_type public.movement_type not null,
  quantity numeric(12,3) not null,
  unit public.base_unit not null,
  is_increase boolean not null default false,
  unit_cost_at_time numeric(12,2) not null default 0,
  total_cost_at_time numeric(12,2) not null default 0,
  source_table text,
  source_id uuid,
  occurred_at timestamptz not null default now(),
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint inventory_movements_quantity_positive check (quantity > 0),
  constraint inventory_movements_unit_cost_at_time_non_negative check (unit_cost_at_time >= 0),
  constraint inventory_movements_total_cost_at_time_non_negative check (total_cost_at_time >= 0),
  constraint inventory_movements_source_pair check (
    (source_table is null and source_id is null)
    or (source_table is not null and source_id is not null)
  )
);

create table public.cash_closings (
  id uuid primary key default extensions.gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete restrict,
  closing_date date not null default current_date,
  period_start timestamptz not null,
  period_end timestamptz not null,
  expected_cash numeric(12,2) not null default 0,
  counted_cash numeric(12,2) not null default 0,
  difference numeric(12,2) not null default 0,
  cash_sales_total numeric(12,2) not null default 0,
  cash_expenses_total numeric(12,2) not null default 0,
  cash_withdrawals_total numeric(12,2) not null default 0,
  cash_contributions_total numeric(12,2) not null default 0,
  status text not null default 'closed',
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  reviewed_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cash_closings_period_order check (period_end >= period_start),
  constraint cash_closings_expected_cash_non_negative check (expected_cash >= 0),
  constraint cash_closings_counted_cash_non_negative check (counted_cash >= 0),
  constraint cash_closings_cash_sales_total_non_negative check (cash_sales_total >= 0),
  constraint cash_closings_cash_expenses_total_non_negative check (cash_expenses_total >= 0),
  constraint cash_closings_cash_withdrawals_total_non_negative check (cash_withdrawals_total >= 0),
  constraint cash_closings_cash_contributions_total_non_negative check (cash_contributions_total >= 0),
  constraint cash_closings_status_valid check (status in ('open', 'closed', 'reviewed'))
);

alter table public.profiles add constraint profiles_business_id_id_unique unique (business_id, id);
alter table public.suppliers add constraint suppliers_business_id_id_unique unique (business_id, id);
alter table public.employees add constraint employees_business_id_id_unique unique (business_id, id);
alter table public.inventory_items add constraint inventory_items_business_id_id_unique unique (business_id, id);
alter table public.menu_items add constraint menu_items_business_id_id_unique unique (business_id, id);
alter table public.recipe_ingredients add constraint recipe_ingredients_business_id_id_unique unique (business_id, id);
alter table public.purchases add constraint purchases_business_id_id_unique unique (business_id, id);
alter table public.sales add constraint sales_business_id_id_unique unique (business_id, id);
alter table public.sale_items add constraint sale_items_business_id_id_unique unique (business_id, id);
alter table public.expenses add constraint expenses_business_id_id_unique unique (business_id, id);
alter table public.payroll_payments add constraint payroll_payments_business_id_id_unique unique (business_id, id);
alter table public.owner_withdrawals add constraint owner_withdrawals_business_id_id_unique unique (business_id, id);
alter table public.capital_contributions add constraint capital_contributions_business_id_id_unique unique (business_id, id);
alter table public.assets add constraint assets_business_id_id_unique unique (business_id, id);
alter table public.waste_records add constraint waste_records_business_id_id_unique unique (business_id, id);
alter table public.inventory_movements add constraint inventory_movements_business_id_id_unique unique (business_id, id);
alter table public.cash_closings add constraint cash_closings_business_id_id_unique unique (business_id, id);

alter table public.suppliers
  add constraint suppliers_business_created_by_fk
  foreign key (business_id, created_by) references public.profiles(business_id, id);

alter table public.employees
  add constraint employees_business_profile_fk
  foreign key (business_id, profile_id) references public.profiles(business_id, id),
  add constraint employees_business_created_by_fk
  foreign key (business_id, created_by) references public.profiles(business_id, id);

alter table public.inventory_items
  add constraint inventory_items_business_created_by_fk
  foreign key (business_id, created_by) references public.profiles(business_id, id);

alter table public.menu_items
  add constraint menu_items_business_created_by_fk
  foreign key (business_id, created_by) references public.profiles(business_id, id);

alter table public.recipe_ingredients
  add constraint recipe_ingredients_business_menu_item_fk
  foreign key (business_id, menu_item_id) references public.menu_items(business_id, id),
  add constraint recipe_ingredients_business_inventory_item_fk
  foreign key (business_id, inventory_item_id) references public.inventory_items(business_id, id),
  add constraint recipe_ingredients_business_created_by_fk
  foreign key (business_id, created_by) references public.profiles(business_id, id);

alter table public.purchases
  add constraint purchases_business_supplier_fk
  foreign key (business_id, supplier_id) references public.suppliers(business_id, id),
  add constraint purchases_business_inventory_item_fk
  foreign key (business_id, inventory_item_id) references public.inventory_items(business_id, id),
  add constraint purchases_business_created_by_fk
  foreign key (business_id, created_by) references public.profiles(business_id, id);

alter table public.sales
  add constraint sales_business_created_by_fk
  foreign key (business_id, created_by) references public.profiles(business_id, id);

alter table public.sale_items
  add constraint sale_items_business_sale_fk
  foreign key (business_id, sale_id) references public.sales(business_id, id),
  add constraint sale_items_business_menu_item_fk
  foreign key (business_id, menu_item_id) references public.menu_items(business_id, id),
  add constraint sale_items_business_created_by_fk
  foreign key (business_id, created_by) references public.profiles(business_id, id);

alter table public.expenses
  add constraint expenses_business_supplier_fk
  foreign key (business_id, supplier_id) references public.suppliers(business_id, id),
  add constraint expenses_business_created_by_fk
  foreign key (business_id, created_by) references public.profiles(business_id, id);

alter table public.payroll_payments
  add constraint payroll_payments_business_employee_fk
  foreign key (business_id, employee_id) references public.employees(business_id, id),
  add constraint payroll_payments_business_expense_fk
  foreign key (business_id, expense_id) references public.expenses(business_id, id),
  add constraint payroll_payments_business_created_by_fk
  foreign key (business_id, created_by) references public.profiles(business_id, id);

alter table public.owner_withdrawals
  add constraint owner_withdrawals_business_created_by_fk
  foreign key (business_id, created_by) references public.profiles(business_id, id);

alter table public.capital_contributions
  add constraint capital_contributions_business_created_by_fk
  foreign key (business_id, created_by) references public.profiles(business_id, id);

alter table public.assets
  add constraint assets_business_supplier_fk
  foreign key (business_id, supplier_id) references public.suppliers(business_id, id),
  add constraint assets_business_expense_fk
  foreign key (business_id, expense_id) references public.expenses(business_id, id),
  add constraint assets_business_created_by_fk
  foreign key (business_id, created_by) references public.profiles(business_id, id);

alter table public.waste_records
  add constraint waste_records_business_inventory_item_fk
  foreign key (business_id, inventory_item_id) references public.inventory_items(business_id, id),
  add constraint waste_records_business_created_by_fk
  foreign key (business_id, created_by) references public.profiles(business_id, id);

alter table public.inventory_movements
  add constraint inventory_movements_business_inventory_item_fk
  foreign key (business_id, inventory_item_id) references public.inventory_items(business_id, id),
  add constraint inventory_movements_business_created_by_fk
  foreign key (business_id, created_by) references public.profiles(business_id, id);

alter table public.cash_closings
  add constraint cash_closings_business_created_by_fk
  foreign key (business_id, created_by) references public.profiles(business_id, id),
  add constraint cash_closings_business_reviewed_by_fk
  foreign key (business_id, reviewed_by) references public.profiles(business_id, id);

create or replace function public.validate_inventory_item_base_unit()
returns trigger
language plpgsql
as $$
declare
  expected_unit public.base_unit;
begin
  select base_unit
  into expected_unit
  from public.inventory_items
  where id = new.inventory_item_id
    and business_id = new.business_id;

  if expected_unit is not null and new.unit <> expected_unit then
    raise exception 'Unit % does not match inventory item base unit %', new.unit, expected_unit;
  end if;

  return new;
end;
$$;

create trigger validate_purchases_unit
before insert or update of business_id, inventory_item_id, unit on public.purchases
for each row execute function public.validate_inventory_item_base_unit();

create trigger validate_recipe_ingredients_unit
before insert or update of business_id, inventory_item_id, unit on public.recipe_ingredients
for each row execute function public.validate_inventory_item_base_unit();

create trigger validate_waste_records_unit
before insert or update of business_id, inventory_item_id, unit on public.waste_records
for each row execute function public.validate_inventory_item_base_unit();

create trigger validate_inventory_movements_unit
before insert or update of business_id, inventory_item_id, unit on public.inventory_movements
for each row execute function public.validate_inventory_item_base_unit();

create trigger set_businesses_updated_at
before update on public.businesses
for each row execute function public.set_updated_at();

create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger set_suppliers_updated_at
before update on public.suppliers
for each row execute function public.set_updated_at();

create trigger set_employees_updated_at
before update on public.employees
for each row execute function public.set_updated_at();

create trigger set_inventory_items_updated_at
before update on public.inventory_items
for each row execute function public.set_updated_at();

create trigger set_menu_items_updated_at
before update on public.menu_items
for each row execute function public.set_updated_at();

create trigger set_recipe_ingredients_updated_at
before update on public.recipe_ingredients
for each row execute function public.set_updated_at();

create trigger set_purchases_updated_at
before update on public.purchases
for each row execute function public.set_updated_at();

create trigger set_sales_updated_at
before update on public.sales
for each row execute function public.set_updated_at();

create trigger set_sale_items_updated_at
before update on public.sale_items
for each row execute function public.set_updated_at();

create trigger set_expenses_updated_at
before update on public.expenses
for each row execute function public.set_updated_at();

create trigger set_payroll_payments_updated_at
before update on public.payroll_payments
for each row execute function public.set_updated_at();

create trigger set_owner_withdrawals_updated_at
before update on public.owner_withdrawals
for each row execute function public.set_updated_at();

create trigger set_capital_contributions_updated_at
before update on public.capital_contributions
for each row execute function public.set_updated_at();

create trigger set_assets_updated_at
before update on public.assets
for each row execute function public.set_updated_at();

create trigger set_waste_records_updated_at
before update on public.waste_records
for each row execute function public.set_updated_at();

create trigger set_inventory_movements_updated_at
before update on public.inventory_movements
for each row execute function public.set_updated_at();

create trigger set_cash_closings_updated_at
before update on public.cash_closings
for each row execute function public.set_updated_at();

create index businesses_created_at_idx on public.businesses(created_at);

create index profiles_business_id_idx on public.profiles(business_id);
create index profiles_role_idx on public.profiles(role);
create index profiles_created_at_idx on public.profiles(created_at);

create index suppliers_business_id_idx on public.suppliers(business_id);
create index suppliers_created_by_idx on public.suppliers(created_by);
create index suppliers_created_at_idx on public.suppliers(created_at);

create index employees_business_id_idx on public.employees(business_id);
create index employees_profile_id_idx on public.employees(profile_id);
create index employees_created_by_idx on public.employees(created_by);
create index employees_hire_date_idx on public.employees(hire_date);

create index inventory_items_business_id_idx on public.inventory_items(business_id);
create index inventory_items_created_by_idx on public.inventory_items(created_by);
create index inventory_items_low_stock_idx on public.inventory_items(business_id, current_quantity, low_stock_threshold);

create index menu_items_business_id_idx on public.menu_items(business_id);
create index menu_items_created_by_idx on public.menu_items(created_by);
create index menu_items_category_idx on public.menu_items(business_id, category);

create index recipe_ingredients_business_id_idx on public.recipe_ingredients(business_id);
create index recipe_ingredients_menu_item_id_idx on public.recipe_ingredients(menu_item_id);
create index recipe_ingredients_inventory_item_id_idx on public.recipe_ingredients(inventory_item_id);
create index recipe_ingredients_created_by_idx on public.recipe_ingredients(created_by);

create index purchases_business_id_idx on public.purchases(business_id);
create index purchases_supplier_id_idx on public.purchases(supplier_id);
create index purchases_inventory_item_id_idx on public.purchases(inventory_item_id);
create index purchases_created_by_idx on public.purchases(created_by);
create index purchases_purchase_date_idx on public.purchases(business_id, purchase_date);
create index purchases_status_idx on public.purchases(business_id, status);
create index purchases_created_at_idx on public.purchases(created_at);

create index sales_business_id_idx on public.sales(business_id);
create index sales_created_by_idx on public.sales(created_by);
create index sales_sale_date_idx on public.sales(business_id, sale_date);
create index sales_payment_method_idx on public.sales(business_id, payment_method);
create index sales_status_idx on public.sales(business_id, status);
create index sales_created_at_idx on public.sales(created_at);

create index sale_items_business_id_idx on public.sale_items(business_id);
create index sale_items_sale_id_idx on public.sale_items(sale_id);
create index sale_items_menu_item_id_idx on public.sale_items(menu_item_id);
create index sale_items_created_by_idx on public.sale_items(created_by);
create index sale_items_created_at_idx on public.sale_items(created_at);

create index expenses_business_id_idx on public.expenses(business_id);
create index expenses_supplier_id_idx on public.expenses(supplier_id);
create index expenses_created_by_idx on public.expenses(created_by);
create index expenses_expense_date_idx on public.expenses(business_id, expense_date);
create index expenses_expense_type_idx on public.expenses(business_id, expense_type);
create index expenses_created_at_idx on public.expenses(created_at);

create index payroll_payments_business_id_idx on public.payroll_payments(business_id);
create index payroll_payments_employee_id_idx on public.payroll_payments(employee_id);
create index payroll_payments_expense_id_idx on public.payroll_payments(expense_id);
create index payroll_payments_created_by_idx on public.payroll_payments(created_by);
create index payroll_payments_payment_date_idx on public.payroll_payments(business_id, payment_date);

create index owner_withdrawals_business_id_idx on public.owner_withdrawals(business_id);
create index owner_withdrawals_created_by_idx on public.owner_withdrawals(created_by);
create index owner_withdrawals_withdrawal_date_idx on public.owner_withdrawals(business_id, withdrawal_date);

create index capital_contributions_business_id_idx on public.capital_contributions(business_id);
create index capital_contributions_created_by_idx on public.capital_contributions(created_by);
create index capital_contributions_contribution_date_idx on public.capital_contributions(business_id, contribution_date);

create index assets_business_id_idx on public.assets(business_id);
create index assets_supplier_id_idx on public.assets(supplier_id);
create index assets_expense_id_idx on public.assets(expense_id);
create index assets_created_by_idx on public.assets(created_by);
create index assets_purchase_date_idx on public.assets(business_id, purchase_date);
create index assets_status_idx on public.assets(business_id, status);

create index waste_records_business_id_idx on public.waste_records(business_id);
create index waste_records_inventory_item_id_idx on public.waste_records(inventory_item_id);
create index waste_records_created_by_idx on public.waste_records(created_by);
create index waste_records_waste_date_idx on public.waste_records(business_id, waste_date);

create index inventory_movements_business_id_idx on public.inventory_movements(business_id);
create index inventory_movements_inventory_item_id_idx on public.inventory_movements(inventory_item_id);
create index inventory_movements_created_by_idx on public.inventory_movements(created_by);
create index inventory_movements_occurred_at_idx on public.inventory_movements(business_id, occurred_at);
create index inventory_movements_movement_type_idx on public.inventory_movements(business_id, movement_type);
create index inventory_movements_source_idx on public.inventory_movements(source_table, source_id);

create index cash_closings_business_id_idx on public.cash_closings(business_id);
create index cash_closings_created_by_idx on public.cash_closings(created_by);
create index cash_closings_reviewed_by_idx on public.cash_closings(reviewed_by);
create index cash_closings_closing_date_idx on public.cash_closings(business_id, closing_date);
create index cash_closings_period_idx on public.cash_closings(business_id, period_start, period_end);
create index cash_closings_status_idx on public.cash_closings(business_id, status);
