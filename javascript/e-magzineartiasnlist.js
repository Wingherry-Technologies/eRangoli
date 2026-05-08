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