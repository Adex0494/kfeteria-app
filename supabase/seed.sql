-- Kfeteria MVP local seed data.
-- Auth users/profiles are intentionally not seeded here because Supabase auth.users
-- has environment-managed columns and constraints. Business-owned rows keep
-- created_by/profile_id nullable so the seed remains portable and safe locally.

insert into public.businesses (
  id,
  name,
  legal_name,
  phone,
  email,
  address,
  currency,
  timezone,
  is_active
) values (
  '00000000-0000-4000-8000-000000000001',
  'Kfeteria',
  'Kfeteria',
  '809-555-0101',
  'admin@kfeteria.local',
  'Santo Domingo, Republica Dominicana',
  'DOP',
  'America/Santo_Domingo',
  true
) on conflict (id) do update set
  name = excluded.name,
  legal_name = excluded.legal_name,
  phone = excluded.phone,
  email = excluded.email,
  address = excluded.address,
  currency = excluded.currency,
  timezone = excluded.timezone,
  is_active = excluded.is_active;

insert into public.suppliers (id, business_id, name, contact_name, phone, notes, is_active) values
  ('00000000-0000-4000-8000-000000000101', '00000000-0000-4000-8000-000000000001', 'Mercado Nuevo', 'Jose Ramirez', '809-555-0201', 'Proveedor principal de arroz, habichuelas y pollo.', true),
  ('00000000-0000-4000-8000-000000000102', '00000000-0000-4000-8000-000000000001', 'Distribuidora Lacteos Duarte', 'Maria Duarte', '809-555-0202', 'Jamon y queso para tostadas.', true),
  ('00000000-0000-4000-8000-000000000103', '00000000-0000-4000-8000-000000000001', 'Panaderia La Esquina', 'Rafael Perez', '809-555-0203', 'Pan fresco diario.', true),
  ('00000000-0000-4000-8000-000000000104', '00000000-0000-4000-8000-000000000001', 'Bebidas Caribe', 'Ana Lopez', '809-555-0204', 'Refrescos y agua embotellada.', true),
  ('00000000-0000-4000-8000-000000000105', '00000000-0000-4000-8000-000000000001', 'Equipos Comerciales SRL', 'Luis Castillo', '809-555-0205', 'Equipos y mobiliario.', true)
on conflict (id) do update set
  business_id = excluded.business_id,
  name = excluded.name,
  contact_name = excluded.contact_name,
  phone = excluded.phone,
  notes = excluded.notes,
  is_active = excluded.is_active;

insert into public.employees (
  id,
  business_id,
  full_name,
  position,
  phone,
  salary_amount,
  salary_type,
  hire_date,
  is_active
) values
  ('00000000-0000-4000-8000-000000000201', '00000000-0000-4000-8000-000000000001', 'Kdie', 'Administradora/Cocinera', '809-555-0301', 2500.00, 'weekly', '2026-01-15', true),
  ('00000000-0000-4000-8000-000000000202', '00000000-0000-4000-8000-000000000001', 'Stanley', 'Compras/Caja', '809-555-0302', 1800.00, 'weekly', '2026-02-01', true),
  ('00000000-0000-4000-8000-000000000203', '00000000-0000-4000-8000-000000000001', 'Ayudante', 'Atencion/Apoyo', '809-555-0303', 1200.00, 'weekly', '2026-03-01', true)
on conflict (id) do update set
  business_id = excluded.business_id,
  full_name = excluded.full_name,
  position = excluded.position,
  phone = excluded.phone,
  salary_amount = excluded.salary_amount,
  salary_type = excluded.salary_type,
  hire_date = excluded.hire_date,
  is_active = excluded.is_active;

