import { recipeCollectionSpread, getTagList, getAllKeyToSearch } from '../object-recipes.js';
import { saveCartToLocalStorage, loadCartFromLocalStorage } from '../main.js';

const top5TrendingRecipesId = ['110135-0002', '110133-0003', '110133-0002', '110134-0002', '110134-0003'];

const top5TrendingRecipes = top5TrendingRecipesId.map((value) => {
    return recipeCollectionSpread().find((item) => item.id === value);
});

function renderUserSpace() {
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
renderUserSpace();

function render1RecipeBox(recipe) {
    return `
    <div id="recipe-${recipe.id}" class="recipe-box">
        <div class="recipe-core">
            <div class="recipe-box__thumbnail">
                <img src="${recipe.thumbnail}" alt="" />
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
                <div class="buy-space">
                    <p class="recipe__price">${recipe.price}<span> xu</span></p>
                    <button class="add-cart addCollectionBtn-${recipe.id}">Thêm</button>
                </div>
            </div>
        </div>
    </div>
    `;
}

function renderTop5TrendingRecipes() {
    const parent = document.getElementById('trending');
    const childs = top5TrendingRecipes.map((item) => (item = render1RecipeBox(item)));
    parent.innerHTML = childs.reduce((content, item) => content + item, '');
}

renderTop5TrendingRecipes();

const slides = document.querySelectorAll('#trending .recipe-box');
// console.log(slides);
// slides[0].classList.add('active');

let nowIndex = 0;
function showSlides() {
    slides.forEach((slide) => slide.classList.remove('active'));
    slides[nowIndex].classList.add('active');

    nowIndex++;
    nowIndex = (nowIndex + slides.length) % slides.length;
    // const dots = document.querySelectorAll('#news-dish .index-dot i');
    // dots.forEach((dot) => dot.style.opacity = 0.5);
    // dots[willShowIndex].style.opacity = 1;
}

showSlides();
setInterval(showSlides, 9000);

function renderRecipeAll(recipeList) {
    const parent = document.getElementById('all-list');
    const childs = recipeList.map((item) => (item = render1RecipeBox(item)));

    parent.innerHTML = childs.reduce((content, item) => content + item, '');

    renderRecipeTagsAll();
    seeAllListButton();
    filterRecipeByTag();
    addRecipeToMyCollection();
}

renderRecipeAll(recipeCollectionSpread());

// Render 1 tag để hiển thị
function renderRecipeTags(recipe) {
    return recipe.tag.reduce((string, item) => string + `<a>#${item}</a>`, '');
}

// Render tất cả tag ở mỗi công thức
function renderRecipeTagsAll() {
    recipeCollectionSpread().forEach((recipe) => {
        const parents = document.querySelectorAll(`#recipe-${recipe.id} .recipe-tags`);
        parents.forEach((parent) => (parent.innerHTML = renderRecipeTags(recipe)));
    });
}

// Lọc sản phẩm theo tag
function filterRecipeByTag() {
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

// Nút Xem tất cả công thức
function seeAllListButton() {
    document.getElementById('see-all-list').addEventListener('click', () => {
        renderRecipeAll(recipeCollectionSpread());
    });
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
function search() {
    const key = document.getElementById('search-input').value.toLowerCase();

    const searchResult = recipeCollectionSpread().filter((parent) => {
        const getValueArray = Object.values(parent)
            .flat()
            .map((child) => child.toString().toLowerCase());

        return getValueArray.find((item) => item.includes(key) || key.includes(item));
    });

    renderRecipeAll(searchResult);
    document.getElementById('all-list').scrollIntoView({ behavior: 'smooth' });
}

// Gán nút
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

// Nút search
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', search);
const searchInputBar = document.getElementById('search-input');
searchInputBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        search();
    }
});

// Hàm lấy mảng các từ khóa gợi ý
function suggestForKey(typing) {
    return getAllKeyToSearch().filter((key) => key.includes(typing) || typing.includes(key));
}

// Gợi ý từ khóa khi nhập ô input
const inputKey = document.getElementById('search-input');
const suggestBox = document.getElementById('suggest-box');

inputKey.addEventListener('input', (event) => {
    const key = event.target.value.toLowerCase();
    suggestBox.innerHTML = suggestForKey(key).reduce((string, key) => string + `<li><a>${key}</a></li>`, '');
    // Gán nút cho các thẻ a
    const aElements = suggestBox.querySelectorAll('a');
    aElements.forEach((aTag) => {
        aTag.addEventListener('click', () => {
            inputKey.value = aTag.innerText;
        });
    });
});

