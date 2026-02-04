// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon=document.querySelector("#hamburger-menu>img");


hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display="none"
    document.querySelector("body").style.overflow="hidden"
    window.scrollTo(0, 0);
  }
  else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow="auto";
    document.querySelector(".bottom-nav").style.display="flex";
  }
});

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
document.querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(6)").classList.add("sidebar-active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(3)").classList.add("active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(3)>li:nth-child(8)").classList.add("submenu-active-highlight");


document.querySelector("#account-menu .mobile-dropdown:nth-child(6) .dropdown-header").classList.add("dropdown-header-active");
document.querySelector("#account-menu .mobile-dropdown:nth-child(6)").classList.add("active-mobile-submenu");
document.querySelector("#account-menu .mobile-dropdown:nth-child(6) li:nth-child(8)").classList.add("submenu-active-page");
