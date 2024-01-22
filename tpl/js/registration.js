const registrationForm = document.forms[0];
const loginButton = registrationForm[3];
const registerButton = registrationForm[4];

function validateEligibility(event) {
  event.preventDefault();
  if (registrationFormInputs.some(isEmpty)) {
    alert("You must fill in every field.");
  }
  else if (passwordInput.value !== confirmPasswordInput.value) {
    alert("Your passwords must match.");
  }
}
registerButton.addEventListener("click", validateEligibility);

function isEmpty(input) {
  return input.value == "";
}

const usernameInput = registrationForm[0];
const passwordInput = registrationForm[1];
const confirmPasswordInput = registrationForm[2];
const securityQuestionInput = registrationForm[3];
const securityAnswerInput = registrationForm[4];

const registrationFormInputs = [
  usernameInput,
  passwordInput,
  confirmPasswordInput,
  // securityQuestionInput,
  // securityAnswerInput,
];

function passwordsMatch() {
  return ;
}

function legalCheckboxChecked() {
  return ;
}
