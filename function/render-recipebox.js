import { recipeCollectionSpread } from '../database/database-recipes.js';
import { loadMyCollectionFromLocalStorage, saveMyCollectionToLocalStorage } from './localstorage.js';
import { afterAddRecipe } from './cart-and-collection.js';
import { renderTheCorner } from '../reuse/script-reuse.js';

// Render 1 Box Công thức
export function render1RecipeBox(recipe) {
  return `
    <div class="recipe-box recipe-${recipe.id}" recipe-id="${recipe.id}">
        <div class="out-of-love">

        </div>
        <div class="check-space">
            <a class="love-check">Đã thích</a>
            <a class="cooked-check">Đã nấu</a>
        </div>

        <div class="recipe-core">
            <div class="recipe-box__thumbnail">
                <img src="${recipe.thumbnail}" alt="${recipe.name}" />
                <div class="btn-on-img-block">
                    <div class="btn-on-img-core">
                        <button><a href="/bun-oc-chay/index.html"><i class="fa-solid fa-eye"></i></a></button>
                        <button class="addCollectionBtn-${recipe.id} love-btn-${recipe.id} love-btn"><i class="fa-solid fa-heart"></i></button>
                        <button class="cooked-btn-${recipe.id} cooked-btn"><i class="fa-solid fa-check"></i></button>
                    </div>
                </div>
            </div>
            <div class="recipe-box__body">
                <div class="content-space">
                    <div class="overview">
                        <a href="/bun-oc-chay/index.html"><h3 class="name">${recipe.name}</h3></a>
                        <h4 class="chef"><a href="#">${recipe.chefName}</a></h4>
                        <div class="recipe-tags">

                        </div>
                        <p class="meta">
                            ${recipe.intro}
                        </p>
                        <div class="star">
                            <span><i class="fa-sharp fa-solid fa-star fa-xl"></i></span>
                            <span><i class="fa-sharp fa-solid fa-star fa-xl"></i></span>
                            <span><i class="fa-sharp fa-solid fa-star fa-xl"></i></span>
                            <span><i class="fa-sharp fa-solid fa-star fa-xl"></i></span>
                            <span><i class="fa-sharp fa-solid fa-star fa-xl"></i></span>
                        </div>
                    </div>
                    <div class="details">
                        <p>Chuẩn bị: <span>${recipe.preparationTime}</span></p>
                        <p>Nấu: <span>${recipe.cookingTime}</span></p>
                    </div>
                    <div class="share-space">
                        <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="#"><i class="fa-brands fa-twitter"></i></a>
                        <a href="#"><i class="fa-brands fa-pinterest-p"></i></a>
                        <a href="#"><i class="fa-solid fa-envelope"></i></a>
                    </div>
                </div>
                <div class="add-space">
                    <p class="recipe__price">${recipe.price}<span> xu</span></p>
                    <button class="addCollectionBtn-${recipe.id}">Thêm</button>
                </div>
                <div class="chef-space" chef-id="${recipe.chefId}"></div>
            </div>
        </div>
    </div>
    `;
}

// Render 1 tag để hiển thị
function renderRecipeTags(recipe) {
  return recipe.tag.reduce((string, item) => string + `<a>#${item}</a>`, '');
}

// Render tất cả tag ở mỗi công thức
export function renderRecipeTagsAll() {
  recipeCollectionSpread().forEach(recipe => {
    const parents = document.querySelectorAll(`.recipe-${recipe.id} .recipe-tags`);
    parents.forEach(parent => (parent.innerHTML = renderRecipeTags(recipe)));
  });
}
// Nếu công thức nào đã thêm Yêu thích thì đánh dấu
export function tickRecipeAdded() {
  recipeCollectionSpread().forEach(recipe => {
    if (loadMyCollectionFromLocalStorage().find(item => item.id === recipe.id)) {
      afterAddRecipe(recipe);
    }
  });
}

export function makeLoveBtnOnImgCore() {
  const loveBtns = Array.from(document.getElementsByClassName('love-btn'));
  loveBtns.forEach(btn =>
    btn.addEventListener('click', () => {
      const recipeBoxParentNode = btn.parentNode.parentNode.parentNode.parentNode.parentNode;
      const loveCheckNode = recipeBoxParentNode.querySelector('.love-check');
      const checkLove = btn.classList.contains('selected');
      if (checkLove) {
        btn.classList.remove('selected');
        loveCheckNode.classList.remove('checked');
        const recipeId = recipeBoxParentNode.getAttribute('recipe-id');

        let myCollection = loadMyCollectionFromLocalStorage();
        const i = myCollection.findIndex(recipe => recipe.id === recipeId);
        myCollection.splice(i, 1);
        saveMyCollectionToLocalStorage(myCollection);

        renderTheCorner();

        const outOfLoveNode = recipeBoxParentNode.querySelector('.out-of-love');
        outOfLoveNode.style.display = 'block';
      }
    })
  );
}

export function makeCookedBtnOnImgCore() {
  const cookedBtns = Array.from(document.getElementsByClassName('cooked-btn'));
  cookedBtns.forEach(btn =>
    btn.addEventListener('click', () => {
      const recipeBoxParentNode = btn.parentNode.parentNode.parentNode.parentNode.parentNode;
      const cookedCheckNode = recipeBoxParentNode.querySelector('.cooked-check');

      let myCollection = loadMyCollectionFromLocalStorage();
      const recipeId = recipeBoxParentNode.getAttribute('recipe-id');
      const i = myCollection.findIndex(recipe => recipe.id === recipeId);
      const checkCooked = myCollection[i].isCooked;

      if (!checkCooked) {
        btn.classList.add('selected');
        cookedCheckNode.classList.add('checked');
        myCollection[i].isCooked = true;
        saveMyCollectionToLocalStorage(myCollection);
      } else {
        btn.classList.remove('selected');
        cookedCheckNode.classList.remove('checked');
        myCollection[i].isCooked = false;
        saveMyCollectionToLocalStorage(myCollection);
      }
    })
  );
}
