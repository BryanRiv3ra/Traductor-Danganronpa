const GRUPOS = {
  SUJETO_INICIO:  ["PRON_PERS", "ART_DEF", "ART_INDEF", "POS", "PRON_DEM", "DET_INDEF", "NOUN", "NUM_CARD"],
  DETERMINANTES:  ["ART_DEF", "ART_INDEF", "POS", "PRON_DEM", "DET_INDEF", "NUM_CARD", "NUM_ORD"],
  ADVERBIOS:      ["ADV_MODE", "ADV_TIME", "ADV_PLACE", "ADV_QUANT", "ADV_AFFIRM", "ADV_NEG", "ADV_DOUBT"],
  CONJUNCIONES:   ["CONJ_COORD_COP", "CONJ_COORD_ADV", "CONJ_COORD_DIS", "CONJ_COORD_EXP",
                   "CONJ_SUB_COND", "CONJ_SUB_CAUS", "CONJ_SUB_CONC", "CONJ_SUB_TEMP",
                   "CONJ_SUB_COMP", "CONJ_SUB_CONS", "CONJ_SUB_FIN"],
  VERBOS_AUX:     ["is", "are", "was", "were", "do", "does", "did", "can", "could",
                   "will", "would", "should", "must", "may", "might", "have", "has", "had"],
  PUNTUACION:     ["PUNCT_PERIOD", "PUNCT_COMMA", "PUNCT_QUESTION", "PUNCT_EXCLAIM",
                   "PUNCT_SEMICOLON", "PUNCT_COLON", "PUNCT_APOST", "PUNCT_QUOTE"]
};

export { GRUPOS };