insert into public.inventory_items (
  id,
  business_id,
  name,
  sku,
  item_type,
  base_unit,
  current_quantity,
  average_unit_cost,
  low_stock_threshold,
  is_active
) values
  ('00000000-0000-4000-8000-000000000301', '00000000-0000-4000-8000-000000000001', 'Arroz', 'INV-ARROZ', 'weight', 'lb', 98.500, 37.00, 20.000, true),
  ('00000000-0000-4000-8000-000000000302', '00000000-0000-4000-8000-000000000001', 'Habichuelas', 'INV-HABICHUELAS', 'weight', 'lb', 49.250, 45.00, 10.000, true),
  ('00000000-0000-4000-8000-000000000303', '00000000-0000-4000-8000-000000000001', 'Aceite', 'INV-ACEITE', 'liquid', 'oz', 126.500, 18.00, 32.000, true),
  ('00000000-0000-4000-8000-000000000304', '00000000-0000-4000-8000-000000000001', 'Jamon', 'INV-JAMON', 'weight', 'lb', 14.600, 160.00, 5.000, true),
  ('00000000-0000-4000-8000-000000000305', '00000000-0000-4000-8000-000000000001', 'Queso', 'INV-QUESO', 'weight', 'lb', 14.600, 180.00, 5.000, true),
  ('00000000-0000-4000-8000-000000000306', '00000000-0000-4000-8000-000000000001', 'Pan', 'INV-PAN', 'countable', 'unit', 113.000, 8.00, 30.000, true),
  ('00000000-0000-4000-8000-000000000307', '00000000-0000-4000-8000-000000000001', 'Ketchup', 'INV-KETCHUP', 'liquid', 'oz', 62.000, 12.00, 16.000, true),
  ('00000000-0000-4000-8000-000000000308', '00000000-0000-4000-8000-000000000001', 'Mayonesa', 'INV-MAYONESA', 'liquid', 'oz', 62.000, 14.00, 16.000, true),
  ('00000000-0000-4000-8000-000000000309', '00000000-0000-4000-8000-000000000001', 'Pollo', 'INV-POLLO', 'weight', 'lb', 37.300, 95.00, 10.000, true),
  ('00000000-0000-4000-8000-000000000310', '00000000-0000-4000-8000-000000000001', 'Refrescos', 'INV-REFRESCOS', 'countable', 'bottle', 94.000, 30.00, 24.000, true),
  ('00000000-0000-4000-8000-000000000311', '00000000-0000-4000-8000-000000000001', 'Agua', 'INV-AGUA', 'countable', 'bottle', 72.000, 18.00, 24.000, true)
on conflict (id) do update set
  business_id = excluded.business_id,
  name = excluded.name,
  sku = excluded.sku,
  item_type = excluded.item_type,
  base_unit = excluded.base_unit,
  current_quantity = excluded.current_quantity,
  average_unit_cost = excluded.average_unit_cost,
  low_stock_threshold = excluded.low_stock_threshold,
  is_active = excluded.is_active;

insert into public.menu_items (
  id,
  business_id,
  name,
  description,
  category,
  sale_price,
  estimated_cost,
  estimated_profit,
  estimated_margin_percent,
  is_active
) values
  ('00000000-0000-4000-8000-000000000401', '00000000-0000-4000-8000-000000000001', 'Tostada de jamon y queso', 'Pan tostado con jamon, queso, ketchup y mayonesa.', 'Desayuno', 120.00, 55.00, 65.00, 54.17, true),
  ('00000000-0000-4000-8000-000000000402', '00000000-0000-4000-8000-000000000001', 'Cafe', 'Cafe caliente para desayuno.', 'Bebidas', 50.00, 0.00, 50.00, 100.00, true),
  ('00000000-0000-4000-8000-000000000403', '00000000-0000-4000-8000-000000000001', 'Jugo natural', 'Jugo natural del dia.', 'Bebidas', 75.00, 0.00, 75.00, 100.00, true),
  ('00000000-0000-4000-8000-000000000404', '00000000-0000-4000-8000-000000000001', 'Almuerzo ejecutivo', 'Arroz, habichuelas y pollo.', 'Almuerzo', 250.00, 76.75, 173.25, 69.30, true),
  ('00000000-0000-4000-8000-000000000405', '00000000-0000-4000-8000-000000000001', 'Cena', 'Plato sencillo de cierre.', 'Cena', 220.00, 0.00, 220.00, 100.00, true),
  ('00000000-0000-4000-8000-000000000406', '00000000-0000-4000-8000-000000000001', 'Refresco', 'Bebida embotellada fria.', 'Bebidas', 60.00, 30.00, 30.00, 50.00, true)
