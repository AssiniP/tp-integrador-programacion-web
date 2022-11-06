//solo categorias! no funca en index
//CUANDO BORRAS DE GOLPE NO SE ACTUALIZA
const buscador = document.getElementById("buscador");
const categorias = ["baño", "cocina", "hogar", "infusores", "latas",
 "canastos", "veladores", "utensillos", "alacena"];
const cruz = document.getElementById("cruz");
const lupa = document.getElementById("lupa");

cruz.addEventListener("click", ()=>{
    lupa.classList.remove("oculto")
    queElIconoSeActualize();
    buscador.value;
    categorias.forEach(string => resetearLaVisualizacionDeCategorias(string));
})

buscador.addEventListener("keyup", ()=>{
    lupa.classList.add("oculto")
    queElIconoSeActualize();
    categorias.forEach(string => resetearLaVisualizacionDeCategorias(string))
    const busqueda = buscador.value.toLowerCase();
    const categoriasCorrectas = categorias.filter(string => string.indexOf(busqueda) > -1);
    const categoriasIncorrectas = categorias.filter(string => string.indexOf(busqueda) == -1);
    categoriasIncorrectas.forEach(string => ocultarLaCategoriaQueNoCoincide(string))
});

function queElIconoSeActualize(){
    if(lupa.classList.contains("oculto")){
        cruz.classList.remove("oculto");
    } else{
        cruz.classList.add("oculto");
    }
}

function ocultarLaCategoriaQueNoCoincide(categoria){
    let categoriaAOcultar = document.getElementById(categoria);
    categoriaAOcultar.classList.add("oculto");
}

function resetearLaVisualizacionDeCategorias(string){
    let categoria = document.getElementById(string)
    categoria.classList.remove("oculto");
}