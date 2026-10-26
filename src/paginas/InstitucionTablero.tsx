import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  CheckCircle,
  Clock,
  MagnifyingGlass,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import { Tabla, type ColumnaTabla } from "../componentes/Tabla";
import { EtiquetaEstado } from "../componentes/EtiquetaEstado";
import { EsqueletoTabla } from "../componentes/Esqueleto";
import { Vacio } from "../componentes/Vacio";
import { Tarjeta } from "../componentes/Tarjeta";
import { Boton } from "../componentes/Boton";
import { useSesion } from "../sesion/ContextoSesion";
import {
  contadoresPorEstado,
  institucionPorId,
  ordenesDeInstitucion,
  pacientePorId,
} from "../datos/consultas";
import { useTitulo } from "../utilidades/useTitulo";
import type { EstadoOrden, Orden } from "../datos/tipos";

type FiltroEstado = EstadoOrden | "todos";

const OPCIONES_ESTADO: { valor: FiltroEstado; etiqueta: string }[] = [
  { valor: "todos", etiqueta: "Todos los estados" },
  { valor: "en-proceso", etiqueta: "En proceso" },
  { valor: "remitida", etiqueta: "Remitida" },
  { valor: "lista", etiqueta: "Lista" },
];

function formatearFecha(fechaIso: string): string {
  return new Date(`${fechaIso}T00:00:00`).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function nombreCompletoPaciente(pacienteId: string): string {
  const paciente = pacientePorId(pacienteId);
  return paciente ? `${paciente.nombres} ${paciente.apellidos}` : "—";
}

export default function InstitucionTablero() {
  useTitulo("Tablero del convenio");
  const { sesion } = useSesion();
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(true);

  const [filtroEstado, setFiltroEstado] = useState<FiltroEstado>("todos");
  const [filtroDesde, setFiltroDesde] = useState("");
  const [filtroHasta, setFiltroHasta] = useState("");
  const [filtroPaciente, setFiltroPaciente] = useState("");

  const institucionId = sesion?.tipo === "institucion" ? sesion.institucionId : "";
  const institucion = institucionPorId(institucionId);
  const todasLasOrdenes = useMemo(
    () => ordenesDeInstitucion(institucionId),
    [institucionId],
  );

  useEffect(() => {
    const id = window.setTimeout(() => setCargando(false), 400);
    return () => window.clearTimeout(id);
  }, []);

  const hayFiltrosActivos =
    filtroEstado !== "todos" ||
    filtroDesde !== "" ||
    filtroHasta !== "" ||
    filtroPaciente.trim() !== "";

  const ordenesFiltradas = useMemo(() => {
    return todasLasOrdenes.filter((orden) => {
      if (filtroEstado !== "todos" && orden.estado !== filtroEstado) {
        return false;
      }
      if (filtroDesde && orden.fechaToma < filtroDesde) {
        return false;
      }
      if (filtroHasta && orden.fechaToma > filtroHasta) {
        return false;
      }
      if (filtroPaciente.trim()) {
        const nombre = nombreCompletoPaciente(orden.pacienteId).toLowerCase();
        if (!nombre.includes(filtroPaciente.trim().toLowerCase())) {
          return false;
        }
      }
      return true;
    });
  }, [todasLasOrdenes, filtroEstado, filtroDesde, filtroHasta, filtroPaciente]);

  const contadores = contadoresPorEstado(ordenesFiltradas);

  const columnas: ColumnaTabla<Orden>[] = [
    {
      encabezado: "Paciente",
      renderizar: (orden) => nombreCompletoPaciente(orden.pacienteId),
    },
    {
      encabezado: "Código",
      renderizar: (orden) => (
        <span className="font-mono text-sm">{orden.codigo}</span>
      ),
    },
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
      encabezado: "Estado",
      renderizar: (orden) => <EtiquetaEstado estado={orden.estado} />,
    },
  ];

  function limpiarFiltros() {
    setFiltroEstado("todos");
    setFiltroDesde("");
    setFiltroHasta("");
    setFiltroPaciente("");
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1
          tabIndex={-1}
          className="text-3xl font-semibold text-azul-700 outline-none"
        >
          Tablero del convenio
        </h1>
        <p className="mt-1 text-gris-600">{institucion?.nombre ?? ""}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Contador
          icono={Clock}
          etiqueta="En proceso"
          valor={contadores["en-proceso"]}
          clase="bg-estado-proceso-fondo text-estado-proceso-texto"
        />
        <Contador
          icono={PaperPlaneTilt}
          etiqueta="Remitidas"
          valor={contadores.remitida}
          clase="bg-estado-remitida-fondo text-estado-remitida-texto"
        />
        <Contador
          icono={CheckCircle}
          etiqueta="Listas"
          valor={contadores.lista}
          clase="bg-estado-lista-fondo text-estado-lista-texto"
        />
      </div>

      <Tarjeta className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="filtro-estado"
              className="text-sm font-semibold text-gris-900"
            >
              Estado
            </label>
            <select
              id="filtro-estado"
              value={filtroEstado}
              onChange={(evento) =>
                setFiltroEstado(evento.target.value as FiltroEstado)
              }
              className="rounded-lg border border-gris-200 px-3 py-2 text-base text-gris-900 transition-all duration-700 ease-fluida focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-600"
            >
              {OPCIONES_ESTADO.map((opcion) => (
                <option key={opcion.valor} value={opcion.valor}>
                  {opcion.etiqueta}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="filtro-desde"
              className="text-sm font-semibold text-gris-900"
            >
              Desde
            </label>
            <input
              id="filtro-desde"
              type="date"
              value={filtroDesde}
              onChange={(evento) => setFiltroDesde(evento.target.value)}
              className="rounded-lg border border-gris-200 px-3 py-2 text-base text-gris-900 transition-all duration-700 ease-fluida focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="filtro-hasta"
              className="text-sm font-semibold text-gris-900"
            >
              Hasta
            </label>
            <input
              id="filtro-hasta"
              type="date"
              value={filtroHasta}
              onChange={(evento) => setFiltroHasta(evento.target.value)}
              className="rounded-lg border border-gris-200 px-3 py-2 text-base text-gris-900 transition-all duration-700 ease-fluida focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="filtro-paciente"
              className="text-sm font-semibold text-gris-900"
            >
              Paciente
            </label>
            <div className="relative">
              <MagnifyingGlass
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gris-500"
                aria-hidden="true"
              />
              <input
                id="filtro-paciente"
                type="text"
                placeholder="Buscar por nombre"
                value={filtroPaciente}
                onChange={(evento) => setFiltroPaciente(evento.target.value)}
                className="w-full rounded-lg border border-gris-200 py-2 pl-9 pr-3 text-base text-gris-900 transition-all duration-700 ease-fluida focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-600"
              />
            </div>
          </div>
        </div>

        {hayFiltrosActivos && (
          <div>
            <Boton variante="fantasma" onClick={limpiarFiltros}>
              Limpiar filtros
            </Boton>
          </div>
        )}
      </Tarjeta>

      {cargando && <EsqueletoTabla />}

      {!cargando && todasLasOrdenes.length === 0 && (
        <Vacio
          titulo="Este convenio todavía no tiene órdenes"
          descripcion="Cuando el laboratorio procese muestras de este convenio, aparecerán aquí."
        />
      )}

      {!cargando && todasLasOrdenes.length > 0 && ordenesFiltradas.length === 0 && (
        <Vacio
          titulo="Ningún resultado con estos filtros"
          descripcion="Prueba a ampliar el rango de fechas o a quitar el filtro de estado o paciente."
          accion={
            <Boton variante="secundario" onClick={limpiarFiltros}>
              Limpiar filtros
            </Boton>
          }
        />
      )}

      {!cargando && ordenesFiltradas.length > 0 && (
        <Tabla
          columnas={columnas}
          filas={ordenesFiltradas}
          obtenerLlave={(orden) => orden.id}
          onFilaClic={(orden) => navigate(`/institucion/orden/${orden.id}`)}
          etiquetaFilaClic={(orden) =>
            `Ver resultado de la orden ${orden.codigo}, paciente ${nombreCompletoPaciente(orden.pacienteId)}`
          }
        />
      )}
    </div>
  );
}

function Contador({
  icono: Icono,
  etiqueta,
  valor,
  clase,
}: {
  icono: typeof Clock;
  etiqueta: string;
  valor: number;
  clase: string;
}) {
  return (
    <Tarjeta className="flex items-center gap-4">
      <span className={`flex h-10 w-10 items-center justify-center rounded-full ${clase}`}>
        <Icono size={20} weight="bold" aria-hidden="true" />
      </span>
      <div>
        <p className="text-2xl font-semibold text-gris-900">{valor}</p>
        <p className="text-sm text-gris-500">{etiqueta}</p>
      </div>
    </Tarjeta>
  );
}
