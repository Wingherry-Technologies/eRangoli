//  TRACK ORDER POPUP
const trackBtn = document.getElementById("myOrdersTrackBtn");
const trackOverlay = document.getElementById("trackOverlay");
const trackClose = document.getElementById("trackClose");

if (trackBtn) {
  trackBtn.addEventListener("click", () => {
    trackOverlay.style.display = "flex";
  });
}

trackClose.addEventListener("click", () => {
  trackOverlay.style.display = "none";
});

trackOverlay.addEventListener("click", (e) => {
  if (e.target === trackOverlay) {
    trackOverlay.style.display = "none";
  }
});

//  SEARCH 
const searchInput = document.getElementById("myOrdersSearchInput");
const orderCards = document.querySelectorAll(".myOrdersCard");

searchInput.addEventListener("input", function () {
  const searchValue = this.value.toLowerCase();
  orderCards.forEach((card) => {
    const title = card.querySelector(".myOrdersProductTitle")?.innerText.toLowerCase();
    card.style.display = title && title.includes(searchValue) ? "block" : "none";
  });
});

// RETURN POPUP OPEN / CLOSE 
const returnBtn = document.getElementById("myOrdersReturnBtn");
const returnOverlay = document.getElementById("returnOverlay");
const returnClose = document.getElementById("returnClose");

returnBtn.addEventListener("click", () => {
  returnOverlay.style.display = "flex";
  resetReturnForm(); 
});

returnClose.addEventListener("click", () => {
  returnOverlay.style.display = "none";
});

returnOverlay.addEventListener("click", (e) => {
  if (e.target === returnOverlay) {
    returnOverlay.style.display = "none";
  }
});

//  RETURN FORM ELEMENTS
const reasonCheckboxes = document.querySelectorAll(".returnCheckbox input");
const uploadInputs = document.querySelectorAll(".uploadBox input");
const issueText = document.getElementById("issueText");
const charCount = document.getElementById("charCount");
const returnBtnFinal = document.getElementById("finalReturnBtn");
const errorBox = document.getElementById("returnError");

const reasonTitle = document.querySelector(".returnSection .returnTitle");
const uploadTitle = document.getElementById("uploadTitle");
const descTitle = issueText.previousElementSibling;
let isSwitchingSection = false;

const returnModal = document.querySelector("#returnOverlay .returnModal");
returnModal.addEventListener("click", (e) => {
  const clickedInsideUpload = e.target.closest(".uploadBox");

  if (
    uploadTouched &&
    !isUploadValid() &&
    !clickedInsideUpload
  ) {
    showError(uploadTitle, "Please upload at least 1 image");
  }
});


let uploadedCount = 0;

//  HELPERS 
function clearErrors() {
  errorBox.style.display = "none";
  [reasonTitle, uploadTitle, descTitle].forEach((el) =>
    el.classList.remove("errorTitle")
  );
}


function showError(titleEl, msg) {
  clearErrors();
  titleEl.classList.add("errorTitle");

  errorBox.querySelector(".errorText").innerText = msg;
  errorBox.style.display = "flex";
}

function validateReasonOnBlur() {
  if (!isReasonValid()) {
    showError(reasonTitle, "Please select the reason for return");
  }
}

function validateUploadOnBlur() {
  if (!isUploadValid()) {
    showError(uploadTitle, "Please upload at least 1 image");
  }
}

function validateTextOnBlur() {
  if (!isTextValid()) {
    showError(descTitle, "Please describe your issue (minimum 5 words)");
  }
}

//  VALIDATION CHECKS 
function isReasonValid() {
  return [...reasonCheckboxes].some((cb) => cb.checked);
}

function isUploadValid() {
  return document.querySelectorAll(".uploadBox img.previewImg").length >= 1;
}

function isTextValid() {
  const text = issueText.value.replace(/\n/g, " ").trim();
  if (!text) return false;

  const words = text.split(" ").filter(word => word.length > 0);

  return words.length >= 5 && text.length <= 250;
}


//  BUTTON STATE 
function updateButtonState() {
  if (isReasonValid() && isUploadValid() && isTextValid()) {
    returnBtnFinal.classList.add("active");
    returnBtnFinal.disabled = false;
  } else {
    returnBtnFinal.classList.remove("active");
    returnBtnFinal.disabled = true;
  }
}

