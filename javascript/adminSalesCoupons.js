document.addEventListener("DOMContentLoaded", function () {
  const couponBtn = document.querySelector(".create-coupon-btn");
  if (couponBtn) {
    couponBtn.addEventListener("click", function () {
      window.location.href = "../html/adminSalesCreateNewCoupons.html";
    });
  }
});

const floatingPlusBtn = document.querySelector(".floating-plus-btn");

if (floatingPlusBtn) {
  floatingPlusBtn.addEventListener("click", () => {
    window.location.href = "../html/adminSalesCreateNewCoupons.html";
  });
}
