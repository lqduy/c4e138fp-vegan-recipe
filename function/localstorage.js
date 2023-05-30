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

// Lưu trạng thái đăng nhập vào localStorage
export function updateLoginStatus(trueOrFalse) {
    localStorage.setItem('isLogged', JSON.stringify(trueOrFalse));
}

// Kiểm tra trong LocalStorage đang lưu trạng thái đăng nhập True hay False
export function isLogged() {
    const string = localStorage.getItem('isLogged');
    if (string) {
        return JSON.parse(string);
    } else {
        return false;
    }
}

// Lưu user đang đăng nhập vào localStorage
export function saveUserLoggedToLocalStorage(object) {
    localStorage.setItem('userLogged', JSON.stringify(object));
}

// Tải user đang đăng nhập từ localStorage
export function loadUserLoggedFromLocalStorage() {
    const string = localStorage.getItem('userLogged');
    if (string) {
        return JSON.parse(string);
    } else {
        return {};
    }
}
