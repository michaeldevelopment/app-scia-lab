// Modelo de datos del portal demo.
// Ver docs/TECH-SPEC.md y specs/01-cimientos-y-paciente.md.
// Las tres vistas de órdenes (lista del paciente, detalle, tablero
// institucional) leen esta misma forma. No se duplica en ninguna pantalla.

export type EstadoOrden = "en-proceso" | "remitida" | "lista";

export type OrigenMuestra = "sede" | "domicilio" | "convenio";

export interface Examen {
  id: string;
  nombre: string;
  /** Una de las cinco áreas de CONTEXTO.md / LINEA-GRAFICA.md */
  area: string;
  valor?: string;
  unidad?: string;
  rangoReferencia?: string;
  fueraDeRango?: boolean;
}

export interface Orden {
  id: string;
  codigo: string;
  pacienteId: string;
  /** Presente solo si la orden entró por convenio institucional. */
  institucionId?: string;
  fechaToma: string; // ISO 8601
  fechaProceso?: string; // ISO 8601, ausente si aún no se procesa
  estado: EstadoOrden;
  origen: OrigenMuestra;
  examenes: Examen[];
}

export interface Paciente {
  id: string;
  nombres: string;
  apellidos: string;
  tipoDocumento: "CC" | "TI" | "CE" | "PA";
  numeroDocumento: string;
  fechaNacimiento: string; // ISO 8601 (solo fecha, AAAA-MM-DD)
}

export interface Institucion {
  id: string;
  nombre: string;
  identificacionConvenio: string;
}
