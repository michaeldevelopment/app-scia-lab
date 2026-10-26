import { useMemo, useState } from "react";
import { WarningCircle, WhatsappLogo } from "@phosphor-icons/react";
import { Tarjeta } from "../componentes/Tarjeta";
import { Boton } from "../componentes/Boton";
import { CATALOGO_COTIZADOR } from "../datos/fixtures";
import { useTitulo } from "../utilidades/useTitulo";

const WHATSAPP_SCIRE = "573043983662";

const formatoCop = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export default function Cotizar() {
  useTitulo("Cotizar exámenes");
  const [seleccionados, setSeleccionados] = useState<Set<string>>(new Set());

  function alternar(id: string) {
    setSeleccionados((anterior) => {
      const nuevo = new Set(anterior);
      if (nuevo.has(id)) {
        nuevo.delete(id);
      } else {
        nuevo.add(id);
      }
      return nuevo;
    });
  }

  const examenesSeleccionados = useMemo(
    () => CATALOGO_COTIZADOR.filter((examen) => seleccionados.has(examen.id)),
    [seleccionados],
  );

  const total = examenesSeleccionados.reduce(
    (suma, examen) => suma + examen.precioEjemploCop,
    0,
  );

  const enlaceWhatsApp = useMemo(() => {
    if (examenesSeleccionados.length === 0) return null;
    const lineas = examenesSeleccionados
      .map((examen) => `• ${examen.nombre}`)
      .join("\n");
    const mensaje =
      `Hola, quiero cotizar estos exámenes con Scire:\n${lineas}\n\n` +
      `Total de ejemplo en la demo: ${formatoCop.format(total)}. ` +
      `Les escribo para confirmar precio y disponibilidad.`;
    return `https://wa.me/${WHATSAPP_SCIRE}?text=${encodeURIComponent(mensaje)}`;
  }, [examenesSeleccionados, total]);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <h1
          tabIndex={-1}
          className="text-3xl font-semibold text-azul-700 outline-none"
        >
          Cotizar exámenes
        </h1>
        <p className="mt-1 text-gris-600">
          Selecciona los exámenes que te interesan para armar una cotización.
        </p>
      </div>

      <div
        role="alert"
        className="flex items-start gap-2 rounded-2xl border border-rojo-200 bg-rojo-50 px-4 py-3 text-sm text-rojo-700"
      >
        <WarningCircle
          size={18}
          weight="fill"
          className="mt-0.5 shrink-0"
          aria-hidden="true"
        />
        <p>
          <strong>Precios de ejemplo.</strong> Scire todavía no nos ha
          confirmado sus tarifas reales. Los valores de esta pantalla son
          solo para mostrar cómo funcionaría el cotizador y no se pueden usar
          para cobrar ni prometer un precio a nadie.
        </p>
      </div>

      <Tarjeta className="flex flex-col divide-y divide-gris-200 p-0">
        {CATALOGO_COTIZADOR.map((examen) => {
          const marcado = seleccionados.has(examen.id);
          return (
            <label
              key={examen.id}
              className="flex cursor-pointer items-center justify-between gap-4 px-6 py-4 transition-colors duration-700 ease-fluida hover:bg-azul-50"
            >
              <span className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={marcado}
                  onChange={() => alternar(examen.id)}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-gris-200 text-rojo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-600"
                />
                <span>
                  <span className="block font-semibold text-gris-900">
                    {examen.nombre}
                  </span>
                  <span className="block text-sm text-gris-500">
                    {examen.area}
                  </span>
                </span>
              </span>
              <span className="whitespace-nowrap text-right font-mono text-sm text-gris-900">
                {formatoCop.format(examen.precioEjemploCop)}
                <span className="block text-xs font-sans font-semibold uppercase tracking-wide text-rojo-600">
                  Ejemplo
                </span>
              </span>
            </label>
          );
        })}
      </Tarjeta>

      <Tarjeta className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gris-900">
              Total ({examenesSeleccionados.length}{" "}
              {examenesSeleccionados.length === 1 ? "examen" : "exámenes"})
            </p>
            <p className="text-xs font-semibold uppercase tracking-wide text-rojo-600">
              Valor de ejemplo, no es una tarifa real
            </p>
          </div>
          <p className="font-mono text-2xl font-semibold text-gris-900">
            {formatoCop.format(total)}
          </p>
        </div>

        <Boton
          variante="primario"
          disabled={!enlaceWhatsApp}
          onClick={() => {
            if (enlaceWhatsApp) {
              window.open(enlaceWhatsApp, "_blank", "noopener,noreferrer");
            }
          }}
          title={
            enlaceWhatsApp
              ? undefined
              : "Selecciona al menos un examen para continuar"
          }
        >
          <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
          Enviar cotización por WhatsApp
        </Boton>
      </Tarjeta>
    </div>
  );
}
