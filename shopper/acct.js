// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";
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
const app = initializeApp(firebaseConfig);// acct.js

const auth = getAuth();
const db = getFirestore();
let currentUser = null;
let cartUnsub = null;
let cartProducts = [];
const profile = document.getElementById('profile');
profile.style.display = 'none'; // Hide profile by default

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const email = user.email;
    profile.style.display = 'inline-block';
    // loginLink.style.display = 'none';
    // signupLink.style.display = 'none';
    currentUser = user; // Store current user
    subscribeCart(user.uid); // Start listening to cart changes
  } else {
    // User is signed out
    currentUser = null; // Clear current user
    updateCartUI([]); // Clear cart UI
    if (cartUnsub) cartUnsub(); // Unsubscribe from cart updates
  }
});

// --- CART LOGIC ---
window.addToCart = async function(productId) {
  if (!currentUser) {
    alert('Please log in to add items to your cart.');
    return;
  }
  const cartRef = doc(db, 'carts', currentUser.uid);
  const cartSnap = await getDoc(cartRef);
  let cartArr = [];
  if (cartSnap.exists()) {
    cartArr = cartSnap.data().items || [];
  }
  if (cartArr.includes(productId)) {
    alert('Item already in cart!');
    return;
  }
  await setDoc(cartRef, { items: arrayUnion(productId) }, { merge: true });
};

function subscribeCart(uid) {
  const cartRef = doc(db, 'carts', uid);
  if (cartUnsub) cartUnsub();
  cartUnsub = onSnapshot(cartRef, (docSnap) => {
    const items = docSnap.exists() ? docSnap.data().items || [] : [];
    cartProducts = items;
    updateCartUI(items);
  });
}

function updateCartUI(items) {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) cartCount.textContent = items.length;
  // Render cart modal
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotalDiv = document.getElementById('cart-total');
  if (!cartItemsDiv || !cartTotalDiv) return;
  if (!items.length) {
    cartItemsDiv.innerHTML = '<div style="color:#F8C9B4;text-align:center;">Your cart is empty.</div>';
    cartTotalDiv.textContent = '';
    return;
  }
  // Get product details from window.products (populated by products.js)
  // If not present, try to fetch from products.js again
  if (!window.products || !Array.isArray(window.products) || window.products.length === 0) {
    try {
      const script = document.createElement('script');
      script.src = 'products.js';
      document.head.appendChild(script);
    } catch (e) {}
  }
  let total = 0;
  let html = items.map(pid => {
    const prod = (window.products || []).find(p => p.id == pid);
    if (!prod) return '';
    const price = Math.round(prod.price * 83);
    total += price;
    return `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
      <div style="display:flex;align-items:center;gap:10px;">
        <img src="${prod.image}" alt="${prod.name}" style="width:48px;height:48px;object-fit:cover;border-radius:8px;">
        <div>
          <div style="color:#F7D002;font-weight:bold;">${prod.name}</div>
          <div style="color:#F8C9B4;font-size:0.95rem;">₹${price}</div>
        </div>
      </div>
      <button class="remove-cart-btn" data-id="${prod.id}" style="background:none;border:none;color:#F7D002;font-size:1.2rem;cursor:pointer;">&times;</button>
    </div>`;
  }).join('');
  cartItemsDiv.innerHTML = html;
  cartTotalDiv.textContent = `Total: ₹${total}`;
  // Remove item event
  document.querySelectorAll('.remove-cart-btn').forEach(btn => {
    btn.onclick = function() {
      removeFromCart(Number(this.getAttribute('data-id')));
    };
  });
}

async function removeFromCart(productId) {
  if (!currentUser) return;
  const cartRef = doc(db, 'carts', currentUser.uid);
  await updateDoc(cartRef, { items: arrayRemove(productId) });
}

// Cart modal open/close logic
document.addEventListener('DOMContentLoaded', function() {
  // Expose products array for cart UI
  if (!window.products) {
    try {
      const script = document.createElement('script');
      script.src = 'products.js';
      document.head.appendChild(script);
    } catch (e) {}
    window.products = [];
  }
  const cartIcon = document.getElementById('cart-icon');
  const cartModal = document.getElementById('cart-modal');
  const closeCart = document.getElementById('close-cart');
  if (cartIcon && cartModal) {
    cartIcon.addEventListener('click', function(e) {
      cartModal.style.display = 'block';
      e.stopPropagation();
    });
  }
  if (closeCart && cartModal) {
    closeCart.onclick = () => { cartModal.style.display = 'none'; };
  }
  // Allow closing modal by clicking outside
  window.addEventListener('click', function(e) {
    if (cartModal && cartModal.style.display === 'block' && !cartModal.contains(e.target) && e.target.id !== 'cart-icon' && !e.target.closest('#cart-icon')) {
      cartModal.style.display = 'none';
    }
  });
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