const API_URL = "https://fakestoreapi.com/products";
let cart = [];

// Fetch products from API
async function fetchProducts() {
  const res = await fetch(API_URL);
  const products = await res.json();
  displayProducts(products);
}

// Display products
function displayProducts(products) {
  const productList = document.querySelector("#product-list");
  productList.innerHTML = products.map(product => `
    <div class="product">
      <img src="${product.image}" alt="${product.title}" width="100">
      <h4>${product.title}</h4>
      <p>R$ ${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Adicionar</button>
    </div>
  `).join('');
}

// Add product to cart
function addToCart(id, title, price) {
  const item = cart.find(product => product.id === id);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ id, title, price, quantity: 1 });
  }
  updateCart();
}

// Update cart display
function updateCart() {
  const cartItems = document.querySelector("#cart-items");
  const totalElement = document.querySelector("#total");

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <h4>${item.title}</h4>
      <p>R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
      <button onclick="removeFromCart(${item.id})">Remover</button>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Remove item from cart
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

// Login functionality
const loginBtn = document.querySelector("#login-btn");
const loginModal = document.querySelector("#login-modal");
const loginForm = document.querySelector("#login-form");

loginBtn.addEventListener("click", () => loginModal.classList.add("active"));

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loginModal.classList.remove("active");
  alert("Login realizado com sucesso!");
});

// Checkout functionality
const checkoutBtn = document.querySelector("#checkout-btn");
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  alert("Compra realizada com sucesso!");
  cart = [];
  updateCart();
});

fetchProducts();
