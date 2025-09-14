import { useState, useMemo } from "react";
import { SalesData, KPIData, DashboardFilters, FilterOptions } from "@/types/dashboard";
import { generateExtendedSalesData, getKPIData, getFilterOptions } from "@/data/sampleData";
import { KPICard } from "./KPICard";
import { SalesTrendChart } from "./SalesTrendChart";
import { CategoryChart } from "./CategoryChart";
import { RegionalChart } from "./RegionalChart";
import { DashboardFiltersComponent } from "./DashboardFilters";
import { 
  DollarSign, 
  TrendingUp, 
  ShoppingCart, 
  Target,
  Users,
  Package,
  MapPin,
  Calendar
} from "lucide-react";

export const RetailDashboard = () => {
  const [filters, setFilters] = useState<DashboardFilters>({
    category: null,
    region: null,
    store: null,
    dateRange: "all"
  });

  // Generate comprehensive sample data
  const allData = useMemo(() => generateExtendedSalesData(), []);
  
  // Apply filters to data
  const filteredData = useMemo(() => {
    let data = allData;

    // Apply category filter
    if (filters.category) {
      data = data.filter(item => item.category === filters.category);
    }

    // Apply region filter
    if (filters.region) {
      data = data.filter(item => item.region === filters.region);
    }

    // Apply store filter
    if (filters.store) {
      data = data.filter(item => item.store === filters.store);
    }

    // Apply date range filter
    if (filters.dateRange !== "all") {
      const now = new Date();
      const cutoffDate = new Date();
      
      switch (filters.dateRange) {
        case "7d":
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case "30d":
          cutoffDate.setDate(now.getDate() - 30);
          break;
        case "90d":
          cutoffDate.setDate(now.getDate() - 90);
          break;
        case "1y":
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      data = data.filter(item => new Date(item.date) >= cutoffDate);
    }

    return data;
  }, [allData, filters]);

  const kpiData = useMemo(() => getKPIData(filteredData), [filteredData]);
  const filterOptions = useMemo(() => getFilterOptions(allData), [allData]);

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Retail Sales Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive insights for retail performance optimization
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Filters */}
      <DashboardFiltersComponent
        filterOptions={filterOptions}
        currentFilters={filters}
        onFiltersChange={setFilters}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Sales"
          value={kpiData.totalSales}
          format="currency"
          trend="up"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <KPICard
          title="Total Profit"
          value={kpiData.totalProfit}
          format="currency"
          trend="up"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <KPICard
          title="Profit Margin"
          value={kpiData.profitMargin}
          format="percentage"
          trend="up"
          icon={<Target className="h-4 w-4" />}
        />
        <KPICard
          title="Avg Transaction Value"
          value={kpiData.avgTransactionValue}
          format="currency"
          trend="up"
          icon={<ShoppingCart className="h-4 w-4" />}
        />
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPICard
          title="Total Transactions"
          value={kpiData.totalTransactions}
          format="number"
          trend="up"
          icon={<Users className="h-4 w-4" />}
        />
        <KPICard
          title="Sales Growth (YoY)"
          value={kpiData.salesGrowth}
          format="percentage"
          trend="up"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <KPICard
          title="Top Selling Product"
          value={kpiData.topSellingProduct}
          icon={<Package className="h-4 w-4" />}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <div className="lg:col-span-2">
          <SalesTrendChart 
            data={filteredData}
            title="Sales Trend Over Time"
            type="area"
            dataKey="revenue"
            color="hsl(var(--primary))"
          />
        </div>

        {/* Category Performance */}
        <CategoryChart
          data={filteredData}
          title="Sales by Category"
          type="bar"
          dataKey="revenue"
        />

        {/* Regional Breakdown */}
        <RegionalChart
          data={filteredData}
          title="Regional Sales Performance"
          dataKey="revenue"
        />

        {/* Profit by Category */}
        <CategoryChart
          data={filteredData}
          title="Profit Distribution"
          type="pie"
          dataKey="profit"
        />

        {/* Units Sold Trend */}
        <SalesTrendChart 
          data={filteredData}
          title="Units Sold Trend"
          type="line"
          dataKey="units"
          color="hsl(var(--chart-2))"
        />
      </div>

      {/* Insights Section */}
      <div className="bg-card gradient-card border border-border/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center space-x-2">
          <TrendingUp className="h-5 w-5" />
          <span>Key Insights</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-dashboard-success/10 border border-dashboard-success/20 rounded-lg p-4">
            <h4 className="font-medium text-dashboard-success mb-2">Peak Performance</h4>
            <p className="text-sm text-muted-foreground">
              Electronics category shows strongest performance with highest profit margins.
            </p>
          </div>
          <div className="bg-dashboard-warning/10 border border-dashboard-warning/20 rounded-lg p-4">
            <h4 className="font-medium text-dashboard-warning mb-2">Growth Opportunity</h4>
            <p className="text-sm text-muted-foreground">
              Asia region showing rapid growth potential for expansion.
            </p>
          </div>
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <h4 className="font-medium text-primary mb-2">Trend Analysis</h4>
            <p className="text-sm text-muted-foreground">
              {kpiData.salesGrowth > 0 ? "Positive" : "Negative"} sales growth of {kpiData.salesGrowth.toFixed(1)}% year-over-year.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};