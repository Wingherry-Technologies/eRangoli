<<<<<<< HEAD
document.querySelectorAll(".DPMPC-APRAfaq-question").forEach((btn) => {
=======
// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon=document.querySelector("#hamburger-menu>img");


hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display="none"
    document.querySelector("body").style.overflow="hidden"
    window.scrollTo(0, 0);
  }
  else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow="auto";
    document.querySelector(".bottom-nav").style.display="flex";
  }
});

document.querySelectorAll(".APRAfaq-question").forEach((btn) => {
>>>>>>> aa4f6ddb5d86b302dc7810f15af91d199f36de8a
  btn.addEventListener("click", () => {
    btn.closest(".DPMPC-APRAfaq-item").classList.toggle("active");
  });
});

document
  .querySelector(".DPMPC-create-btn")
  ?.addEventListener("click", function () {
    window.location.href = "../html/developerPMCreateNewCategories.html";
  });

document
  .querySelector(".DPMPC-floating-plus-btn")
  ?.addEventListener("click", function () {
    window.location.href = "../html/developerPMCreateNewCategories.html";
  });

document.querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(2)").classList.add("sidebar-active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(1)").classList.add("active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(1)>li:nth-child(2)").classList.add("submenu-active-highlight");


document.querySelector("#account-menu .mobile-dropdown:nth-child(2) .dropdown-header").classList.add("dropdown-header-active");
document.querySelector("#account-menu .mobile-dropdown:nth-child(2)").classList.add("active-mobile-submenu");
document.querySelector("#account-menu .mobile-dropdown:nth-child(2) li:nth-child(2)").classList.add("submenu-active-page");

