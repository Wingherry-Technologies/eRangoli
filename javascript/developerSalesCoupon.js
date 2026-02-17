// =============================================
//  MOBILE FAQ ACCORDION
// =============================================
document.querySelectorAll(".SalesList-faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".SalesList-faq-item").classList.toggle("active");
  });
});

// =============================================
//  SCREEN NAVIGATION REFERENCES
// =============================================
const SalesList_mainContent  = document.querySelector(".SalesList-main-content");
const coupanCreate_screen    = document.getElementById("coupanCreate-screen");
const SalesList_createBtn    = document.querySelector(".SalesList-create-btn");
const SalesList_floatingBtn  = document.getElementById("SalesList-floatingBtn");
const coupanCreate_backBtn   = document.getElementById("coupanCreate-backToList");

// =============================================
//  OPEN CREATE SCREEN
// =============================================
function openCreateScreen() {
  SalesList_mainContent.style.display  = "none";
  coupanCreate_screen.style.display    = "block";
  if (SalesList_floatingBtn) SalesList_floatingBtn.style.display = "none";
}

SalesList_createBtn?.addEventListener("click", openCreateScreen);
SalesList_floatingBtn?.addEventListener("click", openCreateScreen);

// =============================================
//  BACK TO LIST
// =============================================
coupanCreate_backBtn?.addEventListener("click", () => {
  coupanCreate_screen.style.display   = "none";
  SalesList_mainContent.style.display = "block";
  if (SalesList_floatingBtn) SalesList_floatingBtn.style.display = "flex";
  resetForm();
});

// =============================================
//  FORM FIELD REFERENCES
// =============================================
const couponNameInput      = document.getElementById("coupanCreate-couponName");
const couponCodeInput      = document.getElementById("coupanCreate-couponCode");
const conditionInput       = document.getElementById("coupanCreate-condition");
const discountAmountInput  = document.getElementById("coupanCreate-discountAmount");
const categorySelect       = document.getElementById("coupanCreate-category");
const subcategorySelect    = document.getElementById("coupanCreate-subcategory");
const startDateInput       = document.getElementById("coupanCreate-startDate");
const endDateInput         = document.getElementById("coupanCreate-endDate");

// =============================================
//  ERROR ELEMENT REFERENCES
// =============================================
const couponNameError     = document.getElementById("coupanCreate-couponNameError");
const couponCodeError     = document.getElementById("coupanCreate-couponCodeError");
const conditionError      = document.getElementById("coupanCreate-conditionError");
const discountAmountError = document.getElementById("coupanCreate-discountAmountError");
const categoryError       = document.getElementById("coupanCreate-categoryError");
const subcategoryError    = document.getElementById("coupanCreate-subcategoryError");
const startDateError      = document.getElementById("coupanCreate-startDateError");
const endDateError        = document.getElementById("coupanCreate-endDateError");

// =============================================
//  SUBMIT BUTTON HANDLERS (desktop + mobile)
// =============================================
const submitBtns = document.querySelectorAll(".coupanCreate-submit");

submitBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const isNameValid     = validateCouponName();
    const isCodeValid     = validateCouponCode();
    const isCondValid     = validateCondition();
    const isDiscValid     = validateDiscountAmount();
    const isCatValid      = validateCategory();
    const isSubCatValid   = validateSubcategory();
    const isStartValid    = validateStartDate();
    const isEndValid      = validateEndDate();

    if (
      isNameValid &&
      isCodeValid &&
      isCondValid &&
      isDiscValid &&
      isCatValid &&
      isSubCatValid &&
      isStartValid &&
      isEndValid
    ) {
      // All validations passed — return to list
      coupanCreate_screen.style.display   = "none";
      SalesList_mainContent.style.display = "block";
      if (SalesList_floatingBtn) SalesList_floatingBtn.style.display = "flex";
      resetForm();
    }
  });
});

// =============================================
//  VALIDATION HELPERS
// =============================================

function showError(inputEl, errorEl, message) {
  errorEl.innerText = message;
  errorEl.style.display = "block";
  inputEl.classList.add("coupanCreate-input-error");
}

function clearError(inputEl, errorEl) {
  errorEl.style.display = "none";
  inputEl.classList.remove("coupanCreate-input-error");
}

// =============================================
//  INDIVIDUAL VALIDATION FUNCTIONS
// =============================================

function validateCouponName() {
  const value = couponNameInput.value.trim();
  if (value === "") {
    showError(couponNameInput, couponNameError, "Coupon name is required");
    return false;
  }
  clearError(couponNameInput, couponNameError);
  return true;
}

function validateCouponCode() {
  const value = couponCodeInput.value.trim();
  if (value === "") {
    showError(couponCodeInput, couponCodeError, "Coupon code is required");
    return false;
  }
  clearError(couponCodeInput, couponCodeError);
  return true;
}

function validateCondition() {
  const value = conditionInput.value.trim();
  if (value === "") {
    showError(conditionInput, conditionError, "Condition is required");
    return false;
  }
  clearError(conditionInput, conditionError);
  return true;
}

function validateDiscountAmount() {
  const value = discountAmountInput.value.trim();
  if (value === "") {
    showError(discountAmountInput, discountAmountError, "Discount amount is required");
    return false;
  }
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) {
    showError(discountAmountInput, discountAmountError, "Enter a valid discount amount");
    return false;
  }
  clearError(discountAmountInput, discountAmountError);
  return true;
}

