var selected_index = -1; //Index de seleccion ListCar item

var dataCars = localStorage.getItem("dataCars");//carga los datos del stored data

dataCars = JSON.parse(dataCars); //convierte el string en objeto

if (dataCars == null) //si no es data, inicializa el array vacio
	dataCars = [];


function cargarComboTarjetas(){
	comboPagos=document.getElementById('combo-tarjetas')
	var dataPago = localStorage.getItem("dataPago");//carga los datos del stored data
    dataPago = JSON.parse(dataPago); //convierte el string en objeto
    if(dataPago == null) //si no es data, inicializa el array vacio
	dataPago = [];
	for(var i in dataPago){
		var cli = JSON.parse(dataPago[i]);
		var option=document.createElement("option");
		option.value=String(parseInt(i)+ 2 );
		option.text=cli.Alias;
		option.setAttribute("name", "tarjeta")
		comboPagos.appendChild(option);
	}
}


function cargarComboDirecciones(){
	comboDirecciones=document.getElementById('combo-direcciones')
	var dataDireccion = localStorage.getItem("dataDireccion");//carga los datos del stored data
    dataDireccion = JSON.parse(dataDireccion); //convierte el string en objeto
    if(dataDireccion == null) //si no es data, inicializa el array vacio
        dataDireccion = [];
	for(var i in dataDireccion){
		var cli = JSON.parse(dataDireccion[i]);
		var option=document.createElement("option");
		option.value=String(parseInt(i)+ 2 );
		option.text=cli.Alias;
		option.setAttribute("name", "direccion")
		comboDirecciones.appendChild(option);
	}
}

function ListCar() {
	var datos = " ";
	datos += "<thead>";
	datos += "<tr>";
	datos += '	<th>Producto</th>';
	datos += "	<th>Cantidad</th>";
	datos += "	<th>Precio</th>";
	datos += "	<th background-image: none></th>";
	datos += "</tr>";
	datos += "</thead>";
	datos += "<tbody>";
	for (var i in dataCars) {
		var cli = JSON.parse(dataCars[i]);
		datos += "<tr>";

		datos += "	<td>" + cli.Producto + "</td>";
		datos += "	<td>" + cli.Cantidad + "</td>";
		datos += "	<td>" + cli.Precio + "</td>";
		datos += ' <td><span class="icon-bin" alt="Delete" class="btnDelete"  onClick="DeleteCar(\'' + i + '\');"/> </td>';
		datos += "</tr>";

	}
	datos += "</tbody>";
	document.getElementById('tblList').innerHTML = datos;
	cargarContadorCarrito();
	cargarComboDirecciones();
	cargarComboTarjetas();

}

function cargarContadorCarrito() {
	document.getElementById('contadorCarrito').innerHTML = dataCars.length;
}


function AddCar(producto,cantidad, precio) {
	let cantidadDelProducto = document.getElementById(String(producto)).value;
	
	if (cantidadDelProducto > 99) {
		cantidadDelProducto = 99;
		document.getElementById(String(producto)).value = 99;
	}
	let precioTotal = parseInt(precio) * cantidadDelProducto;
	

	var car = JSON.stringify({
		Producto: producto,
		Cantidad: cantidadDelProducto,
		Precio: "$" + precioTotal
	});

	dataCars.push(car);
	localStorage.setItem("dataCars", JSON.stringify(dataCars));
	cargarContadorCarrito();
	return true;
}

function DeleteCar(selected_index) {
	dataCars.splice(selected_index, 1);
	localStorage.setItem("dataCars", JSON.stringify(dataCars));
	ListCar();
}

function GuardarCar() {
	selected_index = document.getElementById("txtOperacion").value;
	if (selected_index == "A")
		return AddCar();
	else '';
}

function RemoveAllDataCar() {
	for (var i in dataCars) {
		dataCars.splice(i - 1, 1);
	}

}

function pago() {
	let setPopUpTarjeta = document.querySelector(".popup-form")
	estadoDelPopup(setPopUpTarjeta)
}

function estadoDelPopup(popup) {
	if (popup.classList.contains("oculto")) {
		popup.classList.remove("oculto")
	} else {
		popup.classList.add("oculto")
	}
}

