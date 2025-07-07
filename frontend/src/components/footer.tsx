// src/components/footer.tsx
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const icons = [
  { Icon: FaFacebookSquare, link: "#" },
  { Icon: FaInstagram, link: "#" },
  { Icon: FaTwitterSquare, link: "#" },
  { Icon: FaGithubSquare, link: "#" },
  { Icon: FaDribbbleSquare, link: "#" },
];

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-t from-blue-50 via-white to-indigo-50 shadow-inner pt-10">
      <div className="max-w-[1240px] mx-auto py-12 px-4 grid lg:grid-cols-3 gap-8 text-gray-700">
        <div>
          <h1 className="w-full text-3xl font-extrabold text-blue-700">FOCUS TEAM.</h1>
          <p className="py-4">
            Focus Team es una solución integral para la asignación y seguimiento de tareas en empresas.
          </p>
          <div className="flex gap-4 my-6">
            {icons.map(({ Icon, link }, idx) => (
              <motion.a
                key={idx}
                href={link}
                whileHover={{ scale: 1.15, rotate: -10 + idx * 4 }}
                className="text-blue-700 hover:text-indigo-700 transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon size={32} />
              </motion.a>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          <div>
            <h6 className="font-semibold text-indigo-800 mb-2">Soluciones</h6>
            <ul className="space-y-1">
              <li>Gestión de Tareas</li>
              <li>Colaboración</li>
              <li>Notificaciones</li>
              <li>Reportes</li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold text-indigo-800 mb-2">Soporte</h6>
            <ul className="space-y-1">
              <li>Precios</li>
              <li>Documentación</li>
              <li>Guías</li>
              <li>Estado del sistema</li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold text-indigo-800 mb-2">Compañía</h6>
            <ul className="space-y-1">
              <li>Sobre nosotros</li>
              <li>Blog</li>
              <li>Trabaja con nosotros</li>
              <li>Prensa</li>
              <li>Carreras</li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold text-indigo-800 mb-2">Legal</h6>
            <ul className="space-y-1">
              <li>Reclamos</li>
              <li>Política</li>
              <li>Términos</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-400 py-3 text-sm border-t">
        &copy; {new Date().getFullYear()} Focus Team — Todos los derechos reservados
      </div>
    </footer>
  );
};

export default Footer;
