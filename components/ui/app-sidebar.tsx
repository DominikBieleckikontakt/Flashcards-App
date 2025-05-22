"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "./sidebar";
import {
  Home,
  Inbox,
  LogOut,
  Plus,
  Search,
  Settings,
  Star,
} from "lucide-react";
import { NavMain } from "../sidebar-elements/nav-main";
import { NavUser } from "../sidebar-elements/nav-user";
import { Collapsible, CollapsibleTrigger } from "./collapsible";
import { logoutUser } from "@/actions/auth";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: <Home />,
      isActive: true,
    },
    {
      name: "Add flashcards set",
      url: "/flashcards/new",
      icon: <Plus />,
    },
    {
      name: "My flashcards",
      url: "/flashcards",
      icon: <Inbox />,
    },
    {
      name: "Explore flashcards",
      url: "/flashcards/explore",
      icon: <Search />,
    },
    {
      name: "Favorites",
      url: "/favorites",
      icon: <Star />,
    },
    {
      name: "Settings",
      url: "/dashboard/edit-profile",
      icon: <Settings />,
    },
  ],
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className=" text-2xl font-extralight flex items-center line-clamp-1">
        {open ? (
          <p className="font-extralight pl-2">
            Next
            <span className="font-normal bg-gradient-to-br from-primary to-secondary inline-block text-transparent bg-clip-text">
              Flash
            </span>
          </p>
        ) : (
          <p className="pl-2">N</p>
        )}
      </SidebarHeader>
      <SidebarContent className="flex justify-center">
        <NavMain links={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <Collapsible asChild className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={"Log out"}
                  className={`cursor-pointer flex items-center justify-start text-black/80`}
                  onClick={async () => await logoutUser()}
                >
                  <LogOut className="size-5" />
                  <span>Log out</span>
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
