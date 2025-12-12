document.getElementById("back-btn").addEventListener("click", () => {
  window.location.href = "../html/productcatalog.html";
});

function showError(input, errorId, message) {
  const label = input.previousElementSibling;
  const errorSpan = document.getElementById(errorId);

  if (errorSpan) {
    errorSpan.textContent = message;
    errorSpan.style.display = "block";
  }

  input.classList.add("error");
  if (label) label.classList.add("error");
}

function clearError(input, errorId) {
  const label = input.previousElementSibling;
  const errorSpan = document.getElementById(errorId);

  if (errorSpan) {
    errorSpan.textContent = "";
    errorSpan.style.display = "none";
  }

  input.classList.remove("error");
  if (label) label.classList.remove("error");
}

function validateName() {
  const input = document.getElementById("name");
  const value = input.value.trim();

  if (value === "") {
    showError(input, "nameError", "Please enter your name");
    return false;
  }

  clearError(input, "nameError");
  return true;
}

function validatePhone() {
  const input = document.getElementById("phone");
  const value = input.value.trim();

  if (value === "") {
    showError(input, "phoneError", "Please enter mobile number");
    return false;
  }

  if (!/^[6-9]\d{9}$/.test(value)) {
    showError(input, "phoneError", "Enter valid 10-digit mobile number");
    return false;
  }

  clearError(input, "phoneError");
  return true;
}

function validateZip() {
  const input = document.getElementById("zip");
  const value = input.value.trim();

  if (value === "") {
    showError(input, "zipError", "Please enter zipcode");
    return false;
  }

  if (!/^\d{6}$/.test(value)) {
    showError(input, "zipError", "Zipcode must be 6 digits");
    return false;
  }

  clearError(input, "zipError");
  return true;
}

//ADDITIONAL VALIDATION FUNCTIONS

function validateFullName() {
  const input = document.getElementById("name");
  const value = input.value.trim();

  if (value === "") {
    showError(input, "nameError", "Please enter your full name");
    return false;
  }

  clearError(input, "nameError");
  return true;
}

function validateEmail() {
  const input = document.getElementById("email");
  const value = input.value.trim();

  if (value === "") {
    showError(input, "emailError", "Please enter your email");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    showError(input, "emailError", "Please enter a valid email address");
    return false;
  }

  clearError(input, "emailError");
  return true;
}

function validateHno() {
  const input = document.getElementById("hno");
  const value = input.value.trim();

  if (value === "") {
    showError(input, "hnoError", "Please enter house number / society");
    return false;
  }

  clearError(input, "hnoError");
  return true;
}

function validateLane() {
  const input = document.getElementById("lane");
  const value = input.value.trim();

  if (value === "") {
    showError(input, "laneError", "Please enter area / lane");
    return false;
  }

  clearError(input, "laneError");
  return true;
}

function validateCity() {
  const input = document.getElementById("city");
  const value = input.value.trim();

  if (value === "") {
    showError(input, "cityError", "Please enter city");
    return false;
  }

  clearError(input, "cityError");
  return true;
}

function validateState() {
  const input = document.getElementById("state");
  const value = input.value.trim();

  if (value === "") {
    showError(input, "stateError", "Please enter state");
    return false;
  }

  clearError(input, "stateError");
  return true;
}

//POPUP VALIDATION FUNCTIONS

function validatePopupName() {
  const input = document.getElementById("p-name");
  const value = input.value.trim();

  if (value === "") {
    showError(input, "p-nameError", "Please enter your full name");
    return false;
  }

  clearError(input, "p-nameError");
  return true;
}

function validatePopupEmail() {
  const input = document.getElementById("p-email");
  const value = input.value.trim();

  if (value === "") {
    showError(input, "p-emailError", "Please enter your email");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    showError(input, "p-emailError", "Please enter a valid email address");
    return false;
  }

  clearError(input, "p-emailError");
  return true;
}

function validatePopupPhone() {
  const input = document.getElementById("p-phone");
  const value = input.value.trim();

  if (value === "") {
    showError(input, "p-phoneError", "Please enter mobile number");
    return false;
  }

  if (!/^[6-9]\d{9}$/.test(value)) {
    showError(input, "p-phoneError", "Enter valid 10-digit mobile number");
    return false;
  }

  clearError(input, "p-phoneError");
  return true;
}

