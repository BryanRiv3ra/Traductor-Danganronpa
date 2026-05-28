============================================================================
  COMPILADOR TRADUCTOR ESPAÑOL → INGLÉS
  "Class Trial - Traductor Danganronpa"
  
  Proyecto Grupal - Compiladores 2026
  Universidad Mariano Gálvez de Guatemala
============================================================================

                        INDICE

1.  Introduccion
2.  Objetivos
3.  Arquitectura General
4.  Estructura del Proyecto
5.  Fase 1: Analisis Lexico
6.  Fase 2: Analisis Sintactico
7.  Fase 3: Analisis Semantico
8.  Fase 4: Traduccion
9.  Diccionario y Datos Linguisticos
10. Interfaz de Usuario
11. Manejo de Errores
12. Flujo de Compilacion
13. Guia de Uso
14. Requisitos del Sistema
15. Creditos



============================================================================
1. INTRODUCCION
============================================================================

El "Class Trial - Traductor Danganronpa" es un compilador didactico 
desarrollado como proyecto grupal para el curso de Compiladores 2026. 
Su funcion principal es traducir oraciones del espanol al ingles 
utilizando las cuatro fases clasicas de un compilador:

  - Analisis Lexico (Tokenizacion)
  - Analisis Sintactico (Arbol de Derivacion)
  - Analisis Semantico (Reglas de Concordancia)
  - Sintesis/Traduccion (Generacion de codigo destino)

El proyecto cuenta con una interfaz grafica tematica inspirada en la 
serie Danganronpa, con personajes animados (Makoto Naegi y Kyoko 
Kirigiri), efectos de sonido y video al detectar errores, y modales 
de depuracion que muestran el proceso interno del compilador.

Stack tecnologico:
  - Lenguaje: JavaScript (ESModules)
  - Bundler: Vite 5.x
  - Entorno: Navegador Web
  - APIs externas: MyMemory Translation API, Free Dictionary API



============================================================================
2. OBJETIVOS
============================================================================

2.1 Objetivo General

Desarrollar un compilador funcional que traduzca oraciones del idioma 
espanol al ingles, aplicando los conceptos de las cuatro fases de 
compilacion: lexico, sintactico, semantico y generacion de codigo.

2.2 Objetivos Especificos

  a. Implementar un analizador lexico que tokenice palabras en espanol
     y las clasifique gramaticalmente.

  b. Disenar un analizador sintactico descendente recursivo que 
     construya un arbol de derivacion para oraciones en espanol.

  c. Desarrollar reglas semanticas que validen concordancia de numero,
     uso de modales, negacion, tiempos verbales y orden de adjetivos.

  d. Implementar un modulo de traduccion que convierta la estructura
     sintactica del espanol al ingles, incluyendo conjugacion verbal,
     reordenacion de frases y manejo de negacion.

  e. Proveer una interfaz grafica interactiva que visualice cada fase
     del proceso de compilacion.



============================================================================
3. ARQUITECTURA GENERAL
============================================================================

