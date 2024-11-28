"use client"

import * as React from "react"
import {
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
} from "lucide-react"
import { IoCartOutline } from "react-icons/io5";
import { FaUsers, FaChartPie } from "react-icons/fa";
import { GiExpense } from "react-icons/gi";
import { NavMain } from "@/app/components/nav-main"
import { NavUser } from "@/app/components/nav-user"
import { TeamSwitcher } from "@/app/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "./ui/sidebar"
import { usePathname } from "next/navigation";

// This is sample data.

export function AppSidebar({ ...props }) {
  const path = usePathname()
  const data = {
    user: {
      name: props.user.name? props.user.name : '',
      role:  props.user.role,
      id_number: props.user.id_number? props.user.id_number : '',
      avatar: props.user.imageUrl? props.user.imageUrl : props.user.gender === 'male'? '/male-avatar.png' : '/female-avatar.png' ,
    },
    teams: [
      {
        name: "Demprints",
        logo: GalleryVerticalEnd,
        plan: "Ads and Copy Services",
      },
    ],
    navMain: [
      {
        title: "Overview",
        url: "",
        icon: FaChartPie,
        isActive: path === '/admin'? true : false,
      },
      {
        title: "Sales",
        url: "sales",
        icon: IoCartOutline,
        isActive: path === '/admin/sales'? true : false
      },
      {
        title: "Expenses",
        url: "expenses",
        icon: GiExpense,
        isActive: path === '/admin/expenses'? true : false
      },
      {
        title: "Accounts",
        url: "employee-accounts",
        icon: FaUsers,
        isActive: path === '/admin/employee-accounts'? true : false
      },
      {
        title: "Settings",
        url: "settings",
        icon: Settings2,
        isActive: path === '/admin/settings'? true : false
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
      },
    ],
  }
  return (
    <Sidebar collapsible="icon" {...props} className="bg-blue-900 dark:bg-blue-950">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
