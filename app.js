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
// const userInfoDiv = document.getElementById('user-info');
// const logoutBtn = document.getElementById('logout-btn');

const profile = document.getElementById('profile');
const loginLink = document.getElementById('login');
const signupLink = document.getElementById('signup');
const shop = document.getElementById('shop');
shop.style.display = 'none'; // Hide shop by default

const container1 = document.querySelector('.container1');
container1.style.display = 'none'; // Hide container1 by default

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const email = user.email;
    profile.style.display = 'inline-block';
    shop.style.display = 'inline-block'; // Show shop when user is signed in
    container1.style.display = 'block'; // Show container1 when user is signed in
    loginLink.style.display = 'none';
    signupLink.style.display = 'none';
  } else {
    // User is signed out
  }
});

const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
    //   loginLink.style.display = 'inline-block';
    //   signupLink.style.display = 'inline-block';
        profile.style.display = 'none';
        alert('You have been logged out.');
        window.location.href = "loginfeatures/login.html";
    })
    .catch((error) => {
      userInfoDiv.textContent = 'Logout failed: ' + error.message;
    });
});
