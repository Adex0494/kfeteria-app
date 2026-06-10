# Kfeteria Project Context

## How Codex should use this document

Future development tasks must read and follow this document before making major product, architecture, data, or business-rule changes unless the user explicitly instructs otherwise. This file is a permanent source of truth for what Kfeteria is, who it is for, what modules exist, and how the business logic should behave at a high level.

This document should be used together with:

- `docs/DESIGN_GUIDE.md` for UI and visual rules
- `docs/DEVELOPMENT_RULES.md` for implementation and coding rules

## Product overview

Kfeteria is a cafeteria and business management application.

Its primary purpose is to help small cafeterias, restaurants, and food businesses manage:

- Inventory
- Purchases
- Recipes
- Menu items
- Sales
- Expenses
- Payroll
- Employees
- Owner withdrawals
- Capital contributions
- Assets
- Waste
- Cash closing
- Reports

The application is being developed first for the real business Kfeteria. Later it may evolve into a SaaS product for multiple businesses, but the current product direction should prioritize real operational usefulness for Kfeteria first.

## Product goals

Kfeteria should help the business:

- Understand what was sold
- Understand what inventory was consumed
- Estimate cost and profit accurately
- Record purchases and expenses clearly
- Separate operational money from owner or capital movements
- Improve reporting and decision-making
- Reduce waste and stock problems
- Manage day-to-day operations from one system

## Official tech stack

### Frontend

- React Native
- Expo
- TypeScript
- Expo Router

### Backend

- Supabase
- PostgreSQL
- Auth
- Storage
- Realtime

### Tooling

- GitHub
- EAS Build

### Localization

- i18next
- react-i18next

## Language requirements

- Spanish is the default language.
- English must always be supported.
- All visible user-facing text must use i18n.
- Never hardcode UI text directly in JSX.
- Every new screen must include Spanish translations.
- Every new screen must include English translations.

## Product roles

### Administrator

Can:

- Manage inventory
- Manage recipes
- Manage menu prices
- Manage employees
- Manage payroll
- Manage reports
- Manage settings
- Manage users
- Manage assets
- Manage capital contributions
- Manage owner withdrawals

### Employee

Can:

- Register sales
- Register purchases
- Register expenses
- Register waste
- View inventory
- View menu
- Perform cash closing

Cannot:

- Change menu prices
- Modify recipes
- Create users
- Delete sensitive records
- Access sensitive settings

## Business modules

### 1. Dashboard

Purpose:

- Provide a fast operational summary of the business day

Shows:

- Sales today
- Estimated profit
- Expenses today
- Expected cash
- Low inventory alerts
- Recent activity

### 2. Sales

Purpose:

- Record and review customer transactions

Features:

- Register sale
- Sale history
- Sale details
- Payment methods

### 3. Inventory

Purpose:

- Track stock levels, movements, and shortages

Features:

- Inventory items
- Purchases
- Adjustments
- Waste
- Inventory movements
- Low inventory alerts

### 4. Menu

Purpose:

- Define what the business sells and what it costs to produce

Features:

- Menu items
- Recipes
- Ingredient costs
- Profit estimation
- Margin estimation

### 5. Finance

Purpose:

- Record and report operational and owner-related financial events

Features:

- Expenses
- Payroll
- Employees
- Capital contributions
- Owner withdrawals
- Assets
- Reports
- Cash closing

### 6. More

Purpose:

- House support configuration and administrative screens

Features:

- Users
- Settings
- Categories
- Suppliers
- Language
- Help

## Navigation structure

Main navigation:

- Inicio
- Ventas
- Inventario
- Menú
- Finanzas
- Más

Responsive behavior:

- Desktop uses a sidebar.
- Mobile uses bottom navigation.

## Units system

Inventory items must define structured unit behavior.

### Item types

- `countable`
- `weight`
- `liquid`
- `package`

### Base units

