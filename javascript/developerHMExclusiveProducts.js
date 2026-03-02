// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon = document.querySelector("#hamburger-menu>img");
var mobileBack = document.querySelector(".mobile-back-button");

hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
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

document.querySelectorAll(".DHMEP-three-dots").forEach((dot) => {
  dot.addEventListener("click", function (e) {
    e.stopPropagation();

    document.querySelectorAll(".DHMEP-popup-menu").forEach((menu) => {
      menu.style.display = "none";
    });

    const popup = this.closest("td").querySelector(".DHMEP-popup-menu");
    popup.style.display = "flex";
  });
});

document.addEventListener("click", function () {
  document.querySelectorAll(".DHMEP-popup-menu").forEach((menu) => {
    menu.style.display = "none";
  });
});

const addBtn = document.getElementById("DHMEP-addBtn");
const floatingBtn = document.querySelector(".DHMEP-floating-plus-btn");
const popup = document.getElementById("DHMEP-addProductPopup");
const closePopup = document.getElementById("DHMEP-closePopup");

addBtn.addEventListener("click", () => {
  popup.style.display = "flex";
});

floatingBtn.addEventListener("click", () => {
  popup.style.display = "flex";
});

closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});

const faqItems = document.querySelectorAll(".DHMEP-faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".DHMEP-faq-question");

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqItems.forEach((el) => el.classList.remove("active"));

    if (!isActive) {
      item.classList.add("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const tableRows = document.querySelectorAll(".DHMEP-brand-table tbody tr");
  const countElement = document.querySelector(".DHMEP-count");

  if (countElement) {
    countElement.textContent = tableRows.length + " Products";
  }

  const faqItems = document.querySelectorAll(
    ".DHMEP-MobileFAQ .DHMEP-faq-item",
  );
  const mobileCountElement = document.querySelector(".DHMEP-brandCount-mob");

  if (mobileCountElement) {
    mobileCountElement.textContent = faqItems.length + " Products";
  }
});

// DELETE ROW (TABLE)
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("DHMEP-delete-icon")) {
    const row = e.target.closest("tr");
    if (row) {
      row.remove();
      updateProductCount();
    }
  }
});

// DELETE FAQ ITEM (MOBILE)
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("DHMEP-delete-icon")) {
    const faqItem = e.target.closest(".DHMEP-faq-item");
    if (faqItem) {
      faqItem.remove();
      updateProductCount();
    }
  }
});

function updateProductCount() {
  const tableRows = document.querySelectorAll(".DHMEP-brand-table tbody tr");
  const countElement = document.querySelector(".DHMEP-count");

  if (countElement) {
    countElement.textContent = tableRows.length + " Products";
  }

  const faqItems = document.querySelectorAll(
    ".DHMEP-MobileFAQ .DHMEP-faq-item",
  );
  const mobileCountElement = document.querySelector(".DHMEP-brandCount-mob");

  if (mobileCountElement) {
    mobileCountElement.textContent = faqItems.length + " Products";
  }
}

document.querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(4)").classList.add("sidebar-active");


document.querySelector("#account-menu .mobile-dropdown:nth-child(4) .dropdown-header").classList.add("dropdown-header-active");

