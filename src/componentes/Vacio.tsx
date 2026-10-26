import type { ReactNode } from "react";
import type { Icon } from "@phosphor-icons/react";
import { Tray } from "@phosphor-icons/react";

interface VacioProps {
  icono?: Icon;
  titulo: string;
  descripcion?: string;
  accion?: ReactNode;
}

/**
 * Vista de vacío compuesta. Nunca un panel en blanco —
 * ver docs/LINEA-GRAFICA.md §8.
 */
export function Vacio({ icono: Icono = Tray, titulo, descripcion, accion }: VacioProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-gris-200 px-6 py-12 text-center">
      <Icono size={32} className="text-gris-500" aria-hidden="true" />
      <p className="text-base font-semibold text-gris-900">{titulo}</p>
      {descripcion && <p className="max-w-sm text-sm text-gris-500">{descripcion}</p>}
      {accion}
    </div>
  );
}
