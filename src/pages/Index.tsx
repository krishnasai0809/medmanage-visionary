
import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { InventoryLevelChart } from "@/components/dashboard/InventoryLevelChart";
import { SupplierRankingTable } from "@/components/dashboard/SupplierRankingTable";
import { ExpiryTrackingList } from "@/components/dashboard/ExpiryTrackingList";
import { ForecastingPanel } from "@/components/dashboard/ForecastingPanel";
import { Package, TrendingUp, Users, AlertTriangle } from "lucide-react";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading delay for smooth UI experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
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
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
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
            <StatsCard
              title="Active Suppliers"
              value="28"
              description="4 pending approval"
              percentageChange={0}
              icon={Users}
              trend="neutral"
              className="hover-scale"
            />
            <StatsCard
              title="Expiring Soon"
              value="138"
              description="within 30 days"
              percentageChange={-24.5}
              icon={AlertTriangle}
              className="hover-scale"
            />
          </div>
        )}

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <InventoryLevelChart />
          </div>
          <div className="xl:col-span-1">
            <ExpiryTrackingList />
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
          <ForecastingPanel />
          <SupplierRankingTable />
        </div>
      </div>
    </AppLayout>
  );
}
