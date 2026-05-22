// ================= script.js =================

// --- Hamburger Menu ---
function toggleMenu() {
  document
    .getElementById("navLinks")
    ?.classList.toggle("open");
}

// --- Update Cart Badge ---
function updateCartBadge() {

  const badge =
    document.getElementById("cart-badge");

  if (!badge) return;

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce((sum, item) => {
    return sum + (item.qty || 1);
  }, 0);

  badge.style.display =
    total > 0 ? "flex" : "none";

  badge.textContent = total;
}

updateCartBadge();

// --- Search Products ---
const searchInput =
  document.getElementById("searchInput");

if (searchInput) {

  searchInput.addEventListener("keyup", function () {

    const value =
      this.value.toLowerCase();

    document.querySelectorAll(".card")
      .forEach(card => {

        const name =
          card.querySelector(".product-name")
          ?.innerText
          .toLowerCase() || "";

        card.style.display =
          name.includes(value)
          ? "flex"
          : "none";

      });

  });

}

// --- Category Filter ---
function filterCategory(category, btn) {

  document.querySelectorAll(".cat-btn")
    .forEach(button => {
      button.classList.remove("active");
    });

  btn.classList.add("active");

  document.querySelectorAll(".card")
    .forEach(card => {

      if (
        category === "all" ||
        card.dataset.category === category
      ) {

        card.style.display = "flex";

      }

      else {

        card.style.display = "none";

      }

    });

}

// --- Find Card ---
function getCard(element) {

  while (element) {

    if (
      element.classList &&
      element.classList.contains("card")
    ) {
      return element;
    }

    element = element.parentElement;
  }

  return null;
}

// --- Get Product Info ---
function getInfo(button) {

  const card = getCard(button);

  if (!card) {

    alert("Product not found");

    return null;
  }

  const name =
    card.querySelector(".product-name")
    ?.innerText.trim();

  const image =
    card.querySelector("img")?.src;

  const priceEl =
    card.querySelector("[data-price]");

  const price =
    parseInt(priceEl?.dataset.price || 0);

  return {
    name,
    image,
    price
  };
}

// --- Add To Cart ---
function addToCart(button) {

  const product = getInfo(button);

  if (!product) return;

  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const existing =
    cart.find(item => item.name === product.name);

  if (existing) {

    existing.qty =
      (existing.qty || 1) + 1;

  }

  else {

    cart.push({
      ...product,
      qty: 1
    });

  }

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  updateCartBadge();

  button.textContent = "✓ Added";

  button.style.background = "#2d6a4f";

  setTimeout(() => {

    button.textContent = "+ Cart";

    button.style.background = "";

  }, 1200);

}

// --- Buy Now ---
// --- Buy Now ---
function buyNow(button) {

  const currentUser =
    localStorage.getItem("loggedInUser");

  if (!currentUser) {

    alert("Please Login First");

    window.location.href = "login.html";

    return;
  }

  const product = getInfo(button);

  if (!product) return;

  product.qty = 1;

  localStorage.setItem(
    "buyNowProduct",
    JSON.stringify(product)
  );

  window.location.href = "billing.html";
}
function increaseQty(index){

  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  cart[index].qty += 1;

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  location.reload();
}



function decreaseQty(index){

  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  if(cart[index].qty > 1){

    cart[index].qty -= 1;

  }

  else {

    cart.splice(index,1);

  }

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  location.reload();
}
// ===== PROFILE SYSTEM =====

function loadProfile() {

  const profileArea =
    document.getElementById("profileArea");

  if (!profileArea) return;

  const user =
    JSON.parse(
      localStorage.getItem("loggedInUser")
    );

  // USER NOT LOGGED IN
  if (!user) {

    profileArea.innerHTML = `
      <a href="login.html">Login</a>
    `;

    return;
  }

  // USER LOGGED IN
  profileArea.innerHTML = `

    <div class="profile-box">

      <div class="profile-icon">
        👤
      </div>

      <span class="profile-name">
        ${user.name}
      </span>

      <button
        class="logout-btn"
        onclick="logoutUser()"
      >
        Logout
      </button>

    </div>

  `;
}

function logoutUser() {

  localStorage.removeItem(
    "loggedInUser"
  );

  alert("Logged Out");

  window.location.href =
    "index.html";
}

loadProfile();