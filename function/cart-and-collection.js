import { recipeCollectionSpread } from '../database/database-recipes.js';
import { productList } from '../database/database-products.js';
import { renderTheCorner } from '../reuse/script-reuse.js';
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
  const i = productList.findIndex(group => group.groupId === groupId);

  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    const productItem = productList[i].groupItem.find(item => item.id === productId);
    cart.push({ ...productItem, quantity: 1 });
  }
  saveCartToLocalStorage(cart); //Save giỏ hàng vào localStorage
  renderTheCorner();
}

// Sau khi bấm thêm vào Bộ sưu tập, giữ màu cam nút trái tim và hiển thẻ check Đã thích
export function afterAddRecipe(recipe) {
  const btnLoveOnImgCore = document.querySelectorAll(`.love-btn-${recipe.id}`);
  btnLoveOnImgCore.forEach(btn => btn.classList.add('selected'));

  const loveCheckNode = document.querySelectorAll(`.recipe-${recipe.id} .check-space .love-check`);
  loveCheckNode.forEach(item => item.classList.add('checked'));

  if (recipe.isCooked) {
    const btnCookedOnImgCore = document.querySelectorAll(`.cooked-btn-${recipe.id}`);
    btnCookedOnImgCore.forEach(btn => btn.classList.add('selected'));

    const cookedCheckNode = document.querySelectorAll(`.recipe-${recipe.id} .check-space .cooked-check`);
    cookedCheckNode.forEach(item => item.classList.add('checked'));
  }
}

// Thêm công thức vào Bộ sưu tập khi click chuột
export function addRecipeToMyCollection() {
  recipeCollectionSpread().forEach(recipe => {
    const getButtonElements = document.querySelectorAll(`.addCollectionBtn-${recipe.id}`);

    getButtonElements.forEach(buttonElement =>
      buttonElement.addEventListener('click', () => {
        const myCollection = loadMyCollectionFromLocalStorage();

        const myCollectionItem = myCollection.find(item => item.id === recipe.id);

        if (!myCollectionItem) {
          myCollection.push({ ...recipe, isCooked: false });
          saveMyCollectionToLocalStorage(myCollection);
          renderTheCorner();

          afterAddRecipe(recipe);
        }
      })
    );
  });
}

// Tính Bill
export const sumQuantityInCart = () => loadCartFromLocalStorage().reduce((sum, item) => (sum += item.quantity), 0);

export const sumMoneyOfCart = () =>
  loadCartFromLocalStorage().reduce((sum, item) => (sum += item.price * item.quantity), 0);
