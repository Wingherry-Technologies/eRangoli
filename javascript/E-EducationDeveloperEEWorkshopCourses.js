// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon = document.querySelector("#hamburger-menu>img");

hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display = "none";
    document.querySelector("body").style.overflow = "hidden";
    window.scrollTo(0, 0);
  } else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow = "auto";
    document.querySelector(".bottom-nav").style.display = "flex";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const filterBtn = document.getElementById("EEDWCT-filterBtn");
  const sortBtn = document.getElementById("EEDWCT-sortBtn");

  const filterPopup = document.getElementById("EEDWCT-filterPopup");
  const sortPopup = document.getElementById("EEDWCT-sortPopup");

  const table = document.querySelector(".EEDWCT-table");
  const countText = document.querySelector(".EEDWCT-count");

  let rows = Array.from(
    document.querySelectorAll(
      ".EEDWCT-table .EEDWCT-row:not(.EEDWCT-header-row)",
    ),
  );

  function updateCount() {
    const visibleRows = rows.filter((row) => row.style.display !== "none");

    countText.innerText = visibleRows.length + " Ongoing";
  }

  function checkNoRows() {
    const visibleRows = rows.filter((row) => row.style.display !== "none");

    let noRow = document.getElementById("EEDWCT-noRow");

    if (visibleRows.length === 0) {
      if (!noRow) {
        noRow = document.createElement("div");
        noRow.id = "EEDWCT-noRow";
        noRow.className = "EEDWCT-row";
        noRow.style.textAlign = "center";
        noRow.style.padding = "20px";
        noRow.innerHTML = "No rows found";

        table.appendChild(noRow);
      }
    } else {
      if (noRow) noRow.remove();
    }
  }

  filterBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    filterPopup.style.display =
      filterPopup.style.display === "block" ? "none" : "block";

    sortPopup.style.display = "none";
  });

  sortBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    sortPopup.style.display =
      sortPopup.style.display === "block" ? "none" : "block";

    filterPopup.style.display = "none";
  });

  document.addEventListener("click", function () {
    filterPopup.style.display = "none";
    sortPopup.style.display = "none";
  });

  const checkboxes = document.querySelectorAll(
    "#EEDWCT-filterPopup input[type='checkbox']",
  );

  checkboxes.forEach((box) => {
    box.addEventListener("change", function () {
      const selected = Array.from(checkboxes)
        .filter((c) => c.checked)
        .map((c) => c.value);

      rows.forEach((row) => {
        const status = row
          .querySelector(".EEDWCT-status-col span")
          .innerText.trim();

        if (selected.length === 0 || selected.includes(status)) {
          row.style.display = "grid";
        } else {
          row.style.display = "none";
        }
      });

      updateCount();
      checkNoRows();
    });
  });

  const sortOptions = document.querySelectorAll("#EEDWCT-sortPopup p");

  sortOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const text = option.innerText;

      if (text.includes("Latest")) {
        rows.sort((a, b) => {
          return getDate(b) - getDate(a);
        });
      }

      if (text.includes("Oldest")) {
        rows.sort((a, b) => {
          return getDate(a) - getDate(b);
        });
      }

      if (text.includes("High to Low") && text.includes("Amount")) {
        rows.sort((a, b) => {
          return getAmount(b) - getAmount(a);
        });
      }

      if (text.includes("Low to High") && text.includes("Amount")) {
        rows.sort((a, b) => {
          return getAmount(a) - getAmount(b);
        });
      }

      renderRows();
    });
  });

  function getDate(row) {
    const dateText = row.children[1].innerText;
    const parts = dateText.split("/");

    return new Date("20" + parts[2], parts[1] - 1, parts[0]);
  }

  function getAmount(row) {
    const text = row.children[4].innerText.replace(/[₹,]/g, "");
    return parseInt(text);
  }

  function renderRows() {
    rows.forEach((row) => table.appendChild(row));
  }

  updateCount();
});

function updateMobCount() {
  const mobCount = document.querySelector(".EEDWCT-mob-count");
  if (!mobCount) return;
  const mobItems = document.querySelectorAll(".EEDWCT-acc-item");
  mobCount.innerText = `${mobItems.length} Ongoing`;
}

updateMobCount();