on conflict (id) do update set
  business_id = excluded.business_id,
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  sale_price = excluded.sale_price,
  estimated_cost = excluded.estimated_cost,
  estimated_profit = excluded.estimated_profit,
  estimated_margin_percent = excluded.estimated_margin_percent,
  is_active = excluded.is_active;

insert into public.recipe_ingredients (id, business_id, menu_item_id, inventory_item_id, quantity, unit) values
  ('00000000-0000-4000-8000-000000000501', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000401', '00000000-0000-4000-8000-000000000306', 1.000, 'unit'),
  ('00000000-0000-4000-8000-000000000502', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000401', '00000000-0000-4000-8000-000000000304', 0.100, 'lb'),
  ('00000000-0000-4000-8000-000000000503', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000401', '00000000-0000-4000-8000-000000000305', 0.100, 'lb'),
  ('00000000-0000-4000-8000-000000000504', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000401', '00000000-0000-4000-8000-000000000307', 0.500, 'oz'),
  ('00000000-0000-4000-8000-000000000505', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000401', '00000000-0000-4000-8000-000000000308', 0.500, 'oz'),
  ('00000000-0000-4000-8000-000000000506', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000404', '00000000-0000-4000-8000-000000000301', 0.500, 'lb'),
  ('00000000-0000-4000-8000-000000000507', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000404', '00000000-0000-4000-8000-000000000302', 0.250, 'lb'),
  ('00000000-0000-4000-8000-000000000508', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000404', '00000000-0000-4000-8000-000000000309', 0.400, 'lb'),
  ('00000000-0000-4000-8000-000000000509', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000404', '00000000-0000-4000-8000-000000000303', 0.500, 'oz'),
  ('00000000-0000-4000-8000-000000000510', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000406', '00000000-0000-4000-8000-000000000310', 1.000, 'bottle')
on conflict (id) do update set
  business_id = excluded.business_id,
  menu_item_id = excluded.menu_item_id,
  inventory_item_id = excluded.inventory_item_id,
  quantity = excluded.quantity,
  unit = excluded.unit;

insert into public.purchases (
  id,
  business_id,
  supplier_id,
  inventory_item_id,
  purchase_date,
  quantity,
  unit,
  unit_cost,
  total_cost,
  payment_method,
  status,
  notes
) values
  ('00000000-0000-4000-8000-000000000601', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000101', '00000000-0000-4000-8000-000000000301', '2026-06-07', 100.000, 'lb', 37.00, 3700.00, 'cash', 'completed', 'Compra inicial de arroz.'),
  ('00000000-0000-4000-8000-000000000602', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000101', '00000000-0000-4000-8000-000000000302', '2026-06-07', 50.000, 'lb', 45.00, 2250.00, 'cash', 'completed', 'Compra inicial de habichuelas.'),
  ('00000000-0000-4000-8000-000000000603', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000101', '00000000-0000-4000-8000-000000000303', '2026-06-07', 128.000, 'oz', 18.00, 2304.00, 'transfer', 'completed', 'Aceite para cocina.'),
  ('00000000-0000-4000-8000-000000000604', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000102', '00000000-0000-4000-8000-000000000304', '2026-06-07', 15.000, 'lb', 160.00, 2400.00, 'transfer', 'completed', 'Jamon para tostadas.'),
  ('00000000-0000-4000-8000-000000000605', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000102', '00000000-0000-4000-8000-000000000305', '2026-06-07', 15.000, 'lb', 180.00, 2700.00, 'transfer', 'completed', 'Queso para tostadas.'),
  ('00000000-0000-4000-8000-000000000606', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000103', '00000000-0000-4000-8000-000000000306', '2026-06-08', 120.000, 'unit', 8.00, 960.00, 'cash', 'completed', 'Pan fresco para el dia.'),
  ('00000000-0000-4000-8000-000000000607', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000101', '00000000-0000-4000-8000-000000000307', '2026-06-07', 64.000, 'oz', 12.00, 768.00, 'cash', 'completed', 'Ketchup para cocina.'),
  ('00000000-0000-4000-8000-000000000608', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000101', '00000000-0000-4000-8000-000000000308', '2026-06-07', 64.000, 'oz', 14.00, 896.00, 'cash', 'completed', 'Mayonesa para cocina.'),
  ('00000000-0000-4000-8000-000000000609', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000101', '00000000-0000-4000-8000-000000000309', '2026-06-07', 40.000, 'lb', 95.00, 3800.00, 'transfer', 'completed', 'Pollo para almuerzos.'),
  ('00000000-0000-4000-8000-000000000610', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000104', '00000000-0000-4000-8000-000000000310', '2026-06-07', 96.000, 'bottle', 30.00, 2880.00, 'credit', 'completed', 'Refrescos embotellados.'),
  ('00000000-0000-4000-8000-000000000611', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000104', '00000000-0000-4000-8000-000000000311', '2026-06-07', 72.000, 'bottle', 18.00, 1296.00, 'credit', 'completed', 'Agua embotellada.')
on conflict (id) do update set
  business_id = excluded.business_id,
  supplier_id = excluded.supplier_id,
  inventory_item_id = excluded.inventory_item_id,
  purchase_date = excluded.purchase_date,
  quantity = excluded.quantity,
  unit = excluded.unit,
  unit_cost = excluded.unit_cost,
  total_cost = excluded.total_cost,
  payment_method = excluded.payment_method,
  status = excluded.status,
  notes = excluded.notes;

insert into public.sales (
  id,
  business_id,
  sale_date,
  subtotal,
  discount_total,
  tax_total,
  total,
  payment_method,
  cash_received,
  change_given,
  status,
  estimated_cost,
  estimated_profit,
  notes
) values
  ('00000000-0000-4000-8000-000000000701', '00000000-0000-4000-8000-000000000001', '2026-06-08', 580.00, 0.00, 0.00, 580.00, 'cash', 600.00, 20.00, 'completed', 220.00, 360.00, 'Desayuno: tostadas y cafe.'),
  ('00000000-0000-4000-8000-000000000702', '00000000-0000-4000-8000-000000000001', '2026-06-08', 870.00, 0.00, 0.00, 870.00, 'card', 0.00, 0.00, 'completed', 290.25, 579.75, 'Almuerzo con refrescos.'),
  ('00000000-0000-4000-8000-000000000703', '00000000-0000-4000-8000-000000000001', '2026-06-08', 220.00, 0.00, 0.00, 220.00, 'cash', 220.00, 0.00, 'completed', 0.00, 220.00, 'Cena sencilla.')
on conflict (id) do update set
  business_id = excluded.business_id,
  sale_date = excluded.sale_date,
  subtotal = excluded.subtotal,
  discount_total = excluded.discount_total,
  tax_total = excluded.tax_total,
  total = excluded.total,
  payment_method = excluded.payment_method,
  cash_received = excluded.cash_received,
  change_given = excluded.change_given,
  status = excluded.status,
  estimated_cost = excluded.estimated_cost,
  estimated_profit = excluded.estimated_profit,
  notes = excluded.notes;

insert into public.sale_items (
  id,
  business_id,
  sale_id,
  menu_item_id,
  quantity,
  unit_price,
  line_total,
  estimated_unit_cost,
  estimated_total_cost,
  estimated_profit
) values
  ('00000000-0000-4000-8000-000000000711', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000701', '00000000-0000-4000-8000-000000000401', 4.000, 120.00, 480.00, 55.00, 220.00, 260.00),
  ('00000000-0000-4000-8000-000000000712', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000701', '00000000-0000-4000-8000-000000000402', 2.000, 50.00, 100.00, 0.00, 0.00, 100.00),
  ('00000000-0000-4000-8000-000000000713', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000702', '00000000-0000-4000-8000-000000000404', 3.000, 250.00, 750.00, 76.75, 230.25, 519.75),
  ('00000000-0000-4000-8000-000000000714', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000702', '00000000-0000-4000-8000-000000000406', 2.000, 60.00, 120.00, 30.00, 60.00, 60.00),
  ('00000000-0000-4000-8000-000000000715', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000703', '00000000-0000-4000-8000-000000000405', 1.000, 220.00, 220.00, 0.00, 0.00, 220.00)
on conflict (id) do update set
  business_id = excluded.business_id,
  sale_id = excluded.sale_id,
  menu_item_id = excluded.menu_item_id,
  quantity = excluded.quantity,
  unit_price = excluded.unit_price,
  line_total = excluded.line_total,
  estimated_unit_cost = excluded.estimated_unit_cost,
  estimated_total_cost = excluded.estimated_total_cost,
  estimated_profit = excluded.estimated_profit;

insert into public.expenses (
  id,
  business_id,
  supplier_id,
  expense_date,
  expense_type,
  description,
  amount,
  payment_method,
  notes
) values
  ('00000000-0000-4000-8000-000000000801', '00000000-0000-4000-8000-000000000001', null, '2026-06-08', 'gas', 'Recarga de gas de cocina', 1200.00, 'cash', 'Gasto operativo de cocina.'),
  ('00000000-0000-4000-8000-000000000802', '00000000-0000-4000-8000-000000000001', null, '2026-06-08', 'electricity', 'Pago parcial de electricidad', 2500.00, 'transfer', 'Servicio electrico.'),
  ('00000000-0000-4000-8000-000000000803', '00000000-0000-4000-8000-000000000001', null, '2026-06-08', 'packaging', 'Fundas y empaques del dia', 450.00, 'cash', 'Material de empaque para ventas.'),
  ('00000000-0000-4000-8000-000000000804', '00000000-0000-4000-8000-000000000001', null, '2026-06-07', 'payroll', 'Pago semanal Kdie', 2500.00, 'transfer', 'Nomina semanal.'),
  ('00000000-0000-4000-8000-000000000805', '00000000-0000-4000-8000-000000000001', null, '2026-06-07', 'payroll', 'Pago semanal Stanley', 1800.00, 'transfer', 'Nomina semanal.'),
  ('00000000-0000-4000-8000-000000000806', '00000000-0000-4000-8000-000000000001', null, '2026-06-07', 'payroll', 'Pago semanal Ayudante', 1200.00, 'cash', 'Nomina semanal.')
on conflict (id) do update set
  business_id = excluded.business_id,
  supplier_id = excluded.supplier_id,
  expense_date = excluded.expense_date,
  expense_type = excluded.expense_type,
  description = excluded.description,
  amount = excluded.amount,
  payment_method = excluded.payment_method,
  notes = excluded.notes;

insert into public.payroll_payments (
  id,
  business_id,
  employee_id,
  expense_id,
  pay_period_start,
  pay_period_end,
  payment_date,
  salary_type,
  amount,
  payment_method,
  notes
) values
  ('00000000-0000-4000-8000-000000000811', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000201', '00000000-0000-4000-8000-000000000804', '2026-06-01', '2026-06-07', '2026-06-07', 'weekly', 2500.00, 'transfer', 'Pago semanal administradora/cocinera.'),
  ('00000000-0000-4000-8000-000000000812', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000202', '00000000-0000-4000-8000-000000000805', '2026-06-01', '2026-06-07', '2026-06-07', 'weekly', 1800.00, 'transfer', 'Pago semanal compras/caja.'),
  ('00000000-0000-4000-8000-000000000813', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000203', '00000000-0000-4000-8000-000000000806', '2026-06-01', '2026-06-07', '2026-06-07', 'weekly', 1200.00, 'cash', 'Pago semanal atencion/apoyo.')
on conflict (id) do update set
  business_id = excluded.business_id,
  employee_id = excluded.employee_id,
  expense_id = excluded.expense_id,
  pay_period_start = excluded.pay_period_start,
  pay_period_end = excluded.pay_period_end,
  payment_date = excluded.payment_date,
  salary_type = excluded.salary_type,
  amount = excluded.amount,
  payment_method = excluded.payment_method,
  notes = excluded.notes;

insert into public.owner_withdrawals (
  id,
  business_id,
  withdrawal_date,
  amount,
  payment_method,
  reason,
  notes
) values (
  '00000000-0000-4000-8000-000000000901',
  '00000000-0000-4000-8000-000000000001',
  '2026-06-07',
  3000.00,
  'cash',
  'Retiro personal del propietario',
  'No se registra como gasto operativo.'
) on conflict (id) do update set
  business_id = excluded.business_id,
  withdrawal_date = excluded.withdrawal_date,
  amount = excluded.amount,
  payment_method = excluded.payment_method,
  reason = excluded.reason,
  notes = excluded.notes;

insert into public.capital_contributions (
  id,
  business_id,
  contribution_date,
  contribution_type,
  amount,
  payment_method,
  description,
  notes
) values (
  '00000000-0000-4000-8000-000000000902',
  '00000000-0000-4000-8000-000000000001',
  '2026-06-01',
  'capital',
  50000.00,
  'cash',
  'Capital inicial para operaciones',
  'No se registra como venta ni ganancia.'
) on conflict (id) do update set
  business_id = excluded.business_id,
  contribution_date = excluded.contribution_date,
  contribution_type = excluded.contribution_type,
  amount = excluded.amount,
  payment_method = excluded.payment_method,
  description = excluded.description,
  notes = excluded.notes;

insert into public.assets (
  id,
  business_id,
  supplier_id,
  name,
  category,
  purchase_date,
  purchase_value,
  estimated_current_value,
  useful_life_months,
  status,
  condition,
  notes
) values
  ('00000000-0000-4000-8000-000000000911', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000105', 'Nevera comercial', 'Equipo de refrigeracion', '2026-05-15', 55000.00, 52000.00, 60, 'active', 'Buena', 'Depreciacion informativa solamente.'),
  ('00000000-0000-4000-8000-000000000912', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000105', 'Freidora', 'Equipo de cocina', '2026-05-20', 18000.00, 17000.00, 36, 'active', 'Buena', 'Equipo usado en preparacion.'),
  ('00000000-0000-4000-8000-000000000913', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000105', 'Licuadora industrial', 'Equipo de bebidas', '2026-05-25', 4500.00, 4200.00, 24, 'active', 'Buena', 'Para jugos naturales.')
on conflict (id) do update set
  business_id = excluded.business_id,
  supplier_id = excluded.supplier_id,
  name = excluded.name,
  category = excluded.category,
  purchase_date = excluded.purchase_date,
  purchase_value = excluded.purchase_value,
  estimated_current_value = excluded.estimated_current_value,
  useful_life_months = excluded.useful_life_months,
  status = excluded.status,
  condition = excluded.condition,
  notes = excluded.notes;

insert into public.waste_records (
  id,
  business_id,
  inventory_item_id,
  waste_date,
  quantity,
  unit,
  estimated_unit_cost,
  estimated_total_loss,
  reason,
  notes
) values
  ('00000000-0000-4000-8000-000000000921', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000306', '2026-06-08', 3.000, 'unit', 8.00, 24.00, 'Pan danado', 'Pan aplastado durante el servicio.'),
  ('00000000-0000-4000-8000-000000000922', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000309', '2026-06-08', 1.500, 'lb', 95.00, 142.50, 'Pollo quemado', 'Perdida durante preparacion.')
on conflict (id) do update set
  business_id = excluded.business_id,
  inventory_item_id = excluded.inventory_item_id,
  waste_date = excluded.waste_date,
  quantity = excluded.quantity,
  unit = excluded.unit,
  estimated_unit_cost = excluded.estimated_unit_cost,
  estimated_total_loss = excluded.estimated_total_loss,
  reason = excluded.reason,
  notes = excluded.notes;

insert into public.cash_closings (
  id,
  business_id,
  closing_date,
  period_start,
  period_end,
  expected_cash,
  counted_cash,
  difference,
  cash_sales_total,
  cash_expenses_total,
  cash_withdrawals_total,
  cash_contributions_total,
  status,
  notes
) values (
  '00000000-0000-4000-8000-000000000931',
  '00000000-0000-4000-8000-000000000001',
  '2026-06-08',
  '2026-06-08 08:00:00-04',
  '2026-06-08 18:00:00-04',
  350.00,
  340.00,
  -10.00,
  800.00,
  450.00,
  0.00,
  0.00,
  'closed',
  'Cierre de caja del dia con diferencia menor.'
) on conflict (id) do update set
  business_id = excluded.business_id,
  closing_date = excluded.closing_date,
  period_start = excluded.period_start,
  period_end = excluded.period_end,
  expected_cash = excluded.expected_cash,
  counted_cash = excluded.counted_cash,
  difference = excluded.difference,
  cash_sales_total = excluded.cash_sales_total,
  cash_expenses_total = excluded.cash_expenses_total,
  cash_withdrawals_total = excluded.cash_withdrawals_total,
  cash_contributions_total = excluded.cash_contributions_total,
  status = excluded.status,
  notes = excluded.notes;

insert into public.inventory_movements (
  id,
  business_id,
  inventory_item_id,
  movement_type,
  quantity,
  unit,
  is_increase,
  unit_cost_at_time,
  total_cost_at_time,
  source_table,
  source_id,
  occurred_at,
  notes
) values
  ('00000000-0000-4000-8000-000000001001', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000301', 'purchase', 100.000, 'lb', true, 37.00, 3700.00, 'purchases', '00000000-0000-4000-8000-000000000601', '2026-06-07 09:00:00-04', 'Entrada por compra de arroz.'),
  ('00000000-0000-4000-8000-000000001002', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000302', 'purchase', 50.000, 'lb', true, 45.00, 2250.00, 'purchases', '00000000-0000-4000-8000-000000000602', '2026-06-07 09:05:00-04', 'Entrada por compra de habichuelas.'),
  ('00000000-0000-4000-8000-000000001003', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000303', 'purchase', 128.000, 'oz', true, 18.00, 2304.00, 'purchases', '00000000-0000-4000-8000-000000000603', '2026-06-07 09:10:00-04', 'Entrada por compra de aceite.'),
  ('00000000-0000-4000-8000-000000001004', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000304', 'purchase', 15.000, 'lb', true, 160.00, 2400.00, 'purchases', '00000000-0000-4000-8000-000000000604', '2026-06-07 10:00:00-04', 'Entrada por compra de jamon.'),
  ('00000000-0000-4000-8000-000000001005', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000305', 'purchase', 15.000, 'lb', true, 180.00, 2700.00, 'purchases', '00000000-0000-4000-8000-000000000605', '2026-06-07 10:05:00-04', 'Entrada por compra de queso.'),
  ('00000000-0000-4000-8000-000000001006', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000306', 'purchase', 120.000, 'unit', true, 8.00, 960.00, 'purchases', '00000000-0000-4000-8000-000000000606', '2026-06-08 07:30:00-04', 'Entrada por compra de pan.'),
  ('00000000-0000-4000-8000-000000001007', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000307', 'purchase', 64.000, 'oz', true, 12.00, 768.00, 'purchases', '00000000-0000-4000-8000-000000000607', '2026-06-07 09:15:00-04', 'Entrada por compra de ketchup.'),
  ('00000000-0000-4000-8000-000000001008', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000308', 'purchase', 64.000, 'oz', true, 14.00, 896.00, 'purchases', '00000000-0000-4000-8000-000000000608', '2026-06-07 09:20:00-04', 'Entrada por compra de mayonesa.'),
  ('00000000-0000-4000-8000-000000001009', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000309', 'purchase', 40.000, 'lb', true, 95.00, 3800.00, 'purchases', '00000000-0000-4000-8000-000000000609', '2026-06-07 10:30:00-04', 'Entrada por compra de pollo.'),
  ('00000000-0000-4000-8000-000000001010', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000310', 'purchase', 96.000, 'bottle', true, 30.00, 2880.00, 'purchases', '00000000-0000-4000-8000-000000000610', '2026-06-07 11:00:00-04', 'Entrada por compra de refrescos.'),
  ('00000000-0000-4000-8000-000000001011', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000311', 'purchase', 72.000, 'bottle', true, 18.00, 1296.00, 'purchases', '00000000-0000-4000-8000-000000000611', '2026-06-07 11:05:00-04', 'Entrada por compra de agua.'),
  ('00000000-0000-4000-8000-000000001101', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000306', 'sale', 4.000, 'unit', false, 8.00, 32.00, 'sale_items', '00000000-0000-4000-8000-000000000711', '2026-06-08 09:00:00-04', 'Consumo de pan por tostadas vendidas.'),
  ('00000000-0000-4000-8000-000000001102', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000304', 'sale', 0.400, 'lb', false, 160.00, 64.00, 'sale_items', '00000000-0000-4000-8000-000000000711', '2026-06-08 09:00:00-04', 'Consumo de jamon por tostadas vendidas.'),
  ('00000000-0000-4000-8000-000000001103', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000305', 'sale', 0.400, 'lb', false, 180.00, 72.00, 'sale_items', '00000000-0000-4000-8000-000000000711', '2026-06-08 09:00:00-04', 'Consumo de queso por tostadas vendidas.'),
  ('00000000-0000-4000-8000-000000001104', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000307', 'sale', 2.000, 'oz', false, 12.00, 24.00, 'sale_items', '00000000-0000-4000-8000-000000000711', '2026-06-08 09:00:00-04', 'Consumo de ketchup por tostadas vendidas.'),
  ('00000000-0000-4000-8000-000000001105', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000308', 'sale', 2.000, 'oz', false, 14.00, 28.00, 'sale_items', '00000000-0000-4000-8000-000000000711', '2026-06-08 09:00:00-04', 'Consumo de mayonesa por tostadas vendidas.'),
  ('00000000-0000-4000-8000-000000001106', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000301', 'sale', 1.500, 'lb', false, 37.00, 55.50, 'sale_items', '00000000-0000-4000-8000-000000000713', '2026-06-08 12:30:00-04', 'Consumo de arroz por almuerzos vendidos.'),
  ('00000000-0000-4000-8000-000000001107', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000302', 'sale', 0.750, 'lb', false, 45.00, 33.75, 'sale_items', '00000000-0000-4000-8000-000000000713', '2026-06-08 12:30:00-04', 'Consumo de habichuelas por almuerzos vendidos.'),
  ('00000000-0000-4000-8000-000000001108', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000309', 'sale', 1.200, 'lb', false, 95.00, 114.00, 'sale_items', '00000000-0000-4000-8000-000000000713', '2026-06-08 12:30:00-04', 'Consumo de pollo por almuerzos vendidos.'),
  ('00000000-0000-4000-8000-000000001109', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000303', 'sale', 1.500, 'oz', false, 18.00, 27.00, 'sale_items', '00000000-0000-4000-8000-000000000713', '2026-06-08 12:30:00-04', 'Consumo de aceite por almuerzos vendidos.'),
  ('00000000-0000-4000-8000-000000001110', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000310', 'sale', 2.000, 'bottle', false, 30.00, 60.00, 'sale_items', '00000000-0000-4000-8000-000000000714', '2026-06-08 12:30:00-04', 'Consumo de refrescos vendidos.'),
  ('00000000-0000-4000-8000-000000001201', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000306', 'waste', 3.000, 'unit', false, 8.00, 24.00, 'waste_records', '00000000-0000-4000-8000-000000000921', '2026-06-08 16:00:00-04', 'Salida por desperdicio de pan.'),
  ('00000000-0000-4000-8000-000000001202', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000309', 'waste', 1.500, 'lb', false, 95.00, 142.50, 'waste_records', '00000000-0000-4000-8000-000000000922', '2026-06-08 16:15:00-04', 'Salida por desperdicio de pollo.')
on conflict (id) do update set
  business_id = excluded.business_id,
  inventory_item_id = excluded.inventory_item_id,
  movement_type = excluded.movement_type,
  quantity = excluded.quantity,
  unit = excluded.unit,
  is_increase = excluded.is_increase,
  unit_cost_at_time = excluded.unit_cost_at_time,
  total_cost_at_time = excluded.total_cost_at_time,
  source_table = excluded.source_table,
  source_id = excluded.source_id,
  occurred_at = excluded.occurred_at,
  notes = excluded.notes;
