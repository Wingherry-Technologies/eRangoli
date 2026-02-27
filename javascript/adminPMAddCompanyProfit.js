const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon=document.querySelector("#hamburger-menu>img");
var mobileBack=document.querySelector(".mobile-back-button");


hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display="none"
    document.querySelector("body").style.overflow="hidden"
    window.scrollTo(0, 0);
    mobileBack.style.display="none"
  }
  else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow="auto";
    document.querySelector(".bottom-nav").style.display="flex";
    mobileBack.style.display="flex"
  }
});

  const VENDOR = 1299;
  const gstEl      = document.getElementById('gst');
  const profitEl   = document.getElementById('profit');
  const discountEl = document.getElementById('discount');
  const resultEl   = document.getElementById('sellingPrice');
  const marginText = document.getElementById('marginText');

  function fmt(n) {
    return n.toLocaleString('en-IN');
  }

  function recalc() {
    const g = parseFloat(gstEl.value) || 0;
    const p = parseFloat(profitEl.value) || 0;
    const d = parseFloat(discountEl.value) || 0;
    const price = VENDOR + (VENDOR * g / 100) + (VENDOR * p / 100) - (VENDOR * d / 100);
    const finalPrice = Math.round(price);
resultEl.value = fmt(finalPrice);

const margin = finalPrice - VENDOR;

marginText.innerText =
  "Margin: ₹" +
  fmt(finalPrice) +
  " - ₹" +
  fmt(VENDOR) +
  " = ₹" +
  fmt(margin);

if (margin < 0) {
  marginText.style.color = "red";
} else {
  marginText.style.color = "green";
}
  }

function isValid(val, required, type) {
  if (val === '') return !required;

  const n = parseFloat(val);
  if (isNaN(n) || n < 0) return false;

  // 👉 GST & Discount → max 100
  if (type === "limited" && n > 100) return false;

  // 👉 Profit → unlimited
  return true;
}

function validate(input, errId, required, type) {
  const err = document.getElementById(errId);
  const ok = isValid(input.value.trim(), required, type);

  if (!ok) {
    input.classList.add('error');
    err.classList.add('show');
  } else {
    input.classList.remove('error');
    err.classList.remove('show');
  }
  return ok;
}

[gstEl, profitEl, discountEl].forEach(el => {
  el.addEventListener('input', () => {
    el.value = el.value.replace(/[^0-9.]/g, '');
    const parts = el.value.split('.');
    if (parts.length > 2) el.value = parts[0] + '.' + parts.slice(1).join('');

    // 👉 BONUS (profit > 200 highlight)
    if (el === profitEl) {
      if (parseFloat(profitEl.value) > 200) {
        profitEl.style.borderColor = "orange";
      } else {
        profitEl.style.borderColor = "#DEE1E6"; // normal
      }
    }

    recalc();
  });
});

gstEl.addEventListener('input', () => validate(gstEl, 'gst-err', true, "limited"));
gstEl.addEventListener('blur',  () => validate(gstEl, 'gst-err', true, "limited"));

profitEl.addEventListener('input', () => validate(profitEl, 'profit-err', false, "unlimited"));
profitEl.addEventListener('blur',  () => validate(profitEl, 'profit-err', false, "unlimited"));

discountEl.addEventListener('input', () => validate(discountEl, 'discount-err', false, "limited"));
discountEl.addEventListener('blur',  () => validate(discountEl, 'discount-err', false, "limited"));

  document.getElementById('form').addEventListener('submit', e => {
    e.preventDefault();
const v1 = validate(gstEl, 'gst-err', true, "limited");
const v2 = validate(profitEl, 'profit-err', false, "unlimited");
const v3 = validate(discountEl, 'discount-err', false, "limited");
    if (!v1 || !v2 || !v3) {
      (!v1 ? gstEl : !v2 ? profitEl : discountEl).focus();
      return;
    }
const successPopup = document.getElementById("successPopup");
successPopup.classList.add("active");

// auto redirect after 2–3 sec
setTimeout(() => {
  window.location.href = "../html/adminPMProductList.html";
}, 2500);
  });

  recalc();

document.querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(2)").classList.add("sidebar-active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(1)").classList.add("active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(1)>li:nth-child(3)").classList.add("submenu-active-highlight");


document.querySelector("#account-menu .mobile-dropdown:nth-child(2) .dropdown-header").classList.add("dropdown-header-active");
document.querySelector("#account-menu .mobile-dropdown:nth-child(2)").classList.add("active-mobile-submenu");
document.querySelector("#account-menu .mobile-dropdown:nth-child(2) li:nth-child(3)").classList.add("submenu-active-page");

