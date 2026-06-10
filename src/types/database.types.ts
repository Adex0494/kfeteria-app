export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      assets: {
        Row: {
          id: string
          business_id: string
          supplier_id: string | null
          expense_id: string | null
          name: string
          category: string | null
          purchase_date: string | null
          purchase_value: number
          estimated_current_value: number | null
          useful_life_months: number | null
          status: Database["public"]["Enums"]["asset_status"]
          condition: string | null
          notes: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          supplier_id?: string | null
          expense_id?: string | null
          name: string
          category?: string | null
          purchase_date?: string | null
          purchase_value?: number
          estimated_current_value?: number | null
          useful_life_months?: number | null
          status?: Database["public"]["Enums"]["asset_status"]
          condition?: string | null
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          supplier_id?: string | null
          expense_id?: string | null
          name?: string
          category?: string | null
          purchase_date?: string | null
          purchase_value?: number
          estimated_current_value?: number | null
          useful_life_months?: number | null
          status?: Database["public"]["Enums"]["asset_status"]
          condition?: string | null
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assets_business_created_by_fk"
            columns: ["business_id", "created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "assets_business_expense_fk"
            columns: ["business_id", "expense_id"]
            isOneToOne: false
            referencedRelation: "expenses"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "assets_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_business_supplier_fk"
            columns: ["business_id", "supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "assets_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_expense_id_fkey"
            columns: ["expense_id"]
            isOneToOne: false
            referencedRelation: "expenses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      businesses: {
        Row: {
          id: string
          name: string
          legal_name: string | null
          tax_id: string | null
          phone: string | null
          email: string | null
          address: string | null
          currency: string
          timezone: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          legal_name?: string | null
          tax_id?: string | null
          phone?: string | null
          email?: string | null
          address?: string | null
          currency?: string
          timezone?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          legal_name?: string | null
          tax_id?: string | null
          phone?: string | null
          email?: string | null
          address?: string | null
          currency?: string
          timezone?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      capital_contributions: {
        Row: {
          id: string
          business_id: string
          contribution_date: string
          contribution_type: Database["public"]["Enums"]["contribution_type"]
          amount: number
          payment_method: Database["public"]["Enums"]["payment_method"]
          description: string | null
          notes: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          contribution_date?: string
          contribution_type: Database["public"]["Enums"]["contribution_type"]
          amount: number
          payment_method?: Database["public"]["Enums"]["payment_method"]
          description?: string | null
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          contribution_date?: string
          contribution_type?: Database["public"]["Enums"]["contribution_type"]
          amount?: number
          payment_method?: Database["public"]["Enums"]["payment_method"]
          description?: string | null
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "capital_contributions_business_created_by_fk"
            columns: ["business_id", "created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "capital_contributions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "capital_contributions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cash_closings: {
        Row: {
          id: string
          business_id: string
          closing_date: string
          period_start: string
          period_end: string
          expected_cash: number
          counted_cash: number
          difference: number
          cash_sales_total: number
          cash_expenses_total: number
          cash_withdrawals_total: number
          cash_contributions_total: number
          status: string
          notes: string | null
          created_by: string | null
          reviewed_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          closing_date?: string
          period_start: string
          period_end: string
          expected_cash?: number
          counted_cash?: number
          difference?: number
          cash_sales_total?: number
          cash_expenses_total?: number
          cash_withdrawals_total?: number
          cash_contributions_total?: number
          status?: string
          notes?: string | null
          created_by?: string | null
          reviewed_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          closing_date?: string
          period_start?: string
          period_end?: string
          expected_cash?: number
          counted_cash?: number
          difference?: number
          cash_sales_total?: number
          cash_expenses_total?: number
          cash_withdrawals_total?: number
          cash_contributions_total?: number
          status?: string
          notes?: string | null
          created_by?: string | null
          reviewed_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cash_closings_business_created_by_fk"
            columns: ["business_id", "created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "cash_closings_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cash_closings_business_reviewed_by_fk"
            columns: ["business_id", "reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "cash_closings_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cash_closings_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          id: string
          business_id: string
          profile_id: string | null
          full_name: string
          position: string | null
          phone: string | null
          salary_amount: number
          salary_type: Database["public"]["Enums"]["salary_type"]
          hire_date: string | null
          termination_date: string | null
          is_active: boolean
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          profile_id?: string | null
          full_name: string
          position?: string | null
          phone?: string | null
          salary_amount?: number
          salary_type: Database["public"]["Enums"]["salary_type"]
          hire_date?: string | null
          termination_date?: string | null
          is_active?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          profile_id?: string | null
          full_name?: string
          position?: string | null
          phone?: string | null
          salary_amount?: number
          salary_type?: Database["public"]["Enums"]["salary_type"]
          hire_date?: string | null
          termination_date?: string | null
          is_active?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employees_business_created_by_fk"
            columns: ["business_id", "created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "employees_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_business_profile_fk"
            columns: ["business_id", "profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "employees_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          id: string
          business_id: string
          supplier_id: string | null
          expense_date: string
          expense_type: Database["public"]["Enums"]["expense_type"]
          description: string
          amount: number
          payment_method: Database["public"]["Enums"]["payment_method"]
          receipt_url: string | null
          notes: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          supplier_id?: string | null
          expense_date?: string
          expense_type?: Database["public"]["Enums"]["expense_type"]
          description: string
          amount: number
          payment_method?: Database["public"]["Enums"]["payment_method"]
          receipt_url?: string | null
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          supplier_id?: string | null
          expense_date?: string
          expense_type?: Database["public"]["Enums"]["expense_type"]
          description?: string
          amount?: number
          payment_method?: Database["public"]["Enums"]["payment_method"]
          receipt_url?: string | null
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "expenses_business_created_by_fk"
            columns: ["business_id", "created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "expenses_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_business_supplier_fk"
            columns: ["business_id", "supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "expenses_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_items: {
        Row: {
          id: string
          business_id: string
          name: string
          sku: string | null
          item_type: Database["public"]["Enums"]["item_type"]
          base_unit: Database["public"]["Enums"]["base_unit"]
          current_quantity: number
          average_unit_cost: number
          low_stock_threshold: number
          is_active: boolean
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          name: string
          sku?: string | null
          item_type: Database["public"]["Enums"]["item_type"]
          base_unit: Database["public"]["Enums"]["base_unit"]
          current_quantity?: number
          average_unit_cost?: number
          low_stock_threshold?: number
          is_active?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          name?: string
          sku?: string | null
          item_type?: Database["public"]["Enums"]["item_type"]
          base_unit?: Database["public"]["Enums"]["base_unit"]
          current_quantity?: number
          average_unit_cost?: number
          low_stock_threshold?: number
          is_active?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_items_business_created_by_fk"
            columns: ["business_id", "created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "inventory_items_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_items_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_movements: {
        Row: {
          id: string
          business_id: string
          inventory_item_id: string
          movement_type: Database["public"]["Enums"]["movement_type"]
          quantity: number
          unit: Database["public"]["Enums"]["base_unit"]
          is_increase: boolean
          unit_cost_at_time: number
          total_cost_at_time: number
          source_table: string | null
          source_id: string | null
          occurred_at: string
          notes: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          inventory_item_id: string
          movement_type: Database["public"]["Enums"]["movement_type"]
          quantity: number
          unit: Database["public"]["Enums"]["base_unit"]
          is_increase?: boolean
          unit_cost_at_time?: number
          total_cost_at_time?: number
          source_table?: string | null
          source_id?: string | null
          occurred_at?: string
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          inventory_item_id?: string
          movement_type?: Database["public"]["Enums"]["movement_type"]
          quantity?: number
          unit?: Database["public"]["Enums"]["base_unit"]
          is_increase?: boolean
          unit_cost_at_time?: number
          total_cost_at_time?: number
          source_table?: string | null
          source_id?: string | null
          occurred_at?: string
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_movements_business_created_by_fk"
            columns: ["business_id", "created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "inventory_movements_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_business_inventory_item_fk"
            columns: ["business_id", "inventory_item_id"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "inventory_movements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_inventory_item_id_fkey"
            columns: ["inventory_item_id"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_items: {
        Row: {
          id: string
          business_id: string
          name: string
          description: string | null
          category: string | null
          sale_price: number
          estimated_cost: number
          estimated_profit: number
          estimated_margin_percent: number | null
          is_active: boolean
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          name: string
          description?: string | null
          category?: string | null
          sale_price?: number
          estimated_cost?: number
          estimated_profit?: number
          estimated_margin_percent?: number | null
          is_active?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          name?: string
          description?: string | null
          category?: string | null
          sale_price?: number
          estimated_cost?: number
          estimated_profit?: number
          estimated_margin_percent?: number | null
          is_active?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "menu_items_business_created_by_fk"
            columns: ["business_id", "created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "menu_items_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menu_items_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      owner_withdrawals: {
        Row: {
          id: string
          business_id: string
          withdrawal_date: string
          amount: number
          payment_method: Database["public"]["Enums"]["payment_method"]
          reason: string | null
          notes: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          withdrawal_date?: string
          amount: number
          payment_method?: Database["public"]["Enums"]["payment_method"]
          reason?: string | null
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          withdrawal_date?: string
          amount?: number
          payment_method?: Database["public"]["Enums"]["payment_method"]
          reason?: string | null
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "owner_withdrawals_business_created_by_fk"
            columns: ["business_id", "created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "owner_withdrawals_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "owner_withdrawals_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payroll_payments: {
        Row: {
          id: string
          business_id: string
          employee_id: string
          expense_id: string | null
          pay_period_start: string | null
          pay_period_end: string | null
          payment_date: string
          salary_type: Database["public"]["Enums"]["salary_type"]
          amount: number
          payment_method: Database["public"]["Enums"]["payment_method"]
          notes: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          employee_id: string
          expense_id?: string | null
          pay_period_start?: string | null
          pay_period_end?: string | null
          payment_date?: string
          salary_type: Database["public"]["Enums"]["salary_type"]
          amount: number
          payment_method?: Database["public"]["Enums"]["payment_method"]
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          employee_id?: string
          expense_id?: string | null
          pay_period_start?: string | null
          pay_period_end?: string | null
          payment_date?: string
          salary_type?: Database["public"]["Enums"]["salary_type"]
          amount?: number
          payment_method?: Database["public"]["Enums"]["payment_method"]
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payroll_payments_business_created_by_fk"
            columns: ["business_id", "created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "payroll_payments_business_employee_fk"
            columns: ["business_id", "employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "payroll_payments_business_expense_fk"
            columns: ["business_id", "expense_id"]
            isOneToOne: false
            referencedRelation: "expenses"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "payroll_payments_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payroll_payments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payroll_payments_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payroll_payments_expense_id_fkey"
            columns: ["expense_id"]
            isOneToOne: false
            referencedRelation: "expenses"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          id: string
          business_id: string
          full_name: string
          email: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          business_id: string
          full_name: string
          email?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          full_name?: string
          email?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      purchases: {
        Row: {
          id: string
          business_id: string
          supplier_id: string | null
          inventory_item_id: string
          purchase_date: string
          quantity: number
          unit: Database["public"]["Enums"]["base_unit"]
          unit_cost: number
          total_cost: number
          payment_method: Database["public"]["Enums"]["payment_method"]
          status: string
          notes: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          supplier_id?: string | null
          inventory_item_id: string
          purchase_date?: string
          quantity: number
          unit: Database["public"]["Enums"]["base_unit"]
          unit_cost?: number
          total_cost?: number
          payment_method?: Database["public"]["Enums"]["payment_method"]
          status?: string
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          supplier_id?: string | null
          inventory_item_id?: string
          purchase_date?: string
          quantity?: number
          unit?: Database["public"]["Enums"]["base_unit"]
          unit_cost?: number
          total_cost?: number
          payment_method?: Database["public"]["Enums"]["payment_method"]
          status?: string
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchases_business_created_by_fk"
            columns: ["business_id", "created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "purchases_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchases_business_inventory_item_fk"
            columns: ["business_id", "inventory_item_id"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "purchases_business_supplier_fk"
            columns: ["business_id", "supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "purchases_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchases_inventory_item_id_fkey"
            columns: ["inventory_item_id"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchases_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_ingredients: {
        Row: {
          id: string
          business_id: string
          menu_item_id: string
          inventory_item_id: string
          quantity: number
          unit: Database["public"]["Enums"]["base_unit"]
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          menu_item_id: string
          inventory_item_id: string
          quantity: number
          unit: Database["public"]["Enums"]["base_unit"]
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          menu_item_id?: string
          inventory_item_id?: string
          quantity?: number
          unit?: Database["public"]["Enums"]["base_unit"]
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_ingredients_business_created_by_fk"
            columns: ["business_id", "created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "recipe_ingredients_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_ingredients_business_inventory_item_fk"
            columns: ["business_id", "inventory_item_id"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "recipe_ingredients_business_menu_item_fk"
            columns: ["business_id", "menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "recipe_ingredients_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_ingredients_inventory_item_id_fkey"
            columns: ["inventory_item_id"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_ingredients_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
      sale_items: {
        Row: {
          id: string
          business_id: string
          sale_id: string
          menu_item_id: string
          quantity: number
          unit_price: number
          line_total: number
          estimated_unit_cost: number
          estimated_total_cost: number
          estimated_profit: number
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          sale_id: string
          menu_item_id: string
          quantity: number
          unit_price?: number
          line_total?: number
          estimated_unit_cost?: number
          estimated_total_cost?: number
          estimated_profit?: number
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          sale_id?: string
          menu_item_id?: string
          quantity?: number
          unit_price?: number
          line_total?: number
          estimated_unit_cost?: number
          estimated_total_cost?: number
          estimated_profit?: number
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sale_items_business_created_by_fk"
            columns: ["business_id", "created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "sale_items_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_items_business_menu_item_fk"
            columns: ["business_id", "menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "sale_items_business_sale_fk"
            columns: ["business_id", "sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "sale_items_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_items_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_items_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      sales: {
        Row: {
          id: string
          business_id: string
          sale_date: string
          subtotal: number
          discount_total: number
          tax_total: number
          total: number
          payment_method: Database["public"]["Enums"]["payment_method"]
          cash_received: number
          change_given: number
          status: string
          estimated_cost: number
          estimated_profit: number
          notes: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          sale_date?: string
          subtotal?: number
          discount_total?: number
          tax_total?: number
          total?: number
          payment_method?: Database["public"]["Enums"]["payment_method"]
          cash_received?: number
          change_given?: number
          status?: string
          estimated_cost?: number
          estimated_profit?: number
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          sale_date?: string
          subtotal?: number
          discount_total?: number
          tax_total?: number
          total?: number
          payment_method?: Database["public"]["Enums"]["payment_method"]
          cash_received?: number
          change_given?: number
          status?: string
          estimated_cost?: number
          estimated_profit?: number
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sales_business_created_by_fk"
            columns: ["business_id", "created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "sales_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          id: string
          business_id: string
          name: string
          contact_name: string | null
          phone: string | null
          email: string | null
          address: string | null
          notes: string | null
          is_active: boolean
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          name: string
          contact_name?: string | null
          phone?: string | null
          email?: string | null
          address?: string | null
          notes?: string | null
          is_active?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          name?: string
          contact_name?: string | null
          phone?: string | null
          email?: string | null
          address?: string | null
          notes?: string | null
          is_active?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "suppliers_business_created_by_fk"
            columns: ["business_id", "created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "suppliers_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "suppliers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      waste_records: {
        Row: {
          id: string
          business_id: string
          inventory_item_id: string
          waste_date: string
          quantity: number
          unit: Database["public"]["Enums"]["base_unit"]
          estimated_unit_cost: number
          estimated_total_loss: number
          reason: string | null
          notes: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          inventory_item_id: string
          waste_date?: string
          quantity: number
          unit: Database["public"]["Enums"]["base_unit"]
          estimated_unit_cost?: number
          estimated_total_loss?: number
          reason?: string | null
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          inventory_item_id?: string
          waste_date?: string
          quantity?: number
          unit?: Database["public"]["Enums"]["base_unit"]
          estimated_unit_cost?: number
          estimated_total_loss?: number
          reason?: string | null
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "waste_records_business_created_by_fk"
            columns: ["business_id", "created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "waste_records_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "waste_records_business_inventory_item_fk"
            columns: ["business_id", "inventory_item_id"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "waste_records_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "waste_records_inventory_item_id_fkey"
            columns: ["inventory_item_id"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      set_updated_at: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      validate_inventory_item_base_unit: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
    }
    Enums: {
      asset_status: "active" | "damaged" | "sold" | "retired"
      base_unit: "unit" | "lb" | "kg" | "oz" | "liter" | "ml" | "gallon" | "package" | "bottle"
      contribution_type: "capital" | "business_loan" | "partner_investment" | "cash_replenishment"
      expense_type: "gas" | "electricity" | "rent" | "payroll" | "transport" | "packaging" | "cleaning" | "other"
      item_type: "countable" | "weight" | "liquid" | "package"
      movement_type: "purchase" | "sale" | "adjustment" | "waste"
      payment_method: "cash" | "transfer" | "card" | "credit"
      salary_type: "daily" | "weekly" | "biweekly" | "monthly"
      user_role: "admin" | "employee"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<TableName extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][TableName]["Insert"]

export type TablesUpdate<TableName extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][TableName]["Update"]

export type Enums<EnumName extends keyof PublicSchema["Enums"]> =
  PublicSchema["Enums"][EnumName]
