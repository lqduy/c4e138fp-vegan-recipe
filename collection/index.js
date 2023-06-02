import { afterAddRecipe } from '../function/cart-and-collection.js';
import { loadMyCollectionFromLocalStorage } from '../function/localstorage.js';
import {
  render1RecipeBox,
  renderRecipeTagsAll,
  tickRecipeAdded,
  makeLoveBtnOnImgCore,
  makeCookedBtnOnImgCore
} from '../function/render-recipebox.js';
import { chefsList } from '../database/database-chefs.js';
import { renderChefCollectionInnerBox } from '../reuse/script-reuse.js';

function renderMyCollection() {
  const parent = document.getElementById('collection-space');
  const myCollection = loadMyCollectionFromLocalStorage();

  myCollection.reverse().forEach(recipe => {
    parent.innerHTML += render1RecipeBox(recipe);
    afterAddRecipe(recipe);
  });
}

renderMyCollection();
renderRecipeTagsAll();
tickRecipeAdded();
makeLoveBtnOnImgCore();
makeCookedBtnOnImgCore();
makeChangeViewRicepeBtn();
showChefInnerRecipeBox();

function makeChangeViewRicepeBtn() {
  const changeViewRicepeBtn = document.getElementById('change-view-recipe');
  changeViewRicepeBtn.addEventListener('click', () => {
    const siteBody = document.querySelector('.main-block .site-body');
    siteBody.classList.toggle('site-body-change');
    showChefInnerRecipeBox();
  });
}

function showChefInnerRecipeBox() {
  const siteBody = document.querySelector('.main-block .site-body');
  const chefSpace = Array.from(document.querySelectorAll('.recipe-box .chef-space'));

  if (!siteBody.classList.contains('site-body-change')) {
    chefSpace.forEach(node => {
      const chefId = node.getAttribute('chef-id');

      const chef = chefsList.find(chef => chef.chefId === chefId);

      const elements = `
                <div class="chef-details">
                    <h5><a href="#">${chef.chefName}</a></h5>
                    <p>${chef.job}</p>
                </div>
                <a href="#"><img src="${chef.chefAvatar}" alt="${chef.chefName}" width="80px" height="auto" /></a>
            `;

      node.innerHTML = elements;
    });
  } else {
    chefSpace.forEach(node => {
      const chefId = node.getAttribute('chef-id');

      const chef = chefsList.find(chef => chef.chefId === chefId);

      const elements = `
                <div class="chef-details">
                    <h5><a href="#">${chef.chefName}</a></h5>
                    <p>${chef.job}</p>
                    <p class="chef-quote">“${chef.quote}”</p>
                    <div class="chef-collection-${chef.chefId} chef-collection">

                    </div>
                </div>
                <a href="#"><img src="${chef.chefAvatar}" alt="${chef.chefName}" width="200px" height="auto" /></a>

            `;

      node.innerHTML = elements;

      renderChefCollectionInnerBox(chef.chefId);
    });
    show3LineQuote();
  }
}

function show3LineQuote() {
  const quoteElements = Array.from(document.getElementsByClassName('chef-quote'));

  quoteElements.forEach(element => {
    const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
    const maxHeight = lineHeight * 4; // Số dòng hiển thị
    if (element.clientHeight > maxHeight) {
      while (element.clientHeight > maxHeight) {
        element.textContent = element.textContent.replace(/\W*\s(\S)*$/, '...');
      }
    }
  });
}