- `unit`
- `lb`
- `kg`
- `oz`
- `liter`
- `ml`
- `gallon`
- `package`
- `bottle`

### Examples

Bread:

- `unit`

Ham:

- `lb`

Cheese:

- `lb`

Ketchup:

- `oz`

Mayonnaise:

- `oz`

### Units display rules

- Always display units explicitly.
- Never display raw numeric quantities without units.

Correct examples:

- `0.10 lb`
- `0.50 oz`
- `5 units`

Incorrect examples:

- `0.10`
- `0.50`
- `5`

## Recipe system

Recipes define how much inventory a menu item consumes.

Example recipe: ham and cheese toast

- Bread: `1 unit`
- Ham: `0.10 lb`
- Cheese: `0.10 lb`
- Ketchup: `0.5 oz`
- Mayonnaise: `0.5 oz`

Menu items should calculate:

- Estimated cost
- Estimated profit
- Margin %

Recipe behavior rules:

- Every ingredient quantity must respect the inventory item base unit.
- Recipe quantities should be explicit and human-readable.
- Recipe cost should be derived from current inventory costing rules.

## Purchase flow

Example:

- Purchase `100 lb` rice
- Total cost `RD$3,700`

The system must:

- Create a purchase record
- Update inventory quantity
- Create an inventory movement
- Recalculate average cost

Purchase flow rules:

- Purchases affect inventory.
- Purchases affect product cost basis.
- Purchases are not sales.
- Purchases should preserve quantity, unit, total cost, and supplier context when available.

## Sales flow

Example:

- Sale of `2` toasts

The system must:

- Create the sale
- Create sale items
- Reduce inventory
- Calculate estimated profit

Sales flow rules:

- Sales consume inventory through recipe relationships when applicable.
- Inventory reduction should reflect recipe ingredient quantities.
- Profit estimation is based on estimated cost, not on arbitrary manual assumptions.

## Waste flow

Waste means inventory lost without being sold.

Examples:

- Damaged bread
- Expired milk
- Burned food

Waste must:

- Reduce inventory
- Create an inventory movement
- Calculate estimated loss

Waste rules:

- Waste is not a sale.
- Waste should be traceable and reportable.
- Waste should preserve reason and quantity.

## Payroll

Employee records should include:

- Name
- Position
- Salary
- Salary type
- Active status

Payroll rules:

- Payroll payments create expense records.
- Employees may be active or inactive.
- Salary type should be explicit and not implied.

## Owner withdrawals

Owner withdrawals are not business expenses.

Rules:

- They reduce available cash.
- They must remain separate from operating expenses.
- They must not be reported as profit reduction through ordinary expense logic.

## Capital contributions

Capital contributions are not sales.

Capital contribution rules:

- They are not revenue.
- They are not profit.
- They increase available business capital or cash position.
- They must remain separate from operating activity reporting.

## Assets

Assets may include:

- Refrigerator
- Stove
- Fryer
- Blender
- Tables
- Chairs

Store at minimum:

- Purchase value
- Purchase date
- Useful life
- Estimated value

Asset rules:

- Depreciation exists only for informational reporting.
- Depreciation must not affect daily profit calculations.
- Asset purchases should remain distinguishable from ordinary inventory purchases.

## Cash closing

Cash closing belongs under finance and day-end operations.

It should help the business compare:

- Expected cash
- Counted cash
- Differences
- Relevant daily context

## Reporting principles

Reports should eventually help answer:

- What sold today
- What inventory is low
- What was spent
- What profit is estimated
- How much waste occurred
- What owner and capital movements occurred

Financial reporting must keep clear boundaries between:

- Sales
- Expenses
- Payroll
- Owner withdrawals
- Capital contributions
- Assets

## Product direction notes

- Build for Kfeteria first, then generalize later.
- Prioritize correct business behavior over premature SaaS abstraction.
- Keep the system realistic for food-business operations.
- Inventory, recipes, and financial classification accuracy matter more than superficial feature count.
