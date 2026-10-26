import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  DownloadSimple,
  PaperPlaneTilt,
  WarningCircle,
} from "@phosphor-icons/react";
import { Tarjeta } from "../componentes/Tarjeta";
import { Boton } from "../componentes/Boton";
import { EtiquetaEstado } from "../componentes/EtiquetaEstado";
import { Vacio } from "../componentes/Vacio";
import { useSesion } from "../sesion/ContextoSesion";
import {
  institucionPorId,
  ordenPorId,
  pacientePorId,
} from "../datos/consultas";
import { useTitulo } from "../utilidades/useTitulo";
import type { Examen } from "../datos/tipos";

function formatearFecha(fechaIso?: string): string {
  if (!fechaIso) return "—";
  return new Date(`${fechaIso}T00:00:00`).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function OrdenDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { sesion } = useSesion();
  const orden = id ? ordenPorId(id) : undefined;
  const paciente = orden ? pacientePorId(orden.pacienteId) : undefined;
  useTitulo(orden ? `Resultado ${orden.codigo}` : "Orden no encontrada");

  const esVistaInstitucion = sesion?.tipo === "institucion";
  const institucion =
    sesion?.tipo === "institucion"
      ? institucionPorId(sesion.institucionId)
      : undefined;
  const rutaRegreso = esVistaInstitucion ? "/institucion" : "/paciente";
  const etiquetaRegreso = esVistaInstitucion
    ? "Volver al tablero"
    : "Volver a mis órdenes";

  if (!orden || !paciente) {
    return (
      <div className="flex flex-col gap-6">
        <h1 tabIndex={-1} className="text-3xl font-semibold text-azul-700 outline-none">
          Orden no encontrada
        </h1>
        <Vacio
          titulo="No encontramos esta orden"
          descripcion="Puede que el enlace esté mal escrito o que la orden no exista en este entorno de demostración."
          accion={
            <Boton variante="secundario" onClick={() => navigate(rutaRegreso)}>
              {etiquetaRegreso}
            </Boton>
          }
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <button
        type="button"
        onClick={() => navigate(rutaRegreso)}
        className="inline-flex w-fit items-center gap-1.5 rounded-lg text-sm font-semibold text-azul-600
          transition-all duration-700 ease-fluida hover:text-azul-700
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-600"
      >
        <ArrowLeft size={16} weight="bold" aria-hidden="true" />
        {etiquetaRegreso}
      </button>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 tabIndex={-1} className="text-3xl font-semibold text-azul-700 outline-none">
            Resultado {orden.codigo}
          </h1>
          <p className="mt-1 text-gris-600">
            {paciente.nombres} {paciente.apellidos} · {paciente.tipoDocumento}{" "}
            {paciente.numeroDocumento}
          </p>
          {esVistaInstitucion && institucion && (
            <p className="text-sm text-gris-500">
              Convenio: {institucion.nombre}
            </p>
          )}
        </div>
        <EtiquetaEstado estado={orden.estado} />
      </div>

      <Tarjeta className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DatoResumen etiqueta="Fecha de toma" valor={formatearFecha(orden.fechaToma)} />
        <DatoResumen
          etiqueta="Fecha de proceso"
          valor={formatearFecha(orden.fechaProceso)}
        />
      </Tarjeta>

      {orden.estado === "remitida" && (
        <div className="flex items-start gap-2 rounded-2xl border border-estado-remitida-texto/20 bg-estado-remitida-fondo px-4 py-3 text-sm text-estado-remitida-texto">
          <PaperPlaneTilt size={18} weight="fill" className="mt-0.5 shrink-0" aria-hidden="true" />
          <p>
            Esta orden se remitió a la red de referencia nacional porque es un
            estudio especializado que no se procesa en Cúcuta. Por eso tarda
            más que un examen de rutina.
          </p>
        </div>
      )}

      <div className="relative flex flex-col gap-3 overflow-hidden">
        <p
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-center text-5xl font-semibold uppercase tracking-widest text-rojo-100 sm:text-6xl"
          style={{ transform: "rotate(-20deg)" }}
        >
          Demostración
        </p>
        <h2 className="relative text-xl font-semibold text-gris-900">
          Exámenes
        </h2>
        {orden.examenes.map((examenActual) => (
          <div key={examenActual.id} className="relative">
            <FilaExamen examen={examenActual} />
          </div>
        ))}
      </div>

      <Tarjeta className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-gris-900">Descargar resultado</p>
          <p className="text-sm text-gris-500">
            En esta demo el resultado solo se consulta en pantalla, marcado
            como entorno de demostración.
          </p>
        </div>
        <Boton
          variante="secundario"
          disabled
          title="Disponible en el portal real de Scire, no en esta demo"
        >
          <DownloadSimple size={16} weight="bold" aria-hidden="true" />
          Descargar PDF
        </Boton>
      </Tarjeta>
    </div>
  );
}

function DatoResumen({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div>
      <p className="text-sm text-gris-500">{etiqueta}</p>
      <p className="font-semibold text-gris-900">{valor}</p>
    </div>
  );
}

function FilaExamen({ examen }: { examen: Examen }) {
  return (
    <Tarjeta className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-semibold text-gris-900">{examen.nombre}</p>
        <p className="text-sm text-gris-500">{examen.area}</p>
      </div>
      <div className="flex items-center gap-4 font-mono text-sm">
        <div className="text-right">
          <p
            className={`text-base font-medium ${
              examen.fueraDeRango ? "text-rojo-600" : "text-gris-900"
            }`}
          >
            {examen.valor ?? "pendiente"} {examen.unidad && examen.unidad !== "—" ? examen.unidad : ""}
          </p>
          <p className="text-gris-500">Ref: {examen.rangoReferencia}</p>
        </div>
        {examen.fueraDeRango && (
          <span className="inline-flex items-center gap-1 rounded-full bg-rojo-50 px-2 py-1 text-xs font-sans font-semibold text-rojo-600">
            <WarningCircle size={14} weight="fill" aria-hidden="true" />
            Fuera de rango
          </span>
        )}
      </div>
    </Tarjeta>
  );
}