//  RESET FORM 
function resetReturnForm() {
  uploadedCount = 0;

  reasonCheckboxes.forEach(cb => cb.checked = false);

  document.querySelectorAll(".uploadBox img.previewImg").forEach(img => img.remove());

  uploadInputs.forEach(input => input.value = "");

  document.querySelectorAll(".uploadPlaceholder").forEach(ph => {
    ph.style.display = "flex";
  });

  issueText.value = "";
  charCount.innerText = "0/250";

  clearErrors();
  updateButtonState();
}


//  EVENTS 
/* CHECKBOX */
reasonCheckboxes.forEach(cb => {
  cb.addEventListener("change", () => {
    clearErrors();
    updateButtonState();
  });

  cb.addEventListener("blur", validateReasonOnBlur);
});

/* IMAGE UPLOAD */
uploadInputs.forEach((input) => {
  input.addEventListener("change", function () {
    if (uploadedCount >= 5) return;

    const file = this.files[0];
    if (!file) return;

    uploadedCount++;

const img = document.createElement("img");
img.src = URL.createObjectURL(file);
img.classList.add("previewImg");   
this.parentElement.appendChild(img);

// hide placeholder
this.parentElement.querySelector(".uploadPlaceholder").style.display = "none";
    clearErrors();
    updateButtonState(); 
    uploadTouched = false;
  });
});

// uploadInputs.forEach(input => {
//   input.addEventListener("blur", () => {
//     if (!isUploadValid()) {
//       showError(uploadTitle, "please upload at least 1 image");
//     }
//   });
// });

let uploadTouched = false;

/* TEXTAREA + COUNTER */
issueText.addEventListener("input", () => {
  charCount.innerText = `${issueText.value.length}/250`;
  clearErrors();
  updateButtonState();
});

issueText.addEventListener("blur", () => {
  if (!isTextValid()) {
    showError(descTitle, "Please describe your issue (minimum 5 words)");
  }
});

//  SEQUENCE ERRORS 
uploadInputs[0].addEventListener("focus", () => {
  uploadTouched = true;
  if (!isReasonValid()) {
    showError(reasonTitle, "Please select the reason for return");
  }
});

issueText.addEventListener("focus", () => {
  if (!isReasonValid()) {
    showError(reasonTitle, "Please select the reason for return");
  } else if (!isUploadValid()) {
    showError(uploadTitle, "Please upload at least 1 image");
  }
});


// close error 
const errorClose = document.querySelector(".errorClose");
if (errorClose) {
  errorClose.addEventListener("click", clearErrors);
}

//  SUBMIT 
returnBtnFinal.addEventListener("click", () => {
  if (returnBtnFinal.disabled) return;

  returnOverlay.style.display = "none";
  resetConfirmModal();              // 👈 ADD
  confirmOverlay.style.display = "flex";
});





// confirm modal logic
const confirmOverlay = document.getElementById("confirmOverlay");
const confirmClose = document.getElementById("confirmClose");
const paymentBox = document.getElementById("paymentBox");
const confirmBtn = document.getElementById("confirmBtn");
const paymentOptions = document.querySelectorAll(".paymentCheckbox input");


// RESET CONFIRM PAYMENT MODAL
function resetConfirmModal() {
  // uncheck payment checkboxes
  paymentOptions.forEach(opt => opt.checked = false);

  // reset payment box (same style, same position)
  paymentBox.innerHTML = `<span class="changeAccount">Add Account</span>`;

  // disable confirm button
  confirmBtn.disabled = true;
  confirmBtn.classList.remove("active");
}



// DEFAULT – even without checkbox
paymentBox.innerHTML = `
  <span class="changeAccount">Add Account</span>
`;

confirmBtn.disabled = true;
confirmBtn.classList.remove("active");

paymentOptions.forEach(option => {
  option.addEventListener("change", () => {

    // only one checkbox at a time
    paymentOptions.forEach(o => {
      if (o !== option) o.checked = false;
    });

    // BANK TRANSFER
    if (option.checked && option.value === "bank") {
      paymentBox.innerHTML = `
        <span>David John</span><br>
        Bank of India<br>
        IFSC: BKID0005719<br>
        Saving Account
        <span class="changeAccount">Add Account</span>
      `;

      confirmBtn.disabled = false;
      confirmBtn.classList.add("active");
    }

    // UPI
    else if (option.checked && option.value === "upi") {
      paymentBox.innerHTML = `
        <span>UPI ID</span><br>
        davidjohn@upi
      `;

      confirmBtn.disabled = false;
      confirmBtn.classList.add("active");
    }

    // NONE SELECTED
    else {
      paymentBox.innerHTML = `
        <span class="changeAccount">Add Account</span>
      `;

      confirmBtn.disabled = true;
      confirmBtn.classList.remove("active");
    }
  });
});

