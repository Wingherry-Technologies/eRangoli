// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon = document.querySelector("#hamburger-menu>img");

hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display = "none";
    document.querySelector("body").style.overflow = "hidden";
    window.scrollTo(0, 0);
  } else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow = "auto";
    document.querySelector(".bottom-nav").style.display = "flex";
  }
});

const profilePreview = document.getElementById("preview-image-profile");
const addProfilePic = document.getElementById("change-profile-pic");

addProfilePic.addEventListener("change", (event) => {
  const file = event.target.files[0];

  const imgUrl = URL.createObjectURL(file);

  profilePreview.src = imgUrl;
  document.getElementById("changeBtn").style.display = "block";
});

document.getElementById("changeBtn").addEventListener("click", () => {
  document.getElementById("changeBtn").style.display = "none";
  const successToast = document.querySelector(".success-toastify-main");
  successToast.style.right = "0px";
  setTimeout(() => {
    successToast.style.right = "-320px";
  }, 2000);
});

const confirmModalMain = document.getElementById("logout-confirm-model");
document.getElementById("logout").addEventListener("click", (event) => {
  event.preventDefault();
  openModal();
});

document.getElementById("confirmCancel").addEventListener("click", (event) => {
  event.preventDefault();
  closeModal();
});
function openModal() {
  confirmModalMain.classList.add("showModal");

  document.getElementById("confirmLogout").addEventListener("click", () => {
    window.location.href = "../html/developerLogin.html";
  });
}

function closeModal() {
  confirmModalMain.classList.remove("showModal");
}

document
  .querySelector("#account-menu .mobile-dropdown:nth-child(7) .dropdown-header")
  .classList.add("dropdown-header-active");
