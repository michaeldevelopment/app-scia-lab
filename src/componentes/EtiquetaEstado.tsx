import { CheckCircle, Clock, PaperPlaneTilt } from "@phosphor-icons/react";
import type { EstadoOrden } from "../datos/tipos";

const CONFIGURACION: Record<
  EstadoOrden,
  { etiqueta: string; icono: typeof CheckCircle; clase: string }
> = {
  lista: {
    etiqueta: "Lista",
    icono: CheckCircle,
    clase: "bg-estado-lista-fondo text-estado-lista-texto",
  },
  "en-proceso": {
    etiqueta: "En proceso",
    icono: Clock,
    clase: "bg-estado-proceso-fondo text-estado-proceso-texto",
  },
  remitida: {
    etiqueta: "Remitida",
    icono: PaperPlaneTilt,
    clase: "bg-estado-remitida-fondo text-estado-remitida-texto",
  },
};

/**
 * Etiqueta de estado de una orden. Nunca comunica el estado solo con color:
 * siempre lleva icono y palabra — ver docs/LINEA-GRAFICA.md §2.
 */
export function EtiquetaEstado({ estado }: { estado: EstadoOrden }) {
  const config = CONFIGURACION[estado];
  const Icono = config.icono;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${config.clase}`}
    >
      <Icono size={14} weight="bold" aria-hidden="true" />
      {config.etiqueta}
    </span>
  );
}
