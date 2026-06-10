import { Feather } from '@expo/vector-icons';

import {
  AssetRecord,
  CapitalContribution,
  EmployeeRecord,
  ExpenseItem,
  InventoryMovement,
  InventoryProduct,
  MenuItem,
  PayrollRecord,
  SaleRecord,
  WithdrawalRecord,
} from '@/features/mock/types';

export const dashboardSummary = {
  estimatedProfit: 1125.5,
  expectedCash: 1980.75,
  expensesToday: 420.35,
  lowProducts: 5,
  salesToday: 2450,
};

export const salesSummaryBars = [
  { labelKey: 'common.days.mon', value: 12 },
  { labelKey: 'common.days.tue', value: 18 },
  { labelKey: 'common.days.wed', value: 21 },
  { labelKey: 'common.days.thu', value: 17 },
  { labelKey: 'common.days.fri', value: 27 },
  { labelKey: 'common.days.sat', value: 24 },
  { labelKey: 'common.days.sun', value: 30 },
];

export const todaySales: SaleRecord[] = [
  {
    estimatedProfit: 180,
    id: 'sale-1',
    paymentMethod: 'cash',
    productKey: 'menu.items.hamCheeseToast',
    quantity: 2,
    time: '08:20',
    total: 350,
  },
  {
    estimatedProfit: 110,
    id: 'sale-2',
    paymentMethod: 'transfer',
    productKey: 'menu.items.executiveLunch',
    quantity: 1,
    time: '12:40',
    total: 320,
  },
  {
    estimatedProfit: 60,
    id: 'sale-3',
    paymentMethod: 'cash',
    productKey: 'menu.items.coffee',
    quantity: 3,
    time: '10:05',
    total: 180,
  },
  {
    estimatedProfit: 95,
    id: 'sale-4',
    paymentMethod: 'credit',
    productKey: 'menu.items.dinner',
    quantity: 1,
    time: '19:10',
    total: 250,
  },
];

export const salesBreakdown = {
  cash: 1480,
  credit: 250,
  total: 2450,
  transfer: 720,
};

export const inventoryProducts: InventoryProduct[] = [
  {
    averageCost: 37,
    categoryKey: 'inventory.categories.grains',
    id: 'rice',
    minimumLevel: 25,
    nameKey: 'inventory.products.rice',
    quantity: 62,
    status: 'available',
    unit: 'lb',
  },
  {
    averageCost: 42,
    categoryKey: 'inventory.categories.grains',
    id: 'beans',
    minimumLevel: 15,
    nameKey: 'inventory.products.beans',
    quantity: 18,
    status: 'available',
    unit: 'lb',
  },
  {
    averageCost: 92,
    categoryKey: 'inventory.categories.oils',
    id: 'oil',
    minimumLevel: 24,
    nameKey: 'inventory.products.oil',
    quantity: 32,
    status: 'available',
    unit: 'oz',
  },
  {
    averageCost: 145,
    categoryKey: 'inventory.categories.deli',
    id: 'ham',
    minimumLevel: 6,
    nameKey: 'inventory.products.ham',
    quantity: 4.5,
    status: 'low',
    unit: 'lb',
  },
  {
    averageCost: 160,
    categoryKey: 'inventory.categories.dairy',
    id: 'cheese',
    minimumLevel: 6,
    nameKey: 'inventory.products.cheese',
    quantity: 4,
    status: 'low',
    unit: 'lb',
  },
  {
    averageCost: 12,
    categoryKey: 'inventory.categories.bakery',
    id: 'bread',
    minimumLevel: 20,
    nameKey: 'inventory.products.bread',
    quantity: 14,
    status: 'low',
    unit: 'unit',
  },
  {
    averageCost: 7,
    categoryKey: 'inventory.categories.sauces',
    id: 'ketchup',
    minimumLevel: 12,
    nameKey: 'inventory.products.ketchup',
    quantity: 18,
    status: 'available',
    unit: 'oz',
  },
  {
    averageCost: 8,
    categoryKey: 'inventory.categories.sauces',
    id: 'mayonnaise',
    minimumLevel: 12,
    nameKey: 'inventory.products.mayonnaise',
    quantity: 10,
    status: 'low',
    unit: 'oz',
  },
  {
    averageCost: 95,
    categoryKey: 'inventory.categories.proteins',
    id: 'chicken',
    minimumLevel: 10,
    nameKey: 'inventory.products.chicken',
    quantity: 0,
    status: 'out',
    unit: 'lb',
  },
  {
    averageCost: 38,
    categoryKey: 'inventory.categories.beverages',
    id: 'soft-drinks',
    minimumLevel: 18,
    nameKey: 'inventory.products.softDrinks',
    quantity: 28,
    status: 'available',
    unit: 'unit',
  },
  {
    averageCost: 20,
    categoryKey: 'inventory.categories.beverages',
    id: 'water',
    minimumLevel: 12,
    nameKey: 'inventory.products.water',
    quantity: 20,
    status: 'available',
    unit: 'unit',
  },
];

