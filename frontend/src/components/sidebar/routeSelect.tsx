
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

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
  { path: "/panel", Icon: FiHome, title: "Panel de control", roles: ["admin", "empleado"] },
  { path: "/employees", Icon: FiUsers, title: "Empleados", roles: ["admin"] },
  { path: "/task", Icon: FaTasks, title: "Tareas", roles: ["admin", "empleado"] },
  { path: "/project", Icon: FiLink, title: "Proyectos", roles: ["admin", "empleado"] },
  { path: "/report", Icon: IoAnalytics, title: "Reportes y Analisis", roles: ["admin"] },
  { path: "/finance", Icon: TbPigMoney, title: "Finanzas", roles: ["admin"] },
  { path: "/support", Icon: MdOutlineContactSupport, title: "Soporte & Ayuda", roles: ["admin", "empleado"] },
];

export const RouteSelect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const visibleRoutes = routes.filter(route =>
    user && route.roles.includes(user.userType)
  );

  return (
    <div className="space-y-1">
      {visibleRoutes.map(({ path, Icon, title }) => (
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
