"use client";

import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function NavMain({
  links,
}: {
  links: {
    name: string;
    url: string;
    icon?: React.ReactNode;
    isActive?: boolean;
  }[];
}) {
  const pathname = usePathname();
  const isActive = (url: string) => pathname === url;

  return (
    <SidebarGroup className="">
      <SidebarMenu className="flex flex-col gap-3">
        {links.map((item) => (
          <Collapsible
            key={item.name}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <Link href={`${item.url}`}>
                  <SidebarMenuButton
                    tooltip={item.name}
                    className={`${
                      isActive(item.url) ? "bg-secondary/10" : ""
                    } cursor-pointer flex items-center justify-start text-black/80`}
                    aria-label={item.name}
                  >
                    {item.icon && item.icon}
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </Link>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
