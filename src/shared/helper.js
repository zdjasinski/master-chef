import get from "lodash/get";

export function generateRandomId() {
    return Math.random() * 1000000000000000000;
}

export function getProductName(products = [], productId) {
    if (!productId) {
        return;
    }

    const product = products.find(product => product.id === productId);

    return get(product, "name", "");
}

export function isBlank(text = "") {
    return !text.trim();
}