import { products } from "./products.js";

import {
  searchProducts,
  filterProductsByCategory,
  calculateTotalInventoryValue,
  countLowStockProducts,
  countOutOfStockProducts
} from "./inventoryUtils.js";

import {
  displayProducts,
  displaySummary
} from "./display.js";

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");

function updateDashboard() {
  const searchedProducts = searchProducts(
    products,
    searchInput.value
  );

  const filteredProducts = filterProductsByCategory(
    searchedProducts,
    categoryFilter.value
  );

  displayProducts(filteredProducts);

  displaySummary(
    calculateTotalInventoryValue(products),
    countLowStockProducts(products),
    countOutOfStockProducts(products)
  );
}

searchBtn.addEventListener("click", updateDashboard);

categoryFilter.addEventListener("change", updateDashboard);

searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    updateDashboard();
  }
});

resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  categoryFilter.value = "All";

  updateDashboard();
});

updateDashboard();
