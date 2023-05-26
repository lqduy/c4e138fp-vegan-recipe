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
import { recipeCollection } from '../database/database-recipes.js';

function renderMyCollection() {
    const parent = document.getElementById('collection-space');
    const myCollection = loadMyCollectionFromLocalStorage();

    myCollection.reverse().forEach((recipe) => {
        parent.innerHTML += render1RecipeBox(recipe);
        afterAddRecipe(recipe);
    });
}

renderMyCollection();
renderRecipeTagsAll();
tickRecipeAdded();
makeLoveBtnOnImgCore();
makeCookedBtnOnImgCore();

const zoomBtn = document.getElementById('change-zoom-recipe');
zoomBtn.addEventListener('click', () => {
    const container = document.getElementById('collection-space');
    container.classList.toggle('container');
    showChefInnerRecipeBox();
});

const changeViewRicepeBtn = document.getElementById('change-view-recipe');
changeViewRicepeBtn.addEventListener('click', () => {
    const siteBody = document.querySelector('.main-block .site-body');
    siteBody.classList.toggle('site-body-change');
    showChefInnerRecipeBox();
});

function showChefInnerRecipeBox() {
    const container = document.getElementById('collection-space');
    const siteBody = document.querySelector('.main-block .site-body');
    const chefSpace = Array.from(document.querySelectorAll('.recipe-box .chef-space'));

    if (!siteBody.classList.contains('site-body-change')) {
        chefSpace.forEach((node) => {
            node.innerHTML = '';
        });
    }

    if (container.classList.contains('container') && siteBody.classList.contains('site-body-change')) {
        chefSpace.forEach((node) => {
            const chefId = node.getAttribute('chef-id');

            const chef = chefsList.find((chef) => chef.chefId === chefId);

            const elements = `
                <div class="chef-details">
                    <h5><a href="#">${chef.chefName}</a></h5>
                    <p>${chef.job}</p>
                </div>
                <img src="${chef.chefAvatar}" alt="${chef.chefName}" width="90px" height="auto" />
            `;

            node.innerHTML = elements;
        });
    }

    if (!container.classList.contains('container') && siteBody.classList.contains('site-body-change')) {
        chefSpace.forEach((node) => {
            const chefId = node.getAttribute('chef-id');

            const chef = chefsList.find((chef) => chef.chefId === chefId);

            const elements = `
                <div class="chef-details">
                    <h5><a href="#">${chef.chefName}</a></h5>
                    <p>${chef.job}</p>
                    <p class="chef-quote">“${chef.quote}”</p>
                    <div class="chef-collection-${chef.chefId} chef-collection">
                    
                    </div>
                </div>
                <img src="${chef.chefAvatar}" alt="${chef.chefName}" width="270px" height="auto" />
            `;

            node.innerHTML = elements;

            renderChefCollectionInnerBox(chef.chefId);
        });
    }
}

function renderChefCollectionInnerBox(chefId) {
    const chef = recipeCollection.find((item) => item.chef.chefId === chefId);
    const chefCollection = chef.recipes;

    const parent = Array.from(document.querySelectorAll(`.chef-collection-${chefId}`));

    parent.forEach((parentItem) => {
        const elements = chefCollection.reduce(
            (string, recipe) =>
                string +
                `<a href="#"><img src="${recipe.thumbnail}" alt="${recipe.name}" width="80px" height="auto" /></a>`,
            ''
        );

        parentItem.innerHTML = elements;
    });
}
