import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { formatCurrency } from "../scripts/utils/money.js";
import { getProduct, loadProducts, loadProductsFetch } from "./products.js";
import { calculateCartQuantity } from './cart.js';

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

function dateDisplay(dateString) {
    return dayjs(dateString).format('MMMM, D')
}

async function renderOrders() {

    await loadProductsFetch();

    let ordersHTML = '';

    if (orders) {
        orders.forEach((order) => {

            ordersHTML += `

            <div class="order-container">
            
                <div class="order-header">
                    <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${dateDisplay(order.orderTime)}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${formatCurrency(order.totalCostCents)}</div>
                    </div>
                    </div>

                    <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${order.id}</div>
                    </div>
                </div>

                `;
        
        order.products.forEach((product) => {
            const productId = product.productId;
            const matchingProduct = getProduct(productId);
            console.log(matchingProduct);

            ordersHTML +=`

            <div class="order-details-grid">
                <div class="product-image-container">
                <img src="${matchingProduct.image}">
                </div>

                <div class="product-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-delivery-date">
                    Arriving on: ${dateDisplay(product.estimatedDeliveryTime)}
                </div>
                <div class="product-quantity">
                    Quantity: ${product.quantity}
                </div>
                <button class="buy-again-button button-primary">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
                </div>

                <div class="product-actions">
                <a href="tracking.html">
                    <button class="track-package-button button-secondary">
                    Track package
                    </button>
                </a>
            </div>
        </div> 
    
            `;
        });
        ordersHTML += '</div>'
    })
    }

    document.querySelector('.js-order-grid')
        .innerHTML = ordersHTML;
    
    document.querySelector('.js-cart-quantity')
        .innerHTML = calculateCartQuantity()
    
}
document.addEventListener('DOMContentLoaded', renderOrders);