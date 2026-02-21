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
