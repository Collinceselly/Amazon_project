import { cart } from "./cart.js";
import { orders } from "./orders.js";
import { getProduct, products, loadProductsFetch } from "./products.js";


async function placedOrders() {

    await loadProductsFetch();

    cart.forEach((cartItem) => {
        
        const order = getProduct(cartItem.productId);
    })
}
placedOrders();