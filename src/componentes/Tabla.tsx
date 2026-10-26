import type { ReactNode } from "react";

export interface ColumnaTabla<T> {
  encabezado: string;
  renderizar: (fila: T) => ReactNode;
  /** Clase adicional para la celda, por ejemplo alinear números a la derecha. */
  claseCelda?: string;
}

interface TablaProps<T> {
  columnas: ColumnaTabla<T>[];
  filas: T[];
  obtenerLlave: (fila: T) => string;
  onFilaClic?: (fila: T) => void;
  etiquetaFilaClic?: (fila: T) => string;
}

/**
 * Tabla genérica reutilizada por la lista del paciente, el detalle y
 * (en la spec 02) el tablero institucional. Una sola definición: si cambia
 * aquí, cambia en todas las pantallas — ver docs/TECH-SPEC.md.
 */
export function Tabla<T>({
  columnas,
  filas,
  obtenerLlave,
  onFilaClic,
  etiquetaFilaClic,
}: TablaProps<T>) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gris-200">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-gris-200 bg-gris-50">
            {columnas.map((columna) => (
              <th
                key={columna.encabezado}
                scope="col"
                className="px-4 py-3 font-semibold text-gris-600"
              >
                {columna.encabezado}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((fila) => {
            const llave = obtenerLlave(fila);
            const esClicable = Boolean(onFilaClic);
            return (
              <tr
                key={llave}
                onClick={esClicable ? () => onFilaClic?.(fila) : undefined}
                onKeyDown={
                  esClicable
                    ? (evento) => {
                        if (evento.key === "Enter" || evento.key === " ") {
                          evento.preventDefault();
                          onFilaClic?.(fila);
                        }
                      }
                    : undefined
                }
                tabIndex={esClicable ? 0 : undefined}
                role={esClicable ? "button" : undefined}
                aria-label={esClicable ? etiquetaFilaClic?.(fila) : undefined}
                className={`border-b border-gris-200 last:border-b-0 transition-colors duration-700 ease-fluida
                  ${esClicable ? "cursor-pointer hover:bg-azul-50 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-azul-600" : ""}`}
              >
                {columnas.map((columna) => (
                  <td
                    key={columna.encabezado}
                    className={`px-4 py-3 text-gris-900 ${columna.claseCelda ?? ""}`}
                  >
                    {columna.renderizar(fila)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
