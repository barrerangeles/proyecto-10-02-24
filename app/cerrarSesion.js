import {SignOut} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"
import { auth } from "./firebase.js";

const CerrarSesion = $("#botonCerrarSesion");

cerrarSesion.click(async function(e) {
    e.preventDefault();
    try {
      await signOut(auth);
      console.log("Cerrando sesión");
    } catch (error) {
      console.log(error);
    }
  });