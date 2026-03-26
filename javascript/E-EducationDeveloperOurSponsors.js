
(function initHeaderEditPublish() {
  const editBtn    = document.getElementById("headerEditBtn");
  const publishBtn = document.getElementById("headerPublishBtn");
  const viewMode   = document.getElementById("headerViewMode");
  const editMode   = document.getElementById("headerEditMode");

  if (!editBtn || !publishBtn || !viewMode || !editMode) return;

  // ── helper: show / clear error under a field 
  function showError(spanId, message) {
    const span = document.getElementById(spanId);
    if (span) {
      span.textContent = message;
      span.style.display = "block";
    }
  }

  function clearError(spanId) {
    const span = document.getElementById(spanId);
    if (span) {
      span.textContent = "";
      span.style.display = "none";
    }
  }

  // ── switch to edit mode ─
  editBtn.addEventListener("click", function () {
    // Preload current view values into inputs
    document.getElementById("editHeading").value =
      document.getElementById("viewHeading").textContent.trim();
    document.getElementById("editSubText").value =
      document.getElementById("viewSubText").textContent.trim();

    viewMode.style.display = "none";
    editMode.style.display = "block";
    editBtn.style.display  = "none";
    publishBtn.style.display = "inline-block";

    clearError("headingError");
    clearError("subTextError");
  });

  // ── switch to view mode on Publish 
  publishBtn.addEventListener("click", function () {
    const headingVal = document.getElementById("editHeading").value.trim();
    const subTextVal = document.getElementById("editSubText").value.trim();

    let valid = true;

    if (!headingVal) {
      showError("headingError", "Heading cannot be empty.");
      valid = false;
    } else {
      clearError("headingError");
    }

    if (!subTextVal) {
      showError("subTextError", "Sub-text cannot be empty.");
      valid = false;
    } else {
      clearError("subTextError");
    }

    if (!valid) return;

    // Update view
    document.getElementById("viewHeading").textContent = headingVal;
    document.getElementById("viewSubText").textContent = subTextVal;

    editMode.style.display   = "none";
    viewMode.style.display   = "block";
    publishBtn.style.display = "none";
    editBtn.style.display    = "inline-block";
  });

  // blur-based validation for header fields 
  document.getElementById("editHeading").addEventListener("blur", function () {
    if (!this.value.trim()) {
      showError("headingError", "Heading cannot be empty.");
    } else {
      clearError("headingError");
    }
  });

  document.getElementById("editSubText").addEventListener("blur", function () {
    if (!this.value.trim()) {
      showError("subTextError", "Sub-text cannot be empty.");
    } else {
      clearError("subTextError");
    }
  });
})();



// ──── Modal open/close logic ────
const modal     = document.getElementById("sponsorModal");
const closeModal = document.getElementById("closeModal");
const addNewBtn  = document.querySelector(".add-new-btn");
const floatingPlusBtn = document.querySelector(".EEDWC-floating-plus-btn");

function openModal() {
  modal.style.display = "flex";
  clearAllModalErrors();   // ADDED: reset errors on re-open
  resetModalFields();      // ADDED: reset fields on re-open
}

function closeModalFn() {
  modal.style.display = "none";
}

if (addNewBtn)        addNewBtn.addEventListener("click", openModal);
if (floatingPlusBtn)  floatingPlusBtn.addEventListener("click", openModal);
if (closeModal)       closeModal.addEventListener("click", closeModalFn);

window.addEventListener("click", function (e) {
  if (e.target === modal) closeModalFn();
});

// Mobile accordion (existing logic — untouched)
document.querySelectorAll(".EEAUW-acc-header").forEach(function (header) {
  header.addEventListener("click", function () {
    const item = this.closest(".EEAUW-acc-item");
    const body  = item.querySelector(".EEAUW-acc-body");
    const arrow = item.querySelector(".EEAUW-arrow");

    const isActive = item.classList.contains("active");

    document.querySelectorAll(".EEAUW-acc-item").forEach(function (i) {
      i.classList.remove("active");
      i.querySelector(".EEAUW-acc-body").classList.remove("active");
      const a = i.querySelector(".EEAUW-arrow");
      if (a) a.style.transform = "rotate(0deg)";
    });

    if (!isActive) {
      item.classList.add("active");
      body.classList.add("active");
      if (arrow) arrow.style.transform = "rotate(180deg)";
    }
  });
});


