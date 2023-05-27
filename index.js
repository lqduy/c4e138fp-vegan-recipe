import { recipeCollectionSpread } from './database/database-recipes.js';
import { chefsList } from './database/database-chefs.js';
import { render1RecipeBox, renderRecipeTagsAll } from './function/render-recipebox.js';
import { addRecipeToMyCollection, afterAddRecipe } from './function/cart-and-collection.js';
import { loadMyCollectionFromLocalStorage } from './function/localstorage.js';
import { renderChefCollectionInnerBox } from './reuse/script-reuse.js';

const groupDishes = [
    {
        name: 'Gỏi',
        note: 'Các loại rau củ tươi trộn với nước sốt',
        image: '/assets/groups/group-of-dishes-goi.jpg'
    },
    {
        name: 'Kho',
        note: 'Nấu với nước mắm cho vị mặn mà',
        image: '/assets/groups/group-of-dishes-kho.jpg'
    },
    {
        name: 'Cơm',
        note: 'Tạo nên từ hạt ngọc của trời',
        image: '/assets/groups/group-of-dishes-com.jpg'
    },
    {
        name: 'Súp',
        note: 'Nước trong lành ngon ngọt từ rau củ',
        image: '/assets/groups/group-of-dishes-sup.jpg'
    },
    {
        name: 'Chiên',
        note: 'Từ dầu sôi lửa bỏng nên món ngon',
        image: '/assets/groups/group-of-dishes-chien.jpg'
    },
    {
        name: 'Nướng',
        note: 'Điều kỳ diệu được tạo nên từ ngọn lửa',
        image: '/assets/groups/group-of-dishes-nuong.jpg'
    },
    {
        name: 'Lẩu',
        note: 'Hòa quyện mọi thứ trong nồi lẩu nóng',
        image: '/assets/groups/group-of-dishes-lau.jpg'
    }
];

// Search Bar
// makeSuggestKeyToSearch();
// makeShowAndHideSuggestBox();

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

// Render list công thức gợi ý trên Trang chủ

function renderSuggestRecipeAll() {
    // Lấy ngẫu nhiên 4 công thức gợi ý trong danh sách phẳng
    const getRandomRecipes = getRandomNumbers(recipeCollectionSpread(), 4).map(
        (value) => recipeCollectionSpread()[value]
    );

    const parent = document.getElementById('suggest-dishes__body');
    const childs = getRandomRecipes.map((item) => render1RecipeBox(item));
    parent.innerHTML = childs.reduce((content, item) => content + item, '');

    renderRecipeTagsAll();
    addRecipeToMyCollection();
    makerenewRecipeBtn();

    getRandomRecipes.forEach((recipe) => {
        if (loadMyCollectionFromLocalStorage().find((item) => item.id === recipe.id)) {
            afterAddRecipe(recipe);
        }
    });
}

renderSuggestRecipeAll();

// Tạo nút renew công thức ở chỗ gợi ý
function makerenewRecipeBtn() {
    const renewRecipeBtn = document.getElementById('renew-recipe');
    renewRecipeBtn.addEventListener('click', renderSuggestRecipeAll);
}

// Render 1 ô group món ăn
function render1GroupBox(group) {
    return `
    <div class="group-block">
        <a href="#">
            <div class="group-core">
                <div class="group-thumbnail">
                    <img src="${group.image}" alt="${group.name}" />
                </div>
                <div class="group-content">
                    <div class="group__name">
                        <h3>${group.name} <i class="caret fa-solid fa-angle-down fa-rotate-270"></i></h3>
                    </div>
                    <div class="group__description">
                        <p>${group.note}</p>
                    </div>
                </div>
            </div>
        </a>
    </div>
    `;
}
// Render tất cả nhóm món ăn
function renderGroupDishesAll() {
    const parent = document.querySelector('.group-of-dishes-block .group-of-dishes__body');
    const childs = groupDishes.map((group) => render1GroupBox(group));
    parent.innerHTML = childs.reduce((string, item) => string + item, '');
}
renderGroupDishesAll();

// Render 1 khung hiển thị đầu bếp
function render1ChefBox(chef) {
    return `
    <div class="the-chef__wrap">
        <div class="the-chef chef-${chef.chefId}">
            <a href="#">
                <div class="top-mid">
                    <div class="top">
                        <div class="avatar">
                            <img src="${chef.chefAvatar}" alt="${chef.chefName}" />
                        </div>
                        <div class="name-and-job">
                            <h3>${chef.chefName}</h3>
                            <h4>${chef.job}</h4>
                        </div>
                    </div>
                    <div class="mid">
                        <p>
                            “${chef.quote}”
                        </p>
                    </div>
                </div>
                <div class="bot">
                    <div class="chef-collection-${chef.chefId} chef-collection">
                        
                    </div>
                    <button class="see-more">Xem thêm</button>                
                </div>
            </a>
        </div>
    </div>                        
    `;
}

// Render chef-space
function renderChefAll() {
    const parent = document.querySelector('.chef-space-block .chef-space__body .chef-space__core');
    const childs = chefsList.map((chef) => render1ChefBox(chef));
    parent.innerHTML = childs.reduce((string, item) => string + item, '');

    chefsList.forEach((chef) => {
        renderChefCollectionInnerBox(chef.chefId);
    });
}

renderChefAll();

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

function makeChangeViewRicepeBtn() {
    const changeViewRicepeBtn = document.getElementById('change-view-recipe');
    changeViewRicepeBtn.addEventListener('click', () => {
        const parent = document.getElementById('suggest-dishes__body');
        parent.classList.toggle('suggest-dishes__body--change');
    });
}
makeChangeViewRicepeBtn();

function makeShowAndHideSuggestBox() {
    const inputKey = document.getElementById('search-input');
    const suggestBox = document.getElementById('suggest-box');

    inputKey.addEventListener('focus', () => {
        suggestBox.style.display = 'block';
    });
    inputKey.addEventListener('blur', () => {
        suggestBox.style.display = 'none';
    });
}
makeShowAndHideSuggestBox();

function makeSearch() {
    const searchBtn = document.getElementById('search-button');
    const inputKey = document.getElementById('search-input');
    const key = inputKey.value.toLowerCase();
    const url = '/cong-thuc/index.html?key=' + encodeURIComponent(key);

    searchBtn.addEventListener('click', () => {
        window.location.href = url;
    });

    inputKey.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            window.location.href = url;
        }
    })
}
makeSearch();
