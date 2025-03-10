
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface InventoryDataPoint {
  name: string;
  stock: number;
  forecastedDemand: number;
  optimalLevel: number;
}

const mockData: InventoryDataPoint[] = [
  { name: "Jan", stock: 80, forecastedDemand: 60, optimalLevel: 75 },
  { name: "Feb", stock: 75, forecastedDemand: 65, optimalLevel: 75 },
  { name: "Mar", stock: 70, forecastedDemand: 68, optimalLevel: 75 },
  { name: "Apr", stock: 65, forecastedDemand: 72, optimalLevel: 75 },
  { name: "May", stock: 80, forecastedDemand: 75, optimalLevel: 75 },
  { name: "Jun", stock: 90, forecastedDemand: 78, optimalLevel: 75 },
  { name: "Jul", stock: 85, forecastedDemand: 80, optimalLevel: 75 },
  { name: "Aug", stock: 70, forecastedDemand: 82, optimalLevel: 75 },
  { name: "Sep", stock: 60, forecastedDemand: 85, optimalLevel: 75 },
  { name: "Oct", stock: 55, forecastedDemand: 88, optimalLevel: 75 },
  { name: "Nov", stock: 80, forecastedDemand: 90, optimalLevel: 75 },
  { name: "Dec", stock: 95, forecastedDemand: 91, optimalLevel: 75 },
];

export function InventoryLevelChart() {
  const [data, setData] = useState<InventoryDataPoint[]>([]);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setData(mockData);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="chart-container">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Inventory Levels & Demand Forecast</CardTitle>
        <CardDescription>Yearly comparison of stock levels vs. forecasted demand</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, ""]}
                contentStyle={{ 
                  borderRadius: "0.375rem", 
                  border: "none", 
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  backgroundColor: "rgba(255, 255, 255, 0.9)"
                }}
              />
              <Legend 
                verticalAlign="top" 
                height={36} 
                iconType="circle" 
                iconSize={8}
              />
              <Area 
                type="monotone" 
                dataKey="stock" 
                name="Current Stock" 
                stroke="#0ea5e9" 
                fillOpacity={1} 
                fill="url(#colorStock)" 
                animationDuration={1500}
              />
              <Area 
                type="monotone" 
                dataKey="forecastedDemand" 
                name="Forecasted Demand" 
                stroke="#f97316" 
                fillOpacity={1} 
                fill="url(#colorDemand)" 
                animationDuration={1500}
              />
              <Area 
                type="monotone" 
                dataKey="optimalLevel" 
                name="Optimal Level" 
                stroke="#6b7280" 
                strokeDasharray="5 5" 
                fill="none" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