function showModalError(spanId, message) {
  const span = document.getElementById(spanId);
  if (span) {
    span.textContent = message;
    span.style.display = "block";
  }
}

function clearModalError(spanId) {
  const span = document.getElementById(spanId);
  if (span) {
    span.textContent = "";
    span.style.display = "none";
  }
}

function clearAllModalErrors() {
  ["orgNameError", "branchNameError", "cityError", "stateError", "logoError"]
    .forEach(clearModalError);
}

function resetModalFields() {
  const orgName   = document.getElementById("orgName");
  const branchName = document.getElementById("branchName");
  const citySelect = document.getElementById("citySelect");
  const stateSelect = document.getElementById("stateSelect");
  const logoUpload  = document.getElementById("logoUpload");

  if (orgName)    orgName.value    = "";
  if (branchName) branchName.value = "";
  if (citySelect)  citySelect.value  = "";
  if (stateSelect) stateSelect.value = "";
  if (logoUpload)  logoUpload.value  = "";

  // Reset preview text
  const uploadBox = document.getElementById("uploadBox");
  if (uploadBox) uploadBox.textContent = "Upload here";
}

// Restrict alphabet-only for text fields ──
function restrictAlphabetOnly(inputEl) {
  inputEl.addEventListener("keypress", function (e) {
    const char = String.fromCharCode(e.charCode);
    // Allow only a–z, A–Z, space
    if (!/^[a-zA-Z ]$/.test(char)) {
      e.preventDefault();
    }
  });

  // Also catch paste with non-alpha characters
  inputEl.addEventListener("input", function () {
    const cleaned = this.value.replace(/[^a-zA-Z ]/g, "");
    if (this.value !== cleaned) this.value = cleaned;
  });
}

//Blur validation helper for modal ─
function addBlurValidation(inputEl, errorSpanId, label) {
  inputEl.addEventListener("blur", function () {
    if (!this.value.trim()) {
      showModalError(errorSpanId, label + " is required.");
    } else {
      clearModalError(errorSpanId);
    }
  });
}

function addSelectBlurValidation(selectEl, errorSpanId, label) {
  selectEl.addEventListener("blur", function () {
    if (!this.value) {
      showModalError(errorSpanId, label + " is required.");
    } else {
      clearModalError(errorSpanId);
    }
  });
  // Also validate on change
  selectEl.addEventListener("change", function () {
    if (!this.value) {
      showModalError(errorSpanId, label + " is required.");
    } else {
      clearModalError(errorSpanId);
    }
  });
}

