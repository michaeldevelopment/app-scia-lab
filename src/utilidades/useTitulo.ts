import { useEffect } from "react";

const SUFIJO = "Scire Clinical Diagnosis — Portal (demo)";

/**
 * Pone un <title> propio por pantalla, requisito de la spec 03 (pulido).
 * Se restaura el título genérico al desmontar para no dejarlo pegado si la
 * navegación ocurre muy rápido entre pantallas.
 */
export function useTitulo(titulo: string) {
  useEffect(() => {
    const anterior = document.title;
    document.title = `${titulo} · ${SUFIJO}`;
    return () => {
      document.title = anterior;
    };
  }, [titulo]);
}
