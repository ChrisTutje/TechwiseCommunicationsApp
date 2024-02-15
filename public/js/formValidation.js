const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let value = params.error;
console.log(value);
if (value == 'badlogin'){
  alert("Your username or password is incorrect.");
}

const loginForm = document.forms[0];
const registrationForm = document.forms[1];
const loginButton = loginForm[2];
const registerButton = registrationForm[5];

function validateRegistration(event) {
  event.preventDefault();
  if (registrationFormInputs.some(isEmpty)) {
    alert("You must fill in every field.");
  }
  else if (!isStrongPassword(passwordInput.value)) {
    alert("Your password must contain at least one of each: \
    Capital letter, lowercase letter, number, and special character.");
  }
  else if (passwordInput.value !== confirmPasswordInput.value) {
    alert("Your passwords must match.");
  }
  else if (!disclaimerCheckbox.checked){
    alert("You must read and accept the disclaimer.");
  }
  else {
    insertUser(usernameInput.value, passwordInput.value);
  }
}

function validateLogin(event) {
  event.preventDefault();
  if (isEmpty(usernameInputLogin) || isEmpty(passwordInputLogin)) {
    alert("You must fill in every field.");
  }
  else {
    //loginUser(usernameInput.value, passwordInput.value);
  }
}

function validateUser(event) {
  event.preventDefault();
  console.log("is user good?");
}

registerButton.addEventListener("click", validateRegistration);
loginButton.addEventListener("click", validateLogin);

function isEmpty(input) {
  return input.value == "";
}

function isStrongPassword(string) {
  return /\d/.test(string) // number
    && /[!@#$%^&*()<>?,."';:{}]/.test(string) // special character
    && /[A-Z]/.test(string) // capital letter
    && /[a-z]/.test(string); // lowercase letter
}

const usernameInputLogin = loginForm[0];
const passwordInputLogin = loginForm[1];

const usernameInput = registrationForm[0];
const passwordInput = registrationForm[1];
const confirmPasswordInput = registrationForm[2];
const disclaimerCheckbox = registrationForm[3];

const registrationFormInputs = [
  usernameInput,
  passwordInput,
  confirmPasswordInput,
];

function legalCheckboxChecked() {
  return ;
}