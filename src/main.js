import './style.css';
import './ui/styles/themes.css';
import './ui/styles/layout.css';
import './ui/styles/animations.css';
import { compilar } from './compiler/compiler.js';

document.querySelector('#app').innerHTML = `
  <div class="app-container">
    <header>
      <h1>✨ Traductor Neural ✨</h1>
    </header>
    <main class="layout-main">
      <div class="character-panel left" id="char-english">
        <img src="/assets/naegi pose 1.webp" alt="Makoto" class="character-sprite animate-float" id="img-makoto">
      </div>
      
      <div class="compiler-panels">
        <div class="direction-selector">
          <select id="direction-select">
            <option value="es-en">Español → Inglés</option>
            <option value="en-es">English → Spanish</option>
          </select>
        </div>
        <textarea id="input-editor" placeholder="Ingresa la oración en español..."></textarea>
        <div class="actions">
            <button id="btn-translate">
              <img src="/assets/bala de verdad.webp" class="truth-bullet-icon" alt="Bala">
              TRADUCIR
            </button>
        </div>
        
        <div id="translation-display-container">
          <textarea id="output-editor" placeholder="La traducción en inglés..." readonly></textarea>
        </div>
        
        <!-- Botones de fases del compilador -->
        <div class="compiler-details-actions" id="details-actions-panel" style="opacity: 0.5; pointer-events: none;">
          <button class="detail-btn" data-modal="modal-symbols">🔍 LÉXICO</button>
          <button class="detail-btn" data-modal="modal-ast">🌳 SINTÁCTICO</button>
          <button class="detail-btn" data-modal="modal-semantic">⚙️ SEMÁNTICO</button>
          <button class="detail-btn" id="btn-view-errors" data-modal="modal-errors" style="display:none; border-color: var(--dr-pink); color: var(--dr-pink);">❗ ERRORES</button>
        </div>
      </div>

      <div class="character-panel right" id="char-spanish">
        <img src="/assets/kirigiri pose 1.webp" alt="Kyoko" class="character-sprite animate-float" id="img-kyoko">
      </div>
    </main>
  </div>

  <!-- Modales de análisis detallado (Pantalla Completa) -->
  <div class="dr-modal" id="modal-symbols">
    <div class="dr-modal-content">
      <span class="dr-modal-close" data-close="modal-symbols">&times;</span>
      <h2 class="dr-modal-title">⚔️ TABLA DE SÍMBOLOS (ANÁLISIS LÉXICO) ⚔️</h2>
      <div class="dr-modal-body">
        <div class="table-scroll-large">
          <table class="symbols-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Palabra</th>
                <th>Token</th>
                <th>Categoría</th>
                <th>Traducción</th>
              </tr>
            </thead>
            <tbody id="modal-symbols-tbody">
              <tr><td colspan="5" class="placeholder-text">Sin datos disponibles.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div class="dr-modal" id="modal-ast">
    <div class="dr-modal-content">
      <span class="dr-modal-close" data-close="modal-ast">&times;</span>
      <h2 class="dr-modal-title">⚔️ ÁRBOL SINTÁCTICO (ANÁLISIS SINTÁCTICO) ⚔️</h2>
      <div class="dr-modal-body">
        <div class="ast-visualizer-large" id="modal-ast-container">
          <p class="placeholder-text">Sin datos disponibles.</p>
        </div>
      </div>
    </div>
  </div>

  <div class="dr-modal" id="modal-semantic">
    <div class="dr-modal-content">
      <span class="dr-modal-close" data-close="modal-semantic">&times;</span>
      <h2 class="dr-modal-title">⚔️ ANÁLISIS SEMÁNTICO (REGLAS DE CONCORDANCIA) ⚔️</h2>
      <div class="dr-modal-body">
        <div class="semantic-checks-list-large" id="modal-semantic-container">
          <p class="placeholder-text">Sin datos disponibles.</p>
        </div>
      </div>
    </div>
  </div>

  <div class="dr-modal" id="modal-errors">
    <div class="dr-modal-content">
      <span class="dr-modal-close" data-close="modal-errors">&times;</span>
      <h2 class="dr-modal-title">⚠️ TABLA DE ERRORES (DIAGNÓSTICO) ⚠️</h2>
      <div class="dr-modal-body">
        <div id="modal-errors-container" style="flex:1; overflow-y:auto; padding:1.2rem;"></div>
      </div>
    </div>
  </div>
`;

