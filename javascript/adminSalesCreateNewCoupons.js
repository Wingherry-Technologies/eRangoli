const createBtn = document.querySelector(".create-btn");
const mobApplyBtn = document.querySelector(".mob-apply");

const startDate = document.getElementById("couponStartDate");
const endDate = document.getElementById("couponEndDate");

// today's date
const today = new Date().toISOString().split("T")[0];
startDate.setAttribute("min", today);

// end date should be after start date
startDate.addEventListener("change", () => {
  endDate.value = "";
  endDate.setAttribute("min", startDate.value);
});

function validateCouponForm() {
  let isValid = true;

  const fields = [
    { el: couponName, msg: "Coupon name is required" },
    { el: couponCode, msg: "Coupon code is required" },
    { el: couponCondition, msg: "Condition is required" },
    { el: couponDiscount, msg: "Discount amount is required" },
    { el: couponCategory, msg: "Category is required" },
    { el: couponSubcategory, msg: "Subcategory is required" },
    { el: startDate, msg: "Start date is required" },
    { el: endDate, msg: "End date is required" },
  ];

  fields.forEach((field) => {
    const errorEl = field.el.closest(".form-group").querySelector(".error");

    if (!field.el.value) {
      errorEl.textContent = field.msg;
      isValid = false;
    } else {
      errorEl.textContent = "";
    }
  });

  return isValid;
}

// desktop create
createBtn.addEventListener("click", () => {
  if (validateCouponForm()) {
    alert("Coupon created successfully");
  }
});

// mobile apply
mobApplyBtn.addEventListener("click", () => {
  if (validateCouponForm()) {
    alert("Coupon created successfully");
  }
});
