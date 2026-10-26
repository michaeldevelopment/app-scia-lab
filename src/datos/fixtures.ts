// Datos ficticios para el entorno de demostración.
// Nombres colombianos realistas, nunca "Juan Pérez" — ver docs/LINEA-GRAFICA.md §8
// (content realism) y CLAUDE.md. Ningún dato aquí es real ni viene de un
// paciente de Scire.

import type { Examen, Institucion, Orden, Paciente } from "./tipos";

/**
 * Catálogo del cotizador, con precios de EJEMPLO.
 *
 * Ni uno de estos precios viene del cliente: Scire no nos ha confirmado
 * tarifas (ver memoria/preguntas-abiertas.md). Están aquí solo para mostrar
 * el mecanismo del cotizador en el preview, y cada uno se muestra en pantalla
 * marcado como dato de ejemplo — nunca se publican como precios reales.
 * No son múltiplos redondos a propósito, para que no se lean como una tabla
 * oficial pegada sin pensar.
 */
export interface ExamenCotizable {
  id: string;
  nombre: string;
  area: string;
  precioEjemploCop: number;
}

export const CATALOGO_COTIZADOR: ExamenCotizable[] = [
  {
    id: "cot-hemograma",
    nombre: "Hemograma completo",
    area: "Bioquímica clínica",
    precioEjemploCop: 38700,
  },
  {
    id: "cot-glucosa",
    nombre: "Glucosa en ayunas",
    area: "Bioquímica clínica",
    precioEjemploCop: 24300,
  },
  {
    id: "cot-perfil-lipidico",
    nombre: "Perfil lipídico (colesterol y triglicéridos)",
    area: "Bioquímica clínica",
    precioEjemploCop: 67900,
  },
  {
    id: "cot-tsh",
    nombre: "Hormona estimulante de tiroides (TSH)",
    area: "Inmunología y hormonas",
    precioEjemploCop: 52400,
  },
  {
    id: "cot-parcial-orina",
    nombre: "Parcial de orina",
    area: "Uroanálisis y microscopía",
    precioEjemploCop: 21800,
  },
  {
    id: "cot-urocultivo",
    nombre: "Urocultivo",
    area: "Microbiología",
    precioEjemploCop: 58200,
  },
  {
    id: "cot-tamizaje-prenatal",
    nombre: "Tamizaje prenatal (PAPP-A y β-hCG libre)",
    area: "Tamizaje prenatal",
    precioEjemploCop: 312500,
  },
  {
    id: "cot-hpv",
    nombre: "HPV Direct Flow Chip",
    area: "Biología molecular",
    precioEjemploCop: 428900,
  },
  {
    id: "cot-septina9",
    nombre: "Septina 9",
    area: "Biología molecular",
    precioEjemploCop: 389400,
  },
  {
    id: "cot-paternidad",
    nombre: "Prueba de paternidad (padre, madre e hijo)",
    area: "Huella del ADN y paternidad",
    precioEjemploCop: 745600,
  },
];

export const PACIENTES: Paciente[] = [
  {
    id: "pac-01",
    nombres: "María Fernanda",
    apellidos: "Contreras Rangel",
    tipoDocumento: "CC",
    numeroDocumento: "1091678432",
    fechaNacimiento: "1988-04-12",
  },
  {
    id: "pac-02",
    nombres: "Jairo Alonso",
    apellidos: "Peñaranda Suárez",
    tipoDocumento: "CC",
    numeroDocumento: "88234561",
    fechaNacimiento: "1975-11-03",
  },
  {
    id: "pac-03",
    nombres: "Luz Dary",
    apellidos: "Villamizar Cáceres",
    tipoDocumento: "CC",
    numeroDocumento: "60345217",
    fechaNacimiento: "1962-07-21",
  },
  {
    id: "pac-04",
    nombres: "Santiago",
    apellidos: "Rincón Mora",
    tipoDocumento: "CC",
    numeroDocumento: "1005432178",
    fechaNacimiento: "1996-02-28",
  },
  {
    id: "pac-05",
    nombres: "Ana Sofía",
    apellidos: "Bayona Jaimes",
    tipoDocumento: "TI",
    numeroDocumento: "1098765432",
    fechaNacimiento: "2010-09-15",
  },
  {
    id: "pac-06",
    nombres: "Edgar Enrique",
    apellidos: "Cárdenas Ortega",
    tipoDocumento: "CC",
    numeroDocumento: "13456789",
    fechaNacimiento: "1958-01-30",
  },
  {
    id: "pac-07",
    nombres: "Daniela",
    apellidos: "Portilla Quintero",
    tipoDocumento: "CC",
    numeroDocumento: "1091234567",
    fechaNacimiento: "1993-06-08",
  },
  {
    id: "pac-08",
    nombres: "Carlos Mario",
    apellidos: "Zambrano Delgado",
    tipoDocumento: "CE",
    numeroDocumento: "4582917",
    fechaNacimiento: "1980-12-17",
  },
];

