document.getElementById("back-btn").addEventListener("click", () => {
  window.location.href = "../html/productcatalog.html";
});

document.addEventListener("DOMContentLoaded", () => {
  updatePayButtonState();
});

document.addEventListener("change", (e) => {
  if (e.target.matches("#address-list .use-detail input")) {
    updatePayButtonState();
  }
});

function updatePayButtonState() {
  const payBtn = document.getElementById("pay-btn");
  if (!payBtn) return;

  const deliveryChecked = document.querySelector(
    "#address-list .use-detail input:checked"
  );
  const billingChecked = document.getElementById("billingAddressCheck");

  const anyChecked =
    deliveryChecked || (billingChecked && billingChecked.checked);

  if (anyChecked) {
    payBtn.disabled = false;
    payBtn.style.background = "#A10404";
    payBtn.style.cursor = "pointer";
  } else {
    payBtn.disabled = true;
    payBtn.style.background = "#716B6B";
    payBtn.style.cursor = "not-allowed";
  }
}

document.addEventListener("click", (e) => {
  const payBtn = document.getElementById("pay-btn");
  if (!payBtn) return;

  if (e.target === payBtn) {
    const deliveryChecked = document.querySelector(
      "#address-list .use-detail input:checked"
    );
    const billingChecked = document.getElementById("billingAddressCheck");

    if (!deliveryChecked && !(billingChecked && billingChecked.checked)) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    window.location.href = "../html/paymentgateway.html";
  }
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

function validateFullName() {
  const input = document.getElementById("name");
  const value = input.value;

  if (value.trim() === "") {
    showError(input, "nameError", "Please enter your name");
    return false;
  }

  if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(value)) {
    showError(input, "nameError", "Only alphabets allowed");
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
  const value = input.value;

  if (!/^[1-9][0-9]{5}$/.test(value)) {
    showError(input, "zipError", "Enter valid 6-digit pincode");
    return false;
  }

  if (/^(\d)\1+$/.test(value)) {
    showError(input, "zipError", "Pincode cannot contain repeating digits");
    return false;
  }

  clearError(input, "zipError");
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

  const hnoRegex = /^(?!\s)[A-Za-z0-9#@\-_=+&* ]+$/;
  if (!hnoRegex.test(input.value)) {
    showError(input, "hnoError", "Invalid format");
    return false;
  }

  clearError(input, "hnoError");
  return true;
}

function validateLandmark() {
  const input = document.getElementById("landmark");
  const value = input.value;

  if (value.trim() === "") {
    clearError(input, "landmarkError");
    return true;
  }

  if (/^\s/.test(value)) {
    showError(input, "landmarkError", "Space not allowed at first");
    return false;
  }

  const regex = /^[A-Za-z0-9.,#@&* ]+$/;
  if (!regex.test(value)) {
    showError(input, "landmarkError", "Invalid characters used");
    return false;
  }

  clearError(input, "landmarkError");
  return true;
}

function validateLane() {
  const input = document.getElementById("lane");
  const value = input.value.trim();

  if (value === "") {
    showError(input, "laneError", "Please enter area / lane");
    return false;
  }

  if (/^\s/.test(input.value)) {
    showError(input, "laneError", "Space not allowed at first");
    return false;
  }

  if (!/^[A-Za-z0-9 ]+$/.test(input.value)) {
    showError(input, "laneError", "Invalid format");
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

  if (/^\s/.test(input.value)) {
    showError(input, "cityError", "City cannot start with space");
    return false;
  }

  const regex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
  if (!regex.test(input.value)) {
    showError(input, "cityError", "Only alphabets allowed");
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

  const regex = /^[A-Za-z ]+$/;
  if (!regex.test(input.value)) {
    showError(input, "stateError", "Only alphabets allowed");
    return false;
  }

  clearError(input, "stateError");
  return true;
}

/* POPUP VALIDATION FUNCTIONS */

function validatePopupName() {
  const input = document.getElementById("p-name");
  const value = input.value;

  if (value.trim() === "") {
    showError(input, "p-nameError", "Please enter your name");
    return false;
  }

  const regex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
  if (!regex.test(value)) {
    showError(input, "p-nameError", "Only alphabets allowed");
    return false;
  }

  clearError(input, "p-nameError");
  return true;
}

function validatePopupLandmark() {
  const input = document.getElementById("p-landmark");
  const value = input.value;

  if (value.trim() === "") {
    clearError(input, "p-landmarkError");
    return true;
  }

  if (/^\s/.test(value)) {
    showError(input, "p-landmarkError", "Space not allowed at first");
    return false;
  }

  const regex = /^[A-Za-z0-9.,#@&* ]+$/;
  if (!regex.test(value)) {
    showError(input, "p-landmarkError", "Invalid characters used");
    return false;
  }

  clearError(input, "p-landmarkError");
  return true;
}

function validatePopupEmail() {
  const input = document.getElementById("p-email");
  const value = input.value.trim();

  if (value === "") {
    showError(input, "p-emailError", "Please enter your email");
    return false;
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(value)) {
    showError(input, "p-emailError", "Enter valid email");
    return false;
  }

  clearError(input, "p-emailError");
  return true;
}

function validatePopupPhone() {
  const input = document.getElementById("p-phone");
  const value = input.value;

  if (!/^[6-9][0-9]{9}$/.test(value)) {
    showError(input, "p-phoneError", "Enter valid 10-digit number");
    return false;
  }

  clearError(input, "p-phoneError");
  return true;
}

function validatePopupHno() {
  const input = document.getElementById("p-hno");
  const value = input.value.trim();

  if (value === "") {
    showError(input, "p-hnoError", "Enter house no / society");
    return false;
  }

  const regex = /^(?!\s)[A-Za-z0-9#@\-_=+&* ]+$/;
  if (!regex.test(input.value)) {
    showError(input, "p-hnoError", "Invalid format");
    return false;
  }

  clearError(input, "p-hnoError");
  return true;
}

function validatePopupLane() {
  const input = document.getElementById("p-lane");

  if (input.value.trim() === "") {
    showError(input, "p-laneError", "Please enter area / lane");
    return false;
  }

  if (/^\s/.test(input.value)) {
    showError(input, "p-laneError", "Space not allowed at first");
    return false;
  }

  if (!/^[A-Za-z0-9 ]+$/.test(input.value)) {
    showError(input, "p-laneError", "Invalid format");
    return false;
  }

  clearError(input, "p-laneError");
  return true;
}

function validatePopupCity() {
  const input = document.getElementById("p-city");
  const value = input.value;

  if (value.trim() === "") {
    showError(input, "p-cityError", "Enter city");
    return false;
  }

  const regex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
  if (!regex.test(value)) {
    showError(input, "p-cityError", "Only alphabets allowed");
    return false;
  }

  clearError(input, "p-cityError");
  return true;
}

function validatePopupZip() {
  const input = document.getElementById("p-zip");
  const value = input.value;

  if (!/^[1-9][0-9]{5}$/.test(value)) {
    showError(input, "p-zipError", "Enter valid 6-digit pincode");
    return false;
  }

  if (/^(\d)\1+$/.test(value)) {
    showError(input, "p-zipError", "Pincode cannot have repeated digits");
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

  const regex = /^[A-Za-z ]+$/;
  if (!regex.test(input.value)) {
    showError(input, "p-stateError", "Only alphabets allowed");
    return false;
  }

  clearError(input, "p-stateError");
  return true;
}

/* BLUR EVENT LISTENERS */

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

document.getElementById("landmark").addEventListener("blur", () => {
  validateLandmark();
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

/* POPUP BLUR EVENT LISTENERS */

document.getElementById("p-name").addEventListener("blur", () => {
  validatePopupName();
});

document.getElementById("p-landmark").addEventListener("blur", () => {
  validateLandmark();
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

/* INPUT EVENT VALIDATION */

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

/* POPUP INPUT EVENT LISTENERS */

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

/* Single entry point for all Pay Button state handling */
function refreshPayButtonState() {
  updatePayButtonState();
  updatePayButton();
  handleBillingPayButton();
  syncPayBtnForMobileTab();
}

/* SAVE DELIVERY FORM */
document.getElementById("saveAddressBtn").addEventListener("click", () => {
  const isFullNameValid = validateFullName();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();
  const isHnoValid = validateHno();
  const isLaneValid = validateLane();
  const isCityValid = validateCity();
  const isZipValid = validateZip();
  const isStateValid = validateState();
  const isLandmarkValid = validateLandmark();

  if (
    !isFullNameValid ||
    !isEmailValid ||
    !isPhoneValid ||
    !isHnoValid ||
    !isLaneValid ||
    !isLandmarkValid ||
    !isCityValid ||
    !isZipValid ||
    !isStateValid
  ) {
    return;
  }

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

  refreshPayButtonState();

  document.getElementById("saved-address-section").classList.remove("hidden");

  document
    .querySelectorAll(".form-group, .inline-row, .sub-heading")
    .forEach((el) => el.classList.add("hide"));
  document.getElementById("saveAddressBtn").classList.add("hide");
});

/* OPEN INLINE POPUP */
document.getElementById("openPopupBtn").addEventListener("click", () => {
  const popupFields = [
    "p-name",
    "p-email",
    "p-phone",
    "p-hno",
    "p-lane",
    "p-landmark",
    "p-city",
    "p-zip",
    "p-state",
  ];

  popupFields.forEach((id) => {
    const field = document.getElementById(id);
    if (field) field.value = "";

    const error = document.getElementById(id + "Error");
    if (error) error.textContent = "";

    if (field) field.classList.remove("error");
  });

  document.getElementById("inlinePopup").classList.remove("hidden");
});

/* CLOSE INLINE POPUP */
document.getElementById("closeInlinePopup").addEventListener("click", () => {
  document.getElementById("inlinePopup").classList.add("hidden");
});

/* POPUP SAVE BUTTON */
document.getElementById("popupSaveBtn").addEventListener("click", () => {
  const isPopupNameValid = validatePopupName();
  const isPopupEmailValid = validatePopupEmail();
  const isPopupPhoneValid = validatePopupPhone();
  const isPopupHnoValid = validatePopupHno();
  const isPopupLaneValid = validatePopupLane();
  const isPopupCityValid = validatePopupCity();
  const isPopupZipValid = validatePopupZip();
  const isPopupStateValid = validatePopupState();
  const isPopupLandmarkValid = validatePopupLandmark();

  if (
    !isPopupNameValid ||
    !isPopupLandmarkValid ||
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

  const fullAddress = `${hno}, ${lane}${
    landmark ? ", " + landmark : ""
  }, ${city}, ${state}, ${zip}`;

  const template = document.getElementById("address-template");
  const newCard = template.cloneNode(true);
  newCard.classList.remove("hidden");

  newCard.querySelector(".add-name").textContent = name;
  newCard.querySelector(".add-email").textContent = email;
  newCard.querySelector(".add-phone").textContent = phone;
  newCard.querySelector(".add-full").textContent = fullAddress;

  document.getElementById("address-list").appendChild(newCard);

  document
    .querySelectorAll("#address-list .use-detail input")
    .forEach((chk) => (chk.checked = false));

  const newCheckbox = newCard.querySelector(".use-detail input");
  if (newCheckbox) newCheckbox.checked = true;

  refreshPayButtonState();

  document.getElementById("inlinePopup").classList.add("hidden");
});

/* DELETE ADDRESS */
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("address-delete-btn")) {
    const card = e.target.closest(".address-wrapper");
    if (card) card.remove();

    setTimeout(() => {
      const remaining = document.querySelectorAll(
        "#address-list .address-wrapper"
      );

      if (remaining.length === 0) {
        const deliveryCard = document.querySelector(".delivery-card");
        const savedSection = document.getElementById("saved-address-section");
        const billingCard = document.getElementById("billingCard");

        if (deliveryCard) deliveryCard.classList.remove("hidden");
        if (savedSection) savedSection.classList.add("hidden");

        if (billingCard) {
          billingCard.classList.remove("show");
          billingCard.classList.remove("show-on-tablet");
        }

        document
          .querySelectorAll(".form-group, .inline-row, .sub-heading")
          .forEach((el) => el.classList.remove("hide"));

        const saveBtn = document.getElementById("saveAddressBtn");
        if (saveBtn) saveBtn.classList.remove("hide");

        const fields = [
          "name",
          "email",
          "phone",
          "hno",
          "lane",
          "landmark",
          "city",
          "zip",
          "state",
        ];

        fields.forEach((id) => {
          const input = document.getElementById(id);
          if (input) {
            input.value = "";
            input.classList.remove("error");
          }

          const err = document.getElementById(id + "Error");
          if (err) err.textContent = "";
        });

        refreshPayButtonState();
      } else {
        const allChecks = [
          ...document.querySelectorAll("#address-list .use-detail input"),
        ];
        const anyChecked = allChecks.some((chk) => chk.checked);

        if (!anyChecked && allChecks.length > 0) {
          allChecks[0].checked = true;
        }

        refreshPayButtonState();
      }
    }, 50);
  }
});

/* ADDRESS CHECKBOX LOGIC */

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

/* CLOSE OUT OF STOCK POPUP */
document.getElementById("closeWarning").addEventListener("click", () => {
  document.getElementById("stockWarning").classList.add("hidden");
});

/* DELETE product-row */
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const row = e.target.closest(".product-row");
    if (!row) return;

    const hr = row.nextElementSibling;
    row.remove();
    if (hr && hr.tagName === "HR") hr.remove();

    updateBillingTotals();
    updateCartItemCount();

    setTimeout(() => {
      let needsWarning = false;
      document.querySelectorAll(".product-row").forEach((r) => {
        const s = Number.parseInt(r.dataset.stock);
        const q =
          Number.parseInt(r.querySelector(".qty-box span")?.textContent) || 0;
        if (!Number.isNaN(s) && q > s) needsWarning = true;
      });

      const stockBox = document.getElementById("stockLimitWarning");
      if (!needsWarning && stockBox) {
        stockBox.classList.add("hidden");
      }
    }, 120);
  }
});

/* CONTINUE BUTTON VALIDATION */

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
      <div class="billing-address-header">
        <h3 class="billing-address-heading">Delivery Address</h3>
        <span class="billing-change-btn">Change</span>
      </div>
      <div class="billing-address-block">
        <p class="billing-text">${name}</p>
        <p class="billing-text">${fullAddress}</p>
        <p class="billing-text">${email}</p>
        <p class="billing-text">${phone}</p>
        <label class="use-detail use-detail-row">
          <input type="checkbox" id="billingAddressCheck" checked />
          <span class="checkmark"></span>
          Use this delivery detail
          <span class="billing-delete-icon">
            <img src="../assets/cart/delete.svg" />
          </span>
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

    refreshPayButtonState();

    updateTopLabel("billing");
  } catch (err) {
    console.error("Continue navigation error:", err);
  }
});

/* ENABLE PAY BUTTON WHEN BILLING CHECKBOX IS CHECKED */
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

/* DELIVERY VALIDATION */

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

/* POPUP FIELD INPUT SANITIZATION */

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

/* BILLING QUANTITY LOGIC */

document.querySelectorAll(".product-row").forEach((row) => {
  const qtySpan = row.querySelector(".qty-box span");
  const priceBox = row.querySelector(".price .rupee");

  const basePrice = Number(priceBox.dataset.unit);

  const minusBtn = row.querySelector(".qty-box button:nth-child(1)");
  const plusBtn = row.querySelector(".qty-box button:nth-child(3)");

  const stock = Number.parseInt(row.dataset.stock);
  const availableStock = Number.isNaN(stock) ? Number.POSITIVE_INFINITY : stock;

  if (availableStock === 0) {
    markOutOfStock(row);
  }

  plusBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    let qty = Number.parseInt(qtySpan.textContent) || 0;

    if (qty >= availableStock) {
      const stockBox = document.getElementById("stockLimitWarning");
      const txt = stockBox.querySelector(".warning-text");
      txt.textContent = `We have only ${availableStock} items available`;
      stockBox.classList.remove("hidden");
      return;
    }

    qty++;
    qtySpan.textContent = qty;

    priceBox.textContent = "₹" + (basePrice * qty).toLocaleString();

    updateBillingTotals();
  });

  minusBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    let qty = Number.parseInt(qtySpan.textContent) || 0;

    if (qty > 1) {
      qty--;
      qtySpan.textContent = qty;

      priceBox.textContent = "₹" + (basePrice * qty).toLocaleString();

      updateBillingTotals();
    }
  });
});

/* UPDATE BILLING TOTALS */

let couponApplied = false;

function updateBillingTotals() {
  let subtotal = 0;

  document.querySelectorAll(".product-row").forEach((row) => {
    if (!row.isConnected) return;

    if (row.classList.contains("out-of-stock")) return;

    const unitPrice = Number(row.querySelector(".rupee").dataset.unit);
    const qty = Number(row.querySelector(".qty-box span").textContent);

    subtotal += unitPrice * qty;
  });

  document.getElementById("subtotalAmount").textContent =
    subtotal.toLocaleString();

  const gst = Math.round(subtotal * 0.1);
  document.getElementById("gstAmount").textContent = gst.toLocaleString();

  let discount = 0;
  const discountBox = document.getElementById("discountAmount");
  const applyBtn = document.getElementById("applyCouponBtn");

  if (subtotal < 500 && subtotal > 0) {
    couponApplied = false;
    discountBox.textContent = "₹0";

    applyBtn.disabled = true;
    applyBtn.style.opacity = "0.5";
    applyBtn.style.pointerEvents = "none";
    applyBtn.style.color = "#3f3f3f";
    applyBtn.style.cursor = "not-allowed";
    applyBtn.textContent = "Apply";
  } else {
    applyBtn.disabled = false;
    applyBtn.style.opacity = "1";
    applyBtn.style.pointerEvents = "auto";
    applyBtn.style.color = "";
    applyBtn.style.cursor = "pointer";

    if (couponApplied) {
      const discountText = discountBox.textContent;
      discount = Number.parseInt(discountText.replace("₹", "")) || 0;
      applyBtn.textContent = "Remove";
    } else {
      discount = 0;
      discountBox.textContent = "₹0";
      applyBtn.textContent = "Apply";
    }
  }

  let deliveryCharge = 0;

  if (subtotal > 0 && subtotal < 500) {
    deliveryCharge = 49;
    document.querySelector(".free").textContent =
      "₹" + deliveryCharge.toLocaleString();
    document.querySelector(".free").style.color = "#3f3f3f";
  } else {
    deliveryCharge = 0;
    document.querySelector(".free").textContent = "Free delivery";
    document.querySelector(".free").style.color = "#009605";
  }

  const payable = subtotal + gst - discount + deliveryCharge;

  document.getElementById("payableAmount").textContent =
    payable.toLocaleString();
}

/* APPLY / REMOVE COUPON BUTTON */
document
  .getElementById("applyCouponBtn")
  .addEventListener("click", function () {
    if (this.disabled) return;

    const discountBox = document.getElementById("discountAmount");

    if (couponApplied) {
      couponApplied = false;
      discountBox.textContent = "₹0";
      this.textContent = "Apply";
      updateBillingTotals();
      return;
    }

    couponApplied = true;

    const discountValue = 500;
    discountBox.textContent = "₹" + discountValue;

    this.textContent = "Remove";

    updateBillingTotals();
  });

markOutOfStock(document.querySelectorAll(".product-row")[1]);

function updateTopLabel(section) {
  const label = document.getElementById("pageHeading");
  if (!label) return;

  if (section === "delivery") label.textContent = "Delivery Details";
  if (section === "billing") label.textContent = "Billing Details";
}

/* AUTO UPDATE CART ITEM COUNT */

function updateCartItemCount() {
  const items = document.querySelectorAll(".product-row");
  const count = items.length;

  const totalItemsEl = document.querySelector(".total-items");
  if (totalItemsEl) {
    totalItemsEl.textContent = `Total Items - ${count}`;
  }

  const totalItemsMobileEl = document.querySelector(".total-items-mobile");
  if (totalItemsMobileEl) {
    totalItemsMobileEl.textContent = `${count} Items`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartItemCount();
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const row = e.target.closest(".product-row");
    if (row) row.remove();

    updateCartItemCount();
  }
});

