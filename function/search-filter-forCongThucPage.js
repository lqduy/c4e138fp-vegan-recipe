import { recipeCollectionSpread, getTagList } from '../database/database-recipes.js';
import { renderRecipeAll } from '../cong-thuc/index.js';


// Lọc sản phẩm theo tag
export function filterRecipeByTag() {
    const allTags = document.querySelectorAll('.recipe-tags a');
    allTags.forEach((tag) =>
        tag.addEventListener('click', () => {
            const typeOfTag = tag.innerText;
            const filterRecipeList = recipeCollectionSpread().filter((recipe) =>
                recipe.tag.find((tag) => `#${tag}` === typeOfTag)
            );

            renderRecipeAll(filterRecipeList);
        })
    );
}

// Render Tag List vào khu vực Filter (phần chưa được chọn)
function renderTagListInFilterSpace() {
    const parent = document.querySelector('#search-and-filter .filter-core .not-select-tags');
    const childs = getTagList().map((tag) => (tag = `<a>#${tag}</a>`));
    parent.innerHTML = childs.reduce((string, child) => string + child, '');
    addTagToFilter();
}

renderTagListInFilterSpace();

let selectedTags = [];
// Tạo nút cho các tag trong Filter Space
function addTagToFilter() {
    const tags = document.querySelectorAll('#search-and-filter .filter-core .not-select-tags a');
    tags.forEach((tag) => {
        tag.addEventListener('click', () => {
            let isSelected = selectedTags.find((item) => `#${item}` === tag.innerText);
            if (selectedTags.length < 7 && !isSelected) {
                selectedTags.push(getTagList().find((item) => `#${item}` === tag.innerText));
                tag.classList.add('selected');
                renderSelectedTags();
            }
        });
    });
}

// Render tag mới vừa chọn lên khu vực dành cho các tag đã chọn
function renderSelectedTags() {
    const parent = document.querySelector('#search-and-filter .filter-core .select-tags');
    const newTag = document.createElement('a');
    newTag.innerText = `${selectedTags[selectedTags.length - 1]}`;
    parent.appendChild(newTag);

    // Setup tính năng bỏ chọn
    newTag.addEventListener('click', () => {
        parent.removeChild(newTag);
        const contentOfRemovedTag = newTag.innerText;

        const i = selectedTags.findIndex((tag) => `${tag}` === contentOfRemovedTag);
        selectedTags.splice(i, 1); //Xóa tag trong biển mảng

        const tags = document.querySelectorAll('#search-and-filter .filter-core .not-select-tags a');
        const unSelectNode = Array.from(tags).find((tag) => tag.innerText === `#${contentOfRemovedTag}`);
        unSelectNode.classList.remove('selected');
    });
}

// Lọc công thức theo các tag đã chọn
function filterRecipeByTagList() {
    let filterRecipeList = [...recipeCollectionSpread()];
    selectedTags.forEach((selectedTag) => {
        filterRecipeList = filterRecipeList.filter((recipe) => recipe.tag.find((tag) => tag === selectedTag));
    });
    renderRecipeAll(filterRecipeList);
}

// Nhập từ khóa tìm kiếm
export function search(key) {
    // const key = document.getElementById('search-input').value.toLowerCase();

    const searchResult = recipeCollectionSpread().filter((parent) => {
        const getValueArray = Object.values(parent)
            .flat()
            .map((child) => child.toString().toLowerCase());

        return getValueArray.find((item) => item.includes(key) || key.includes(item));
    });

    renderRecipeAll(searchResult);
    document.getElementById('all-list').scrollIntoView({ behavior: 'smooth' });
}


// Nút search
function makeSearchBtn() {
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', () => {
        const key = document.getElementById('search-input').value.toLowerCase();
        search(key)
    });
    const searchInputBar = document.getElementById('search-input');
    searchInputBar.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const key = document.getElementById('search-input').value.toLowerCase();
            search(key);
        }
    });
}

makeSearchBtn();

// Gán nút lọc
function makeFilterBtn() {
    document.getElementById('filter-button').addEventListener('click', () => {
        filterRecipeByTagList();
        document.getElementById('all-list').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('unselect-all').addEventListener('click', () => {
        selectedTags = [];
        renderTagListInFilterSpace();
        let aTags = document.querySelectorAll('#search-and-filter .filter-core .select-tags a');
        aTags.forEach((aTag) => aTag.parentNode.removeChild(aTag));
    });
}
makeFilterBtn();

// Ẩn - hiện box gợi ý từ khóa
function makeShowAndHideSuggestBox() {
    const inputKey = document.getElementById('search-input');
    const suggestBox = document.getElementById('suggest-box');

    inputKey.addEventListener('focus', () => {
        suggestBox.classList.add('show');
    });
    inputKey.addEventListener('blur', () => {
        suggestBox.classList.remove('show');
    });
}
makeShowAndHideSuggestBox();
