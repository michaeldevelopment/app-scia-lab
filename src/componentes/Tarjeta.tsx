import type { HTMLAttributes, ReactNode } from "react";

interface TarjetaProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Tarjeta base. Borde completo alrededor, nunca de un solo lado —
 * ver docs/LINEA-GRAFICA.md §4.
 */
export function Tarjeta({ children, className = "", ...resto }: TarjetaProps) {
  return (
    <div
      className={`rounded-2xl border border-gris-200 bg-white p-6 ${className}`}
      {...resto}
    >
      {children}
    </div>
  );
}
