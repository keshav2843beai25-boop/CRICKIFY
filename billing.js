// ================= billing.js =================
let product = JSON.parse(localStorage.getItem("buyNowProduct"));
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let payment = "COD";
let discount = 0;
let basePrice = 0;

const container = document.getElementById("product-details");

// --- Determine checkout type ---
const isCartCheckout = !product && cart.length > 0;

// --- Load Checkout Summary ---
if (isCartCheckout) {
  basePrice = cart.reduce((sum, item) => {
    return sum + (item.price * (item.qty || 1));
  }, 0);

  let itemsHtml = '<div class="checkout-items-list">';
  cart.forEach(item => {
    const qty = item.qty || 1;
    const itemTotal = item.price * qty;
    itemsHtml += `
      <div class="checkout-item-row">
        <img src="${item.image}" class="checkout-item-img" alt="${item.name}">
        <div class="checkout-item-details">
          <div class="checkout-item-name">${item.name}</div>
          <div class="checkout-item-meta">Qty: ${qty} • ₹${item.price.toLocaleString("en-IN")}</div>
        </div>
        <div class="checkout-item-price">₹${itemTotal.toLocaleString("en-IN")}</div>
      </div>
    `;
  });
  itemsHtml += '</div>';
  container.innerHTML = itemsHtml;
} else if (product) {
  basePrice = product.price * (product.qty || 1);
  container.innerHTML = `
    <img src="${product.image}" class="single-product-img" alt="${product.name}">
    <h3>${product.name}</h3>
    <p class="item-count" style="margin-bottom: 0;">Quantity: ${product.qty || 1}</p>
  `;
} else {
  container.innerHTML = `<p style="color:#888;text-align:center;padding:20px 0;">No product selected.</p>`;
}

// Initial price update
updatePrice(basePrice);

// --- Update Price ---
function updatePrice(base) {
  const tax = Math.round(base * 0.05);
  const total = base + tax - discount;

  document.getElementById("subtotal").innerText = "₹" + base.toLocaleString("en-IN");
  document.getElementById("tax").innerText = "₹" + tax.toLocaleString("en-IN");
  document.getElementById("discount-line").innerText = "-₹" + discount.toLocaleString("en-IN");
  document.getElementById("total").innerText = "₹" + total.toLocaleString("en-IN");
}

// --- Apply Coupon ---
function applyCoupon() {
  if (basePrice === 0) return;

  const code = document.getElementById("coupon").value.trim().toUpperCase();
  const msg = document.getElementById("coupon-msg");

  if (code === "SAVE50") {
    discount = 50;
    msg.textContent = "✅ SAVE50 applied — ₹50 off!";
    msg.className = "coupon-msg success";
  } else if (code === "CRICK10") {
    discount = Math.round(basePrice * 0.10);
    msg.textContent = `✅ CRICK10 applied — ₹${discount} off!`;
    msg.className = "coupon-msg success";
  } else {
    discount = 0;
    msg.textContent = "❌ Invalid coupon code.";
    msg.className = "coupon-msg error";
  }

  updatePrice(basePrice);
}

// --- Select Payment ---
function selectPayment(el, type) {
  payment = type;
  document.querySelectorAll(".pay-card").forEach(card => card.classList.remove("active"));
  el.classList.add("active");
}

// --- Confirm Order ---
function confirmOrder() {
  const customerName = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const pincode = document.getElementById("pincode").value.trim();

  if (!customerName || !phone || !address || !pincode) {
    alert("⚠️ Please fill all fields!");
    return;
  }
  if (!/^\d{10}$/.test(phone)) {
    alert("⚠️ Enter a valid 10-digit phone number!");
    return;
  }
  if (!/^\d{6}$/.test(pincode)) {
    alert("⚠️ Enter a valid 6-digit pincode!");
    return;
  }

  // --- Save Order ---
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (isCartCheckout) {
    // Cart checkout — save each item with its actual name
    cart.forEach(item => {
      orders.push({
        name: item.name,
        image: item.image,
        price: item.price,
        qty: item.qty || 1,
        customerName,
        phone,
        address,
        pincode,
        payment
      });
    });
  } else if (product) {
    // Buy Now — single product
    orders.push({
      name: product.name,
      image: product.image,
      price: product.price,
      qty: product.qty || 1,
      customerName,
      phone,
      address,
      pincode,
      payment
    });
  }

  localStorage.setItem("orders", JSON.stringify(orders));

  // --- Clear Cart / BuyNow ---
  if (isCartCheckout) {
    localStorage.removeItem("cart");
  } else {
    localStorage.removeItem("buyNowProduct");
  }

  // --- Show Popup & Redirect ---
  document.getElementById("popup").classList.add("show");
  setTimeout(() => { window.location.href = "orders.html"; }, 2200);
}