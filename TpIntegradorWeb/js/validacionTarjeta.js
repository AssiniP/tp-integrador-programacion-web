const regexNroTarjeta = /^[0-9]{10}$/;
const formularioTarjeta = document.querySelector("#formularioTarjeta");
const formularioDireccion = document.querySelector("#formularioDireccion");

formularioTarjeta.addEventListener("submit", (e) => {
    e.preventDefault();
    validarCamposDelFormulario();
})

formularioDireccion.addEventListener("submit", (e) => {
    e.preventDefault();
    validarDatosDireccion();
})

function validarDatosDireccion() {
    let aliasDeAliasDire = document.querySelector("#alias-dire").value;
    let aliasDeDireccion = document.querySelector("#direccion").value;
    AddDireccion(aliasDeAliasDire, aliasDeDireccion);
    ListDireccion();
    mostrarDireccion();
}

function validarCamposDelFormulario() {
    /* numero de tarjeta no puede todos 0000000000
    el numero de tarjeta debe tener 10 digitos:
    si el ultimo dig es par, la suma de los 9 restantes debe ser impar
    si el ultimo dig es impar, la suma de los 9 restantes debe ser par*/
    let error = false;
    let mensajeDeError = "";
    let numeroDeTarjeta = document.querySelector("#nroTarjeta").value;
    let ultimoDigito = numeroDeTarjeta.charAt(9);

    if (!regexNroTarjeta.test(numeroDeTarjeta)) {
        error = true;
        mensajeDeError += "<p> La tarjeta debe tener 10 digitos </p>"
    }

    let resultadoDeLaSumatoria = calcularSiLaSumatoriaDeNumerosEsParOImpar(numeroDeTarjeta);
    let resultadoDelUltimoNumero = calcularSiEsUnNumeroParOImpar(ultimoDigito);

    if (resultadoDeLaSumatoria == resultadoDelUltimoNumero) {
        error = true;
        mensajeDeError += "<br><p> Numero de tarjeta inválida</p>"
    }

    if (numeroDeTarjeta == "0000000000") {
        error = true;
        mensajeDeError += "<br><p> Numero de tarjeta no puede ser 0000000000</p>"
    }

    if (error) {
        document.querySelector(".mensajeError").innerHTML = mensajeDeError;
    } else {
        formularioTarjeta.submit();
        let aliasDeTarjeta = document.querySelector("#alias").value;
        AddPago(aliasDeTarjeta);
        ListPago();
        mostrarTarjeta();
    }
}

function calcularSiLaSumatoriaDeNumerosEsParOImpar(numeroDeTarjeta) {
    let sumatoria = 0;
    for (let i = 0; i < numeroDeTarjeta.length; i++) {
        sumatoria += parseInt(numeroDeTarjeta.charAt(i))
    }
    let resultado = calcularSiEsUnNumeroParOImpar(sumatoria)
    return resultado;
}

function calcularSiEsUnNumeroParOImpar(numero) {
    let resultado = ((numero % 2) + 2) % 2;
    console.log(resultado)
    return resultado;
}

function mostrarDireccion() {
    let setPopUpDireccion = document.querySelector("#pop-up-direccion")
    estadoDelPopup(setPopUpDireccion)
}

function mostrarTarjeta() {
    let setPopUpTarjeta = document.querySelector("#pop-up-tarjeta")
    estadoDelPopup(setPopUpTarjeta)
}

function estadoDelPopup(popup) {
    if (popup.classList.contains("oculto")) {
        popup.classList.remove("oculto")
    } else {
        popup.classList.add("oculto")
    }
}

/*function mostrarDireccion(){
    let setPopUpDireccion=document.querySelector("#pop-up-direccion")
    setPopUpDireccion.style.display = '';

}

function mostrarTarjeta(){
    let setPopUpTarjeta=document.querySelector("#pop-up-tarjeta")
    setPopUpTarjeta.style.display = '';

}


function ocultarDireccion(){
    let setPopUpDireccion=document.querySelector("#pop-up-direccion")
    setPopUpDireccion.style.display = 'none';

}

function ocultarTarjeta(){
    let setPopUpTarjeta=document.querySelector("#pop-up-tarjeta")
    setPopUpTarjeta.style.display = 'none';

}*/