const accHeaders = document.querySelectorAll(".EEDWCT-acc-header");

accHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    const body = header.nextElementSibling;
    const arrow = header.querySelector(".EEDWCT-arrow");

    body.classList.toggle("active");
    item.classList.toggle("active");

    arrow.style.transform = body.classList.contains("active")
      ? "rotate(180deg)"
      : "rotate(0deg)";
  });
});

const modal = document.getElementById("sponsorModal");
const closeModal = document.getElementById("closeModal");
const addNewBtn = document.querySelector(".add-new-btn");
const floatingPlusBtn = document.querySelector(".EEDWCT-floating-plus-btn");

function openModal() {
  modal.style.display = "flex";
  clearAllModalErrors();
  resetModalFields();
}

function closeModalFn() {
  modal.style.display = "none";
}

if (addNewBtn) addNewBtn.addEventListener("click", openModal);
if (floatingPlusBtn) floatingPlusBtn.addEventListener("click", openModal);
if (closeModal) closeModal.addEventListener("click", closeModalFn);

window.addEventListener("click", function (e) {
  if (e.target === modal) closeModalFn();
});

document
  .querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(5)")
  .classList.add("sidebar-active");
document
  .querySelector(".sidebar-main-vendor ul>ul:nth-of-type(3)")
  .classList.add("active");
document
  .querySelector(".sidebar-main-vendor ul>ul:nth-of-type(3)>li:nth-child(4)")
  .classList.add("submenu-active-highlight");

document
  .querySelector("#account-menu .mobile-dropdown:nth-child(5) .dropdown-header")
  .classList.add("dropdown-header-active");
document
  .querySelector("#account-menu .mobile-dropdown:nth-child(5)")
  .classList.add("active-mobile-submenu");
document
  .querySelector("#account-menu .mobile-dropdown:nth-child(5) li:nth-child(4)")
  .classList.add("submenu-active-page");

// ─── Helpers ────────────────────────────────────────────────────────────────

function showError(fieldId, errorId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  if (field) field.classList.add("EEDWCT-input-error");
  if (error) error.textContent = message;
}

function clearError(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  if (field) field.classList.remove("EEDWCT-input-error");
  if (error) error.textContent = "";
}

function clearAllWorkshopErrors() {
  [
    "EEDWCT-workshop-name",
    "EEDWCT-type",
    "EEDWCT-duration",
    "EEDWCT-price",
    "EEDWCT-location",
  ].forEach((id) => {
    clearError(id, id + "-error");
  });
}

function clearAllScheduleErrors() {
  ["EEDWCT-start-date", "EEDWCT-end-date", "EEDWCT-schedule-duration"].forEach(
    (id) => {
      clearError(id, id + "-error");
    },
  );
}

function clearAllCoordinatorErrors() {
  [
    "EEDWCT-coord-name",
    "EEDWCT-coord-mobile",
    "EEDWCT-coord-alt-mobile",
  ].forEach((id) => {
    clearError(id, id + "-error");
  });
}

function resetWorkshopFields() {
  const name = document.getElementById("EEDWCT-workshop-name");
  const type = document.getElementById("EEDWCT-type");
  const duration = document.getElementById("EEDWCT-duration");
  const price = document.getElementById("EEDWCT-price");
  const location = document.getElementById("EEDWCT-location");
  if (name) name.value = "";
  if (type) type.value = "";
  if (duration) duration.value = "";
  if (price) price.value = "";
  if (location) location.value = "";
  clearAllWorkshopErrors();
}

function resetScheduleFields() {
  const startDate = document.getElementById("EEDWCT-start-date");
  const endDate = document.getElementById("EEDWCT-end-date");
  const duration = document.getElementById("EEDWCT-schedule-duration");
  if (startDate) startDate.value = "";
  if (endDate) endDate.value = "";
  if (duration) duration.value = "";
  clearAllScheduleErrors();
}

function resetCoordinatorFields() {
  const name = document.getElementById("EEDWCT-coord-name");
  const mobile = document.getElementById("EEDWCT-coord-mobile");
  const altMobile = document.getElementById("EEDWCT-coord-alt-mobile");
  if (name) name.value = "";
  if (mobile) mobile.value = "";
  if (altMobile) altMobile.value = "";
  clearAllCoordinatorErrors();
}

