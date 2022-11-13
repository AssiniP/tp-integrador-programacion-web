const regexNroTarjeta = /^[1-9]{10}$/;
const formularioTarjeta = document.querySelector("#formularioTarjeta");

formularioTarjeta.addEventListener("submit", (e)=>{
    e.preventDefault();
    validarCamposDelFormulario();
})

function validarCamposDelFormulario(){
    /* numero de tarjeta no puede ser 0
    el numero de tarjeta debe tener 10 digitos:
    si el ultimo dig es par, la suma de los 9 restantes debe ser impar
    si el ultimo dig es impar, la suma de los 9 restantes debe ser par*/
    let error = false;
    let mensajeDeError = "";
    let numeroDeTarjeta = document.querySelector("#nroTarjeta").value;
    let ultimoDigito = numeroDeTarjeta.charAt(9);

    if(!regexNroTarjeta.test(numeroDeTarjeta)){
        error = true;
        mensajeDeError += "<p> 0 no es un valor posible </p>"
    }

    let resultadoDeLaSumatoria = calcularSiLaSumatoriaDeNumerosEsParOImpar(numeroDeTarjeta);
    let resultadoDelUltimoNumero = calcularSiEsUnNumeroParOImpar(ultimoDigito);

    if(resultadoDeLaSumatoria == resultadoDelUltimoNumero){
        error = true;
        mensajeDeError += "<br><p> Numero de tarjeta inválida</p>"
    }
    

    if(error){
        document.querySelector(".mensajeError").innerHTML = mensajeDeError;
    } else{
        formularioTarjeta.submit();
        ocultarDireccion();
        ocultarTarjeta();
    }
}

function calcularSiLaSumatoriaDeNumerosEsParOImpar(numeroDeTarjeta){
    let sumatoria = 0;
    for(let i = 0; i < numeroDeTarjeta.length; i++){
        sumatoria += parseInt(numeroDeTarjeta.charAt(i))
    }
    let resultado = calcularSiEsUnNumeroParOImpar(sumatoria)
    return resultado;
}

function calcularSiEsUnNumeroParOImpar(numero){
    let resultado = ((numero % 2) + 2) %2;
    console.log(resultado)
    return resultado;
}

function mostrarDireccion(){
    let setPopUpDireccion=document.querySelector("#pop-up-direccion")
    setPopUpDireccion.style.display = '';

}
function ocultarDireccion(){
    let setPopUpDireccion=document.querySelector("#pop-up-direccion")
    setPopUpDireccion.style.display = '';
}

function mostrarTarjeta(){
    let setPopUpDireccion=document.querySelector("#pop-up-tarjeta")
    setPopUpDireccion.style.display = '';

}
function ocultarTarjeta(){
    let setPopUpDireccion=document.querySelector("#pop-up-tarjeta")
    setPopUpDireccion.style.display = '';
}
