//CONFIGURAÇÃO DO FIREBASE

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  // ... (copie do Firebase Console)
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Função para registrar usuário
export function register(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Usuário registrado!");
    })
    .catch((error) => {
      alert("Erro: " + error.message);
    });
}

// Função para login
export function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Bem-vindo(a)!");
    })
    .catch((error) => {
      alert("Erro: " + error.message);
    });
}