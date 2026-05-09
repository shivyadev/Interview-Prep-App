import { ActivityChart, ProgressChart } from "./charts";
import { DashboardHeader } from "./dashboard-header";
import StatCards from "./stat-cards";

export default function Dashboard() {
  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="flex flex-col min-h-screen">
        <DashboardHeader />

        <div className="flex-1 p-4 lg:p-6 space-y-6">
          <StatCards />

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <ActivityChart />
                <ProgressChart />
              </div>
            </div>
            <div className="space-y-6">SideBox</div>
          </div>
        </div>
      </div>
    </div>
  );
}
