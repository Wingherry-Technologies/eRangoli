const username = document.getElementById("adminRegistrationUsername");
const email = document.getElementById("adminRegistrationEmail");
const password = document.getElementById("adminRegistrationPassword");
const confirmPassword = document.getElementById("adminRegistrationConfirmPassword");
const createBtn = document.querySelector(".adminRegistration-create-btn");

const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

const formBox = document.getElementById("adminRegistrationBox");
const successBox = document.getElementById("adminRegistrationSuccessBox");

/*  USERNAME  */

// block numbers, special chars, leading space
username.addEventListener("keydown", (e) => {
  if (/[^a-zA-Z]/.test(e.key) && e.key !== "Backspace") {
    e.preventDefault();
  }
  if (e.key === " " && username.value.length === 0) {
    e.preventDefault();
  }
});

username.addEventListener("blur", validateUsername);

function validateUsername() {
  if (username.value.trim() === "") {
    showError(usernameError, "Username is required");
    return false;
  }
  hideError(usernameError);
  return true;
}

/*  EMAIL  */

email.addEventListener("blur", validateEmail);

function validateEmail() {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.value.trim() === "") {
    showError(emailError, "Email is required");
    return false;
  }

  if (!pattern.test(email.value)) {
    showError(emailError, "Invalid email format");
    return false;
  }

  hideError(emailError);
  return true;
}

/*  PASSWORD  */

password.addEventListener("keydown", (e) => {
  if (e.key === " " && password.value.length === 0) {
    e.preventDefault();
  }
});

password.addEventListener("blur", validatePassword);

function validatePassword() {
  const val = password.value;

  if (val.length < 6) {
    showError(passwordError, "Minimum 6 characters required");
    return false;
  }

  if (!/[A-Za-z]/.test(val) || !/[0-9]/.test(val) || !/[^A-Za-z0-9]/.test(val)) {
    showError(passwordError, "Must include letter, number & special character");
    return false;
  }

  hideError(passwordError);
  return true;
}

/*  CONFIRM PASSWORD  */

confirmPassword.addEventListener("blur", validateConfirmPassword);

function validateConfirmPassword() {
  if (confirmPassword.value === "") {
    showError(confirmPasswordError, "Please re-enter password");
    return false;
  }

  if (confirmPassword.value !== password.value) {
    showError(confirmPasswordError, "Passwords do not match");
    return false;
  }

  hideError(confirmPasswordError);
  return true;
}

/*  SUBMIT  */

createBtn.addEventListener("click", () => {
  const u = validateUsername();
  const e = validateEmail();
  const p = validatePassword();
  const c = validateConfirmPassword();

  if (u && e && p && c) {
    formBox.classList.add("adminRegistration-hidden");
    successBox.classList.remove("adminRegistration-hidden");
  }
});



function showError(el, msg) {
  el.innerText = msg;
  el.style.display = "block";
}

function hideError(el) {
  el.innerText = "";
  el.style.display = "none";
}
