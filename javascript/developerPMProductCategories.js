document.querySelectorAll(".DPMPC-APRAfaq-question").forEach((btn) => {
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

document
  .querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(2)")
  .classList.add("sidebar-active");
document
  .querySelector(".sidebar-main-vendor ul>ul:nth-of-type(1)")
  .classList.add("active");
document
  .querySelector(".sidebar-main-vendor ul>ul:nth-of-type(1)>li:nth-child(2)")
  .classList.add("submenu-active-highlight");

document
  .querySelector("#account-menu .mobile-dropdown:nth-child(2) .dropdown-header")
  .classList.add("dropdown-header-active");
document
  .querySelector("#account-menu .mobile-dropdown:nth-child(2)")
  .classList.add("active-mobile-submenu");
document
  .querySelector("#account-menu .mobile-dropdown:nth-child(2) li:nth-child(2)")
  .classList.add("submenu-active-page");
