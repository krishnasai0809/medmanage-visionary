
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertTriangle, Calendar, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ExpiringItem {
  id: string;
  name: string;
  category: string;
  expiryDate: string;
  daysRemaining: number;
  quantity: number;
  stock: "low" | "medium" | "high";
}

const mockExpiringItems: ExpiringItem[] = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    expiryDate: "2023-12-15",
    daysRemaining: 5,
    quantity: 2500,
    stock: "high"
  },
  {
    id: "2",
    name: "Amoxicillin 250mg",
    category: "Antibiotics",
    expiryDate: "2024-01-10",
    daysRemaining: 31,
    quantity: 1800,
    stock: "medium"
  },
  {
    id: "3",
    name: "Insulin Glargine",
    category: "Diabetes",
    expiryDate: "2023-12-28",
    daysRemaining: 18,
    quantity: 500,
    stock: "medium"
  },
  {
    id: "4",
    name: "Vitamin B Complex",
    category: "Supplements",
    expiryDate: "2023-12-08",
    daysRemaining: 2,
    quantity: 1200,
    stock: "low"
  },
  {
    id: "5",
    name: "Hydrocortisone Cream",
    category: "Topical",
    expiryDate: "2024-02-15",
    daysRemaining: 67,
    quantity: 800,
    stock: "high"
  },
  {
    id: "6",
    name: "Ibuprofen 200mg",
    category: "Pain Relief",
    expiryDate: "2023-12-10",
    daysRemaining: 3,
    quantity: 350,
    stock: "low"
  },
  {
    id: "7",
    name: "Metformin 500mg",
    category: "Diabetes",
    expiryDate: "2023-12-14",
    daysRemaining: 7,
    quantity: 1200,
    stock: "medium"
  },
  {
    id: "8",
    name: "Aspirin 75mg",
    category: "Cardiovascular",
    expiryDate: "2023-12-18",
    daysRemaining: 10,
    quantity: 900,
    stock: "medium"
  }
];

interface ExpiryTrackingListProps {
  threshold?: number;
}

export function ExpiryTrackingList({ threshold = 30 }: ExpiryTrackingListProps) {
  const [expiringItems, setExpiringItems] = useState<ExpiringItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      // Sort and filter items based on threshold
      const filteredItems = mockExpiringItems
        .filter(item => item.daysRemaining <= threshold)
        .sort((a, b) => a.daysRemaining - b.daysRemaining);
      
      setExpiringItems(filteredItems);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [threshold]);

  const getExpiryStatusColor = (daysRemaining: number) => {
    if (daysRemaining <= 3) return "bg-red-500";
    if (daysRemaining <= 7) return "bg-amber-500";
    if (daysRemaining <= 10) return "bg-yellow-400";
    return "bg-green-500";
  };

  const getExpiryStatusText = (daysRemaining: number) => {
    if (daysRemaining <= 3) return "text-red-600 dark:text-red-400";
    if (daysRemaining <= 7) return "text-amber-600 dark:text-amber-400";
    if (daysRemaining <= 10) return "text-yellow-600 dark:text-yellow-400";
    return "text-green-600 dark:text-green-400";
  };

  const getBadgeBg = (daysRemaining: number) => {
    if (daysRemaining <= 3) return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    if (daysRemaining <= 7) return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400";
    if (daysRemaining <= 10) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
  };

  const getExpiryPercentage = (daysRemaining: number) => {
    if (daysRemaining > threshold) return 100;
    return (daysRemaining / threshold) * 100;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const handleRestock = (item: ExpiringItem) => {
    toast({
      title: "Restock request sent",
      description: `Requested restock for ${item.name}`,
    });
  };

  return (
    <Card className="h-full">
      <CardContent className="h-full p-0">
        {loading ? (
          <div className="h-full min-h-48 flex items-center justify-center p-6">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : expiringItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center">
            <AlertTriangle className="h-10 w-10 text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">No expiring items</h3>
            <p className="text-sm text-muted-foreground mt-1">
              No medicines are set to expire within the next {threshold} days.
            </p>
          </div>
        ) : (
          <div className="h-full overflow-auto">
            <div className="p-4 border-b bg-gray-50 dark:bg-gray-800/50 sticky top-0 flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">
                  {expiringItems.length} items expiring within {threshold} days
                </span>
              </div>
            </div>
            <div className="space-y-3 p-4">
              {expiringItems.map((item) => (
                <div 
                  key={item.id} 
                  className="p-3 border rounded-lg hover:shadow-md transition-shadow duration-200 hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="mb-2 sm:mb-0">
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <p className="text-xs text-gray-500">{item.category} • {item.quantity} units</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-xs font-medium px-2 py-1 rounded-full", 
                        getBadgeBg(item.daysRemaining)
                      )}>
                        {item.daysRemaining} days
                      </span>
                      <div className="flex items-center text-xs text-gray-400">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {formatDate(item.expiryDate)}
                      </div>
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

                  {item.stock === "low" && (
                    <div className="mt-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full text-xs" 
                        onClick={() => handleRestock(item)}
                      >
                        <RefreshCw className="h-3.5 w-3.5 mr-1" /> Restock Recommendation
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