function validateCategory() {
  const value = categorySelect.value.trim();
  if (value === "") {
    showError(categorySelect, categoryError, "Category is required");
    return false;
  }
  clearError(categorySelect, categoryError);
  return true;
}

function validateSubcategory() {
  const value = subcategorySelect.value.trim();
  if (value === "") {
    showError(subcategorySelect, subcategoryError, "Subcategory is required");
    return false;
  }
  clearError(subcategorySelect, subcategoryError);
  return true;
}

function validateStartDate() {
  const value = startDateInput.value.trim();
  if (value === "") {
    showError(startDateInput, startDateError, "Start date is required");
    return false;
  }
  clearError(startDateInput, startDateError);
  return true;
}

function validateEndDate() {
  const value = endDateInput.value.trim();
  if (value === "") {
    showError(endDateInput, endDateError, "End date is required");
    return false;
  }
  // Must be strictly after start date
  if (startDateInput.value && value <= startDateInput.value) {
    showError(endDateInput, endDateError, "End date must be after start date");
    return false;
  }
  clearError(endDateInput, endDateError);
  return true;
}

// =============================================
//  REAL-TIME VALIDATION LISTENERS
// =============================================
couponNameInput?.addEventListener("input",    validateCouponName);
couponCodeInput?.addEventListener("input",    validateCouponCode);
conditionInput?.addEventListener("input",     validateCondition);
discountAmountInput?.addEventListener("input", validateDiscountAmount);
categorySelect?.addEventListener("change",    validateCategory);
subcategorySelect?.addEventListener("change", validateSubcategory);

startDateInput?.addEventListener("change", () => {
  validateStartDate();
  if (endDateInput.value) validateEndDate();
});

endDateInput?.addEventListener("change", validateEndDate);

// =============================================
//  RESTRICT DISCOUNT INPUT — NUMBERS ONLY
// =============================================
discountAmountInput?.addEventListener("keypress", (e) => {
  const key = e.key;
  if (
    key === "Backspace" ||
    key === "Delete"    ||
    key === "ArrowLeft" ||
    key === "ArrowRight"||
    key === "Tab"       ||
    key === "."         ||
    (key >= "0" && key <= "9")
  ) {
    return;
  }
  e.preventDefault();
});

// =============================================
//  IMAGE PREVIEW
// =============================================
const coverImageInput = document.getElementById("coupanCreate-coverImageInput");
const imageBox        = document.getElementById("coupanCreate-imageBox");

coverImageInput?.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      // Clear box content and show preview image
      imageBox.innerHTML = "";
      const img = document.createElement("img");
      img.src = ev.target.result;
      img.style.cssText = "width:100%;height:100%;object-fit:cover;border-radius:8px;";
      imageBox.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
});

// =============================================
//  RESET FORM
// =============================================
function resetForm() {
  couponNameInput.value     = "";
  couponCodeInput.value     = "";
  conditionInput.value      = "";
  discountAmountInput.value = "";
  categorySelect.value      = "";
  subcategorySelect.value   = "";
  startDateInput.value      = "";
  endDateInput.value        = "";

  // Hide all errors
  [couponNameError, couponCodeError, conditionError, discountAmountError,
   categoryError, subcategoryError, startDateError, endDateError].forEach((el) => {
    if (el) el.style.display = "none";
  });

  // Remove error classes
  [couponNameInput, couponCodeInput, conditionInput, discountAmountInput,
   categorySelect, subcategorySelect, startDateInput, endDateInput].forEach((el) => {
    if (el) el.classList.remove("coupanCreate-input-error");
  });

  // Reset image box
  if (imageBox) {
    imageBox.innerHTML = `
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="#B0B8C1" stroke-width="1.5"/>
        <circle cx="8.5" cy="8.5" r="1.5" stroke="#B0B8C1" stroke-width="1.5"/>
        <polyline points="21 15 16 10 5 21" stroke="#B0B8C1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <input type="file" accept="image/*" id="coupanCreate-coverImageInput" class="coupanCreate-file-input">
    `;
    // Re-attach file input listener after reset
    const newInput = document.getElementById("coupanCreate-coverImageInput");
    newInput?.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          imageBox.innerHTML = "";
          const img = document.createElement("img");
          img.src = ev.target.result;
          img.style.cssText = "width:100%;height:100%;object-fit:cover;border-radius:8px;";
          imageBox.appendChild(img);
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

// =============================================
//  EDIT & DELETE ACTION HANDLERS
// =============================================
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".SalesList-action-icon-btn");
  if (!btn) return;

  const title = btn.getAttribute("title");

  if (title === "Edit") {
    console.log("Edit clicked");
    // TODO: Implement edit functionality
  }

  if (title === "Delete") {
    if (confirm("Are you sure you want to delete this coupon?")) {
      console.log("Delete confirmed");
      // TODO: Implement delete functionality
      const row = btn.closest("tr");
      if (row) row.remove();
      // Also handle mobile accordion removal
      const faqItem = btn.closest(".SalesList-faq-item");
      if (faqItem) faqItem.remove();
    }
  }
});