// ─── Price Auto-Format (₹XXXX) ────────────────────────────────────────────────

function formatPriceInput(input) {
  let raw = input.value.replace(/[^\d]/g, "");
  if (raw.length === 0) {
    input.value = "";
    return;
  }
  // Format with commas for Indian number system
  let num = parseInt(raw, 10);
  let formatted = "₹" + num.toLocaleString("en-IN");
  input.value = formatted;
  // Place cursor at end
  setTimeout(
    () => input.setSelectionRange(input.value.length, input.value.length),
    0,
  );
}

// ─── Add Workshop Popup ───────────────────────────────────────────────────────

const addBtn = document.querySelector(".EEDWCT-add");
const workshopModal = document.getElementById("EEDWCT-modal");
const closeWorkshopModal = document.getElementById("EEDWCT-close");
const floatingBtn = document.querySelector(".EEDWCT-floating-plus-btn");

function openWorkshopModal() {
  workshopModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeWorkshopPopup() {
  workshopModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

if (addBtn) addBtn.addEventListener("click", openWorkshopModal);
if (floatingBtn) floatingBtn.addEventListener("click", openWorkshopModal);
if (closeWorkshopModal)
  closeWorkshopModal.addEventListener("click", closeWorkshopPopup);

window.addEventListener("click", (e) => {
  if (e.target === workshopModal) closeWorkshopPopup();
});

// Workshop Name: allow only alphabets and spaces
const workshopNameInput = document.getElementById("EEDWCT-workshop-name");
if (workshopNameInput) {
  workshopNameInput.addEventListener("keypress", (e) => {
    if (!/[a-zA-Z ]/.test(e.key)) e.preventDefault();
  });
  workshopNameInput.addEventListener("input", () => {
    workshopNameInput.value = workshopNameInput.value.replace(
      /[^a-zA-Z ]/g,
      "",
    );
    if (workshopNameInput.value.trim())
      clearError("EEDWCT-workshop-name", "EEDWCT-workshop-name-error");
  });
}

// Duration: allow only digits and colon, append " mins" while typing
const workshopDurationInput = document.getElementById("EEDWCT-duration");
if (workshopDurationInput) {
  workshopDurationInput.addEventListener("keydown", (e) => {
    // Allow: digits, colon, Backspace, Delete, Tab, Arrow keys, Home, End
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];
    if (allowedKeys.includes(e.key)) return;
    if (!/[\d:]/.test(e.key)) {
      e.preventDefault();
    }
  });

  workshopDurationInput.addEventListener("input", () => {
    // Strip everything except digits and colon
    let raw = workshopDurationInput.value
      .replace(/ mins$/, "")
      .replace(/[^\d:]/g, "");
    if (raw.length > 0) {
      workshopDurationInput.value = raw + " mins";
      // Place cursor before " mins"
      const pos = raw.length;
      workshopDurationInput.setSelectionRange(pos, pos);
    } else {
      workshopDurationInput.value = "";
    }
    if (raw.trim()) clearError("EEDWCT-duration", "EEDWCT-duration-error");
  });

  // On focus, position cursor before " mins"
  workshopDurationInput.addEventListener("focus", () => {
    if (workshopDurationInput.value.endsWith(" mins")) {
      const pos = workshopDurationInput.value.length - 5;
      setTimeout(() => workshopDurationInput.setSelectionRange(pos, pos), 0);
    }
  });

  // On click, prevent cursor landing in " mins" suffix
  workshopDurationInput.addEventListener("click", () => {
    if (workshopDurationInput.value.endsWith(" mins")) {
      const maxPos = workshopDurationInput.value.length - 5;
      if (workshopDurationInput.selectionStart > maxPos) {
        workshopDurationInput.setSelectionRange(maxPos, maxPos);
      }
    }
  });
}

// Price auto-format
const workshopPriceInput = document.getElementById("EEDWCT-price");
if (workshopPriceInput) {
  workshopPriceInput.addEventListener("keypress", (e) => {
    if (!/\d/.test(e.key)) e.preventDefault();
  });
  workshopPriceInput.addEventListener("input", () => {
    formatPriceInput(workshopPriceInput);
    if (workshopPriceInput.value.trim())
      clearError("EEDWCT-price", "EEDWCT-price-error");
  });
  workshopPriceInput.addEventListener("keydown", (e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      let raw = workshopPriceInput.value.replace(/[^\d]/g, "");
      raw = raw.slice(0, -1);
      workshopPriceInput.value = raw;
      if (raw.length > 0) formatPriceInput(workshopPriceInput);
    }
  });
}

