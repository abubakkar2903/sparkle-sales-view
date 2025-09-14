import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  previousValue?: number;
  format?: "currency" | "percentage" | "number";
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
}

export const KPICard = ({ title, value, previousValue, format = "number", trend, icon }: KPICardProps) => {
  const formatValue = (val: string | number) => {
    if (typeof val === "string") return val;
    
    switch (format) {
      case "currency":
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(val);
      case "percentage":
        return `${val.toFixed(1)}%`;
      default:
        return new Intl.NumberFormat("en-US").format(val);
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-dashboard-success" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-dashboard-danger" />;
      default:
        return <Minus className="h-4 w-4 text-dashboard-neutral" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-dashboard-success";
      case "down":
        return "text-dashboard-danger";
      default:
        return "text-dashboard-neutral";
    }
  };

  return (
    <Card className="gradient-card border-border/50 hover:border-primary/20 transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-foreground">
            {formatValue(value)}
          </div>
          {trend && (
            <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
              {getTrendIcon()}
              {previousValue && (
                <span className="text-xs font-medium">
                  {trend === "up" ? "+" : trend === "down" ? "-" : ""}
                  {format === "percentage" 
                    ? `${Math.abs(typeof value === "number" ? value : 0).toFixed(1)}%`
                    : `${Math.abs(typeof value === "number" ? value - previousValue : 0).toFixed(0)}`
                  }
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};