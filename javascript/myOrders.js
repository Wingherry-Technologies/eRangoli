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

// ORDER COUNT FUNCTION
function updateOrderCount() {
  const allOrders = document.querySelectorAll(".myOrdersCard");
  const visibleOrders = [...allOrders].filter(
    card => card.style.display !== "none"
  );

  const countEl = document.getElementById("myOrdersCount");
  const count = visibleOrders.length;

  if (countEl) {
    countEl.innerText = `${count} Product${count !== 1 ? "s" : ""}`;
  }
}

// initial load
updateOrderCount();

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

  reasonCheckboxes.forEach((cb) => (cb.checked = false));

document.querySelectorAll(".uploadBox img.previewImg").forEach((img) => img.remove());

  uploadInputs.forEach((input) => (input.value = ""));

  issueText.value = "";
  charCount.innerText = "0/250";

  clearErrors();
  updateButtonState();
}

//  EVENTS 
/* CHECKBOX */
reasonCheckboxes.forEach((cb) => {
  cb.addEventListener("change", () => {
    clearErrors();
    updateButtonState();
  });
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
  });
});

/* TEXTAREA + COUNTER */
issueText.addEventListener("input", () => {
  charCount.innerText = `${issueText.value.length}/250`;
  clearErrors();
  updateButtonState();
});

//  SEQUENCE ERRORS 
uploadInputs[0].addEventListener("focus", () => {
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
  confirmOverlay.style.display = "flex";
});

const confirmOverlay = document.getElementById("confirmOverlay");
const confirmClose = document.getElementById("confirmClose");
const paymentBox = document.getElementById("paymentBox");
const confirmBtn = document.getElementById("confirmBtn");
const paymentOptions = document.querySelectorAll(".paymentCheckbox input");


paymentOptions.forEach(option => {
  option.addEventListener("change", () => {

    // allow only one checkbox at a time
    paymentOptions.forEach(o => {
      if (o !== option) o.checked = false;
    });

    if (option.checked) {
      if (option.value === "bank") {
        paymentBox.innerHTML = `
          <span>David John</span><br>
          Bank of India<br>
          IFSC: BKID0005719<br>
          Saving Account
          <span class="changeAccount">Change Account</span>
        `;
      } else {
        paymentBox.innerHTML = `
          <span>UPI ID</span><br>
          davidjohn@upi
          <span class="changeAccount">Change Account</span>
        `;
      }

      confirmBtn.disabled = false;
      confirmBtn.classList.add("active");

      document.querySelector(".changeAccount").onclick = () => {
        alert("Change account clicked");
      };
    } else {
      paymentBox.innerHTML = "";
      confirmBtn.disabled = true;
      confirmBtn.classList.remove("active");
    }
  });
});


const successOverlay = document.getElementById("successOverlay");
const successClose = document.getElementById("successClose");

confirmBtn.addEventListener("click", () => {
  confirmOverlay.style.display = "none";

  const img = document.querySelector(".successAnimation img");
  img.style.animation = "none";
  img.offsetHeight; 
  img.style.animation = "";

  successOverlay.style.display = "flex";
});

/* close success popup */
successClose.addEventListener("click", () => {
  successOverlay.style.display = "none";
});


confirmClose.addEventListener("click", () => {
  confirmOverlay.style.display = "none";
});


//  REVIEW POPUP 

const reviewOverlay = document.getElementById("reviewOverlay");
const reviewClose = document.getElementById("reviewClose");
// stars section in order card
const ratingSections = document.querySelectorAll(".myOrdersStars, .myOrdersRatingText");

// open review modal
ratingSections.forEach(el => {
  el.addEventListener("click", () => {
    reviewOverlay.style.display = "flex";
    initReviewUploadPreview();
  });
});

// close modal
reviewClose.addEventListener("click", () => {
  reviewOverlay.style.display = "none";
});

// star rating interaction
const reviewStars = document.querySelectorAll("#reviewStars img");

reviewStars.forEach((star, index) => {
  star.addEventListener("click", () => {
    reviewStars.forEach((s, i) => {
      s.classList.toggle("active", i <= index);
    });
  });
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
