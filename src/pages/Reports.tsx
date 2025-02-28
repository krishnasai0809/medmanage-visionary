
import { AppLayout } from "@/components/layout/AppLayout";

export default function Reports() {
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Generate and view detailed reports about your inventory.
          </p>
        </div>

        <div className="p-8 text-center">
          <h2 className="text-lg font-medium mb-2">Reports Page</h2>
          <p className="text-muted-foreground">This page is under development.</p>
        </div>
      </div>
    </AppLayout>
  );
}
