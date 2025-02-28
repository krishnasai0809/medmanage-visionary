
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { AlertTriangle, Calendar } from "lucide-react";

interface ExpiringItem {
  id: string;
  name: string;
  category: string;
  expiryDate: string;
  daysRemaining: number;
  quantity: number;
}

const mockExpiringItems: ExpiringItem[] = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    expiryDate: "2023-12-15",
    daysRemaining: 5,
    quantity: 2500,
  },
  {
    id: "2",
    name: "Amoxicillin 250mg",
    category: "Antibiotics",
    expiryDate: "2024-01-10",
    daysRemaining: 31,
    quantity: 1800,
  },
  {
    id: "3",
    name: "Insulin Glargine",
    category: "Diabetes",
    expiryDate: "2023-12-28",
    daysRemaining: 18,
    quantity: 500,
  },
  {
    id: "4",
    name: "Vitamin B Complex",
    category: "Supplements",
    expiryDate: "2023-12-08",
    daysRemaining: 2,
    quantity: 1200,
  },
  {
    id: "5",
    name: "Hydrocortisone Cream",
    category: "Topical",
    expiryDate: "2024-02-15",
    daysRemaining: 67,
    quantity: 800,
  }
];

export function ExpiryTrackingList() {
  const [expiringItems, setExpiringItems] = useState<ExpiringItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setExpiringItems(mockExpiringItems);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const getExpiryStatusColor = (daysRemaining: number) => {
    if (daysRemaining <= 7) return "bg-red-500";
    if (daysRemaining <= 30) return "bg-amber-500";
    return "bg-green-500";
  };

  const getExpiryStatusText = (daysRemaining: number) => {
    if (daysRemaining <= 7) return "text-red-600 dark:text-red-400";
    if (daysRemaining <= 30) return "text-amber-600 dark:text-amber-400";
    return "text-green-600 dark:text-green-400";
  };

  const getExpiryPercentage = (daysRemaining: number) => {
    if (daysRemaining > 90) return 100;
    return (daysRemaining / 90) * 100;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <Card className="chart-container">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center">
              <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
              Expiry Tracking
            </CardTitle>
            <CardDescription>Medicines and supplies approaching expiry</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-48 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {expiringItems.map((item) => (
              <div 
                key={item.id} 
                className="p-4 border rounded-lg hover:shadow-md transition-shadow duration-200 hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="mb-2 sm:mb-0">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.category} • {item.quantity} units</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-xs font-medium">
                      {formatDate(item.expiryDate)}
                    </span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs">Expires in</span>
                    <span className={cn("text-xs font-medium", getExpiryStatusText(item.daysRemaining))}>
                      {item.daysRemaining} days
                    </span>
                  </div>
                  <Progress 
                    value={getExpiryPercentage(item.daysRemaining)} 
                    className="h-2" 
                    indicatorClassName={getExpiryStatusColor(item.daysRemaining)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
