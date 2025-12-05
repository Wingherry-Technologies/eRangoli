document.addEventListener("DOMContentLoaded", function () {
  const forgotLink = document.querySelector(".vendorLoginForgot");
  const loginPage = document.querySelector(".vendorLoginPage");
  const resetPage = document.getElementById("vendorResetPage");
  const backToLogin = document.getElementById("vendorResetBack");

  const successBox = document.getElementById("vendorLoginSuccessMsg");
  const closeBtn = document.getElementById("vendorLoginCloseSuccess");

  const resetForm = document.getElementById("vendorResetForm");
  const resetSuccess = document.getElementById("vendorLoginResetSuccess");
  const resetClose = document.getElementById("vendorLoginCloseReset");

  const resetUser = document.getElementById("vendorResetUser");

  const urlParams = new URLSearchParams(window.location.search);
  const cameFromRegistration = urlParams.get("registered");

  if (successBox) {
    successBox.style.display = cameFromRegistration === "1" ? "block" : "none";
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      successBox.style.display = "none";
    });
  }

  if (forgotLink) {
    forgotLink.addEventListener("click", function (e) {
      e.preventDefault();
      loginPage.style.display = "none";
      resetPage.style.display = "flex";
    });
  }

  if (backToLogin) {
    backToLogin.addEventListener("click", function (e) {
      e.preventDefault();
      resetPage.style.display = "none";
      loginPage.style.display = "flex";
    });
  }

  if (resetForm) {
    resetForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!resetUser.value.trim()) return;

      resetPage.style.display = "none";
      loginPage.style.display = "flex";

      if (successBox) successBox.style.display = "none";
      resetSuccess.style.display = "block";
    });
  }

  if (resetClose) {
    resetClose.addEventListener("click", () => {
      resetSuccess.style.display = "none";
    });
  }
});

// Allowed Characters

function validateAllowedChars(el) {
  el.addEventListener("keypress", function (e) {
    if (!/^[A-Za-z0-9@._-]+$/.test(e.key)) e.preventDefault();
  });
}

validateAllowedChars(document.getElementById("vendorLoginMobile"));
validateAllowedChars(document.getElementById("vendorResetUser"));

// Vendor Registered Check

const registeredVendors = [
  "9536789905",
  "david",
  "testuser",
  "vendor123",
  "john001",
];
const loginMobileInput = document.getElementById("vendorLoginMobile");
const loginMobileError = document.getElementById("vendorLoginMobileError");

loginMobileInput.addEventListener("blur", function () {
  const v = loginMobileInput.value.trim();
  if (!v) return (loginMobileError.style.display = "none");

  loginMobileError.style.display = registeredVendors.includes(v)
    ? "none"
    : "block";

  if (!registeredVendors.includes(v)) {
    loginMobileError.textContent = "Vendor not registered!";
  }
});

// Login Validation

const validUsers = [
  { user: "9536789905", pass: "password123" },
  { user: "david", pass: "david@123" },
  { user: "vendor123", pass: "vendor@123" },
];

const loginForm = document.getElementById("vendorLoginForm");
const inputUser = document.getElementById("vendorLoginMobile");
const inputPass = document.getElementById("vendorLoginPassword");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const u = inputUser.value.trim();
  const p = inputPass.value.trim();

  if (!u || !p) return showLoginError("Please enter Username and Password!");

  const found = validUsers.find((v) => v.user === u && v.pass === p);

  if (!found) return showLoginError("Incorrect Username or Password!");

  showLoginSuccess();
});

// Popup Errors

function showLoginError(msg) {
  const popup = document.getElementById("vendorLoginResetSuccess");

  popup.innerHTML = `${msg} <span class="vendorLoginCloseSuccess" id="popupClose">✕</span>`;
  popup.style.display = "block";

  document.getElementById("popupClose").addEventListener("click", () => {
    popup.style.display = "none";
  });
}

// Login Success Popup

function showLoginSuccess() {
  const box = document.getElementById("vendorLoginSuccessMsg");

  box.classList.remove("vendorLoginErrorPopup");

  box.style.display = "block";

  const closeBtn = document.getElementById("vendorLoginCloseSuccess");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      box.style.display = "none";
    });
  }
}
