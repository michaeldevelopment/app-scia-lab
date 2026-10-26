import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ClipboardText, House, Van } from "@phosphor-icons/react";
import { Tabla, type ColumnaTabla } from "../componentes/Tabla";
import { EtiquetaEstado } from "../componentes/EtiquetaEstado";
import { EsqueletoTabla } from "../componentes/Esqueleto";
import { Vacio } from "../componentes/Vacio";
import { useSesion } from "../sesion/ContextoSesion";
import { ordenesDePaciente, pacientePorId } from "../datos/consultas";
import { useTitulo } from "../utilidades/useTitulo";
import type { Orden } from "../datos/tipos";

const ORIGEN_ETIQUETA: Record<Orden["origen"], { texto: string; icono: typeof House }> = {
  sede: { texto: "Sede", icono: House },
  domicilio: { texto: "Toma domiciliaria", icono: Van },
  convenio: { texto: "Convenio institucional", icono: ClipboardText },
};

function formatearFecha(fechaIso: string): string {
  return new Date(`${fechaIso}T00:00:00`).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function PacienteOrdenes() {
  useTitulo("Mis órdenes");
  const { sesion } = useSesion();
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(true);

  const pacienteId = sesion?.tipo === "paciente" ? sesion.pacienteId : "";
  const paciente = pacientePorId(pacienteId);
  const ordenes = ordenesDePaciente(pacienteId);

  useEffect(() => {
    // Simula una carga breve para poder mostrar el esqueleto, como pasaría
    // con datos reales. No hay red de por medio en la demo.
    const id = window.setTimeout(() => setCargando(false), 400);
    return () => window.clearTimeout(id);
  }, []);

  const columnas: ColumnaTabla<Orden>[] = [
    {
      encabezado: "Fecha de toma",
      renderizar: (orden) => formatearFecha(orden.fechaToma),
    },
    {
      encabezado: "Exámenes",
      renderizar: (orden) => (
        <span>{orden.examenes.map((e) => e.nombre).join(", ")}</span>
      ),
    },
    {
      encabezado: "Origen",
      renderizar: (orden) => {
        const info = ORIGEN_ETIQUETA[orden.origen];
        const Icono = info.icono;
        return (
          <span className="inline-flex items-center gap-1.5 text-gris-600">
            <Icono size={16} aria-hidden="true" />
            {info.texto}
          </span>
        );
      },
    },
    {
      encabezado: "Estado",
      renderizar: (orden) => <EtiquetaEstado estado={orden.estado} />,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 tabIndex={-1} className="text-3xl font-semibold text-azul-700 outline-none">
          Mis órdenes
        </h1>
        <p className="mt-1 text-gris-600">
          {paciente ? `${paciente.nombres} ${paciente.apellidos}` : ""}
        </p>
      </div>

      {cargando && <EsqueletoTabla />}

      {!cargando && ordenes.length === 0 && (
        <Vacio
          titulo="Todavía no tienes órdenes registradas"
          descripcion="Cuando te tomes una muestra en la sede o por toma domiciliaria, aparecerá aquí."
        />
      )}

      {!cargando && ordenes.length > 0 && (
        <Tabla
          columnas={columnas}
          filas={ordenes}
          obtenerLlave={(orden) => orden.id}
          onFilaClic={(orden) => navigate(`/paciente/orden/${orden.id}`)}
          etiquetaFilaClic={(orden) =>
            `Ver resultado de la orden ${orden.codigo}`
          }
        />
      )}
    </div>
  );
}
