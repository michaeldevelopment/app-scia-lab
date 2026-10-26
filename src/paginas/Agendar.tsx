import { useId, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { Tarjeta } from "../componentes/Tarjeta";
import { Campo } from "../componentes/Campo";
import { Boton } from "../componentes/Boton";
import { ErrorEnLinea } from "../componentes/ErrorEnLinea";
import { useTitulo } from "../utilidades/useTitulo";

const OPCIONES_PROCEDIMIENTO = [
  "Análisis clínico general (sangre, orina, heces)",
  "Tamizaje prenatal",
  "Biología molecular (VPH, ETS, otros paneles)",
  "Genética y genómica",
  "Prueba de paternidad / ADN",
  "No estoy seguro, prefiero que me asesoren",
] as const;

const PATRON_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Admite +57, espacios y guiones; exige al menos 7 dígitos.
const PATRON_TELEFONO = /^\+?[\d\s-]{7,15}$/;

interface Errores {
  nombres?: string;
  apellidos?: string;
  fecha?: string;
  direccion?: string;
  barrio?: string;
  correo?: string;
  telefono?: string;
  procedimiento?: string;
  autorizacion?: string;
}

function generarCodigoSolicitud(): string {
  const aleatorio = Math.random().toString(36).toUpperCase().slice(2, 8);
  return `AG-${aleatorio}`;
}

export default function Agendar() {
  useTitulo("Agendar toma domiciliaria");
  const idFormulario = useId();
  const navigate = useNavigate();

  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [fecha, setFecha] = useState("");
  const [direccion, setDireccion] = useState("");
  const [barrio, setBarrio] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [procedimiento, setProcedimiento] = useState("");
  const [autorizacion, setAutorizacion] = useState(false);
  const [errores, setErrores] = useState<Errores>({});

  const hoy = new Date().toISOString().slice(0, 10);

  function manejarEnvio(evento: FormEvent) {
    evento.preventDefault();

    const nuevosErrores: Errores = {};
    if (!nombres.trim()) nuevosErrores.nombres = "Escribe tu nombre.";
    if (!apellidos.trim()) nuevosErrores.apellidos = "Escribe tu apellido.";
    if (!fecha) nuevosErrores.fecha = "Elige una fecha para la toma.";
    if (!direccion.trim()) nuevosErrores.direccion = "Escribe la dirección.";
    if (!barrio.trim()) nuevosErrores.barrio = "Escribe el barrio.";
    if (!correo.trim()) {
      nuevosErrores.correo = "Escribe tu correo.";
    } else if (!PATRON_CORREO.test(correo.trim())) {
      nuevosErrores.correo = "Ese correo no parece válido. Revisa el formato.";
    }
    if (!telefono.trim()) {
      nuevosErrores.telefono = "Escribe tu teléfono.";
    } else if (!PATRON_TELEFONO.test(telefono.trim())) {
      nuevosErrores.telefono =
        "Ese teléfono no parece válido. Usa solo números, espacios o guiones.";
    }
    if (!procedimiento) {
      nuevosErrores.procedimiento = "Elige el tipo de procedimiento.";
    }
    if (!autorizacion) {
      nuevosErrores.autorizacion =
        "Debes autorizar el tratamiento de tus datos para continuar.";
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    setErrores({});
    const codigo = generarCodigoSolicitud();
    navigate(`/agendar/listo/${codigo}`);
  }

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6">
      <div>
        <h1
          tabIndex={-1}
          className="text-3xl font-semibold text-azul-700 outline-none"
        >
          Agendar toma domiciliaria
        </h1>
        <p className="mt-1 text-gris-600">
          Desplazamos personal asistencial hasta el lugar que nos indiques.
          Completa tus datos y te confirmamos.
        </p>
      </div>

      <Tarjeta>
        <form
          onSubmit={manejarEnvio}
          className="flex flex-col gap-4"
          aria-labelledby={`${idFormulario}-titulo`}
          noValidate
        >
          <h2 id={`${idFormulario}-titulo`} className="sr-only">
            Datos para la toma domiciliaria
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Campo
              etiqueta="Nombres"
              value={nombres}
              onChange={(evento) => setNombres(evento.target.value)}
              error={errores.nombres}
              autoComplete="given-name"
            />
            <Campo
              etiqueta="Apellidos"
              value={apellidos}
              onChange={(evento) => setApellidos(evento.target.value)}
              error={errores.apellidos}
              autoComplete="family-name"
            />
          </div>

          <Campo
            etiqueta="Fecha deseada para la toma"
            type="date"
            min={hoy}
            value={fecha}
            onChange={(evento) => setFecha(evento.target.value)}
            error={errores.fecha}
          />

          <Campo
            etiqueta="Dirección"
            value={direccion}
            onChange={(evento) => setDireccion(evento.target.value)}
            error={errores.direccion}
            autoComplete="street-address"
            placeholder="Calle, carrera, número"
          />

          <Campo
            etiqueta="Barrio"
            value={barrio}
            onChange={(evento) => setBarrio(evento.target.value)}
            error={errores.barrio}
            textoAyuda="Escribe el barrio o la urbanización. Por ahora no confirmamos cobertura por zona: te contactamos para coordinar."
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Campo
              etiqueta="Correo"
              type="email"
              value={correo}
              onChange={(evento) => setCorreo(evento.target.value)}
              error={errores.correo}
              autoComplete="email"
            />
            <Campo
              etiqueta="Teléfono"
              type="tel"
              value={telefono}
              onChange={(evento) => setTelefono(evento.target.value)}
              error={errores.telefono}
              autoComplete="tel"
              placeholder="304 398 3662"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor={`${idFormulario}-procedimiento`}
              className="text-sm font-semibold text-gris-900"
            >
              Tipo de procedimiento
            </label>
            <select
              id={`${idFormulario}-procedimiento`}
              value={procedimiento}
              onChange={(evento) => setProcedimiento(evento.target.value)}
              aria-invalid={errores.procedimiento ? true : undefined}
              className={`rounded-lg border px-3 py-2 text-base text-gris-900 transition-all duration-700 ease-fluida focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-600 ${
                errores.procedimiento ? "border-rojo-500" : "border-gris-200"
              }`}
            >
              <option value="">Selecciona una opción</option>
              {OPCIONES_PROCEDIMIENTO.map((opcion) => (
                <option key={opcion} value={opcion}>
                  {opcion}
                </option>
              ))}
            </select>
            {errores.procedimiento && (
              <ErrorEnLinea>{errores.procedimiento}</ErrorEnLinea>
            )}
          </div>

          <div className="flex flex-col gap-1 border-t border-gris-200 pt-4">
            <label className="flex items-start gap-2 text-sm text-gris-900">
              <input
                type="checkbox"
                checked={autorizacion}
                onChange={(evento) => setAutorizacion(evento.target.checked)}
                aria-invalid={errores.autorizacion ? true : undefined}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-gris-200 text-rojo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-600"
              />
              <span>
                Autorizo a Scire Clinical Diagnosis el tratamiento de mis
                datos personales para coordinar esta toma de muestra, según la{" "}
                <a
                  href="/privacidad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-azul-600 underline"
                >
                  política de tratamiento de datos
                </a>
                .
              </span>
            </label>
            {errores.autorizacion && (
              <ErrorEnLinea>{errores.autorizacion}</ErrorEnLinea>
            )}
          </div>

          <Boton type="submit" className="mt-2 w-full">
            Enviar solicitud
          </Boton>
        </form>
      </Tarjeta>
    </div>
  );
}
