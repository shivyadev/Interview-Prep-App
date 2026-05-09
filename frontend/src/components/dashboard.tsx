import { DashboardHeader } from "./dashboard-header";

export default function Dashboard() {
  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="flex flex-col min-h-screen">
        <DashboardHeader />
      </div>
    </div>
  );
}
