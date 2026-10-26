import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import { ErrorEnLinea } from "./ErrorEnLinea";

interface CampoProps extends InputHTMLAttributes<HTMLInputElement> {
  etiqueta: string;
  error?: string;
  textoAyuda?: string;
}

/**
 * Campo de formulario con etiqueta, error en línea y texto de ayuda.
 * Nunca usa alert() para errores — ver docs/LINEA-GRAFICA.md §8.
 */
export const Campo = forwardRef<HTMLInputElement, CampoProps>(function Campo(
  { etiqueta, error, textoAyuda, id, className = "", ...resto },
  ref,
) {
  const idGenerado = useId();
  const inputId = id ?? idGenerado;
  const errorId = `${inputId}-error`;
  const ayudaId = `${inputId}-ayuda`;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="text-sm font-semibold text-gris-900">
        {etiqueta}
      </label>
      <input
        ref={ref}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [error ? errorId : null, textoAyuda ? ayudaId : null]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className={`rounded-lg border px-3 py-2 text-base text-gris-900 transition-all duration-700 ease-fluida
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-600
          ${error ? "border-rojo-500" : "border-gris-200"} ${className}`}
        {...resto}
      />
      {textoAyuda && !error && (
        <p id={ayudaId} className="text-sm text-gris-500">
          {textoAyuda}
        </p>
      )}
      {error && <ErrorEnLinea id={errorId}>{error}</ErrorEnLinea>}
    </div>
  );
});
