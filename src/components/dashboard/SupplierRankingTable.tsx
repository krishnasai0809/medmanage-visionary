
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Supplier {
  id: string;
  name: string;
  rating: number;
  responseTime: string;
  deliveryPerformance: string;
  priceCompetitiveness: "High" | "Medium" | "Low";
  onTimeDelivery: number;
  status: "Active" | "Inactive" | "Under Review";
}

const mockSuppliers: Supplier[] = [
  {
    id: "1",
    name: "MediTech Pharmaceuticals",
    rating: 4.8,
    responseTime: "24h",
    deliveryPerformance: "Excellent",
    priceCompetitiveness: "High",
    onTimeDelivery: 98.5,
    status: "Active",
  },
  {
    id: "2",
    name: "Global Health Supplies",
    rating: 4.5,
    responseTime: "48h",
    deliveryPerformance: "Good",
    priceCompetitiveness: "Medium",
    onTimeDelivery: 92.7,
    status: "Active",
  },
  {
    id: "3",
    name: "PharmaPlus Inc.",
    rating: 4.2,
    responseTime: "36h",
    deliveryPerformance: "Good",
    priceCompetitiveness: "Medium",
    onTimeDelivery: 90.2,
    status: "Active",
  },
  {
    id: "4",
    name: "MedEquip Solutions",
    rating: 3.9,
    responseTime: "72h",
    deliveryPerformance: "Average",
    priceCompetitiveness: "Low",
    onTimeDelivery: 85.4,
    status: "Under Review",
  },
  {
    id: "5",
    name: "Healthcare Products Co.",
    rating: 4.7,
    responseTime: "24h",
    deliveryPerformance: "Excellent",
    priceCompetitiveness: "High",
    onTimeDelivery: 97.8,
    status: "Active",
  }
];

export function SupplierRankingTable() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [sortField, setSortField] = useState<keyof Supplier>("rating");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuppliers(mockSuppliers);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSort = (field: keyof Supplier) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedSuppliers = [...suppliers]
    .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={14}
            className={cn(
              "mr-0.5",
              index < Math.floor(rating) 
                ? "text-yellow-400 fill-yellow-400" 
                : index < rating 
                  ? "text-yellow-400 fill-yellow-400 opacity-50" 
                  : "text-gray-300"
            )}
          />
        ))}
        <span className="ml-1.5 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const getStatusBadge = (status: Supplier["status"]) => {
    switch (status) {
      case "Active":
        return <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400">Active</Badge>;
      case "Inactive":
        return <Badge variant="outline" className="border-gray-500 text-gray-600 bg-gray-50 dark:bg-gray-950 dark:text-gray-400">Inactive</Badge>;
      case "Under Review":
        return <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-950 dark:text-amber-400">Under Review</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="chart-container">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-semibold">Top Suppliers</CardTitle>
            <CardDescription>Performance metrics of key suppliers</CardDescription>
          </div>
          <div className="relative w-48">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search suppliers..."
              className="w-full pl-8 py-1 pr-3 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-48 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[220px]">Supplier</TableHead>
                  <TableHead className="w-[120px]">
                    <button 
                      className="flex items-center space-x-1"
                      onClick={() => handleSort("rating")}
                    >
                      <span>Rating</span>
                      <ArrowUpDown size={14} className="ml-1" />
                    </button>
                  </TableHead>
                  <TableHead className="text-center w-[100px]">Response Time</TableHead>
                  <TableHead className="text-center">Delivery</TableHead>
                  <TableHead className="text-center">Price</TableHead>
                  <TableHead className="text-center">
                    <button 
                      className="flex items-center justify-center space-x-1 mx-auto"
                      onClick={() => handleSort("onTimeDelivery")}
                    >
                      <span>On-Time</span>
                      <ArrowUpDown size={14} className="ml-1" />
                    </button>
                  </TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedSuppliers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center h-32 text-muted-foreground">
                      No suppliers found. Try a different search term.
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedSuppliers.map((supplier) => (
                    <TableRow key={supplier.id} className="hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer">
                      <TableCell className="font-medium">{supplier.name}</TableCell>
                      <TableCell>{renderStarRating(supplier.rating)}</TableCell>
                      <TableCell className="text-center">{supplier.responseTime}</TableCell>
                      <TableCell className="text-center">{supplier.deliveryPerformance}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={supplier.priceCompetitiveness === "High" ? "default" : "secondary"} className="font-normal">
                          {supplier.priceCompetitiveness}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center font-medium">
                        {supplier.onTimeDelivery}%
                      </TableCell>
                      <TableCell className="text-right">{getStatusBadge(supplier.status)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
