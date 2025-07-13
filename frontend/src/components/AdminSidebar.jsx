import React from "react";
import {
  Calendar,
  Home,
  Users,
  Settings,
  Key,
  University,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useNavigate } from "react-router-dom";

const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    Icon: Home,
  },
  {
    title: "Users",
    url: "/admin/users",
    Icon: Users,
  },
  {
    title: "Consultations",
    url: "/admin/consultations",
    Icon: Calendar,
  },
  {
    title: "Consultation Areas",
    url: "/admin/consultation-areas",
    Icon: University,
  },
  {
    title: "System Settings",
    url: "/admin/settings",
    Icon: Settings,
  },
  {
    title: "Change Password",
    url: "/admin/change-password",
    Icon: Key,
  },
];

export function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // You can add logout logic here (e.g. clear tokens, call API, etc.)
    console.log("Logging out...");
    navigate("/login");
  };

  return (
    <Sidebar className="flex flex-col h-full justify-between">
      <SidebarContent className="flex flex-col flex-grow">
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(({ title, url, Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton asChild>
                    <Link to={url} className="flex items-center gap-2">
                      <Icon className="w-5 h-5" />
                      <span>{title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Logout section */}
      <div className="p-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} className="flex items-center gap-2 w-full text-left cursor-pointer">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>
    </Sidebar>
  );
}
