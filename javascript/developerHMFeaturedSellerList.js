document.addEventListener("DOMContentLoaded", function () {
  /* ================= MOBILE FAQ ACCORDION ================= */
  document.querySelectorAll(".FSFaqCaret").forEach((caret) => {
    caret.addEventListener("click", (e) => {
      e.stopPropagation();

      const faqItem = caret.closest(".FSFaqItem");

      document.querySelectorAll(".FSFaqItem").forEach((item) => {
        if (item !== faqItem) item.classList.remove("FSActive");
      });

      faqItem.classList.toggle("FSActive");
    });
  });
});