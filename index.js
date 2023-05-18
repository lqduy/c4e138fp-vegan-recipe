import { recipeCollectionSpread } from "./object-recipes.js";

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

// Render 1 công thức gợi ý
function render1SuggestRecipe(recipe) {
    return `
    <div class="repice-box">
        <div class="repice-core">
            <div class="repice-box__thumbnail">
                <img src="${recipe.thumbnail}" alt="" />
                <div class="btn-on-img-block">
                    <div class="btn-on-img-core">
                        <button><i class="fa-solid fa-eye"></i></button>
                        <button><i class="fa-solid fa-heart"></i></button>
                        <button><i class="fa-solid fa-cart-shopping"></i></button>
                    </div>
                </div>
            </div>
            <div class="repice-box__body">
                <div class="content-space">
                    <div class="overview">
                        <h3 class="name">${recipe.name}</h3>
                        <h4 class="chef"><a href="#">${recipe.chefName}</a></h4>
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
                        <p>Chuẩn bị: ${recipe.preparationTime}</p>
                        <p>Nấu: ${recipe.cookingTime}</p>
                    </div>
                    <div class="share-space">
                        <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="#"><i class="fa-brands fa-twitter"></i></a>
                        <a href="#"><i class="fa-brands fa-pinterest-p"></i></a>
                        <a href="#"><i class="fa-solid fa-envelope"></i></a>
                    </div>
                </div>
                <div class="buy-space">
                    <p class="repice__price">${recipe.price}<span> xu</span></p>
                    <button class="add-cart">Thêm</button>
                </div>
            </div>
        </div>
    </div>
    `;
}

// Render list công thức gợi ý trên Trang chủ

function renderSuggestRecipeAll() {
    const parent = document.getElementById('suggest-dishes__body');
    const childs = getRandomRecipes.map((item) => render1SuggestRecipe(item));
    parent.innerHTML = childs.reduce((content, item) => content + item, '');
}

renderSuggestRecipeAll();