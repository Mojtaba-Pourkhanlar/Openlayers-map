import { Menu } from "@/Interfaces";
import OpenProject from "@/Pages/OpenProject";

const ProjectMenu = () => {
  const projectMenu: Menu[] = [
    {
      path: "projectlist",
      name: "لیست پروژه ها",
      component: <OpenProject />,
      layout: "/admin/project",
      rules: [],
      menu: [
        {
          path: "projectlist/:id",
          name: "باز کردن پروژه",
          component: <OpenProject />,
          layout: "/admin/project",
          rules: [],
        },
      ],
    },
  ];
  return projectMenu;
};

export default ProjectMenu;
