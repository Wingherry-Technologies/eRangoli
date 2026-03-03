// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon = document.querySelector("#hamburger-menu>img");
var mobileBack = document.querySelector(".mobile-back-button");
const plusIcon=document.querySelector(".CR-floating-add-btn");

hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display = "none";
    document.querySelector("body").style.overflow = "hidden";
    window.scrollTo(0, 0);
    mobileBack.style.display = "none";
    plusIcon.style.display="none";

  } else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow = "auto";
    document.querySelector(".bottom-nav").style.display = "flex";
    mobileBack.style.display = "flex";
    plusIcon.style.display="flex";
  }
});

/* =====================================
   VARIABLES
===================================== */

const CRPopup = document.getElementById("CRPopup");
const CRAddBtn = document.querySelector(".CR-add-btn");
const CRFloatingBtn = document.querySelector(".CR-floating-add-btn");
const CRClosePopup = document.getElementById("CRClosePopup");

const CRCustomerName = document.getElementById("CRCustomerName");
const CRProduct = document.getElementById("CRProduct");
const CRRating = document.getElementById("CRRating");
const CRReview = document.getElementById("CRReview");

const CRRatingError = document.getElementById("CRRatingError");

const CRUploadInput = document.getElementById("CRProfileUpload");
const CRUploadPreview = document.getElementById("CRUploadPreview");

const CRPublishBtn = document.querySelector(".CR-publish-btn");
const CRPublishBtnRes = document.querySelector(".CR-publish-btn-res");

const CRStarInputs = document.querySelectorAll(".CR-star-input");

const CRConfirmPopup = document.getElementById("CRConfirmPopup");
const CRConfirmCancel = document.getElementById("CRConfirmCancel");
const CRConfirmOk = document.getElementById("CRConfirmOk");
const CRConfirmMessage = document.getElementById("CRConfirmMessage");

const CRCardTemplate = document.getElementById("CRCardTemplate");

let editCard = null;
let confirmCallback = null;

/* =====================================
   DISABLE TOGGLE FOR FIRST 4
===================================== */

// document.querySelectorAll(".CR-fixed .CR-switch input").forEach(toggle => {
//   toggle.checked = true;
//   toggle.disabled = true;
// });

/* =====================================
   POPUP CONTROL
===================================== */

function openPopup() {
  CRPopup.style.display = "flex";
}

function closePopup() {
  CRPopup.style.display = "none";
}

function resetPopup() {
  editCard = null;

  CRCustomerName.value = "";
  CRProduct.value = "";
  CRRating.value = "";
  CRReview.value = "";

  clearErrors();

  CRUploadPreview.innerHTML = "";
  CRUploadPreview.classList.remove("has-image");
  CRUploadInput.value = "";

  CRStarInputs.forEach(s => s.classList.remove("filled"));
}

CRAddBtn?.addEventListener("click", () => {
  resetPopup();
  openPopup();
});

CRFloatingBtn?.addEventListener("click", () => {
  resetPopup();
  openPopup();
});

CRClosePopup.addEventListener("click", closePopup);

CRPopup.addEventListener("click", (e) => {
  if (e.target === CRPopup) closePopup();
});

/* =====================================
   IMAGE UPLOAD
===================================== */

CRUploadInput.addEventListener("change", function () {

  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {

    CRUploadPreview.innerHTML = `
      <img src="${e.target.result}" />
      <span class="CR-remove-photo">✖</span>
    `;

    CRUploadPreview.classList.add("has-image");
  };

  reader.readAsDataURL(file);
});

CRUploadPreview.addEventListener("click", function (e) {

  const removeBtn = e.target.closest(".CR-remove-photo");

  if (removeBtn) {
    CRUploadPreview.innerHTML = "";
    CRUploadPreview.classList.remove("has-image");
    CRUploadInput.value = "";
  }

});

/* =====================================
   STAR RATING
===================================== */

CRStarInputs.forEach((star, index) => {
  star.addEventListener("click", () => {

    CRStarInputs.forEach(s => s.classList.remove("filled"));

    for (let i = 0; i <= index; i++) {
      CRStarInputs[i].classList.add("filled");
    }

    CRRating.value = index + 1;
    CRRatingError.textContent = "";
  });
});

/* =====================================
   VALIDATION
===================================== */

function clearErrors() {
  document.querySelectorAll(".CR-error").forEach(e => e.textContent = "");
}

function validate() {

  clearErrors();
  let valid = true;

  const ratingValue = Number(CRRating.value);

  if (!CRCustomerName.value.trim()) {
    CRCustomerName.nextElementSibling.textContent = "Name required";
    valid = false;
  }

  if (!CRProduct.value.trim()) {
    CRProduct.nextElementSibling.textContent = "Product required";
    valid = false;
  }

  if (!ratingValue) {
    CRRatingError.textContent = "Star rating required";
    valid = false;
  }

  if (ratingValue < 1 || ratingValue > 5) {
    CRRatingError.textContent = "Rating must be between 1-5";
    valid = false;
  }

  if (!CRReview.value.trim()) {
    CRReview.nextElementSibling.textContent = "Review required";
    valid = false;
  }

  if (CRReview.value.trim().length < 10) {
    CRReview.nextElementSibling.textContent = "Minimum 10 characters required";
    valid = false;
  }

  return valid;
}

