import { GRUPOS } from "./grammar.js";

class Parser {
  constructor(tokens, direccion = "es-en") {
    this.allTokens = tokens;
    this.tokens = tokens.filter(t => !GRUPOS.PUNTUACION.includes(t.token));
    this.pos = 0;
    this.errors = [];
    this.arbol = null;
    this.tipoOracion = null;
    this.direccion = direccion;
  }

  actual() { return this.tokens[this.pos] || null; }
  siguiente() { return this.tokens[this.pos + 1] || null; }
  consume() { const t = this.tokens[this.pos]; this.pos++; return t; }
  esToken(token) { return this.actual() && this.actual().token === token; }
  esGrupo(grupo) { return this.actual() && GRUPOS[grupo] && GRUPOS[grupo].includes(this.actual().token); }
  esPalabraAux() { return this.actual() && GRUPOS.VERBOS_AUX.includes(this.actual().palabra.toLowerCase()); }

  esInterjeccion() { return this.actual() && this.actual().token === "INTERJ"; }

  consumirInterjecciones() {
    const interjs = [];
    while (this.esInterjeccion()) {
      interjs.push({ tipo: "Interjección", token: this.consume() });
    }
    return interjs;
  }

  agregarError(descripcion) {
    const tok = this.actual();
    this.errors.push({
      tipo: "Sintáctico",
      descripcion: descripcion,
      posicion: tok ? tok.posicion : "fin de oración",
      palabra: tok ? tok.palabra : "EOF"
    });
  }

  parseFraseNominal() {
    const nodo = { tipo: "FraseNominal", hijos: [] };
    while (this.esGrupo("DETERMINANTES")) nodo.hijos.push({ tipo: "Determinante", token: this.consume() });
    while (this.esToken("ADJ")) nodo.hijos.push({ tipo: "Adjetivo", token: this.consume() });
    if (this.esToken("NOUN")) {
      nodo.hijos.push({ tipo: "Sustantivo", token: this.consume() });
    } else {
      this.agregarError(`Se esperaba un sustantivo${this.actual() ? ` pero se encontró '${this.actual().palabra}' (${this.actual().token})` : " pero se llegó al final de la oración"}`);
    }
    while (this.esToken("ADJ")) nodo.hijos.push({ tipo: "Adjetivo", token: this.consume() });
    return nodo;
  }

  parseSujeto() {
    const nodo = { tipo: "Sujeto", hijos: [] };
    if (this.esToken("PRON_PERS") || this.esToken("PRON_DEM")) {
      nodo.hijos.push({ tipo: "Pronombre", token: this.consume() });
    } else if (this.esGrupo("DETERMINANTES")) {
      nodo.hijos.push({ tipo: "Determinante", token: this.consume() });
      if (this.esToken("ADJ")) nodo.hijos.push({ tipo: "Adjetivo", token: this.consume() });
      if (this.esToken("NOUN")) {
        nodo.hijos.push({ tipo: "Sustantivo", token: this.consume() });
      } else {
        this.agregarError(`Artículo o determinante sin sustantivo después de '${this.tokens[this.pos-1].palabra}'`);
      }
      while (this.esToken("ADJ")) nodo.hijos.push({ tipo: "Adjetivo", token: this.consume() });
    } else if (this.esToken("NOUN")) {
      nodo.hijos.push({ tipo: "Sustantivo", token: this.consume() });
      while (this.esToken("ADJ")) nodo.hijos.push({ tipo: "Adjetivo", token: this.consume() });
    } else {
      this.agregarError(`Se esperaba un sujeto (pronombre, artículo o sustantivo)${this.actual() ? ` pero se encontró '${this.actual().palabra}'` : ""}`);
    }

    // Sujeto compuesto (ej. "Mary and José")
    if (this.actual() && this.actual().token === "CONJ_COORD_COP") {
      const nextTok = this.siguiente();
      if (nextTok && (nextTok.token === "NOUN" || nextTok.token === "PRON_PERS" || GRUPOS.DETERMINANTES.includes(nextTok.token))) {
        nodo.hijos.push({ tipo: "ConjunciónSujeto", token: this.consume() });
        if (this.esToken("PRON_PERS") || this.esToken("PRON_DEM")) {
          nodo.hijos.push({ tipo: "Pronombre", token: this.consume() });
        } else if (this.esGrupo("DETERMINANTES")) {
          nodo.hijos.push({ tipo: "Determinante", token: this.consume() });
          if (this.esToken("ADJ")) nodo.hijos.push({ tipo: "Adjetivo", token: this.consume() });
          if (this.esToken("NOUN")) {
            nodo.hijos.push({ tipo: "Sustantivo", token: this.consume() });
          } else {
            this.agregarError(`Artículo o determinante sin sustantivo después de '${this.tokens[this.pos-1].palabra}'`);
          }
        } else if (this.esToken("NOUN")) {
          nodo.hijos.push({ tipo: "Sustantivo", token: this.consume() });
        }
      }
    }

    return nodo;
  }

