import { createBrowserRouter } from "react-router";
import { LayoutRaiz } from "./layouts/LayoutRaiz";
import { LayoutPublico } from "./layouts/LayoutPublico";
import { LayoutPortal } from "./layouts/LayoutPortal";
import Ingreso from "./paginas/Ingreso";
import PacienteOrdenes from "./paginas/PacienteOrdenes";
import OrdenDetalle from "./paginas/OrdenDetalle";
import InstitucionTablero from "./paginas/InstitucionTablero";
import Agendar from "./paginas/Agendar";
import AgendarListo from "./paginas/AgendarListo";
import Cotizar from "./paginas/Cotizar";
import Privacidad from "./paginas/Privacidad";
import NoEncontrado from "./paginas/NoEncontrado";

export const rutas = createBrowserRouter([
  {
    Component: LayoutRaiz,
    children: [
      {
        Component: LayoutPublico,
        children: [
          { index: true, Component: Ingreso },
          { path: "agendar", Component: Agendar },
          { path: "agendar/listo/:codigo", Component: AgendarListo },
          { path: "cotizar", Component: Cotizar },
          { path: "privacidad", Component: Privacidad },
        ],
      },
      {
        Component: LayoutPortal,
        children: [
          { path: "paciente", Component: PacienteOrdenes },
          { path: "paciente/orden/:id", Component: OrdenDetalle },
          { path: "institucion", Component: InstitucionTablero },
          { path: "institucion/orden/:id", Component: OrdenDetalle },
        ],
      },
      { path: "*", Component: NoEncontrado },
    ],
  },
], {
  basename: import.meta.env.BASE_URL,
});
