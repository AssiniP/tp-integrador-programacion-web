//solo categorias! no funca en index
const buscador = document.getElementById("buscador");
const categorias = ["baño", "cocina", "hogar", "infusores", "latas",
 "canastos", "veladores", "utensillos", "alacena"];

buscador.addEventListener("keyup", ()=>{
    categorias.forEach(string => resetearLaVisualizacionDeCategorias(string))
    const busqueda = buscador.value.toLowerCase();
    const categoriasCorrectas = categorias.filter(string => string.indexOf(busqueda) > -1);
    const categoriasIncorrectas = categorias.filter(string => string.indexOf(busqueda) == -1);
    categoriasIncorrectas.forEach(string => ocultarLaCategoriaQueNoCoincide(string))
});

function ocultarLaCategoriaQueNoCoincide(categoria){
    let categoriaAOcultar = document.getElementById(categoria);
    categoriaAOcultar.classList.add("oculto");
}

function resetearLaVisualizacionDeCategorias(string){
    let categoria = document.getElementById(string)
    categoria.classList.remove("oculto");
}