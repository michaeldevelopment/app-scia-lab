import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variante = "primario" | "secundario" | "fantasma";

interface BotonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante;
  children: ReactNode;
}

const clasesPorVariante: Record<Variante, string> = {
  primario:
    "bg-rojo-500 text-white hover:bg-rojo-600 active:bg-rojo-700 focus-visible:outline-rojo-600",
  secundario:
    "bg-azul-500 text-white hover:bg-azul-600 active:bg-azul-700 focus-visible:outline-azul-600",
  fantasma:
    "bg-transparent text-azul-700 border border-azul-200 hover:bg-azul-50 active:bg-azul-100 focus-visible:outline-azul-600",
};

/**
 * Botón base. Estados completos: hover, activo, foco visible, deshabilitado.
 * Ver docs/LINEA-GRAFICA.md §8.
 */
export const Boton = forwardRef<HTMLButtonElement, BotonProps>(
  function Boton(
    { variante = "primario", className = "", children, disabled, ...resto },
    ref,
  ) {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-base font-semibold
          transition-all duration-700 ease-fluida
          active:scale-[0.98]
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
          disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100
          ${clasesPorVariante[variante]} ${className}`}
        {...resto}
      >
        {children}
      </button>
    );
  },
);
