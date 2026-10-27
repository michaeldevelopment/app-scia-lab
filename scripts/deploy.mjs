// Compila el proyecto y copia el resultado a la raiz del repo, para que
// GitHub Pages lo sirva directo desde main/root (sin GitHub Actions).
//
// Que hace, en orden:
//   1. Guarda el index.html de desarrollo actual en index.dev.html (respaldo).
//   2. Corre `npm run build` (tsc + vite build) -> dist/.
//   3. Copia dist/assets, dist/index.html, dist/favicon.svg a la raiz,
//      pisando el index.html de desarrollo con el compilado.
//   4. Copia el index.html compilado tambien a 404.html (fallback de SPA).
//
// Despues de correrlo: `git add -A && git commit && git push` a mano.
// Para volver a desarrollar: `npm run dev:restore` restaura el index.html de
// desarrollo desde el respaldo (index.dev.html) antes de `npm run dev`.

import { execSync } from "node:child_process";
import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const paso = (n, msg) => console.log(`[${n}/4] ${msg}`);

paso(1, "Respaldando index.html de desarrollo en index.dev.html...");
writeFileSync("index.dev.html", readFileSync("index.html", "utf8"));

paso(2, "Compilando (tsc -b && vite build)...");
execSync("npm run build", { stdio: "inherit" });

paso(3, "Copiando dist/ a la raiz del repo...");
if (existsSync("assets")) rmSync("assets", { recursive: true, force: true });
cpSync("dist/assets", "assets", { recursive: true });
cpSync("dist/index.html", "index.html");
if (existsSync("dist/favicon.svg")) cpSync("dist/favicon.svg", "favicon.svg");

paso(4, "Generando 404.html para el fallback de SPA...");
cpSync("dist/index.html", "404.html");

console.log("\nListo. Revisa `git status`, luego:");
console.log("  git add -A && git commit -m \"deploy\" && git push");
console.log("\nCuando quieras volver a desarrollar: npm run dev:restore");
