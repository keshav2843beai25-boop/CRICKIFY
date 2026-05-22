// ================= orders.js =================

const orders =
  JSON.parse(localStorage.getItem("orders")) || [];

const container =
  document.getElementById("orders-container");

// --- Empty Orders ---
if (orders.length === 0) {

  container.innerHTML = `

    <div class="empty-state">

      <div class="empty-icon">📦</div>

      <h3>No Orders Yet</h3>

      <p>You haven't placed any orders yet.</p>

      <a href="products.html">
        <button>Shop Now</button>
      </a>

    </div>

  `;
}

// --- Show Orders ---
else {

  [...orders].reverse().forEach(item => {

    const div =
      document.createElement("div");

    div.classList.add("order-card");

    div.innerHTML = `

      <img src="${item.image}" alt="${item.name}">

      <div class="order-info">

        <h3>${item.name}</h3>

        <p class="price-tag">
          ₹${Number(item.price)
            .toLocaleString("en-IN")}
        </p>

        <p>
          <strong>Payment:</strong>
          ${item.payment}
        </p>

        <p>
          <strong>Name:</strong>
          ${item.customerName}
        </p>

        <p>
          <strong>Phone:</strong>
          ${item.phone}
        </p>

        <p>
          <strong>Address:</strong>
          ${item.address}
        </p>

        <span class="order-badge">
          ✅ Confirmed
        </span>

      </div>

    `;

    container.appendChild(div);

  });

}