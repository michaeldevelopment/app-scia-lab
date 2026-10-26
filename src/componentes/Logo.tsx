/**
 * Marca de Scire para la interfaz.
 *
 * El cliente no ha entregado el logo en vectorial (solo existe un PNG de
 * 301×111, ver docs/LINEA-GRAFICA.md §1 y §11). Mientras llega, esta es una
 * reconstrucción simplificada del isotipo (gota de muestra) con los colores
 * del logotipo horizontal, que es el que se tomó como canónico.
 *
 * La itálica del logotipo original vive solo en esa imagen: en la interfaz
 * nunca hay cursivas (LINEA-GRAFICA.md §3), así que el texto aquí va en
 * Manrope semibold, sin itálica.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 40 40"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M20 2 L32 20 C32 27.2 26.2 33 19 33 C11.8 33 6 27.2 6 20 C6 14 20 2 20 2 Z"
          fill="var(--color-rojo-500)"
        />
        <circle cx="19" cy="21" r="9" fill="white" />
        <circle cx="19" cy="21" r="6.5" fill="var(--color-azul-500)" opacity="0.18" />
        <circle cx="19" cy="21" r="3.2" fill="var(--color-azul-500)" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-lg font-semibold text-rojo-600">Scire</span>
        <span className="text-xs font-semibold tracking-widest text-azul-600">
          CLINICAL DIAGNOSIS
        </span>
      </span>
    </span>
  );
}
