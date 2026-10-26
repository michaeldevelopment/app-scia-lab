// Sesión simulada. No hay autenticación real: es un prototipo navegable.
// Persiste en sessionStorage para sobrevivir un refresh durante el preview
// con el cliente (ver docs/TECH-SPEC.md "Tres detalles de SPA que suelen
// romperse"). Lectura y escritura van en try/catch porque sessionStorage
// puede fallar en navegación privada.

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const CLAVE_SESION = "scire-demo-sesion";

export interface SesionPaciente {
  tipo: "paciente";
  pacienteId: string;
}

export interface SesionInstitucion {
  tipo: "institucion";
  institucionId: string;
}

export type Sesion = SesionPaciente | SesionInstitucion | null;

interface ContextoSesionValor {
  sesion: Sesion;
  iniciarSesionPaciente: (pacienteId: string) => void;
  iniciarSesionInstitucion: (institucionId: string) => void;
  cerrarSesion: () => void;
}

const ContextoSesion = createContext<ContextoSesionValor | undefined>(
  undefined,
);

function leerSesionGuardada(): Sesion {
  try {
    const crudo = window.sessionStorage.getItem(CLAVE_SESION);
    if (!crudo) return null;
    const datos = JSON.parse(crudo) as Sesion;
    if (
      datos &&
      datos.tipo === "paciente" &&
      typeof datos.pacienteId === "string"
    ) {
      return datos;
    }
    if (
      datos &&
      datos.tipo === "institucion" &&
      typeof datos.institucionId === "string"
    ) {
      return datos;
    }
    return null;
  } catch {
    // sessionStorage no disponible (navegación privada u otro bloqueo).
    // La demo sigue funcionando, solo no sobrevive a un refresh.
    return null;
  }
}

function guardarSesion(sesion: Sesion) {
  try {
    if (sesion) {
      window.sessionStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
    } else {
      window.sessionStorage.removeItem(CLAVE_SESION);
    }
  } catch {
    // Igual que en la lectura: se ignora, no se interrumpe la demo.
  }
}

export function ProveedorSesion({ children }: { children: ReactNode }) {
  const [sesion, setSesion] = useState<Sesion>(() => leerSesionGuardada());

  const iniciarSesionPaciente = useCallback((pacienteId: string) => {
    const nueva: Sesion = { tipo: "paciente", pacienteId };
    setSesion(nueva);
    guardarSesion(nueva);
  }, []);

  const iniciarSesionInstitucion = useCallback((institucionId: string) => {
    const nueva: Sesion = { tipo: "institucion", institucionId };
    setSesion(nueva);
    guardarSesion(nueva);
  }, []);

  const cerrarSesion = useCallback(() => {
    setSesion(null);
    guardarSesion(null);
  }, []);

  const valor = useMemo(
    () => ({
      sesion,
      iniciarSesionPaciente,
      iniciarSesionInstitucion,
      cerrarSesion,
    }),
    [sesion, iniciarSesionPaciente, iniciarSesionInstitucion, cerrarSesion],
  );

  return (
    <ContextoSesion.Provider value={valor}>
      {children}
    </ContextoSesion.Provider>
  );
}

export function useSesion(): ContextoSesionValor {
  const contexto = useContext(ContextoSesion);
  if (!contexto) {
    throw new Error("useSesion debe usarse dentro de <ProveedorSesion>");
  }
  return contexto;
}
