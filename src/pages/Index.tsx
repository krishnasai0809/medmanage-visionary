
import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { InventoryLevelChart } from "@/components/dashboard/InventoryLevelChart";
import { SupplierRankingTable } from "@/components/dashboard/SupplierRankingTable";
import { ExpiryTrackingList } from "@/components/dashboard/ExpiryTrackingList";
import { ForecastingPanel } from "@/components/dashboard/ForecastingPanel";
import { DeliveryStatusCard } from "@/components/dashboard/DeliveryStatusCard";
import { TopInDemandList } from "@/components/dashboard/TopInDemandList";
import { Package, TrendingUp } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [expiryThreshold, setExpiryThreshold] = useState(10);

  useEffect(() => {
    // Simulate data loading delay for smooth UI experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleExpiryThresholdChange = (value: string) => {
    setExpiryThreshold(parseInt(value));
  };

  return (
    <AppLayout>
      <div className="space-y-4 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Your hospital inventory management system at a glance.
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, idx) => (
              <div 
                key={idx} 
                className="h-32 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <StatsCard
              title="Total Inventory"
              value="24,892"
              description="vs last month"
              percentageChange={7.2}
              icon={Package}
              className="hover-scale"
            />
            <StatsCard
              title="Forecasted Demand"
              value="16,245"
              description="next 30 days"
              percentageChange={12.8}
              icon={TrendingUp}
              className="hover-scale"
            />
            <DeliveryStatusCard />
          </div>
        )}

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <InventoryLevelChart />
          </div>
          <div className="xl:col-span-1">
            <div className="flex flex-col h-full space-y-4">
              <div className="h-1/2">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Expiry Tracking</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Show items expiring within:</span>
                    <Select
                      value={expiryThreshold.toString()}
                      onValueChange={handleExpiryThresholdChange}
                    >
                      <SelectTrigger className="w-[100px] h-8">
                        <SelectValue placeholder="10 days" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 days</SelectItem>
                        <SelectItem value="5">5 days</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="10">10 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <ExpiryTrackingList threshold={expiryThreshold} />
              </div>
              <div className="h-1/2">
                <TopInDemandList />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
          <div className="space-y-4">
            <ForecastingPanel />
          </div>
          <SupplierRankingTable />
        </div>
      </div>
    </AppLayout>
  );
}