export const INSTITUCIONES: Institucion[] = [
  {
    id: "inst-01",
    nombre: "Consultorio Médico Norte de Santander",
    identificacionConvenio: "CONV-4471",
  },
  {
    id: "inst-02",
    nombre: "IPS San Rafael de Cúcuta",
    identificacionConvenio: "CONV-2208",
  },
];

// Catálogo reducido de exámenes con rangos de referencia típicos.
// Área toma los nombres de docs/CONTEXTO.md §1 y LINEA-GRAFICA.md.
const catalogo: Record<
  string,
  { nombre: string; area: string; unidad: string; rango: string }
> = {
  hemograma: {
    nombre: "Hemograma completo",
    area: "Hematología y coagulación",
    unidad: "g/dL",
    rango: "12.0 – 16.0",
  },
  glucosa: {
    nombre: "Glucosa en ayunas",
    area: "Bioquímica clínica",
    unidad: "mg/dL",
    rango: "70 – 100",
  },
  colesterol: {
    nombre: "Colesterol total",
    area: "Bioquímica clínica",
    unidad: "mg/dL",
    rango: "< 200",
  },
  trigliceridos: {
    nombre: "Triglicéridos",
    area: "Bioquímica clínica",
    unidad: "mg/dL",
    rango: "< 150",
  },
  tsh: {
    nombre: "Hormona estimulante de tiroides (TSH)",
    area: "Inmunología y hormonas",
    unidad: "µUI/mL",
    rango: "0.4 – 4.0",
  },
  parcialOrina: {
    nombre: "Parcial de orina",
    area: "Uroanálisis y microscopía",
    unidad: "—",
    rango: "sin hallazgos",
  },
  urocultivo: {
    nombre: "Urocultivo",
    area: "Microbiología",
    unidad: "UFC/mL",
    rango: "< 10.000",
  },
  pcrProteina: {
    nombre: "Proteína C reactiva",
    area: "Bioquímica clínica",
    unidad: "mg/L",
    rango: "< 5.0",
  },
  papp: {
    nombre: "Proteína A asociada al embarazo (PAPP-A)",
    area: "Tamizaje prenatal",
    unidad: "mUI/mL",
    rango: "según semana de gestación",
  },
  septina9: {
    nombre: "Septina 9",
    area: "Biología molecular",
    unidad: "—",
    rango: "no detectado",
  },
};

function examen(
  clave: keyof typeof catalogo,
  opciones: { valor?: string; fueraDeRango?: boolean } = {},
): Examen {
  const base = catalogo[clave];
  return {
    id: `${clave}-${Math.random().toString(36).slice(2, 7)}`,
    nombre: base.nombre,
    area: base.area,
    unidad: base.unidad,
    rangoReferencia: base.rango,
    valor: opciones.valor,
    fueraDeRango: opciones.fueraDeRango,
  };
}

function orden(datos: Orden): Orden {
  return datos;
}

