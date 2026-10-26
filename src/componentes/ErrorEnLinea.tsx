import type { ReactNode } from "react";
import { WarningCircle } from "@phosphor-icons/react";

interface ErrorEnLineaProps {
  id?: string;
  children: ReactNode;
}

/**
 * Error en línea y específico. Nunca window.alert().
 * Ver docs/LINEA-GRAFICA.md §8.
 */
export function ErrorEnLinea({ id, children }: ErrorEnLineaProps) {
  return (
    <p id={id} role="alert" className="flex items-start gap-1.5 text-sm text-rojo-600">
      <WarningCircle size={16} weight="fill" className="mt-0.5 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
