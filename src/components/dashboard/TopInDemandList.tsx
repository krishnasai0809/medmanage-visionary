
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUp, TrendingUp } from "lucide-react";

interface Medicine {
  id: string;
  name: string;
  demandCount: number;
  percentageIncrease: number;
  category: string;
}

// Mock data for top in-demand medicines
const mockMedicineData: Medicine[] = [
  { id: "1", name: "Amoxicillin", demandCount: 458, percentageIncrease: 24.5, category: "Antibiotics" },
  { id: "2", name: "Ibuprofen", demandCount: 352, percentageIncrease: 18.2, category: "Pain Relief" },
  { id: "3", name: "Lisinopril", demandCount: 278, percentageIncrease: 15.7, category: "Cardiovascular" },
  { id: "4", name: "Metformin", demandCount: 245, percentageIncrease: 12.3, category: "Diabetes" },
  { id: "5", name: "Atorvastatin", demandCount: 203, percentageIncrease: 9.8, category: "Cardiovascular" },
  { id: "6", name: "Albuterol", demandCount: 187, percentageIncrease: 7.5, category: "Respiratory" },
  { id: "7", name: "Levothyroxine", demandCount: 156, percentageIncrease: 5.9, category: "Thyroid" },
  { id: "8", name: "Prednisone", demandCount: 132, percentageIncrease: 4.2, category: "Anti-inflammatory" },
  { id: "9", name: "Omeprazole", demandCount: 127, percentageIncrease: 3.8, category: "Gastrointestinal" },
  { id: "10", name: "Losartan", demandCount: 118, percentageIncrease: 2.4, category: "Cardiovascular" },
];

export function TopInDemandList() {
  const [isLoading, setIsLoading] = useState(true);
  const [topMedicines, setTopMedicines] = useState<Medicine[]>([]);
  const [timeThreshold, setTimeThreshold] = useState("30");

  // Simulate data loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      // In a real application, you would filter data based on the time threshold
      // For now, we'll just simulate different data lengths based on threshold
      const filteredData = mockMedicineData.slice(0, timeThreshold === "7" ? 5 : 
                                                   timeThreshold === "14" ? 7 : 10);
      setTopMedicines(filteredData);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [timeThreshold]);

  const handleTimeThresholdChange = (value: string) => {
    setTimeThreshold(value);
  };

  return (
    <Card className="h-full hover-scale">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-semibold">Top In-Demand Medicines</CardTitle>
          </div>
          <Select
            value={timeThreshold}
            onValueChange={handleTimeThresholdChange}
          >
            <SelectTrigger className="w-[130px] h-8">
              <SelectValue placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="14">Last 14 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardDescription>
          Medicines with highest demand over the past {timeThreshold} days
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-[150px]">
            <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="max-h-[150px] overflow-y-auto pr-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medicine</TableHead>
                  <TableHead>Demand</TableHead>
                  <TableHead className="text-right">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topMedicines.map((medicine) => (
                  <TableRow key={medicine.id}>
                    <TableCell className="font-medium">
                      <div>
                        {medicine.name}
                        <div className="text-xs text-muted-foreground">{medicine.category}</div>
                      </div>
                    </TableCell>
                    <TableCell>{medicine.demandCount} units</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        <span className="text-emerald-600 mr-1">+{medicine.percentageIncrease}%</span>
                        <ArrowUp className="h-3 w-3 text-emerald-600" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
