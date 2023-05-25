import { addRecipeToMyCollection } from '../function/cart-and-collection.js';
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
    const childs = loadMyCollectionFromLocalStorage().map((recipe) => (recipe = render1RecipeBox(recipe)));
    parent.innerHTML = childs.reduce((string, item) => string + item, '');
}

renderMyCollection();
renderRecipeTagsAll();
tickRecipeAdded();
makeLoveBtnOnImgCore();
makeCookedBtnOnImgCore();
