
import { AppLayout } from "@/components/layout/AppLayout";

export default function Inventory() {
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground">
            Manage and track your hospital inventory items.
          </p>
        </div>
        
        <div className="p-8 text-center">
          <h2 className="text-lg font-medium mb-2">Inventory Management Page</h2>
          <p className="text-muted-foreground">This page is under development.</p>
        </div>
      </div>
    </AppLayout>
  );
}
