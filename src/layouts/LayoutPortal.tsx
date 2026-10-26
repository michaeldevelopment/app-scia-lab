import { Link, Navigate, Outlet } from "react-router";
import { Logo } from "../componentes/Logo";
import { Boton } from "../componentes/Boton";
import { useSesion } from "../sesion/ContextoSesion";
import { institucionPorId, pacientePorId } from "../datos/consultas";
import { SignOut } from "@phosphor-icons/react";

/**
 * Layout de las pantallas con sesión simulada: paciente e institución
 * (spec 02). Redirige a / si no hay sesión activa.
 */
export function LayoutPortal() {
  const { sesion, cerrarSesion } = useSesion();

  if (!sesion) {
    return <Navigate to="/" replace />;
  }

  const paciente =
    sesion.tipo === "paciente" ? pacientePorId(sesion.pacienteId) : undefined;
  const institucion =
    sesion.tipo === "institucion"
      ? institucionPorId(sesion.institucionId)
      : undefined;
  const nombreMostrado = paciente
    ? `${paciente.nombres} ${paciente.apellidos}`
    : (institucion?.nombre ?? "");

  return (
    <div className="flex flex-col">
      <header className="border-b border-gris-200 bg-white px-4 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <Link
            to={sesion.tipo === "paciente" ? "/paciente" : "/institucion"}
            className="rounded-lg transition-all duration-700 ease-fluida focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-600"
          >
            <Logo />
          </Link>
          <div className="flex items-center gap-3">
            {nombreMostrado && (
              <span className="hidden text-sm text-gris-600 sm:inline">
                {nombreMostrado}
              </span>
            )}
            <Boton variante="fantasma" onClick={cerrarSesion}>
              <SignOut size={16} weight="bold" aria-hidden="true" />
              Salir
            </Boton>
          </div>
        </div>
      </header>
      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
}
