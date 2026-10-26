import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { rutas } from "./rutas";
import { ProveedorSesion } from "./sesion/ContextoSesion";
import "./estilos/tema.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProveedorSesion>
      <RouterProvider router={rutas} />
    </ProveedorSesion>
  </StrictMode>,
);
