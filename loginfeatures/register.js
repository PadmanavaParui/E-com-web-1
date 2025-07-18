// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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



//submit button
const submit = document.getElementById("submit");
//stopping the default form submission
submit.addEventListener("click", (e) => {
    e.preventDefault();


    //inputs
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            alert("Creating Account...");
            window.location.href = "lg.html";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            // ..
        });

});
