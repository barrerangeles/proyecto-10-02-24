//* logica para iniciar sesion // 

import {signInWithEmailPassword} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"
import { auth } from "./firebase.js";

const formIniciarSesion = $("#formIniciarSesion")
import { mostrarMensaje } from "./mostrarMensaje.js";

formIniciarSesion.submit(async function(event){
    //*evita que el formulario se envie// 
    event.preventDefault();

    console.log(formCrearCuenta); 
    var correo = formIniciarSesion.find("#correoIniciarSesion").val();
    var contra = formIniciarSesion.find("#contraIniciarSesion").val();
    console.log(correo);
    console.log(contra);




    try{
        const credencialesUsuario = await signInWithEmailPassword(auth,correo,contra);
        console.log(credencialesUsuario);

        //cerrar modal de crear cuenta
        const modaliniciarSesion = $("modaliniciarSesion")
        const modal = bootstrap.modal.getInstance(formIniciarSesion.closest('.modal'));
        modal.hide();
       
        //resetear el form 
        formIniciarSesion.trigger("reset"); 
        //mostrar el mensaje de bienvenida
        alert ("BIENVENIDO" +credencialesUsuario.user.email)
    


    }catch(error){
          console.log("error")
          if (error.code === 'auth/email-already-in-use') {
              showMessage("Email en uso", "error")
            } else if (error.code === 'auth/invalid-email') {
              showMessage("Invalido email", "error")
            } else if (error.code === 'auth/weak-password') {
              showMessage("Password corto", "error")
            } else if (error.code) {
              showMessage("Algo salio mal", "error")
            }
      }
  
  });

    