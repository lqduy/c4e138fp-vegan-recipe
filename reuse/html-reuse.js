import { renderUserSpace, makeSignUpLogInBtn, makeSubmitSignUpLogInBtn } from './script-reuse.js';

document.addEventListener('DOMContentLoaded', function () {
    fetch('/reuse/form-signup-login.html')
        .then((response) => response.text())
        .then((data) => {
            document.querySelector('.form-signup-login').innerHTML = data;
            makeSignUpLogInBtn();
            makeSubmitSignUpLogInBtn();
        });
    fetch('/reuse/header.html')
        .then((response) => response.text())
        .then((data) => {
            document.querySelector('header').innerHTML = data;
            renderUserSpace();
        });
    fetch('/reuse/footer.html')
        .then((response) => response.text())
        .then((data) => {
            document.querySelector('footer').innerHTML = data;
        });
});


