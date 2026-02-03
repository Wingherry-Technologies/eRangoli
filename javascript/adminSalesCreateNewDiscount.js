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
const applyBtn = document.querySelector(".apply-btn");
const mobApplyBtn = document.querySelector(".mob-apply");

function validateForm() {
  let isValid = true;

  // all fields list
  const fields = [
    { el: document.getElementById("category"), msg: "Category is required" },
    {
      el: document.getElementById("subcategory"),
      msg: "Subcategory is required",
    },
    { el: document.getElementById("discount"), msg: "Discount is required" },
    { el: document.getElementById("startDate"), msg: "Start date is required" },
    { el: document.getElementById("endDate"), msg: "End date is required" },
  ];

  fields.forEach((field) => {
    const errorEl = field.el.closest(".form-group").querySelector(".error");

    // check empty value
    if (!field.el.value) {
      errorEl.textContent = field.msg;
      isValid = false;
    } else {
      errorEl.textContent = "";
    }
  });

  return isValid;
}

// desktop apply
applyBtn.addEventListener("click", () => {
  if (validateForm()) {
    alert("Form submitted successfully");
  }
});

// mobile apply
mobApplyBtn.addEventListener("click", () => {
  if (validateForm()) {
    alert("Form submitted successfully");
  }
});

const startDateInput = document.getElementById("startDate");

const today = new Date().toISOString().split("T")[0];
startDateInput.setAttribute("min", today);

document.querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(6)").classList.add("sidebar-active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(3)").classList.add("active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(3)>li:nth-child(7)").classList.add("submenu-active-highlight");


document.querySelector("#account-menu .mobile-dropdown:nth-child(6) .dropdown-header").classList.add("dropdown-header-active");
document.querySelector("#account-menu .mobile-dropdown:nth-child(6)").classList.add("active-mobile-submenu");
document.querySelector("#account-menu .mobile-dropdown:nth-child(6) li:nth-child(7)").classList.add("submenu-active-page");s
