import { Link, Outlet } from "react-router";
import { Logo } from "../componentes/Logo";

/**
 * Layout de las pantallas sin sesión: ingreso, agendar y cotizar (las dos
 * últimas llegan en la spec 03). Encabezado simple con enlace al inicio.
 */
export function LayoutPublico() {
  return (
    <div className="flex flex-col">
      <header className="border-b border-gris-200 bg-white px-4 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            to="/"
            className="rounded-lg transition-all duration-700 ease-fluida focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-600"
          >
            <Logo />
          </Link>
        </div>
      </header>
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
        <Outlet />
      </div>
    </div>
  );
}
