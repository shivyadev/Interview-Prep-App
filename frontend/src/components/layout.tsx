import { Routes, Route } from "react-router";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider } from "./ui/sidebar";
import Dashboard from "./dashboard";
import Problems from "./problems";
import Applications from "./applications";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </SidebarProvider>
  );
}