// === LÓGICA DE INTERFAZ ===

const inputEditor = document.getElementById('input-editor');
const imgMakoto = document.getElementById('img-makoto');
const directionSelect = document.getElementById('direction-select');
let typingTimer;

directionSelect.addEventListener('change', () => {
    const dir = directionSelect.value;
    if (dir === "en-es") {
        inputEditor.placeholder = "Enter the sentence in English...";
    } else {
        inputEditor.placeholder = "Ingresa la oración en español...";
    }
});

// Detectar cuando el usuario escribe en el cuadro de español
inputEditor.addEventListener('input', () => {
    // 1. Cambiar la imagen al nuevo sprite de Makoto apuntando/escribiendo
    imgMakoto.src = '/assets/Makoto_Naegi_Halfbody_Sprite_12.webp';
    
    // Cambiar la animación
    imgMakoto.classList.remove('animate-float');
    imgMakoto.classList.add('is-typing');
    
    // Limpiar el temporizador si el usuario sigue escribiendo
    clearTimeout(typingTimer);
    
    // Si el usuario deja de escribir por 500 milisegundos, Makoto vuelve a la normalidad
    typingTimer = setTimeout(() => {
        // Regresar a la imagen original "Idle"
        imgMakoto.src = '/assets/naegi pose 1.webp';
        
        imgMakoto.classList.remove('is-typing');
        imgMakoto.classList.add('animate-float');
    }, 500);
});

// === LOGICA DE LOS MODALES DE DETALLE ===
const detailButtons = document.querySelectorAll('.detail-btn');
const closeButtons = document.querySelectorAll('.dr-modal-close');
const modals = document.querySelectorAll('.dr-modal');

// Abrir modal
detailButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetModalId = button.getAttribute('data-modal');
        const targetModal = document.getElementById(targetModalId);
        if (targetModal) {
            targetModal.style.display = 'flex';
            // Pequeño retardo para activar la animación de opacidad y escala
            setTimeout(() => {
                targetModal.classList.add('active');
            }, 10);
        }
    });
});

// Cerrar modal con el botón X
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetModalId = button.getAttribute('data-close');
        const targetModal = document.getElementById(targetModalId);
        if (targetModal) {
            targetModal.classList.remove('active');
            setTimeout(() => {
                targetModal.style.display = 'none';
            }, 200);
        }
    });
});

// Cerrar modal haciendo clic afuera (en el fondo)
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 200);
        }
    });
});

// === LOGICA DEL BOTON TRADUCIR (KYOKO Y ERRORES) ===
const btnTranslate = document.getElementById('btn-translate');
const imgKyoko = document.getElementById('img-kyoko');
const errorOverlay = document.getElementById('error-overlay');
const errorVideo = document.getElementById('error-video');

// Función recursiva para renderizar el árbol sintáctico en HTML
function renderAST(nodo) {
    if (!nodo) return '';
    
    if (nodo.token) {
        // Es un nodo hoja (un token del lexer)
        return `
            <div class="ast-node leaf">
                <span class="ast-node-header">${nodo.tipo}:</span>
                <span class="ast-token-val">"${nodo.token.palabra}"</span>
                <span style="color: #666; font-size: 0.85rem;">(${nodo.token.token})</span>
            </div>
        `;
    }
    
    // Es un nodo intermedio (rama) con hijos
    const hijosHTML = (nodo.hijos || []).map(h => renderAST(h)).join('');
    return `
        <div class="ast-node branch">
            <span class="ast-node-header">${nodo.tipo}</span>
            <div class="ast-node-children">
                ${hijosHTML}
            </div>
        </div>
    `;
}

