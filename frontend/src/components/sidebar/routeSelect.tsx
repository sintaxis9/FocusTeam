import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { IconType } from "react-icons/lib";
import {
  FiHome,
  FiLink,
  FiUsers,
} from "react-icons/fi";
import { FaTasks } from "react-icons/fa";
import { IoAnalytics } from "react-icons/io5";
import { TbPigMoney } from "react-icons/tb";
import { MdOutlineContactSupport } from "react-icons/md";

const routes = [
  { path: "/panel", Icon: FiHome, title: "Panel de control" },
  { path: "/employees", Icon: FiUsers, title: "Empleados" },
  { path: "/task", Icon: FaTasks, title: "Tareas" },
  { path: "/project", Icon: FiLink, title: "Proyectos" },
  { path: "/report", Icon: IoAnalytics, title: "Reportes y Analisis" },
  { path: "/finance", Icon: TbPigMoney, title: "Finanzas" },
  { path: "/support", Icon: MdOutlineContactSupport, title: "Soporte & Ayuda" },
];

export const RouteSelect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="space-y-1">
      {routes.map(({ path, Icon, title }) => (
        <SidebarRouteButton
          key={path}
          selected={location.pathname === path}
          Icon={Icon}
          title={title}
          onClick={() => navigate(path)}
        />
      ))}
    </div>
  );
};

const SidebarRouteButton = ({
  selected,
  Icon,
  title,
  onClick,
}: {
  selected: boolean;
  Icon: IconType;
  title: string;
  onClick: () => void;
}) => {
  return (
    <button
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
        selected
          ? "bg-white text-stone-950 shadow"
          : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
      }`}
      onClick={onClick}
    >
      <Icon className={selected ? "text-violet-500" : ""} />
      <span>{title}</span>
    </button>
  );
};
