const GENERO_SUSTANTIVOS = {
  "cat": { genero: "m", traduccion: "gato" },
  "dog": { genero: "m", traduccion: "perro" },
  "house": { genero: "f", traduccion: "casa" },
  "car": { genero: "m", traduccion: "carro" },
  "book": { genero: "m", traduccion: "libro" },
  "school": { genero: "f", traduccion: "escuela" },
  "teacher": { genero: "m", traduccion: "maestro" },
  "student": { genero: "m", traduccion: "estudiante" },
  "man": { genero: "m", traduccion: "hombre" },
  "woman": { genero: "f", traduccion: "mujer" },
  "child": { genero: "m", traduccion: "niño" },
  "children": { genero: "m", traduccion: "niños" },
  "boy": { genero: "m", traduccion: "niño" },
  "girl": { genero: "f", traduccion: "niña" },
  "water": { genero: "f", traduccion: "agua" },
  "food": { genero: "f", traduccion: "comida" },
  "time": { genero: "m", traduccion: "tiempo" },
  "day": { genero: "m", traduccion: "día" },
  "night": { genero: "f", traduccion: "noche" },
  "city": { genero: "f", traduccion: "ciudad" },
  "country": { genero: "m", traduccion: "país" },
  "family": { genero: "f", traduccion: "familia" },
  "friend": { genero: "m", traduccion: "amigo" },
  "work": { genero: "m", traduccion: "trabajo" },
  "money": { genero: "m", traduccion: "dinero" },
  "life": { genero: "f", traduccion: "vida" },
  "world": { genero: "m", traduccion: "mundo" },
  "door": { genero: "f", traduccion: "puerta" },
  "window": { genero: "f", traduccion: "ventana" },
  "table": { genero: "f", traduccion: "mesa" },
  "chair": { genero: "f", traduccion: "silla" },
  "phone": { genero: "m", traduccion: "teléfono" },
  "computer": { genero: "f", traduccion: "computadora" },
  "tree": { genero: "m", traduccion: "árbol" },
  "flower": { genero: "f", traduccion: "flor" },
  "sun": { genero: "m", traduccion: "sol" },
  "moon": { genero: "f", traduccion: "luna" },
  "sky": { genero: "m", traduccion: "cielo" },
  "road": { genero: "m", traduccion: "camino" },
  "street": { genero: "f", traduccion: "calle" },
  "mother": { genero: "f", traduccion: "madre" },
  "father": { genero: "m", traduccion: "padre" },
  "brother": { genero: "m", traduccion: "hermano" },
  "sister": { genero: "f", traduccion: "hermana" },
  "heart": { genero: "m", traduccion: "corazón" },
  "hand": { genero: "f", traduccion: "mano" },
  "eye": { genero: "m", traduccion: "ojo" },
  "head": { genero: "f", traduccion: "cabeza" },
  "name": { genero: "m", traduccion: "nombre" },
  "place": { genero: "m", traduccion: "lugar" },
  "thing": { genero: "f", traduccion: "cosa" },
  "idea": { genero: "f", traduccion: "idea" },
  "problem": { genero: "m", traduccion: "problema" },
  "question": { genero: "f", traduccion: "pregunta" },
  "answer": { genero: "f", traduccion: "respuesta" },
  "game": { genero: "m", traduccion: "juego" },
  "music": { genero: "f", traduccion: "música" },
  "movie": { genero: "f", traduccion: "película" },
  "letter": { genero: "f", traduccion: "carta" },
  "news": { genero: "f", traduccion: "noticia" },
  "store": { genero: "f", traduccion: "tienda" },
  "hospital": { genero: "m", traduccion: "hospital" },
  "park": { genero: "m", traduccion: "parque" },
  "market": { genero: "m", traduccion: "mercado" },
  "university": { genero: "f", traduccion: "universidad" },
  "apple": { genero: "f", traduccion: "manzana" },
  "banana": { genero: "m", traduccion: "banano" },
  "code": { genero: "m", traduccion: "código" },
  "coffee": { genero: "m", traduccion: "café" },
  "tea": { genero: "m", traduccion: "té" },
  "mouse": { genero: "m", traduccion: "ratón" },
  "bird": { genero: "m", traduccion: "pájaro" }
};

