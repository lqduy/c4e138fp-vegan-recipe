import { afterAddRecipe } from '../function/cart-and-collection.js';
import { loadMyCollectionFromLocalStorage } from '../function/localstorage.js';
import {
    render1RecipeBox,
    renderRecipeTagsAll,
    tickRecipeAdded,
    makeLoveBtnOnImgCore,
    makeCookedBtnOnImgCore
} from '../function/render-recipebox.js';

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
