/**
 * Esqueleto de carga con la forma del contenido real, nunca una rueda
 * girando — ver docs/LINEA-GRAFICA.md §8.
 */
export function Esqueleto({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-lg bg-gris-200 ${className}`}
    />
  );
}

/** Esqueleto con la forma de una tabla de órdenes: filas de barras. */
export function EsqueletoTabla({ filas = 4 }: { filas?: number }) {
  return (
    <div
      className="flex flex-col gap-3 rounded-2xl border border-gris-200 p-4"
      role="status"
      aria-label="Cargando órdenes"
    >
      {Array.from({ length: filas }).map((_, indice) => (
        <div key={indice} className="flex items-center gap-4">
          <Esqueleto className="h-4 w-24" />
          <Esqueleto className="h-4 flex-1" />
          <Esqueleto className="h-4 w-20" />
          <Esqueleto className="h-6 w-24 rounded-full" />
        </div>
      ))}
    </div>
  );
}