function validatePopupHno() {
  const input = document.getElementById("p-hno");
  const value = input.value.trim();

  if (value === "") {
    showError(input, "p-hnoError", "Please enter house number / society");
    return false;
  }

  clearError(input, "p-hnoError");
  return true;
}

function validatePopupLane() {
  const input = document.getElementById("p-lane");
  const value = input.value.trim();

  if (value === "") {
    showError(input, "p-laneError", "Please enter area / lane");
    return false;
  }

  clearError(input, "p-laneError");
  return true;
}

function validatePopupCity() {
  const input = document.getElementById("p-city");
  const value = input.value.trim();

  if (value === "") {
    showError(input, "p-cityError", "Please enter city");
    return false;
  }

  clearError(input, "p-cityError");
  return true;
}

function validatePopupZip() {
  const input = document.getElementById("p-zip");
  const value = input.value.trim();

  if (value === "") {
    showError(input, "p-zipError", "Please enter zipcode");
    return false;
  }

  if (!/^\d{6}$/.test(value)) {
    showError(input, "p-zipError", "Zipcode must be 6 digits");
    return false;
  }

  clearError(input, "p-zipError");
  return true;
}

function validatePopupState() {
  const input = document.getElementById("p-state");
  const value = input.value.trim();

  if (value === "") {
    showError(input, "p-stateError", "Please enter state");
    return false;
  }

  clearError(input, "p-stateError");
  return true;
}

//BLUR EVENT LISTENERS

document.getElementById("name").addEventListener("blur", () => {
  validateFullName();
});

document.getElementById("email").addEventListener("blur", () => {
  validateEmail();
});

document.getElementById("phone").addEventListener("blur", () => {
  validatePhone();
});

document.getElementById("hno").addEventListener("blur", () => {
  validateHno();
});

document.getElementById("lane").addEventListener("blur", () => {
  validateLane();
});

document.getElementById("city").addEventListener("blur", () => {
  validateCity();
});

document.getElementById("zip").addEventListener("blur", () => {
  validateZip();
});

document.getElementById("state").addEventListener("blur", () => {
  validateState();
});

// POPUP BLUR EVENT LISTENERS

document.getElementById("p-name").addEventListener("blur", () => {
  validatePopupName();
});

document.getElementById("p-email").addEventListener("blur", () => {
  validatePopupEmail();
});

document.getElementById("p-phone").addEventListener("blur", () => {
  validatePopupPhone();
});

document.getElementById("p-hno").addEventListener("blur", () => {
  validatePopupHno();
});

document.getElementById("p-lane").addEventListener("blur", () => {
  validatePopupLane();
});

document.getElementById("p-city").addEventListener("blur", () => {
  validatePopupCity();
});

document.getElementById("p-zip").addEventListener("blur", () => {
  validatePopupZip();
});

document.getElementById("p-state").addEventListener("blur", () => {
  validatePopupState();
});

// INPUT EVENT VALIDATION

document.getElementById("name").addEventListener("input", function () {
  if (this.value.trim() !== "") {
    validateFullName();
  }
});

document.getElementById("email").addEventListener("input", function () {
  if (this.value.trim() !== "") {
    validateEmail();
  }
});

document.getElementById("phone").addEventListener("input", function () {
  if (this.value.trim() !== "") {
    validatePhone();
  }
});

document.getElementById("hno").addEventListener("input", function () {
  if (this.value.trim() !== "") {
    validateHno();
  }
});

document.getElementById("lane").addEventListener("input", function () {
  if (this.value.trim() !== "") {
    validateLane();
  }
});

document.getElementById("city").addEventListener("input", function () {
  if (this.value.trim() !== "") {
    validateCity();
  }
});

document.getElementById("zip").addEventListener("input", function () {
  if (this.value.trim() !== "") {
    validateZip();
  }
});

document.getElementById("state").addEventListener("input", function () {
  if (this.value.trim() !== "") {
    validateState();
  }
});

//POPUP INPUT EVENT LISTENERS

document.getElementById("p-name").addEventListener("input", function () {
  if (this.value.trim() !== "") {
    validatePopupName();
  }
});

document.getElementById("p-email").addEventListener("input", function () {
  if (this.value.trim() !== "") {
    validatePopupEmail();
  }
});

document.getElementById("p-phone").addEventListener("input", function () {
  if (this.value.trim() !== "") {
    validatePopupPhone();
  }
});

