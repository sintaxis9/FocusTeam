import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
    <h1 className="text-5xl font-extrabold text-red-600 mb-4">404</h1>
    <p className="text-lg mb-6">La página que buscas no existe.</p>
    <Link
      to="/"
      className="px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-900 transition"
    >
      Volver al inicio
    </Link>
  </div>
);

export default NotFound;
