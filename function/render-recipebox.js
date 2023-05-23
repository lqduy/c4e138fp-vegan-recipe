import { recipeCollectionSpread } from "../database/database-recipes.js";

// Render 1 Box Công thức 
export function render1RecipeBox(recipe) {
    return `
    <div id="recipe-${recipe.id}" class="recipe-box">
        <div class="recipe-core">
            <div class="recipe-box__thumbnail">
                <img src=".${recipe.thumbnail}" alt="" />
                <div class="btn-on-img-block">
                    <div class="btn-on-img-core">
                        <button><i class="fa-solid fa-eye"></i></button>
                        <button class="addCollectionBtn-${recipe.id}"><i class="fa-solid fa-heart"></i></button>
                        <button><i class="fa-solid fa-cart-shopping"></i></button>
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
                <div class="add-space">
                    <p class="recipe__price">${recipe.price}<span> xu</span></p>
                    <button class="addCollectionBtn-${recipe.id}">Thêm</button>
                </div>
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
    recipeCollectionSpread().forEach((recipe) => {
        const parents = document.querySelectorAll(`#recipe-${recipe.id} .recipe-tags`);
        parents.forEach((parent) => (parent.innerHTML = renderRecipeTags(recipe)));
    });
}