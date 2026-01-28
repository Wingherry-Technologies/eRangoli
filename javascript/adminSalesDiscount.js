document.addEventListener("DOMContentLoaded", function () {
  const discountBtn = document.querySelector(".create-discount-btn");
  if (discountBtn) {
    discountBtn.addEventListener("click", function () {
      window.location.href = "../html/adminSalesCreateNewDiscount.html";
    });
  }

  const floatingPlusBtn = document.querySelector(".floating-plus-btn");

  if (floatingPlusBtn) {
    floatingPlusBtn.addEventListener("click", () => {
      window.location.href = "../html/adminSalesCreateNewDiscount.html";
    });
  }
});
