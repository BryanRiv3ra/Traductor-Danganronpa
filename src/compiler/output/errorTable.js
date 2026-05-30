const ESTILO_ERROR = {
  "Léxico": { clase: "error-lexico", icono: "🔤", color: "#e74c3c", fase: 1 },
  "Sintáctico": { clase: "error-sintactico", icono: "📐", color: "#e67e22", fase: 2 },
  "Semántico": { clase: "error-semantico", icono: "🧠", color: "#9b59b6", fase: 3 }
};

function extraerSugerencia(error) {
  if (!error) return null;
  if (error.sugerencia) return error.sugerencia;
  const descripcion = error.descripcion;
  if (!descripcion) return null;
  const match = descripcion.match(/¿Quisiste decir '(.+?)'\?/);
  if (match) return `Usa: "${match[1]}"`;
  const match2 = descripcion.match(/La forma correcta es '(.+?)'/);
  if (match2) return `Forma correcta: "${match2[1]}"`;
  return null;
}

function generarTablaErrores(erroresLexicos = [], erroresSintacticos = [], erroresSemanticos = []) {
  const todos = [
    ...erroresLexicos.map(e => ({ ...e, tipo: "Léxico" })),
    ...erroresSintacticos.map(e => ({ ...e, tipo: "Sintáctico" })),
    ...erroresSemanticos.map(e => ({ ...e, tipo: "Semántico" }))
  ];
  return todos.map((e, index) => {
    const estilo = ESTILO_ERROR[e.tipo] || { fase: 0, icono: "❓" };
    return {
      numero: index + 1, fase: estilo.fase, tipo: e.tipo, icono: estilo.icono,
      palabra: e.palabra || "", posicion: e.posicion || 0,
      descripcion: e.descripcion, sugerencia: extraerSugerencia(e) || "—"
    };
  });
}

function generarTablaErroresDesdeCompiler(resultadoCompiler) {
  if (!resultadoCompiler || !resultadoCompiler.tablaErrores) return [];
  return resultadoCompiler.tablaErrores.map((e, index) => {
    const estilo = ESTILO_ERROR[e.tipo] || { fase: 0, icono: "❓" };
    return {
      numero: index + 1, fase: estilo.fase, tipo: e.tipo, icono: estilo.icono,
      palabra: e.palabra || "", posicion: e.posicion || 0,
      descripcion: e.descripcion, sugerencia: extraerSugerencia(e) || "—"
    };
  });
}

function hayErrores(tablaErrores) { return tablaErrores && tablaErrores.length > 0; }
function filtrarPorFase(tablaErrores, fase) { return tablaErrores.filter(e => e.fase === fase); }

function contarPorTipo(tablaErrores) {
  return {
    lexicos: tablaErrores.filter(e => e.tipo === "Léxico").length,
    sintacticos: tablaErrores.filter(e => e.tipo === "Sintáctico").length,
    semanticos: tablaErrores.filter(e => e.tipo === "Semántico").length,
    total: tablaErrores.length
  };
}

function tablaAHTML(tablaErrores) {
  if (tablaErrores.length === 0) return `<p class="tabla-vacia sin-errores">✅ No se encontraron errores.</p>`;
  const filas = tablaErrores.map(e => `
    <tr class="${ESTILO_ERROR[e.tipo]?.clase || ''}">
      <td>${e.numero}</td>
      <td>${e.icono} <span class="badge badge-error-${e.tipo.toLowerCase()}">${e.tipo}</span></td>
      <td>Fase ${e.fase}</td>
      <td>${e.palabra ? `<code>${e.palabra}</code>` : "—"}</td>
      <td>${e.posicion}</td>
      <td>${e.descripcion}</td>
      <td class="sugerencia">${e.sugerencia}</td>
    </tr>`).join("");
  const conteo = contarPorTipo(tablaErrores);
  return `
    <div class="resumen-errores">
      <span class="badge badge-error-lexico">🔤 Léxicos: ${conteo.lexicos}</span>
      <span class="badge badge-error-sintactico">📐 Sintácticos: ${conteo.sintacticos}</span>
      <span class="badge badge-error-semantico">🧠 Semánticos: ${conteo.semanticos}</span>
      <span class="badge badge-total">Total: ${conteo.total}</span>
    </div>
    <table class="tabla-errores">
      <thead><tr><th>#</th><th>Tipo</th><th>Fase</th><th>Palabra</th><th>Posición</th><th>Descripción</th><th>Sugerencia</th></tr></thead>
      <tbody>${filas}</tbody>
    </table>`;
}

function tablaAJSON(tablaErrores) { return JSON.stringify(tablaErrores, null, 2); }

export { generarTablaErrores, generarTablaErroresDesdeCompiler, hayErrores, filtrarPorFase, contarPorTipo, tablaAHTML, tablaAJSON, ESTILO_ERROR };

