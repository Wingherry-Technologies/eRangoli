/* adminPMAddCompanyProfit.js */

// ── Mobile Menu ──────────────────────────────────────────
const hamburger = document.querySelector(".hamburger-menu");
const mobileMenu = document.getElementById("mobile-menu");
const hamberMenuIcon = document.querySelector("#hamburger-menu>img");
const mobileBack = document.querySelector(".mobile-back-button");

hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display = "none";
    document.querySelector("body").style.overflow = "hidden";
    window.scrollTo(0, 0);
    mobileBack.style.display = "none";
  } else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow = "auto";
    document.querySelector(".bottom-nav").style.display = "flex";
    mobileBack.style.display = "flex";
  }
});

// ── Constants ─────────────────────────────────────────────
const VENDOR = 1299;

// ── Element References ────────────────────────────────────
const gstEl            = document.getElementById("gst");
const profitEl         = document.getElementById("profit");
const discountEl       = document.getElementById("discount");
const otherChargesEl   = document.getElementById("otherCharges");

const priceWithoutDiscountEl = document.getElementById("priceWithoutDiscount");
const priceWithDiscountEl    = document.getElementById("priceWithDiscount");
const finalPriceEl           = document.getElementById("finalPrice");

const gstAmountEl          = document.getElementById("gst-amount");
const profitAmountEl       = document.getElementById("profit-amount");
const discountAmountEl     = document.getElementById("discount-amount");
const otherChargesAmountEl = document.getElementById("otherCharges-amount");

const marginText = document.getElementById("marginText");

// ── Formatting ────────────────────────────────────────────
function fmt(n) {
  return Math.round(n).toLocaleString("en-IN");
}

function fmtRupee(n) {
  return "₹" + fmt(n);
}

// ── Recalculation ─────────────────────────────────────────
function recalc() {
  const g  = parseFloat(gstEl.value)          || 0;
  const p  = parseFloat(profitEl.value)        || 0;
  const d  = parseFloat(discountEl.value)      || 0;
  const oc = parseFloat(otherChargesEl.value)  || 0;

  // Step 1: GST Amount
  const gstAmount = VENDOR * g / 100;

  // Step 2: Profit Amount
  const profitAmount = VENDOR * p / 100;

  // Step 3: Price Without Discount
  const withoutDiscount = VENDOR + gstAmount + profitAmount;

  // Step 4: Discount Amount
  const discountAmount = withoutDiscount * d / 100;

  // Step 5: Price With Discount
  const withDiscount = withoutDiscount - discountAmount;

  // Step 6: Other Charges Amount
  const otherChargesAmount = withDiscount * oc / 100;

  // Step 7: Final Selling Price
  const finalPrice = withDiscount + otherChargesAmount;

  // Update readonly fields
  priceWithoutDiscountEl.value = fmt(withoutDiscount);
  priceWithDiscountEl.value    = fmt(withDiscount);
  finalPriceEl.value           = fmt(finalPrice);

  // Update inline rupee amounts on percentage fields
  gstAmountEl.textContent          = g  > 0 ? fmtRupee(gstAmount)          : "";
  profitAmountEl.textContent       = p  > 0 ? fmtRupee(profitAmount)       : "";
  discountAmountEl.textContent     = d  > 0 ? fmtRupee(discountAmount)     : "";
  otherChargesAmountEl.textContent = oc > 0 ? fmtRupee(otherChargesAmount) : "";

  // Margin text (final price vs vendor)
  const margin = Math.round(finalPrice) - VENDOR;
  marginText.textContent =
    "Margin: " + fmtRupee(finalPrice) + " - " + fmtRupee(VENDOR) + " = " + fmtRupee(margin);
  marginText.style.color = margin < 0 ? "red" : "green";
}

// ── Validation ────────────────────────────────────────────
function isValid(val, required, type) {
  if (val === "") return !required;
  const n = parseFloat(val);
  if (isNaN(n) || n < 0) return false;
  if (type === "limited" && n > 100) return false;
  return true;
}

function validate(input, errId, required, type) {
  const err = document.getElementById(errId);
  const ok  = isValid(input.value.trim(), required, type);
  if (!ok) {
    input.classList.add("error");
    err.classList.add("show");
  } else {
    input.classList.remove("error");
    err.classList.remove("show");
  }
  return ok;
}

// ── Input Sanitisation Helper ─────────────────────────────
function sanitise(el) {
  el.value = el.value.replace(/[^0-9.]/g, "");
  const parts = el.value.split(".");
  if (parts.length > 2) el.value = parts[0] + "." + parts.slice(1).join("");
}

// ── Field Config ──────────────────────────────────────────
const fields = [
  { el: gstEl,          errId: "gst-err",         required: true,  type: "limited"   },
  { el: profitEl,       errId: "profit-err",       required: false, type: "unlimited" },
  { el: discountEl,     errId: "discount-err",     required: false, type: "limited"   },
  { el: otherChargesEl, errId: "otherCharges-err", required: false, type: "limited"   },
];

// ── Attach Listeners ──────────────────────────────────────
fields.forEach(({ el, errId, required, type }) => {
  el.addEventListener("input", () => {
    sanitise(el);

    // Orange highlight if profit > 200
    if (el === profitEl) {
      el.style.borderColor = parseFloat(el.value) > 200 ? "orange" : "#DEE1E6";
    }

    validate(el, errId, required, type);
    recalc();
  });

  el.addEventListener("blur", () => {
    validate(el, errId, required, type);
  });
});

// ── Form Submit ───────────────────────────────────────────
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const results = fields.map(({ el, errId, required, type }) =>
    validate(el, errId, required, type)
  );

  if (results.some((ok) => !ok)) {
    const firstBad = fields.find((_, i) => !results[i]);
    firstBad?.el.focus();
    return;
  }

  const successPopup = document.getElementById("successPopup");
  successPopup.classList.add("active");

  setTimeout(() => {
    window.location.href = "../html/adminPMProductList.html";
  }, 2500);
});

// ── Sidebar Active States (nth-child(3) for PM page) ─────
document.querySelector(".sidebar-main-vendor > article > ul > li:nth-of-type(2)")
  ?.classList.add("sidebar-active");
document.querySelector(".sidebar-main-vendor ul > ul:nth-of-type(1)")
  ?.classList.add("active");
document.querySelector(".sidebar-main-vendor ul > ul:nth-of-type(1) > li:nth-child(3)")
  ?.classList.add("submenu-active-highlight");

document.querySelector("#account-menu .mobile-dropdown:nth-child(2) .dropdown-header")
  ?.classList.add("dropdown-header-active");
document.querySelector("#account-menu .mobile-dropdown:nth-child(2)")
  ?.classList.add("active-mobile-submenu");
document.querySelector("#account-menu .mobile-dropdown:nth-child(2) li:nth-child(3)")
  ?.classList.add("submenu-active-page");

// ── Initial Calculation ───────────────────────────────────
recalc();