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

const trackBtn = document.getElementById("trackOrderBtn");
const trackingModal = document.getElementById("trackingModal");
const closeTracking = document.querySelector(".close-tracking");

trackBtn.addEventListener("click", () => {
  trackingModal.style.display = "flex";
});

closeTracking.addEventListener("click", () => {
  trackingModal.style.display = "none";
});

trackingModal.addEventListener("click", (e) => {
  if (e.target === trackingModal) {
    trackingModal.style.display = "none";
  }
});


document.querySelector(".sidebar-main-vendor > article > ul > li:nth-of-type(4)").classList.add("sidebar-active");


document.querySelector("#account-menu .mobile-dropdown:nth-child(4) .dropdown-header").classList.add("dropdown-header-active");
