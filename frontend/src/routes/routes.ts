import {
  FiHome,
  FiUsers,
  FiLink
} from "react-icons/fi";
import { FaTasks } from "react-icons/fa";
import { IoAnalytics } from "react-icons/io5";
import { TbPigMoney } from "react-icons/tb";
import { MdOutlineContactSupport } from "react-icons/md";
import type { IconType } from "react-icons/lib";

export type AppRoute = {
  path: string;
  title: string;
  Icon: IconType;
  roles: Array<'admin' | 'empleado'>;
};

export const routes: AppRoute[] = [
  { path: "/panel", title: "Panel de control", Icon: FiHome, roles: ["admin", "empleado"] },
  { path: "/employees", title: "Empleados", Icon: FiUsers, roles: ["admin"] },
  { path: "/task", title: "Tareas", Icon: FaTasks, roles: ["admin", "empleado"] },
  { path: "/project", title: "Proyectos", Icon: FiLink, roles: ["admin", "empleado"] },
  { path: "/report", title: "Reportes", Icon: IoAnalytics, roles: ["admin"] },
  { path: "/finance", title: "Finanzas", Icon: TbPigMoney, roles: ["admin"] },
  { path: "/support", title: "Soporte", Icon: MdOutlineContactSupport, roles: ["admin", "empleado"] },
];
