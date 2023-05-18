// Render khi giỏ hàng rỗng
function renderWhenCartIsEmpty() {
    return `
    <div id="empty-cart">
        <img src="./assets/shopping-cart.png" alt="">
        <div>
            <a href="#">Đến trang công thức</a>
        </div>
    </div>
    `;
}

// Render một sản phẩm trong giỏ hàng
function renderProductInCart(product) {
    const formatPrice = product.price.toLocaleString('en-US');
    const moneyPerRow = (product.price * product.quantity).toLocaleString('en-US');

    return `
    <tr id="${product.id}">
        <td class="product">
            <div class="product-thumbnail">
                <img src="${product.image}" alt="">
            </div>
            <div class="product-details">
                <h3 class="product-details__name">${product.name}</h3>
            </div>
        </td>
        <td class="price">
            <p>${formatPrice} đ</p>
            <p>${product.unit}</p>
        </td>
        <td class="quantity">
            <div class="quantity-box">
                <button class="minus" onclick="changeQuantityByButton('${product.id}', -1)"><i class="fa-sharp fa-solid fa-minus"></i></button>
                <input type="text" id="quantity-input-${product.id}" value="${product.quantity}"></input>
                <button class="plus" onclick="changeQuantityByButton('${product.id}', 1)"><i class="fa-sharp fa-solid fa-plus"></i></button>
            </div>
        </td>
        <td>${moneyPerRow} đ</td>
        <td class="delete-btn"><button onclick="deleteProduct('${product.id}')"><i class="fa-solid fa-trash-can fa-lg"></i></button></td>
    </tr>
    `;
}

// Render danh sách sản phẩm trong giỏ hàng
function renderAllCart() {
    const elements = document.getElementById('product-in-the-cart');
    const cart = loadCartFromLocalStorage();

    if (cart.length > 0) {
        for (const product of cart.reverse()) {
            const item = renderProductInCart(product);
            elements.innerHTML += item;
        }
    } else {
        elements.innerHTML += renderWhenCartIsEmpty();
    }
}

// Render Bill Cart
function renderBillCart() {
    const sumType = document.getElementById('sumTypeInCart');
    sumType.innerHTML = loadCartFromLocalStorage().length;

    const sumQuantity = document.getElementById('sumQuantityInCart');
    sumQuantity.innerHTML = sumQuantityInCart();

    const sumMoney = document.getElementById('sumMoneyOfCart');
    sumMoney.innerHTML = `${sumMoneyOfCart().toLocaleString('en-US')} đ`;

    const saleOff = document.getElementById('saleOff');
    saleOff.innerHTML = 0 + ' đ';

    const totalPayment = document.getElementById('totalPayment');
    totalPayment.innerHTML = `${(sumMoneyOfCart() - 0).toLocaleString('en-US')} đ`;
}

window.addEventListener('load', () => {
    renderAllCart();

    const inputQuantityElements = document.querySelectorAll('tr input[type="text"]');
    addEventForInput(inputQuantityElements);

    renderBillCart();
});

// Nút tăng giảm số lượng sản phẩm trong giỏ hàng
function changeQuantityByButton(productId, n) {
    const cart = loadCartFromLocalStorage();
    const i = cart.findIndex((item) => item.id === productId);

    if (!(cart[i].quantity === 1 && n === -1)) {
        cart[i].quantity += n;
    }

    const quantityElement = document.getElementById(`${productId}`).querySelector('input[type="text"]');
    quantityElement.value = cart[i].quantity;

    const moneyPerRowElement = document.querySelector(`#${productId} td:nth-child(4)`);
    const moneyPerRow = (cart[i].quantity * cart[i].price).toLocaleString('en-US');
    moneyPerRowElement.innerHTML = `${moneyPerRow} đ`;

    saveCartToLocalStorage(cart);

    renderBillCart();
}

// Ô nhập số lượng
function addEventForInput(inputQuantityElements) {
    inputQuantityElements.forEach((inputElement) => {
        inputElement.addEventListener('input', (event) => {
            if (typeof parseInt(inputElement.value) === 'number' && inputElement.value > 0) {
                const cart = loadCartFromLocalStorage();
                const productId = event.target.id;
                const i = cart.findIndex((product) => `quantity-input-${product.id}` === productId);
                cart[i].quantity = parseInt(inputElement.value);

                const moneyPerRowElement = document.querySelector(`#${cart[i].id} td:nth-child(4)`);
                const moneyPerRow = (cart[i].quantity * cart[i].price).toLocaleString('en-US');
                moneyPerRowElement.innerHTML = `${moneyPerRow} đ`;

                saveCartToLocalStorage(cart);

                renderBillCart();
            }
        });
    });
}

// Nút xóa sản phẩm khỏi giỏ hàng
function deleteProduct(productId) {
    const cart = loadCartFromLocalStorage();
    const i = cart.findIndex((item) => item.id === productId);

    cart.splice(i, 1);

    saveCartToLocalStorage(cart);

    const productRow = document.getElementById(productId);
    const productTBody = productRow.parentNode;
    productTBody.removeChild(productRow);
    
    renderBillCart();
}

// Nút xóa tất cả sản phẩm khỏi giỏ hàng
function deleteAllCart() {
    const producTable = document.querySelector('.cart-space table');
    const producTBody = document.querySelector('.cart-space table tbody');
    producTable.removeChild(producTBody);

    saveCartToLocalStorage([]);
    renderWhenCartIsEmpty();
    renderBillCart();
}
