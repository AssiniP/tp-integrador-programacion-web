var selected_index = -1; //Index de seleccion ListCar item

var dataCars = localStorage.getItem("dataCars");//carga los datos del stored data

dataCars = JSON.parse(dataCars); //convierte el string en objeto

if (dataCars == null) //si no es data, inicializa el array vacio
	dataCars = [];



function ListCar() {
	//document.getElementById('tblList').innerHTML = "";
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

}

function cargarContadorCarrito() {
	document.getElementById('contadorCarrito').innerHTML = dataCars.length;
}


function AddCar(producto,cantidad, precio) {
	let cantidadDelProducto = document.getElementById(String(producto)).value;
	console.log(cantidadDelProducto)
	if (cantidadDelProducto > 99) {
		cantidadDelProducto = 99;
		document.getElementById(String(producto)).value = 99;
	}
	let precioTotal = parseInt(precio) * cantidadDelProducto;
	console.log(precioTotal)

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


//tarjeta
try{
    const checkboxTarjeta = document.getElementById("checkTarjeta")    
    checkboxTarjeta.addEventListener("change", (e) => {
        let nuevaTarjeta = document.querySelector(".nueva-tarjeta")
        console.log(nuevaTarjeta)
        estadoDelPopup(nuevaTarjeta);
    })

}
catch{

}
