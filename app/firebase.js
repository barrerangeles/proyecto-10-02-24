// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"
import {getFirestore,collection, addDoc, getDocs, onSnapshot, deletedocs, doc, getDoc, updateDoc} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6Wn7C3KPZIpRoCs_OG8ghRY8sf5vMBmk",
  authDomain: "proyecto-clase-10-02-24.firebaseapp.com",
  projectId: "proyecto-clase-10-02-24",
  storageBucket: "proyecto-clase-10-02-24.appspot.com",
  messagingSenderId: "305499447523",
  appId: "1:305499447523:web:fb59dd5f91afefbb3165d6",
  measurementId: "G-XJWY1X4SSQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//AUTENTICACION // 
export const auth = getAuth(app);


// CRUD (CREAR, LEER, MODIFICAR, ELIMINAR)

export const db = getFirestore(); // db > mi base de datos 

export function guardarTarea(email, titulo, descripcion,){
  addDoc( collection(db,"tareas") , {email,titulo,descripcion} )}

  export function actualizarObtenerTarea(){
    return onSnapshot( collection(db,"tareas"), callback );

  }

    export function eliminarTarea(id){
       return deletedocs( doc(db,"tareas"), id); 
  }

  export function obtenerTarea(id){
      return getDoc(doc(db,  "tareas",   id));
  }

  export function actualizarTarea(id, nuevosCampos) {
    return updateDoc(doc(db, "tareas", id), nuevosCampos);
  }