
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar as CalendarIcon, Filter, Search, Bell, FileText, AlertTriangle, Check, X, Edit, Trash2, ChevronDown, ArrowUpDown, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";

// Define types for the medicine items and alerts
interface MedicineItem {
  id: string;
  name: string;
  category: string;
  batchNumber: string;
  expiryDate: string;
  quantity: number;
  supplier: string;
  location: string;
  alertDays: number;
  alertEnabled: boolean;
  extendedDate?: string;
  notes?: string;
}

interface AlertSettings {
  id: string;
  medicineId: string;
  medicineName: string;
  daysBeforeExpiry: number;
  enabled: boolean;
  notificationType: "email" | "app" | "both";
  createdAt: string;
}

// Mock data for medicines with expiry dates
const mockMedicines: MedicineItem[] = [
  {
    id: "MED001",
    name: "Amoxicillin 500mg",
    category: "Antibiotics",
    batchNumber: "B9876",
    expiryDate: "2024-06-15",
    quantity: 240,
    supplier: "MediTech Pharmaceuticals",
    location: "Pharmacy Storage A",
    alertDays: 30,
    alertEnabled: true,
  },
  {
    id: "MED002",
    name: "Ibuprofen 200mg",
    category: "Pain Relief",
    batchNumber: "B1234",
    expiryDate: "2024-07-22",
    quantity: 180,
    supplier: "Global Health Supplies",
    location: "Pharmacy Storage B",
    alertDays: 45,
    alertEnabled: true,
  },
  {
    id: "MED003",
    name: "Ceftriaxone 1g",
    category: "Antibiotics",
    batchNumber: "B5678",
    expiryDate: "2024-04-10", // Already expired
    quantity: 50,
    supplier: "PharmaPlus Inc.",
    location: "Emergency Unit Cabinet",
    alertDays: 30,
    alertEnabled: false,
    extendedDate: "2024-05-10", // Extended by one month
    notes: "Quality check performed, safe to use for another month",
  },
  {
    id: "MED004",
    name: "Omeprazole 20mg",
    category: "Gastrointestinal",
    batchNumber: "B7890",
    expiryDate: "2024-05-05", // Soon to expire
    quantity: 120,
    supplier: "Healthcare Products Co.",
    location: "Pharmacy Storage A",
    alertDays: 20,
    alertEnabled: true,
  },
  {
    id: "MED005",
    name: "Metformin 500mg",
    category: "Diabetes",
    batchNumber: "B2468",
    expiryDate: "2025-02-15",
    quantity: 300,
    supplier: "MediSource International",
    location: "Chronic Care Cabinet",
    alertDays: 60,
    alertEnabled: true,
  },
  {
    id: "MED006",
    name: "Lipitor 40mg",
    category: "Cardiovascular",
    batchNumber: "B1357",
    expiryDate: "2025-01-10",
    quantity: 90,
    supplier: "Global Health Supplies",
    location: "Pharmacy Storage B",
    alertDays: 45,
    alertEnabled: true,
  },
  {
    id: "MED007",
    name: "Albuterol Inhaler",
    category: "Respiratory",
    batchNumber: "B3579",
    expiryDate: "2024-08-30",
    quantity: 40,
    supplier: "Wellness Medical Supplies",
    location: "Emergency Unit Cabinet",
    alertDays: 30,
    alertEnabled: true,
  },
  {
    id: "MED008",
    name: "Cephalexin 250mg",
    category: "Antibiotics",
    batchNumber: "B4680",
    expiryDate: "2024-05-18", // Soon to expire
    quantity: 150,
    supplier: "MediTech Pharmaceuticals",
    location: "Pharmacy Storage A",
    alertDays: 30,
    alertEnabled: true,
  },
  {
    id: "MED009",
    name: "Lorazepam 1mg",
    category: "Psychiatric",
    batchNumber: "B7913",
    expiryDate: "2024-12-05",
    quantity: 60,
    supplier: "PharmaPlus Inc.",
    location: "Secure Storage",
    alertDays: 60,
    alertEnabled: true,
  },
  {
    id: "MED010",
    name: "Insulin Glargine",
    category: "Diabetes",
    batchNumber: "B8024",
    expiryDate: "2024-06-02",
    quantity: 25,
    supplier: "MediSource International",
    location: "Refrigerated Storage",
    alertDays: 30,
    alertEnabled: true,
  }
];

