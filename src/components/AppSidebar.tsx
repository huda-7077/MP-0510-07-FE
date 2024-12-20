"use client";

import {
  BookDown,
  Calendar,
  Command,
  CreditCard,
  LayoutDashboard,
  LifeBuoy,
  Send,
  User,
} from "lucide-react";
import * as React from "react";

import { NavSecondary } from "@/components/NavSecondary";
import { NavProfile } from "@/components/NavProfile";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavAdmin } from "./NavAdmin";
import { NavOrganizer } from "./NavOrganizer";
import { ToggleDarkMode } from "./ToggleDarkMode";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navAdmin: [
    {
      title: "Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
      isActive: true,
      items: [],
    },
    {
      title: "Users",
      url: "/dashboard/admin/users",
      icon: User,
      items: [
        {
          title: "Organizer Requests",
          url: "#",
        },
        {
          title: "Change Points",
          url: "#",
        },
        {
          title: "Change Coupons",
          url: "#",
        },
      ],
    },
  ],
  navOrganizer: [
    {
      title: "Dashboard",
      url: "/dashboard/organizer",
      icon: LayoutDashboard,
      isActive: true,
      items: [],
    },
    {
      title: "Events",
      url: "/dashboard/organizer/events",
      icon: Calendar,
      items: [
        {
          title: "Create Event",
          url: "#",
        },
        {
          title: "Create Vouchers",
          url: "#",
        },
      ],
    },
    {
      title: "Payments",
      url: "/dashboard/organizer/payments",
      icon: CreditCard,
      items: [],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Suket Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
                <ToggleDarkMode />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavAdmin items={data.navAdmin} />
        <NavOrganizer items={data.navOrganizer} />

        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavProfile user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