/* CLOSE LIMIT WARNING */
document
  .getElementById("closeStockLimitWarning")
  .addEventListener("click", () => {
    document.getElementById("stockLimitWarning").classList.add("hidden");
  });

function checkOutOfStockRows() {
  const rows = document.querySelectorAll(".product-row");
  let hasOutOfStock = false;

  rows.forEach((row) => {
    const stock = Number.parseInt(row.dataset.stock);
    if (stock === 0) {
      hasOutOfStock = true;
    }
  });

  const stockWarning = document.getElementById("stockWarning");

  if (!hasOutOfStock && stockWarning) {
    stockWarning.classList.add("hidden");
  }
}

document.querySelectorAll(".delete-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    setTimeout(() => {
      checkOutOfStockRows();
    }, 120);
  });
});

window.addEventListener("DOMContentLoaded", updateBillingTotals);
window.addEventListener("DOMContentLoaded", syncPayBtnForMobileTab);

function syncPayBtnForMobileTab() {
  const payBtn = document.getElementById("pay-btn");
  if (!payBtn) return;

  const isMobileOrTab = window.matchMedia("(max-width: 1024px)").matches;
  if (!isMobileOrTab) return;

  const deliveryChecked = document.querySelector(
    "#address-list .use-detail input:checked"
  );

  const billingChecked = document.getElementById("billingAddressCheck");

  const enable =
    !!deliveryChecked || (billingChecked && billingChecked.checked);

  payBtn.disabled = !enable;
  payBtn.style.background = enable ? "#A10404" : "#716B6B";
  payBtn.style.cursor = enable ? "pointer" : "not-allowed";
}

