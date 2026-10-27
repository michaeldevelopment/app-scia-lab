// Restaura el index.html de desarrollo despues de un `npm run deploy`.
// El deploy pisa index.html con el build compilado para que GitHub Pages lo
// sirva desde main/root; este script lo regresa a la version fuente
// (guardada en index.dev.html) para que `npm run dev` vuelva a funcionar.

import { cpSync, existsSync } from "node:fs";

if (!existsSync("index.dev.html")) {
  console.error("No existe index.dev.html todavia. Corre `npm run deploy` al menos una vez.");
  process.exit(1);
}

cpSync("index.dev.html", "index.html");
console.log("index.html restaurado a la version de desarrollo.");
