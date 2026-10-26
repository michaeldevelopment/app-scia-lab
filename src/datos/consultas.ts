// Helpers de lectura sobre los fixtures.
// La spec 02 agrega aquí sus propias consultas (institución, contadores)
// sin tocar las que ya existen.

import { INSTITUCIONES, ORDENES, PACIENTES } from "./fixtures";
import type { EstadoOrden, Institucion, Orden, Paciente } from "./tipos";

export function pacientePorDocumento(
  tipoDocumento: Paciente["tipoDocumento"],
  numeroDocumento: string,
): Paciente | undefined {
  return PACIENTES.find(
    (p) =>
      p.tipoDocumento === tipoDocumento &&
      p.numeroDocumento === numeroDocumento.trim(),
  );
}

export function pacientePorId(id: string): Paciente | undefined {
  return PACIENTES.find((p) => p.id === id);
}

export function institucionPorId(id: string): Institucion | undefined {
  return INSTITUCIONES.find((i) => i.id === id);
}

export function institucionPorIdentificacion(
  identificacionConvenio: string,
): Institucion | undefined {
  return INSTITUCIONES.find(
    (i) =>
      i.identificacionConvenio.trim().toLowerCase() ===
      identificacionConvenio.trim().toLowerCase(),
  );
}

export function ordenesDePaciente(pacienteId: string): Orden[] {
  return ORDENES.filter((o) => o.pacienteId === pacienteId).sort((a, b) =>
    b.fechaToma.localeCompare(a.fechaToma),
  );
}

export function ordenPorId(id: string): Orden | undefined {
  return ORDENES.find((o) => o.id === id);
}

/** Todas las órdenes de una institución, sin importar el paciente. */
export function ordenesDeInstitucion(institucionId: string): Orden[] {
  return ORDENES.filter((o) => o.institucionId === institucionId).sort(
    (a, b) => b.fechaToma.localeCompare(a.fechaToma),
  );
}

/** Cuenta cuántas órdenes de la lista dada hay en cada estado. */
export function contadoresPorEstado(
  ordenes: Orden[],
): Record<EstadoOrden, number> {
  const contadores: Record<EstadoOrden, number> = {
    "en-proceso": 0,
    remitida: 0,
    lista: 0,
  };
  for (const orden of ordenes) {
    contadores[orden.estado] += 1;
  }
  return contadores;
}