// Type dropdown clear error on change
const workshopTypeSelect = document.getElementById("EEDWCT-type");
if (workshopTypeSelect) {
  workshopTypeSelect.addEventListener("change", () => {
    if (workshopTypeSelect.value)
      clearError("EEDWCT-type", "EEDWCT-type-error");
  });
}

// Location dropdown clear error on change
const workshopLocationSelect = document.getElementById("EEDWCT-location");
if (workshopLocationSelect) {
  workshopLocationSelect.addEventListener("change", () => {
    if (workshopLocationSelect.value)
      clearError("EEDWCT-location", "EEDWCT-location-error");
  });
}

// Workshop Continue Button Validation
const workshopContinueBtn = document.getElementById(
  "EEDWCT-workshop-continue-btn",
);
if (workshopContinueBtn) {
  workshopContinueBtn.addEventListener("click", () => {
    clearAllWorkshopErrors();
    let valid = true;

    const nameVal = workshopNameInput ? workshopNameInput.value.trim() : "";
    const typeVal = workshopTypeSelect ? workshopTypeSelect.value : "";
    const durationVal = workshopDurationInput
      ? workshopDurationInput.value.replace(/ mins$/, "").trim()
      : "";
    const priceVal = workshopPriceInput ? workshopPriceInput.value.trim() : "";
    const locationVal = workshopLocationSelect
      ? workshopLocationSelect.value
      : "";

    if (!nameVal) {
      showError(
        "EEDWCT-workshop-name",
        "EEDWCT-workshop-name-error",
        "Workshop name is required.",
      );
      valid = false;
    } else if (!/^[a-zA-Z ]+$/.test(nameVal)) {
      showError(
        "EEDWCT-workshop-name",
        "EEDWCT-workshop-name-error",
        "Only alphabets and spaces are allowed.",
      );
      valid = false;
    }

    if (!typeVal) {
      showError("EEDWCT-type", "EEDWCT-type-error", "Please select a type.");
      valid = false;
    }

    if (!durationVal) {
      showError(
        "EEDWCT-duration",
        "EEDWCT-duration-error",
        "Duration is required.",
      );
      valid = false;
    }

    if (!priceVal) {
      showError("EEDWCT-price", "EEDWCT-price-error", "Price is required.");
      valid = false;
    }

    if (!locationVal) {
      showError(
        "EEDWCT-location",
        "EEDWCT-location-error",
        "Please select a location.",
      );
      valid = false;
    }

    if (valid) {
      workshopModal.classList.remove("active");
      scheduleModal.classList.add("active");
    }
  });
}

// ─── Schedule Popup ────────────────────────────────────────────────────────────

const scheduleModal = document.getElementById("EEDWCT-schedule-modal");
const scheduleCloseBtn = document.getElementById("EEDWCT-schedule-close");

