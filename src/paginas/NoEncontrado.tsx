import { useNavigate } from "react-router";
import { CompassTool } from "@phosphor-icons/react";
import { Logo } from "../componentes/Logo";
import { Boton } from "../componentes/Boton";
import { useTitulo } from "../utilidades/useTitulo";

export default function NoEncontrado() {
  useTitulo("Página no encontrada");
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center gap-6 px-4 text-center">
      <Logo />
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-azul-100 text-azul-600">
        <CompassTool size={28} weight="bold" aria-hidden="true" />
      </span>
      <div>
        <h1
          tabIndex={-1}
          className="text-3xl font-semibold text-azul-700 outline-none"
        >
          No encontramos esta página
        </h1>
        <p className="mt-1 text-gris-600">
          La dirección puede estar mal escrita, o esta pantalla no existe en
          este entorno de demostración.
        </p>
      </div>
      <Boton onClick={() => navigate("/")}>Volver al inicio</Boton>
    </div>
  );
}
