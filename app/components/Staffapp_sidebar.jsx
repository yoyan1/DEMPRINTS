'use client';

import * as React from 'react';
import {
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
} from 'lucide-react';
// import { IoCartOutline } from 'react-icons/io5';
import { FaBusinessTime } from "react-icons/fa";
import { FaUsers, FaChartPie } from 'react-icons/fa';
import { GiExpense } from 'react-icons/gi';
import { NavMain } from '@/app/components/staffNav-main';
import { NavUser } from '@/app/components/nav-user';
import { GrMoney } from 'react-icons/gr';
import { TeamSwitcher } from '@/app/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from './ui/sidebar';
import { usePathname } from 'next/navigation';

// This is sample data.

export function AppSidebar({ ...props }) {
  const path = usePathname();
  const data = {
    user: {
      name: props.user.name ? props.user.name : '',
      role: props.user.role,
      id_number: props.user.id_number ? props.user.id_number : '',
      avatar: props.user.imageUrl
        ? props.user.imageUrl
        : props.user.gender === 'male'
        ? '/male-avatar.png'
        : '/female-avatar.png',
    },
    teams: [
      {
        name: 'Demprints',
        logo: GalleryVerticalEnd,
        plan: 'Ads and Copy Services',
      },
    ],
    navMain: [
      {
        title: 'Transactions',
        url: ' ',
        icon: FaChartPie,
        isActive: path === ' ' ? true : false,
      },
      {
        title: 'Daily Time Record',
        url: 'time_inOut',
        icon: FaBusinessTime,
        isActive: path === 'time_inOut' ? true : false,
      },
      {
        title: 'Settings',
        url: '',
        icon: Settings2,
        isActive: path === '' ? true : false,
      },
    ],
    projects: [
      {
        name: 'Design Engineering',
        url: '#',
        icon: Frame,
      },
      {
        name: 'Sales & Marketing',
        url: '#',
        icon: PieChart,
      },
      {
        name: 'Travel',
        url: '#',
        icon: Map,
      },
    ],
  };
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="bg-blue-900 dark:bg-blue-950"
    >
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
  );
}
