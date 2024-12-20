"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Settings,
  Share2,
  UserCircle,
} from "lucide-react";

// Menu items.

export function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();
  return (
    <SidebarProvider open={open}>
      <ShadcnSidebar>
        <SidebarHeader>
          <h2 className="p-4 text-lg font-semibold">Dashboard</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  href="/dashboard"
                  className={pathname === "/dashboard" ? "text-primary" : ""}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard Home
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  href="/dashboard/users"
                  className={
                    pathname === "/dashboard/users" ? "text-primary" : ""
                  }
                >
                  <Users className="mr-2 h-4 w-4" />
                  Users
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  href="/dashboard/admin"
                  className={
                    pathname === "/dashboard/admin" ? "text-primary" : ""
                  }
                >
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Admin
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  href="/dashboard/settings"
                  className={
                    pathname === "/dashboard/settings" ? "text-primary" : ""
                  }
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  href="/dashboard/referral"
                  className={
                    pathname === "/dashboard/referral" ? "text-primary" : ""
                  }
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Referral
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  href="/dashboard/profile"
                  className={
                    pathname === "/dashboard/profile" ? "text-primary" : ""
                  }
                >
                  <UserCircle className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <p className="p-4 text-sm text-gray-500">© 2023 Your Company</p>
        </SidebarFooter>
      </ShadcnSidebar>
    </SidebarProvider>
  );
}
