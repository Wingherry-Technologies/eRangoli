// Edit button functionality
document.querySelectorAll(".CR-edit-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    alert("Edit clicked");
  });
});

// Delete button functionality
document.querySelectorAll(".CR-delete-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this review?")) {
      btn.closest(".CR-card").remove();
    }
  });
});

// Popup controls
const CRAddNewBtn = document.querySelector(".CR-add-btn");
const CRPopup = document.getElementById("CRPopup");
const CRClosePopup = document.getElementById("CRClosePopup");
const CRFloatingAddBtn = document.querySelector(".CR-floating-add-btn");

// Open popup from header button
if (CRAddNewBtn) {
  CRAddNewBtn.addEventListener("click", () => {
    CRPopup.style.display = "flex";
  });
}

// Close popup
if (CRClosePopup) {
  CRClosePopup.addEventListener("click", () => {
    CRPopup.style.display = "none";
  });
}

// Close popup when clicking overlay
if (CRPopup) {
  CRPopup.addEventListener("click", (e) => {
    if (e.target === CRPopup) {
      CRPopup.style.display = "none";
    }
  });
}

// Open popup from floating button
if (CRFloatingAddBtn) {
  CRFloatingAddBtn.addEventListener("click", () => {
    CRPopup.style.display = "flex";
  });
}

// Profile upload functionality
const CRUploadInput = document.getElementById("CRProfileUpload");
const CRUploadPreview = document.getElementById("CRUploadPreview");
const CRUploadText = document.querySelector(".CR-upload-text");

if (CRUploadInput) {
  CRUploadInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      CRUploadPreview.innerHTML = `<img src="${e.target.result}" />`;
    };
    reader.readAsDataURL(file);
  });
}

if (CRUploadText) {
  CRUploadText.addEventListener("click", () => {
    CRUploadInput.click();
  });
}

// Star rating functionality in popup
const CRStarInputs = document.querySelectorAll(".CR-star-input");

CRStarInputs.forEach((star, index) => {
  star.addEventListener("click", () => {
    // Clear all stars
    CRStarInputs.forEach((s) => s.classList.remove("filled"));
    
    // Fill stars up to clicked one
    for (let i = 0; i <= index; i++) {
      CRStarInputs[i].classList.add("filled");
    }
    
    // Update rating value
    const ratingInput = document.querySelector('.CR-form-half input[placeholder="4.5"]');
    if (ratingInput) {
      ratingInput.value = (index + 1).toFixed(1);
    }
  });

  // Hover effect
  star.addEventListener("mouseenter", () => {
    CRStarInputs.forEach((s, i) => {
      if (i <= index) {
        s.style.color = "#ffc107";
      } else {
        s.style.color = s.classList.contains("filled") ? "#ffc107" : "#d1d1d1";
      }
    });
  });
});

// Reset hover effect
const CRStarsInput = document.querySelector(".CR-stars-input");
if (CRStarsInput) {
  CRStarsInput.addEventListener("mouseleave", () => {
    CRStarInputs.forEach((s) => {
      s.style.color = s.classList.contains("filled") ? "#ffc107" : "#d1d1d1";
    });
  });
}

const CRFields = document.querySelectorAll(
  "#CRCustomerName, #CRProduct, #CRRating, #CRReview"
);

// Attach blur event to all fields
CRFields.forEach((field) => {
  field.addEventListener("blur", () => validateField(field));
});

// Main validation function
function validateField(field) {
  const errorEl = field.nextElementSibling;
  let value = field.value.trim();

  field.classList.remove("CR-input-error");
  errorEl.textContent = "";

  // CUSTOMER NAME
  if (field.id === "CRCustomerName") {
    if (!value) {
      showError(field, "Name is required");
      return false;
    }
    if (!/^[A-Za-z\s]+$/.test(value)) {
      showError(field, "Only characters allowed");
      return false;
    }
  }

  // PRODUCT
  if (field.id === "CRProduct") {
    if (!value) {
      showError(field, "Product is required");
      return false;
    }
  }

  // RATING
  if (field.id === "CRRating") {
    if (!value) {
      showError(field, "Rating is required");
      return false;
    }
    if (isNaN(value) || value < 0 || value > 5) {
      showError(field, "Enter valid rating (0-5)");
      return false;
    }
  }

  // REVIEW
  if (field.id === "CRReview") {
    if (!value) {
      showError(field, "Review is required");
      return false;
    }
    if (value.length < 10) {
      showError(field, "Minimum 10 characters required");
      return false;
    }
  }

  return true;
}

// Show error helper
function showError(field, message) {
  const errorEl = field.nextElementSibling;
  errorEl.textContent = message;
  field.classList.add("CR-input-error");
}
const nameInput = document.getElementById("CRCustomerName");

nameInput.addEventListener("input", function () {
  let value = this.value;

  // remove leading space
  if (value.startsWith(" ")) {
    value = value.trimStart();
  }

  // allow only characters
  value = value.replace(/[^A-Za-z\s]/g, "");

  this.value = value;
});


// Publish button functionality
const CRPublishBtn = document.querySelector(".CR-publish-btn");
const CRPublishBtnRes = document.querySelector(".CR-publish-btn-res");

function CRHandlePublish() {
  let isValid = true;

  CRFields.forEach((field) => {
    const fieldValid = validateField(field);
    if (!fieldValid) isValid = false;
  });

  if (!isValid) {
    return;
  }

  CRPopup.style.display = "none";
  
}


if (CRPublishBtn) {
  CRPublishBtn.addEventListener("click", CRHandlePublish);
}

if (CRPublishBtnRes) {
  CRPublishBtnRes.addEventListener("click", CRHandlePublish);
}