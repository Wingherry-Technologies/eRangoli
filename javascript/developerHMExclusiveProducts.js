document.querySelectorAll(".three-dots").forEach((dot) => {
  dot.addEventListener("click", function (e) {
    e.stopPropagation();

    document.querySelectorAll(".popup-menu").forEach((menu) => {
      menu.style.display = "none";
    });

    const popup = this.closest("td").querySelector(".popup-menu");
    popup.style.display = "flex";
  });
});

document.addEventListener("click", function () {
  document.querySelectorAll(".popup-menu").forEach((menu) => {
    menu.style.display = "none";
  });
});

const addBtn = document.getElementById("addBtn");
const floatingBtn = document.querySelector(".floating-plus-btn");
const popup = document.getElementById("addProductPopup");
const closePopup = document.getElementById("closePopup");

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

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqItems.forEach((el) => el.classList.remove("active"));

    if (!isActive) {
      item.classList.add("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const tableRows = document.querySelectorAll(".brand-table tbody tr");
  const countElement = document.querySelector(".count");

  if (countElement) {
    countElement.textContent = tableRows.length + " Products";
  }

  const faqItems = document.querySelectorAll(".MobileFAQ .faq-item");
  const mobileCountElement = document.querySelector(".brandCount-mob");

  if (mobileCountElement) {
    mobileCountElement.textContent = faqItems.length + " Products";
  }
});
