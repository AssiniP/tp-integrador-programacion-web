


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
			Precio : precio 
		});
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

	document.getElementById("intento").style.display ="flex";
	document.getElementById("popPagar").style.display ="none";


}


