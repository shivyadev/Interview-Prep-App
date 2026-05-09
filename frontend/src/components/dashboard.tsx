import { DashboardHeader } from "./dashboard-header";
import StatCards from "./stat-cards";

export default function Dashboard() {
  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="flex flex-col min-h-screen">
        <DashboardHeader />

        <div className="flex-1 p-4 lg:p-6 space-y-6">
          <StatCards />
        </div>
      </div>
    </div>
  );
}
