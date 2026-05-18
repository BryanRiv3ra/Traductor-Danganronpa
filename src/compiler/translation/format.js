function aplicarContracciones(palabras) {
  const resultado = [];
  for (let i = 0; i < palabras.length; i++) {
    const actual = palabras[i].toLowerCase();
    const siguiente = (palabras[i + 1] || "").toLowerCase();

    if (actual === "de" && siguiente === "el") {
      resultado.push("del");
      i++;
    } else if (actual === "a" && siguiente === "el") {
      resultado.push("al");
      i++;
    } else {
      resultado.push(palabras[i]);
    }
  }
  return resultado;
}

function capitalizarOracion(palabras, tipoOracion) {
  if (palabras.length === 0) return palabras;

  palabras[0] = palabras[0].charAt(0).toUpperCase() + palabras[0].slice(1);

  if (tipoOracion === "Interrogativa" && !palabras[0].startsWith("¿")) {
    palabras.unshift("¿");
  }
  if (tipoOracion === "Exclamativa" && !palabras[0].startsWith("¡")) {
    palabras.unshift("¡");
  }

  return palabras;
}

export { aplicarContracciones, capitalizarOracion };