import { useNavigate, useParams } from "react-router";
import { CheckCircle } from "@phosphor-icons/react";
import { Tarjeta } from "../componentes/Tarjeta";
import { Boton } from "../componentes/Boton";
import { useTitulo } from "../utilidades/useTitulo";

export default function AgendarListo() {
  const { codigo } = useParams<{ codigo: string }>();
  const navigate = useNavigate();
  useTitulo("Solicitud enviada");

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-estado-lista-fondo text-estado-lista-texto">
        <CheckCircle size={28} weight="bold" aria-hidden="true" />
      </span>

      <div>
        <h1
          tabIndex={-1}
          className="text-3xl font-semibold text-azul-700 outline-none"
        >
          Solicitud enviada
        </h1>
        <p className="mt-1 text-gris-600">
          Guarda este número de solicitud. Un asesor de Scire se comunicará
          contigo al teléfono que registraste para confirmar la fecha y el
          horario de la toma.
        </p>
      </div>

      <Tarjeta className="w-full">
        <p className="text-sm text-gris-500">Número de solicitud</p>
        <p className="font-mono text-2xl font-semibold text-gris-900">
          {codigo ?? "—"}
        </p>
      </Tarjeta>

      <Boton variante="secundario" onClick={() => navigate("/")}>
        Volver al inicio
      </Boton>
    </div>
  );
}
