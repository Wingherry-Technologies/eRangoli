// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon = document.querySelector("#hamburger-menu>img");
var mobileBack = document.querySelector(".mobile-back-button");

hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display = "none";
    document.querySelector("body").style.overflow = "hidden";
    window.scrollTo(0, 0);
    mobileBack.style.display = "none";
  } else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow = "auto";
    document.querySelector(".bottom-nav").style.display = "flex";
    mobileBack.style.display = "flex";
  }
});

const addCard = document.querySelector(".DHMSS-add-card");
const popup = document.getElementById("DHMSS-addCategoryPopup");
const closePopup = document.getElementById("DHMSS-closePopup");
const pageWrapper = document.querySelector(".DHMSS-page-wrapper");
const popupHeader = document.querySelector(".DHMSS-popup-header h3");
const publishBtn = document.getElementById("DHMSS-publishCategory");
const deleteBtn = document.getElementById("DHMSS-deleteBtn");

// Track edit mode
let editMode = false;
let editingCard = null;

function openPopup() {
  if (window.innerWidth <= 595) {
    pageWrapper.style.display = "none";
    popup.style.display = "block";
  } else {
    popup.style.display = "flex";
  }
}

function closePopupHandler() {
  popup.style.display = "none";
  if (window.innerWidth <= 595) {
    pageWrapper.style.display = "block";
  }
}

function setPopupButtonMode(mode) {
  const cancelBtnEl = document.getElementById("DHMSS-cancelBtn");
  if (mode === "edit") {
    if (cancelBtnEl) cancelBtnEl.style.display = "none";
    if (deleteBtn) deleteBtn.style.display = "block";
  } else {
    if (cancelBtnEl) cancelBtnEl.style.display = "block";
    if (deleteBtn) deleteBtn.style.display = "none";
  }
}

addCard.addEventListener("click", () => {
  editMode = false;
  editingCard = null;
  popupHeader.textContent = "Add New State";
  publishBtn.textContent = "Publish";
  resetForm();
  setPopupButtonMode("add");
  openPopup();
});

closePopup.addEventListener("click", closePopupHandler);

popup.addEventListener("click", (e) => {
  if (e.target === popup && window.innerWidth > 595) {
    closePopupHandler();
  }
});

// Upload box elements
const uploadBox = document.getElementById("DHMSS-uploadBox");
const mediaInput = document.getElementById("DHMSS-mediaInput");
const uploadContent = document.getElementById("DHMSS-uploadContent");
const dotsBtn = document.getElementById("DHMSS-imageDotsBtn");
const dotsDropdown = document.getElementById("DHMSS-imageDotsDropdown");
const changeImageBtn = document.getElementById("DHMSS-changeImageBtn");

uploadBox.addEventListener("click", (e) => {
  if (
    e.target.closest(".DHMSS-image-dots-btn") ||
    e.target.closest(".DHMSS-image-dots-dropdown")
  )
    return;
  const hasPreview = !!uploadBox.querySelector("img.DHMSS-preview-img");
  if (!hasPreview) {
    mediaInput.click();
  }
});

uploadBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    const hasPreview = !!uploadBox.querySelector("img.DHMSS-preview-img");
    if (!hasPreview) mediaInput.click();
  }
});

// Dots button: toggle dropdown
dotsBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  dotsDropdown.style.display =
    dotsDropdown.style.display === "none" ? "block" : "none";
});

// Change Image: open file input
changeImageBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  dotsDropdown.style.display = "none";
  mediaInput.value = "";
  mediaInput.click();
});

// Close dropdown when clicking outside
document.addEventListener("click", () => {
  dotsDropdown.style.display = "none";
});

mediaInput.addEventListener("change", () => {
  const file = mediaInput.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    mediaInput.value = "";
    return;
  }
  setImagePreview(URL.createObjectURL(file));
});

function setImagePreview(src) {
  const existingPreview = uploadBox.querySelector("img.DHMSS-preview-img");
  if (existingPreview) existingPreview.remove();

  const previewEl = document.createElement("img");
  previewEl.src = src;
  previewEl.className = "DHMSS-preview-img";
  previewEl.style.cssText =
    "width:100%;height:100%;object-fit:cover;border-radius:10px;position:absolute;top:0;left:0;margin:0;padding:0;";
  uploadContent.style.display = "none";
  uploadBox.appendChild(previewEl);
  dotsBtn.style.display = "flex";
}

