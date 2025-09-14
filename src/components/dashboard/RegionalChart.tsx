import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { SalesData, ChartDataPoint } from "@/types/dashboard";

interface RegionalChartProps {
  data: SalesData[];
  title?: string;
  dataKey?: string;
}

export const RegionalChart = ({ 
  data, 
  title = "Regional Sales Breakdown",
  dataKey = "revenue"
}: RegionalChartProps) => {
  // Group data by region
  const chartData = data.reduce((acc, item) => {
    const region = item.region;
    const existing = acc.find(d => d.name === region);
    
    if (existing) {
      existing.value += item[dataKey as keyof SalesData] as number;
      existing.transactions = (existing.transactions || 0) + 1;
    } else {
      acc.push({
        name: region,
        value: item[dataKey as keyof SalesData] as number,
        region: region,
        transactions: 1
      });
    }
    
    return acc;
  }, [] as (ChartDataPoint & { transactions?: number })[]);

  // Sort by value (descending)
  chartData.sort((a, b) => b.value - a.value);

  const formatTooltipValue = (value: number) => {
    if (dataKey === "revenue" || dataKey === "profit" || dataKey === "cost") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(value);
    }
    return new Intl.NumberFormat("en-US").format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-foreground font-medium">{`${label}`}</p>
          <p className="text-primary">
            {`${title.split(' ')[0]}: ${formatTooltipValue(payload[0].value)}`}
          </p>
          {data.transactions && (
            <p className="text-muted-foreground text-sm">
              {`Transactions: ${data.transactions}`}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="gradient-card border-border/50">
      <CardHeader>
        <CardTitle className="text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name"
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
              tickFormatter={(value) => {
                if (dataKey === "revenue" || dataKey === "profit" || dataKey === "cost") {
                  return `$${(value / 1000).toFixed(0)}k`;
                }
                return value.toString();
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
        
        {/* Regional Performance Summary */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {chartData.map((region, index) => {
            const percentage = ((region.value / chartData.reduce((sum, r) => sum + r.value, 0)) * 100);
            return (
              <div key={region.name} className="bg-secondary/30 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-foreground">{region.name}</span>
                  <span className="text-sm text-muted-foreground">{percentage.toFixed(1)}%</span>
                </div>
                <div className="text-lg font-bold text-primary">
                  {formatTooltipValue(region.value)}
                </div>
                {region.transactions && (
                  <div className="text-xs text-muted-foreground">
                    {region.transactions} transactions
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};