import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Plus, Briefcase } from "lucide-react";

interface HeaderProps {
  page: "dashboard" | "problems" | "applications";
}

export function Header({ page }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 lg:px-6">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
      <Separator orientation="vertical" className="h-auto" />

      <div className="flex-1">
        <h1 className="text-lg font-semibold text-foreground">
          {page[0].toUpperCase() + page.slice(1)}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-muted-foreground hover:text-foreground"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuItem>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">
                  New achievement unlocked!
                </span>
                <span className="text-xs text-muted-foreground">
                  You solved 100 problems
                </span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Interview reminder</span>
                <span className="text-xs text-muted-foreground">
                  Tech Corp in 2 days
                </span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {(page == "dashboard" || page == "applications") && (
          <Button variant="outline" size="sm" className="gap-2">
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">Track Application</span>
          </Button>
        )}

        {(page == "dashboard" || page == "problems") && (
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Problem</span>
          </Button>
        )}
      </div>
    </header>
  );
}
