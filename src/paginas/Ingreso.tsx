import { useId, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { Buildings, User } from "@phosphor-icons/react";
import { Tarjeta } from "../componentes/Tarjeta";
import { Campo } from "../componentes/Campo";
import { Boton } from "../componentes/Boton";
import { ErrorEnLinea } from "../componentes/ErrorEnLinea";
import { useSesion } from "../sesion/ContextoSesion";
import {
  institucionPorIdentificacion,
  pacientePorDocumento,
} from "../datos/consultas";
import { useTitulo } from "../utilidades/useTitulo";
import type { Paciente } from "../datos/tipos";

type Pestana = "paciente" | "institucion";

const TIPOS_DOCUMENTO: Paciente["tipoDocumento"][] = ["CC", "TI", "CE", "PA"];

export default function Ingreso() {
  useTitulo("Consulta tu resultado");
  const [pestana, setPestana] = useState<Pestana>("paciente");

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6">
      <div>
        <h1
          tabIndex={-1}
          className="text-3xl font-semibold text-azul-700 outline-none"
        >
          Consulta tu resultado
        </h1>
        <p className="mt-1 text-gris-600">
          Entra con tu documento para ver tus órdenes de Scire.
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Tipo de ingreso"
        className="flex rounded-xl border border-gris-200 bg-white p-1"
      >
        <BotonPestana
          activo={pestana === "paciente"}
          onClick={() => setPestana("paciente")}
          icono={User}
        >
          Paciente
        </BotonPestana>
        <BotonPestana
          activo={pestana === "institucion"}
          onClick={() => setPestana("institucion")}
          icono={Buildings}
        >
          Institución
        </BotonPestana>
      </div>

      <Tarjeta role="tabpanel">
        {pestana === "paciente" && <FormularioIngresoPaciente />}
        {pestana === "institucion" && <FormularioIngresoInstitucion />}
      </Tarjeta>

      <p className="text-center text-sm text-gris-500">
        ¿No tienes una orden todavía?{" "}
        <Link
          to="/agendar"
          className="font-semibold text-azul-600 underline underline-offset-2"
        >
          Agenda una toma domiciliaria
        </Link>{" "}
        o{" "}
        <Link
          to="/cotizar"
          className="font-semibold text-azul-600 underline underline-offset-2"
        >
          cotiza un examen
        </Link>
        .
      </p>
    </div>
  );
}

