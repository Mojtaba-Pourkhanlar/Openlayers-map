import { SidebarMenuItem } from "@/Interfaces";
import List from "@/assets/svg/project.svg";
import ProjectMenu from "./ProjectMenu";
import Project from "@/Pages/Project";

export const sidebarMenuItems = () => {
  const projectMenu = ProjectMenu();
  const dashboard: SidebarMenuItem[] = [
    {
      name: "پروژه ها",
      path: "/project",
      component: <Project />,
      layout: "/admin",
      rules: [],
      icon: List,
      menu: projectMenu,
    },
  ];
  return dashboard;
};
