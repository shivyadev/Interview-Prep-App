import {
  LayoutDashboard,
  Code2,
  BookOpen,
  BarChart3,
  // Settings,
  Calendar,
  // Trophy,
  // Target,
  // Brain,
  // ChevronDown,
  // Search,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
const navItems = [
  { icon: LayoutDashboard, path: "/", label: "Dashboard", active: true },
  { icon: Code2, path: "/home", label: "Problems", active: false },
  { icon: BookOpen, path: "/zero", label: "Study Plan", active: false },
  { icon: BarChart3, path: "/zero", label: "Analytics", active: false },
  { icon: Calendar, path: "/zero", label: "Schedule", active: false },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Code2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-sidebar-foreground">
              InterviewPrep
            </span>
            <span className="text-xs text-muted-foreground">
              Track your progress
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground px-4">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <NavLink to={item.path}>
                    {({ isActive }) => (
                      <SidebarMenuButton
                        isActive={isActive}
                        className="mx-2 rounded-lg"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
