// ============================================================
//  compiler.js
//  Módulo Principal — Compilador Traductor Bidireccional
//  Proyecto Grupal Compiladores 2026
//  Universidad Mariano Gálvez de Guatemala
// ============================================================
//
//  Este módulo une todas las fases del compilador:
//
//  FASE 1 — Análisis Léxico      (lexer.js)
//  FASE 2 — Análisis Sintáctico  (parser.js)
//  FASE 3 — Análisis Semántico   (semantic.js)
//  FASE 4 — Síntesis/Traducción  (translator.js)
//
//  USO:
//    import { compilar } from "./compiler.js";
//    const resultado = compilar("The cat runs fast");
//
//  RESULTADO:
//    {
//      entrada:        "The cat runs fast",
//      traduccion:     "El gato corre rápido.",
//      tipoOracion:    "Declarativa",
//      tablaSimbolos:  [...],
//      tablaErrores:   [...],
//      tokens:         [...],
//      exitoso:        true,
//      faseExitosa:    "semantico" | "sintactico" | "lexico" | "ninguna"
//    }
//
// ============================================================

// ─────────────────────────────────────────────
// Importar todos los módulos
// ─────────────────────────────────────────────
import { analizarLexico, generarTablaSimbolos, generarTablaErrores } from "./lexer.js";
import { analizarSintactico, imprimirArbol } from "./parser.js";
import { analizarSemantico } from "./semantic/index.js";
import { generarTraduccion } from "./translator.js";

const _analizarLexico      = analizarLexico;
const _generarTablaSimbolos= generarTablaSimbolos;
const _generarTablaErrores = generarTablaErrores;
const _analizarSintactico  = analizarSintactico;
const _imprimirArbol       = imprimirArbol;
const _analizarSemantico   = analizarSemantico;
const _generarTraduccion   = generarTraduccion;

// ─────────────────────────────────────────────
// FUNCIÓN PRINCIPAL: compilar
// Recibe: texto en inglés (string)
// Retorna: objeto completo con todos los resultados
// ─────────────────────────────────────────────
async function compilar(texto, direccion = "es-en") {

  // Validar entrada
  if (!texto || typeof texto !== "string" || texto.trim() === "") {
    return {
      entrada:       texto || "",
      traduccion:    null,
      tipoOracion:   null,
      tablaSimbolos: [],
      tablaErrores:  [{ numero: 1, tipo: "Léxico", palabra: "", posicion: 0, descripcion: "El texto de entrada está vacío." }],
      tokens:        [],
      arbol:         null,
      exitoso:       false,
      faseExitosa:   "ninguna",
      resumen:       { lexico: false, sintactico: false, semantico: false, traduccion: false }
    };
  }

  // ── FASE 1: Análisis Léxico ───────────────
  const resLexico = await _analizarLexico(texto, direccion);
  const tablaSimbolos = _generarTablaSimbolos(resLexico.tokens);
  const erroresLexicos = resLexico.errors;

  // ── FASE 2: Análisis Sintáctico ───────────
  let resSintactico = { arbol: null, errors: [], tipoOracion: null };
  if (resLexico.tokens.length > 0) {
    resSintactico = _analizarSintactico(resLexico, direccion);
  } else {
    resSintactico.errors.push({ tipo: "Sintáctico", descripcion: "No se encontraron tokens válidos para analizar.", posicion: 0, palabra: "" });
  }
  const erroresSintacticos = resSintactico.errors;

  // ── FASE 3: Análisis Semántico ────────────
  let resSemantico = { errors: [] };
  if (resSintactico.arbol) {
    resSemantico = _analizarSemantico(resSintactico, resLexico.tokens, direccion);
  }
  const erroresSemanticos = resSemantico.errors;

  // ── FASE 4: Traducción (Best-effort / Fallback) ──
  const resTraduccion = _generarTraduccion(resLexico, resSintactico, resSemantico, direccion);

  const tablaErrores = _formatearErrores(erroresLexicos, erroresSintacticos, erroresSemanticos);
  const exitoso = erroresLexicos.length === 0 && erroresSintacticos.length === 0 && erroresSemanticos.length === 0;

  let faseExitosa = "ninguna";
  if (erroresLexicos.length === 0) {
    faseExitosa = "lexico";
    if (erroresSintacticos.length === 0) {
      faseExitosa = "sintactico";
      if (erroresSemanticos.length === 0) {
        faseExitosa = "semantico";
      }
    }
  }

  return {
    entrada:       texto,
    traduccion:    resTraduccion.traduccion,
    tipoOracion:   resSintactico.tipoOracion,
    tablaSimbolos,
    tablaErrores,
    tokens:        resLexico.tokens,
    arbol:         resSintactico.arbol,
    exitoso:       exitoso,
    faseExitosa:   faseExitosa,
    resumen:       {
      lexico:      erroresLexicos.length === 0,
      sintactico:  erroresSintacticos.length === 0,
      semantico:   erroresSemanticos.length === 0,
      traduccion:  resTraduccion.traduccion !== null
    },
    mensaje: exitoso
      ? `✅ Traducción generada correctamente.`
      : `⚠️ Se encontraron ${tablaErrores.length} advertencia(s)/error(es). Se generó una traducción aproximada.`
  };
}

