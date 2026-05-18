import { useProblems } from "@/hooks/useProblems";
import { Header } from "./header";
import Loader from "./loader";
import { ProblemsTable } from "./problems-table";

export default function Problems() {
  const { isLoading } = useProblems();

  return (
    <div className="flex-1 overflow-auto bg-background">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col min-h-screen">
          <Header page={"problems"} />
          <div className="flex-1 p-4 lg:p-6 space-y-6">
            <ProblemsTable page={"problems"} />
          </div>
        </div>
      )}
    </div>
  );
}
