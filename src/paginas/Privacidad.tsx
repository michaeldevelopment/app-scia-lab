import { Info } from "@phosphor-icons/react";
import { useTitulo } from "../utilidades/useTitulo";

/**
 * Aviso de tratamiento de datos. Scire todavía no nos ha entregado una
 * política redactada (ver memoria/preguntas-abiertas.md), así que este es un
 * borrador genérico para que el enlace del formulario de agendamiento abra
 * algo real en la demo. No reemplaza la política que el laboratorio debe
 * publicar y revisar con su propio equipo legal.
 */
export default function Privacidad() {
  useTitulo("Política de tratamiento de datos");

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <h1
          tabIndex={-1}
          className="text-3xl font-semibold text-azul-700 outline-none"
        >
          Política de tratamiento de datos
        </h1>
        <p className="mt-1 text-gris-600">
          Aviso de privacidad para el formulario de agendamiento de este
          entorno de demostración.
        </p>
      </div>

      <div className="flex items-start gap-2 rounded-2xl border border-estado-remitida-texto/20 bg-estado-remitida-fondo px-4 py-3 text-sm text-estado-remitida-texto">
        <Info size={18} weight="fill" className="mt-0.5 shrink-0" aria-hidden="true" />
        <p>
          Este texto es un borrador de referencia para la demo. Scire
          Clinical Diagnosis todavía no nos ha entregado una política de
          tratamiento de datos redactada, y esta página no la reemplaza.
          Antes de publicar algo así en producción, el laboratorio debe
          revisarlo con su propio equipo legal.
        </p>
      </div>

      <div className="flex flex-col gap-4 text-gris-900">
        <section>
          <h2 className="text-xl font-semibold text-gris-900">
            Qué datos pedimos
          </h2>
          <p className="mt-1 text-gris-600">
            En el formulario de agendamiento pedimos nombre, dirección,
            barrio, correo, teléfono y el tipo de procedimiento que
            necesitas. No pedimos información sobre tu estado de salud ni
            resultados de exámenes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gris-900">
            Para qué los usamos
          </h2>
          <p className="mt-1 text-gris-600">
            Únicamente para coordinar la toma domiciliaria que solicitaste:
            confirmar fecha, horario y dirección.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gris-900">
            Marco legal
          </h2>
          <p className="mt-1 text-gris-600">
            El tratamiento de datos personales en Colombia se rige por la Ley
            1581 de 2012 y sus decretos reglamentarios. Como titular de tus
            datos, puedes conocer, actualizar, rectificar o solicitar la
            eliminación de tu información en cualquier momento.
          </p>
        </section>
      </div>
    </div>
  );
}
