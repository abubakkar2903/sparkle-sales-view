import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { SalesData, ChartDataPoint } from "@/types/dashboard";

interface SalesTrendChartProps {
  data: SalesData[];
  type?: "line" | "area";
  title?: string;
  dataKey?: string;
  color?: string;
}

export const SalesTrendChart = ({ 
  data, 
  type = "area", 
  title = "Sales Trend", 
  dataKey = "revenue",
  color = "hsl(var(--primary))"
}: SalesTrendChartProps) => {
  // Group data by date and sum revenue
  const chartData = data.reduce((acc, item) => {
    const date = item.date;
    const existing = acc.find(d => d.name === date);
    
    if (existing) {
      existing.value += item[dataKey as keyof SalesData] as number;
    } else {
      acc.push({
        name: date,
        value: item[dataKey as keyof SalesData] as number,
        date: date
      });
    }
    
    return acc;
  }, [] as ChartDataPoint[]);

  // Sort by date
  chartData.sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());

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
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-foreground font-medium">{`Date: ${label}`}</p>
          <p className="text-primary">
            {`${title}: ${formatTooltipValue(payload[0].value)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  if (type === "area") {
    return (
      <Card className="gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
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
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="gradient-card border-border/50">
      <CardHeader>
        <CardTitle className="text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
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
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={3}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};