inputKey.addEventListener('focus', () => {
    suggestBox.classList.add('show');
});
inputKey.addEventListener('blur', () => {
    suggestBox.classList.remove('show');
});

// Lưu Bộ sưu tập vào localStorage
function saveMyCollectionToLocalStorage(object) {
    localStorage.setItem('myCollection', JSON.stringify(object));
}

// Tải Bộ sưu tập từ localStorage
function loadMyCollectionFromLocalStorage() {
    const myCollectionString = localStorage.getItem('myCollection');
    if (myCollectionString) {
        return JSON.parse(myCollectionString);
    } else {
        return [];
    }
}

// Thêm công thức vào Bộ sưu tập khi click chuột

function addRecipeToMyCollection() {
    recipeCollectionSpread().forEach((recipe) => {
        const getButtonElements = document.querySelectorAll(`.addCollectionBtn-${recipe.id}`);

        getButtonElements.forEach((buttonElement) =>
            buttonElement.addEventListener('click', () => {
                const myCollection = loadMyCollectionFromLocalStorage();

                const myCollectionItem = myCollection.find((item) => item.id === recipe.id);

                if (!myCollectionItem) {
                    myCollection.push(recipe);
                    saveMyCollectionToLocalStorage(myCollection);
                    atTheCorner();
                }
            })
        );
    });
}

function atTheCorner() {
    const myCollectionElement = document.querySelector('#my-collection span');
    myCollectionElement.innerHTML = loadMyCollectionFromLocalStorage().length;

    const myCart = document.querySelector('#my-cart span');
    myCart.innerHTML = loadCartFromLocalStorage().length;
}

atTheCorner();

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

// Đăng ký - Đăng nhập
const signUpForm = document.getElementById('form-signup');
const logInForm = document.getElementById('form-login');
const formParent = logInForm.parentNode;

function showSignUpForm() {
    formParent.style.display = 'block';

    signUpForm.classList.add('show-form');
    logInForm.classList.remove('show-form');

    document.querySelector('body').style.overflow = 'hidden';
}

function showLogInForm() {
    formParent.style.display = 'block';

    logInForm.classList.add('show-form');
    signUpForm.classList.remove('show-form');

    document.querySelector('body').style.overflow = 'hidden';
}

function closeForm() {
    formParent.style.display = 'none';

    logInForm.classList.remove('show-form');

    signUpForm.classList.remove('show-form');

    formParent.querySelectorAll('input').forEach((inputElement) => (inputElement.value = ''));

    const signSuccessMess = document.querySelector('#form-signup .form-body .left .signup-success');
    signSuccessMess.classList.remove('show-signup-success');

    document.querySelector('body').style.overflow = 'auto';
}

function makeSignUpLogInBtn() {
    const signUpBtn = Array.from(document.getElementsByClassName('form-signup'));
    signUpBtn.forEach((btn) => btn.addEventListener('click', showSignUpForm));

    const logInBtn = Array.from(document.getElementsByClassName('form-login'));
    logInBtn.forEach((btn) => btn.addEventListener('click', showLogInForm));

    const closeFormBtn = Array.from(document.getElementsByClassName('close-form'));
    closeFormBtn.forEach((closeBtn) => closeBtn.addEventListener('click', closeForm));
}

