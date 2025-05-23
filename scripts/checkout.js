import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js'
// import '../data/backend-practice.js'


Promise.all([
    
    loadProductsFetch(),
    
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        })
    })
]).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
})


// Using Promise.all to load all the promises at onces and then render the display.

Promise.all([
    new Promise((resolve) => { // Initiate a promise
        loadProducts(() => { // Run the function you want to run
            resolve(); // Call resolve that make the promise ready for the next step
        });
    }),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        })
    })
]).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
})

// Using Promise
/*
new Promise((resolve) => { // Initiate a promise
    loadProducts(() => { // Run the function you want to run
        resolve(); // Call resolve that make the promise ready for the next step
    });
}).then(() => { // Use then to call the next step.
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        })
    })
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
}); */


// Using a callback - function

loadProducts(() => {
    loadCart(() => {
        renderOrderSummary();
        renderPaymentSummary();

    });
});

  