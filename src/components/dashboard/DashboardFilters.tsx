import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FilterOptions, DashboardFilters } from "@/types/dashboard";
import { X, Filter } from "lucide-react";

interface DashboardFiltersProps {
  filterOptions: FilterOptions;
  currentFilters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
}

export const DashboardFiltersComponent = ({
  filterOptions,
  currentFilters,
  onFiltersChange
}: DashboardFiltersProps) => {
  const handleFilterChange = (key: keyof DashboardFilters, value: string | null) => {
    onFiltersChange({
      ...currentFilters,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      category: null,
      region: null,
      store: null,
      dateRange: "all"
    });
  };

  const hasActiveFilters = Object.values(currentFilters).some(filter => 
    filter !== null && filter !== "all"
  );

  return (
    <Card className="gradient-card border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground font-medium">Category</label>
            <Select 
              value={currentFilters.category || "all"} 
              onValueChange={(value) => handleFilterChange("category", value === "all" ? null : value)}
            >
              <SelectTrigger className="bg-secondary/50 border-border">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {filterOptions.categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Region Filter */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground font-medium">Region</label>
            <Select 
              value={currentFilters.region || "all"} 
              onValueChange={(value) => handleFilterChange("region", value === "all" ? null : value)}
            >
              <SelectTrigger className="bg-secondary/50 border-border">
                <SelectValue placeholder="All Regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {filterOptions.regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Store Filter */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground font-medium">Store</label>
            <Select 
              value={currentFilters.store || "all"} 
              onValueChange={(value) => handleFilterChange("store", value === "all" ? null : value)}
            >
              <SelectTrigger className="bg-secondary/50 border-border">
                <SelectValue placeholder="All Stores" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                <SelectItem value="all">All Stores</SelectItem>
                {filterOptions.stores.map((store) => (
                  <SelectItem key={store} value={store}>
                    {store}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range Filter */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground font-medium">Date Range</label>
            <Select 
              value={currentFilters.dateRange} 
              onValueChange={(value) => handleFilterChange("dateRange", value)}
            >
              <SelectTrigger className="bg-secondary/50 border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="pt-3 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {currentFilters.category && (
                <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-xs">
                  <span>Category: {currentFilters.category}</span>
                  <button 
                    onClick={() => handleFilterChange("category", null)}
                    className="hover:text-primary/80"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              {currentFilters.region && (
                <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-xs">
                  <span>Region: {currentFilters.region}</span>
                  <button 
                    onClick={() => handleFilterChange("region", null)}
                    className="hover:text-primary/80"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              {currentFilters.store && (
                <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-xs">
                  <span>Store: {currentFilters.store}</span>
                  <button 
                    onClick={() => handleFilterChange("store", null)}
                    className="hover:text-primary/80"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              {currentFilters.dateRange !== "all" && (
                <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-xs">
                  <span>Period: {
                    currentFilters.dateRange === "7d" ? "Last 7 Days" :
                    currentFilters.dateRange === "30d" ? "Last 30 Days" :
                    currentFilters.dateRange === "90d" ? "Last 90 Days" :
                    currentFilters.dateRange === "1y" ? "Last Year" : 
                    "All Time"
                  }</span>
                  <button 
                    onClick={() => handleFilterChange("dateRange", "all")}
                    className="hover:text-primary/80"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};