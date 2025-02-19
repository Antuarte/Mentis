const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  // ... (copie do Firebase Console)
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Função para registrar usuário
function register(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Usuário registrado!");
    })
    .catch((error) => {
      alert("Erro: " + error.message);
    });
}

// Função para login
function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Bem-vindo(a)!");
    })
    .catch((error) => {
      alert("Erro: " + error.message);
    });
}

module.exports = { login, register };