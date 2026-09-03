import { getStockStatus } from "./inventoryUtils.js";

export function displayProducts(products) {
    const productList = document.getElementById("productList");
    const noResultsMessage = document.getElementById("noResultsMessage");

    productList.innerHTML = "";

    if (products.length === 0) {
        noResultsMessage.style.display = "block";
        return;
    }

    noResultsMessage.style.display = "none";

    products.forEach(product => {
        const {
            id,
            name,
            category,
            price,
            stock
        } = product;

        const stockStatus = getStockStatus(stock);

        const productCard = document.createElement("article");
        productCard.className = "product-card";
        productCard.dataset.id = id;

        let statusClass = "";

        if (stockStatus === "In Stock") {
            statusClass = "status-in-stock";
        } else if (stockStatus === "Low Stock") {
            statusClass = "status-low-stock";
        } else {
            statusClass = "status-out-of-stock";
        }

        productCard.innerHTML = `
            <h3>${name}</h3>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Price:</strong> ₱${price.toLocaleString()}</p>
            <p><strong>Stock:</strong> ${stock}</p>
            <span class="stock-status ${statusClass}">
                ${stockStatus}
            </span>
        `;

        productList.appendChild(productCard);
    });
}

export function displaySummary(
    totalInventoryValue,
    lowStockCount,
    outOfStockCount
) {
    document.getElementById("totalInventoryValue").textContent =
        `₱${totalInventoryValue.toLocaleString()}`;

    document.getElementById("lowStockCount").textContent =
        lowStockCount;

    document.getElementById("outOfStockCount").textContent =
        outOfStockCount;
}
