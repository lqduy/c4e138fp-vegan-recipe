import {
  saveCartToLocalStorage,
  loadCartFromLocalStorage,
  saveMyCollectionToLocalStorage,
  loadMyCollectionFromLocalStorage,
  updateLoginStatus,
  saveUserLoggedToLocalStorage,
  loadUserLoggedFromLocalStorage
} from './localstorage.js';

// Đăng ký - Đăng nhập

function showSignUpForm() {
  const signUpForm = document.getElementById('form-signup');
  const logInForm = document.getElementById('form-login');
  const formParent = document.querySelector('.form-signup-login');

  formParent.style.display = 'block';

  signUpForm.classList.add('show-form');
  logInForm.classList.remove('show-form');

  document.querySelector('body').style.overflow = 'hidden';
}

function showLogInForm() {
  const signUpForm = document.getElementById('form-signup');
  const logInForm = document.getElementById('form-login');
  const formParent = document.querySelector('.form-signup-login');

  formParent.style.display = 'block';

  logInForm.classList.add('show-form');
  signUpForm.classList.remove('show-form');

  document.querySelector('body').style.overflow = 'hidden';
}

function closeForm() {
  const signUpForm = document.getElementById('form-signup');
  const logInForm = document.getElementById('form-login');
  const formParent = document.querySelector('.form-signup-login');

  formParent.style.display = 'none';

  logInForm.classList.remove('show-form');

  signUpForm.classList.remove('show-form');

  formParent.querySelectorAll('input').forEach(inputElement => (inputElement.value = ''));

  const signSuccessMess = document.querySelector('#form-signup .form-body .left .signup-success');
  signSuccessMess.classList.remove('show-signup-success');

  document.querySelector('body').style.overflow = 'auto';
}

export function makeSignUpLogInBtn() {
  const signUpBtn = Array.from(document.getElementsByClassName('form-signup'));
  signUpBtn.forEach(btn =>
    btn.addEventListener('click', event => {
      event.preventDefault();
      showSignUpForm();
    })
  );

  const logInBtn = Array.from(document.getElementsByClassName('form-login'));
  logInBtn.forEach(btn =>
    btn.addEventListener('click', event => {
      event.preventDefault();
      showLogInForm();
    })
  );

  const closeFormBtn = Array.from(document.getElementsByClassName('close-form'));
  closeFormBtn.forEach(closeBtn =>
    closeBtn.addEventListener('click', event => {
      event.preventDefault();
      closeForm();
    })
  );
}

// Đăng ký tài khoản
// Tạo tài khoản mới và thêm vào localStorage
function containsSpecialCharacter(str) {
  let regex = /[!@#$%^&*(),.?":{}|<>]/;
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
  const findInDatabase = loadUsersDatabase().find(user => user.id === id);
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
  return usersDatabaseString ? JSON.parse(usersDatabaseString) : [];
}
function whenSubmitSignUp() {
  !checkFullInput('form-signup') ? alert('Vui lòng nhập đầy đủ thông tin!') : createAccount();
}

export function makeSubmitSignUpLogInBtn() {
  const submitSignUpBtn = document.getElementById('submit-signup');
  submitSignUpBtn.addEventListener('click', event => {
    event.preventDefault();
    whenSubmitSignUp();
  });

  const submitSignUpInputBar = document.querySelectorAll('#form-signup .form-body .left input');
  submitSignUpInputBar.forEach(input =>
    input.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        whenSubmitSignUp();
      }
    })
  );

  const submitLogIn = document.getElementById('submit-login');
  submitLogIn.addEventListener('click', event => {
    event.preventDefault();
    logIn();
  });

  const submitLogInInputBar = document.querySelectorAll('#form-login .form-body .left input');
  submitLogInInputBar.forEach(input =>
    input.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        logIn();
      }
    })
  );
}

// Đăng nhập

function logInWithUser(userLogged) {
  let cart = userLogged.cart;
  saveCartToLocalStorage(cart);
  let collection = userLogged.collection;
  saveMyCollectionToLocalStorage(collection);
}

function logIn() {
  const id = document.getElementById('login-id').value;
  const password = document.getElementById('login-password').value;
  let userLogged = loadUsersDatabase().find(user => user.id === id && user.password === password);
  if (userLogged) {
    logInWithUser(userLogged);
    updateLoginStatus(true);
    saveUserLoggedToLocalStorage(userLogged);
    closeForm();

    location.reload();
  } else {
    alert('Tài khoản không chính xác!');
  }
}

// Đăng xuất

export function makeLogOutBtn() {
  const logOutBtn = document.getElementById('log-out');
  logOutBtn.addEventListener('click', () => {
    const updateUserLogged = {
      ...loadUserLoggedFromLocalStorage(),
      cart: loadCartFromLocalStorage(),
      collection: loadMyCollectionFromLocalStorage()
    };

    const usersDatabase = loadUsersDatabase();
    const i = usersDatabase.findIndex(user => user.id === updateUserLogged.id);
    usersDatabase.splice(i, 1, updateUserLogged);

    saveUsersDatabase(usersDatabase);

    updateLoginStatus(false);
    saveUserLoggedToLocalStorage({});

    saveCartToLocalStorage([]);
    saveMyCollectionToLocalStorage([]);

    location.reload();
  });
}
