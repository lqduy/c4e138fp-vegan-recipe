import { recipeCollectionSpread } from './object-recipes.js';

const top5RecipesOfWeek = ['110135-0001', '110134-0001', '110133-0001', '110136-0002', '110135-0003'];

const listSlideShow = top5RecipesOfWeek.map((value) => {
    return recipeCollectionSpread().find((item) => item.id === value);
});


function render1DishNews(dish) {
    return `
    <div class="dish news__item">
        <a href="#">
            <div class="dish-thumbnail">
                <img src="${dish.thumbnail}" alt="">
            </div>
            <div class="content">
                <h3 class="title">${dish.name}</h3>
                <p class="description">
                ${dish.intro}
                </p>
            </div>
        </a>
        <a class="news-tag type-tag" href="#">#${dish.tag[0]}</a>
        <a class="news-tag action-tag" href="#">Thêm vào Bộ sưu tập</a>
    </div>
    `;
}

function renderDishNewsAll() {
    const parent = document.querySelector('#news-dish .slideshow-container');
    const childs = listSlideShow.map((item) => (item = render1DishNews(item)));
    parent.innerHTML = childs.reduce((content, item) => content + item, '');
}

renderDishNewsAll();

const slides = document.querySelectorAll('#news-dish .slideshow-container .dish');
slides[0].classList.add('active');

function showSlides(n) {
    const slidesArray = Array.from(slides);
    const nowSlide = document.querySelector('#news-dish .slideshow-container .active');
    const nowIndex = slidesArray.indexOf(nowSlide);

    let willShowIndex = nowIndex + n;
    willShowIndex = (willShowIndex + slides.length) % slides.length;

    slides.forEach((item)=> item.classList.remove('active'));
    slides[willShowIndex].classList.add('active');

    const dots = document.querySelectorAll('#news-dish .index-dot i');
    dots.forEach((dot) => dot.style.opacity = 0.5);
    dots[willShowIndex].style.opacity = 1;
}


setInterval(() => {
    showSlides(1);
}, 7000);

showSlides(0);

// // Nút slideShow

const backBtn = document.getElementById('back-slide');
backBtn.addEventListener('click', () => {
    showSlides(-1);
});

const nextBtn = document.getElementById('next-slide');
nextBtn.addEventListener('click', () => {
    showSlides(1);
});


