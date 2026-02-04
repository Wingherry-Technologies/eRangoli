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
document.addEventListener("DOMContentLoaded", function () {
  const couponBtn = document.querySelector(".create-coupon-btn");
  if (couponBtn) {
    couponBtn.addEventListener("click", function () {
      window.location.href = "../html/adminSalesCreateNewCoupons.html";
    });
  }
});

const floatingPlusBtn = document.querySelector(".floating-plus-btn");

if (floatingPlusBtn) {
  floatingPlusBtn.addEventListener("click", () => {
    window.location.href = "../html/adminSalesCreateNewCoupons.html";
  });
}
document.querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(6)").classList.add("sidebar-active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(3)").classList.add("active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(3)>li:nth-child(8)").classList.add("submenu-active-highlight");


document.querySelector("#account-menu .mobile-dropdown:nth-child(6) .dropdown-header").classList.add("dropdown-header-active");
document.querySelector("#account-menu .mobile-dropdown:nth-child(6)").classList.add("active-mobile-submenu");
document.querySelector("#account-menu .mobile-dropdown:nth-child(6) li:nth-child(8)").classList.add("submenu-active-page");
