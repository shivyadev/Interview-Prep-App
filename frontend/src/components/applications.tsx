import { ApplicationsTable } from "./applications-table";
import { Header } from "./header";

export default function Applications() {
  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="flex flex-col min-h-screen">
        <Header page={"applications"} />
        <div className="flex-1 p-4 lg:p-6 space-y-6">
          <ApplicationsTable />
        </div>
      </div>
    </div>
  );
}
