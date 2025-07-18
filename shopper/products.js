window.products = [
    { id: 1, name: "Professional Soccer Ball", price: 49.99, category: "sports", image: "https://cdn.pixabay.com/photo/2018/07/28/14/30/soccer-3568168_640.jpg", description: "High-quality leather soccer ball perfect for professional games and training." },
    { id: 2, name: "Basketball", price: 39.99, category: "sports", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop", description: "Official size basketball with superior grip and durability." },
    { id: 3, name: "Tennis Racket", price: 129.99, category: "sports", image: "https://cdn.pixabay.com/photo/2020/10/02/16/23/tennis-5621605_640.jpg", description: "Lightweight carbon fiber tennis racket for enhanced performance." },
    { id: 4, name: "Baseball Glove", price: 79.99, category: "sports", image: "https://cdn.pixabay.com/photo/2015/07/24/14/55/baseball-glove-858367_640.jpg", description: "Premium leather baseball glove with reinforced palm and fingers." },
    { id: 5, name: "Yoga Mat", price: 29.99, category: "sports", image: "https://m.media-amazon.com/images/I/71VaLeCKVGL._AC_UL320_.jpg", description: "Non-slip yoga mat with extra cushioning for comfort and stability." },
    { id: 6, name: "Dumbbells Set", price: 199.99, category: "sports", image: "https://m.media-amazon.com/images/I/61G93ocVj1L._AC_UL320_.jpg", description: "Adjustable dumbbell set with multiple weight options." },
    { id: 7, name: "Fountain Pen Set", price: 89.99, category: "stationary", image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&h=300&fit=crop", description: "Elegant fountain pen set with multiple ink cartridges." },
    { id: 8, name: "Leather Notebook", price: 34.99, category: "stationary", image: "https://m.media-amazon.com/images/I/817TyZBrgpL._AC_UL320_.jpg", description: "Handcrafted leather notebook with lined pages and bookmark." },
    { id: 9, name: "Desk Organizer", price: 24.99, category: "stationary", image: "https://m.media-amazon.com/images/I/71v0GWV2vVL._AC_UL320_.jpg", description: "Bamboo desk organizer with multiple compartments for office supplies." },
    { id: 10, name: "Art Supplies Set", price: 59.99, category: "stationary", image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop", description: "Complete art supplies set with pencils, markers, and sketchbook." },
    { id: 11, name: "Sticky Notes Pack", price: 12.99, category: "stationary", image: "https://m.media-amazon.com/images/I/51I1nBnQBOL._AC_UL320_.jpg", description: "Colorful sticky notes pack with multiple sizes and colors." },
    { id: 12, name: "Planner 2024", price: 19.99, category: "stationary", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop", description: "Monthly and weekly planner with goal-setting pages." },
    { id: 13, name: "Wireless Earbuds", price: 149.99, category: "gadgets", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop", description: "Premium wireless earbuds with noise cancellation and long battery life." },
    { id: 14, name: "Smartphone Stand", price: 19.99, category: "gadgets", image: "https://m.media-amazon.com/images/I/71JKAX3hVRL._AC_UY218_.jpg", description: "Adjustable smartphone stand with multiple viewing angles." },
    { id: 15, name: "Portable Charger", price: 39.99, category: "gadgets", image: "https://m.media-amazon.com/images/I/61z0YKs4J8L._AC_UY218_.jpg", description: "High-capacity portable charger with fast charging technology." },
    { id: 16, name: "Bluetooth Speaker", price: 79.99, category: "gadgets", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop", description: "Waterproof Bluetooth speaker with rich sound quality." },
    { id: 17, name: "Wireless Mouse", price: 34.99, category: "gadgets", image: "https://m.media-amazon.com/images/I/51DYDLykzoL._AC_UY218_.jpg", description: "Ergonomic wireless mouse with precision tracking." },
    { id: 18, name: "USB-C Hub", price: 59.99, category: "gadgets", image: "https://m.media-amazon.com/images/I/615HRY2dnML._AC_UY218_.jpg", description: "Multi-port USB-C hub with HDMI, USB 3.0, and charging ports." }
];

const grid = document.getElementById('allProductsGrid');
const catBtns = document.querySelectorAll('.cat-btn');

function renderProducts(category) {
    let filtered = category === 'all' ? window.products : window.products.filter(p => p.category === category);
    grid.innerHTML = filtered.length ? filtered.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-category">${product.category}</div>
            <div class="product-title">${product.name}</div>
            <div class="product-price">₹${(product.price * 83).toFixed(0)}</div>
            <div class="product-description">${product.description}</div>
            <button class="add-to-cart-btn" data-id="${product.id}" style="margin-top:10px;padding:7px 18px;background:#F7D002;color:#1a2a2e;border:none;border-radius:16px;font-family:'Glegoo',serif;font-size:1rem;cursor:pointer;">Add to Cart</button>
        </div>
    `).join('') : '<div style="grid-column: 1/-1; text-align:center; color:#F8C9B4;">No products found.</div>';
    // Add event listeners for Add to Cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = Number(this.getAttribute('data-id'));
            window.addToCart && window.addToCart(productId);
        });
    });
}

catBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        catBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderProducts(this.dataset.category);
    });
});

// Initial render
renderProducts('all');
