export interface SalesData {
  id: string;
  date: string;
  product: string;
  category: string;
  region: string;
  store: string;
  revenue: number;
  units: number;
  profit: number;
  cost: number;
}

export interface KPIData {
  totalSales: number;
  totalProfit: number;
  profitMargin: number;
  avgTransactionValue: number;
  totalTransactions: number;
  salesGrowth: number;
  profitGrowth: number;
  topSellingProduct: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  date?: string;
  category?: string;
  region?: string;
}

export interface FilterOptions {
  categories: string[];
  regions: string[];
  stores: string[];
  dateRange: {
    start: string;
    end: string;
  };
}

export interface DashboardFilters {
  category: string | null;
  region: string | null;
  store: string | null;
  dateRange: string;
}