// ================= cart.js =================

function renderCart() {

  const container =
    document.getElementById("cart-items");

  const summaryBox =
    document.getElementById("cart-summary");

  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  container.innerHTML = "";

  // --- Empty Cart ---
  if (cart.length === 0) {

    container.innerHTML = `

      <div class="empty-state">

        <div class="empty-icon">🛒</div>

        <h3>Your Cart is Empty</h3>

        <p>Add some cricket gear first!</p>

        <a href="products.html">
          <button>Browse Products</button>
        </a>

      </div>

    `;

    if (summaryBox) {
      summaryBox.style.display = "none";
    }

    return;
  }

  if (summaryBox) {
    summaryBox.style.display = "block";
  }

  let subtotal = 0;

  cart.forEach((item, index) => {

    const qty = item.qty || 1;

    const total =
      item.price * qty;

    subtotal += total;

    const div =
  document.createElement("div");

div.classList.add("crickify-cart-card");

div.innerHTML = `

  <img src="${item.image}" alt="${item.name}">

  <div class="cart-details">

    <h2>${item.name}</h2>

    <p class="cart-desc">
      Premium Cricket Equipment
    </p>

    <div class="cart-rating">
      ★ 4.5 <span>(2,431 ratings)</span>
    </div>

    <div class="cart-price">

      <span class="new-price">
        ₹${item.price.toLocaleString("en-IN")}
      </span>

      <span class="old-price">
        ₹${Math.round(item.price * 1.3)}
      </span>

      <span class="discount">
        30% OFF
      </span>

    </div>

    <div class="qty-section">

      <button onclick="changeQty(${index}, -1)">
        −
      </button>

      <span>${qty}</span>

      <button onclick="changeQty(${index}, 1)">
        +
      </button>

    </div>

    <div class="cart-actions">

      <button class="save-btn">
        Save For Later
      </button>

      <button
        class="remove-btn"
        onclick="removeItem(${index})">

        Remove

      </button>

    </div>

  </div>

`;
    container.appendChild(div);

  });

  document.getElementById("summary-count")
    .textContent =
    cart.length + " item(s)";

  document.getElementById("summary-subtotal")
    .textContent =
    "₹" + subtotal.toLocaleString("en-IN");

  document.getElementById("summary-total")
    .textContent =
    "₹" + subtotal.toLocaleString("en-IN");
}

// --- Change Quantity ---
function changeQty(index, delta) {

  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  cart[index].qty =
    (cart[index].qty || 1) + delta;

  if (cart[index].qty < 1) {
    cart[index].qty = 1;
  }

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  renderCart();
}

// --- Remove Item ---
function removeItem(index) {

  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  renderCart();
}

renderCart();
function checkoutCart() {

  // Remove old Buy Now product
  localStorage.removeItem("buyNowProduct");

  // Open billing page
  window.location.href = "billing.html";
}