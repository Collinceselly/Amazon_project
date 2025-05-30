import { cart, removeFromCart, updateQuantity, calculateCartQuantity, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";


export function renderOrderSummary() {
  updateCartQuantity()
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
      const productId = cartItem.productId;

      const marchingProduct = getProduct(productId);

      const deliveryOptionId = cartItem.deliveryOptionId;
      
      const deliveryOption = getDeliveryOption(deliveryOptionId);

      const dateString = calculateDeliveryDate(deliveryOption);

      cartSummaryHTML +=`

      <div class="cart-item-container js-cart-item-container-${marchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${marchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${marchingProduct.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(marchingProduct.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label-${marchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id = "${marchingProduct.id}">
                      Update
                    </span>
                    <input class="quantity-input js-quantity-input-${marchingProduct.id}">
                    <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id = "${marchingProduct.id}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${marchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  
                  ${deliveryOptionsHTML(marchingProduct, cartItem)}

                </div>
              </div>
            </div>

          `
  })

  function deliveryOptionsHTML(marchingProduct, cartItem) {

    let html = ''

    deliveryOptions.forEach((deliveryOption) => {

      
      const dateString = calculateDeliveryDate(deliveryOption)


      // Getting the price string for every selected payment option
      let priceString;

      if (deliveryOption.priceCents === 0) {
        priceString = 'FREE - Shipping'
      }
      else {
        priceString = `$${formatCurrency(deliveryOption.priceCents)} - Shipping`;
      }

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      /*
      const priceString = deliveryOption.priceCents
      === 0
        ? 'FREE Shipping'
        : `$${formatCurrency(deliveryOption.priceCents)} - Shipping`; */

      html +=`
        <div class="delivery-option js-delvery-option"data-product-id="${marchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" 
          ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${marchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString}
            </div>
          </div>
        </div>

      `
    });

    return html;
  }


  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId)

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();

        updateCartQuantity()

        renderPaymentSummary()
      })

    })

    function updateCartQuantity() {
      const cartQuantity = calculateCartQuantity();

      document.querySelector('.js-checkout-quantity')
          .innerHTML = `${cartQuantity} Items`

    }

  document.querySelectorAll('.js-update-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        const container = document.querySelector(`.js-cart-item-container-${productId}`);

        container.classList.add('is-editing-quantity');
          
      });
      
    });


  document.querySelectorAll('.js-save-quantity-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`)

      const newQuantity = Number(quantityInput.value)

      if (newQuantity < 0 || newQuantity >= 1000) {
        alert('Quantity must be at least 0 and less than 1000');
        return;
      }
      updateQuantity(productId, newQuantity)

      const container = document.querySelector(`.js-cart-item-container-${productId}`);

      container.classList.remove('is-editing-quantity')

      const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);

      quantityLabel.innerHTML = newQuantity;

      updateCartQuantity()

      renderPaymentSummary()
    
    });
      
  });


  document.querySelectorAll('.js-delvery-option')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const {productId, deliveryOptionId} = button.dataset
        updateDeliveryOption(productId, deliveryOptionId)
        renderOrderSummary()

        renderPaymentSummary()
      })
    })


  }




