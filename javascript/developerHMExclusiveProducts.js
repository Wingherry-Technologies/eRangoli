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