if (scheduleCloseBtn) {
  scheduleCloseBtn.addEventListener("click", () => {
    scheduleModal.classList.remove("active");
    document.body.style.overflow = "auto";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === scheduleModal) {
    scheduleModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Set min date to today for start date
const startDateInput = document.getElementById("EEDWCT-start-date");
const endDateInput = document.getElementById("EEDWCT-end-date");

function getTodayStr() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

if (startDateInput) {
  startDateInput.min = getTodayStr();
  startDateInput.addEventListener("change", () => {
    if (startDateInput.value) {
      clearError("EEDWCT-start-date", "EEDWCT-start-date-error");
      // Update end date min to match start date
      if (endDateInput) {
        endDateInput.min = startDateInput.value;
        // If end date is now before start date, clear it
        if (endDateInput.value && endDateInput.value < startDateInput.value) {
          endDateInput.value = "";
          showError(
            "EEDWCT-end-date",
            "EEDWCT-end-date-error",
            "End date must be on or after start date.",
          );
        }
      }
    }
  });
}

if (endDateInput) {
  endDateInput.addEventListener("change", () => {
    if (endDateInput.value)
      clearError("EEDWCT-end-date", "EEDWCT-end-date-error");
  });
}

// Schedule Duration: allow only digits and colon, append " mins" while typing
const scheduleDurationInput = document.getElementById(
  "EEDWCT-schedule-duration",
);
if (scheduleDurationInput) {
  scheduleDurationInput.addEventListener("keydown", (e) => {
    // Allow: digits, colon, Backspace, Delete, Tab, Arrow keys, Home, End
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];
    if (allowedKeys.includes(e.key)) return;
    if (!/[\d:]/.test(e.key)) {
      e.preventDefault();
    }
  });

  scheduleDurationInput.addEventListener("input", () => {
    // Strip everything except digits and colon
    let raw = scheduleDurationInput.value
      .replace(/ mins$/, "")
      .replace(/[^\d:]/g, "");
    if (raw.length > 0) {
      scheduleDurationInput.value = raw + " mins";
      // Place cursor before " mins"
      const pos = raw.length;
      scheduleDurationInput.setSelectionRange(pos, pos);
    } else {
      scheduleDurationInput.value = "";
    }
    if (raw.trim())
      clearError("EEDWCT-schedule-duration", "EEDWCT-schedule-duration-error");
  });

  // On focus, position cursor before " mins"
  scheduleDurationInput.addEventListener("focus", () => {
    if (scheduleDurationInput.value.endsWith(" mins")) {
      const pos = scheduleDurationInput.value.length - 5;
      setTimeout(() => scheduleDurationInput.setSelectionRange(pos, pos), 0);
    }
  });

  // On click, prevent cursor landing in " mins" suffix
  scheduleDurationInput.addEventListener("click", () => {
    if (scheduleDurationInput.value.endsWith(" mins")) {
      const maxPos = scheduleDurationInput.value.length - 5;
      if (scheduleDurationInput.selectionStart > maxPos) {
        scheduleDurationInput.setSelectionRange(maxPos, maxPos);
      }
    }
  });
}

// Schedule Continue Button Validation
const scheduleContinueBtn = document.getElementById(
  "EEDWCT-schedule-continue-btn",
);
if (scheduleContinueBtn) {
  scheduleContinueBtn.addEventListener("click", () => {
    clearAllScheduleErrors();
    let valid = true;
    const today = getTodayStr();

    const startVal = startDateInput ? startDateInput.value : "";
    const endVal = endDateInput ? endDateInput.value : "";
    const durationVal = scheduleDurationInput
      ? scheduleDurationInput.value.replace(/ mins$/, "").trim()
      : "";

    if (!startVal) {
      showError(
        "EEDWCT-start-date",
        "EEDWCT-start-date-error",
        "Start date is required.",
      );
      valid = false;
    } else if (startVal < today) {
      showError(
        "EEDWCT-start-date",
        "EEDWCT-start-date-error",
        "Start date cannot be in the past.",
      );
      valid = false;
    }

    if (!endVal) {
      showError(
        "EEDWCT-end-date",
        "EEDWCT-end-date-error",
        "End date is required.",
      );
      valid = false;
    } else if (startVal && endVal < startVal) {
      showError(
        "EEDWCT-end-date",
        "EEDWCT-end-date-error",
        "End date must be on or after start date.",
      );
      valid = false;
    }

    if (!durationVal) {
      showError(
        "EEDWCT-schedule-duration",
        "EEDWCT-schedule-duration-error",
        "Duration is required.",
      );
      valid = false;
    }

    if (valid) {
      scheduleModal.classList.remove("active");
      coordinatorModal.classList.add("active");
    }
  });
}

// ─── Coordinator Popup ─────────────────────────────────────────────────────────

const coordinatorModal = document.getElementById("EEDWCT-coordinator-modal");
const coordinatorCloseBtn = document.getElementById("EEDWCT-coordinator-close");

if (coordinatorCloseBtn) {
  coordinatorCloseBtn.addEventListener("click", () => {
    coordinatorModal.classList.remove("active");
    document.body.style.overflow = "auto";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === coordinatorModal) {
    coordinatorModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Coordinator Name: allow only alphabets and spaces
const coordNameInput = document.getElementById("EEDWCT-coord-name");
if (coordNameInput) {
  coordNameInput.addEventListener("keypress", (e) => {
    if (!/[a-zA-Z ]/.test(e.key)) e.preventDefault();
  });
  coordNameInput.addEventListener("input", () => {
    coordNameInput.value = coordNameInput.value.replace(/[^a-zA-Z ]/g, "");
    if (coordNameInput.value.trim())
      clearError("EEDWCT-coord-name", "EEDWCT-coord-name-error");
  });
}

// Mobile number: allow only digits, max 10
const coordMobileInput = document.getElementById("EEDWCT-coord-mobile");
if (coordMobileInput) {
  coordMobileInput.addEventListener("keypress", (e) => {
    if (!/\d/.test(e.key)) e.preventDefault();
  });
  coordMobileInput.addEventListener("input", () => {
    coordMobileInput.value = coordMobileInput.value
      .replace(/\D/g, "")
      .slice(0, 10);
    if (coordMobileInput.value.length === 10)
      clearError("EEDWCT-coord-mobile", "EEDWCT-coord-mobile-error");
  });
}

// Alternate mobile number: allow only digits, max 10
const coordAltMobileInput = document.getElementById("EEDWCT-coord-alt-mobile");
if (coordAltMobileInput) {
  coordAltMobileInput.addEventListener("keypress", (e) => {
    if (!/\d/.test(e.key)) e.preventDefault();
  });
  coordAltMobileInput.addEventListener("input", () => {
    coordAltMobileInput.value = coordAltMobileInput.value
      .replace(/\D/g, "")
      .slice(0, 10);
    if (!coordAltMobileInput.value || coordAltMobileInput.value.length === 10) {
      clearError("EEDWCT-coord-alt-mobile", "EEDWCT-coord-alt-mobile-error");
    }
  });
}

function isValidIndianMobile(num) {
  return /^[6-9]\d{9}$/.test(num);
}

// Coordinator Continue Button Validation
const coordinatorContinueBtn = document.getElementById(
  "EEDWCT-coordinator-continue-btn",
);
if (coordinatorContinueBtn) {
  coordinatorContinueBtn.addEventListener("click", () => {
    clearAllCoordinatorErrors();
    let valid = true;

    const nameVal = coordNameInput ? coordNameInput.value.trim() : "";
    const mobileVal = coordMobileInput ? coordMobileInput.value.trim() : "";
    const altMobileVal = coordAltMobileInput
      ? coordAltMobileInput.value.trim()
      : "";

    if (!nameVal) {
      showError(
        "EEDWCT-coord-name",
        "EEDWCT-coord-name-error",
        "Co-ordinator name is required.",
      );
      valid = false;
    } else if (!/^[a-zA-Z ]+$/.test(nameVal)) {
      showError(
        "EEDWCT-coord-name",
        "EEDWCT-coord-name-error",
        "Only alphabets and spaces are allowed.",
      );
      valid = false;
    }

    if (!mobileVal) {
      showError(
        "EEDWCT-coord-mobile",
        "EEDWCT-coord-mobile-error",
        "Mobile number is required.",
      );
      valid = false;
    } else if (!isValidIndianMobile(mobileVal)) {
      showError(
        "EEDWCT-coord-mobile",
        "EEDWCT-coord-mobile-error",
        "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.",
      );
      valid = false;
    }

    if (altMobileVal) {
      if (!isValidIndianMobile(altMobileVal)) {
        showError(
          "EEDWCT-coord-alt-mobile",
          "EEDWCT-coord-alt-mobile-error",
          "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.",
        );
        valid = false;
      } else if (altMobileVal === mobileVal) {
        showError(
          "EEDWCT-coord-alt-mobile",
          "EEDWCT-coord-alt-mobile-error",
          "Alternate number must be different from the primary mobile number.",
        );
        valid = false;
      }
    }

    if (valid) {
      // All forms complete — reset everything
      coordinatorModal.classList.remove("active");
      document.body.style.overflow = "auto";
      resetWorkshopFields();
      resetScheduleFields();
      resetCoordinatorFields();
    }
  });
}
