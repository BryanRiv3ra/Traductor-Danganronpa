// ============================================================
//  dictionary.js
//  Diccionario Inglés → Español para el compilador traductor
//  Proyecto Grupal Compiladores 2026
//  Universidad Mariano Gálvez de Guatemala
// ============================================================

const dictionary = {

  // ─────────────────────────────────────────────
  // ARTÍCULOS DEFINIDOS
  // ─────────────────────────────────────────────
  "the": {
    token: "ART_DEF",
    category: "Artículo definido",
    translation: "el/la/los/las"
  },

  // ─────────────────────────────────────────────
  // ARTÍCULOS INDEFINIDOS
  // ─────────────────────────────────────────────
  "a": {
    token: "ART_INDEF",
    category: "Artículo indefinido",
    translation: "un/una"
  },
  "an": {
    token: "ART_INDEF",
    category: "Artículo indefinido",
    translation: "un/una"
  },

  // ─────────────────────────────────────────────
  // PRONOMBRES PERSONALES
  // ─────────────────────────────────────────────
  "i": {
    token: "PRON_PERS",
    category: "Pronombre personal",
    translation: "yo"
  },
  "you": {
    token: "PRON_PERS",
    category: "Pronombre personal",
    translation: "tú/usted"
  },
  "he": {
    token: "PRON_PERS",
    category: "Pronombre personal",
    translation: "él"
  },
  "she": {
    token: "PRON_PERS",
    category: "Pronombre personal",
    translation: "ella"
  },
  "it": {
    token: "PRON_PERS",
    category: "Pronombre personal",
    translation: "ello"
  },
  "we": {
    token: "PRON_PERS",
    category: "Pronombre personal",
    translation: "nosotros"
  },
  "they": {
    token: "PRON_PERS",
    category: "Pronombre personal",
    translation: "ellos/ellas"
  },
  "me": {
    token: "PRON_PERS",
    category: "Pronombre personal",
    translation: "me/mí"
  },
  "him": {
    token: "PRON_PERS",
    category: "Pronombre personal",
    translation: "le/lo/él"
  },
  "her": {
    token: "PRON_PERS",
    category: "Pronombre personal",
    translation: "le/la/ella"
  },
  "us": {
    token: "PRON_PERS",
    category: "Pronombre personal",
    translation: "nos/nosotros"
  },
  "them": {
    token: "PRON_PERS",
    category: "Pronombre personal",
    translation: "les/los/ellos"
  },

  // ─────────────────────────────────────────────
  // PRONOMBRES DEMOSTRATIVOS
  // ─────────────────────────────────────────────
  "this": {
    token: "PRON_DEM",
    category: "Pronombre demostrativo",
    translation: "este/esta/esto"
  },
  "that": {
    token: "PRON_DEM",
    category: "Pronombre demostrativo",
    translation: "ese/esa/eso/aquel"
  },
  "these": {
    token: "PRON_DEM",
    category: "Pronombre demostrativo",
    translation: "estos/estas"
  },
  "those": {
    token: "PRON_DEM",
    category: "Pronombre demostrativo",
    translation: "esos/esas/aquellos"
  },

  // ─────────────────────────────────────────────
  // PRONOMBRES INTERROGATIVOS
  // ─────────────────────────────────────────────
  "who": {
    token: "PRON_INTER",
    category: "Pronombre interrogativo",
    translation: "quién/quiénes"
  },
  "what": {
    token: "PRON_INTER",
    category: "Pronombre interrogativo",
    translation: "qué"
  },
  "which": {
    token: "PRON_INTER",
    category: "Pronombre interrogativo",
    translation: "cuál/cuáles"
  },
  "whose": {
    token: "PRON_INTER",
    category: "Pronombre interrogativo",
    translation: "de quién"
  },
  "whom": {
    token: "PRON_INTER",
    category: "Pronombre interrogativo",
    translation: "a quién"
  },

  // ─────────────────────────────────────────────
  // POSESIVOS
  // ─────────────────────────────────────────────
  "my": {
    token: "POS",
    category: "Posesivo",
    translation: "mi/mis"
  },
  "your": {
    token: "POS",
    category: "Posesivo",
    translation: "tu/tus/su/sus"
  },
  "his": {
    token: "POS",
    category: "Posesivo",
    translation: "su/sus (de él)"
  },
  "its": {
    token: "POS",
    category: "Posesivo",
    translation: "su/sus (de ello)"
  },
  "our": {
    token: "POS",
    category: "Posesivo",
    translation: "nuestro/nuestra"
  },
  "their": {
    token: "POS",
    category: "Posesivo",
    translation: "su/sus (de ellos)"
  },

  // ─────────────────────────────────────────────
  // DEMOSTRATIVOS (determinantes)
  // ─────────────────────────────────────────────
  // "this", "that", "these", "those" ya cubiertos arriba

  // ─────────────────────────────────────────────
  // INDEFINIDOS
  // ─────────────────────────────────────────────
  "some": {
    token: "DET_INDEF",
    category: "Determinante indefinido",
    translation: "algún/alguna/algunos"
  },
  "any": {
    token: "DET_INDEF",
    category: "Determinante indefinido",
    translation: "algún/ningún/cualquier"
  },
  "every": {
    token: "DET_INDEF",
    category: "Determinante indefinido",
    translation: "cada/todo"
  },
  "all": {
    token: "DET_INDEF",
    category: "Determinante indefinido",
    translation: "todo/todos"
  },
  "each": {
    token: "DET_INDEF",
    category: "Determinante indefinido",
    translation: "cada"
  },
  "both": {
    token: "DET_INDEF",
    category: "Determinante indefinido",
    translation: "ambos/las dos"
  },
  "few": {
    token: "DET_INDEF",
    category: "Determinante indefinido",
    translation: "pocos/pocas"
  },
  "many": {
    token: "DET_INDEF",
    category: "Determinante indefinido",
    translation: "muchos/muchas"
  },
  "much": {
    token: "DET_INDEF",
    category: "Determinante indefinido",
    translation: "mucho/mucha"
  },
  "more": {
    token: "DET_INDEF",
    category: "Determinante indefinido",
    translation: "más"
  },
  "most": {
    token: "DET_INDEF",
    category: "Determinante indefinido",
    translation: "la mayoría/el más"
  },
  "no": {
    token: "DET_INDEF",
    category: "Determinante indefinido",
    translation: "ningún/ninguna"
  },
  "other": {
    token: "DET_INDEF",
    category: "Determinante indefinido",
    translation: "otro/otra"
  },
  "another": {
    token: "DET_INDEF",
    category: "Determinante indefinido",
    translation: "otro/otra (más)"
  },

  // ─────────────────────────────────────────────
  // NUMERALES CARDINALES
  // ─────────────────────────────────────────────
  "one": {
    token: "NUM_CARD",
    category: "Numeral cardinal",
    translation: "uno"
  },
  "two": {
    token: "NUM_CARD",
    category: "Numeral cardinal",
    translation: "dos"
  },
  "three": {
    token: "NUM_CARD",
    category: "Numeral cardinal",
    translation: "tres"
  },
  "four": {
    token: "NUM_CARD",
    category: "Numeral cardinal",
    translation: "cuatro"
  },
  "five": {
    token: "NUM_CARD",
    category: "Numeral cardinal",
    translation: "cinco"
  },
  "six": {
    token: "NUM_CARD",
    category: "Numeral cardinal",
    translation: "seis"
  },
  "seven": {
    token: "NUM_CARD",
    category: "Numeral cardinal",
    translation: "siete"
  },
  "eight": {
    token: "NUM_CARD",
    category: "Numeral cardinal",
    translation: "ocho"
  },
  "nine": {
    token: "NUM_CARD",
    category: "Numeral cardinal",
    translation: "nueve"
  },
  "ten": {
    token: "NUM_CARD",
    category: "Numeral cardinal",
    translation: "diez"
  },
  "eleven": {
    token: "NUM_CARD",
    category: "Numeral cardinal",
    translation: "once"
  },
  "twelve": {
    token: "NUM_CARD",
    category: "Numeral cardinal",
    translation: "doce"
  },
  "twenty": {
    token: "NUM_CARD",
    category: "Numeral cardinal",
    translation: "veinte"
  },
  "hundred": {
    token: "NUM_CARD",
    category: "Numeral cardinal",
    translation: "cien/ciento"
  },

  // ─────────────────────────────────────────────
  // NUMERALES ORDINALES
  // ─────────────────────────────────────────────
  "first": {
    token: "NUM_ORD",
    category: "Numeral ordinal",
    translation: "primero/primera"
  },
  "second": {
    token: "NUM_ORD",
    category: "Numeral ordinal",
    translation: "segundo/segunda"
  },
  "third": {
    token: "NUM_ORD",
    category: "Numeral ordinal",
    translation: "tercero/tercera"
  },
  "fourth": {
    token: "NUM_ORD",
    category: "Numeral ordinal",
    translation: "cuarto/cuarta"
  },
  "fifth": {
    token: "NUM_ORD",
    category: "Numeral ordinal",
    translation: "quinto/quinta"
  },
  "last": {
    token: "NUM_ORD",
    category: "Numeral ordinal",
    translation: "último/última"
  },
  "next": {
    token: "NUM_ORD",
    category: "Numeral ordinal",
    translation: "siguiente/próximo"
  },

  // ─────────────────────────────────────────────
  // SUSTANTIVOS
  // ─────────────────────────────────────────────
  "cat": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "gato"
  },
  "dog": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "perro"
  },
  "house": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "casa"
  },
  "car": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "carro/auto"
  },
  "book": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "libro"
  },
  "school": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "escuela"
  },
  "teacher": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "maestro/maestra"
  },
  "student": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "estudiante"
  },
  "man": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "hombre"
  },
  "woman": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "mujer"
  },
  "child": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "niño/niña"
  },
  "children": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "niños/niñas"
  },
  "boy": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "niño/chico"
  },
  "girl": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "niña/chica"
  },
  "water": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "agua"
  },
  "food": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "comida"
  },
  "time": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "tiempo"
  },
  "day": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "día"
  },
  "night": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "noche"
  },
  "city": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "ciudad"
  },
  "country": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "país"
  },
  "family": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "familia"
  },
  "friend": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "amigo/amiga"
  },
  "work": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "trabajo"
  },
  "money": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "dinero"
  },
  "life": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "vida"
  },
  "world": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "mundo"
  },
  "door": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "puerta"
  },
  "window": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "ventana"
  },
  "table": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "mesa"
  },
  "chair": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "silla"
  },
  "phone": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "teléfono"
  },
  "computer": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "computadora"
  },
  "tree": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "árbol"
  },
  "flower": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "flor"
  },
  "sun": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "sol"
  },
  "moon": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "luna"
  },
  "sky": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "cielo"
  },
  "road": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "camino/carretera"
  },
  "street": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "calle"
  },
  "mother": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "madre"
  },
  "father": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "padre"
  },
  "brother": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "hermano"
  },
  "sister": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "hermana"
  },
  "heart": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "corazón"
  },
  "hand": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "mano"
  },
  "eye": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "ojo"
  },
  "head": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "cabeza"
  },
  "name": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "nombre"
  },
  "place": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "lugar"
  },
  "thing": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "cosa"
  },
  "idea": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "idea"
  },
  "problem": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "problema"
  },
  "question": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "pregunta"
  },
  "answer": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "respuesta"
  },
  "game": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "juego"
  },
  "music": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "música"
  },
  "movie": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "película"
  },
  "letter": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "carta/letra"
  },
  "news": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "noticias"
  },
  "store": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "tienda"
  },
  "hospital": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "hospital"
  },
  "park": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "parque"
  },
  "market": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "mercado"
  },
  "university": {
    token: "NOUN",
    category: "Sustantivo",
    translation: "universidad"
  },

  // ─────────────────────────────────────────────
  // ADJETIVOS CALIFICATIVOS
  // ─────────────────────────────────────────────
  "big": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "grande"
  },
  "small": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "pequeño/pequeña"
  },
  "large": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "grande/amplio"
  },
  "little": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "pequeño/poco"
  },
  "good": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "bueno/buena"
  },
  "bad": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "malo/mala"
  },
  "new": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "nuevo/nueva"
  },
  "old": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "viejo/vieja/antiguo"
  },
  "young": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "joven"
  },
  "happy": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "feliz/contento"
  },
  "sad": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "triste"
  },
  "beautiful": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "hermoso/hermosa/bello"
  },
  "ugly": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "feo/fea"
  },
  "fast": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "rápido/rápida"
  },
  "slow": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "lento/lenta"
  },
  "hot": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "caliente/caluroso"
  },
  "cold": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "frío/fría"
  },
  "hard": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "duro/difícil"
  },
  "easy": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "fácil"
  },
  "long": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "largo/larga"
  },
  "short": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "corto/bajo"
  },
  "tall": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "alto/alta"
  },
  "strong": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "fuerte"
  },
  "weak": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "débil"
  },
  "clean": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "limpio/limpia"
  },
  "dirty": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "sucio/sucia"
  },
  "rich": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "rico/rica"
  },
  "poor": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "pobre"
  },
  "bright": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "brillante/inteligente"
  },
  "dark": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "oscuro/oscura"
  },
  "light": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "ligero/claro"
  },
  "heavy": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "pesado/pesada"
  },
  "smart": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "inteligente"
  },
  "funny": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "gracioso/divertido"
  },
  "serious": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "serio/seria"
  },
  "tired": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "cansado/cansada"
  },
  "sick": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "enfermo/enferma"
  },
  "free": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "libre/gratis"
  },
  "important": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "importante"
  },
  "different": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "diferente"
  },
  "same": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "mismo/misma"
  },
  "true": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "verdadero/cierto"
  },
  "false": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "falso/falsa"
  },
  "right": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "correcto/derecho"
  },
  "wrong": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "incorrecto/equivocado"
  },
  "open": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "abierto/abierta"
  },
  "closed": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "cerrado/cerrada"
  },
  "full": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "lleno/llena"
  },
  "empty": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "vacío/vacía"
  },
  "red": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "rojo/roja"
  },
  "blue": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "azul"
  },
  "green": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "verde"
  },
  "white": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "blanco/blanca"
  },
  "black": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "negro/negra"
  },
  "yellow": {
    token: "ADJ",
    category: "Adjetivo calificativo",
    translation: "amarillo/amarilla"
  },

  // ─────────────────────────────────────────────
  // VERBOS
  // ─────────────────────────────────────────────
  "is": {
    token: "VERB",
    category: "Verbo",
    translation: "es/está"
  },
  "are": {
    token: "VERB",
    category: "Verbo",
    translation: "son/están/eres/estás"
  },
  "was": {
    token: "VERB",
    category: "Verbo",
    translation: "era/estaba/fue"
  },
  "were": {
    token: "VERB",
    category: "Verbo",
    translation: "eran/estaban/fueron"
  },
  "be": {
    token: "VERB",
    category: "Verbo",
    translation: "ser/estar"
  },
  "been": {
    token: "VERB",
    category: "Verbo",
    translation: "sido/estado"
  },
  "have": {
    token: "VERB",
    category: "Verbo",
    translation: "tener/haber"
  },
  "has": {
    token: "VERB",
    category: "Verbo",
    translation: "tiene/ha"
  },
  "had": {
    token: "VERB",
    category: "Verbo",
    translation: "tenía/tuvo/había"
  },
  "do": {
    token: "VERB",
    category: "Verbo",
    translation: "hacer"
  },
  "does": {
    token: "VERB",
    category: "Verbo",
    translation: "hace"
  },
  "did": {
    token: "VERB",
    category: "Verbo",
    translation: "hizo/hacía"
  },
  "go": {
    token: "VERB",
    category: "Verbo",
    translation: "ir"
  },
  "goes": {
    token: "VERB",
    category: "Verbo",
    translation: "va"
  },
  "went": {
    token: "VERB",
    category: "Verbo",
    translation: "fue/fui"
  },
  "come": {
    token: "VERB",
    category: "Verbo",
    translation: "venir"
  },
  "comes": {
    token: "VERB",
    category: "Verbo",
    translation: "viene"
  },
  "came": {
    token: "VERB",
    category: "Verbo",
    translation: "vino/vine"
  },
  "run": {
    token: "VERB",
    category: "Verbo",
    translation: "correr"
  },
  "runs": {
    token: "VERB",
    category: "Verbo",
    translation: "corre"
  },
  "ran": {
    token: "VERB",
    category: "Verbo",
    translation: "corrió/corrí"
  },
  "eat": {
    token: "VERB",
    category: "Verbo",
    translation: "comer"
  },
  "eats": {
    token: "VERB",
    category: "Verbo",
    translation: "come"
  },
  "ate": {
    token: "VERB",
    category: "Verbo",
    translation: "comió/comí"
  },
  "drink": {
    token: "VERB",
    category: "Verbo",
    translation: "beber/tomar"
  },
  "drinks": {
    token: "VERB",
    category: "Verbo",
    translation: "bebe/toma"
  },
  "drank": {
    token: "VERB",
    category: "Verbo",
    translation: "bebió/tomó"
  },
  "sleep": {
    token: "VERB",
    category: "Verbo",
    translation: "dormir"
  },
  "sleeps": {
    token: "VERB",
    category: "Verbo",
    translation: "duerme"
  },
  "slept": {
    token: "VERB",
    category: "Verbo",
    translation: "durmió"
  },
  "walk": {
    token: "VERB",
    category: "Verbo",
    translation: "caminar"
  },
  "walks": {
    token: "VERB",
    category: "Verbo",
    translation: "camina"
  },
  "walked": {
    token: "VERB",
    category: "Verbo",
    translation: "caminó"
  },
  "talk": {
    token: "VERB",
    category: "Verbo",
    translation: "hablar"
  },
  "talks": {
    token: "VERB",
    category: "Verbo",
    translation: "habla"
  },
  "talked": {
    token: "VERB",
    category: "Verbo",
    translation: "habló"
  },
  "say": {
    token: "VERB",
    category: "Verbo",
    translation: "decir"
  },
  "says": {
    token: "VERB",
    category: "Verbo",
    translation: "dice"
  },
  "said": {
    token: "VERB",
    category: "Verbo",
    translation: "dijo/dije"
  },
  "see": {
    token: "VERB",
    category: "Verbo",
    translation: "ver"
  },
  "sees": {
    token: "VERB",
    category: "Verbo",
    translation: "ve"
  },
  "saw": {
    token: "VERB",
    category: "Verbo",
    translation: "vio/vi"
  },
  "know": {
    token: "VERB",
    category: "Verbo",
    translation: "saber/conocer"
  },
  "knows": {
    token: "VERB",
    category: "Verbo",
    translation: "sabe/conoce"
  },
  "knew": {
    token: "VERB",
    category: "Verbo",
    translation: "sabía/conocía"
  },
  "think": {
    token: "VERB",
    category: "Verbo",
    translation: "pensar"
  },
  "thinks": {
    token: "VERB",
    category: "Verbo",
    translation: "piensa"
  },
  "thought": {
    token: "VERB",
    category: "Verbo",
    translation: "pensó/pensaba"
  },
  "want": {
    token: "VERB",
    category: "Verbo",
    translation: "querer"
  },
  "wants": {
    token: "VERB",
    category: "Verbo",
    translation: "quiere"
  },
  "wanted": {
    token: "VERB",
    category: "Verbo",
    translation: "quería/quiso"
  },
  "need": {
    token: "VERB",
    category: "Verbo",
    translation: "necesitar"
  },
  "needs": {
    token: "VERB",
    category: "Verbo",
    translation: "necesita"
  },
  "needed": {
    token: "VERB",
    category: "Verbo",
    translation: "necesitaba"
  },
  "love": {
    token: "VERB",
    category: "Verbo",
    translation: "amar/querer"
  },
  "loves": {
    token: "VERB",
    category: "Verbo",
    translation: "ama/quiere"
  },
  "loved": {
    token: "VERB",
    category: "Verbo",
    translation: "amaba/amó"
  },
  "like": {
    token: "VERB",
    category: "Verbo",
    translation: "gustar/agradar"
  },
  "likes": {
    token: "VERB",
    category: "Verbo",
    translation: "gusta"
  },
  "liked": {
    token: "VERB",
    category: "Verbo",
    translation: "gustaba"
  },
  "give": {
    token: "VERB",
    category: "Verbo",
    translation: "dar"
  },
  "gives": {
    token: "VERB",
    category: "Verbo",
    translation: "da"
  },
  "gave": {
    token: "VERB",
    category: "Verbo",
    translation: "dio/di"
  },
  "take": {
    token: "VERB",
    category: "Verbo",
    translation: "tomar/llevar"
  },
  "takes": {
    token: "VERB",
    category: "Verbo",
    translation: "toma/lleva"
  },
  "took": {
    token: "VERB",
    category: "Verbo",
    translation: "tomó/llevó"
  },
  "make": {
    token: "VERB",
    category: "Verbo",
    translation: "hacer/fabricar"
  },
  "makes": {
    token: "VERB",
    category: "Verbo",
    translation: "hace/fabrica"
  },
  "made": {
    token: "VERB",
    category: "Verbo",
    translation: "hizo/fabricó"
  },
  "write": {
    token: "VERB",
    category: "Verbo",
    translation: "escribir"
  },
  "writes": {
    token: "VERB",
    category: "Verbo",
    translation: "escribe"
  },
  "wrote": {
    token: "VERB",
    category: "Verbo",
    translation: "escribió"
  },
  "read": {
    token: "VERB",
    category: "Verbo",
    translation: "leer"
  },
  "reads": {
    token: "VERB",
    category: "Verbo",
    translation: "lee"
  },
  "play": {
    token: "VERB",
    category: "Verbo",
    translation: "jugar/tocar"
  },
  "plays": {
    token: "VERB",
    category: "Verbo",
    translation: "juega/toca"
  },
  "played": {
    token: "VERB",
    category: "Verbo",
    translation: "jugó/tocó"
  },
  "study": {
    token: "VERB",
    category: "Verbo",
    translation: "estudiar"
  },
  "studies": {
    token: "VERB",
    category: "Verbo",
    translation: "estudia"
  },
  "studied": {
    token: "VERB",
    category: "Verbo",
    translation: "estudió"
  },
  "help": {
    token: "VERB",
    category: "Verbo",
    translation: "ayudar"
  },
  "helps": {
    token: "VERB",
    category: "Verbo",
    translation: "ayuda"
  },
  "helped": {
    token: "VERB",
    category: "Verbo",
    translation: "ayudó"
  },
  "can": {
    token: "VERB",
    category: "Verbo modal",
    translation: "poder"
  },
  "could": {
    token: "VERB",
    category: "Verbo modal",
    translation: "podría/podía"
  },
  "will": {
    token: "VERB",
    category: "Verbo modal",
    translation: "will (futuro)"
  },
  "would": {
    token: "VERB",
    category: "Verbo modal",
    translation: "haría/quisiera"
  },
  "should": {
    token: "VERB",
    category: "Verbo modal",
    translation: "debería"
  },
  "must": {
    token: "VERB",
    category: "Verbo modal",
    translation: "deber/tener que"
  },
  "may": {
    token: "VERB",
    category: "Verbo modal",
    translation: "poder (permiso)"
  },
  "might": {
    token: "VERB",
    category: "Verbo modal",
    translation: "podría (posibilidad)"
  },

  // ─────────────────────────────────────────────
  // ADVERBIOS DE TIEMPO
  // ─────────────────────────────────────────────
  "now": {
    token: "ADV_TIME",
    category: "Adverbio de tiempo",
    translation: "ahora"
  },
  "today": {
    token: "ADV_TIME",
    category: "Adverbio de tiempo",
    translation: "hoy"
  },
  "yesterday": {
    token: "ADV_TIME",
    category: "Adverbio de tiempo",
    translation: "ayer"
  },
  "tomorrow": {
    token: "ADV_TIME",
    category: "Adverbio de tiempo",
    translation: "mañana"
  },
  "always": {
    token: "ADV_TIME",
    category: "Adverbio de tiempo",
    translation: "siempre"
  },
  "never": {
    token: "ADV_TIME",
    category: "Adverbio de tiempo",
    translation: "nunca"
  },
  "sometimes": {
    token: "ADV_TIME",
    category: "Adverbio de tiempo",
    translation: "a veces"
  },
  "often": {
    token: "ADV_TIME",
    category: "Adverbio de tiempo",
    translation: "a menudo/frecuentemente"
  },
  "soon": {
    token: "ADV_TIME",
    category: "Adverbio de tiempo",
    translation: "pronto"
  },
  "already": {
    token: "ADV_TIME",
    category: "Adverbio de tiempo",
    translation: "ya"
  },
  "still": {
    token: "ADV_TIME",
    category: "Adverbio de tiempo",
    translation: "todavía/aún"
  },
  "late": {
    token: "ADV_TIME",
    category: "Adverbio de tiempo",
    translation: "tarde"
  },
  "early": {
    token: "ADV_TIME",
    category: "Adverbio de tiempo",
    translation: "temprano"
  },
  "recently": {
    token: "ADV_TIME",
    category: "Adverbio de tiempo",
    translation: "recientemente"
  },

  // ─────────────────────────────────────────────
  // ADVERBIOS DE LUGAR
  // ─────────────────────────────────────────────
  "here": {
    token: "ADV_PLACE",
    category: "Adverbio de lugar",
    translation: "aquí/acá"
  },
  "there": {
    token: "ADV_PLACE",
    category: "Adverbio de lugar",
    translation: "allí/allá"
  },
  "where": {
    token: "ADV_PLACE",
    category: "Adverbio de lugar",
    translation: "dónde/donde"
  },
  "everywhere": {
    token: "ADV_PLACE",
    category: "Adverbio de lugar",
    translation: "en todas partes"
  },
  "somewhere": {
    token: "ADV_PLACE",
    category: "Adverbio de lugar",
    translation: "en algún lugar"
  },
  "nowhere": {
    token: "ADV_PLACE",
    category: "Adverbio de lugar",
    translation: "en ningún lugar"
  },
  "outside": {
    token: "ADV_PLACE",
    category: "Adverbio de lugar",
    translation: "afuera"
  },
  "inside": {
    token: "ADV_PLACE",
    category: "Adverbio de lugar",
    translation: "adentro"
  },
  "above": {
    token: "ADV_PLACE",
    category: "Adverbio de lugar",
    translation: "arriba/encima"
  },
  "below": {
    token: "ADV_PLACE",
    category: "Adverbio de lugar",
    translation: "abajo/debajo"
  },

  // ─────────────────────────────────────────────
  // ADVERBIOS DE CANTIDAD
  // ─────────────────────────────────────────────
  "very": {
    token: "ADV_QUANT",
    category: "Adverbio de cantidad",
    translation: "muy"
  },
  "too": {
    token: "ADV_QUANT",
    category: "Adverbio de cantidad",
    translation: "demasiado/también"
  },
  "enough": {
    token: "ADV_QUANT",
    category: "Adverbio de cantidad",
    translation: "suficiente/bastante"
  },
  "almost": {
    token: "ADV_QUANT",
    category: "Adverbio de cantidad",
    translation: "casi"
  },
  "quite": {
    token: "ADV_QUANT",
    category: "Adverbio de cantidad",
    translation: "bastante/muy"
  },
  "really": {
    token: "ADV_QUANT",
    category: "Adverbio de cantidad",
    translation: "realmente/muy"
  },
  "so": {
    token: "ADV_QUANT",
    category: "Adverbio de cantidad",
    translation: "tan/así"
  },
  "just": {
    token: "ADV_QUANT",
    category: "Adverbio de cantidad",
    translation: "solo/justo/recién"
  },

  // ─────────────────────────────────────────────
  // ADVERBIOS DE MODO
  // ─────────────────────────────────────────────
  "quickly": {
    token: "ADV_MODE",
    category: "Adverbio de modo",
    translation: "rápidamente"
  },
  "slowly": {
    token: "ADV_MODE",
    category: "Adverbio de modo",
    translation: "lentamente"
  },
  "well": {
    token: "ADV_MODE",
    category: "Adverbio de modo",
    translation: "bien"
  },
  "badly": {
    token: "ADV_MODE",
    category: "Adverbio de modo",
    translation: "mal"
  },
  "carefully": {
    token: "ADV_MODE",
    category: "Adverbio de modo",
    translation: "cuidadosamente"
  },
  "easily": {
    token: "ADV_MODE",
    category: "Adverbio de modo",
    translation: "fácilmente"
  },
  "together": {
    token: "ADV_MODE",
    category: "Adverbio de modo",
    translation: "juntos/juntas"
  },
  "alone": {
    token: "ADV_MODE",
    category: "Adverbio de modo",
    translation: "solo/sola"
  },

  // ─────────────────────────────────────────────
  // ADVERBIOS DE AFIRMACIÓN
  // ─────────────────────────────────────────────
  "yes": {
    token: "ADV_AFFIRM",
    category: "Adverbio de afirmación",
    translation: "sí"
  },
  "indeed": {
    token: "ADV_AFFIRM",
    category: "Adverbio de afirmación",
    translation: "en efecto/ciertamente"
  },
  "certainly": {
    token: "ADV_AFFIRM",
    category: "Adverbio de afirmación",
    translation: "ciertamente"
  },
  "definitely": {
    token: "ADV_AFFIRM",
    category: "Adverbio de afirmación",
    translation: "definitivamente"
  },
  "absolutely": {
    token: "ADV_AFFIRM",
    category: "Adverbio de afirmación",
    translation: "absolutamente"
  },

  // ─────────────────────────────────────────────
  // ADVERBIOS DE NEGACIÓN
  // ─────────────────────────────────────────────
  "not": {
    token: "ADV_NEG",
    category: "Adverbio de negación",
    translation: "no"
  },
  "neither": {
    token: "ADV_NEG",
    category: "Adverbio de negación",
    translation: "ni/tampoco"
  },
  "nor": {
    token: "ADV_NEG",
    category: "Adverbio de negación",
    translation: "ni"
  },

  // ─────────────────────────────────────────────
  // ADVERBIOS DE DUDA
  // ─────────────────────────────────────────────
  "maybe": {
    token: "ADV_DOUBT",
    category: "Adverbio de duda",
    translation: "quizás/tal vez"
  },
  "perhaps": {
    token: "ADV_DOUBT",
    category: "Adverbio de duda",
    translation: "quizás/tal vez"
  },
  "probably": {
    token: "ADV_DOUBT",
    category: "Adverbio de duda",
    translation: "probablemente"
  },
  "possibly": {
    token: "ADV_DOUBT",
    category: "Adverbio de duda",
    translation: "posiblemente"
  },
  "apparently": {
    token: "ADV_DOUBT",
    category: "Adverbio de duda",
    translation: "aparentemente"
  },

  // ─────────────────────────────────────────────
  // PREPOSICIONES
  // ─────────────────────────────────────────────
  "in": {
    token: "PREP",
    category: "Preposición",
    translation: "en/dentro de"
  },
  "on": {
    token: "PREP",
    category: "Preposición",
    translation: "en/sobre/encima de"
  },
  "at": {
    token: "PREP",
    category: "Preposición",
    translation: "en/a"
  },
  "to": {
    token: "PREP",
    category: "Preposición",
    translation: "a/hacia"
  },
  "from": {
    token: "PREP",
    category: "Preposición",
    translation: "de/desde"
  },
  "with": {
    token: "PREP",
    category: "Preposición",
    translation: "con"
  },
  "without": {
    token: "PREP",
    category: "Preposición",
    translation: "sin"
  },
  "for": {
    token: "PREP",
    category: "Preposición",
    translation: "para/por"
  },
  "of": {
    token: "PREP",
    category: "Preposición",
    translation: "de"
  },
  "about": {
    token: "PREP",
    category: "Preposición",
    translation: "sobre/acerca de"
  },
  "by": {
    token: "PREP",
    category: "Preposición",
    translation: "por/mediante"
  },
  "through": {
    token: "PREP",
    category: "Preposición",
    translation: "a través de"
  },
  "between": {
    token: "PREP",
    category: "Preposición",
    translation: "entre"
  },
  "among": {
    token: "PREP",
    category: "Preposición",
    translation: "entre (varios)"
  },
  "after": {
    token: "PREP",
    category: "Preposición",
    translation: "después de"
  },
  "before": {
    token: "PREP",
    category: "Preposición",
    translation: "antes de"
  },
  "during": {
    token: "PREP",
    category: "Preposición",
    translation: "durante"
  },
  "until": {
    token: "PREP",
    category: "Preposición",
    translation: "hasta"
  },
  "since": {
    token: "PREP",
    category: "Preposición",
    translation: "desde/puesto que"
  },
  "under": {
    token: "PREP",
    category: "Preposición",
    translation: "bajo/debajo de"
  },
  "over": {
    token: "PREP",
    category: "Preposición",
    translation: "sobre/encima de"
  },
  "near": {
    token: "PREP",
    category: "Preposición",
    translation: "cerca de"
  },
  "behind": {
    token: "PREP",
    category: "Preposición",
    translation: "detrás de"
  },
  "beside": {
    token: "PREP",
    category: "Preposición",
    translation: "al lado de"
  },
  "against": {
    token: "PREP",
    category: "Preposición",
    translation: "contra"
  },
  "into": {
    token: "PREP",
    category: "Preposición",
    translation: "dentro de/en"
  },
  "onto": {
    token: "PREP",
    category: "Preposición",
    translation: "sobre/encima de"
  },

  // ─────────────────────────────────────────────
  // CONJUNCIONES COORDINANTES
  // ─────────────────────────────────────────────
  "and": {
    token: "CONJ_COORD_COP",
    category: "Conjunción coordinante copulativa",
    translation: "y"
  },
  "but": {
    token: "CONJ_COORD_ADV",
    category: "Conjunción coordinante adversativa",
    translation: "pero/sino"
  },
  "or": {
    token: "CONJ_COORD_DIS",
    category: "Conjunción coordinante disyuntiva",
    translation: "o"
  },
  "either": {
    token: "CONJ_COORD_DIS",
    category: "Conjunción coordinante disyuntiva",
    translation: "o...o/tampoco"
  },
  "yet": {
    token: "CONJ_COORD_ADV",
    category: "Conjunción coordinante adversativa",
    translation: "pero/sin embargo/aún"
  },
  "so": {
    token: "CONJ_COORD_EXP",
    category: "Conjunción coordinante explicativa",
    translation: "así que/entonces"
  },
  "for": {
    token: "CONJ_COORD_EXP",
    category: "Conjunción coordinante explicativa",
    translation: "pues/ya que"
  },
  "both": {
    token: "CONJ_COORD_COP",
    category: "Conjunción coordinante copulativa",
    translation: "tanto...como/ambos"
  },

  // ─────────────────────────────────────────────
  // CONJUNCIONES SUBORDINANTES
  // ─────────────────────────────────────────────
  "if": {
    token: "CONJ_SUB_COND",
    category: "Conjunción subordinante condicional",
    translation: "si"
  },
  "unless": {
    token: "CONJ_SUB_COND",
    category: "Conjunción subordinante condicional",
    translation: "a menos que"
  },
  "because": {
    token: "CONJ_SUB_CAUS",
    category: "Conjunción subordinante causal",
    translation: "porque"
  },
  "as": {
    token: "CONJ_SUB_CAUS",
    category: "Conjunción subordinante causal",
    translation: "como/mientras/ya que"
  },
  "although": {
    token: "CONJ_SUB_CONC",
    category: "Conjunción subordinante concesiva",
    translation: "aunque"
  },
  "though": {
    token: "CONJ_SUB_CONC",
    category: "Conjunción subordinante concesiva",
    translation: "aunque"
  },
  "even": {
    token: "CONJ_SUB_CONC",
    category: "Conjunción subordinante concesiva",
    translation: "incluso/aún"
  },
  "while": {
    token: "CONJ_SUB_TEMP",
    category: "Conjunción subordinante temporal",
    translation: "mientras"
  },
  "when": {
    token: "CONJ_SUB_TEMP",
    category: "Conjunción subordinante temporal",
    translation: "cuando"
  },
  "whenever": {
    token: "CONJ_SUB_TEMP",
    category: "Conjunción subordinante temporal",
    translation: "siempre que/cuando"
  },
  "than": {
    token: "CONJ_SUB_COMP",
    category: "Conjunción subordinante comparativa",
    translation: "que (comparativo)"
  },
  "that": {
    token: "CONJ_SUB_CONS",
    category: "Conjunción subordinante consecutiva",
    translation: "que"
  },
  "in order": {
    token: "CONJ_SUB_FIN",
    category: "Conjunción subordinante final",
    translation: "para/a fin de"
  },
  "so that": {
    token: "CONJ_SUB_FIN",
    category: "Conjunción subordinante final",
    translation: "para que"
  },

  // ─────────────────────────────────────────────
  // INTERJECCIONES
  // ─────────────────────────────────────────────
  "oh": {
    token: "INTERJ",
    category: "Interjección",
    translation: "oh"
  },
  "wow": {
    token: "INTERJ",
    category: "Interjección",
    translation: "¡vaya!/¡increíble!"
  },
  "hey": {
    token: "INTERJ",
    category: "Interjección",
    translation: "oye/hola"
  },
  "ouch": {
    token: "INTERJ",
    category: "Interjección",
    translation: "¡ay!"
  },
  "hello": {
    token: "INTERJ",
    category: "Interjección",
    translation: "hola"
  },
  "goodbye": {
    token: "INTERJ",
    category: "Interjección",
    translation: "adiós"
  },
  "please": {
    token: "INTERJ",
    category: "Interjección",
    translation: "por favor"
  },
  "thanks": {
    token: "INTERJ",
    category: "Interjección",
    translation: "gracias"
  },
  "sorry": {
    token: "INTERJ",
    category: "Interjección",
    translation: "lo siento/perdón"
  },

  // ─────────────────────────────────────────────
  // SIGNOS DE PUNTUACIÓN
  // ─────────────────────────────────────────────
  ".": {
    token: "PUNCT_PERIOD",
    category: "Signo de puntuación",
    translation: "."
  },
  ",": {
    token: "PUNCT_COMMA",
    category: "Signo de puntuación",
    translation: ","
  },
  "?": {
    token: "PUNCT_QUESTION",
    category: "Signo de puntuación",
    translation: "¿?"
  },
  "!": {
    token: "PUNCT_EXCLAIM",
    category: "Signo de puntuación",
    translation: "¡!"
  },
  ";": {
    token: "PUNCT_SEMICOLON",
    category: "Signo de puntuación",
    translation: ";"
  },
  ":": {
    token: "PUNCT_COLON",
    category: "Signo de puntuación",
    translation: ":"
  },
  "'": {
    token: "PUNCT_APOST",
    category: "Signo de puntuación",
    translation: "'"
  },
  "\"": {
    token: "PUNCT_QUOTE",
    category: "Signo de puntuación",
    translation: "\""
  }
};

// ─────────────────────────────────────────────
// Función para buscar una palabra en el diccionario
// Retorna null si no se encuentra (error léxico)
// ─────────────────────────────────────────────
function lookupWord(word) {
  const key = word.toLowerCase();
  return dictionary[key] || null;
}

// ─────────────────────────────────────────────
// Exportar para uso en otros módulos
// ─────────────────────────────────────────────
if (typeof module !== "undefined" && module.exports) {
  module.exports = { dictionary, lookupWord };
}