//Etiquetas de crearusuario
const usuarioLogin = document.getElementById("usuario");
const passLogin = document.getElementById("password");
const expReg = /^[0-9a-zA-Z._.-]+\@[0-9a-zA-Z._.-]+\.[0-9a-zA-Z]+$/;
const expRegPass = /^[A-Z]{1}[a-zA-Z0-9]{7,}$/;
const email = document.querySelector("#email");
const nombre=document.querySelector("#nombre");
const apellido=document.querySelector("#apellido");
const guardar = document.querySelector("#btn-save");
const formulario = document.querySelector("form");

// Etiquetas del login
const userLogin=document.querySelector("#user-login");
const passwordLogin=document.querySelector("#password-login");
const botonLogin=document.getElementById('btn-login');

let coleccionLocal = [];
let menssajeError="";

// escucha el evento click de guardad en crearusuario.html
guardar.addEventListener("click",(e)=>{
    if(validarPass()&&validarEmail()){
        agregarAColeccion();
        window.location.href = 'login.html';
    }else{
        e.defaultPrevented();
    }
});





function accionBotonlogin(){
    {
        if (userLogin.value && passwordLogin.value) {
            botonLogin.disabled = false;
        } else {
            botonLogin.disabled = true;
            botonLogin.focus;
        }
    }
}

function agregarAColeccion() {
    let user = {
        usuario: usuarioLogin.value,
        pass: passLogin.value,
        mail: email.value,
        nombre: nombre.value,
        apellido: apellido.value
    }
    //Carga el dato en la coleccion
    coleccionLocal.push(user);
    // transforma a String
    localStorage.setItem("list", JSON.stringify(coleccionLocal));
}

function validarEmail(event) {
//    agregarAColeccion();
    localStorage.setItem("list", JSON.stringify(coleccionLocal));
    valido = false;
    if(expReg.test(email.value)){
        
        valido =true;
    }else {
       alert("Email no valido: " + email.value);
       e.defaultPrevented();
    }
    return valido;
}

function validarPass() {
    let ps= document.querySelector("#password");
    let rps = document.querySelector("#re-password");
    valido = false;
    if(expRegPass.test(ps.value)){
        if(ps.value == rps.value){
            valido = true;
        }else {
            menssajeError=+"La contraseña debe coincidir con la confirmacion. ";
            e.defaultPrevented();
        }
    }else{
        menssajeError=+"Contraseña no segura, 6 caracteres minimos, letras y/o números, minúscula o mayúscula.";
        e.defaultPrevented();
        
    }
    return valido;
}


function loginOK() {    
    coleccionLocal = JSON.parse(localStorage.getItem("list"));
    coleccionLocal.forEach(element => {
        if(element.usuario == userLogin.value && element.pass == passwordLogin.value){
            window.location.href = 'miCuenta.html';
        }else {
            menssajeError=+"El usuario o la contraseña es incorrecto, vuelva a intentarlo";
            e.defaultPrevented();
           // window.location.href = 'login.html';
        }
    });
}

