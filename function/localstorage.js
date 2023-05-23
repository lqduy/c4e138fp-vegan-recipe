// Lưu Bộ sưu tập vào localStorage
export function saveMyCollectionToLocalStorage(object) {
    localStorage.setItem('myCollection', JSON.stringify(object));
}

// Tải Bộ sưu tập từ localStorage
export function loadMyCollectionFromLocalStorage() {
    const myCollectionString = localStorage.getItem('myCollection');
    if (myCollectionString) {
        return JSON.parse(myCollectionString);
    } else {
        return [];
    }
}

// Lưu Giỏ hàng vào localStorage
export function saveCartToLocalStorage(object) {
    localStorage.setItem('cart', JSON.stringify(object));
}

// Tải Giỏ hàng từ localStorage
export function loadCartFromLocalStorage() {
    const cartString = localStorage.getItem('cart');
    if (cartString) {
        return JSON.parse(cartString);
    } else {
        return [];
    }
}