// Đăng ký tài khoản
// Tạo tài khoản mới và thêm vào localStorage
function containsSpecialCharacter(str) {
    var regex = /[!@#$%^&*(),.?":{}|<>]/;
    return regex.test(str);
}

function checkFullInput(parentId) {
    const parentElement = document.getElementById(`${parentId}`);
    const inputElements = Array.from(parentElement.querySelectorAll('.form-body input'));
    for (let i = 0; i < inputElements.length; i++) {
        if (inputElements[i].value === '') {
            return false;
        }
    }
    return true;
}

function checkAccountInput(id, pw, pw2) {
    let errorMessage = '';

    if (id.length < 6 || id.length > 30) {
        errorMessage += 'Tên đăng nhập từ 6 đến 30 ký tự\n';
    }
    if (!isNaN(Number(id[0]))) {
        errorMessage += 'Tên đăng nhập không được bắt đầu bằng số\n';
    }
    const findInDatabase = loadUsersDatabase().find((user) => user.id === id);
    if (findInDatabase) {
        errorMessage += 'Tên đăng nhập đã tồn tại!\n';
    }
    if (pw.length < 8) {
        errorMessage += 'Mật khẩu tối thiểu 8 ký tự\n';
    }
    if (containsSpecialCharacter(id) || containsSpecialCharacter(pw)) {
        errorMessage += 'Tên đăng nhập và Mật khẩu không được chứa ký tự đặc biệt\n';
    }
    if (pw !== pw2) {
        errorMessage += 'Mật khẩu xác nhận không khớp\n';
    }
    return errorMessage;
}

function createAccount() {
    const id = document.getElementById('signup-id').value;
    const password = document.getElementById('signup-password').value;
    const password2 = document.getElementById('signup-password2').value;
    const email = document.getElementById('signup-email').value;

    if (!checkAccountInput(id, password, password2)) {
        const newAccount = {
            id: id,
            password: password,
            email: email,
            cart: [],
            collection: []
        };

        let usersDatabase = loadUsersDatabase();
        usersDatabase.push(newAccount);

        saveUsersDatabase(usersDatabase);

        const signSuccessMess = document.querySelector('#form-signup .form-body .left .signup-success');
        signSuccessMess.classList.add('show-signup-success');

        // alert('Đăng ký tài khoản thành công!');
        // closeForm();
    } else {
        alert(checkAccountInput(id, password, password2));
    }
}
function saveUsersDatabase(object) {
    localStorage.setItem('usersDatabase', JSON.stringify(object));
}

// Truy xuất tài khoản từ localStorage
function loadUsersDatabase() {
    const usersDatabaseString = localStorage.getItem('usersDatabase');
    if (usersDatabaseString) {
        return JSON.parse(usersDatabaseString);
    } else {
        return [];
    }
}
function whenSubmitSignUp() {
    if (!checkFullInput('form-signup')) {
        alert('Vui lòng nhập đầy đủ thông tin!');
    } else {
        createAccount();
    }
}

const submitSignUpBtn = document.getElementById('submit-signup');
submitSignUpBtn.addEventListener('click', () => whenSubmitSignUp());

const submitSignUpInputBar = document.querySelectorAll('#form-signup .form-body .left input');
submitSignUpInputBar.forEach((input) =>
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            whenSubmitSignUp();
        }
    })
);

// Đăng nhập
function updateLoginStatus(trueOrFalse) {
    localStorage.setItem('isLogged', JSON.stringify(trueOrFalse));
}

function isLogged() {
    const string = localStorage.getItem('isLogged');
    if (string) {
        return JSON.parse(string);
    } else {
        return false;
    }
}

function logInWithUser(userLogged) {
    let cart = userLogged.cart;
    saveCartToLocalStorage(cart);
    let collection = userLogged.collection;
    saveMyCollectionToLocalStorage(collection);
    // renderUserSpace(userLogged);
}

// Lưu user đang đăng nhập vào localStorage
export function saveUserLoggedToLocalStorage(object) {
    localStorage.setItem('userLogged', JSON.stringify(object));
}

// Tải user đang đăng nhập từ localStorage
export function loadUserLoggedFromLocalStorage() {
    const string = localStorage.getItem('userLogged');
    if (string) {
        return JSON.parse(string);
    } else {
        return {};
    }
}
function logIn() {
    const id = document.getElementById('login-id').value;
    const password = document.getElementById('login-password').value;
    let userLogged = loadUsersDatabase().find((user) => user.id === id && user.password === password);
    if (userLogged) {
        logInWithUser(userLogged);
        updateLoginStatus(true);
        saveUserLoggedToLocalStorage(userLogged);
        closeForm();
        renderUserSpace();
        atTheCorner();
    } else {
        alert('Tài khoản không chính xác!');
    }
}

const submitLogIn = document.getElementById('submit-login');
submitLogIn.addEventListener('click', () => logIn());

const submitLogInInputBar = document.querySelectorAll('#form-login .form-body .left input');
submitLogInInputBar.forEach((input) =>
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            logIn();
        }
    })
);

// Đăng xuất

function makeLogOutBtn() {
    const logOutBtn = document.getElementById('log-out');
    logOutBtn.addEventListener('click', () => {
        const updateUserLogged = {
            ...loadUserLoggedFromLocalStorage(),
            cart: loadCartFromLocalStorage(),
            collection: loadMyCollectionFromLocalStorage()
        };

        const usersDatabase = loadUsersDatabase();
        const i = usersDatabase.findIndex((user) => user.id === updateUserLogged.id);
        usersDatabase.splice(i, 1, updateUserLogged);

        saveUsersDatabase(usersDatabase);

        console.log(loadUsersDatabase());

        updateLoginStatus(false);
        saveUserLoggedToLocalStorage({});
        renderUserSpace();

        saveCartToLocalStorage([]);
        saveMyCollectionToLocalStorage([]);
        atTheCorner();
    });
}
