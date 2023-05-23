import {
    recipeCollectionSpread
} from '../database/database-recipes.js';

import {
    saveCartToLocalStorage,
    loadCartFromLocalStorage,
    saveMyCollectionToLocalStorage,
    loadMyCollectionFromLocalStorage
} from './localstorage.js';

// Thêm sản phẩm vào giỏ hàng khi click chuột
export function addProductToCart(productId) {
    const cart = loadCartFromLocalStorage();
    const groupId = productId.slice(0, productId.length - 2);
    const i = productList.findIndex((group) => group.groupId === groupId);

    const cartItem = cart.find((item) => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        const productItem = productList[i].groupItem.find((item) => item.id === productId);
        cart.push({ ...productItem, quantity: 1 });
    }
    saveCartToLocalStorage(cart); //Save giỏ hàng vào localStorage
}

// Tính Bill
export const sumQuantityInCart = () => loadCartFromLocalStorage().reduce((sum, item) => (sum += item.quantity), 0);

export const sumMoneyOfCart = () => loadCartFromLocalStorage().reduce((sum, item) => (sum += item.price * item.quantity), 0);
