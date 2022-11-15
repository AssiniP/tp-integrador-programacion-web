
var selected_index = -1; //Index de seleccion ListCar item

var dataCars = localStorage.getItem("dataCars");//carga los datos del stored data

dataCars = JSON.parse(dataCars); //convierte el string en objeto

if(dataCars == null) //si no es data, inicializa el array vacio
dataCars = [];



function ListCar(){
	document.getElementById('tblList').innerHTML ="";
	var datos =" ";
    //datos += "<table>" ;
	datos += "<thead>";
	datos +=	"<tr>";
	datos +=	"	<th>Producto</th>";
	datos +=	"	<th>Cantidad</th>";
	datos +=	"	<th>Precio</th>";	
	datos +=	"	<th></th>";	
	datos +=	"</tr>";
	datos +="</thead>";
	datos +="<tbody>";
		for(var i in dataCars){
			var cli = JSON.parse(dataCars[i]);
		  	datos +="<tr>";

			datos += "	<td>"+cli.Producto+"</td>" ;
			datos += "	<td>"+cli.Cantidad+"</td>" ;
			datos += "	<td>"+cli.Precio+"</td>" ;
			datos += ' <td><span class="icon-bin" alt="Delete" class="btnDelete"  onClick="DeleteCar(\''+i+'\');"/> </td>' ;
			datos += "</tr>";
			
		}
		datos +="</tbody>";
		//datos += "</table>";
	document.getElementById('tblList').innerHTML =datos;
	cargarContadorCarrito();

	console.log('entro en el ListCarar')
	
	}

function cargarContadorCarrito(){
	document.getElementById('contadorCarrito').innerHTML=dataCars.length;
}

function AddCar(producto,cantidad,precio){
	var car = JSON.stringify({
	Producto    : producto,
	Cantidad  : cantidad ,
	Precio : precio });
    dataCars.push(car);
    localStorage.setItem("dataCars", JSON.stringify(dataCars));
	cargarContadorCarrito();
	ListCar();	
	return true;
	}

function DeleteCar(selected_index){
	dataCars.splice(selected_index, 1);
	localStorage.setItem("dataCars", JSON.stringify(dataCars));
	ListCar();
	}

function GuardarCar(){
	selected_index=document.getElementById("txtOperacion").value ;
		if(selected_index == "A")
			return AddCar();
		else '' ;
	}

function RemoveAllDataCar(){
	for(var i in dataCars){
		dataCars.splice(i-1, 1);
	}

}

function pago(){
	let setPopUpTarjeta=document.querySelector(".popup-form")
    estadoDelPopup(setPopUpTarjeta)
}

function estadoDelPopup(popup){
    if(popup.classList.contains("oculto")){
        popup.classList.remove("oculto")
    }else{
        popup.classList.add("oculto")
    }
}

//tarjeta
const checkboxTarjeta = document.getElementById("checkTarjeta")
console.log(checkboxTarjeta)

checkboxTarjeta.addEventListener("change", (e)=>{
	let nuevaTarjeta = document.querySelector(".nueva-tarjeta")
	console.log(nuevaTarjeta)
	estadoDelPopup(nuevaTarjeta);
})

const regexNroTarjeta = /^[0-9]{10}$/;

const formulario = document.querySelector(".formularioLogin")
console.log(formulario)

formulario.addEventListener("submit", (e)=>{
	e.preventDefault();
	validarCamposDelFormulario();
})

//copyPaste de validacionTarjeta

function validarCamposDelFormulario(){
    let error = false;
    let mensajeDeError = "";
    let numeroDeTarjeta = document.querySelector("#nroTarjeta").value;
    let ultimoDigito = numeroDeTarjeta.charAt(9);

    if(!regexNroTarjeta.test(numeroDeTarjeta)){
        error = true;
        mensajeDeError += "<p> La tarjeta debe tener 10 digitos </p>"
    }

    let resultadoDeLaSumatoria = calcularSiLaSumatoriaDeNumerosEsParOImpar(numeroDeTarjeta);
    let resultadoDelUltimoNumero = calcularSiEsUnNumeroParOImpar(ultimoDigito);

    if(resultadoDeLaSumatoria == resultadoDelUltimoNumero){
        error = true;
        mensajeDeError += "<br><p> Numero de tarjeta inválida</p>"
    }
    
    if(numeroDeTarjeta == "0000000000"){
        error = true;
        mensajeDeError += "<br><p> Numero de tarjeta no puede ser 0000000000</p>"
    }

    if(error){
        document.querySelector(".mensajeError").innerHTML = mensajeDeError;
    } else{
        formulario.submit();
        AddPago(aliasDeTarjeta);
        ListPago();
        mostrarTarjeta();
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
