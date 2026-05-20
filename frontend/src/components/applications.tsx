import { useApplications } from "@/hooks/useApplications";
import { ApplicationsTable } from "./applications-table";
import { Header } from "./header";
import Loader from "./loader";

export default function Applications() {
  const { isLoading } = useApplications();

  return (
    <div className="flex-1 overflow-auto bg-background">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col min-h-screen">
          <Header page={"applications"} />
          <div className="flex-1 p-4 lg:p-6 space-y-6">
            <ApplicationsTable />
          </div>
        </div>
      )}
    </div>
  );
}
