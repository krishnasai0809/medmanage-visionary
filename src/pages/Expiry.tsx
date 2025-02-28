
import { AppLayout } from "@/components/layout/AppLayout";

export default function Expiry() {
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Expiry Tracking</h1>
          <p className="text-muted-foreground">
            Monitor and manage items approaching their expiration date.
          </p>
        </div>

        <div className="p-8 text-center">
          <h2 className="text-lg font-medium mb-2">Expiry Tracking Page</h2>
          <p className="text-muted-foreground">This page is under development.</p>
        </div>
      </div>
    </AppLayout>
  );
}
