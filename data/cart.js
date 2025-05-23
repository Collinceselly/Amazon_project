export let cart = JSON.parse(localStorage.getItem('cart')); // Retreaving the cart values as stored in the local storage


if (!cart) { // When the site is loaded and the cart is empty, provide the default values as described by the array
    cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
    },
    {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
    }];
}


function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart)); // function to save the cart into local storage
}

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
                  quantity: quantityValue,
                  deliveryOptionId: '1'
              });
          }
    saveToStorage() // When you add to cart save into local storage
  
  }

  export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem)
        }
    })

    cart = newCart

    saveToStorage(); // When you update cart save into local storage

  }


  export function calculateCartQuantity() {
    let cartQuantity = 0;
  
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity
    });

    return cartQuantity;
  }


export function updateQuantity(productId, newQuantity) {
    let marchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            marchingItem = cartItem
        }
    })
    marchingItem.quantity = newQuantity;

    saveToStorage();
}


export function updateDeliveryOption(productId, deliveryOptionId) {
    let machingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            machingItem = cartItem;
        }
    });


    machingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage()
}


export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  });
  xhr.open('GET', 'https://supersimplebackend.dev/cart'); // The products url or endpoint
  xhr.send();
}