document.getElementById("p-hno").addEventListener("input", function () {
  if (this.value.trim() !== "") {
    validatePopupHno();
  }
});

document.getElementById("p-lane").addEventListener("input", function () {
  if (this.value.trim() !== "") {
    validatePopupLane();
  }
});

document.getElementById("p-city").addEventListener("input", function () {
  if (this.value.trim() !== "") {
    validatePopupCity();
  }
});

document.getElementById("p-zip").addEventListener("input", function () {
  if (this.value.trim() !== "") {
    validatePopupZip();
  }
});

document.getElementById("p-state").addEventListener("input", function () {
  if (this.value.trim() !== "") {
    validatePopupState();
  }
});

/* SAVE DELIVERY FORM */
document.getElementById("saveAddressBtn").addEventListener("click", () => {
  // ------------------- VALIDATION BEFORE SAVE -------------------
  const isFullNameValid = validateFullName();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();
  const isHnoValid = validateHno();
  const isLaneValid = validateLane();
  const isCityValid = validateCity();
  const isZipValid = validateZip();
  const isStateValid = validateState();

  if (
    !isFullNameValid ||
    !isEmailValid ||
    !isPhoneValid ||
    !isHnoValid ||
    !isLaneValid ||
    !isCityValid ||
    !isZipValid ||
    !isStateValid
  ) {
    return; // STOP — validation failed
  }
  // --------------------------------------------------------------

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const hno = document.getElementById("hno").value;
  const lane = document.getElementById("lane").value;
  const landmark = document.getElementById("landmark").value;
  const city = document.getElementById("city").value;
  const zip = document.getElementById("zip").value;
  const state = document.getElementById("state").value;

  const fullAddress = `${hno}, ${lane}, ${landmark}, ${city}, ${state}, ${zip}`;

  const template = document.getElementById("address-template");
  const newCard = template.cloneNode(true);
  newCard.classList.remove("hidden");

  newCard.querySelector(".add-name").textContent = name;
  newCard.querySelector(".add-email").textContent = email;
  newCard.querySelector(".add-phone").textContent = phone;
  newCard.querySelector(".add-full").textContent = fullAddress;

  document.getElementById("address-list").appendChild(newCard);

  const firstCheckbox = newCard.querySelector(".use-detail input");
  firstCheckbox.checked = true;

  document
    .querySelectorAll("#address-list .use-detail input")
    .forEach((chk) => {
      if (chk !== firstCheckbox) chk.checked = false;
    });

  updatePayButton();

  document.getElementById("saved-address-section").classList.remove("hidden");

  document
    .querySelectorAll(".form-group, .inline-row, .sub-heading")
    .forEach((el) => el.classList.add("hide"));
  document.getElementById("saveAddressBtn").classList.add("hide");
});

/* OPEN INLINE POPUP */
document.getElementById("openPopupBtn").addEventListener("click", () => {
  document.getElementById("inlinePopup").classList.remove("hidden");
});

/* CLOSE INLINE POPUP */
document.getElementById("closeInlinePopup").addEventListener("click", () => {
  document.getElementById("inlinePopup").classList.add("hidden");
});

/* POPUP SAVE BUTTON (NEW ADDRESS) */
document.getElementById("popupSaveBtn").addEventListener("click", () => {
  const isPopupNameValid = validatePopupName();
  const isPopupEmailValid = validatePopupEmail();
  const isPopupPhoneValid = validatePopupPhone();
  const isPopupHnoValid = validatePopupHno();
  const isPopupLaneValid = validatePopupLane();
  const isPopupCityValid = validatePopupCity();
  const isPopupZipValid = validatePopupZip();
  const isPopupStateValid = validatePopupState();

  if (
    !isPopupNameValid ||
    !isPopupEmailValid ||
    !isPopupPhoneValid ||
    !isPopupHnoValid ||
    !isPopupLaneValid ||
    !isPopupCityValid ||
    !isPopupZipValid ||
    !isPopupStateValid
  ) {
    return;
  }

  const name = document.getElementById("p-name").value;
  const email = document.getElementById("p-email").value;
  const phone = document.getElementById("p-phone").value;
  const hno = document.getElementById("p-hno").value;
  const lane = document.getElementById("p-lane").value;
  const landmark = document.getElementById("p-landmark").value;
  const city = document.getElementById("p-city").value;
  const zip = document.getElementById("p-zip").value;
  const state = document.getElementById("p-state").value;

  const fullAddress = `${hno}, ${lane}, ${landmark}, ${city}, ${state}, ${zip}`;

  const template = document.getElementById("address-template");
  const newCard = template.cloneNode(true);
  newCard.classList.remove("hidden");

  newCard.querySelector(".add-name").textContent = name;
  newCard.querySelector(".add-email").textContent = email;
  newCard.querySelector(".add-phone").textContent = phone;
  newCard.querySelector(".add-full").textContent = fullAddress;

  document.getElementById("address-list").appendChild(newCard);

  document.getElementById("inlinePopup").classList.add("hidden");
});