document.addEventListener("change", (e) => {
  if (
    e.target.matches("#address-list .use-detail input") ||
    e.target.id === "billingAddressCheck"
  ) {
    syncPayBtnForMobileTab();
  }
});

/* BILLING CHANGE HANDLER */

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("billing-change-btn")) return;

  const isMobileOrTab = window.matchMedia("(max-width: 1024px)").matches;
  if (!isMobileOrTab) return;

  const billingCard = document.getElementById("billingCard");
  if (billingCard) {
    billingCard.classList.remove("show", "show-on-tablet");
    billingCard.classList.add("hidden");
  }

  const deliveryCard = document.querySelector(".delivery-card");
  if (deliveryCard) {
    deliveryCard.classList.remove("hidden");
  }

  const fields = [
    "name",
    "email",
    "phone",
    "hno",
    "lane",
    "landmark",
    "city",
    "zip",
    "state",
  ];

  fields.forEach((id) => {
    const input = document.getElementById(id);
    if (input) {
      input.value = "";
      input.classList.remove("error");
    }

    const err = document.getElementById(id + "Error");
    if (err) {
      err.textContent = "";
      err.style.display = "none";
    }
  });

  document
    .querySelectorAll(".form-group, .inline-row, .sub-heading")
    .forEach((el) => el.classList.remove("hide"));

  const saveBtn = document.getElementById("saveAddressBtn");
  if (saveBtn) saveBtn.classList.remove("hide");

  refreshPayButtonState();

  if (typeof updateTopLabel === "function") {
    updateTopLabel("delivery");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* BILLING DELETE HANDLER */

document.addEventListener("click", (e) => {
  if (!e.target.closest(".billing-delete-icon")) return;

  const isMobileOrTab = window.matchMedia("(max-width: 1024px)").matches;
  if (!isMobileOrTab) return;

  const billingContainer = document.getElementById(
    "billing-saved-address-container"
  );
  if (billingContainer) billingContainer.innerHTML = "";

  const billingCard = document.getElementById("billingCard");
  if (billingCard) {
    billingCard.classList.remove("show", "show-on-tablet");
    billingCard.classList.add("hidden");
  }

  const deliveryCard = document.querySelector(".delivery-card");
  if (deliveryCard) {
    deliveryCard.classList.remove("hidden");
  }

  const fields = [
    "name",
    "email",
    "phone",
    "hno",
    "lane",
    "landmark",
    "city",
    "zip",
    "state",
  ];

  fields.forEach((id) => {
    const input = document.getElementById(id);
    if (input) {
      input.value = "";
      input.classList.remove("error");
    }

    const err = document.getElementById(id + "Error");
    if (err) {
      err.textContent = "";
      err.style.display = "none";
    }
  });

  document
    .querySelectorAll(".form-group, .inline-row, .sub-heading")
    .forEach((el) => el.classList.remove("hide"));

  const saveBtn = document.getElementById("saveAddressBtn");
  if (saveBtn) saveBtn.classList.remove("hide");

  refreshPayButtonState();

  if (typeof updateTopLabel === "function") {
    updateTopLabel("delivery");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
});
