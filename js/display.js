import { getStockStatus } from "./inventoryUtils.js";

const productList = document.getElementById("productList");
const noResultsMessage = document.getElementById("noResultsMessage");
const totalInventoryValue = document.getElementById("totalInventoryValue");
const lowStockCount = document.getElementById("lowStockCount");
const outOfStockCount = document.getElementById("outOfStockCount");

export function displayProducts(products) {
  productList.innerHTML = "";

  if (products.length === 0) {
    noResultsMessage.hidden = false;
    return;
  }

  noResultsMessage.hidden = true;

  products.forEach(({ id, name, category, price, stock }) => {
    const status = getStockStatus(stock);
    const statusClass = status.toLowerCase().replaceAll(" ", "-");

    const card = document.createElement("article");

    card.className = "product-card";
    card.dataset.id = id;

    card.innerHTML = `
      <h3>${name}</h3>

      <p class="product-category">
        ${category}
      </p>

      <dl class="product-details">
        <div>
          <dt>Price</dt>
          <dd>₱${price.toLocaleString()}</dd>
        </div>

        <div>
          <dt>Stock</dt>
          <dd>${stock}</dd>
        </div>
      </dl>

      <span class="stock-status ${statusClass}">
        ${status}
      </span>
    `;

    productList.appendChild(card);
  });
}

export function displaySummary(total, lowStock, outOfStock) {
  totalInventoryValue.textContent = `₱${total.toLocaleString()}`;
  lowStockCount.textContent = lowStock;
  outOfStockCount.textContent = outOfStock;
}