El compilador sigue un pipeline de 4 fases con cortocircuito: si 
cualquier fase detecta errores, se detiene el proceso y se reportan 
los errores sin continuar a las fases siguientes.


  ENTRADA (Espanol)
       |
       v
  +------------------+
  | FASE 1: LEXICO   |  lexer.js
  | Tokenizacion     |  dictionary.js
  | Tabla de Simbolos|  lexical/
  +------------------+
       |
       v
  +------------------+
  | FASE 2:          |  Parser.js
  | SINTACTICO       |  grammar.js
  | Arbol AST        |
  +------------------+
       |
       v
  +------------------+
  | FASE 3:          |  semantic/index.js
  | SEMANTICO        |  rules/*.js
  | 5 Reglas         |
  +------------------+
       |
       v
  +------------------+
  | FASE 4:          |  translation/
  | TRADUCCION       |  translate.js
  | Ingles           |  conjugation.js
  +------------------+
       |
       v
  SALIDA (Ingles)


Cada fase recibe la salida de la fase anterior y produce:
  - Exito: avanza a la siguiente fase
  - Error: retorna resultado con errores y fase donde fallo

El objeto de resultado unificado contiene:
{
  entrada:        string,       // Texto original en espanol
  traduccion:     string|null,  // Texto traducido al ingles
  tipoOracion:    string|null,  // Declarativa | Interrogativa | Negativa | Exclamativa
  tablaSimbolos:  Array,        // Lista de tokens con analisis
  tablaErrores:   Array,        // Errores de todas las fases
  tokens:         Array,        // Tokens del lexico
  arbol:          Object|null,  // Arbol sintactico
  exitoso:        boolean,      // True si todo fue exitoso
  faseExitosa:    string,       // "ninguna" | "lexico" | "sintactico" | "semantico"
  resumen:        { lexico, sintactico, semantico, traduccion }
}



============================================================================
4. ESTRUCTURA DEL PROYECTO
============================================================================

Traductor-Danganronpa/
|
+-- index.html               Punto de entrada HTML
+-- package.json              Configuracion de Vite y dependencias
+-- pnpm-lock.yaml            Lock file de pnpm
+-- pnpm-workspace.yaml       Workspace de pnpm
+-- .gitignore
|
+-- public/                   Archivos estaticos
|   +-- assets/
|       +-- classtrial.webp           Fondo del Class Trial
|       +-- naegi pose 1.webp         Sprite Makoto Naegi (idle)
|       +-- kirigiri pose 1.webp      Sprite Kyoko Kirigiri (idle)
|       +-- Makoto_Naegi_*.webp       Sprite Makoto escribiendo
|       +-- Kyouko_Kyoko_*.webp       Sprite Kyoko pensando
|       +-- bala de verdad.webp       Icono Truth Bullet
|       +-- sore ga chigauyo.mp4      Video de error
|
+-- src/                     Codigo fuente
    |
    +-- main.js              Interfaz de usuario (entry point)
    +-- style.css            Estilos globales (tema Danganronpa)
    |
    +-- compiler/            NUCLEO DEL COMPILADOR
    |   +-- compiler.js      Orquestador de las 4 fases
    |   +-- lexer.js         Analizador lexico
    |   +-- parser.js        Re-export del modulo sintactico
    |   +-- translator.js    Re-export del modulo de traduccion
    |   +-- dictionary.js    Diccionario unificado + fuzzy lookup
    |   +-- symbolTable.js   (no usado actualmente)
    |   +-- errortable.js    (no usado actualmente)
    |   |
    |   +-- lexical/
    |   |   +-- patterns.js      Expresiones regulares de tokenizacion
    |   |   +-- contractions.js  32 contracciones inglesas
    |   |
    |   +-- data/                DICCIONARIO INGLES->ESPANOL
    |   |   +-- articles.js      3 articulos
    |   |   +-- pronouns.js      24 pronombres
    |   |   +-- determiners.js   14 determinantes
    |   |   +-- numerals.js      20 numerales
    |   |   +-- nouns.js         62 sustantivos
    |   |   +-- adjectives.js    68 adjetivos
    |   |   +-- verbs.js         ~120 verbos
    |   |   +-- adverbs.js      ~50 adverbios
    |   |   +-- prepositions.js  27 preposiciones
    |   |   +-- conjunctions.js  18 conjunciones
    |   |   +-- interjections.js 9 interjecciones
    |   |   +-- punctuation.js   8 signos de puntuacion
    |   |
    |   +-- syntactic/
    |   |   +-- index.js         Wrapper del analisis sintactico
    |   |   +-- Parser.js        Parser descendente recursivo
    |   |   +-- grammar.js       Grupos de tokens gramaticales
    |   |   +-- treePrinter.js   Impresion del arbol en consola
    |   |
    |   +-- semantic/
    |   |   +-- index.js         Wrapper del analisis semantico
    |   |   +-- tables.js        Tablas de datos semanticos
    |   |   +-- rules/
    |   |       +-- subjectVerb.js     Concordancia sujeto-verbo
    |   |       +-- modals.js          Verbos modales + infinitivo
    |   |       +-- negation.js        Negacion con verbo asociado
    |   |       +-- tense.js           Tiempos verbales incorrectos
    |   |       +-- adjectiveOrder.js  Orden adjetivo-sustantivo
    |   |
    |   +-- translation/
    |       +-- index.js         Wrapper de traduccion
    |       +-- translate.js     Logica principal de traduccion
    |       +-- conjugation.js   Conjugacion de verbos en ingles
    |       +-- reorder.js       Reordenacion Articulo+Adj+Sust
    |       +-- negation.js      Procesamiento de negacion
    |       +-- gender.js        Genero de sustantivos y adjetivos
    |       +-- format.js        Formato final y contracciones
    |
    +-- ui/
    |   +-- styles/
    |   |   +-- themes.css       Variables de colores
    |   |   +-- layout.css       Diseno de paneles
    |   |   +-- animations.css   Animaciones CSS
    |   +-- components/
    |   |   +-- editor.js        Editor de texto
    |   |   +-- fileLoader.js    Carga de archivos
    |   |   +-- tablesUI.js      UI de tablas
    |   +-- animations/
    |       +-- characterA.js    Animacion Makoto
    |       +-- characterB.js    Animacion Kyoko
    |
    +-- utils/
        +-- speech.js            (vacio -预留 para Web Speech API)



============================================================================
5. FASE 1: ANALISIS LEXICO
============================================================================

Ubicacion: src/compiler/lexer.js
Diccionario: src/compiler/dictionary.js
Patrones: src/compiler/lexical/patterns.js
Contracciones: src/compiler/lexical/contractions.js

5.1 Proceso

El analizador lexico recibe el texto en espanol y produce una lista 
de tokens con su clasificacion gramatical.

Paso 1: Validacion de entrada
  - Verifica que el texto no este vacio
  - Detecta caracteres invalidos con REGEX.INVALID_CHAR

Paso 2: Tokenizacion
  - Usa la expresion regular:
    /[a-zA-ZaeiouynAEIOUYN']+|\d+(\.\d+)?|[.,?!;:"']/g
  - Sepala el texto en tokens individuales

Paso 3: Clasificacion de cada token
  a. Signo de puntuacion -> lookupWord() -> token PUNCT_*
  b. Numero literal -> token NUM_LITERAL
  c. Contraccion inglesa -> token CONTRACTION (tabla en contractions.js)
  d. Palabra en diccionario espanol-ingles -> token segun su categoria
  e. Busqueda aproximada (fuzzy lookup) -> Levenshtein distance <= 1
  f. API MyMemory (traduccion es->en) + validacion anti-multi-palabra
  g. Fallback local guessPOS() con heuristicas

5.2 Fuzzy Lookup (Mejora implementada)

Cuando una palabra no se encuentra exactamente en el diccionario, se 
activa la busqueda aproximada (fuzzyLookup) que utiliza tres 
estrategias en orden de prioridad:

  1. SUFIJOS DEL ESPANOL: Elimina terminaciones comunes 
     (-o, -a, -os, -as, -e, -s) y busca la base.
     Ej: "gord" -> quita "o" -> busca "gord" (no existe) -> 
          luego prefijo "gord" en "gordo" -> MATCH

  2. PREFIJO: Si la palabra es prefijo de una entrada del 
     diccionario con hasta 3 caracteres de diferencia.
     Ej: "gat" -> prefijo de "gato" -> MATCH

  3. DISTANCIA LEVENSHTEIN: Calcula la distancia de edicion 
     entre la palabra y cada clave del diccionario. Si la 
     distancia es <= 1, retorna la coincidencia mas cercana.
     Ej: "gordx" -> distancia 1 con "gordo" -> MATCH

5.3 Validacion de API (Mejora implementada)

Para evitar que el API de MyMemory devuelva resultados absurdos 
(ej: "gord" -> "George Gordon"), se implemento una validacion:

  - Si la entrada es UNA sola palabra y la respuesta del API 
    contiene MULTIPLES palabras, se rechaza la respuesta y se 
    utiliza el fallback local (guessPOS).

  - Esto evita que el programa traduzca palabras mal escritas 
    con resultados sin sentido.

5.4 Tabla de Simbolos

Cada token genera una entrada en la tabla de simbolos con:
  - Numero de orden
  - Posicion en el texto original
  - Palabra (token lexico)
  - Tipo de token (NOUN, VERB, ADJ, PREP, etc.)
  - Categoria gramatical (Sustantivo, Verbo, Adjetivo, etc.)
  - Traduccion al ingles

5.5 Categorias Gramaticales Soportadas

  Sustantivo (NOUN)
  Verbo (VERB)
  Adjetivo (ADJ)
  Adverbio: modo (ADV_MODE), tiempo (ADV_TIME), lugar (ADV_PLACE),
            cantidad (ADV_QUANT), afirmacion (ADV_AFFIRM),
            negacion (ADV_NEG), duda (ADV_DOUBT)
  Preposicion (PREP)
  Conjuncion: coordinante (CONJ_COORD_*), subordinante (CONJ_SUB_*)
  Determinante: articulo definido (ART_DEF), articulo indefinido
                (ART_INDEF), posesivo (POS), demostrativo (PRON_DEM),
                indefinido (DET_INDEF), numeral (NUM_CARD, NUM_ORD)
  Interjeccion (INTERJ)



============================================================================
6. FASE 2: ANALISIS SINTACTICO
============================================================================

Ubicacion: src/compiler/syntactic/Parser.js
Gramatica: src/compiler/syntactic/grammar.js

6.1 Tipo de Parser

Parser descendente recursivo (Recursive Descent) implementado como 
una clase Parser con metodos para cada no-terminal de la gramatica.

6.2 Grupos Gramaticales (grammar.js)

  SUJETO_INICIO:    PRON_PERS, ART_DEF, ART_INDEF, POS, PRON_DEM, 
                    DET_INDEF, NOUN, NUM_CARD
  DETERMINANTES:    ART_DEF, ART_INDEF, POS, PRON_DEM, DET_INDEF, 
                    NUM_CARD, NUM_ORD
  ADVERBIOS:        ADV_MODE, ADV_TIME, ADV_PLACE, ADV_QUANT, 
                    ADV_AFFIRM, ADV_NEG, ADV_DOUBT
  CONJUNCIONES:     CONJ_COORD_COP, CONJ_COORD_ADV, CONJ_COORD_DIS, 
                    CONJ_COORD_EXP, CONJ_SUB_COND, CONJ_SUB_CAUS, 
                    CONJ_SUB_CONC, CONJ_SUB_TEMP, CONJ_SUB_COMP, 
                    CONJ_SUB_CONS, CONJ_SUB_FIN
  PUNTUACION:       PUNCT_PERIOD, PUNCT_COMMA, PUNCT_QUESTION, 
                    PUNCT_EXCLAIM, PUNCT_SEMICOLON, PUNCT_COLON, 
                    PUNCT_APOST, PUNCT_QUOTE

6.3 Estructura de la Gramatica

  Oracion      -> OracionDeclarativa | OracionNegativa 
                   | OracionPregunta | OracionExclamativa

  OracionDeclarativa -> (Interjeccion)* (Sujeto)? Predicado 
                         (Conjuncion Sujeto Predicado)*

  OracionNegativa    -> (Interjeccion)* (Sujeto)? "no" Predicado

  OracionPregunta    -> (Interjeccion)* (Predicado Sujeto 
                         | Sujeto Predicado)

  Sujeto       -> Pronombre | Determinante (Adj)* Sustantivo (Adj)* 
                   | Sustantivo (Adj)*
                   | Sujeto "y" Sujeto (sujeto compuesto)

  Predicado    -> Verbo (Complemento){0,3}

  Complemento  -> Preposicion (FraseNominal | Adverbio)
                   | Verbo | Adjetivo | Adverbio | Interjeccion
                   | FraseNominal

  FraseNominal -> (Determinante)? (Adj)* Sustantivo (Adj)*

6.4 Deteccion del Tipo de Oracion

  El metodo detectarTipo() analiza los primeros tokens para 
  determinar el tipo:

  1. Si hay signos de interrogacion (?, ) -> Interrogativa
  2. Si hay signos de exclamacion (!, ) -> Exclamativa
  3. Si hay ADV_NEG (no) en los primeros 4 tokens -> Negativa
  4. Caso contrario -> Declarativa

  Las interjecciones (INTERJ) se omiten durante la deteccion 
  para que no interfieran.

6.5 Manejo de Interjecciones (Mejora implementada)

  Se agregaron las siguientes capacidades:

  a. Metodo consumirInterjecciones() que consume todos los 
     tokens INTERJ consecutivos al inicio.

  b. Se llama al inicio de los tres metodos de parseo:
     - parseOracionDeclarativa()
     - parseOracionNegativa()
     - parseOracionPregunta()

  c. Si solo hay interjecciones, se retorna sin error 
     (ej: "Hola" como oracion valida).

  d. parseComplemento() acepta INTERJ como complemento valido.

  e. El barrido final en analizar() no marca INTERJ como token 
     inesperado.

6.6 Arbol Sintactico (AST)

Cada nodo del arbol tiene la estructura:
{
  tipo: string,        // Tipo del nodo (OracionDeclarativa, Sujeto, 
                        // Verbo, Sustantivo, etc.)
  hijos: Array,        // Nodos hijos (si es nodo interno)
  token: Object        // Token asociado (si es hoja)
}



============================================================================
7. FASE 3: ANALISIS SEMANTICO
============================================================================

Ubicacion: src/compiler/semantic/
  - index.js (orquestador)
  - rules/subjectVerb.js
  - rules/modals.js
  - rules/negation.js
  - rules/tense.js
  - rules/adjectiveOrder.js
  - tables.js (datos de referencia)

7.1 Regla 1: Concordancia Sujeto-Verbo (subjectVerb.js)

Verifica que el sujeto y el verbo concuerden en numero 
(singular/plural).

  - Detecta el numero del sujeto:
    * Pronombres: yo (sing), tu (sing), nosotros (plur), etc.
    * Articulo indefinido (un/una) -> singular
    * Articulo definido + sustantivo -> depende de terminacion
    * Sustantivo -> termina en "s" es plural

  - Detecta el numero del verbo:
    * Termina en "n" o "mos" -> plural
    * "son", "estan", "van", "eran", "fueron" -> plural

  - Si hay CONJ_COORD_COP ("y") entre sustantivos -> plural

7.2 Regla 2: Verbos Modales (modals.js)

Verifica que despues de un verbo modal espanol (poder, deber, 
querer en cualquiera de sus conjugaciones) le siga un verbo en 
infinitivo (terminado en -ar, -er, -ir).

  Modales detectados:
    poder:    puedo, puedes, puede, podemos, pueden, podia, 
              podias, podian, podiamos, podre, podras, podra, 
              podremos, podran
    deber:    debo, debes, debe, debemos, deben, deberia, 
              deberias, deberiamos, deberian
    querer:   quiero, quieres, quiere, queremos, quieren, 
              quisiera, quisieras, quisieran

7.3 Regla 3: Negacion (negation.js)

Verifica que la particula de negacion "no" (ADV_NEG) no este al 
final de la oracion y que tenga un verbo asociado en los tokens 
siguientes.

7.4 Regla 4: Tiempos Verbales (tense.js)

Detecta formas verbales incorrectas usando una tabla de 
irregulares mal conjugados (IRREGULARES_MAL_CONJUGADOS).

  Ejemplos: "goed" -> "went", "runned" -> "ran", "eated" -> "ate",
            "sayed" -> "said", "buyed" -> "bought"

7.5 Regla 5: Orden de Adjetivos (adjectiveOrder.js)

En espanol, los adjetivos calificativos normalmente van DESPUES 
del sustantivo. Esta regla detecta adjetivos que aparecen ANTES 
del sustantivo y los senala como error, a menos que haya un 
verbo copulativo (es, esta, son, estan, etc.) entre el adjetivo 
y el sustantivo.



============================================================================
8. FASE 4: TRADUCCION
============================================================================

Ubicacion: src/compiler/translation/
  - index.js (orquestador)
  - translate.js (logica principal)
  - conjugation.js
  - reorder.js
  - negation.js
  - gender.js
  - format.js

8.1 Proceso de Traduccion

Paso 1: Separacion de componentes
  - Identifica el verbo principal y verbo secundario
  - Identifica el sujeto (explícito o tacito)
  - Identifica la negacion (si existe)
  - El resto son complementos

Paso 2: Determinacion del sujeto
  - Si hay un pronombre personal -> se traduce directamente
  - Si hay un sustantivo -> se traduce
  - Si el sujeto es tacito -> se deduce del verbo conjugado
    (terminacion -o -> "I", -mos -> "we", -n -> "they", 
     -s -> "you", default -> "he")

Paso 3: Conjugacion del verbo en ingles
  - Verbo "to be": se conjuga segun el sujeto (am/is/are/was/were)
  - Verbos modales: can/must/want + verbo base
  - Verbos regulares/irregulares: se conjugan segun la persona
    (3ra persona singular -> +s, +es, +ies)

Paso 4: Reordenacion de frases nominales
  - Espanol: Determinante + Sustantivo + Adjetivo
    Ej: "el gato azul"
  - Ingles:  Determinante + Adjetivo + Sustantivo
    Ej: "the blue cat"

Paso 5: Manejo de negacion
  - Verbo "to be" -> verbo conjugado + "not"
  - Verbo modal -> modal + "not" + verbo base
  - Otros verbos -> auxiliar (do/does/did) + "not" + verbo base

Paso 6: Manejo de preguntas
  - Inversion: auxiliar + sujeto + verbo base
  - "to be" -> verbo conjugado + sujeto
  - Modales -> modal + sujeto + verbo base
  - Otros -> do/does/did + sujeto + verbo base

Paso 7: Formato final
  - Correccion de articulos (a/an segun siguiente palabra)
  - Capitalizacion de la primera letra
  - Signo de puntuacion final (. ? !)
  - Eliminacion de espacios antes de puntuacion

8.2 Conjugacion de Verbos en Ingles (conjugation.js)

Funcion conjugateEnglishVerb(baseVerb, subject):
  - Verbos irregulares: be (am/is/are/was/were), have (has),
    do (does), y modales (can, could, will, etc.)
  - Tercera persona singular:
    * Termina en o, ch, sh, ss, x, z -> +es
    * Termina en consonante + y -> quita y + ies
    * Termina en s -> igual
    * Default -> +s
  - Plural: revierte las reglas de singular

8.3 Reordenacion (reorder.js)

function reordenarFraseNominal(grupo):
  - Entrada: tokens en orden espanol
  - Salida: tokens en orden ingles
  - Orden: Articulos -> Otros -> Adjetivos -> Sustantivos

8.4 Negacion en Ingles (negation.js)

  - "to be" en espanol -> verbo conjugado + "not"
  - Verbo modal -> modal + "not" + verbo base
  - Verbo general -> auxiliar (do/does/did) + "not" + verbo base
  - Deteccion de pasado: verbos terminados en o, io, e, i, 
    ste, eron + irregulares

8.5 Genero (gender.js)

  - Mantiene tabla de genero para ~70 sustantivos comunes
  - Tabla de ~70 adjetivos con forma masculina y femenina
  - Articulos: the = el/la/los/las, a/an = un/una
  - Funciones: obtenerGenero(), esPlural(), traducirArticulo(), 
    traducirAdjetivo()

8.6 Formato (format.js)

  - aplicarContracciones(): "de" + "el" -> "del", "a" + "el" -> "al"
  - capitalizarOracion(): primera letra mayuscula, agregar 
    signos de apertura en espanol ( , )



============================================================================
9. DICCIONARIO Y DATOS LINGUISTICOS
============================================================================

9.1 Estructura del Diccionario

El diccionario base (englishDictionary) almacena palabras en 
ingles con su traduccion al espanol:

  {
    "cat": {
      token: "NOUN",
      category: "Sustantivo",
      translation: "gato"
    }
  }

9.2 Inversion del Diccionario

En dictionary.js, el diccionario se invierte para crear un 
mapeo de espanol a ingles (spanishToEnglishDictionary):

  "gato" -> { token: "NOUN", category: "Sustantivo", 
              translation: "cat" }

Las traducciones multiples separadas por "/" generan multiples 
entradas. Ej: "gato/gata" genera:
  "gato" -> "cat"
  "gata" -> "cat"

9.3 Conjugaciones Dinamicas

Las conjugaciones verbales del espanol se agregan 
dinamicamente desde VERBOS_CONJUGADOS y CONJUGACION_PERSONA 
(conjugation.js).

Ej: love (ama) genera:
  "amar" -> "loves"
  "amo" -> "love" (yo)
  "aman" -> "love" (ellos)
  "amamos" -> "love" (nosotros)
  "amas" -> "love" (tu)

9.4 Cobertura del Diccionario

  +------------------+----------+
  | Categoria        | Entradas |
  +------------------+----------+
  | Articulos        |        3 |
  | Pronombres       |       24 |
  | Determinantes    |       14 |
  | Numerales        |       20 |
  | Sustantivos      |       62 |
  | Adjetivos        |       68 |
  | Verbos           |     ~120 |
  | Adverbios        |      ~50 |
  | Preposiciones    |       27 |
  | Conjunciones     |       18 |
  | Interjecciones   |        9 |
  | Puntuacion       |        8 |
  +------------------+----------+
  | Total (espanol)  |     ~736 |
  +------------------+----------+



============================================================================
10. INTERFAZ DE USUARIO
============================================================================

Ubicacion: src/main.js
Estilos: src/style.css, src/ui/styles/*.css

10.1 Descripcion General

La interfaz presenta un diseno inspirado en el "Class Trial" 
(juicio escolar) de Danganronpa, con:

  - Fondo del aula de juicio (classtrial.webp)
  - Dos personajes a los lados:
    * Makoto Naegi (izquierda): representa la entrada en espanol
    * Kyoko Kirigiri (derecha): representa la salida en ingles
  - Panel central con editor de texto y boton de traduccion
  - Modales para ver el proceso interno del compilador

10.2 Componentes

  a. Editor de entrada (textarea #input-editor)
     - Donde el usuario escribe la oracion en espanol
     - Al escribir, Makoto cambia a sprite "escribiendo"
     - Si deja de escribir 500ms, vuelve a sprite "idle"

  b. Boton de traduccion (#btn-translate)
     - Icono de "Truth Bullet" (bala de verdad)
     - Al presionar, Kyoko cambia a sprite "pensando"
     - Despues de 1 segundo, muestra el resultado

  c. Panel de salida (#translation-display-container)
     - Muestra la traduccion en ingles en un textarea readonly
     - Si hay errores, muestra tarjetas de error estilizadas

  d. Botones de fases del compilador
     - LEXICO: abre modal con Tabla de Simbolos
     - SINTACTICO: abre modal con Arbol Sintactico (AST)
     - SEMANTICO: abre modal con reglas semanticas

  e. Overlay de error (#error-overlay)
     - Reproduce el video "Sore ga chigau yo!"
     - Estilo Rebuttal Showdown de Danganronpa

10.3 Animaciones

  - animate-float: los personajes flotan suavemente
  - is-typing: los personajes se inclinan hacia adelante
  - Modales con animacion de opacidad y escala



============================================================================
11. MANEJO DE ERRORES
============================================================================

11.1 Tipos de Error

  a. Errores Lexicos
     - Caracter invalido
     - Elemento no reconocido
     - Texto de entrada vacio

  b. Errores Sintacticos
     - Sujeto esperado pero no encontrado
     - Verbo esperado pero no encontrado
     - Token inesperado al final

  c. Errores Semanticos
     - Concordancia sujeto-verbo incorrecta
     - Verbo modal sin infinitivo
     - Negacion sin verbo
     - Tiempo verbal incorrecto
     - Orden de adjetivos incorrecto

11.2 Estructura de Error

  {
    numero:       number,
    tipo:         "Lexico" | "Sintactico" | "Semantico",
    palabra:      string,
    posicion:     number,
    descripcion:  string
  }

11.3 Visualizacion de Errores

  - En la interfaz, los errores se muestran como tarjetas 
    estilizadas con tematica Danganronpa
  - Cada tarjeta muestra: tipo de error, posicion, palabra 
    ofensiva y descripcion detallada
  - Se reproduce el video "Sore ga chigau yo!" como efecto 
    de "Rebuttal Showdown" cuando hay errores
  - Los botones de fases se habilitan o deshabilitan segun 
    hasta que fase llego el proceso



============================================================================
12. FLUJO DE COMPILACION COMPLETO
============================================================================

Ejemplo: Entrada "El gato corre"

Paso 1: Lexico
  "El"   -> ART_DEF    -> "the"
  "gato" -> NOUN       -> "cat"
  "corre"-> VERB       -> "run"

  Tabla de Simbolos:
  # | Palabra | Token     | Categoria | Traduccion
  1 | El      | ART_DEF   | Articulo  | the
  2 | gato    | NOUN      | Sustantivo| cat
  3 | corre   | VERB      | Verbo     | run

Paso 2: Sintactico (AST)
  OracionDeclarativa
    +-- Sujeto
    |   +-- Determinante: "El" (ART_DEF)
    |   +-- Sustantivo:   "gato" (NOUN)
    +-- Predicado
        +-- Verbo: "corre" (VERB)

Paso 3: Semantico
  - Sujeto "gato" (singular) + Verbo "corre" (singular) -> OK
  - No hay modales -> OK
  - No hay negacion -> OK
  - No hay irregulares -> OK
  - No hay adjetivos -> OK

Paso 4: Traduccion
  - Sujeto: "The cat"
  - Verbo: "runs" (3ra persona singular de "run")
  - Orden: "The cat runs."
  - Salida: "The cat runs"



============================================================================
13. GUIA DE USO
============================================================================

13.1 Instalacion

  Requisitos:
    - Node.js 18+ 
    - npm o pnpm

  Pasos:
    1. Descomprimir el proyecto
    2. Abrir terminal en la carpeta del proyecto
    3. Ejecutar: npm install
    4. Ejecutar: npm run dev
    5. Abrir navegador en http://localhost:5173

13.2 Comandos Disponibles

  npm run dev      -> Inicia servidor de desarrollo Vite
  npm run build    -> Compila para produccion (genera dist/)
  npm run preview  -> Vista previa de la compilacion

13.3 Como Usar el Traductor

  1. Escribir una oracion en espanol en el panel izquierdo
     Ej: "El gato corre rapido"

  2. Presionar el boton "TRADUCIR" (con icono de Truth Bullet)

  3. Ver el resultado:
     - Si es correcto -> aparece la traduccion en ingles
     - Si hay errores  -> aparece video de error y tarjetas 
                          con la descripcion de cada error

  4. Explorar las fases del compilador con los botones:
     - LEXICO:   Muestra la tabla de simbolos completa
     - SINTACTICO: Muestra el arbol de derivacion (AST)
     - SEMANTICO:  Muestra las reglas semanticas evaluadas

13.4 Tipos de Oraciones Soportadas

  - Declarativas:   "El gato corre" -> "The cat runs"
  - Negativas:      "El gato no corre" -> "The cat does not run"
  - Interrogativas: "Corre el gato?" -> "Does the cat run?"
  - Exclamativas:   "El gato corre!" -> "The cat runs!"
  - Con interjecciones: "Hola mundo" -> "Hello world"
  - Sujeto compuesto: "El gato y el perro corren" -> "The cat and the dog run"
  - Con adjetivos: "El gato azul" -> "The blue cat"
  - Verbos modales: "El gato puede correr" -> "The cat can run"



============================================================================
14. REQUISITOS DEL SISTEMA
============================================================================

14.1 Hardware

  - Procesador: 1 GHz o superior
  - Memoria RAM: 512 MB minimo
  - Espacio en disco: 50 MB

14.2 Software

  - Sistema operativo: Windows 10+, macOS 12+, Linux
  - Navegador web: Chrome 90+, Firefox 90+, Edge 90+, Safari 15+
  - Node.js 18+ (para desarrollo)
  - npm 9+ o pnpm 8+ (para desarrollo)

14.3 Dependencias (desarrollo)

  - vite: ^5.0.0 (bundler de desarrollo)
  - Conexion a internet (para APIs externas:
    MyMemory Translation API y Free Dictionary API)

14.4 Conexion a Internet

  El programa puede funcionar sin internet para palabras que 
  esten en el diccionario local. Para palabras desconocidas, 
  intenta consultar APIs externas. Si no hay conexion, utiliza 
  el sistema heuristico guessPOS como fallback.



============================================================================
15. CREDITOS
============================================================================

Proyecto Grupal Compiladores 2026
Universidad Mariano Galvez de Guatemala

Desarrollado por:
  (Completar con nombres del grupo)

Tecnologias utilizadas:
  - Vite 5.x (bundler)
  - JavaScript (ESModules)
  - MyMemory Translation API
  - Free Dictionary API (dictionaryapi.dev)

Recursos artisticos:
  - Sprites: Danganronpa (makoto Naegi, Kyoko Kirigiri)
  - Video: "Sore ga chigau yo!" de Danganronpa
  - Fuentes: Google Fonts (Anton, Teko)

=======================================================================
                         FIN DEL DOCUMENTO
=======================================================================