// Mock data for alert settings
const mockAlerts: AlertSettings[] = [
  {
    id: "ALERT001",
    medicineId: "MED001",
    medicineName: "Amoxicillin 500mg",
    daysBeforeExpiry: 30,
    enabled: true,
    notificationType: "both",
    createdAt: "2023-12-15",
  },
  {
    id: "ALERT002",
    medicineId: "MED002",
    medicineName: "Ibuprofen 200mg",
    daysBeforeExpiry: 45,
    enabled: true,
    notificationType: "app",
    createdAt: "2024-01-22",
  },
  {
    id: "ALERT004",
    medicineId: "MED004",
    medicineName: "Omeprazole 20mg",
    daysBeforeExpiry: 20,
    enabled: true,
    notificationType: "email",
    createdAt: "2024-01-05",
  },
];

export default function Expiry() {
  const { toast } = useToast();
  const [medicines, setMedicines] = useState<MedicineItem[]>(mockMedicines);
  const [alerts, setAlerts] = useState<AlertSettings[]>(mockAlerts);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortField, setSortField] = useState<keyof MedicineItem>("expiryDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [activeTab, setActiveTab] = useState("all");
  
  // States for dialogs
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isExtendDialogOpen, setIsExtendDialogOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<MedicineItem | null>(null);
  const [newExpiryDate, setNewExpiryDate] = useState<Date | undefined>(undefined);
  const [extendedExpiryDate, setExtendedExpiryDate] = useState<Date | undefined>(undefined);
  const [extendNotes, setExtendNotes] = useState("");
  const [alertDays, setAlertDays] = useState(30);
  const [notificationType, setNotificationType] = useState<"email" | "app" | "both">("both");

  // Simulate data loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Get categories from medicines
  const categories = Array.from(new Set(medicines.map(med => med.category)));

  // Get expiry status for a medicine
  const getExpiryStatus = (expiryDate: string, extendedDate?: string): "expired" | "expiring-soon" | "ok" => {
    const today = new Date();
    const dateToCheck = extendedDate || expiryDate;
    const expiry = new Date(dateToCheck);
    
    // Check if already expired
    if (expiry < today) {
      return "expired";
    }
    
    // Check if expiring soon (within 30 days)
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    
    if (expiry <= thirtyDaysFromNow) {
      return "expiring-soon";
    }
    
    return "ok";
  };

  // Get badge for expiry status
  const getExpiryBadge = (medicine: MedicineItem) => {
    const status = getExpiryStatus(medicine.expiryDate, medicine.extendedDate);
    
    switch (status) {
      case "expired":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
            Expired
          </Badge>
        );
      case "expiring-soon":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800">
            Expiring Soon
          </Badge>
        );
      case "ok":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
            Good
          </Badge>
        );
      default:
        return null;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM dd, yyyy");
  };

  // Calculate days until expiry
  const getDaysUntilExpiry = (expiryDate: string, extendedDate?: string) => {
    const today = new Date();
    const dateToCheck = extendedDate || expiryDate;
    const expiry = new Date(dateToCheck);
    
    const differenceInTime = expiry.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    
    return differenceInDays;
  };

  // Handle sorting
  const handleSort = (field: keyof MedicineItem) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter medicines based on search, category, status, and tab
  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = 
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || medicine.category === selectedCategory;
    
    const status = getExpiryStatus(medicine.expiryDate, medicine.extendedDate);
    const matchesStatus = selectedStatus === "all" || 
      (selectedStatus === "expired" && status === "expired") ||
      (selectedStatus === "expiring-soon" && status === "expiring-soon") ||
      (selectedStatus === "ok" && status === "ok");
    
    const matchesTab = activeTab === "all" || 
      (activeTab === "expired" && status === "expired") ||
      (activeTab === "expiring-soon" && status === "expiring-soon") ||
      (activeTab === "with-alerts" && medicine.alertEnabled);
    
    return matchesSearch && matchesCategory && matchesStatus && matchesTab;
  });

  // Sort filtered medicines
  const sortedMedicines = [...filteredMedicines].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];
    
    // Special handling for dates
    if (sortField === "expiryDate") {
      // Use extended date if available
      aValue = a.extendedDate || a.expiryDate;
      bValue = b.extendedDate || b.expiryDate;
      
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }
    
    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Get counts for expired and expiring soon medicines
  const expiredCount = medicines.filter(med => 
    getExpiryStatus(med.expiryDate, med.extendedDate) === "expired"
  ).length;
  
  const expiringSoonCount = medicines.filter(med => 
    getExpiryStatus(med.expiryDate, med.extendedDate) === "expiring-soon"
  ).length;
  
  const alertsEnabledCount = medicines.filter(med => med.alertEnabled).length;

  // Handle alert setting
  const handleSetAlert = () => {
    if (!selectedMedicine) return;
    
    // Check if alert already exists
    const existingAlertIndex = alerts.findIndex(a => a.medicineId === selectedMedicine.id);
    
    if (existingAlertIndex >= 0) {
      // Update existing alert
      const updatedAlerts = [...alerts];
      updatedAlerts[existingAlertIndex] = {
        ...updatedAlerts[existingAlertIndex],
        daysBeforeExpiry: alertDays,
        notificationType: notificationType,
        enabled: true,
      };
      setAlerts(updatedAlerts);
    } else {
      // Create new alert
      const newAlert: AlertSettings = {
        id: `ALERT${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`,
        medicineId: selectedMedicine.id,
        medicineName: selectedMedicine.name,
        daysBeforeExpiry: alertDays,
        enabled: true,
        notificationType: notificationType,
        createdAt: new Date().toISOString(),
      };
      setAlerts([...alerts, newAlert]);
    }
    
    // Update medicine alert settings
    const updatedMedicines = medicines.map(med => {
      if (med.id === selectedMedicine.id) {
        return {
          ...med,
          alertDays: alertDays,
          alertEnabled: true,
        };
      }
      return med;
    });
    
    setMedicines(updatedMedicines);
    setIsAlertDialogOpen(false);
    
    toast({
      title: "Alert Set",
      description: `Alert has been set for ${selectedMedicine.name}. You will be notified ${alertDays} days before expiry.`,
    });
  };

  // Handle update expiry date
  const handleUpdateExpiryDate = () => {
    if (!selectedMedicine || !newExpiryDate) return;
    
    const updatedMedicines = medicines.map(med => {
      if (med.id === selectedMedicine.id) {
        return {
          ...med,
          expiryDate: format(newExpiryDate, "yyyy-MM-dd"),
        };
      }
      return med;
    });
    
    setMedicines(updatedMedicines);
    setIsEditDialogOpen(false);
    setNewExpiryDate(undefined);
    
    toast({
      title: "Expiry Date Updated",
      description: `Expiry date for ${selectedMedicine.name} has been updated to ${format(newExpiryDate, "MMM dd, yyyy")}.`,
    });
  };

  // Handle extend shelf life
  const handleExtendShelfLife = () => {
    if (!selectedMedicine || !extendedExpiryDate) return;
    
    const updatedMedicines = medicines.map(med => {
      if (med.id === selectedMedicine.id) {
        return {
          ...med,
          extendedDate: format(extendedExpiryDate, "yyyy-MM-dd"),
          notes: extendNotes,
        };
      }
      return med;
    });
    
    setMedicines(updatedMedicines);
    setIsExtendDialogOpen(false);
    setExtendedExpiryDate(undefined);
    setExtendNotes("");
    
    toast({
      title: "Shelf Life Extended",
      description: `Shelf life for ${selectedMedicine.name} has been extended to ${format(extendedExpiryDate, "MMM dd, yyyy")}.`,
    });
  };

  // Handle toggle alert
  const handleToggleAlert = (medicine: MedicineItem) => {
    const updatedMedicines = medicines.map(med => {
      if (med.id === medicine.id) {
        return {
          ...med,
          alertEnabled: !med.alertEnabled,
        };
      }
      return med;
    });
    
    setMedicines(updatedMedicines);
    
    // Also update the alert in alerts list
    const alertIndex = alerts.findIndex(a => a.medicineId === medicine.id);
    if (alertIndex >= 0) {
      const updatedAlerts = [...alerts];
      updatedAlerts[alertIndex] = {
        ...updatedAlerts[alertIndex],
        enabled: !medicine.alertEnabled,
      };
      setAlerts(updatedAlerts);
    }
    
    toast({
      title: medicine.alertEnabled ? "Alert Disabled" : "Alert Enabled",
      description: `Expiry alert for ${medicine.name} has been ${medicine.alertEnabled ? "disabled" : "enabled"}.`,
    });
  };

  // Handle remove extended date
  const handleRemoveExtendedDate = (medicine: MedicineItem) => {
    const updatedMedicines = medicines.map(med => {
      if (med.id === medicine.id) {
        const { extendedDate, notes, ...rest } = med;
        return rest;
      }
      return med;
    });
    
    setMedicines(updatedMedicines);
    
    toast({
      title: "Extension Removed",
      description: `Extended expiry date for ${medicine.name} has been removed.`,
      variant: "destructive",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Expiry Tracking</h1>
            <p className="text-muted-foreground">
              Monitor and manage items approaching their expiration date.
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Expired Items</p>
                  <h3 className="text-2xl font-bold mt-1">{expiredCount}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => setActiveTab("expired")}
                >
                  View Expired Items
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Expiring Soon</p>
                  <h3 className="text-2xl font-bold mt-1">{expiringSoonCount}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
                  <CalendarDays className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => setActiveTab("expiring-soon")}
                >
                  View Items Expiring Soon
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
                  <h3 className="text-2xl font-bold mt-1">{alertsEnabledCount}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <Bell className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => setActiveTab("with-alerts")}
                >
                  View Items With Alerts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Expiry Management</CardTitle>
            <CardDescription>Track and manage medicine expiry dates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search medicines..."
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
                    {categories.map((category) => (
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
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>Status</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="expiring-soon">Expiring Soon</SelectItem>
                    <SelectItem value="ok">Good</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="all" className="flex-1">All Items</TabsTrigger>
                <TabsTrigger value="expired" className="flex-1">Expired</TabsTrigger>
                <TabsTrigger value="expiring-soon" className="flex-1">Expiring Soon</TabsTrigger>
                <TabsTrigger value="with-alerts" className="flex-1">With Alerts</TabsTrigger>
              </TabsList>
            </Tabs>

            {isLoading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : sortedMedicines.length === 0 ? (
              <div className="text-center py-8 border rounded-md">
                <CalendarIcon className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium mb-1">No medicines found</h3>
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
                          Medicine
                          <ArrowUpDown size={14} className="ml-1" />
                        </button>
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        <button 
                          className="flex items-center"
                          onClick={() => handleSort("expiryDate")}
                        >
                          Expiry Date
                          <ArrowUpDown size={14} className="ml-1" />
                        </button>
                      </th>
                      <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Days Remaining
                      </th>
                      <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Alert
                      </th>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedMedicines.map((medicine) => {
                      const daysRemaining = getDaysUntilExpiry(medicine.expiryDate, medicine.extendedDate);
                      const expiryStatus = getExpiryStatus(medicine.expiryDate, medicine.extendedDate);
                      
                      return (
                        <tr 
                          key={medicine.id}
                          className={cn(
                            "border-b hover:bg-gray-50 dark:hover:bg-gray-800",
                            expiryStatus === "expired" ? "bg-red-50/30 dark:bg-red-950/10" : 
                            expiryStatus === "expiring-soon" ? "bg-amber-50/30 dark:bg-amber-950/10" : ""
                          )}
                        >
                          <td className="py-3 px-4">
                            <div className="flex flex-col">
                              <span className="font-medium">{medicine.name}</span>
                              <div className="flex items-center mt-1">
                                <span className="text-xs text-gray-500 dark:text-gray-400 mr-3">
                                  Batch: {medicine.batchNumber}
                                </span>
                                <Badge variant="secondary" className="text-xs">
                                  {medicine.category}
                                </Badge>
                              </div>
                              {medicine.extendedDate && (
                                <div className="mt-1 text-xs italic text-gray-500 dark:text-gray-400">
                                  Extended from {formatDate(medicine.expiryDate)}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium">
                              {medicine.extendedDate 
                                ? formatDate(medicine.extendedDate)
                                : formatDate(medicine.expiryDate)
                              }
                            </div>
                            {medicine.notes && (
                              <div className="mt-1 text-xs italic text-gray-500 dark:text-gray-400 max-w-[220px] truncate">
                                Note: {medicine.notes}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className={cn(
                              "font-medium",
                              daysRemaining < 0 ? "text-red-600 dark:text-red-400" :
                              daysRemaining <= 30 ? "text-amber-600 dark:text-amber-400" :
                              "text-green-600 dark:text-green-400"
                            )}>
                              {daysRemaining < 0 
                                ? `${Math.abs(daysRemaining)} days overdue` 
                                : `${daysRemaining} days`
                              }
                            </div>
                            {medicine.extendedDate && (
                              <div className="w-full mt-1">
                                <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                  <div 
                                    className={cn(
                                      "h-full",
                                      daysRemaining < 0 ? "bg-red-500" :
                                      daysRemaining <= 30 ? "bg-amber-500" :
                                      "bg-green-500"
                                    )}
                                    style={{ width: `${Math.min(100, Math.max(daysRemaining / 90 * 100, 0))}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {getExpiryBadge(medicine)}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center">
                              <Button
                                variant="ghost"
                                size="icon"
                                className={cn(
                                  medicine.alertEnabled
                                    ? "text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                                    : "text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                                )}
                                onClick={() => handleToggleAlert(medicine)}
                              >
                                <Bell className="h-4 w-4" />
                              </Button>
                              <span className="text-xs ml-1">
                                {medicine.alertEnabled
                                  ? `${medicine.alertDays} days`
                                  : "Off"}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedMedicine(medicine);
                                  setAlertDays(medicine.alertDays);
                                  setNotificationType(
                                    alerts.find(a => a.medicineId === medicine.id)?.notificationType || "both"
                                  );
                                  setIsAlertDialogOpen(true);
                                }}
                                title="Set Alert"
                              >
                                <Bell className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedMedicine(medicine);
                                  setNewExpiryDate(
                                    medicine.extendedDate
                                      ? new Date(medicine.extendedDate)
                                      : new Date(medicine.expiryDate)
                                  );
                                  setIsEditDialogOpen(true);
                                }}
                                title="Edit Expiry Date"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              {expiryStatus === "expired" && !medicine.extendedDate && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300"
                                  onClick={() => {
                                    setSelectedMedicine(medicine);
                                    // Default to extending by 30 days from original expiry
                                    const extendDate = new Date(medicine.expiryDate);
                                    extendDate.setDate(extendDate.getDate() + 30);
                                    setExtendedExpiryDate(extendDate);
                                    setIsExtendDialogOpen(true);
                                  }}
                                  title="Extend Shelf Life"
                                >
                                  <CalendarPlus className="h-4 w-4" />
                                </Button>
                              )}
                              {medicine.extendedDate && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                                  onClick={() => handleRemoveExtendedDate(medicine)}
                                  title="Remove Extension"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Set Alert Dialog */}
        <Dialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Set Expiry Alert</DialogTitle>
              <DialogDescription>
                Configure when you'd like to be notified before this medicine expires.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <h4 className="font-medium">{selectedMedicine?.name}</h4>
                <p className="text-sm text-muted-foreground">
                  Expires on {selectedMedicine?.extendedDate 
                    ? formatDate(selectedMedicine.extendedDate)
                    : selectedMedicine?.expiryDate
                      ? formatDate(selectedMedicine.expiryDate)
                      : 'N/A'
                  }
                </p>
              </div>
              <div className="space-y-2">
                <label htmlFor="alert-days" className="text-sm font-medium">
                  Alert me before expiry
                </label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="alert-days"
                    type="number"
                    value={alertDays}
                    onChange={(e) => setAlertDays(parseInt(e.target.value))}
                    min={1}
                    max={180}
                  />
                  <span>days</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Notification Type
                </label>
                <Select 
                  value={notificationType} 
                  onValueChange={(value: "email" | "app" | "both") => setNotificationType(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select notification type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email Only</SelectItem>
                    <SelectItem value="app">App Only</SelectItem>
                    <SelectItem value="both">Email & App</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsAlertDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSetAlert}>
                Save Alert
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Expiry Date Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update Expiry Date</DialogTitle>
              <DialogDescription>
                Change the expiry date for this medicine.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <h4 className="font-medium">{selectedMedicine?.name}</h4>
                <p className="text-sm text-muted-foreground">
                  Current expiry: {selectedMedicine?.extendedDate 
                    ? formatDate(selectedMedicine.extendedDate)
                    : selectedMedicine?.expiryDate
                      ? formatDate(selectedMedicine.expiryDate)
                      : 'N/A'
                  }
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  New Expiry Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !newExpiryDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newExpiryDate ? format(newExpiryDate, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newExpiryDate}
                      onSelect={setNewExpiryDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setNewExpiryDate(undefined);
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUpdateExpiryDate}
                disabled={!newExpiryDate}
              >
                Update Date
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Extend Shelf Life Dialog */}
        <Dialog open={isExtendDialogOpen} onOpenChange={setIsExtendDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Extend Shelf Life</DialogTitle>
              <DialogDescription>
                Extend the shelf life of expired medicine after quality check.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <h4 className="font-medium">{selectedMedicine?.name}</h4>
                <div className="flex items-center">
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    Expired on {selectedMedicine?.expiryDate
                      ? formatDate(selectedMedicine.expiryDate)
                      : 'N/A'
                    }
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Extended Expiry Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !extendedExpiryDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {extendedExpiryDate ? format(extendedExpiryDate, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={extendedExpiryDate}
                      onSelect={setExtendedExpiryDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <label htmlFor="extend-notes" className="text-sm font-medium">
                  Notes (Quality Check)
                </label>
                <Input
                  id="extend-notes"
                  placeholder="Enter quality check notes"
                  value={extendNotes}
                  onChange={(e) => setExtendNotes(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Include details of the quality check that justifies extending the shelf life.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsExtendDialogOpen(false);
                  setExtendedExpiryDate(undefined);
                  setExtendNotes("");
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleExtendShelfLife}
                disabled={!extendedExpiryDate || extendNotes.trim() === ""}
              >
                Extend Shelf Life
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}

// Missing component for the CalendarPlus icon (since it's not in lucide-react by default)
function CalendarPlus({ className, size = 24, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-calendar-plus", className)}
      {...props}
    >
      <path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="19" y1="16" x2="19" y2="22" />
      <line x1="16" y1="19" x2="22" y2="19" />
    </svg>
  );
}