const bankForm = document.getElementById("bankForm");
const bankSaveBtn = document.getElementById("bankSaveBtn");
const bankClose = document.getElementById("bankClose");

// OPEN ADD ACCOUNT (exactly like screenshot)
paymentBox.addEventListener("click", (e) => {
  if (e.target.classList.contains("changeAccount")) {
    paymentBox.style.display = "none";
    confirmBtn.style.display = "none";
    bankForm.style.display = "block";
  }
});

// CLOSE ICON
bankClose.addEventListener("click", () => {
  bankForm.style.display = "none";
  paymentBox.style.display = "block";
  confirmBtn.style.display = "block";
});

// SAVE ACCOUNT
bankSaveBtn.addEventListener("click", () => {
  bankForm.style.display = "none";
  paymentBox.style.display = "block";
  confirmBtn.style.display = "block";

  paymentBox.innerHTML = `
    <span>Sanskriti Collection</span><br>
    Bank of India<br>
    IFSC: BKID0005719<br>
    Saving Account
    <span class="changeAccount">Change</span>
  `;

  confirmBtn.disabled = false;
  confirmBtn.classList.add("active");
});






const successOverlay = document.getElementById("successOverlay");
const successClose = document.getElementById("successClose");

confirmBtn.addEventListener("click", () => {
  confirmOverlay.style.display = "none";
  resetConfirmModal();   
  const img = document.querySelector(".successAnimation img");
  img.style.animation = "none";
  img.offsetHeight; 
  img.style.animation = "";

  successOverlay.style.display = "flex";

   setTimeout(() => {
    window.location.href = "../html/index.html";
  }, 3000); // 3 seconds
});

/* close success popup */
successClose.addEventListener("click", () => {
  successOverlay.style.display = "none";
});


confirmClose.addEventListener("click", () => {
  confirmOverlay.style.display = "none";
  resetConfirmModal();   
});



//  REVIEW POPUP 

const reviewOverlay = document.getElementById("reviewOverlay");
const reviewClose = document.getElementById("reviewClose");
const reviewPostBtn = document.getElementById("reviewPostBtn");
const reviewTextarea = document.querySelector(".reviewTextarea");
const reviewStars = document.querySelectorAll("#reviewStars img");
const cancelSuccessTitle = document.querySelector("#cancelSuccessOverlay h2");
const cancelSuccessText = document.querySelector("#cancelSuccessOverlay p");

const reviewUploadInputs = document.querySelectorAll(
  ".reviewUploadRow .uploadBox input[type='file']"
);

// RESET REVIEW MODAL
function resetReviewModal() {
  hasStar = false;
  hasText = false;
  hasImage = false;

  // reset textarea
  reviewTextarea.value = "";

  // reset stars
  reviewStars.forEach(star => {
    star.src = "../assets/myOrders/Star.svg";
  });

  // reset upload previews
  document
    .querySelectorAll(".reviewUploadRow img.previewImg")
    .forEach(img => img.remove());

  // show upload placeholders again
  document
    .querySelectorAll(".reviewUploadRow .uploadPlaceholder")
    .forEach(ph => ph.style.display = "flex");

  // reset button
  reviewPostBtn.disabled = true;
  reviewPostBtn.classList.remove("active");
}



// stars section in order card
const ratingSections = document.querySelectorAll(".myOrdersStars, .myOrdersRatingText");


let hasStar = false;
let hasText = false;
let hasImage = false;


function updatePostButton() {
  if (hasStar || hasText || hasImage) {
    reviewPostBtn.disabled = false;
    reviewPostBtn.classList.add("active");
  } else {
    reviewPostBtn.disabled = true;
    reviewPostBtn.classList.remove("active");
  }
}


reviewStars.forEach((star, index) => {
  star.addEventListener("click", () => {
    hasStar = true;

    reviewStars.forEach((s, i) => {
      s.src =
        i <= index
          ? "../assets/myOrders/YellowStar.svg"
          : "../assets/myOrders/Star.svg";
    });

    updatePostButton();
  });
});


