import { useProblems } from "@/hooks/useProblems";
import { ActivityChart, ProgressChart } from "./charts";
import { Header } from "./header";
import { ProblemsTable } from "./problems-table";
import { StudyPlanCard, UpcomingInterviewsCard } from "./sidebar-cards";
import StatCards from "./stat-cards";
import { useApplications } from "@/hooks/useApplications";
import Loader from "./loader";

export default function Dashboard() {
  const { isLoading: isLoadingProblems, problems } = useProblems();
  const { isLoading: isLoadingApplication } = useApplications();

  return (
    <div className="flex-1 overflow-auto bg-background">
      {isLoadingApplication || isLoadingProblems ? (
        <Loader />
      ) : (
        <div className="flex flex-col min-h-screen">
          <Header page={"dashboard"} />

          <div className="flex-1 p-4 lg:p-6 space-y-6">
            <StatCards />

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <ActivityChart />
                  <ProgressChart />
                </div>
                <ProblemsTable page="dashboard" />
              </div>
              <div className="space-y-6">
                <UpcomingInterviewsCard />
                <StudyPlanCard />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