/* DELETE ADDRESS */
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("address-delete-btn")) {
    const wrapper = e.target.closest(".address-wrapper");
    if (wrapper) wrapper.remove();
  }
});

/*  ADDRESS CHECKBOX LOGIC */

function updatePayButton() {
  const allChecks = document.querySelectorAll(
    "#address-list .use-detail input"
  );
  const payBtn = document.querySelector(".pay-btn");

  const anyChecked = [...allChecks].some((chk) => chk.checked);

  if (anyChecked) {
    payBtn.style.background = "#A10404";
    payBtn.style.cursor = "pointer";
  } else {
    payBtn.style.background = "#716B6B";
    payBtn.style.cursor = "not-allowed";
  }
}

document.addEventListener("change", (e) => {
  if (e.target.matches("#address-list .use-detail input")) {
    const allChecks = document.querySelectorAll(
      "#address-list .use-detail input"
    );

    allChecks.forEach((chk) => {
      if (chk !== e.target) chk.checked = false;
    });

    updatePayButton();
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("address-delete-btn")) {
    setTimeout(updatePayButton, 50);
  }
});

/* COUPON APPLY LOGIC */

document.querySelector(".apply-btn").addEventListener("click", () => {
  if (!hasAvailableProduct()) {
    alert("Coupon cannot be applied because no available products remain.");
    return;
  }

  const input = document.querySelector(".coupon-box input").value.trim();
  let discount = 0;

  if (input === "FIRST 500") discount = 500;

  document.getElementById("discountAmount").textContent = "₹" + discount;

  updateBillingTotals();
});

/* OUT OF STOCK FUNCTION */

function markOutOfStock(productRow) {
  const warning = document.getElementById("stockWarning");
  warning.classList.remove("hidden");

  productRow.classList.add("out-of-stock");

  const deleteBtn = productRow.querySelector(".delete-btn");
  deleteBtn.style.filter =
    "brightness(0) saturate(100%) invert(23%) sepia(97%) saturate(7481%) hue-rotate(357deg) brightness(103%) contrast(118%)";

  const qtyBox = productRow.querySelector(".qty-box");
  qtyBox.querySelectorAll("img").forEach((icon) => {
    icon.style.filter = "grayscale(1) opacity(0.4)";
  });
  qtyBox.querySelector("span").style.color = "#a2a2a2";

  qtyBox.style.pointerEvents = "none";
}

/*  CLOSE OUT OF STOCK POPUP */
document.getElementById("closeWarning").addEventListener("click", () => {
  document.getElementById("stockWarning").classList.add("hidden");
});

document.querySelectorAll(".delete-btn").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const productRows = document.querySelectorAll(".product-row");
    const productRow = productRows[index];

    const hr = productRow.nextElementSibling;
    productRow.remove();

    if (hr && hr.tagName === "HR") {
      hr.remove();
    }

    updateBillingTotals();

    setTimeout(() => {
      if (!hasAvailableProduct()) {
        document.getElementById("discountAmount").textContent = "₹0";
        document.querySelector(".apply-btn").textContent = "Apply";
      }
    }, 50);
  });
});

// UPDATE CONTINUE BUTTON VALIDATION