function resetForm() {
  const categoryName = document.getElementById("DHMSS-categoryName");
  const ctaLink = document.getElementById("DHMSS-ctaLink");
  const ctaDescription = document.getElementById("DHMSS-ctaDescription");

  mediaInput.value = "";
  categoryName.value = categoryName.options[0].value;
  ctaDescription.value = "";
  ctaLink.value = "";

  const existingPreview = uploadBox.querySelector("img.DHMSS-preview-img");
  if (existingPreview) existingPreview.remove();
  uploadContent.style.display = "flex";
  dotsBtn.style.display = "none";
  dotsDropdown.style.display = "none";

  // Clear errors
  document.getElementById("DHMSS-imageError").innerText = "";
  document.getElementById("DHMSS-stateError").innerText = "";
  document.getElementById("DHMSS-descError").innerText = "";
  document.getElementById("DHMSS-linkError").innerText = "";
}

// Error popup
const minCategoryPopup = document.getElementById("DHMSS-minCategoryPopup");
const closeMinPopup = document.getElementById("DHMSS-closeMinPopup");

function showMinCategoryError() {
  minCategoryPopup.style.display = "flex";
  setTimeout(() => {
    minCategoryPopup.style.display = "none";
  }, 4000);
}

closeMinPopup.addEventListener("click", () => {
  minCategoryPopup.style.display = "none";
});

function bindToggleValidation() {
  const toggles = document.querySelectorAll(".DHMSS-switch input");
  toggles.forEach((toggle) => {
    toggle.onchange = function () {
      const activeCount = document.querySelectorAll(
        ".DHMSS-switch input:checked",
      ).length;
      if (!this.checked && activeCount < 5) {
        this.checked = true;
        showMinCategoryError();
      }
    };
  });
}

bindToggleValidation();

const stateCountEl = document.getElementById("DHMSS-stateCount");

function updatestateCount() {
  const totalCategories = document.querySelectorAll(
    ".DHMSS-category-card",
  ).length;
  stateCountEl.innerText = `${totalCategories} States`;
}

const categoryGrid = document.querySelector(".DHMSS-category-grid");

categoryGrid.addEventListener("click", (e) => {
  const editBtn = e.target.closest(".DHMSS-edit-btn");
  if (!editBtn) return;

  const card = editBtn.closest(".DHMSS-category-card");
  if (!card) return;

  editMode = true;
  editingCard = card;
  popupHeader.textContent = "Edit State";
  publishBtn.textContent = "Update";

  const categoryName = document.getElementById("DHMSS-categoryName");
  const ctaLink = document.getElementById("DHMSS-ctaLink");
  const ctaDescription = document.getElementById("DHMSS-ctaDescription");

  const stateName = card.querySelector(".DHMSS-card-body p").textContent.trim();
  const description = card
    .querySelector(".DHMSS-cta-describe")
    .textContent.trim();
  const link = card.querySelector(".DHMSS-card-body a").getAttribute("href");
  const imgSrc = card
    .querySelector(".DHMSS-image-wrap > img")
    .getAttribute("src");

  // Set state select value
  for (let option of categoryName.options) {
    if (option.value === stateName) {
      option.selected = true;
      break;
    }
  }
  categoryName.value = stateName;

  ctaDescription.value = description;
  ctaLink.value = link;

  // Show existing image preview
  mediaInput.value = "";
  const existingPreview = uploadBox.querySelector("img.DHMSS-preview-img");
  if (existingPreview) existingPreview.remove();
  uploadContent.style.display = "none";
  setImagePreview(imgSrc);

  // Clear errors
  document.getElementById("DHMSS-imageError").innerText = "";
  document.getElementById("DHMSS-stateError").innerText = "";
  document.getElementById("DHMSS-descError").innerText = "";
  document.getElementById("DHMSS-linkError").innerText = "";

  setPopupButtonMode("edit");
  openPopup();
});

