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

// Publish button functionality
const CRPublishBtn = document.querySelector(".CR-publish-btn");
const CRPublishBtnRes = document.querySelector(".CR-publish-btn-res");

function CRHandlePublish() {
  // Get form values
  const customerName = document.querySelector('.CR-form-group input[placeholder="Kishorilal Magan"]').value;
  const product = document.querySelector('.CR-form-group input[placeholder="Madhubani Painting"]').value;
  const rating = document.querySelector('.CR-form-half input[placeholder="4.5"]').value;
  const review = document.querySelector('.CR-form-group textarea').value;

  // Validate
  if (!customerName || !product || !rating || !review) {
    alert("Please fill in all fields");
    return;
  }

  // Close popup and reset form
  CRPopup.style.display = "none";
  alert("Review published successfully!");
  
  // Reset form (optional)
  document.querySelector('.CR-form-group input[placeholder="Kishorilal Magan"]').value = "";
  document.querySelector('.CR-form-group input[placeholder="Madhubani Painting"]').value = "";
  document.querySelector('.CR-form-half input[placeholder="4.5"]').value = "";
  document.querySelector('.CR-form-group textarea').value = "";
  CRUploadPreview.innerHTML = "";
}

if (CRPublishBtn) {
  CRPublishBtn.addEventListener("click", CRHandlePublish);
}

if (CRPublishBtnRes) {
  CRPublishBtnRes.addEventListener("click", CRHandlePublish);
}