document.getElementById("continueBtn").addEventListener("click", () => {
  const isFullNameValid = validateFullName();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();
  const isHnoValid = validateHno();
  const isLaneValid = validateLane();
  const isCityValid = validateCity();
  const isZipValid = validateZip();
  const isStateValid = validateState();

  if (
    !isFullNameValid ||
    !isEmailValid ||
    !isPhoneValid ||
    !isHnoValid ||
    !isLaneValid ||
    !isCityValid ||
    !isZipValid ||
    !isStateValid
  ) {
    return;
  }

  document.getElementById("billingCard").classList.add("show");

  try {
    const deliveryCard = document.querySelector(".delivery-card");
    if (deliveryCard) deliveryCard.classList.add("hidden");

    const billingCard = document.getElementById("billingCard");
    const isTablet = window.matchMedia(
      "(min-width: 320px) and (max-width: 1024px)"
    ).matches;

    if (billingCard) {
      if (isTablet) {
        billingCard.classList.add("show-on-tablet");
      } else {
        billingCard.classList.remove("hidden");
        billingCard.classList.add("show");
      }
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const hno = document.getElementById("hno").value.trim();
    const lane = document.getElementById("lane").value.trim();
    const landmark = document.getElementById("landmark").value.trim();
    const city = document.getElementById("city").value.trim();
    const zip = document.getElementById("zip").value.trim();
    const state = document.getElementById("state").value.trim();

    const fullAddress = `${hno}, ${lane}${
      landmark ? ", " + landmark : ""
    }, ${city}, ${state}, ${zip}`;

    document.getElementById("billing-saved-address-container").innerHTML = `
      <h3 class="billing-address-heading">Delivery Address</h3>
      <div class="billing-address-block">
        <p class="billing-text">${name}</p>
        <p class="billing-text">${fullAddress}</p>
        <p class="billing-text">${email}</p>
        <p class="billing-text">${phone}</p>
        <label class="use-detail">
          <input type="checkbox" id="billingAddressCheck" checked />
          <span class="checkmark"></span>
          Use this delivery detail
        </label>
      </div>
    `;

    const savedAddress = document.getElementById("saved-address-section");
    const billingSavedContainer = document.getElementById(
      "billing-saved-address-container"
    );

    if (savedAddress && billingSavedContainer) {
      savedAddress.classList.remove("hidden");
      billingSavedContainer.appendChild(savedAddress);
      savedAddress.classList.add("billing-plain-address", "moved-to-billing");

      const newBtn = savedAddress.querySelector(".new-address-btn");
      if (newBtn) newBtn.style.display = "none";

      savedAddress
        .querySelectorAll(".address-delete-btn")
        .forEach((btn) => (btn.style.display = "none"));

      savedAddress.querySelectorAll(".address-card").forEach((card) => {
        card.style.border = "none";
        card.style.background = "transparent";
        card.style.padding = "0";
        card.style.marginBottom = "8px";
      });
    }

    if (typeof updateBillingTotals === "function") updateBillingTotals();
    if (typeof updatePayButton === "function") updatePayButton();

    handleBillingPayButton();

    // ⭐ YOUR NEW REQUIRED LINE — change top heading
    updateTopLabel("billing");
  } catch (err) {
    console.error("Continue navigation error:", err);
  }
});

// ENABLE PAY BUTTON WHEN BILLING CHECKBOX IS CHECKED
function handleBillingPayButton() {
  const chk = document.getElementById("billingAddressCheck");
  const payBtn = document.querySelector(".pay-btn");

  if (!chk || !payBtn) return;

  if (chk.checked) {
    payBtn.style.background = "#A10404";
    payBtn.style.cursor = "pointer";
    payBtn.disabled = false;
  } else {
    payBtn.style.background = "#716B6B";
    payBtn.style.cursor = "not-allowed";
    payBtn.disabled = true;
  }
}

document.addEventListener("change", (e) => {
  if (e.target.id === "billingAddressCheck") {
    handleBillingPayButton();
  }
});

/* MAKE COUPON READONLY & CHANGE APPLY TO APPLIED */
const couponInput = document.querySelector(".coupon-box input");
couponInput.readOnly = true;

document.querySelector(".apply-btn").addEventListener("click", function () {
  this.textContent = "Applied";
  this.style.color = "#a10404";
});

/* CHECK IF ANY AVAILABLE PRODUCT EXISTS */
function hasAvailableProduct() {
  return [...document.querySelectorAll(".product-row")].some(
    (row) => !row.classList.contains("out-of-stock")
  );
}

// DELIVERY VALIDATION

document.getElementById("name").addEventListener("input", function () {
  this.value = this.value.replace(/[^A-Za-z ]/g, "");
});

document.getElementById("email").addEventListener("input", function () {
  this.value = this.value.replace(/[^a-zA-Z0-9@._-]/g, "");
});

document.getElementById("phone").addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");
  if (this.value.length > 10) {
    this.value = this.value.slice(0, 10);
  }
});

