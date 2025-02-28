
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
} from "recharts";
import { BrainCircuit, TrendingUp } from "lucide-react";

const mockForecastData = {
  weekly: [
    { day: "Mon", actual: 45, predicted: 48 },
    { day: "Tue", actual: 52, predicted: 51 },
    { day: "Wed", actual: 49, predicted: 54 },
    { day: "Thu", actual: 62, predicted: 57 },
    { day: "Fri", actual: 58, predicted: 59 },
    { day: "Sat", actual: 48, predicted: 52 },
    { day: "Sun", actual: 38, predicted: 42 },
  ],
  monthly: [
    { month: "Jan", actual: 1200, predicted: 1180 },
    { month: "Feb", actual: 1350, predicted: 1320 },
    { month: "Mar", actual: 1400, predicted: 1450 },
    { month: "Apr", actual: 1250, predicted: 1350 },
    { month: "May", actual: 1500, predicted: 1480 },
    { month: "Jun", actual: 1600, predicted: 1620 },
  ],
  categories: [
    { name: "Antibiotics", value: 32 },
    { name: "Pain Relief", value: 24 },
    { name: "Cardiovascular", value: 18 },
    { name: "Diabetes", value: 14 },
    { name: "Other", value: 12 },
  ],
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export function ForecastingPanel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [forecastData, setForecastData] = useState({
    weekly: [],
    monthly: [],
    categories: [],
  });

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setForecastData(mockForecastData);
      setLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value} units`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(${(percent * 100).toFixed(0)}%)`}
        </text>
      </g>
    );
  };

  return (
    <Card className="chart-container">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <BrainCircuit className="mr-2 h-5 w-5 text-primary" />
          AI-Powered Demand Forecasting
        </CardTitle>
        <CardDescription>Predictive analytics for inventory planning</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[350px] flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <Tabs defaultValue="weekly" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="categories">By Category</TabsTrigger>
            </TabsList>
            
            <TabsContent value="weekly" className="mt-4">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={forecastData.weekly}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="day" 
                      tick={{ fontSize: 12 }} 
                      axisLine={{ stroke: "#e5e7eb" }}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      axisLine={{ stroke: "#e5e7eb" }}
                      tickLine={false}
                      label={{ value: 'Units', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#6b7280', fontSize: 12 } }}
                    />
                    <Tooltip 
                      formatter={(value, name) => [value, name === "predicted" ? "AI Prediction" : "Actual Demand"]}
                      contentStyle={{ 
                        borderRadius: "0.375rem", 
                        border: "none", 
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        backgroundColor: "rgba(255, 255, 255, 0.9)"
                      }}
                    />
                    <Legend formatter={(value) => value === "predicted" ? "AI Prediction" : "Actual Demand"} />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#6366f1" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      animationDuration={1500}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="#f97316" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      animationDuration={1500}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-start">
                  <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-300">AI Insight</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Demand typically peaks on Thursdays and Fridays. Consider increasing stock levels by 15% for these days.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="monthly" className="mt-4">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={forecastData.monthly}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12 }} 
                      axisLine={{ stroke: "#e5e7eb" }}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      axisLine={{ stroke: "#e5e7eb" }}
                      tickLine={false}
                      label={{ value: 'Units', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#6b7280', fontSize: 12 } }}
                    />
                    <Tooltip 
                      formatter={(value, name) => [value, name === "predicted" ? "AI Prediction" : "Actual Demand"]}
                      contentStyle={{ 
                        borderRadius: "0.375rem", 
                        border: "none", 
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        backgroundColor: "rgba(255, 255, 255, 0.9)"
                      }}
                    />
                    <Legend formatter={(value) => value === "predicted" ? "AI Prediction" : "Actual Demand"} />
                    <Bar 
                      dataKey="actual" 
                      fill="#6366f1" 
                      name="actual"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    />
                    <Bar 
                      dataKey="predicted" 
                      fill="#f97316" 
                      name="predicted"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-start">
                  <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-300">AI Insight</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Expected 8.5% growth trend for Q3. Order 12% more inventory compared to previous quarter to maintain optimal stock levels.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="categories" className="mt-4">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      data={forecastData.categories}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                      onMouseEnter={onPieEnter}
                      animationDuration={1500}
                    >
                      {forecastData.categories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} units`, "Forecasted Demand"]}
                      contentStyle={{ 
                        borderRadius: "0.375rem", 
                        border: "none", 
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        backgroundColor: "rgba(255, 255, 255, 0.9)"
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-start">
                  <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-300">AI Insight</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Antibiotics and Pain Relief medications account for 56% of projected demand. Prioritize these categories for restocking.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
