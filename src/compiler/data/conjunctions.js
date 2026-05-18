const conjunctions = {
  // Coordinantes
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
  "both": {
    token: "CONJ_COORD_COP",
    category: "Conjunción coordinante copulativa",
    translation: "tanto...como/ambos"
  },

  // Subordinantes
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
  }
};

export { conjunctions };