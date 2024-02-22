//LOGICA PARA CREAR CUENTA Angeles //  

import {createUserWithEmailPassword} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"

import { auth } from "./firebase.js";

    const formCrearCuenta= $("#formCrearCuenta")

    
    
    formCrearCuenta.submit(async function(event){
    // evita que el formulario se envie 
    event.preventDefault();

    // realiza cualquier accion necesaria aqui 

    console.log(formCrearCuenta);
    var correo = formCrearCuenta.find("#correoCrearCuenta").val(); //no es necesario que se imprima en la consola para comprobar
    var contraseña = formCrearCuenta.find("#contraCrearCuenta").val();
    console.log(correo);
    console.log(contraseña);

   
    try{
        const credencialesUsuario = await createUserWithEmailPassword(auth,correo,contraseña);
        console.log(credencialesUsuario);

        // cerrar modal de crear cuenta 
        const modalCrearCuenta = $("modalCrearCuenta");
        const modal = bootstrap.Modal.getInstance(modalCrearCuenta)
        modal.hide();
    
        // resetear el form 
        formCrearCuenta.trigger("reset"); 
        // mostrar mensaje de bienvenida
        alert ("bienvenido" +credencialesUsuario.user.email)
    

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
