import { Info } from "@phosphor-icons/react";

/**
 * Franja permanente que marca el entorno completo como demostración, en vez
 * de marcar cada dato por separado. Nadie puede confundir esto con el portal
 * real del laboratorio — ver memoria/portal-demo-decisiones.md.
 */
export function FranjaDemo() {
  return (
    <div className="bg-azul-800 px-4 py-2 text-center text-sm text-white">
      <p className="mx-auto flex max-w-5xl items-center justify-center gap-2">
        <Info size={16} weight="fill" aria-hidden="true" />
        Entorno de demostración. Pacientes, órdenes y resultados son
        ficticios y no corresponden a personas reales.
      </p>
    </div>
  );
}