// ~30 órdenes repartidas entre los tres estados y los tres orígenes,
// con al menos una remitida y al menos un valor fuera de rango.
export const ORDENES: Orden[] = [
  orden({
    id: "ord-001",
    codigo: "SCR-100231",
    pacienteId: "pac-01",
    fechaToma: "2026-10-20",
    fechaProceso: "2026-10-21",
    estado: "lista",
    origen: "sede",
    examenes: [
      examen("hemograma", { valor: "13.4" }),
      examen("glucosa", { valor: "92" }),
    ],
  }),
  orden({
    id: "ord-002",
    codigo: "SCR-100245",
    pacienteId: "pac-01",
    fechaToma: "2026-09-02",
    fechaProceso: "2026-09-03",
    estado: "lista",
    origen: "domicilio",
    examenes: [
      examen("colesterol", { valor: "238", fueraDeRango: true }),
      examen("trigliceridos", { valor: "162", fueraDeRango: true }),
    ],
  }),
  orden({
    id: "ord-003",
    codigo: "SCR-100301",
    pacienteId: "pac-02",
    fechaToma: "2026-10-22",
    estado: "en-proceso",
    origen: "sede",
    examenes: [examen("tsh"), examen("glucosa")],
  }),
  orden({
    id: "ord-004",
    codigo: "SCR-100302",
    pacienteId: "pac-02",
    fechaToma: "2026-08-14",
    fechaProceso: "2026-08-15",
    estado: "lista",
    origen: "convenio",
    institucionId: "inst-01",
    examenes: [examen("urocultivo", { valor: "4.200" })],
  }),
  orden({
    id: "ord-005",
    codigo: "SCR-100318",
    pacienteId: "pac-03",
    fechaToma: "2026-10-23",
    estado: "remitida",
    origen: "sede",
    examenes: [examen("septina9")],
  }),
  orden({
    id: "ord-006",
    codigo: "SCR-100330",
    pacienteId: "pac-03",
    fechaToma: "2026-07-05",
    fechaProceso: "2026-07-07",
    estado: "lista",
    origen: "sede",
    examenes: [
      examen("hemograma", { valor: "11.2", fueraDeRango: true }),
      examen("pcrProteina", { valor: "8.1", fueraDeRango: true }),
    ],
  }),
  orden({
    id: "ord-007",
    codigo: "SCR-100344",
    pacienteId: "pac-04",
    fechaToma: "2026-10-24",
    estado: "en-proceso",
    origen: "domicilio",
    examenes: [examen("parcialOrina"), examen("urocultivo")],
  }),
  orden({
    id: "ord-008",
    codigo: "SCR-100350",
    pacienteId: "pac-04",
    fechaToma: "2026-06-11",
    fechaProceso: "2026-06-12",
    estado: "lista",
    origen: "sede",
    examenes: [examen("glucosa", { valor: "88" })],
  }),
  orden({
    id: "ord-009",
    codigo: "SCR-100362",
    pacienteId: "pac-05",
    fechaToma: "2026-05-02",
    fechaProceso: "2026-05-03",
    estado: "lista",
    origen: "sede",
    examenes: [examen("hemograma", { valor: "12.8" })],
  }),
  orden({
    id: "ord-010",
    codigo: "SCR-100375",
    pacienteId: "pac-06",
    fechaToma: "2026-10-18",
    fechaProceso: "2026-10-19",
    estado: "lista",
    origen: "convenio",
    institucionId: "inst-02",
    examenes: [
      examen("glucosa", { valor: "118", fueraDeRango: true }),
      examen("colesterol", { valor: "195" }),
    ],
  }),
  orden({
    id: "ord-011",
    codigo: "SCR-100389",
    pacienteId: "pac-06",
    fechaToma: "2026-10-24",
    estado: "remitida",
    origen: "convenio",
    institucionId: "inst-02",
    examenes: [examen("septina9")],
  }),
  orden({
    id: "ord-012",
    codigo: "SCR-100401",
    pacienteId: "pac-07",
    fechaToma: "2026-04-09",
    fechaProceso: "2026-04-10",
    estado: "lista",
    origen: "domicilio",
    examenes: [examen("papp", { valor: "1.8 MoM" })],
  }),
  orden({
    id: "ord-013",
    codigo: "SCR-100412",
    pacienteId: "pac-07",
    fechaToma: "2026-10-21",
    estado: "en-proceso",
    origen: "sede",
    examenes: [examen("tsh")],
  }),
  orden({
    id: "ord-014",
    codigo: "SCR-100428",
    pacienteId: "pac-08",
    fechaToma: "2026-03-15",
    fechaProceso: "2026-03-16",
    estado: "lista",
    origen: "sede",
    examenes: [
      examen("hemograma", { valor: "14.1" }),
      examen("glucosa", { valor: "95" }),
      examen("colesterol", { valor: "178" }),
    ],
  }),
  orden({
    id: "ord-015",
    codigo: "SCR-100440",
    pacienteId: "pac-08",
    fechaToma: "2026-10-23",
    estado: "remitida",
    origen: "sede",
    examenes: [examen("septina9")],
  }),
  orden({
    id: "ord-016",
    codigo: "SCR-100452",
    pacienteId: "pac-01",
    fechaToma: "2026-02-20",
    fechaProceso: "2026-02-21",
    estado: "lista",
    origen: "sede",
    examenes: [examen("parcialOrina")],
  }),
  orden({
    id: "ord-017",
    codigo: "SCR-100467",
    pacienteId: "pac-02",
    fechaToma: "2026-10-24",
    estado: "en-proceso",
    origen: "convenio",
    institucionId: "inst-01",
    examenes: [examen("pcrProteina")],
  }),
  orden({
    id: "ord-018",
    codigo: "SCR-100478",
    pacienteId: "pac-03",
    fechaToma: "2026-01-10",
    fechaProceso: "2026-01-11",
    estado: "lista",
    origen: "domicilio",
    examenes: [examen("tsh", { valor: "2.1" })],
  }),
  orden({
    id: "ord-019",
    codigo: "SCR-100490",
    pacienteId: "pac-04",
    fechaToma: "2026-10-22",
    estado: "en-proceso",
    origen: "sede",
    examenes: [examen("hemograma")],
  }),
  orden({
    id: "ord-020",
    codigo: "SCR-100503",
    pacienteId: "pac-05",
    fechaToma: "2026-09-29",
    fechaProceso: "2026-09-30",
    estado: "lista",
    origen: "sede",
    examenes: [examen("glucosa", { valor: "84" })],
  }),
  orden({
    id: "ord-021",
    codigo: "SCR-100515",
    pacienteId: "pac-06",
    fechaToma: "2026-08-02",
    fechaProceso: "2026-08-03",
    estado: "lista",
    origen: "convenio",
    institucionId: "inst-02",
    examenes: [examen("urocultivo", { valor: "2.100" })],
  }),
  orden({
    id: "ord-022",
    codigo: "SCR-100527",
    pacienteId: "pac-07",
    fechaToma: "2026-10-10",
    fechaProceso: "2026-10-11",
    estado: "lista",
    origen: "sede",
    examenes: [examen("colesterol", { valor: "201", fueraDeRango: true })],
  }),
  orden({
    id: "ord-023",
    codigo: "SCR-100538",
    pacienteId: "pac-08",
    fechaToma: "2026-10-23",
    estado: "en-proceso",
    origen: "domicilio",
    examenes: [examen("trigliceridos")],
  }),
  orden({
    id: "ord-024",
    codigo: "SCR-100550",
    pacienteId: "pac-01",
    fechaToma: "2026-10-24",
    estado: "remitida",
    origen: "sede",
    examenes: [examen("septina9")],
  }),
  orden({
    id: "ord-025",
    codigo: "SCR-100561",
    pacienteId: "pac-02",
    fechaToma: "2026-07-18",
    fechaProceso: "2026-07-19",
    estado: "lista",
    origen: "sede",
    examenes: [examen("hemograma", { valor: "15.0" })],
  }),
  orden({
    id: "ord-026",
    codigo: "SCR-100573",
    pacienteId: "pac-03",
    fechaToma: "2026-10-19",
    fechaProceso: "2026-10-20",
    estado: "lista",
    origen: "convenio",
    institucionId: "inst-01",
    examenes: [examen("parcialOrina")],
  }),
  orden({
    id: "ord-027",
    codigo: "SCR-100588",
    pacienteId: "pac-04",
    fechaToma: "2026-05-27",
    fechaProceso: "2026-05-28",
    estado: "lista",
    origen: "domicilio",
    examenes: [examen("glucosa", { valor: "79" })],
  }),
  orden({
    id: "ord-028",
    codigo: "SCR-100599",
    pacienteId: "pac-05",
    fechaToma: "2026-10-24",
    estado: "en-proceso",
    origen: "sede",
    examenes: [examen("tsh")],
  }),
  orden({
    id: "ord-029",
    codigo: "SCR-100610",
    pacienteId: "pac-06",
    fechaToma: "2026-03-03",
    fechaProceso: "2026-03-04",
    estado: "lista",
    origen: "sede",
    examenes: [examen("pcrProteina", { valor: "2.3" })],
  }),
  orden({
    id: "ord-030",
    codigo: "SCR-100624",
    pacienteId: "pac-07",
    fechaToma: "2026-10-23",
    estado: "remitida",
    origen: "domicilio",
    examenes: [examen("septina9")],
  }),
  // Dos órdenes más de convenio para que cada institución tenga al menos una
  // orden en cada estado — spec 02, tablero institucional.
  orden({
    id: "ord-031",
    codigo: "SCR-100635",
    pacienteId: "pac-04",
    fechaToma: "2026-10-24",
    estado: "remitida",
    origen: "convenio",
    institucionId: "inst-01",
    examenes: [examen("septina9")],
  }),
  orden({
    id: "ord-032",
    codigo: "SCR-100641",
    pacienteId: "pac-03",
    fechaToma: "2026-10-23",
    estado: "en-proceso",
    origen: "convenio",
    institucionId: "inst-02",
    examenes: [examen("tsh")],
  }),
];
