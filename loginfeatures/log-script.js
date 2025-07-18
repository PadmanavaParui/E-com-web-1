// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCnxEXM3nFz1eFA-7grOrKvZeJwQjIStUI",
    authDomain: "login-ecom-97c8e.firebaseapp.com",
    projectId: "login-ecom-97c8e",
    storageBucket: "login-ecom-97c8e.firebasestorage.app",
    messagingSenderId: "12792176254",
    appId: "1:12792176254:web:0b89b3e5bd70ebaf95c22f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get the login form and button
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            alert('Login successful!');
            window.location.href = "../index.html";
            // Redirect or further logic here
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
});
