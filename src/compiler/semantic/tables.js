const SUJETOS_SINGULARES = new Set([
  "he", "she", "it",
  "NOUN",
  "PRON_DEM"
]);

const SUJETOS_PLURALES = new Set([
  "i", "we", "you", "they"
]);

const VERBOS_MODALES = new Set([
  "can", "could", "will", "would",
  "should", "must", "may", "might", "shall"
]);

const VERBOS_AUX_NEGACION = new Set([
  "is", "are", "was", "were",
  "do", "does", "did",
  "have", "has", "had",
  "can", "could", "will", "would",
  "should", "must", "may", "might"
]);

const MODALES_MAL_CONJUGADOS = [
  "cans", "coulds", "wills", "woulds",
  "shoulds", "musts", "mays", "mights", "shalls"
];

const IRREGULARES_MAL_CONJUGADOS = {
  "goed": "went", "gos": "goes",
  "runned": "ran",
  "eated": "ate",
  "drinked": "drank",
  "sleeped": "slept",
  "comed": "came",
  "seed": "saw", "sawed": "saw",
  "knowed": "knew",
  "thinked": "thought",
  "sayed": "said",
  "gived": "gave",
  "taked": "took",
  "maked": "made",
  "writed": "wrote",
  "readed": "read",
  "buyed": "bought",
  "selled": "sold",
  "feeled": "felt",
  "finded": "found",
  "leaved": "left",
  "keeped": "kept",
  "bringed": "brought",
  "haved": "had",
  "doed": "did",
  "beed": "was/were",
  "singed": "sang",
  "danced": null,
  "sitted": "sat",
  "standed": "stood",
  "beginned": "began",
  "breaked": "broke",
  "choosed": "chose",
  "flied": "flew",
  "growed": "grew",
  "speaked": "spoke",
  "swimmed": "swam",
  "winned": "won",
  "weared": "wore",
  "falled": "fell",
  "forgetted": "forgot",
  "getted": "got",
  "hitted": "hit",
  "holded": "held",
  "losed": "lost",
  "meeted": "met",
  "payed": "paid",
  "sended": "sent",
  "setted": "set",
  "spended": "spent",
  "teached": "taught",
  "telled": "told",
  "understanded": "understood",
  "waked": "woke"
};

const VERBOS_COPULATIVOS = new Set([
  "is", "are", "was", "were", "be", "been",
  "seem", "seems", "seemed", "look", "looks", "looked",
  "feel", "feels", "felt", "appear", "appears", "appeared",
  "become", "becomes", "became"
]);

export {
    SUJETOS_SINGULARES,
    SUJETOS_PLURALES,
    VERBOS_MODALES,
    VERBOS_AUX_NEGACION,
    MODALES_MAL_CONJUGADOS,
    IRREGULARES_MAL_CONJUGADOS,
    VERBOS_COPULATIVOS
  };