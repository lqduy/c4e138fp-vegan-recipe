import { loadMyCollectionFromLocalStorage } from '../function/localstorage.js';
import { render1RecipeBox, renderRecipeTagsAll } from '../function/render-recipebox.js';

function renderMyCollection() {
    const parent = document.getElementById('collection-space');
    const childs = loadMyCollectionFromLocalStorage().map((recipe) => (recipe = render1RecipeBox(recipe)));
    parent.innerHTML = childs.reduce((string, item) => string + item, '');
}

renderMyCollection();
renderRecipeTagsAll();
// makeBtnOnImgCore();