// Función para construir la lista de chequeos semánticos
function renderSemanticChecks(resultado) {
    const errors = resultado.tablaErrores.filter(e => e.tipo === "Semántico");
    
    const rules = [
        {
            name: "Concordancia Sujeto-Verbo",
            check: e => e.descripcion.includes("Concordancia") || e.descripcion.toLowerCase().includes("sujeto") || e.descripcion.toLowerCase().includes("verbo"),
            desc: "Verifica que el sujeto y el verbo concuerden en número en español."
        },
        {
            name: "Uso de Verbos Modales",
            check: e => e.descripcion.toLowerCase().includes("modal") || e.descripcion.toLowerCase().includes("infinitivo"),
            desc: "Verifica que los verbos modales españoles (poder, deber, querer) vayan seguidos de un verbo en infinitivo."
        },
        {
            name: "Estructura de la Negación",
            check: e => e.descripcion.toLowerCase().includes("negación") || e.descripcion.toLowerCase().includes("no"),
            desc: "Verifica que la partícula de negación 'no' preceda directamente al verbo en la oración en español."
        },
        {
            name: "Tiempos Verbales y Conjugaciones",
            check: e => e.descripcion.toLowerCase().includes("tiempo") || e.descripcion.toLowerCase().includes("conjugación"),
            desc: "Verifica el uso correcto de las conjugaciones y tiempos verbales en español."
        },
        {
            name: "Orden de los Adjetivos",
            check: e => e.descripcion.toLowerCase().includes("adjetivo"),
            desc: "Comprueba que en español los adjetivos califiquen y sigan a los sustantivos (ej. 'gato azul')."
        }
    ];

    return rules.map(rule => {
        const errorRelacionado = errors.find(e => rule.check(e));
        const success = !errorRelacionado;
        
        return `
            <div class="semantic-rule-item ${success ? 'success' : 'fail'}">
                <span class="semantic-rule-icon">${success ? '✅' : '❌'}</span>
                <div style="flex: 1;">
                    <div class="semantic-rule-name">${rule.name}</div>
                    <div class="semantic-rule-desc">${rule.desc}</div>
                    ${!success ? `<div style="color: var(--dr-pink); margin-top: 5px; font-weight: bold;">⚠️ Error: ${errorRelacionado.descripcion}</div>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

btnTranslate.addEventListener('click', async () => {
    const texto = inputEditor.value.trim();
    
    if (!texto) {
        const dir = directionSelect.value;
        alert(dir === "en-es" ? "Please enter a sentence in English first." : "Por favor, escribe una oración en español primero.");
        return;
    }

    // Animación de Kyoko pensando
    imgKyoko.src = '/assets/Kyouko_Kyoko_Kirigiri_Halfbody_Sprite_29.webp';
    imgKyoko.classList.remove('animate-float');
    imgKyoko.classList.add('is-typing'); 

    const direccion = directionSelect.value;
    const resultado = await compilar(texto, direccion);
    
    // Pequeño retraso para que la animación se aprecie
    setTimeout(() => {
        imgKyoko.src = '/assets/kirigiri pose 1.webp';
        imgKyoko.classList.remove('is-typing');
        imgKyoko.classList.add('animate-float');

        // Habilitar los botones de fases del compilador en el panel
        const actionsPanel = document.getElementById('details-actions-panel');
        actionsPanel.style.opacity = '1';
        actionsPanel.style.pointerEvents = 'all';

        // 1. Mostrar la Traducción o los Errores en el panel
        const displayContainer = document.getElementById('translation-display-container');
        
        // Guardar errores para el modal
        window.__ultimosErrores = resultado.tablaErrores || [];
        window.__ultimaFase = resultado.faseExitosa || '';

        if (!resultado.exitoso || resultado.tablaErrores.length > 0) {
            // Mostrar botón de errores
            const btnErrors = document.getElementById('btn-view-errors');
            btnErrors.style.display = 'inline-block';

            // Reproducir el video "Sore ga chigauyo" de Danganronpa
            errorOverlay.classList.add('active');
            errorVideo.currentTime = 0; // Reiniciar video
            errorVideo.play();
            
            // Cuando termine el video, ocultamos el overlay
            errorVideo.onended = () => {
                errorOverlay.classList.remove('active');
            };

            // Formatear los errores en tarjetas HTML
            const erroresCards = resultado.tablaErrores.map(err => `
                <div class="error-item-card">
                    <div class="error-item-title">❌ ERROR ${err.tipo.toUpperCase()}</div>
                    <div class="error-item-desc">
                        <strong>Posición:</strong> ${err.posicion} | <strong>Palabra:</strong> "${err.palabra || 'N/A'}"<br>
                        <strong>Detalle:</strong> ${err.descripcion}
                    </div>
                </div>
            `).join('');

            displayContainer.innerHTML = `
                <div class="error-warning-box">
                    <div class="error-warning-header">✖ REBUTTAL SHOWDOWN: FALLO EN FASE ${resultado.faseExitosa.toUpperCase()}</div>
                    <div class="error-warning-body">
                        ${erroresCards}
                    </div>
                </div>
            `;
        } else {
            // Ocultar botón de errores si no hay
            document.getElementById('btn-view-errors').style.display = 'none';
            const outputPlaceholder = direccion === "en-es" ? "The translation in Spanish..." : "La traducción en inglés...";
            displayContainer.innerHTML = `
                <textarea id="output-editor" placeholder="${outputPlaceholder}" readonly>${resultado.traduccion}</textarea>
            `;
        }

        // 2. Renderizar la Tabla de Símbolos en el Modal (Léxico)
        const symbolsTbody = document.getElementById('modal-symbols-tbody');
        if (resultado.tablaSimbolos && resultado.tablaSimbolos.length > 0) {
            symbolsTbody.innerHTML = resultado.tablaSimbolos.map(sym => `
                <tr>
                    <td>${sym.numero}</td>
                    <td style="font-weight: bold; color: var(--dr-cyan);">${sym.palabra}</td>
                    <td><span style="background: #222; padding: 2px 6px; border: 1px solid #444; border-radius:3px;">${sym.token}</span></td>
                    <td style="color: #aaa;">${sym.categoria}</td>
                    <td style="color: var(--dr-yellow);">${sym.traduccion}</td>
                </tr>
            `).join('');
        } else {
            symbolsTbody.innerHTML = `<tr><td colspan="5" class="placeholder-text">No se generaron símbolos.</td></tr>`;
        }

        // 3. Renderizar el Árbol Sintáctico en el Modal (Sintáctico)
        const astContainer = document.getElementById('modal-ast-container');
        if (resultado.arbol) {
            astContainer.innerHTML = renderAST(resultado.arbol);
        } else {
            astContainer.innerHTML = `<p class="placeholder-text">${resultado.faseExitosa === 'ninguna' ? 'El análisis sintáctico falló debido a errores léxicos.' : 'Árbol sintáctico no disponible.'}</p>`;
        }

        // 4. Renderizar el Análisis Semántico en el Modal
        const semanticContainer = document.getElementById('modal-semantic-container');
        if (resultado.faseExitosa === 'ninguna' || resultado.faseExitosa === 'lexico') {
            semanticContainer.innerHTML = `<p class="placeholder-text">No se pudo realizar el análisis semántico debido a errores en fases anteriores.</p>`;
        } else {
            semanticContainer.innerHTML = renderSemanticChecks(resultado);
        }

        // 5. Renderizar la Tabla de Errores en el Modal
        renderErrorModal();

    }, 1000);
});

// === LOGICA DEL MODAL DE ERRORES ===
function renderErrorModal() {
    const container = document.getElementById('modal-errors-container');
    const errors = window.__ultimosErrores || [];
    const fase = window.__ultimaFase || '';

    if (errors.length === 0) {
        container.innerHTML = `<p class="placeholder-text">No se encontraron errores. ¡Traducción exitosa!</p>`;
        return;
    }

    const faseLabel = fase ? `FASE: ${fase.toUpperCase()}` : '';
    const totalErrores = errors.length;

    const erroresHTML = errors.map((err, i) => `
        <div class="error-item-card" style="background: #0a0a0a; border: 2px solid #333; border-left: 8px solid var(--dr-pink); padding: 1rem; margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span class="error-item-title" style="font-size: 1.4rem;">❌ ERROR #${i + 1} — ${err.tipo.toUpperCase()}</span>
                <span style="color: #666; font-family: monospace; font-size: 0.9rem;">Pos: ${err.posicion}</span>
            </div>
            <div style="color: var(--dr-yellow); font-family: 'Teko', sans-serif; font-size: 1.3rem; margin-bottom: 0.3rem;">
                Palabra: <strong>"${err.palabra || '(fin de oración)'}"</strong>
            </div>
            <div style="color: #eee; font-family: monospace; font-size: 1rem; line-height: 1.4;">
                ${err.descripcion}
            </div>
        </div>
    `).join('');

    container.innerHTML = `
        <div style="background: #0c0c0c; border: 2px solid #444; padding: 1rem; margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-family: 'Anton', sans-serif; font-size: 1.5rem; color: var(--dr-pink); text-transform: uppercase;">
                ⚠️ ${totalErrores} ERROR(ES) DETECTADO(S)
            </span>
            <span style="font-family: monospace; color: #888; font-size: 1rem;">${faseLabel}</span>
        </div>
        ${erroresHTML}
    `;
}

// Renderizar errores también al abrir el modal
document.getElementById('btn-view-errors')?.addEventListener('click', () => {
    renderErrorModal();
});
