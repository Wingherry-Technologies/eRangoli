document.querySelectorAll(".APRAfaq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".APRAfaq-item").classList.toggle("active");
  });
});

document.querySelector(".create-btn")?.addEventListener("click", function () {
  window.location.href = "../html/developerPMCreateNewCategories.html";
});

document
  .querySelector(".floating-plus-btn")
  ?.addEventListener("click", function () {
    window.location.href = "../html/developerPMCreateNewCategories.html";
  });
