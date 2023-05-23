import { recipeCollectionSpread } from "./database/database-recipes.js";
import { render1RecipeBox, renderRecipeTagsAll } from "./function/render-recipebox.js";
import { addRecipeToMyCollection } from "./function/cart-and-collection.js";


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