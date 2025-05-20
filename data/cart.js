export const cart = [];

export function addToCart(productId) {
    let machingItem;
  
          cart.forEach((cartItem) => {
              if (productId === cartItem.productId) {
                  machingItem = cartItem;
              }
          });
          
          const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
          const quantityValue = Number(quantitySelector.value)
          
  
          if (machingItem) {
              machingItem.quantity += quantityValue;
          }
          else {
              cart.push({
                  productId: productId,
                  quantity: quantityValue
              });
          }
  
  }