// ─────────────────────────────────────────────
// FUNCIÓN: compilarTexto
// Compila múltiples oraciones separadas por punto o salto de línea
// Retorna: array de resultados
// ─────────────────────────────────────────────
async function compilarTexto(texto) {
  if (!texto || texto.trim() === "") return [];

  // Separar por punto, signo de pregunta, exclamación o salto de línea
  const oraciones = texto
    .split(/(?<=[.?!\n])/)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  return Promise.all(oraciones.map(async (oracion, index) => ({
    numero:    index + 1,
    oracion,
    resultado: await compilar(oracion)
  })));
}

// ─────────────────────────────────────────────
// FUNCIÓN AUXILIAR: _formatearErrores
// Combina errores de las tres fases en una tabla unificada
// ─────────────────────────────────────────────
function _formatearErrores(errLex, errSin, errSem) {
  const todos = [
    ...errLex.map(e => ({ ...e, tipo: "Léxico" })),
    ...errSin.map(e => ({ ...e, tipo: "Sintáctico" })),
    ...errSem.map(e => ({ ...e, tipo: "Semántico" }))
  ];
  return todos.map((e, index) => ({
    numero:      index + 1,
    tipo:        e.tipo,
    palabra:     e.palabra || "",
    posicion:    e.posicion || 0,
    descripcion: e.descripcion
  }));
}

// ─────────────────────────────────────────────
// FUNCIÓN: imprimirResultado
// Imprime el resultado completo en consola (para pruebas)
// ─────────────────────────────────────────────
function imprimirResultado(resultado) {
  const SEP = "=".repeat(65);
  const sep = "-".repeat(65);

  console.log("\n" + SEP);
  console.log(`🇬🇧  ENTRADA: "${resultado.entrada}"`);
  console.log(SEP);

  // Resumen de fases
  const r = resultado.resumen;
  console.log("\n📊 FASES:");
  console.log(`   Léxico:      ${r.lexico      ? "✅ Sin errores" : "❌ Con errores"}`);
  console.log(`   Sintáctico:  ${r.sintactico  ? "✅ Sin errores" : "❌ Con errores"}`);
  console.log(`   Semántico:   ${r.semantico   ? "✅ Sin errores" : "❌ Con errores"}`);
  console.log(`   Traducción:  ${r.traduccion  ? "✅ Generada"    : "❌ No generada"}`);

  // Tabla de símbolos
  if (resultado.tablaSimbolos.length > 0) {
    console.log("\n📋 TABLA DE SÍMBOLOS:");
    console.table(resultado.tablaSimbolos);
  }

  // Árbol de derivación
  if (resultado.arbol) {
    console.log("\n🌳 ÁRBOL DE DERIVACIÓN:");
    _imprimirArbol(resultado.arbol);
  }

  // Tabla de errores
  if (resultado.tablaErrores.length > 0) {
    console.log("\n❌ TABLA DE ERRORES:");
    console.table(resultado.tablaErrores);
  }

  // Traducción final
  if (resultado.traduccion) {
    console.log("\n" + sep);
    console.log(`🇪🇸  TRADUCCIÓN: "${resultado.traduccion}"`);
    console.log(sep);
  }

  console.log(`\n💬 ${resultado.mensaje}\n`);
}

// ─────────────────────────────────────────────
// EXPORTAR
// ─────────────────────────────────────────────
export { compilar, compilarTexto, imprimirResultado };

// ─────────────────────────────────────────────
// PRUEBA INTEGRAL — ejecutar: node compiler.js
// ─────────────────────────────────────────────
