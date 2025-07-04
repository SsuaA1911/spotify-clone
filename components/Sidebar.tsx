"use client";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Song } from "@/types";

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        href: "/search",
        active: pathname === "/search",
      },
    ],
    [pathname]
  );
  return (
    <div className="flex h-screen">
      <div
        className=" 
      hidden
      md:flex
      flex-col
      gap-y-2
      bg-black
      h-full
      w-[300px]
      p-2
      "
      >
        <Box>
          <div
            className="
          flex
          flex-col
          gap-y-4
          px-5
          py-4
          "
          >
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto flex-1">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-screen flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};
export default Sidebar;
