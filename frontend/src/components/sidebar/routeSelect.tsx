import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import type { IconType } from "react-icons/lib";
import {
  FiHome, FiLink, FiUsers,
} from "react-icons/fi";
import { FaTasks } from "react-icons/fa";
import { IoAnalytics } from "react-icons/io5";
import { TbPigMoney } from "react-icons/tb";
import { MdOutlineContactSupport } from "react-icons/md";
import { motion } from "framer-motion";

const routes = [
  { path: "/panel", Icon: FiHome, title: "Panel de control", roles: ["admin", "empleado"] },
  { path: "/employees", Icon: FiUsers, title: "Empleados", roles: ["admin"] },
  { path: "/task", Icon: FaTasks, title: "Tareas", roles: ["admin", "empleado"] },
  { path: "/project", Icon: FiLink, title: "Proyectos", roles: ["admin", "empleado"] },
  { path: "/report", Icon: IoAnalytics, title: "Reportes y Análisis", roles: ["admin"] },
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
    <nav className="space-y-1">
      {visibleRoutes.map(({ path, Icon, title }) => (
        <SidebarRouteButton
          key={path}
          selected={location.pathname === path}
          Icon={Icon}
          title={title}
          onClick={() => navigate(path)}
        />
      ))}
    </nav>
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
}) => (
  <motion.button
    whileTap={{ scale: 0.98 }}
    whileHover={{ scale: 1.025 }}
    className={`
      flex items-center gap-3 w-full rounded-lg px-3 py-2 text-[15px] font-semibold 
      transition-all duration-150
      ${
        selected
          ? "bg-gradient-to-r from-violet-100 via-white to-indigo-100 text-violet-700 shadow border-l-4 border-violet-500"
          : "hover:bg-stone-100 text-stone-600 border-l-4 border-transparent"
      }
    `}
    onClick={onClick}
    aria-current={selected ? "page" : undefined}
  >
    <Icon className={`text-lg ${selected ? "text-violet-600" : "text-stone-400"}`} />
    <span className="truncate">{title}</span>
  </motion.button>
);
