
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { SupplierRankingTable } from "@/components/dashboard/SupplierRankingTable";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { 
  Users, 
  UserPlus, 
  Search, 
  Star, 
  Clock, 
  BarChart4, 
  ShieldCheck, 
  TrendingUp, 
  Banknote, 
  Truck, 
  ThumbsUp, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  ArrowUpDown,
  MapPin,
  ClipboardList,
  Filter,
  FileText,
  Percent,
  Calendar
} from "lucide-react";

// Define the Supplier interface
interface Supplier {
  id: string;
  name: string;
  category: string[];
  contactName: string;
  email: string;
  phone: string;
  address: string;
  rating: number;
  responseTime: string;
  deliveryPerformance: "Excellent" | "Good" | "Average" | "Poor";
  priceCompetitiveness: "High" | "Medium" | "Low";
  onTimeDelivery: number;
  status: "Active" | "Inactive" | "Under Review";
  leadTime: number;
  qualityScore: number;
  lastOrder: string;
  totalOrders: number;
  contractEndDate?: string;
}

// Mock suppliers data
const mockSuppliers: Supplier[] = [
  {
    id: "SUP001",
    name: "MediTech Pharmaceuticals",
    category: ["Pain Relief", "Antibiotics", "Supplements"],
    contactName: "John Smith",
    email: "john.smith@meditech.com",
    phone: "+1 (555) 123-4567",
    address: "123 Pharma Lane, Medical City, CA 90210",
    rating: 4.8,
    responseTime: "24h",
    deliveryPerformance: "Excellent",
    priceCompetitiveness: "High",
    onTimeDelivery: 98.5,
    status: "Active",
    leadTime: 2,
    qualityScore: 95,
    lastOrder: "2023-10-28",
    totalOrders: 156,
    contractEndDate: "2024-12-31"
  },
  {
    id: "SUP002",
    name: "Global Health Supplies",
    category: ["Cardiovascular", "Diabetes", "Respiratory"],
    contactName: "Sarah Johnson",
    email: "sarah.j@globalheath.com",
    phone: "+1 (555) 987-6543",
    address: "456 MediSupply Drive, Health District, NY 10001",
    rating: 4.5,
    responseTime: "48h",
    deliveryPerformance: "Good",
    priceCompetitiveness: "Medium",
    onTimeDelivery: 92.7,
    status: "Active",
    leadTime: 3,
    qualityScore: 88,
    lastOrder: "2023-11-02",
    totalOrders: 98,
    contractEndDate: "2024-10-15"
  },
  {
    id: "SUP003",
    name: "PharmaPlus Inc.",
    category: ["Gastrointestinal", "Pain Relief", "Topical"],
    contactName: "Michael Brown",
    email: "m.brown@pharmaplus.com",
    phone: "+1 (555) 234-5678",
    address: "789 Cure Avenue, Wellness Park, TX 75001",
    rating: 4.2,
    responseTime: "36h",
    deliveryPerformance: "Good",
    priceCompetitiveness: "Medium",
    onTimeDelivery: 90.2,
    status: "Active",
    leadTime: 4,
    qualityScore: 86,
    lastOrder: "2023-10-20",
    totalOrders: 74,
    contractEndDate: "2024-11-30"
  },
  {
    id: "SUP004",
    name: "MedEquip Solutions",
    category: ["Equipment", "Surgical Supplies", "Diagnostics"],
    contactName: "Emily Davis",
    email: "emily@medequip.com",
    phone: "+1 (555) 345-6789",
    address: "101 Equipment Road, Medical Park, IL 60007",
    rating: 3.9,
    responseTime: "72h",
    deliveryPerformance: "Average",
    priceCompetitiveness: "Low",
    onTimeDelivery: 85.4,
    status: "Under Review",
    leadTime: 7,
    qualityScore: 79,
    lastOrder: "2023-10-15",
    totalOrders: 42,
    contractEndDate: "2024-06-30"
  },
  {
    id: "SUP005",
    name: "Healthcare Products Co.",
    category: ["Pain Relief", "Supplements", "Topical"],
    contactName: "Robert Wilson",
    email: "rwilson@healthcareproducts.com",
    phone: "+1 (555) 456-7890",
    address: "202 Wellness Blvd, Vitality City, FL 33101",
    rating: 4.7,
    responseTime: "24h",
    deliveryPerformance: "Excellent",
    priceCompetitiveness: "High",
    onTimeDelivery: 97.8,
    status: "Active",
    leadTime: 2,
    qualityScore: 93,
    lastOrder: "2023-11-01",
    totalOrders: 118,
    contractEndDate: "2024-12-15"
  },
  {
    id: "SUP006",
    name: "Wellness Medical Supplies",
    category: ["Respiratory", "Diabetes", "Diagnostics"],
    contactName: "Jennifer Martinez",
    email: "jmartinez@wellnessmedical.com",
    phone: "+1 (555) 567-8901",
    address: "303 Health Street, Medical City, CA 90211",
    rating: 4.3,
    responseTime: "48h",
    deliveryPerformance: "Good",
    priceCompetitiveness: "Medium",
    onTimeDelivery: 91.5,
    status: "Active",
    leadTime: 3,
    qualityScore: 87,
    lastOrder: "2023-10-25",
    totalOrders: 83,
    contractEndDate: "2024-09-30"
  },
  {
    id: "SUP007",
    name: "EcoHealth Pharmaceuticals",
    category: ["Antibiotics", "Cardiovascular", "Pain Relief"],
    contactName: "David Thompson",
    email: "david@ecohealth.com",
    phone: "+1 (555) 678-9012",
    address: "404 Eco Drive, Green Valley, OR 97401",
    rating: 4.1,
    responseTime: "36h",
    deliveryPerformance: "Good",
    priceCompetitiveness: "High",
    onTimeDelivery: 89.3,
    status: "Active",
    leadTime: 4,
    qualityScore: 84,
    lastOrder: "2023-10-18",
    totalOrders: 67,
    contractEndDate: "2024-08-31"
  },
  {
    id: "SUP008",
    name: "MaxCare Medical",
    category: ["Surgical Supplies", "Equipment", "Wound Care"],
    contactName: "Jessica Lee",
    email: "jessica@maxcaremedical.com",
    phone: "+1 (555) 789-0123",
    address: "505 Care Avenue, Maxville, WA 98001",
    rating: 4.6,
    responseTime: "24h",
    deliveryPerformance: "Excellent",
    priceCompetitiveness: "Medium",
    onTimeDelivery: 95.7,
    status: "Active",
    leadTime: 3,
    qualityScore: 90,
    lastOrder: "2023-10-30",
    totalOrders: 92,
    contractEndDate: "2024-11-15"
  },
  {
    id: "SUP009",
    name: "VitalPharma Solutions",
    category: ["Cardiovascular", "Gastrointestinal", "Supplements"],
    contactName: "Andrew Clark",
    email: "andrew@vitalpharma.com",
    phone: "+1 (555) 890-1234",
    address: "606 Vital Street, Pharma District, NC 27601",
    rating: 3.8,
    responseTime: "72h",
    deliveryPerformance: "Average",
    priceCompetitiveness: "Low",
    onTimeDelivery: 82.9,
    status: "Inactive",
    leadTime: 6,
    qualityScore: 77,
    lastOrder: "2023-09-15",
    totalOrders: 35,
    contractEndDate: "2023-12-31"
  },
  {
    id: "SUP010",
    name: "MediSource International",
    category: ["Antibiotics", "Pain Relief", "Diabetes"],
    contactName: "Laura Garcia",
    email: "lgarcia@medisource.com",
    phone: "+1 (555) 901-2345",
    address: "707 Global Way, International Park, NY 10002",
    rating: 4.4,
    responseTime: "36h",
    deliveryPerformance: "Good",
    priceCompetitiveness: "High",
    onTimeDelivery: 93.2,
    status: "Active",
    leadTime: 5,
    qualityScore: 89,
    lastOrder: "2023-11-03",
    totalOrders: 105,
    contractEndDate: "2024-10-31"
  }
];