function BotonPestana({
  activo,
  onClick,
  children,
  icono: Icono,
  disabled,
  titulo,
}: {
  activo: boolean;
  onClick: () => void;
  children: string;
  icono: typeof User;
  disabled?: boolean;
  titulo?: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={activo}
      disabled={disabled}
      title={titulo}
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold
        transition-all duration-700 ease-fluida
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-600
        disabled:cursor-not-allowed disabled:text-gris-500 disabled:opacity-60
        ${activo ? "bg-azul-500 text-white" : "text-gris-600 hover:bg-azul-50"}`}
    >
      <Icono size={16} weight="bold" aria-hidden="true" />
      {children}
    </button>
  );
}

function FormularioIngresoPaciente() {
  const idFormulario = useId();
  const navigate = useNavigate();
  const { iniciarSesionPaciente } = useSesion();

  const [tipoDocumento, setTipoDocumento] =
    useState<Paciente["tipoDocumento"]>("CC");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [errores, setErrores] = useState<{
    numeroDocumento?: string;
    fechaNacimiento?: string;
    general?: string;
  }>({});

  function manejarEnvio(evento: FormEvent) {
    evento.preventDefault();

    const nuevosErrores: typeof errores = {};
    if (!numeroDocumento.trim()) {
      nuevosErrores.numeroDocumento = "Escribe tu número de documento.";
    }
    if (!fechaNacimiento) {
      nuevosErrores.fechaNacimiento = "Escribe tu fecha de nacimiento.";
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    const paciente = pacientePorDocumento(tipoDocumento, numeroDocumento);

    if (!paciente || paciente.fechaNacimiento !== fechaNacimiento) {
      setErrores({
        general:
          "No encontramos una orden con ese documento y esa fecha de nacimiento. Revisa los datos o contáctanos por WhatsApp.",
      });
      return;
    }

    setErrores({});
    iniciarSesionPaciente(paciente.id);
    navigate("/paciente");
  }

  return (
    <form
      onSubmit={manejarEnvio}
      className="flex flex-col gap-4"
      aria-labelledby={`${idFormulario}-titulo`}
      noValidate
    >
      <h2 id={`${idFormulario}-titulo`} className="sr-only">
        Ingreso de paciente
      </h2>

      <div className="flex flex-col gap-1">
        <label
          htmlFor={`${idFormulario}-tipo`}
          className="text-sm font-semibold text-gris-900"
        >
          Tipo de documento
        </label>
        <select
          id={`${idFormulario}-tipo`}
          value={tipoDocumento}
          onChange={(evento) =>
            setTipoDocumento(evento.target.value as Paciente["tipoDocumento"])
          }
          className="rounded-lg border border-gris-200 px-3 py-2 text-base text-gris-900 transition-all duration-700 ease-fluida focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-600"
        >
          {TIPOS_DOCUMENTO.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
      </div>

      <Campo
        etiqueta="Número de documento"
        inputMode="numeric"
        value={numeroDocumento}
        onChange={(evento) => setNumeroDocumento(evento.target.value)}
        error={errores.numeroDocumento}
        autoComplete="off"
      />

      <Campo
        etiqueta="Fecha de nacimiento"
        type="date"
        value={fechaNacimiento}
        onChange={(evento) => setFechaNacimiento(evento.target.value)}
        error={errores.fechaNacimiento}
      />

      {errores.general && <ErrorEnLinea>{errores.general}</ErrorEnLinea>}

      <Boton type="submit" className="mt-2 w-full">
        Ver mis resultados
      </Boton>
    </form>
  );
}

function FormularioIngresoInstitucion() {
  const idFormulario = useId();
  const navigate = useNavigate();
  const { iniciarSesionInstitucion } = useSesion();

  const [identificacionConvenio, setIdentificacionConvenio] = useState("");
  const [errores, setErrores] = useState<{
    identificacionConvenio?: string;
    general?: string;
  }>({});

  function manejarEnvio(evento: FormEvent) {
    evento.preventDefault();

    if (!identificacionConvenio.trim()) {
      setErrores({
        identificacionConvenio: "Escribe la identificación de tu convenio.",
      });
      return;
    }

    const institucion = institucionPorIdentificacion(identificacionConvenio);

    if (!institucion) {
      setErrores({
        general:
          "No encontramos un convenio con esa identificación. Revisa el dato o contáctanos por WhatsApp.",
      });
      return;
    }

    setErrores({});
    iniciarSesionInstitucion(institucion.id);
    navigate("/institucion");
  }

  return (
    <form
      onSubmit={manejarEnvio}
      className="flex flex-col gap-4"
      aria-labelledby={`${idFormulario}-titulo`}
      noValidate
    >
      <h2 id={`${idFormulario}-titulo`} className="sr-only">
        Ingreso de institución
      </h2>

      <Campo
        etiqueta="Identificación del convenio"
        value={identificacionConvenio}
        onChange={(evento) => setIdentificacionConvenio(evento.target.value)}
        error={errores.identificacionConvenio}
        textoAyuda="El código que Scire te asignó al firmar el convenio, por ejemplo CONV-4471."
        autoComplete="off"
      />

      {errores.general && <ErrorEnLinea>{errores.general}</ErrorEnLinea>}

      <Boton type="submit" className="mt-2 w-full">
        Ver órdenes del convenio
      </Boton>
    </form>
  );
}
