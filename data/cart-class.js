class Cart {
    cartItems;
    localStorageKey;

    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();

    }

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)); // Retreaving the cart values as stored in the local storage
    
    
        if (!this.cartItems) { // When the site is loaded and the cart is empty, provide the default values as described by the array
            this.cartItems = [{
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
        }
    
    saveToStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems)); // function to save the cart into local storage
    }

    addToCart(productId) {
        let machingItem;
      
        this.cartItems.forEach((cartItem) => {
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
            this.cartItems.push({
                productId: productId,
                quantity: quantityValue,
                deliveryOptionId: '1'
            });
        }
        this.saveToStorage() // When you add to cart save into local storage
      
      }


      removeFromCart(productId) {
        const newCart = [];
    
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem)
            }
        })
    
        this.cart = newCart
    
        this.saveToStorage(); // When you update cart save into local storage
    
      }

      calculateCartQuantity() {
        let cartQuantity = 0;
      
        this.cartItems.forEach((cartItem) => {
          cartQuantity += cartItem.quantity
        });
    
        return cartQuantity;
      }


      updateQuantity(productId, newQuantity) {
        let marchingItem;
    
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                marchingItem = cartItem
            }
        })
        marchingItem.quantity = newQuantity;
    
        this.saveToStorage();
    }



    updateDeliveryOption(productId, deliveryOptionId) {
        let machingItem;
    
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                machingItem = cartItem;
            }
        });
    
    
        machingItem.deliveryOptionId = deliveryOptionId;
    
        this.saveToStorage()
    }

}


const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');



console.log(cart);
console.log(businessCart);