  parseComplemento() {
    const nodo = { tipo: "Complemento", hijos: [] };
    if (!this.actual()) return nodo;

    if (this.esToken("PREP")) {
      nodo.hijos.push({ tipo: "Preposición", token: this.consume() });
      if (this.esToken("ADV_PLACE") || this.esToken("ADV_TIME")) {
        nodo.hijos.push({ tipo: "Adverbio", token: this.consume() });
      } else if (this.esGrupo("DETERMINANTES") || this.esToken("NOUN") || this.esToken("ADJ")) {
        nodo.hijos.push(this.parseFraseNominal());
      }
    } else if (this.esToken("VERB")) {
      nodo.hijos.push({ tipo: "Verbo", token: this.consume() });
    } else if (this.esToken("ADJ")) {
      nodo.hijos.push({ tipo: "Adjetivo", token: this.consume() });
    } else if (this.esGrupo("ADVERBIOS")) {
      nodo.hijos.push({ tipo: "Adverbio", token: this.consume() });
    } else if (this.esGrupo("DETERMINANTES") || this.esToken("NOUN")) {
      nodo.hijos.push(this.parseFraseNominal());
    } else if (this.esInterjeccion()) {
      nodo.hijos.push({ tipo: "Interjección", token: this.consume() });
    }
    return nodo;
  }

  esPuntuacionSiguiente() {
    const actual = this.actual();
    if (!actual) return false;
    const idxActualEnAll = this.allTokens.indexOf(actual);
    if (idxActualEnAll <= 0) return false;
    const prevEnAll = this.allTokens[idxActualEnAll - 1];
    return GRUPOS.PUNTUACION.includes(prevEnAll.token);
  }

  parsePredicado() {
    const nodo = { tipo: "Predicado", hijos: [] };
    if (!this.esToken("VERB")) {
      this.agregarError(`Se esperaba un verbo${this.actual() ? ` pero se encontró '${this.actual().palabra}' (${this.actual().token})` : " pero se llegó al final de la oración"}`);
      return nodo;
    }
    nodo.hijos.push({ tipo: "Verbo", token: this.consume() });
    let maxComp = 3;
    while (this.actual() && !this.esGrupo("CONJUNCIONES") && !this.esPuntuacionSiguiente() && maxComp > 0) {
      const comp = this.parseComplemento();
      if (comp.hijos.length > 0) { nodo.hijos.push(comp); } else { break; }
      maxComp--;
    }
    return nodo;
  }

  parseOracionDeclarativa() {
    const nodo = { tipo: "OracionDeclarativa", hijos: [] };
    this.tipoOracion = "Declarativa";
    
    // Consumir interjecciones iniciales (ej: "Hola mundo", "Oh, qué bonito")
    const interjs = this.consumirInterjecciones();
    nodo.hijos.push(...interjs);
    
    // Si solo había interjecciones, devolver sin error
    if (!this.actual()) return nodo;
    
    // El sujeto es opcional en español (sujeto tácito)
    if (this.actual() && this.actual().token !== "VERB") {
      nodo.hijos.push(this.parseSujeto());
    }
    
    if (!this.actual() || this.esGrupo("CONJUNCIONES") || GRUPOS.PUNTUACION.includes(this.actual()?.token)) {
      // Si ya consumimos algo (interjecciones o sujeto), no es error — es una frase válida
      if (interjs.length === 0 && nodo.hijos.length === 0) {
        this.agregarError("La oración no tiene predicado (falta el verbo)");
      }
      return nodo;
    }
    nodo.hijos.push(this.parsePredicado());
    
    while (this.actual() && (this.esGrupo("CONJUNCIONES") || this.esGrupo("SUJETO_INICIO"))) {
      const posAntes = this.pos;
      
      if (this.esGrupo("CONJUNCIONES")) {
        nodo.hijos.push({ tipo: "Conjunción", token: this.consume() });
      } else {
        // Soporte para yuxtaposición o "comma splice" (se crea un separador virtual de cláusula)
        nodo.hijos.push({ tipo: "SeparadorClausula", token: { token: "PUNCT_COMMA", palabra: ",", traduccion: "," } });
      }
      
      let hasVerbAhead = false;
      for (let idx = this.pos; idx < this.tokens.length; idx++) {
        if (this.tokens[idx].token === "VERB") {
          hasVerbAhead = true;
          break;
        }
      }
      
      if (this.actual() && this.esGrupo("SUJETO_INICIO") && hasVerbAhead) {
        nodo.hijos.push(this.parseSujeto());
      }
      if (this.actual() && this.esToken("VERB")) {
        nodo.hijos.push(this.parsePredicado());
      }

      // PREVENCIÓN DE BUCLE INFINITO
      if (this.pos === posAntes) {
        this.agregarError(`Token inesperado: '${this.actual().palabra}' (${this.actual().token})`);
        this.consume();
      }
    }
    return nodo;
  }

