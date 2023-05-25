import { recipeCollectionSpread } from '../database/database-recipes.js';
import { render1RecipeBox, renderRecipeTagsAll } from '../function/render-recipebox.js';
import { addRecipeToMyCollection } from '../function/cart-and-collection.js';

// Lấy số ngẫu nhiên
function getRandomNumbers(arr, n) {
    const numbers = Array(arr.length)
        .fill()
        .map((_, index) => index);

    const randomNumbers = [];

    while (randomNumbers.length < n) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        randomNumbers.push(numbers[randomIndex]);
        numbers.splice(randomIndex, 1);
    }

    return randomNumbers;
}

// Lấy ngẫu nhiên 4 công thức gợi ý trong danh sách phẳng
const getRandomRecipes = getRandomNumbers(recipeCollectionSpread(), 4).map((value) => recipeCollectionSpread()[value]);

// Render list công thức gợi ý trên Trang chủ

function renderSuggestRecipeAll() {
    const parent = document.getElementById('suggest-dishes__body');
    const childs = getRandomRecipes.map((item) => render1RecipeBox(item));
    parent.innerHTML = childs.reduce((content, item) => content + item, '');
}

renderSuggestRecipeAll();
renderRecipeTagsAll();
addRecipeToMyCollection();

const nextChefBtn = document.getElementById('next-chef');
const backChefBtn = document.getElementById('back-chef');
const chefSlideContainer = document.querySelector('.chef-space-block .chef-space__body .chef-space__core');
const chefSlides = document.querySelectorAll('.chef-space__core .the-chef__wrap');

function makeBtnChefSlides() {
    let clickCount = 0;
    nextChefBtn.addEventListener('click', () => {
        if (clickCount < chefSlides.length - 3) {
            clickCount++;
            transformChef(clickCount);
        }
    });
    backChefBtn.addEventListener('click', () => {
        if (clickCount > 0) {
            clickCount--;
            transformChef(clickCount);
        }
    });
}

function transformChef(clickCount) {
    const translateValue = -(445 * clickCount);
    chefSlideContainer.style.transform = `translateX(${translateValue}px)`;

    for (let i = clickCount; i < clickCount + 3; i++) {
        chefSlides[i].style.opacity = 1;
    }
    for (let i = 0; i < clickCount; i++) {
        chefSlides[i].style.opacity = 0.3;
    }
    for (let i = clickCount + 3; i < chefSlides.length; i++) {
        chefSlides[i].style.opacity = 0.3;
    }
}

transformChef(0);
makeBtnChefSlides();
