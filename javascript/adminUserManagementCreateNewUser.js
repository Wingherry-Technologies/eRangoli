// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon = document.querySelector("#hamburger-menu>img");
var mobileBack = document.querySelector(".mobile-back-button");

hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display = "none";
    document.querySelector("body").style.overflow = "hidden";
    window.scrollTo(0, 0);
    mobileBack.style.display = "none";
  } else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow = "auto";
    document.querySelector(".bottom-nav").style.display = "flex";
    mobileBack.style.display = "flex";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const usernameInput = document.getElementById("username");
  const mobileInput = document.getElementById("mobile");
  const passwordInput = document.getElementById("password");
  const pageTitle = document.getElementById("pageTitle");

  usernameInput.addEventListener("keydown", function (e) {
    const key = e.key;
    if (/^[0-9]$/.test(key)) e.preventDefault();
    if (/[^a-zA-Z ]/.test(key)) e.preventDefault();
    if (key === " " && this.value.length === 0) e.preventDefault();
  });

  usernameInput.addEventListener("input", function () {
    this.value = this.value
      .replace(/[^a-zA-Z ]/g, "")
      .replace(/\s{2,}/g, " ")
      .replace(/^\s+/, "")
      .replace(/\s+$/, "");
  });

  mobileInput.addEventListener("keydown", function (e) {
    const key = e.key;
    if (!/^[0-9]$/.test(key) && key !== "Backspace") e.preventDefault();
    if (this.value.length === 0 && !/[6-9]/.test(key)) e.preventDefault();
    if (this.value.length >= 10 && key !== "Backspace") e.preventDefault();
  });

  passwordInput.addEventListener("input", function () {
    this.value = this.value.replace(/\s/g, "");
  });

  document.getElementById("userForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = mobileInput.value.trim();
    const password = passwordInput.value;
    const role = document.getElementById("role").value;

    let isValid = true;
    document.querySelectorAll(".error").forEach((e) => (e.innerText = ""));

    if (username === "") {
      showError("username", "Username is required");
      isValid = false;
    }

    if (email === "") {
      showError("email", "Email is required");
      isValid = false;
    } else if (!email.includes("@")) {
      showError("email", "Enter valid email");
      isValid = false;
    }

    if (!/^[6-9][0-9]{9}$/.test(mobile)) {
      showError("mobile", "Enter valid 10 digit mobile number");
      isValid = false;
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password,
      )
    ) {
      showError(
        "password",
        "Min 8 chars, 1 uppercase, 1 lowercase, 1 number & 1 special char",
      );
      isValid = false;
    }

    if (role === "") {
      showError("role", "Role is required");
      isValid = false;
    }

    if (isValid) {
      document.getElementById("createCard").style.display = "none";
      document.getElementById("verifyCard").style.display = "block";
      pageTitle.innerText = "Verify Credentials";

      document.getElementById("vUsername").innerText = username;
      document.getElementById("vEmail").innerText = email;
      document.getElementById("vPassword").innerText = password;
    }
  });

  document
    .getElementById("createNewUserBtn")
    ?.addEventListener("click", function () {
      const createCard = document.getElementById("createCard");
      const verifyCard = document.getElementById("verifyCard");

      if (verifyCard.style.display !== "none") {
        verifyCard.style.display = "none";
        createCard.style.display = "block";
        pageTitle.innerText = "Generate Credentials";
        document.getElementById("userForm").reset();
        document.querySelectorAll(".error").forEach((e) => (e.innerText = ""));
        return;
      }

      window.location.href = "../html/adminUMUserList.html";
    });

  document.getElementById("sendBtn")?.addEventListener("click", function () {
    document.getElementById("successModal").style.display = "flex";
    setTimeout(() => {
      document.getElementById("successModal").style.display = "none";
      window.location.href = "../html/adminUMUserList.html";
    }, 2500);
  });
});

function showError(id, msg) {
  document.getElementById(id).parentElement.querySelector(".error").innerText =
    msg;
}

document
  .querySelector(".sidebar-main-vendor > article > ul > li:nth-of-type(5)")
  .classList.add("sidebar-active");

document
  .querySelector("#account-menu .mobile-dropdown:nth-child(5) .dropdown-header")
  .classList.add("dropdown-header-active");
