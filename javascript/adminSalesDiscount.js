document.addEventListener("DOMContentLoaded", function () {
  const discountBtn = document.querySelector(".create-discount-btn");
  if (discountBtn) {
    discountBtn.addEventListener("click", function () {
      window.location.href = "../html/adminSalesCreateNewDiscount.html";
    });
  }

  const couponBtn = document.querySelector(".create-coupon-btn");
  if (couponBtn) {
    couponBtn.addEventListener("click", function () {
      window.location.href = "../html/adminSalesCreateNewCoupons.html";
    });
  }
});