// Publish / Update
publishBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const categoryName = document.getElementById("DHMSS-categoryName");
  const ctaLink = document.getElementById("DHMSS-ctaLink");
  const ctaDescription = document.getElementById("DHMSS-ctaDescription");
  const imageError = document.getElementById("DHMSS-imageError");
  const stateError = document.getElementById("DHMSS-stateError");
  const descError = document.getElementById("DHMSS-descError");
  const linkError = document.getElementById("DHMSS-linkError");

  imageError.innerText = "";
  stateError.innerText = "";
  descError.innerText = "";
  linkError.innerText = "";

  let hasError = false;
  const file = mediaInput.files[0];

  const hasPreview = !!uploadBox.querySelector("img.DHMSS-preview-img");
  if (!file && !hasPreview) {
    imageError.innerText = "Cover image is required";
    hasError = true;
  }

  if (!categoryName.value.trim()) {
    stateError.innerText = "State is required";
    hasError = true;
  }

  if (!ctaDescription.value.trim()) {
    descError.innerText = "Description is required";
    hasError = true;
  }

  if (!ctaLink.value.trim()) {
    linkError.innerText = "CTA link is required";
    hasError = true;
  }

  if (hasError) return;

  if (editMode && editingCard) {
    // UPDATE existing card
    if (file) {
      editingCard.querySelector(".DHMSS-image-wrap > img").src =
        URL.createObjectURL(file);
    }
    editingCard.querySelector(".DHMSS-card-body p").textContent =
      categoryName.value;
    editingCard.querySelector(".DHMSS-cta-describe").textContent =
      ctaDescription.value;
    const linkEl = editingCard.querySelector(".DHMSS-card-body a");
    linkEl.href = ctaLink.value;
    linkEl.textContent = ctaLink.value;
  } else {
    const mediaURL = URL.createObjectURL(file);
    const card = document.createElement("div");
    card.className = "DHMSS-category-card";
    card.innerHTML = `
      <div class="DHMSS-image-wrap">
        <img src="${mediaURL}" />
        <span class="DHMSS-edit-btn">
          <img src="../assets/developerHMTopCattegories/edit.svg" />
        </span>
      </div>
      <div class="DHMSS-card-body">
        <div class="DHMSS-card-top">
          <div>
            <h4>State Name</h4>
            <p>${categoryName.value}</p>
          </div>
          <label class="DHMSS-switch">
            <input type="checkbox" checked />
            <span class="DHMSS-slider"></span>
          </label>
        </div>
        <span class="DHMSS-cta-description">Description</span>
        <p class="DHMSS-cta-describe">${ctaDescription.value}</p>
        <span class="DHMSS-cta-title">CTA Link</span>
        <a href="${ctaLink.value}">${ctaLink.value}</a>
      </div>
    `;

    const addCardEl = document.querySelector(".DHMSS-add-card");
    categoryGrid.insertBefore(card, addCardEl);
    categoryGrid.appendChild(addCardEl);
    updatestateCount();
    bindToggleValidation();
  }

  closePopupHandler();
  resetForm();
  editMode = false;
  editingCard = null;
  popupHeader.textContent = "Add New State";
  publishBtn.textContent = "Publish";
  setPopupButtonMode("add");
});

// Cancel button
const cancelBtn = document.getElementById("DHMSS-cancelBtn");
cancelBtn.addEventListener("click", () => {
  closePopupHandler();
  resetForm();
  editMode = false;
  editingCard = null;
  popupHeader.textContent = "Add New State";
  publishBtn.textContent = "Publish";
  setPopupButtonMode("add");
});

deleteBtn.addEventListener("click", () => {
  if (!editMode || !editingCard) return;

  const totalCategories = document.querySelectorAll(
    ".DHMSS-category-card",
  ).length;
  if (totalCategories <= 5) {
    showMinCategoryError();
    return;
  }

  editingCard.remove();
  updatestateCount();
  bindToggleValidation();

  closePopupHandler();
  resetForm();
  editMode = false;
  editingCard = null;
  popupHeader.textContent = "Add New State";
  publishBtn.textContent = "Publish";
  setPopupButtonMode("add");
});

setPopupButtonMode("add");

function handleResponsiveState() {
  if (window.innerWidth <= 595) {
    popup.style.display = "none";
    pageWrapper.style.display = "block";
  }
}

window.addEventListener("load", handleResponsiveState);
window.addEventListener("resize", handleResponsiveState);

document
  .querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(4)")
  .classList.add("sidebar-active");

document
  .querySelector("#account-menu .mobile-dropdown:nth-child(4) .dropdown-header")
  .classList.add("dropdown-header-active");
