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

function updateDisplay() {
    const query = searchInput.value;
    const category = categoryFilter.value;

    let filteredProducts = products;

    if (query.trim() !== "") {
        filteredProducts = searchProducts(filteredProducts, query);
    }

    filteredProducts = filterProductsByCategory(
        filteredProducts,
        category
    );

    displayProducts(filteredProducts);
}

function initializeDashboard() {
    displayProducts(products);

    const totalInventoryValue =
        calculateTotalInventoryValue(products);

    const lowStockCount =
        countLowStockProducts(products);

    const outOfStockCount =
        countOutOfStockProducts(products);

    displaySummary(
        totalInventoryValue,
        lowStockCount,
        outOfStockCount
    );
}

searchBtn.addEventListener("click", updateDisplay);

categoryFilter.addEventListener("change", updateDisplay);

searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        updateDisplay();
    }
});

resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    categoryFilter.value = "All";

    displayProducts(products);
});

initializeDashboard();
