import { Outlet } from "react-router";
import { FranjaDemo } from "../componentes/FranjaDemo";
import { FocoEnRuta } from "../a11y/FocoEnRuta";

/**
 * Shell de toda la aplicación: salto a contenido, franja de demo permanente
 * y pie de página. Ver specs/01-cimientos-y-paciente.md paso 4.
 */
export function LayoutRaiz() {
  return (
    <div className="flex min-h-screen flex-col bg-gris-50">
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-rojo-500 focus:px-4 focus:py-2 focus:text-white"
      >
        Saltar al contenido
      </a>
      <FranjaDemo />
      <FocoEnRuta />
      <main id="contenido-principal" className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-gris-200 bg-white px-4 py-6 text-center text-sm text-gris-500">
        <p>
          Scire Clinical Diagnosis — Portal de demostración. No es el portal
          real de resultados.
        </p>
      </footer>
    </div>
  );
}