// All categories across suppliers
const allCategories = [
  "Pain Relief",
  "Antibiotics",
  "Supplements",
  "Cardiovascular",
  "Diabetes",
  "Respiratory",
  "Gastrointestinal",
  "Topical",
  "Equipment",
  "Surgical Supplies",
  "Diagnostics",
  "Wound Care"
];

// Supplier form interface
interface SupplierFormData {
  id?: string;
  name: string;
  category: string[];
  contactName: string;
  email: string;
  phone: string;
  address: string;
  priceCompetitiveness: "High" | "Medium" | "Low";
  leadTime: number;
  contractEndDate?: string;
}

export default function Suppliers() {
  const { toast } = useToast();
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Supplier>("rating");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  
  // Form state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [formData, setFormData] = useState<SupplierFormData>({
    name: "",
    category: [],
    contactName: "",
    email: "",
    phone: "",
    address: "",
    priceCompetitiveness: "Medium",
    leadTime: 3,
    contractEndDate: ""
  });

  // Simulate data loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Handle sorting
  const handleSort = (field: keyof Supplier) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Filter suppliers based on search, category, status, and active tab
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || supplier.category.includes(selectedCategory);
    const matchesStatus = selectedStatus === "all" || supplier.status === selectedStatus;
    const matchesTab = activeTab === "all" || 
                      (activeTab === "top-rated" && supplier.rating >= 4.5) ||
                      (activeTab === "under-review" && supplier.status === "Under Review");
    
    return matchesSearch && matchesCategory && matchesStatus && matchesTab;
  });

  // Sort filtered suppliers
  const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
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

  // Reset form data
  const resetFormData = () => {
    setFormData({
      name: "",
      category: [],
      contactName: "",
      email: "",
      phone: "",
      address: "",
      priceCompetitiveness: "Medium",
      leadTime: 3,
      contractEndDate: ""
    });
  };

  // Handle form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "leadTime" ? parseInt(value) || 0 : value
    }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle category selection
  const handleCategoryChange = (selectedCategory: string) => {
    setFormData(prev => {
      const currentCategories = [...prev.category];
      
      if (currentCategories.includes(selectedCategory)) {
        return {
          ...prev,
          category: currentCategories.filter(cat => cat !== selectedCategory)
        };
      } else {
        return {
          ...prev,
          category: [...currentCategories, selectedCategory]
        };
      }
    });
  };

  // Add new supplier
  const handleAddSupplier = () => {
    const newSupplier: Supplier = {
      id: `SUP${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`,
      ...formData,
      rating: 3.0,
      responseTime: "48h",
      deliveryPerformance: "Average",
      onTimeDelivery: 85.0,
      status: "Under Review",
      qualityScore: 80,
      lastOrder: "N/A",
      totalOrders: 0
    };
    
    setSuppliers([...suppliers, newSupplier]);
    setIsAddDialogOpen(false);
    resetFormData();
    
    toast({
      title: "Supplier Added",
      description: `${newSupplier.name} has been added to your supplier list.`,
    });
  };

  // Edit supplier
  const handleEditSupplier = () => {
    if (!selectedSupplier) return;
    
    const updatedSuppliers = suppliers.map(supplier => {
      if (supplier.id === selectedSupplier.id) {
        return {
          ...supplier,
          name: formData.name,
          category: formData.category,
          contactName: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          priceCompetitiveness: formData.priceCompetitiveness,
          leadTime: formData.leadTime,
          contractEndDate: formData.contractEndDate
        };
      }
      return supplier;
    });
    
    setSuppliers(updatedSuppliers);
    setIsEditDialogOpen(false);
    setSelectedSupplier(null);
    resetFormData();
    
    toast({
      title: "Supplier Updated",
      description: `${formData.name} has been updated.`,
    });
  };

  // Delete supplier
  const handleDeleteSupplier = () => {
    if (!selectedSupplier) return;
    
    const updatedSuppliers = suppliers.filter(supplier => supplier.id !== selectedSupplier.id);
    setSuppliers(updatedSuppliers);
    setIsDeleteDialogOpen(false);
    setSelectedSupplier(null);
    
    toast({
      title: "Supplier Deleted",
      description: `${selectedSupplier.name} has been removed from your supplier list.`,
      variant: "destructive",
    });
  };

  // Open edit dialog with selected supplier data
  const openEditDialog = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setFormData({
      id: supplier.id,
      name: supplier.name,
      category: [...supplier.category],
      contactName: supplier.contactName,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      priceCompetitiveness: supplier.priceCompetitiveness,
      leadTime: supplier.leadTime,
      contractEndDate: supplier.contractEndDate || ""
    });
    setIsEditDialogOpen(true);
  };

  // Open delete dialog with selected supplier
  const openDeleteDialog = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsDeleteDialogOpen(true);
  };

  // Open details dialog with selected supplier
  const openDetailsDialog = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsDetailsDialogOpen(true);
  };

  // Render star rating
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

  // Get status badge
  const getStatusBadge = (status: Supplier["status"]) => {
    switch (status) {
      case "Active":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">Active</Badge>;
      case "Inactive":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800">Inactive</Badge>;
      case "Under Review":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800">Under Review</Badge>;
      default:
        return null;
    }
  };

  // Get price competitiveness badge
  const getPriceCompetitivenessBadge = (level: Supplier["priceCompetitiveness"]) => {
    switch (level) {
      case "High":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">High</Badge>;
      case "Medium":
        return <Badge variant="secondary">Medium</Badge>;
      case "Low":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">Low</Badge>;
      default:
        return null;
    }
  };

  // Get delivery performance badge
  const getDeliveryPerformanceBadge = (performance: Supplier["deliveryPerformance"]) => {
    switch (performance) {
      case "Excellent":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Excellent</Badge>;
      case "Good":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Good</Badge>;
      case "Average":
        return <Badge variant="secondary">Average</Badge>;
      case "Poor":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">Poor</Badge>;
      default:
        return null;
    }
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString || dateString === "N/A") return "N/A";
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Supplier Management</h1>
            <p className="text-muted-foreground">
              Manage and evaluate your supplier relationships.
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Supplier
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Add New Supplier</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new supplier. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Supplier Name</label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Company name"
                        value={formData.name}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Categories</label>
                      <div className="grid grid-cols-2 gap-2 border rounded-md p-2 max-h-24 overflow-y-auto">
                        {allCategories.map(category => (
                          <div key={category} className="flex items-center">
                            <input 
                              type="checkbox"
                              id={`category-${category}`}
                              className="mr-2"
                              checked={formData.category.includes(category)}
                              onChange={() => handleCategoryChange(category)}
                            />
                            <label htmlFor={`category-${category}`} className="text-sm">
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contactName" className="text-sm font-medium">Contact Person</label>
                    <Input
                      id="contactName"
                      name="contactName"
                      placeholder="Full name"
                      value={formData.contactName}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="address" className="text-sm font-medium">Address</label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Street address, city, state, zip"
                      value={formData.address}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="priceCompetitiveness" className="text-sm font-medium">Price Competitiveness</label>
                      <Select 
                        value={formData.priceCompetitiveness} 
                        onValueChange={(value) => handleSelectChange("priceCompetitiveness", value as "High" | "Medium" | "Low")}
                      >
                        <SelectTrigger id="priceCompetitiveness">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="leadTime" className="text-sm font-medium">Lead Time (days)</label>
                      <Input
                        id="leadTime"
                        name="leadTime"
                        type="number"
                        placeholder="3"
                        min="1"
                        value={formData.leadTime}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contractEndDate" className="text-sm font-medium">Contract End Date</label>
                    <Input
                      id="contractEndDate"
                      name="contractEndDate"
                      type="date"
                      value={formData.contractEndDate}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsAddDialogOpen(false);
                      resetFormData();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddSupplier}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Supplier Overview</CardTitle>
              <CardDescription>Performance metrics of key suppliers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 gap-3">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search suppliers..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select 
                    value={selectedCategory} 
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-[160px]">
                      <div className="flex items-center">
                        <Filter className="mr-2 h-4 w-4" />
                        <span>Category</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {allCategories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select 
                    value={selectedStatus} 
                    onValueChange={setSelectedStatus}
                  >
                    <SelectTrigger className="w-[160px]">
                      <div className="flex items-center">
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        <span>Status</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Under Review">Under Review</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="all" className="flex-1">All Suppliers</TabsTrigger>
                  <TabsTrigger value="top-rated" className="flex-1">Top Rated</TabsTrigger>
                  <TabsTrigger value="under-review" className="flex-1">Under Review</TabsTrigger>
                </TabsList>
              </Tabs>

              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : sortedSuppliers.length === 0 ? (
                <div className="text-center py-8 border rounded-md">
                  <Users className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium mb-1">No suppliers found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
                </div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800 border-b">
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          <button 
                            className="flex items-center"
                            onClick={() => handleSort("name")}
                          >
                            Supplier
                            <ArrowUpDown size={14} className="ml-1" />
                          </button>
                        </th>
                        <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          <button 
                            className="flex items-center mx-auto"
                            onClick={() => handleSort("rating")}
                          >
                            Rating
                            <ArrowUpDown size={14} className="ml-1" />
                          </button>
                        </th>
                        <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Response</th>
                        <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                        <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          <button 
                            className="flex items-center mx-auto"
                            onClick={() => handleSort("onTimeDelivery")}
                          >
                            On-Time
                            <ArrowUpDown size={14} className="ml-1" />
                          </button>
                        </th>
                        <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedSuppliers.map((supplier) => (
                        <tr 
                          key={supplier.id} 
                          className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                          onClick={() => openDetailsDialog(supplier)}
                        >
                          <td className="py-3 px-4">
                            <div className="flex flex-col">
                              <span className="font-medium">{supplier.name}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{supplier.contactName}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center">{renderStarRating(supplier.rating)}</td>
                          <td className="py-3 px-4 text-center">{supplier.responseTime}</td>
                          <td className="py-3 px-4 text-center">{getPriceCompetitivenessBadge(supplier.priceCompetitiveness)}</td>
                          <td className="py-3 px-4 text-center font-medium">{supplier.onTimeDelivery}%</td>
                          <td className="py-3 px-4 text-center">{getStatusBadge(supplier.status)}</td>
                          <td className="py-3 px-4 text-right">
                            <div onClick={(e) => e.stopPropagation()}>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="ml-auto">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={() => openDetailsDialog(supplier)}>
                                    <FileText className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => openEditDialog(supplier)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => openDeleteDialog(supplier)} className="text-red-600 dark:text-red-400">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Supplier Stats</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium">Top Performers</h4>
                    <span className="text-sm text-muted-foreground">{suppliers.filter(s => s.rating >= 4.5).length} suppliers</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1">
                    {suppliers
                      .filter(s => s.rating >= 4.5)
                      .sort((a, b) => b.rating - a.rating)
                      .slice(0, 5)
                      .map((s, index) => (
                        <div 
                          key={s.id}
                          className={cn(
                            "h-2 rounded-full",
                            index === 0 ? "bg-green-500" : 
                            index === 1 ? "bg-green-400" : 
                            index === 2 ? "bg-green-300" : 
                            "bg-green-200"
                          )}
                          style={{ width: `${(s.rating / 5) * 100}%` }}
                          title={`${s.name}: ${s.rating.toFixed(1)}`}
                        />
                      ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Average Response Time</h4>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-lg font-bold">
                        {calculateAverageResponseTime(suppliers)}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Avg. On-Time Delivery</h4>
                    <div className="flex items-center">
                      <Truck className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-lg font-bold">
                        {calculateAverageOnTimeDelivery(suppliers)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Supplier Categories</h4>
                  <div className="flex flex-wrap gap-1">
                    {allCategories.map(category => {
                      const count = suppliers.filter(s => s.category.includes(category)).length;
                      return count > 0 ? (
                        <Badge key={category} variant="secondary" className="text-xs">
                          {category} ({count})
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Price Competitiveness</h4>
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div className="space-y-1">
                      <div className="h-16 flex items-end justify-center">
                        <div 
                          className="w-12 bg-green-500 rounded-t-md"
                          style={{ 
                            height: `${(suppliers.filter(s => s.priceCompetitiveness === "High").length / suppliers.length) * 100}%` 
                          }}
                        />
                      </div>
                      <p className="font-medium">High</p>
                      <p className="text-xs text-muted-foreground">
                        {suppliers.filter(s => s.priceCompetitiveness === "High").length}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <div className="h-16 flex items-end justify-center">
                        <div 
                          className="w-12 bg-blue-500 rounded-t-md"
                          style={{ 
                            height: `${(suppliers.filter(s => s.priceCompetitiveness === "Medium").length / suppliers.length) * 100}%` 
                          }}
                        />
                      </div>
                      <p className="font-medium">Medium</p>
                      <p className="text-xs text-muted-foreground">
                        {suppliers.filter(s => s.priceCompetitiveness === "Medium").length}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <div className="h-16 flex items-end justify-center">
                        <div 
                          className="w-12 bg-red-500 rounded-t-md"
                          style={{ 
                            height: `${(suppliers.filter(s => s.priceCompetitiveness === "Low").length / suppliers.length) * 100}%` 
                          }}
                        />
                      </div>
                      <p className="font-medium">Low</p>
                      <p className="text-xs text-muted-foreground">
                        {suppliers.filter(s => s.priceCompetitiveness === "Low").length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <SupplierRankingTable />

        {/* Delete Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this supplier? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {selectedSupplier && (
                <div className="p-4 border rounded-md">
                  <p className="font-medium">{selectedSupplier.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedSupplier.contactName}</p>
                  <p className="text-sm text-muted-foreground">{selectedSupplier.email}</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsDeleteDialogOpen(false);
                  setSelectedSupplier(null);
                }}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteSupplier}>Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Edit Supplier</DialogTitle>
              <DialogDescription>
                Update the details of the selected supplier.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-name" className="text-sm font-medium">Supplier Name</label>
                  <Input
                    id="edit-name"
                    name="name"
                    placeholder="Company name"
                    value={formData.name}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Categories</label>
                  <div className="grid grid-cols-2 gap-2 border rounded-md p-2 max-h-24 overflow-y-auto">
                    {allCategories.map(category => (
                      <div key={category} className="flex items-center">
                        <input 
                          type="checkbox"
                          id={`edit-category-${category}`}
                          className="mr-2"
                          checked={formData.category.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                        />
                        <label htmlFor={`edit-category-${category}`} className="text-sm">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Repeat form fields from Add dialog with edit- prefix for ids */}
              <div className="space-y-2">
                <label htmlFor="edit-contactName" className="text-sm font-medium">Contact Person</label>
                <Input
                  id="edit-contactName"
                  name="contactName"
                  placeholder="Full name"
                  value={formData.contactName}
                  onChange={handleFormChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-email" className="text-sm font-medium">Email</label>
                  <Input
                    id="edit-email"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-phone" className="text-sm font-medium">Phone</label>
                  <Input
                    id="edit-phone"
                    name="phone"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-address" className="text-sm font-medium">Address</label>
                <Input
                  id="edit-address"
                  name="address"
                  placeholder="Street address, city, state, zip"
                  value={formData.address}
                  onChange={handleFormChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-priceCompetitiveness" className="text-sm font-medium">Price Competitiveness</label>
                  <Select 
                    value={formData.priceCompetitiveness} 
                    onValueChange={(value) => handleSelectChange("priceCompetitiveness", value as "High" | "Medium" | "Low")}
                  >
                    <SelectTrigger id="edit-priceCompetitiveness">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-leadTime" className="text-sm font-medium">Lead Time (days)</label>
                  <Input
                    id="edit-leadTime"
                    name="leadTime"
                    type="number"
                    placeholder="3"
                    min="1"
                    value={formData.leadTime}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-contractEndDate" className="text-sm font-medium">Contract End Date</label>
                <Input
                  id="edit-contractEndDate"
                  name="contractEndDate"
                  type="date"
                  value={formData.contractEndDate}
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setSelectedSupplier(null);
                  resetFormData();
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleEditSupplier}>Update</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Supplier Details Dialog */}
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Supplier Details</DialogTitle>
              <DialogDescription>
                Detailed information about the selected supplier.
              </DialogDescription>
            </DialogHeader>
            {selectedSupplier && (
              <div className="py-4">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold">{selectedSupplier.name}</h2>
                    <p className="text-muted-foreground">{selectedSupplier.id}</p>
                  </div>
                  {getStatusBadge(selectedSupplier.status)}
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{selectedSupplier.contactName}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{selectedSupplier.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{selectedSupplier.phone}</span>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                        <span>{selectedSupplier.address}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Supplier Details</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        <span>Lead Time: {selectedSupplier.leadTime} days</span>
                      </div>
                      <div className="flex items-center">
                        <ClipboardList className="h-4 w-4 mr-2 text-gray-400" />
                        <span>Total Orders: {selectedSupplier.totalOrders}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span>Last Order: {formatDate(selectedSupplier.lastOrder)}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span>Contract Ends: {formatDate(selectedSupplier.contractEndDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSupplier.category.map(cat => (
                      <Badge key={cat} variant="secondary">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-sm font-medium mb-4">Performance Metrics</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Rating</span>
                          <span className="text-sm font-medium">{selectedSupplier.rating.toFixed(1)}/5.0</span>
                        </div>
                        <div className="flex items-center">
                          {renderStarRating(selectedSupplier.rating)}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Quality Score</span>
                          <span className="text-sm font-medium">{selectedSupplier.qualityScore}%</span>
                        </div>
                        <Progress 
                          value={selectedSupplier.qualityScore} 
                          className="h-2" 
                          indicatorClassName={
                            selectedSupplier.qualityScore >= 90 ? "bg-green-500" :
                            selectedSupplier.qualityScore >= 80 ? "bg-amber-500" :
                            selectedSupplier.qualityScore >= 70 ? "bg-orange-500" : "bg-red-500"
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">On-Time Delivery</span>
                          <span className="text-sm font-medium">{selectedSupplier.onTimeDelivery}%</span>
                        </div>
                        <Progress 
                          value={selectedSupplier.onTimeDelivery} 
                          className="h-2" 
                          indicatorClassName={
                            selectedSupplier.onTimeDelivery >= 95 ? "bg-green-500" :
                            selectedSupplier.onTimeDelivery >= 90 ? "bg-green-400" :
                            selectedSupplier.onTimeDelivery >= 85 ? "bg-amber-500" : "bg-red-500"
                          }
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="text-sm">Response Time</span>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-blue-500" />
                          <span>{selectedSupplier.responseTime}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <span className="text-sm">Delivery Performance</span>
                        <div>
                          {getDeliveryPerformanceBadge(selectedSupplier.deliveryPerformance)}
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <span className="text-sm">Price Competitiveness</span>
                        <div>
                          {getPriceCompetitivenessBadge(selectedSupplier.priceCompetitiveness)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsDetailsDialogOpen(false);
                  setSelectedSupplier(null);
                }}
              >
                Close
              </Button>
              {selectedSupplier && (
                <Button onClick={() => {
                  setIsDetailsDialogOpen(false);
                  openEditDialog(selectedSupplier);
                }}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}

// Helper function to calculate average response time
function calculateAverageResponseTime(suppliers: Supplier[]): string {
  const activeSuppliers = suppliers.filter(s => s.status === "Active");
  if (activeSuppliers.length === 0) return "N/A";
  
  const responseTimeInHours = activeSuppliers.map(s => {
    const timeStr = s.responseTime;
    return parseInt(timeStr.replace('h', ''));
  });
  
  const avgHours = responseTimeInHours.reduce((sum, hours) => sum + hours, 0) / responseTimeInHours.length;
  return `${Math.round(avgHours)}h`;
}

// Helper function to calculate average on-time delivery
function calculateAverageOnTimeDelivery(suppliers: Supplier[]): string {
  const activeSuppliers = suppliers.filter(s => s.status === "Active");
  if (activeSuppliers.length === 0) return "N/A";
  
  const avgOTD = activeSuppliers.reduce((sum, s) => sum + s.onTimeDelivery, 0) / activeSuppliers.length;
  return avgOTD.toFixed(1);
}