const ADJETIVOS_GENERO = {
  "big": { m: "grande", f: "grande" },
  "small": { m: "pequeño", f: "pequeña" },
  "large": { m: "grande", f: "grande" },
  "little": { m: "pequeño", f: "pequeña" },
  "good": { m: "bueno", f: "buena" },
  "bad": { m: "malo", f: "mala" },
  "new": { m: "nuevo", f: "nueva" },
  "old": { m: "viejo", f: "vieja" },
  "young": { m: "joven", f: "joven" },
  "happy": { m: "feliz", f: "feliz" },
  "sad": { m: "triste", f: "triste" },
  "beautiful": { m: "hermoso", f: "hermosa" },
  "ugly": { m: "feo", f: "fea" },
  "fast": { m: "rápido", f: "rápida" },
  "fat": { m: "gordo", f: "gorda" },
  "slow": { m: "lento", f: "lenta" },
  "hot": { m: "caliente", f: "caliente" },
  "cold": { m: "frío", f: "fría" },
  "hard": { m: "duro", f: "dura" },
  "easy": { m: "fácil", f: "fácil" },
  "long": { m: "largo", f: "larga" },
  "short": { m: "corto", f: "corta" },
  "tall": { m: "alto", f: "alta" },
  "strong": { m: "fuerte", f: "fuerte" },
  "weak": { m: "débil", f: "débil" },
  "clean": { m: "limpio", f: "limpia" },
  "dirty": { m: "sucio", f: "sucia" },
  "rich": { m: "rico", f: "rica" },
  "poor": { m: "pobre", f: "pobre" },
  "bright": { m: "brillante", f: "brillante" },
  "dark": { m: "oscuro", f: "oscura" },
  "light": { m: "ligero", f: "ligera" },
  "heavy": { m: "pesado", f: "pesada" },
  "smart": { m: "inteligente", f: "inteligente" },
  "funny": { m: "gracioso", f: "graciosa" },
  "serious": { m: "serio", f: "seria" },
  "tired": { m: "cansado", f: "cansada" },
  "sick": { m: "enfermo", f: "enferma" },
  "free": { m: "libre", f: "libre" },
  "important": { m: "importante", f: "importante" },
  "different": { m: "diferente", f: "diferente" },
  "same": { m: "mismo", f: "misma" },
  "true": { m: "verdadero", f: "verdadera" },
  "false": { m: "falso", f: "falsa" },
  "right": { m: "correcto", f: "correcta" },
  "wrong": { m: "incorrecto", f: "incorrecta" },
  "open": { m: "abierto", f: "abierta" },
  "closed": { m: "cerrado", f: "cerrada" },
  "full": { m: "lleno", f: "llena" },
  "empty": { m: "vacío", f: "vacía" },
  "red": { m: "rojo", f: "roja" },
  "blue": { m: "azul", f: "azul" },
  "green": { m: "verde", f: "verde" },
  "white": { m: "blanco", f: "blanca" },
  "black": { m: "negro", f: "negra" },
  "yellow": { m: "amarillo", f: "amarilla" }
};

const ARTICULOS = {
  "the": { m: "el", f: "la", mp: "los", fp: "las" },
  "a": { m: "un", f: "una" },
  "an": { m: "un", f: "una" }
};

function obtenerGenero(sustantivo) {
  const key = sustantivo.toLowerCase();
  return GENERO_SUSTANTIVOS[key]?.genero || "m";
}

function esPlural(sustantivo) {
  const irregulares = ["children", "men", "women", "people", "teeth", "feet", "mice"];
  if (irregulares.includes(sustantivo.toLowerCase())) return true;
  return sustantivo.toLowerCase().endsWith("s") && sustantivo.toLowerCase() !== "news";
}

function traducirArticulo(palabraIngles, sustantivo) {
  const key = palabraIngles.toLowerCase();
  const genero = obtenerGenero(sustantivo);
  const plural = esPlural(sustantivo);
  const tabla = ARTICULOS[key];
  if (!tabla) return palabraIngles;
  if (key === "the") {
    if (plural) return genero === "f" ? tabla.fp : tabla.mp;
    return genero === "f" ? tabla.f : tabla.m;
  }
  return genero === "f" ? tabla.f : tabla.m;
}

function traducirAdjetivo(palabraIngles, sustantivo) {
  const key = palabraIngles.toLowerCase();
  const genero = sustantivo ? obtenerGenero(sustantivo) : "m";
  const tabla = ADJETIVOS_GENERO[key];
  if (!tabla) return palabraIngles;
  return genero === "f" ? tabla.f : tabla.m;
}

export { GENERO_SUSTANTIVOS, ADJETIVOS_GENERO, ARTICULOS, obtenerGenero, esPlural, traducirArticulo, traducirAdjetivo };