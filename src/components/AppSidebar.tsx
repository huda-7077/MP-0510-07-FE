"use client";

import {
  Calendar,
  Command,
  CreditCard,
  Edit,
  LayoutDashboard,
  User,
} from "lucide-react";
import * as React from "react";

import { NavSecondary } from "@/components/NavSecondary";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import useGetProfile from "@/hooks/api/account/useGetProfile";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { NavAdmin } from "./NavAdmin";
import { NavOrganizer } from "./NavOrganizer";
import { NavProfile } from "./NavProfile";
import { ToggleDarkMode } from "./ToggleDarkMode";

const data = {
  navAdmin: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "User Lists",
      url: "/dashboard/user-lists",
      icon: User,
    },
    {
      title: "Change Rewards",
      url: "/dashboard/change-rewards",
      icon: Edit,
    },
  ],
  navOrganizer: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Events",
      url: "/dashboard/events",
      icon: Calendar,
    },

    {
      title: "Payments",
      url: "/dashboard/payments",
      icon: CreditCard,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const user = session?.user;
  const { data: profile } = useGetProfile();

  const profileData = {
    name: profile?.fullname || "",
    email: profile?.email || "",
    avatar: profile?.profilePicture || "",
  };

  return (
    <Sidebar variant="inset" {...props} className="border-r-sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center justify-between">
                <Link href="/" className="flex gap-2">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">StarTicket</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </Link>
                <div className="flex items-center">
                  <ToggleDarkMode />
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {!!user?.id && user.role === "ADMIN" && (
          <NavAdmin items={data.navAdmin} />
        )}
        {!!user?.id && user.role === "ORGANIZER" && (
          <NavOrganizer items={data.navOrganizer} />
        )}

        <NavSecondary className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavProfile user={profileData} />
      </SidebarFooter>
    </Sidebar>
  );
}
