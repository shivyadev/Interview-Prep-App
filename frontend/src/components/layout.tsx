import { Routes, Route } from "react-router";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider } from "./ui/sidebar";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Routes>
        <Route path="/" element={<>Dashboard</>} />
        <Route path="/home" element={<>Home</>} />
      </Routes>
    </SidebarProvider>
  );
}