const formularioPago = document.getElementById("formularioPago")



function validarTarjetaYDireccion(){
	let tarjetaSeleccionada = document.getElementById("combo-tarjetas").value;
	let direccionSeleccionada = document.getElementById("combo-direcciones").value;
	switch (tarjetaSeleccionada) {
		case '1':
			const checkboxTarjeta = document.getElementById("checkTarjeta").checked;
			if(checkboxTarjeta == true && direccionSeleccionada != 1){
				validarTarjeta();
			} else if(checkboxTarjeta == false && direccionSeleccionada == 1){
				document.querySelector(".mensajeError").innerHTML = "<p>Seleccione o ingrese una tarjeta <br> Seleccione o ingrese una direccion</p>"
			} else if(checkboxTarjeta == true && direccionSeleccionada == 1){
				document.querySelector(".mensajeError").innerHTML = "<p>Seleccione o ingrese una direccion</p>"
			} else{
				document.querySelector(".mensajeError").innerHTML = "<p>Seleccione o ingrese una tarjeta </p>"
			}
			break;
		default:
			const checkboxDireccion = document.getElementById("check-direccion-de-pago").checked;
			if(direccionSeleccionada == 1 && checkboxDireccion == false){
				document.querySelector(".mensajeError").innerHTML = "<p>Seleccione o ingrese una direccion</p>"
			} else if(direccionSeleccionada == 1 && checkboxDireccion == true){
				validarDireccionCarrito();
			} else{
				formularioPago.submit();
			}
			break;
	}
}

function validarDireccionCarrito(){
	let aliasDeAliasDire = document.querySelector("#alias-dire").value;
    let aliasDeDireccion = document.querySelector("#direccion").value;
	if(aliasDeAliasDire != "" && aliasDeDireccion != ""){
		formularioPago.submit();
	} else{
		document.querySelector(".mensajeError").innerHTML = "<p>Ingrese como minimo alias y direccion</p>";
	}
}

function validarTarjeta(){
	let regexNroTarjeta = /^[0-9]{10}$/;
	let error = false;
    let mensajeDeError = "";
    let numeroDeTarjeta = document.querySelector("#nroTarjeta").value;
    let ultimoDigito = numeroDeTarjeta.charAt(9);
	let direccionSeleccionada = document.getElementById("combo-direcciones").value;

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

	console.log(error)

    if (error == true && direccionSeleccionada == 1) {
		mensajeDeError += "<p>Seleccione o ingrese una direccion</p>"
        document.querySelector(".mensajeError").innerHTML = mensajeDeError;
    } else if(error == true && direccionSeleccionada != 1){
		document.querySelector(".mensajeError").innerHTML = mensajeDeError;
	}
	else if(error == false && direccionSeleccionada == 1) {
		document.querySelector(".mensajeError").innerHTML = "<p>Seleccione o ingrese una direccion</p>";
    } else{
		formularioPago.submit();
	}
}

function calcularSiLaSumatoriaDeNumerosEsParOImpar(numeroDeTarjeta) {
    let sumatoria = 0;
    for (let i = 0; i < numeroDeTarjeta.length-1; i++) {
        sumatoria += parseInt(numeroDeTarjeta.charAt(i))
    }
    let resultado = calcularSiEsUnNumeroParOImpar(sumatoria)
    return resultado;
}

function calcularSiEsUnNumeroParOImpar(numero) {
    let resultado = ((numero % 2) + 2) % 2;
    return resultado;
}

//tarjeta
try{
    const checkboxTarjeta = document.getElementById("checkTarjeta")    
    checkboxTarjeta.addEventListener("change", (e) => {
        let nuevaTarjeta = document.querySelector(".nueva-tarjeta")  
        estadoDelPopup(nuevaTarjeta);
    })

	const checkDireccionPago = document.getElementById("check-direccion-de-pago")
	checkDireccionPago.addEventListener("change", (e)=>{
		let nuevaDireccion = document.querySelector(".nueva-direccion")
		estadoDelPopup(nuevaDireccion);
	})

	formularioPago.addEventListener("submit", (e)=>{
		e.preventDefault();
		validarTarjetaYDireccion();
	})

}
catch{

}
