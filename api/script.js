
const API_URL = "https://dummyjson.com/products";

async function getProducts() {
    const container = document.getElementById("products");

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const data = await response.json();

        container.innerHTML = data.products.map(product => `
            <div class="card">
                <img src="${product.thumbnail}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <h2>$${product.price}</h2>
                <button onclick="viewProduct(${product.id})">
                    View Details
                </button>
            </div>
        `).join("");

    } catch (error) {
        container.textContent = "Failed to load products.";
        console.error(error);
    }
}

async function viewProduct(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const product = await response.json();

    alert(
        `Product: ${product.title}\nPrice: $${product.price}`
    );
}

getProducts();
