import { compilar } from "./src/compiler/compiler.js";

async function test(input, dir, expectedExitoso) {
  const r = await compilar(input, dir);
  const status = r.exitoso === expectedExitoso ? "OK" : "FAIL";
  const extra = r.tablaErrores?.length ? r.tablaErrores.map(e => `${e.tipo}:${e.descripcion}`).join(" | ") : "";
  console.log(status, dir, "|", input, "→", r.traduccion || "null", extra ? "| " + extra : "");
  if (r.exitoso !== expectedExitoso) console.log("  ⚠️  Expected exitoso=" + expectedExitoso + " got " + r.exitoso);
}

console.log("=== MEJORAS ===");
await test("el gatos corren rapido", "es-en", false);        // MEJORA 1
await test("arbol es verde", "es-en", true);                 // MEJORA 2
await test("corre el gato", "es-en", false);                 // MEJORA 3
await test("el gatos corren rapido", "es-en", false);        // MEJORA 4

console.log("\n=== REGRESION ===");
await test("mi color favorito es azul", "es-en", true);
await test("Se aproximan los indios por los cuatro puntos cardinales", "es-en", true);
await test("mi edad es tres", "es-en", true);
await test("mi numero favorito es tres", "es-en", true);
await test("mi color favorito es tres", "es-en", false);
await test("el mar es color camino", "es-en", false);