export const inventoryMovements: InventoryMovement[] = [
  {
    id: 'movement-1',
    productKey: 'inventory.products.rice',
    quantity: 100,
    time: '07:45',
    typeKey: 'inventory.movement.purchase',
    unit: 'lb',
  },
  {
    id: 'movement-2',
    productKey: 'inventory.products.bread',
    quantity: 6,
    time: '09:00',
    typeKey: 'inventory.movement.saleUsage',
    unit: 'unit',
  },
  {
    id: 'movement-3',
    productKey: 'inventory.products.chicken',
    quantity: 3,
    time: '11:10',
    typeKey: 'inventory.movement.waste',
    unit: 'lb',
  },
  {
    id: 'movement-4',
    productKey: 'inventory.products.ketchup',
    quantity: 12,
    time: '14:30',
    typeKey: 'inventory.movement.adjustment',
    unit: 'oz',
  },
];

export const menuItems: MenuItem[] = [
  {
    categoryKey: 'menu.categories.breakfast',
    estimatedCost: 85,
    estimatedProfit: 90,
    id: 'toast',
    margin: 51,
    nameKey: 'menu.items.hamCheeseToast',
    profitability: 'high',
    recipe: [
      { ingredientKey: 'inventory.products.bread', quantity: 1, unit: 'unit' },
      { ingredientKey: 'inventory.products.ham', quantity: 0.1, unit: 'lb' },
      { ingredientKey: 'inventory.products.cheese', quantity: 0.1, unit: 'lb' },
      { ingredientKey: 'inventory.products.ketchup', quantity: 0.5, unit: 'oz' },
      { ingredientKey: 'inventory.products.mayonnaise', quantity: 0.5, unit: 'oz' },
    ],
    salePrice: 175,
  },
  {
    categoryKey: 'menu.categories.drinks',
    estimatedCost: 28,
    estimatedProfit: 52,
    id: 'coffee',
    margin: 65,
    nameKey: 'menu.items.coffee',
    profitability: 'high',
    recipe: [
      { ingredientKey: 'menu.recipe.coffeeBeans', quantity: 0.1, unit: 'lb' },
      { ingredientKey: 'inventory.products.water', quantity: 1, unit: 'unit' },
    ],
    salePrice: 80,
  },
  {
    categoryKey: 'menu.categories.drinks',
    estimatedCost: 55,
    estimatedProfit: 65,
    id: 'juice',
    margin: 54,
    nameKey: 'menu.items.naturalJuice',
    profitability: 'medium',
    recipe: [
      { ingredientKey: 'menu.recipe.fruitMix', quantity: 1, unit: 'package' },
      { ingredientKey: 'inventory.products.water', quantity: 1, unit: 'unit' },
    ],
    salePrice: 120,
  },
  {
    categoryKey: 'menu.categories.lunch',
    estimatedCost: 165,
    estimatedProfit: 155,
    id: 'executive-lunch',
    margin: 48,
    nameKey: 'menu.items.executiveLunch',
    profitability: 'high',
    recipe: [
      { ingredientKey: 'inventory.products.rice', quantity: 0.35, unit: 'lb' },
      { ingredientKey: 'inventory.products.beans', quantity: 0.25, unit: 'lb' },
      { ingredientKey: 'inventory.products.chicken', quantity: 0.3, unit: 'lb' },
    ],
    salePrice: 320,
  },
  {
    categoryKey: 'menu.categories.dinner',
    estimatedCost: 150,
    estimatedProfit: 100,
    id: 'dinner',
    margin: 40,
    nameKey: 'menu.items.dinner',
    profitability: 'medium',
    recipe: [
      { ingredientKey: 'inventory.products.chicken', quantity: 0.25, unit: 'lb' },
      { ingredientKey: 'inventory.products.bread', quantity: 2, unit: 'unit' },
    ],
    salePrice: 250,
  },
  {
    categoryKey: 'menu.categories.drinks',
    estimatedCost: 24,
    estimatedProfit: 36,
    id: 'soft-drink',
    margin: 60,
    nameKey: 'menu.items.softDrink',
    profitability: 'high',
    recipe: [
      { ingredientKey: 'inventory.products.softDrinks', quantity: 1, unit: 'unit' },
    ],
    salePrice: 60,
  },
];

export const expenses: ExpenseItem[] = [
  { amount: 700, categoryKey: 'finances.expenses.gas', id: 'expense-1' },
  { amount: 1800, categoryKey: 'finances.expenses.electricity', id: 'expense-2' },
  { amount: 8500, categoryKey: 'finances.expenses.rent', id: 'expense-3' },
  { amount: 600, categoryKey: 'finances.expenses.transport', id: 'expense-4' },
  { amount: 450, categoryKey: 'finances.expenses.packaging', id: 'expense-5' },
  { amount: 300, categoryKey: 'finances.expenses.cleaning', id: 'expense-6' },
];

