// Database & Initial State
const productsData = [
  {
    id: "p1",
    name: "Suco de Laranja",
    desc: "Laranja fresca, docinha e com aquele frescor cítrico de suco recém-espremido.",
    img: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80",
    prices: [30, 15, 5] // 5L, 2L, 500ml
  },
  {
    id: "p2",
    name: "Suco de Morango",
    desc: "Morangos maduros, perfumados e naturalmente doces, na textura certa.",
    img: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80",
    prices: [30, 15, 5]
  },
  {
    id: "p3",
    name: "Suco de Maracujá",
    desc: "Azedinho na medida, aromático e refrescante, puro suco natural.",
    img: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&w=600&q=80",
    prices: [30, 15, 5]
  },
  {
    id: "p4",
    name: "Suco de Caju",
    desc: "O sabor marcante e tropical do caju, encorpado e naturalmente adocicado.",
    img: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80",
    prices: [30, 15, 5]
  }
];

const sizes = ["5 Litros", "2 Litros", "500 ml"];
let cart = {};

// Initialize AOS Animation
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 800,
    once: true
  });
  renderProducts();
});

// Cursor Glow Effect
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

// Navbar Scroll Glass Effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// 3D Parallax Tilt Effect on Hero Card
const tiltCard = document.getElementById('tiltCard');
document.addEventListener('mousemove', (e) => {
  if (!tiltCard) return;
  const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
  tiltCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// Render Product Cards
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = productsData.map(product => `
    <div class="product-card" data-aos="fade-up">
      <div class="product-img-wrapper">
        <img src="${product.img}" alt="${product.name}" class="product-img">
      </div>
      <div class="product-body">
        <h3>${product.name}</h3>
        <p>${product.desc}</p>
        <div class="size-selector">
          ${sizes.map((size, idx) => `
            <div class="size-row">
              <span>${size} — <strong>R$ ${product.prices[idx].toFixed(2)}</strong></span>
              <button onclick="addToCart('${product.id}', ${idx})">+ Add</button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// Cart Functionality
function addToCart(productId, sizeIndex) {
  const key = `${productId}|${sizeIndex}`;
  cart[key] = (cart[key] || 0) + 1;
  updateCart();
}

function updateCart() {
  const cartCountEl = document.getElementById('cartCount');
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartTotalValue = document.getElementById('cartTotalValue');

  let totalItems = 0;
  let totalPrice = 0;
  let itemsHTML = '';

  for (const key in cart) {
    const qty = cart[key];
    if (qty <= 0) continue;

    const [pId, sizeIdx] = key.split('|');
    const product = productsData.find(p => p.id === pId);
    const price = product.prices[sizeIdx];
    const itemTotal = price * qty;

    totalItems += qty;
    totalPrice += itemTotal;

    itemsHTML += `
      <div class="cart-item">
        <div>
          <strong>${product.name}</strong><br>
          <small>${sizes[sizeIdx]} · R$ ${price.toFixed(2)}</small>
        </div>
        <div class="cart-item-qty">
          <button onclick="changeQty('${key}', -1)">-</button>
          <span style="margin: 0 8px; font-weight:700;">${qty}</span>
          <button onclick="changeQty('${key}', 1)">+</button>
        </div>
      </div>
    `;
  }

  cartCountEl.textContent = totalItems;
  cartTotalValue.textContent = `R$ ${totalPrice.toFixed(2)}`;
  cartItemsContainer.innerHTML = itemsHTML || '<p style="color:var(--text-muted); text-align:center;">Seu carrinho está vazio.</p>';
}

function changeQty(key, delta) {
  cart[key] = (cart[key] || 0) + delta;
  if (cart[key] <= 0) delete cart[key];
  updateCart();
}

// Modal Control
const cartModal = document.getElementById('cartModal');
document.getElementById('openCartBtn').addEventListener('click', () => cartModal.classList.add('active'));
document.getElementById('closeCartBtn').addEventListener('click', () => cartModal.classList.remove('active'));

// Checkout via WhatsApp
document.getElementById('checkoutBtn').addEventListener('click', () => {
  let message = "Olá! Gostaria de fazer o seguinte pedido na Pascolli Citrus:\n\n";
  let total = 0;

  for (const key in cart) {
    if (cart[key] <= 0) continue;
    const [pId, sizeIdx] = key.split('|');
    const product = productsData.find(p => p.id === pId);
    const price = product.prices[sizeIdx];
    const subtotal = price * cart[key];
    total += subtotal;

    message += `• ${cart[key]}x ${product.name} (${sizes[sizeIdx]}) = R$ ${subtotal.toFixed(2)}\n`;
  }

  if (total === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  message += `\nTotal: R$ ${total.toFixed(2)}\n\nPor favor, confirmem o valor do frete e o tempo de entrega!`;
  const whatsappUrl = `https://wa.me/5519993923752?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
});
