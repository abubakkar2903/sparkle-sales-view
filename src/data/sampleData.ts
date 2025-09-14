import { SalesData, KPIData, FilterOptions } from "@/types/dashboard";

// Sample sales data for the dashboard
export const sampleSalesData: SalesData[] = [
  // Electronics - North America
  { id: "1", date: "2024-01-01", product: "iPhone 15 Pro", category: "Electronics", region: "North America", store: "NYC Store", revenue: 999, units: 1, profit: 299, cost: 700 },
  { id: "2", date: "2024-01-02", product: "MacBook Air", category: "Electronics", region: "North America", store: "LA Store", revenue: 1299, units: 1, profit: 399, cost: 900 },
  { id: "3", date: "2024-01-03", product: "AirPods Pro", category: "Electronics", region: "North America", store: "Chicago Store", revenue: 249, units: 1, profit: 99, cost: 150 },
  
  // Fashion - Europe
  { id: "4", date: "2024-01-01", product: "Designer Jacket", category: "Fashion", region: "Europe", store: "London Store", revenue: 450, units: 1, profit: 180, cost: 270 },
  { id: "5", date: "2024-01-02", product: "Luxury Handbag", category: "Fashion", region: "Europe", store: "Paris Store", revenue: 890, units: 1, profit: 356, cost: 534 },
  { id: "6", date: "2024-01-03", product: "Premium Shoes", category: "Fashion", region: "Europe", store: "Milan Store", revenue: 320, units: 1, profit: 128, cost: 192 },
  
  // Home & Garden - Asia
  { id: "7", date: "2024-01-01", product: "Smart Thermostat", category: "Home & Garden", region: "Asia", store: "Tokyo Store", revenue: 299, units: 1, profit: 119, cost: 180 },
  { id: "8", date: "2024-01-02", product: "Robot Vacuum", category: "Home & Garden", region: "Asia", store: "Seoul Store", revenue: 599, units: 1, profit: 179, cost: 420 },
  { id: "9", date: "2024-01-03", product: "Air Purifier", category: "Home & Garden", region: "Asia", store: "Singapore Store", revenue: 399, units: 1, profit: 159, cost: 240 },
  
  // Sports - North America
  { id: "10", date: "2024-01-04", product: "Running Shoes", category: "Sports", region: "North America", store: "Miami Store", revenue: 180, units: 1, profit: 72, cost: 108 },
  { id: "11", date: "2024-01-05", product: "Fitness Tracker", category: "Sports", region: "North America", store: "Seattle Store", revenue: 299, units: 1, profit: 119, cost: 180 },
  
  // Books - Europe
  { id: "12", date: "2024-01-04", product: "Business Strategy", category: "Books", region: "Europe", store: "Berlin Store", revenue: 45, units: 1, profit: 18, cost: 27 },
  { id: "13", date: "2024-01-05", product: "Tech Handbook", category: "Books", region: "Europe", store: "Amsterdam Store", revenue: 65, units: 1, profit: 26, cost: 39 },
];

// Generate additional data for trends
const categories = ["Electronics", "Fashion", "Home & Garden", "Sports", "Books"];
const regions = ["North America", "Europe", "Asia"];
const stores = ["NYC Store", "LA Store", "Chicago Store", "London Store", "Paris Store", "Milan Store", "Tokyo Store", "Seoul Store", "Singapore Store", "Miami Store", "Seattle Store", "Berlin Store", "Amsterdam Store"];
const products = {
  Electronics: ["iPhone 15 Pro", "MacBook Air", "AirPods Pro", "iPad Pro", "Apple Watch"],
  Fashion: ["Designer Jacket", "Luxury Handbag", "Premium Shoes", "Silk Scarf", "Leather Wallet"],
  "Home & Garden": ["Smart Thermostat", "Robot Vacuum", "Air Purifier", "Coffee Maker", "Plant Pot"],
  Sports: ["Running Shoes", "Fitness Tracker", "Yoga Mat", "Dumbbells", "Protein Powder"],
  Books: ["Business Strategy", "Tech Handbook", "Cooking Guide", "Travel Journal", "Art History"]
};

// Generate more comprehensive data
export const generateExtendedSalesData = (): SalesData[] => {
  const data: SalesData[] = [...sampleSalesData];
  
  for (let i = 0; i < 500; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const region = regions[Math.floor(Math.random() * regions.length)];
    const store = stores[Math.floor(Math.random() * stores.length)];
    const product = products[category][Math.floor(Math.random() * products[category].length)];
    
    const baseRevenue = category === "Electronics" ? 500 : category === "Fashion" ? 300 : 200;
    const revenue = baseRevenue + Math.random() * baseRevenue;
    const cost = revenue * (0.6 + Math.random() * 0.2);
    const profit = revenue - cost;
    const units = Math.ceil(Math.random() * 5);
    
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 90));
    
    data.push({
      id: `generated-${i}`,
      date: date.toISOString().split('T')[0],
      product,
      category,
      region,
      store,
      revenue: Math.round(revenue),
      units,
      profit: Math.round(profit),
      cost: Math.round(cost)
    });
  }
  
  return data;
};

export const getKPIData = (data: SalesData[]): KPIData => {
  const totalSales = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalProfit = data.reduce((sum, item) => sum + item.profit, 0);
  const totalTransactions = data.length;
  const profitMargin = (totalProfit / totalSales) * 100;
  const avgTransactionValue = totalSales / totalTransactions;
  
  // Calculate growth (simulated)
  const salesGrowth = 12.5; // 12.5% growth
  const profitGrowth = 18.3; // 18.3% growth
  
  // Find top selling product
  const productSales = data.reduce((acc, item) => {
    acc[item.product] = (acc[item.product] || 0) + item.revenue;
    return acc;
  }, {} as Record<string, number>);
  
  const topSellingProduct = Object.entries(productSales)
    .sort(([, a], [, b]) => b - a)[0][0];
  
  return {
    totalSales,
    totalProfit,
    profitMargin,
    avgTransactionValue,
    totalTransactions,
    salesGrowth,
    profitGrowth,
    topSellingProduct
  };
};

export const getFilterOptions = (data: SalesData[]): FilterOptions => {
  const categories = [...new Set(data.map(item => item.category))];
  const regions = [...new Set(data.map(item => item.region))];
  const stores = [...new Set(data.map(item => item.store))];
  
  const dates = data.map(item => item.date).sort();
  const dateRange = {
    start: dates[0],
    end: dates[dates.length - 1]
  };
  
  return {
    categories,
    regions,
    stores,
    dateRange
  };
};