export const employees: EmployeeRecord[] = [
  {
    active: true,
    id: 'employee-1',
    name: 'Kdie',
    positionKey: 'finances.positions.adminCook',
    salary: 18000,
    salaryType: 'monthly',
  },
  {
    active: true,
    id: 'employee-2',
    name: 'Stanley',
    positionKey: 'finances.positions.purchasesCash',
    salary: 15000,
    salaryType: 'biweekly',
  },
  {
    active: true,
    id: 'employee-3',
    name: 'Ayudante',
    positionKey: 'finances.positions.serviceSupport',
    salary: 12000,
    salaryType: 'monthly',
  },
];

export const payrollRecords: PayrollRecord[] = [
  {
    amount: 9000,
    employeeName: 'Stanley',
    id: 'payroll-1',
    periodKey: 'finances.periods.biweeklyMay',
  },
  {
    amount: 18000,
    employeeName: 'Kdie',
    id: 'payroll-2',
    periodKey: 'finances.periods.monthlyMay',
  },
];

export const ownerWithdrawals: WithdrawalRecord[] = [
  { amount: 500, id: 'withdrawal-1', ownerName: 'Ariangel' },
  { amount: 300, id: 'withdrawal-2', ownerName: 'Kdie' },
];

export const capitalContributions: CapitalContribution[] = [
  { amount: 10000, id: 'capital-1', ownerName: 'Ariangel' },
];

export const assets: AssetRecord[] = [
  {
    currentValue: 24000,
    id: 'asset-1',
    nameKey: 'finances.assets.fridge',
    purchaseDate: '2024-01-12',
    purchaseValue: 30000,
    usefulLifeYears: 8,
  },
  {
    currentValue: 18000,
    id: 'asset-2',
    nameKey: 'finances.assets.stove',
    purchaseDate: '2024-02-10',
    purchaseValue: 22000,
    usefulLifeYears: 7,
  },
  {
    currentValue: 14500,
    id: 'asset-3',
    nameKey: 'finances.assets.fryer',
    purchaseDate: '2024-03-03',
    purchaseValue: 18000,
    usefulLifeYears: 6,
  },
  {
    currentValue: 6500,
    id: 'asset-4',
    nameKey: 'finances.assets.blender',
    purchaseDate: '2024-03-08',
    purchaseValue: 9000,
    usefulLifeYears: 4,
  },
  {
    currentValue: 12000,
    id: 'asset-5',
    nameKey: 'finances.assets.tablesChairs',
    purchaseDate: '2024-01-20',
    purchaseValue: 16000,
    usefulLifeYears: 5,
  },
];

export const cashClosing = {
  countedCash: 1935.75,
  difference: -45,
  expectedCash: 1980.75,
};

export const recentActivity = [
  {
    amount: 350,
    icon: 'shopping-bag' as keyof typeof Feather.glyphMap,
    id: 'activity-1',
    labelKey: 'dashboard.activity.counterSale',
    timeKey: 'dashboard.activityTime.minutes12',
  },
  {
    amount: 3700,
    icon: 'truck' as keyof typeof Feather.glyphMap,
    id: 'activity-2',
    labelKey: 'dashboard.activity.ricePurchase',
    timeKey: 'dashboard.activityTime.hours2',
  },
  {
    amount: 45,
    icon: 'trash-2' as keyof typeof Feather.glyphMap,
    id: 'activity-3',
    labelKey: 'dashboard.activity.wasteBread',
    timeKey: 'dashboard.activityTime.hours3',
  },
];

export const mockSettingsCards = [
  {
    descriptionKey: 'more.cards.users.description',
    icon: 'users' as keyof typeof Feather.glyphMap,
    id: 'more-1',
    titleKey: 'more.cards.users.title',
  },
  {
    descriptionKey: 'more.cards.business.description',
    icon: 'briefcase' as keyof typeof Feather.glyphMap,
    id: 'more-2',
    titleKey: 'more.cards.business.title',
  },
  {
    descriptionKey: 'more.cards.units.description',
    icon: 'package' as keyof typeof Feather.glyphMap,
    id: 'more-3',
    titleKey: 'more.cards.units.title',
  },
  {
    descriptionKey: 'more.cards.categories.description',
    icon: 'grid' as keyof typeof Feather.glyphMap,
    id: 'more-4',
    titleKey: 'more.cards.categories.title',
  },
  {
    descriptionKey: 'more.cards.suppliers.description',
    icon: 'truck' as keyof typeof Feather.glyphMap,
    id: 'more-5',
    titleKey: 'more.cards.suppliers.title',
  },
  {
    descriptionKey: 'more.cards.language.description',
    icon: 'globe' as keyof typeof Feather.glyphMap,
    id: 'more-6',
    titleKey: 'more.cards.language.title',
  },
  {
    descriptionKey: 'more.cards.help.description',
    icon: 'help-circle' as keyof typeof Feather.glyphMap,
    id: 'more-7',
    titleKey: 'more.cards.help.title',
  },
  {
    descriptionKey: 'more.cards.appInfo.description',
    icon: 'info' as keyof typeof Feather.glyphMap,
    id: 'more-8',
    titleKey: 'more.cards.appInfo.title',
  },
];