  parseOracionNegativa() {
    const nodo = { tipo: "OracionNegativa", hijos: [] };
    this.tipoOracion = "Negativa";
    
    // Consumir interjecciones iniciales
    nodo.hijos.push(...this.consumirInterjecciones());
    
    // Sujeto opcional (tácito)
    if (this.actual() && this.actual().token !== "ADV_NEG") {
      nodo.hijos.push(this.parseSujeto());
    }
    

    
    if (this.esToken("ADV_NEG")) {
      nodo.hijos.push({ tipo: "Negación", token: this.consume() });
    } else {
      this.agregarError("Se esperaba la partícula de negación 'no'");
    }
    
    if (this.esToken("VERB")) {
      nodo.hijos.push(this.parsePredicado());
    } else {
      this.agregarError("Se esperaba un verbo después de la negación");
    }
    
    while (this.actual() && !GRUPOS.PUNTUACION.includes(this.actual()?.token) && !this.esGrupo("CONJUNCIONES")) {
      const comp = this.parseComplemento();
      if (comp.hijos.length > 0) nodo.hijos.push(comp);
      else break;
    }
    return nodo;
  }

  parseOracionPregunta() {
    const nodo = { tipo: "OracionPregunta", hijos: [] };
    this.tipoOracion = "Interrogativa";
    
    // Consumir interjecciones iniciales (ej: "Oye, ¿qué haces?")
    nodo.hijos.push(...this.consumirInterjecciones());
    
    // Si solo había interjecciones
    if (!this.actual()) return nodo;
    
    // Si empieza directamente con verbo (ej: ¿Corre el gato?)
    if (this.esToken("VERB")) {
      nodo.hijos.push(this.parsePredicado());
      if (this.actual() && this.esGrupo("SUJETO_INICIO")) {
        nodo.hijos.push(this.parseSujeto());
      }
    } else {
      // Si empieza con sujeto (ej: ¿El gato corre?)
      nodo.hijos.push(this.parseSujeto());
      if (this.esToken("VERB")) {
        nodo.hijos.push(this.parsePredicado());
      } else {
        this.agregarError("Se esperaba un verbo en la pregunta");
      }
    }
    
    while (this.actual() && !GRUPOS.PUNTUACION.includes(this.actual()?.token)) {
      const comp = this.parseComplemento();
      if (comp.hijos.length > 0) nodo.hijos.push(comp);
      else {
        if (this.actual() && !GRUPOS.PUNTUACION.includes(this.actual()?.token)) {
          this.agregarError(`Token inesperado en la pregunta: '${this.actual().palabra}' (${this.actual().token})`);
          this.consume();
        }
        break;
      }
    }
    return nodo;
  }

  detectarTipo() {
    if (this.tokens.length === 0) return "vacia";
    const tieneInterrogacion = this.allTokens.some(t => t.token === "PUNCT_QUESTION" || t.palabra === "¿" || t.palabra === "?");
    if (tieneInterrogacion) return "pregunta";
    const tieneExclamacion = this.allTokens.some(t => t.token === "PUNCT_EXCLAIM" || t.palabra === "¡" || t.palabra === "!");
    if (tieneExclamacion) return "exclamativa";

    // En modo EN→ES, la negación se maneja en la fase de traducción, no en el parseo
    if (this.direccion !== "en-es") {
      for (let i = 0; i < Math.min(4, this.tokens.length); i++) {
        if (this.tokens[i].token === "INTERJ") continue;
        if (this.tokens[i].token === "ADV_NEG") return "negativa";
      }
    }
    return "declarativa";
  }

  analizar() {
    if (this.tokens.length === 0) {
      this.errors.push({ tipo: "Sintáctico", descripcion: "No hay tokens para analizar.", posicion: 0, palabra: "" });
      return { arbol: null, errors: this.errors, tipoOracion: null };
    }

    let tipo = this.detectarTipo();

    if (tipo === "pregunta") this.arbol = this.parseOracionPregunta();
    else if (tipo === "negativa") this.arbol = this.parseOracionNegativa();
    else {
      this.arbol = this.parseOracionDeclarativa();
      if (tipo === "exclamativa") this.tipoOracion = "Exclamativa";
    }

    while (this.actual()) {
      if (!GRUPOS.PUNTUACION.includes(this.actual().token) && this.actual().token !== "INTERJ") {
        this.agregarError(`Token inesperado al final de la oración: '${this.actual().palabra}' (${this.actual().token})`);
      }
      this.consume();
    }

    return { arbol: this.arbol, errors: this.errors, tipoOracion: this.tipoOracion };
  }
}

export { Parser };
