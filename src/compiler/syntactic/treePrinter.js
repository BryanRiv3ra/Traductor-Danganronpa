function imprimirArbol(nodo, indent) {
  if (indent === undefined) indent = "";
  if (!nodo) return;

  if (nodo.token) {
    console.log(`${indent}├── [${nodo.tipo}] "${nodo.token.palabra}" → token: ${nodo.token.token}`);
  } else {
    console.log(`${indent}└── <${nodo.tipo}>`);
    if (nodo.hijos) {
      nodo.hijos.forEach(hijo => imprimirArbol(hijo, indent + "    "));
    }
  }
}

export { imprimirArbol };
