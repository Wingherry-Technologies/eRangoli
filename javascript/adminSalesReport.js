document.querySelectorAll(".faq-question").forEach((button) => {
  // har button pe click listener lagao
  button.addEventListener("click", () => {
    const faqItem = button.closest(".faq-item"); // parent item lo
    faqItem.classList.toggle("active"); // open / close toggle
  });
});
