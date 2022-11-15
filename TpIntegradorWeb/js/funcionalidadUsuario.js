
	var selec_dire_index = -1; //Index de seleccion ListDireccion item

    var dataDireccion = localStorage.getItem("dataDireccion");//carga los datos del stored data

    dataDireccion = JSON.parse(dataDireccion); //convierte el string en objeto

    if(dataDireccion == null) //si no es data, inicializa el array vacio
        dataDireccion = [];

    var selec_pago_index = -1; //Index de seleccion ListPagoitem

    var dataPago = localStorage.getItem("dataPago");//carga los datos del stored data

    dataPago = JSON.parse(dataPago); //convierte el string en objeto

    if(dataPago == null) //si no es data, inicializa el array vacio
        dataPago = [];

		var dataCars = localStorage.getItem("dataCars");//carga los datos del stored data

		dataCars = JSON.parse(dataCars); //convierte el string en objeto
		
		if(dataCars == null) //si no es data, inicializa el array vacio
		dataCars = [];

    function ListAmbas(){
        ListDireccion();
        ListPago();
        document.getElementById('contadorCarrito').innerHTML=dataCars.length;
    }
	function ListDireccion(){
		document.getElementById('tblDireccion').innerHTML ="";
		var datos =" ";
		//datos += "<table>" ;
		datos += "<thead>";
		datos +=	"<tr>";
	
		datos +=	"	<th>Alias</th>";
		datos +=	"	<th>Direccion</th>";
		datos +=	"	<th></th>";	
		datos +=	"</tr>";
		datos +="</thead>";
		datos +="<tbody>";

		for(var i in dataDireccion){
			var cli = JSON.parse(dataDireccion[i]);
		  	datos +="<tr>";

			datos += "	<td>"+cli.Alias+"</td>" ;
			datos += "	<td>"+cli.Direccion+"</td>" ;
			datos += ' <td><span class="icon-bin" alt="Delete" class="btnDelete"  onClick="DeleteDireccion(\''+i+'\');"/> </td>' ;
			datos += "</tr>";
			
		}
		datos +="</tbody>";
		//datos += "</table>";
	document.getElementById('tblDireccion').innerHTML =datos;
	console.log('entro en el ListDireccion')
	
	}

    
	function ListPago(){
		document.getElementById('tblPago').innerHTML ="";
		var datos =" ";
		//datos += "<table>" ;
		datos += "<thead>";
		datos +=	"<tr>";
	
		datos +=	"	<th>Alias</th>";
		datos +=	"	<th></th>";	
		datos +=	"</tr>";
		datos +="</thead>";
		datos +="<tbody>";

		for(var i in dataPago){
			var cli = JSON.parse(dataPago[i]);
		  	datos +="<tr>";

			datos += "	<td>"+cli.Alias+"</td>" ;
			datos += ' <td><span class="icon-bin" alt="Delete" class="btnDelete"  onClick="DeletePago(\''+i+'\');"/> </td>' ;
			datos += "</tr>";
			
		}
		datos +="</tbody>";
		//datos += "</table>";
	document.getElementById('tblPago').innerHTML =datos;
	console.log('entro en el ListPago')
	
	}

	function AddDireccion(alias,direccion){

		var dire = JSON.stringify({
			Alias    : alias,
			Direccion  : direccion 
		});
		dataDireccion.push(dire);
		localStorage.setItem("dataDireccion", JSON.stringify(dataDireccion));
		ListDireccion();
		
		return true;
	}



	function DeleteDireccion(selec_dire_index){
		dataDireccion.splice(selec_dire_index, 1);
		localStorage.setItem("dataDireccion", JSON.stringify(dataDireccion));
		ListDireccion();
	}

function GuardarDireccion(){
	selec_dire_index=document.getElementById("txtOperacion").value ;
		if(selec_dire_index == "A")
			return AddDireccion();
		else '' ;
	}

function RemoveAllDataDireccion(){
	for(var i in dataDireccion){
		dataDireccion.splice(i-1, 1);
	}
}





function AddPago(alias){

    var pago = JSON.stringify({
        Alias    : alias
    });
    dataPago.push(pago);
    localStorage.setItem("dataPago", JSON.stringify(dataPago));
    ListPago();
    
    return true;
}



function DeletePago(selec_pago_index){
    dataPago.splice(selec_pago_index, 1);
    localStorage.setItem("dataPago", JSON.stringify(dataPago));
    ListPago();
}

function GuardarPago(){
selec_pago_index=document.getElementById("txtOperacion").value ;
    if(selec_pago_index == "A")
        return AddPago();
    else '' ;
}

function RemoveAlldataPago(){
for(var i in dataPago){
    dataPago.splice(i-1, 1);
}
}