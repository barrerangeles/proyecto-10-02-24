

import {onAutStateChanged} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"
import {actualizarObtenerTarea, auth, guardarTarea, eliminarTarea, obtenerTarea, actualizarTarea} from "./firebase.js";
import"./app/crearCuenta.js";
import"./app/iniciarSesion.js";
import './app/cerrarSesion.js';
import { verificarSesion } from './app/VerificarSesion.js';
import { mostrarContenidoVacio } from './app/mostrarContenido.js';
import { mostrarContenido } from './app/mostrarContenido.js';

import {getFirestore, collection} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
 



const formTareas = $("#form-tareas");
let userGlobal; 
let EstadoEditar = false;
let id = ''; 

auth.onAutStateChanged(async function(user) {

  alert('pasoooooooooooooooo')
  if (user) {               // si hay una sesion iniciada en la pagina 
     userGlobal = user;
     verificarSesion(user);
  const correo = user.email;
  console.log("sesion iniciada"); 
 

//const querySnapshot = await obtenerTarea();
const contenedorTareas = $("#contenedor-tareas");

actualizarObtenerTarea(querySnapshot => {
  let html = '';

  querySnapshot.forEach(function (doc) {
    const task = doc.data();

    if (task.email == correo) {
      html += `

<li class="list-group-item list-group-item-action mt-2">
  <h5>${task.titulo}</h5>
  <p>${task.descripcion}</p>
  <div>
    <button class="btn btn-primary btn-delete" data-id="${doc.id}">
      Delete
    </button>
    <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
      Edit
    </button>
  </div>
</li>
`;
          console.log(task);
      }
  });
  contenedorTareas.html(html);

  //accion eliminar 
  const $btnsEliminar = $('.btn-eliminar');

  $btnsEliminar.each(function () {
    $(this).on('click', function (event) {
      eliminarTarea($(this).data('id'));
    });
  });

  // accion editar 
  const btnsEditar = $(".btn-editar"); // En la constante btnsEditar se guarda 
  btnsEditar.each(function () { //con cada uno de los botones editar quiero que hagas lo siguiente
    $(this).on('click', async function (event) {
      const doc = await obtenerTarea($(this).data("id"));
      const tarea = doc.data(); //me va a obtener toda la info de la tarea (titulo, descripcion) y lo va a guardar en la constante "tarea"
      const taskForm2 = $("#form-tareas"); //Dentro de taskForm2 se guardará el forms de las tareas 
      taskForm2.find('#titulo-tarea').val(tarea.titulo); //Se coloca el titulo de la tarea en el input del forms
      taskForm2.find('#descripcion-tarea').val(tarea.descripcion); ////Se coloca la descrip de la tarea en el input del forms
      estadoEditar = true; //se esta editando
      id = doc.id;
      taskForm2.find('#btn-task-form').text('Modificar');
    });
  });

});



} else {
console.log("sin sesion")


const contenedorTareas = $("#contenedor-tareas");
contenedorTareas.html('<h3 class="text-white">Inicia sesión para ver tus publicaciones</h3>');



//mostrarContenidoVacio();
verificarSesion(user);
}
});




    const contenedorTareas = $("#contenedor-tareas");




  formTareas.submit(function  (e) {
    e.preventDefault();

    var tituloF = formTareas.find("#titulo-tarea").val();
    var descripcionF = formTareas.find("#descripcion-tarea").val();


    if (userGlobal) {

    if (EstadoEditar){ // se evalua si estamos en modo editar 
    actualizarTarea(id,   {
      titulo: tituloF,
      descripcion: descripcionF,
      email: userGlobal.email
    });
    estadoEditar = false;
    id = "";
    formTareas.find('#btn-task-form').text('guardar'); // esto hara que el boton diga guardar de nuevo

    }else{
      guardarTarea(tituloF, descripcionF, userGlobal.email); 
    }

    formTareas.trigger('reset');
  }
  });



