// default login credentials (multiple users)
const users = [
  { username: "Rutuja", password: "ty@jjfj67" },
  { username: "Admin", password: "admin@123" },
  { username: "Amit", password: "amit@456" },
  { username: "Sneha", password: "sneha@789" },
];

// login & reset box toggle
const loginBox = document.getElementById("loginBox");
const resetBox = document.getElementById("resetBox");
const forgotBtn = document.getElementById("forgotBtn");
const backToLogin = document.getElementById("backToLogin");

forgotBtn.addEventListener("click", function (e) {
  e.preventDefault();
  clearLoginFields();
  loginBox.classList.add("hidden");
  resetBox.classList.remove("hidden");
});

backToLogin.addEventListener("click", function () {
  clearResetFields();
  resetBox.classList.add("hidden");
  loginBox.classList.remove("hidden");
});

// username validation
const usernameInput = document.getElementById("username");
const usernameError = document.getElementById("usernameError");

usernameInput.addEventListener("input", function () {
  this.value = this.value.replace(/[^a-zA-Z]/g, "");
  if (this.value.trim() !== "") usernameError.style.display = "none";
});

// password validation
const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("passwordError");

passwordInput.addEventListener("input", function () {
  if (this.value.trim() !== "") passwordError.style.display = "none";
});

// email validation
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");

emailInput.addEventListener("input", function () {
  this.value = this.value.replace(/\s/g, "");
  validateEmail();
});

function validateEmail() {
  const email = emailInput.value;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.(com|in)$/;
  if (email === "") {
    emailError.style.display = "none";
    return;
  } // empty hide
  if (!emailRegex.test(email)) {
    emailError.textContent =
      "Enter a valid email (gmail.com / gmail.in / yahoo.com / yahoo.in)";
    emailError.style.display = "block";
  } else {
    emailError.style.display = "none";
  }
}

// signup click validation
const signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", function (e) {
  e.preventDefault();

  let hasError = false;

  if (usernameInput.value.trim() === "") {
    usernameError.textContent = "Enter your name";
    usernameError.style.display = "block";
    hasError = true;
  }

  if (passwordInput.value.trim() === "") {
    passwordError.textContent = "Enter your password";
    passwordError.style.display = "block";
    hasError = true;
  }

  if (hasError) return;

  // check if user exists
  const userFound = users.find(
    (user) =>
      user.username === usernameInput.value &&
      user.password === passwordInput.value,
  );

  if (userFound) {
    // ✅ success
    window.location.href = "../html/admindashboard.html";
  } else {
    // ❌ invalid login
    passwordError.textContent = "Username or password not found";
    passwordError.style.display = "block";
  }
});

// reset password click validation
const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", function () {
  if (emailInput.value.trim() === "") {
    emailError.textContent = "Enter your email address";
    emailError.style.display = "block";
  }
});

// clear login fields
function clearLoginFields() {
  usernameInput.value = "";
  passwordInput.value = "";
  usernameError.style.display = "none";
  passwordError.style.display = "none";
}

// clear reset fields
function clearResetFields() {
  emailInput.value = "";
  emailError.style.display = "none";
}
