const loginBox = document.getElementById("loginBox");
const resetBox = document.getElementById("resetBox");
const forgotBtn = document.getElementById("forgotBtn");
const backToLogin = document.getElementById("backToLogin");

forgotBtn.addEventListener("click", function (e) {
  e.preventDefault();
  loginBox.classList.add("hidden");
  resetBox.classList.remove("hidden");
});

backToLogin.addEventListener("click", function () {
  resetBox.classList.add("hidden");
  loginBox.classList.remove("hidden");
});

const usernameInput = document.getElementById("username");

usernameInput.addEventListener("input", function () {
  this.value = this.value.replace(/[^a-zA-Z]/g, "");
});

const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");

// Remove spaces while typing
emailInput.addEventListener("input", function () {
  this.value = this.value.replace(/\s/g, "");
  validateEmail();
});

function validateEmail() {
  const email = emailInput.value;

  // Proper email regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.(com|in)$/;

  if (email === "") {
    emailError.style.display = "none";
    return;
  }

  if (!emailRegex.test(email)) {
    emailError.textContent =
      "Enter a valid email (gmail.com / gmail.in / yahoo.com / yahoo.in)";
    emailError.style.display = "block";
  } else {
    emailError.style.display = "none";
  }
}
