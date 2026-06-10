export type UnitCode =
  | 'bottle'
  | 'gallon'
  | 'kg'
  | 'lb'
  | 'liter'
  | 'ml'
  | 'oz'
  | 'package'
  | 'unit';

export type PaymentMethod = 'cash' | 'credit' | 'transfer';

export type InventoryStatus = 'available' | 'low' | 'out';

export type ProfitabilityStatus = 'high' | 'medium' | 'low';

export type SaleRecord = {
  estimatedProfit: number;
  id: string;
  paymentMethod: PaymentMethod;
  productKey: string;
  quantity: number;
  time: string;
  total: number;
};

export type InventoryProduct = {
  averageCost: number;
  categoryKey: string;
  id: string;
  minimumLevel: number;
  nameKey: string;
  quantity: number;
  status: InventoryStatus;
  unit: UnitCode;
};

export type InventoryMovement = {
  id: string;
  productKey: string;
  quantity: number;
  time: string;
  typeKey: string;
  unit: UnitCode;
};

export type RecipeIngredient = {
  ingredientKey: string;
  quantity: number;
  unit: UnitCode;
};

export type MenuItem = {
  categoryKey: string;
  estimatedCost: number;
  estimatedProfit: number;
  id: string;
  margin: number;
  nameKey: string;
  profitability: ProfitabilityStatus;
  recipe: RecipeIngredient[];
  salePrice: number;
};

export type ExpenseItem = {
  amount: number;
  categoryKey: string;
  id: string;
};

export type EmployeeRecord = {
  active: boolean;
  id: string;
  name: string;
  positionKey: string;
  salary: number;
  salaryType: 'biweekly' | 'monthly';
};

export type PayrollRecord = {
  amount: number;
  employeeName: string;
  id: string;
  periodKey: string;
};

export type WithdrawalRecord = {
  amount: number;
  id: string;
  ownerName: string;
};

export type CapitalContribution = {
  amount: number;
  id: string;
  ownerName: string;
};

export type AssetRecord = {
  currentValue: number;
  id: string;
  nameKey: string;
  purchaseDate: string;
  purchaseValue: number;
  usefulLifeYears: number;
};
