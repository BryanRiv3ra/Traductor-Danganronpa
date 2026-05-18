// ============================================================
//  articles.js
//  Artículos definidos e indefinidos del diccionario
//  Proyecto Grupal Compiladores 2026
//  Universidad Mariano Gálvez de Guatemala
// ============================================================

const articles = {
  "the": {
    token: "ART_DEF",
    category: "Artículo definido",
    translation: "el/la/los/las"
  },
  "a": {
    token: "ART_INDEF",
    category: "Artículo indefinido",
    translation: "un/una"
  },
  "an": {
    token: "ART_INDEF",
    category: "Artículo indefinido",
    translation: "un/una"
  }
};

export { articles };