const loginForm = document.forms[0];
const registrationForm = document.forms[1];

// Get URL query parameters to handle passed errors
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
if (params.error) {
  alert(getErrorMsg(params.error));
}

function getErrorMsg(errCode) {
  if (errCode == 'duplicateUsers'){
    return "That username is already taken.";
  }
  else if (errCode == 'badlogin'){
    return "Your username or password is incorrect.";
  }
}

function validateRegistration() {
  if (registrationFormInputs.some(isEmpty)) {
    alert("You must fill in every field.");
    return false;
  }
  else if (!isStrongPassword(passwordInput.value)) {
    alert("Your password must contain at least one of each: \
    Capital letter, lowercase letter, number, and special character.");
    return false;
  }
  else if (passwordInput.value !== confirmPasswordInput.value) {
    alert("Your passwords must match.");
    return false;
  }
  else if (!disclaimerCheckbox.checked){
    alert("You must read and accept the disclaimer.");
    return false;
  }
  registrationForm.submit();
  return true;
}

function validateLogin() {
  if (isEmpty(usernameInputLogin) || isEmpty(passwordInputLogin)) {
    alert("You must fill in every field.");
    return false;
  }
  else {
    loginForm.submit();
    return true;
  }
}

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

function togglePasswordVisibility() {
  passwordInput.type = (passwordInput.type == "password") ? "text" : "password";
  passwordInputLogin.type = (passwordInputLogin.type == "password") ? "text" : "password";
}