// ── Initialise modal fields after DOM ready ───
document.addEventListener("DOMContentLoaded", function () {

  // Rebuild City & State dropdowns 
  const citySelect  = document.getElementById("citySelect");
  const stateSelect = document.getElementById("stateSelect");

  if (citySelect) {
    citySelect.innerHTML = "";
    const cities = ["", "Mumbai", "Pune", "Delhi", "Jaipur", "Ahmedabad"];
    const cityLabels = { "": "Select City" };
    cities.forEach(function (city) {
      const opt = document.createElement("option");
      opt.value = city;
      opt.textContent = cityLabels[city] || city;
      if (!city) opt.disabled = false; 
      citySelect.appendChild(opt);
    });
    citySelect.value = ""; 
  }

  if (stateSelect) {
    stateSelect.innerHTML = "";
    const states = ["", "Maharashtra", "Delhi", "Rajasthan", "Gujarat", "Karnataka"];
    const stateLabels = { "": "Select State" };
    states.forEach(function (state) {
      const opt = document.createElement("option");
      opt.value = state;
      opt.textContent = stateLabels[state] || state;
      stateSelect.appendChild(opt);
    });
    stateSelect.value = "";
  }

  // ── Wire up restrictions & blur validations ─
  const orgName    = document.getElementById("orgName");
  const branchName = document.getElementById("branchName");
  const logoUpload = document.getElementById("logoUpload");
  const uploadBox  = document.getElementById("uploadBox");
  const publishModalBtn = document.getElementById("publishModalBtn");

  // TASK 4
  if (orgName)    restrictAlphabetOnly(orgName);
  if (branchName) restrictAlphabetOnly(branchName);

  // TASK 3 — blur validation for text inputs
  if (orgName)    addBlurValidation(orgName,    "orgNameError",   "Organization Name");
  if (branchName) addBlurValidation(branchName, "branchNameError","Branch Name");

  // TASK 3 — blur validation for selects
  if (citySelect)  addSelectBlurValidation(citySelect,  "cityError",  "City");
  if (stateSelect) addSelectBlurValidation(stateSelect, "stateError", "State");

  // TASK 6 — Logo upload: accept images only, show filename, blur check
  if (uploadBox && logoUpload) {
    uploadBox.addEventListener("click", function () {
      logoUpload.click();
    });

    logoUpload.setAttribute("accept", "image/jpeg,image/jpg,image/png,image/svg+xml,image/webp");

    logoUpload.addEventListener("change", function () {
      const file = this.files[0];
      if (!file) return;

      // TASK 6 — Reject non-image files
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/svg+xml", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        showModalError("logoError", "Only image files are allowed (jpg, jpeg, png, svg, webp).");
        this.value = "";
        uploadBox.textContent = "Upload here";
        return;
      }

      clearModalError("logoError");
      uploadBox.textContent = file.name;
    });
  }

  // ── TASK 2 — Publish button: full modal validation ─
  if (publishModalBtn) {
    publishModalBtn.addEventListener("click", function () {
      let valid = true;

      // Organization Name
      if (!orgName || !orgName.value.trim()) {
        showModalError("orgNameError", "Organization Name is required.");
        valid = false;
      } else {
        clearModalError("orgNameError");
      }

      // Branch Name
      if (!branchName || !branchName.value.trim()) {
        showModalError("branchNameError", "Branch Name is required.");
        valid = false;
      } else {
        clearModalError("branchNameError");
      }

      // City
      if (!citySelect || !citySelect.value) {
        showModalError("cityError", "Please select a City.");
        valid = false;
      } else {
        clearModalError("cityError");
      }

      // State
      if (!stateSelect || !stateSelect.value) {
        showModalError("stateError", "Please select a State.");
        valid = false;
      } else {
        clearModalError("stateError");
      }

      // Logo
      if (!logoUpload || !logoUpload.files || !logoUpload.files[0]) {
        showModalError("logoError", "Please upload a logo.");
        valid = false;
      } else {
        clearModalError("logoError");
      }

      if (!valid) return;

      closeModalFn();
    });
  }
});

// ===============================
// DELETE ROW (DESKTOP + MOBILE)
// ===============================

document.addEventListener("DOMContentLoaded", function () {

  const countEl = document.getElementById("partnerCount");

  function updatePartnerCount() {
    const desktopRows = document.querySelectorAll(".EEASW-table .EEASW-row:not(.EEASW-header-row)");
    const mobileRows = document.querySelectorAll(".EEAUW-acc-item");

    // choose whichever layout is visible
    let total = window.innerWidth <= 595 ? mobileRows.length : desktopRows.length;

    if (countEl) {
      countEl.textContent = total + " Partners";
    }
  }


  // ===============================
  // DESKTOP DELETE
  // ===============================

  document.querySelectorAll(".EEASW-delete").forEach(function (icon) {

    icon.addEventListener("click", function () {

      const row = this.closest(".EEASW-row");

      if (row) {
        row.remove();
        updatePartnerCount();
      }

    });

  });


  // ===============================
  // MOBILE DELETE
  // ===============================

  document.querySelectorAll(".EEAUW-mob-delete").forEach(function (icon) {

    icon.addEventListener("click", function () {

      const row = this.closest(".EEAUW-acc-item");

      if (row) {
        row.remove();
        updatePartnerCount();
      }

    });

  });


  // initial count correction (optional safety)
  updatePartnerCount();

});