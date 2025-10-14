// Sample Product Data
const products = [
  { id: 1, name: "Wireless Headphones", price: 1200, img: "images/product1.jpg" },
  { id: 2, name: "Smart Watch", price: 2500, img: "images/product2.jpg" },
  { id: 3, name: "Bluetooth Speaker", price: 1800, img: "images/product3.jpg" },
  { id: 4, name: "Stylish Backpack", price: 1500, img: "images/product4.jpg" }
];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const cartCount = document.getElementById("cart-count");

let cart = [];

// Display Products
products.forEach(product => {
  const div = document.createElement("div");
  div.classList.add("product");
  div.innerHTML = `
    <img src="${product.img}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>₹${product.price}</p>
    <button onclick="addToCart(${product.id})">Add to Cart</button>
  `;
  productList.appendChild(div);
});

// Add to Cart Function
function addToCart(id) {
  const item = products.find(p => p.id === id);
  const existing = cart.find(p => p.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  updateCart();
}

// Update Cart
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.name} (x${item.qty})</span>
      <span>₹${item.price * item.qty}</span>
    `;
    cartItems.appendChild(div);
  });

  totalPrice.textContent = `Total: ₹${total}`;
  cartCount.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
}

// Checkout Button
document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    alert("Thank you for your purchase!");
    cart = [];
    updateCart();
  }
});