/* =====================================
   CONFIRM MODAL
===================================== */

function openConfirm(message, callback) {
  CRConfirmMessage.textContent = message;
  CRConfirmPopup.style.display = "flex";
  confirmCallback = callback;
}

CRConfirmCancel.addEventListener("click", () => {
  CRConfirmPopup.style.display = "none";
});

CRConfirmOk.addEventListener("click", () => {
  if (confirmCallback) confirmCallback();
  CRConfirmPopup.style.display = "none";
});

/* =====================================
   EDIT / DELETE
===================================== */

document.addEventListener("click", function (e) {

  if (e.target.classList.contains("CR-edit-btn")) {

    editCard = e.target.closest(".CR-card");

    const nameEl = editCard.querySelector(".CR-name") ||
      editCard.querySelector(".CR-info div:nth-child(1) p");

    const productEl = editCard.querySelector(".CR-product") ||
      editCard.querySelector(".CR-info div:nth-child(2) p");

    const reviewEl = editCard.querySelector(".CR-review-text") ||
      editCard.querySelector(".CR-review p");

    CRCustomerName.value = nameEl.innerText;
    CRProduct.value = productEl.innerText;
    CRRating.value = editCard.querySelector(".CR-rating-number").innerText;
    CRReview.value = reviewEl.innerText;

    const imgSrc = editCard.querySelector(".CR-img-box img").src;

    CRUploadPreview.innerHTML = `
      <img src="${imgSrc}" />
      <span class="CR-remove-photo">✖</span>
    `;
    CRUploadPreview.classList.add("has-image");

    CRStarInputs.forEach((s, i) => {
      s.classList.toggle("filled", i < CRRating.value);
    });

    openPopup();
  }

  if (e.target.classList.contains("CR-delete-btn")) {

    const card = e.target.closest(".CR-card");

    if (card.classList.contains("CR-fixed")) {
      showToast("Minimum 4 reviews required. Cannot delete.");
      return;
    }

    openConfirm("Delete this review?", () => {
      card.remove();
    });
  }
});
/* =====================================
   TOGGLE CONTROL (ONLY FIXED CARDS)
===================================== */

document.addEventListener("change", function (e) {

  const toggle = e.target;

  if (!toggle.matches(".CR-switch input")) return;

  const card = toggle.closest(".CR-card");

  // 🚨 Only block fixed 4 cards
  if (card.classList.contains("CR-fixed")) {

    // Force toggle back ON
    toggle.checked = true;

    showToast("Unable to inactive as minimum 4 reviews should be active");
  }

});
/* =====================================
   TOAST
===================================== */

function showToast(message) {

  const toast = document.createElement("div");
  toast.className = "CR-toast";
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

/* =====================================
   PUBLISH
===================================== */

function handlePublish() {

  if (!validate()) return;

  if (editCard) {
    updateCard(editCard);
  } else {
    createCard();
  }

  closePopup();
}

function updateCard(card) {

  const nameEl = card.querySelector(".CR-name") ||
    card.querySelector(".CR-info div:nth-child(1) p");

  const productEl = card.querySelector(".CR-product") ||
    card.querySelector(".CR-info div:nth-child(2) p");

  const reviewEl = card.querySelector(".CR-review-text") ||
    card.querySelector(".CR-review p");

  nameEl.innerText = CRCustomerName.value;
  productEl.innerText = CRProduct.value;
  reviewEl.innerText = CRReview.value;

  card.querySelector(".CR-rating-number").innerText = CRRating.value;

  const previewImg = CRUploadPreview.querySelector("img");

  if (previewImg) {
    card.querySelector(".CR-img-box img").src = previewImg.src;
  }

  const stars = card.querySelectorAll(".CR-star");

  stars.forEach((star, i) => {
    star.classList.toggle("filled", i < CRRating.value);
  });
}

function createCard() {

  const newCard = CRCardTemplate.cloneNode(true);
  newCard.removeAttribute("id");
  newCard.style.display = "flex";
  newCard.classList.remove("CR-template");

  const today = new Date();
  const formattedDate =
    String(today.getDate()).padStart(2, '0') + '/' +
    String(today.getMonth() + 1).padStart(2, '0') + '/' +
    today.getFullYear();

  newCard.querySelector(".CR-date").innerText = formattedDate;

  updateCard(newCard);

  const previewImg = CRUploadPreview.querySelector("img");

  if (!previewImg) {
    newCard.querySelector(".CR-img-box img").src =
      "../assets/developerHMExplorecategory1/proimg.jpg";
  }

  const fixedCards = document.querySelectorAll(".CR-fixed");
  fixedCards[fixedCards.length - 1]
    .insertAdjacentElement("afterend", newCard);
}

CRPublishBtn.addEventListener("click", handlePublish);
CRPublishBtnRes.addEventListener("click", handlePublish);

document
  .querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(4)")
  ?.classList.add("sidebar-active");

document
  .querySelector("#account-menu .mobile-dropdown:nth-child(4) .dropdown-header")
  ?.classList.add("dropdown-header-active");