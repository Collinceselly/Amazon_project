import { cart, addToCart } from '../../data/cart.js';

describe('Test suite: Add to cart', () => {
    it('Adds an existing product to the cart', () => {

    })

    it('Adds a new product to the cart', () => {

        // spyOn(localStorage, 'getItem').add.callFake(() => {
        //     return JSON.stringify([])
        // });
        // console.log(localStorage.getItem('cart'));

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].prductId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    })
});