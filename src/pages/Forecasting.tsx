
import { AppLayout } from "@/components/layout/AppLayout";

export default function Forecasting() {
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Demand Forecasting</h1>
          <p className="text-muted-foreground">
            Predict future demand with our AI-powered forecasting system.
          </p>
        </div>

        <div className="p-8 text-center">
          <h2 className="text-lg font-medium mb-2">Forecasting Page</h2>
          <p className="text-muted-foreground">This page is under development.</p>
        </div>
      </div>
    </AppLayout>
  );
}
