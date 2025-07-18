// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";



import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

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


const auth = getAuth();
const userInfoDiv = document.getElementById('user-info');
const logoutBtn = document.getElementById('logout-btn');
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const email = user.email;
    userInfoDiv.textContent = `Logged in as: ${email}`;
    logoutBtn.style.display = 'inline-block';
  } else {
    // User is signed out
    userInfoDiv.textContent = 'No user is currently logged in.';
    logoutBtn.style.display = 'none';
  }
});


const loginLink = document.getElementById('login-link');
const signupLink = document.getElementById('signup-link');

loginLink.style.display = 'none';
signupLink.style.display = 'none';

logoutBtn.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      userInfoDiv.textContent = 'You have been logged out.';
      loginLink.style.display = 'inline-block';
      signupLink.style.display = 'inline-block';
    })
    .catch((error) => {
      userInfoDiv.textContent = 'Logout failed: ' + error.message;
    });
});