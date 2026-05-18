const REGEX = {
  WORD: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ']+$/,
  NUMBER: /^\d+(\.\d+)?$/,
  PUNCTUATION: /^[.,?!;:'"¿¡]+$/,
  WHITESPACE: /^\s+$/,
  CONTRACTION: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+'[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+$/,
  INVALID_CHAR: /[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ0-9.,?!;:'"¿¡ \t\n\r]/
};

export { REGEX };