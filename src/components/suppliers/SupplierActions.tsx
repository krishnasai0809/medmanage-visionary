
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export function SupplierActions() {
  const { toast } = useToast();
  const [reportType, setReportType] = useState("performance");
  const [fileFormat, setFileFormat] = useState("pdf");
  const [dateRange, setDateRange] = useState<"7" | "30" | "90" | "custom">("30");
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSyncInventory = () => {
    // Simulate syncing with inventory
    toast({
      title: "Synchronizing data",
      description: "Updating supplier data from inventory...",
    });
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Sync completed",
        description: "Supplier data has been synchronized with inventory.",
      });
    }, 1500);
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);

    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      
      toast({
        title: "Report generated",
        description: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report has been generated in ${fileFormat.toUpperCase()} format.`,
      });
    }, 2000);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button 
        variant="outline" 
        className="bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200 hover:border-purple-300 dark:bg-purple-900/20 dark:hover:bg-purple-900/40 dark:text-purple-400 dark:border-purple-800"
        size="sm"
        onClick={handleSyncInventory}
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Sync Inventory Data
      </Button>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 hover:border-blue-300 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 dark:text-blue-400 dark:border-blue-800"
            size="sm"
          >
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Generate Supplier Report</DialogTitle>
            <DialogDescription>
              Create a detailed report of supplier performance and inventory data.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="report-type" className="col-span-1">
                Report Type
              </Label>
              <Select
                value={reportType}
                onValueChange={setReportType}
                id="report-type"
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="performance">Performance Report</SelectItem>
                  <SelectItem value="inventory">Inventory by Supplier</SelectItem>
                  <SelectItem value="delivery">Delivery Analysis</SelectItem>
                  <SelectItem value="quality">Quality Control</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="file-format" className="col-span-1">
                File Format
              </Label>
              <Select
                value={fileFormat}
                onValueChange={setFileFormat}
                id="file-format"
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select file format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="csv">CSV File</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="date-range" className="col-span-1">
                Date Range
              </Label>
              <Select
                value={dateRange}
                onValueChange={(value: "7" | "30" | "90" | "custom") => setDateRange(value)}
                id="date-range"
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {dateRange === "custom" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="col-span-1">Custom Range</Label>
                <div className="col-span-3 flex items-center gap-2">
                  <div className="grid gap-2">
                    <Label htmlFor="from-date" className="text-xs">From</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="from-date"
                          variant={"outline"}
                          size="sm"
                          className={cn(
                            "w-[130px] justify-start text-left font-normal",
                            !fromDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {fromDate ? format(fromDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={fromDate}
                          onSelect={setFromDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="to-date" className="text-xs">To</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="to-date"
                          variant={"outline"}
                          size="sm"
                          className={cn(
                            "w-[130px] justify-start text-left font-normal",
                            !toDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {toDate ? format(toDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={toDate}
                          onSelect={setToDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleGenerateReport} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Generating...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Generate Report
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
