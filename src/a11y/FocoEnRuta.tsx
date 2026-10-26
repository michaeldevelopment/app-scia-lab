// Mueve el foco al <h1> de la pantalla nueva en cada cambio de ruta y lo
// anuncia en una región aria-live. React Router no hace esto por defecto, y
// sin esto un usuario de teclado o lector de pantalla queda perdido tras
// navegar — ver docs/TECH-SPEC.md "Tres detalles de SPA que suelen romperse".

import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

export function FocoEnRuta() {
  const { pathname } = useLocation();
  const anuncioRef = useRef<HTMLDivElement>(null);
  const esPrimeraCarga = useRef(true);

  useEffect(() => {
    if (esPrimeraCarga.current) {
      esPrimeraCarga.current = false;
      return;
    }

    // Se espera al siguiente frame para que el <h1> de la pantalla nueva ya
    // esté en el DOM antes de intentar enfocarlo.
    const id = window.requestAnimationFrame(() => {
      const titulo = document.querySelector<HTMLElement>("h1");
      if (titulo) {
        if (!titulo.hasAttribute("tabindex")) {
          titulo.setAttribute("tabindex", "-1");
        }
        titulo.focus();
        if (anuncioRef.current) {
          anuncioRef.current.textContent =
            titulo.textContent ?? "Página cambiada";
        }
      }
    });

    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <div
      ref={anuncioRef}
      role="status"
      aria-live="polite"
      className="sr-only"
    />
  );
}
