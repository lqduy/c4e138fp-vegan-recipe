import {
    loadCartFromLocalStorage,
    loadMyCollectionFromLocalStorage,
    isLogged,
    loadUserLoggedFromLocalStorage
} from '../function/localstorage.js';
import { makeSignUpLogInBtn, makeLogOutBtn } from '../function/signup-login-logout.js';
import { recipeCollection } from '../database/database-recipes.js';

// Scroll Page
let lastScrollPosition = 0;
const cornerSpace = document.querySelector('.corner-space');
const headerElement = document.querySelector('.header-block');
window.addEventListener('scroll', () => {
    let currentScrollPosition = window.pageYOffset;

    if (currentScrollPosition >= 145) {
        cornerSpace.classList.remove('hide-corner-space');
    } else {
        cornerSpace.classList.add('hide-corner-space');
    }

    if (lastScrollPosition < currentScrollPosition && currentScrollPosition > 145) {
        headerElement.classList.add('hide-header');
    } else {
        headerElement.classList.remove('hide-header');
    }

    lastScrollPosition = currentScrollPosition;
});

export function renderTheCorner() {
    const myCollection = loadMyCollectionFromLocalStorage().length;
    const cart = loadCartFromLocalStorage().length;

    const parent = document.querySelector('.corner-space');
    const elements = `
    <a href="/collection/index.html"><i class="fa-solid fa-bookmark fa-xl"></i><span>${myCollection}</span></a>
    <a href="/cart/index.html"><i class="fa-solid fa-bag-shopping fa-xl"></i><span>${cart}</span></a>
    `;

    parent.innerHTML = elements;
}

export function renderUserSpace() {
    const userElement = document.getElementById('sign-up-log-in');
    if (isLogged()) {
        const elements = `
        <div class="user-logged-space">
            <a id="user-logged">${loadUserLoggedFromLocalStorage().id} <i class="fa-solid fa-user"></i></a>
            <button id="log-out">Đăng xuất</button>
        </div>
        `;
        userElement.innerHTML = elements;
        makeLogOutBtn();
    } else {
        const elements = `
        <a id="sign-up" class="form-signup" href="#">Đăng ký</a>
        <a id="log-in" class="form-login" href="#">Đăng nhập</a>
        `;
        userElement.innerHTML = elements;
        makeSignUpLogInBtn();
    }
}

// Render các món ăn của đầu bếp
export function renderChefCollectionInnerBox(chefId) {
    const chef = recipeCollection.find((item) => item.chef.chefId === chefId);
    const chefCollection = chef.recipes;

    const parent = Array.from(document.querySelectorAll(`.chef-collection-${chefId}`));

    parent.forEach((parentItem) => {
        const elements = chefCollection.reduce(
            (string, recipe) =>
                string +
                `
                <div class="other-recipe">
                    <a href="#"><img src="${recipe.thumbnail}" alt="${recipe.name}" /></a>
                    <div class="show-name"><span>${recipe.name}</span></div>
                </div>`,
            ''
        );

        parentItem.innerHTML = elements;
    });
}
