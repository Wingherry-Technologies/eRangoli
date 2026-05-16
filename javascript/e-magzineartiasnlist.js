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

// MOBILE FAQ TOGGLE

const faqItems = document.querySelectorAll(".DHMEP-faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".DHMEP-faq-question");

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    // Close all
    faqItems.forEach((el) => {
      el.classList.remove("active");
    });

    // Open clicked one
    if (!isActive) {
      item.classList.add("active");
    }
  });
});


// MOBILE COUNT

document.addEventListener("DOMContentLoaded", function () {

  const tableRows = document.querySelectorAll(
    ".DHMEP-brand-table tbody tr"
  );

  const countElement = document.querySelector(".DHMEP-count");

  if (countElement) {
    countElement.textContent = tableRows.length + " Brands";
  }

  const faqItems = document.querySelectorAll(
    ".DHMEP-MobileFAQ .DHMEP-faq-item"
  );

  const mobileCountElement = document.querySelector(
    ".DHMEP-brandCount-mob"
  );

  if (mobileCountElement) {
    mobileCountElement.textContent =
      faqItems.length + " Brands";
  }
});


document.querySelector(".sidebar-main-vendor > article > ul > li:nth-of-type(6)").classList.add("sidebar-active");
document.querySelector(".sidebar-main-vendor ul > ul:nth-of-type(4)").classList.add("active");
document.querySelector(".sidebar-main-vendor ul > ul:nth-of-type(4) > li:nth-child(2)",).classList.add("submenu-active-highlight");


document.querySelector("#account-menu .mobile-dropdown:nth-child(6) .dropdown-header").classList.add("dropdown-header-active");
document.querySelector("#account-menu .mobile-dropdown:nth-child(6)").classList.add("active-mobile-submenu");
document.querySelector("#account-menu .mobile-dropdown:nth-child(6) li:nth-child(2)").classList.add("submenu-active-page");