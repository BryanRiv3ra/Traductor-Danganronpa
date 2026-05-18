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

  if (erroresLexicos.length > 0) {
    return {
      entrada:       texto,
      traduccion:    null,
      tipoOracion:   null,
      tablaSimbolos,
      tablaErrores:  _formatearErrores(erroresLexicos, [], []),
      tokens:        resLexico.tokens,
      arbol:         null,
      exitoso:       false,
      faseExitosa:   "ninguna",
      resumen:       { lexico: false, sintactico: false, semantico: false, traduccion: false },
      mensaje:       `❌ Se encontraron ${erroresLexicos.length} error(es) léxico(s). Corrija el texto antes de continuar.`
    };
  }

  // ── FASE 2: Análisis Sintáctico ───────────
  const resSintactico = _analizarSintactico(resLexico, direccion);
  const erroresSintacticos = resSintactico.errors;

  if (erroresSintacticos.length > 0) {
    return {
      entrada:       texto,
      traduccion:    null,
      tipoOracion:   resSintactico.tipoOracion,
      tablaSimbolos,
      tablaErrores:  _formatearErrores([], erroresSintacticos, []),
      tokens:        resLexico.tokens,
      arbol:         resSintactico.arbol,
      exitoso:       false,
      faseExitosa:   "lexico",
      resumen:       { lexico: true, sintactico: false, semantico: false, traduccion: false },
      mensaje:       `❌ Se encontraron ${erroresSintacticos.length} error(es) sintáctico(s). Corrija la estructura de la oración.`
    };
  }

  // ── FASE 3: Análisis Semántico ────────────
  const resSemantico = _analizarSemantico(resSintactico, resLexico.tokens, direccion);
  const erroresSemanticos = resSemantico.errors;

  if (erroresSemanticos.length > 0) {
    return {
      entrada:       texto,
      traduccion:    null,
      tipoOracion:   resSintactico.tipoOracion,
      tablaSimbolos,
      tablaErrores:  _formatearErrores([], [], erroresSemanticos),
      tokens:        resLexico.tokens,
      arbol:         resSintactico.arbol,
      exitoso:       false,
      faseExitosa:   "sintactico",
      resumen:       { lexico: true, sintactico: true, semantico: false, traduccion: false },
      mensaje:       `❌ Se encontraron ${erroresSemanticos.length} error(es) semántico(s). Corrija el uso del lenguaje.`
    };
  }

  // ── FASE 4: Traducción ────────────────────
  const resTraduccion = _generarTraduccion(resLexico, resSintactico, resSemantico, direccion);

  return {
    entrada:       texto,
    traduccion:    resTraduccion.traduccion,
    tipoOracion:   resSintactico.tipoOracion,
    tablaSimbolos,
    tablaErrores:  [],
    tokens:        resLexico.tokens,
    arbol:         resSintactico.arbol,
    exitoso:       resTraduccion.exitoso,
    faseExitosa:   "semantico",
    resumen:       { lexico: true, sintactico: true, semantico: true, traduccion: true },
    mensaje:       resTraduccion.exitoso
                     ? `✅ Traducción generada correctamente.`
                     : `❌ Error inesperado al generar la traducción.`
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