reviewTextarea.addEventListener("input", () => {
  hasText = reviewTextarea.value.trim().length > 0;
  updatePostButton();
});

reviewUploadInputs.forEach(input => {
  input.addEventListener("change", () => {
    hasImage = true;
    updatePostButton();
  });
});



// open review modal
ratingSections.forEach(el => {
  el.addEventListener("click", () => {
    reviewOverlay.style.display = "flex";

 resetReviewModal();
initReviewUploadPreview();

  });
});


// close modal
reviewClose.addEventListener("click", () => {
  reviewOverlay.style.display = "none";
  resetReviewModal(); 
});


reviewPostBtn.addEventListener("click", () => {
  if (reviewPostBtn.disabled) return;

  // close review modal
  reviewOverlay.style.display = "none";
  resetReviewModal();

  // ✨ UPDATE SUCCESS MODAL TEXT (REVIEW FLOW)
  cancelSuccessTitle.innerText = "Thank you for your review!";
  cancelSuccessText.innerText =
    "Your feedback has been submitted successfully.";

  // open existing cancel success modal
  cancelSuccessOverlay.style.display = "flex";
});





//  REVIEW MODAL – UPLOAD IMAGE PREVIEW (NO VALIDATION)

function initReviewUploadPreview() {
  const reviewUploadInputs = document.querySelectorAll(
    ".reviewUploadRow .uploadBox input[type='file']"
  );
  
  reviewUploadInputs.forEach(input => {
    input.addEventListener("change", function () {
      const file = this.files[0];
      if (!file) return;

      const uploadBox = this.parentElement;

      // remove old preview if exists
      const oldPreview = uploadBox.querySelector("img.previewImg");
      if (oldPreview) {
        URL.revokeObjectURL(oldPreview.src);
        oldPreview.remove();
      }

      // create new preview image
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.className = "previewImg";

      uploadBox.appendChild(img);

      // hide upload placeholder
      const placeholder = uploadBox.querySelector(".uploadPlaceholder");
      if (placeholder) {
        placeholder.style.display = "none";
      }
    });
  });
}


/* CANCEL MODAL LOGIC */

const cancelOverlay = document.getElementById("cancelOverlay");
const cancelSuccessOverlay = document.getElementById("cancelSuccessOverlay");

const cancelConfirmBtn = document.getElementById("cancelConfirmBtn");
const cancelClose = document.getElementById("cancelClose");
const cancelSuccessClose = document.getElementById("cancelSuccessClose");
const continueShoppingBtn = document.getElementById("continueShoppingBtn");

const cancelCheckboxes = document.querySelectorAll(".cancelCheckbox input");

/* OPEN CANCEL MODAL (example trigger) */
document.querySelectorAll(".openCancelModal").forEach(btn => {
  btn.addEventListener("click", () => {
    console.log("yeds");
    cancelOverlay.style.display = "flex";
    resetCancelModal();
  });
});

/* CLOSE CANCEL MODAL */
cancelClose.addEventListener("click", () => {
  cancelOverlay.style.display = "none";
});

/* ENABLE BUTTON IF AT LEAST ONE CHECKED */
cancelCheckboxes.forEach(cb => {
  cb.addEventListener("change", () => {
    const checked = [...cancelCheckboxes].some(c => c.checked);
    cancelConfirmBtn.disabled = !checked;
    cancelConfirmBtn.classList.toggle("active", checked);
  });
});

/* CONFIRM CANCEL */
cancelConfirmBtn.addEventListener("click", () => {
  if (cancelConfirmBtn.disabled) return;

  cancelOverlay.style.display = "none";
  cancelSuccessOverlay.style.display = "flex";
});

/* CLOSE SUCCESS */
cancelSuccessClose.addEventListener("click", () => {
  cancelSuccessOverlay.style.display = "none";

  // reset to cancel default text
  cancelSuccessTitle.innerText = "Your order has been cancelled";
  cancelSuccessText.innerText =
    "Your refund will be processed within 7 business days";
});

/* CONTINUE SHOPPING */
continueShoppingBtn.addEventListener("click", () => {
  cancelSuccessOverlay.style.display = "none";
  // optional redirect
  window.location.href = "../html/index.html";
});

/* RESET CANCEL MODAL */
function resetCancelModal() {
  cancelCheckboxes.forEach(cb => cb.checked = false);
  cancelConfirmBtn.disabled = true;
  cancelConfirmBtn.classList.remove("active");
}
