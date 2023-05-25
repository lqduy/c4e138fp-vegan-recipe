import { recipeCollectionSpread } from '../database/database-recipes.js';
import {
    makeCookedBtnOnImgCore,
    makeLoveBtnOnImgCore,
    render1RecipeBox,
    renderRecipeTagsAll,
    tickRecipeAdded,
} from '../function/render-recipebox.js';
import { addRecipeToMyCollection } from '../function/cart-and-collection.js';
import { filterRecipeByTag } from '../function/search-filter.js';

const top5TrendingRecipesId = ['110135-0002', '110133-0003', '110133-0002', '110134-0002', '110134-0003'];

const top5TrendingRecipes = top5TrendingRecipesId.map((value) => {
    return recipeCollectionSpread().find((item) => item.id === value);
});

// Render 5 món nổi bật lên slideshow
function renderTop5TrendingRecipes() {
    const parent = document.getElementById('trending');
    const childs = top5TrendingRecipes.map((item) => (item = render1RecipeBox(item)));
    parent.innerHTML = childs.reduce((content, item) => content + item, '');
}

renderTop5TrendingRecipes();

// Auto slideshow
const slides = document.querySelectorAll('#trending .recipe-box');
let nowIndex = 0;
function showSlides() {
    slides.forEach((slide) => slide.classList.remove('active'));
    slides[nowIndex].classList.add('active');

    nowIndex++;
    nowIndex = (nowIndex + slides.length) % slides.length;
}

showSlides();
setInterval(showSlides, 9000);

// Nút Xem tất cả công thức
function seeAllListButton() {
    document.getElementById('see-all-list').addEventListener('click', () => {
        renderRecipeAll(recipeCollectionSpread());
    });
}

// Render tất cả công thức lên trang
export function renderRecipeAll(recipeList) {
    const parent = document.getElementById('all-list');
    const childs = recipeList.map((item) => (item = render1RecipeBox(item)));

    parent.innerHTML = childs.reduce((content, item) => content + item, '');

    renderRecipeTagsAll();
    tickRecipeAdded();
    seeAllListButton();
    filterRecipeByTag();
    addRecipeToMyCollection();
    // makeLoveBtnOnImgCore();
    // makeCookedBtnOnImgCore();
}

renderRecipeAll(recipeCollectionSpread());