document.getElementById("hno").addEventListener("input", function () {
  this.value = this.value.replace(/[^A-Za-z0-9 -]/g, "");
});

document.getElementById("lane").addEventListener("input", function () {
  this.value = this.value.replace(/[^A-Za-z ]/g, "");
});

document.getElementById("city").addEventListener("input", function () {
  this.value = this.value.replace(/[^A-Za-z ]/g, "");
});

document.getElementById("state").addEventListener("input", function () {
  this.value = this.value.replace(/[^A-Za-z ]/g, "");
});

document.getElementById("zip").addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");
  if (this.value.length > 6) {
    this.value = this.value.slice(0, 6);
  }
});

// POPUP FIELD INPUT SANITIZATION

document.getElementById("p-name").addEventListener("input", function () {
  this.value = this.value.replace(/[^A-Za-z ]/g, "");
});

document.getElementById("p-email").addEventListener("input", function () {
  this.value = this.value.replace(/[^a-zA-Z0-9@._-]/g, "");
});

document.getElementById("p-phone").addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");
  if (this.value.length > 10) {
    this.value = this.value.slice(0, 10);
  }
});

document.getElementById("p-hno").addEventListener("input", function () {
  this.value = this.value.replace(/[^A-Za-z0-9 -]/g, "");
});

document.getElementById("p-lane").addEventListener("input", function () {
  this.value = this.value.replace(/[^A-Za-z ]/g, "");
});

document.getElementById("p-city").addEventListener("input", function () {
  this.value = this.value.replace(/[^A-Za-z ]/g, "");
});

document.getElementById("p-state").addEventListener("input", function () {
  this.value = this.value.replace(/[^A-Za-z ]/g, "");
});

document.getElementById("p-zip").addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");
  if (this.value.length > 6) {
    this.value = this.value.slice(0, 6);
  }
});

// BILLING QUANTITY LOGIC

document.querySelectorAll(".product-row").forEach((row) => {
  const qtySpan = row.querySelector(".qty-box span");
  const priceBox = row.querySelector(".price .rupee");

  const basePrice = Number.parseInt(
    priceBox.textContent.replace("₹", "").replace(/,/g, "")
  );

  const minusBtn = row.querySelector(".qty-box button:nth-child(1)");
  const plusBtn = row.querySelector(".qty-box button:nth-child(3)");

  plusBtn.addEventListener("click", () => {
    let qty = Number.parseInt(qtySpan.textContent);
    if (qty >= 5) return;
    qty++;
    qtySpan.textContent = qty;

    priceBox.textContent = "₹" + (basePrice * qty).toLocaleString();

    updateBillingTotals();
  });

  minusBtn.addEventListener("click", () => {
    let qty = Number.parseInt(qtySpan.textContent);
    if (qty > 1) {
      qty--;
      qtySpan.textContent = qty;

      priceBox.textContent = "₹" + (basePrice * qty).toLocaleString();

      updateBillingTotals();
    }
  });
});

// UPDATE BILLING TOTALS

function updateBillingTotals() {
  let subtotal = 0;

  document.querySelectorAll(".product-row").forEach((row) => {
    if (!row.isConnected) return;

    if (row.classList.contains("out-of-stock")) return;

    const priceText = row.querySelector(".rupee").textContent;
    const price = Number.parseInt(priceText.replace("₹", "").replace(/,/g, ""));
    subtotal += price;
  });

  document.getElementById("subtotalAmount").textContent =
    subtotal.toLocaleString();

  const gst = Math.round(subtotal * 0.1);
  document.getElementById("gstAmount").textContent = gst.toLocaleString();

  const discountText = document.getElementById("discountAmount").textContent;
  const discount = Number.parseInt(discountText.replace("₹", "").trim()) || 0;

  const payable = subtotal + gst - discount;
  document.getElementById("payableAmount").textContent =
    payable.toLocaleString();
}

markOutOfStock(document.querySelectorAll(".product-row")[1]);

function updateTopLabel(section) {
  const label = document.getElementById("pageHeading");
  if (!label) return;

  if (section === "delivery") label.textContent = "Delivery Details";
  if (section === "billing") label.textContent = "Billing Details";
}
