// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon = document.querySelector("#hamburger-menu>img");
var mobileBack = document.querySelector(".mobile-back-button");
const plusIcon=document.querySelector(".floating-add-btn");

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


function showToast(message) {
  const toast = document.getElementById("customToast");
  const toastMsg = document.getElementById("toastMessage");

  toastMsg.textContent = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 2500);
}

let currentEditCard = null;
let pendingDeleteCard = null;
let editImageDataUrl = null;
let isEditMode = false;
let popupWasOpen = false;
let lastBreakpoint = getBreakpoint();

function getBreakpoint() {
  if (window.innerWidth <= 595) return "mobile";
  if (window.innerWidth <= 1024) return "tablet";
  return "desktop";
}

//  ELEMENT REFS
const popup = document.getElementById("artisanPopup");
const closePopupBtn = document.getElementById("closePopup");
const addNewBtn = document.querySelector(".add-btn");
const floatingAddBtn = document.querySelector(".floating-add-btn");
const publishBtn = document.getElementById("publishBtn");
const publishBtnRes = document.getElementById("publishBtnRes");
const cancelBtn = document.getElementById("cancelBtn");
const cancelBtnRes = document.getElementById("cancelBtnRes");
const popupTitle = document.getElementById("popupTitle");
const uploadInput = document.getElementById("profileUpload");
const uploadPreview = document.getElementById("uploadPreview");
const uploadText = document.getElementById("uploadText");
const inputName = document.getElementById("inputName");
const inputLocation = document.getElementById("inputLocation");
const inputCraft = document.getElementById("inputCraft");
const inputBio = document.getElementById("inputBio");

const deleteConfirmPopup = document.getElementById("deleteConfirmPopup");
const deleteOkBtn = document.getElementById("deleteOkBtn");
const deleteCancelBtn = document.getElementById("deleteCancelBtn");

//  DELETE CONFIRMATION
function openDeleteConfirm(card) {
  pendingDeleteCard = card;
  deleteConfirmPopup.classList.add("active");
}

function closeDeleteConfirm() {
  pendingDeleteCard = null;
  deleteConfirmPopup.classList.remove("active");
}

deleteOkBtn.addEventListener("click", () => {
  if (pendingDeleteCard) {
    pendingDeleteCard.remove();
  }
  closeDeleteConfirm();
});

deleteCancelBtn.addEventListener("click", closeDeleteConfirm);

// Close delete popup on overlay click
deleteConfirmPopup.addEventListener("click", (e) => {
  if (e.target === deleteConfirmPopup) {
    closeDeleteConfirm();
  }
});

//  DELEGATE DELETE & EDIT FOR ALL CARDS
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const card = e.target.closest(".artisan-card");

    if (card.classList.contains("fixed-card")) {
      showToast("Unable to delete as minimum 4 Artisan should be there");
      return;
    }

    openDeleteConfirm(card);
  }

  if (e.target.classList.contains("edit-btn")) {
    const card = e.target.closest(".artisan-card");
    openEditPopup(card);
  }
});

// toogle for fixed cards
document.addEventListener("change", (e) => {
  if (e.target.closest(".switch input")) {
    const checkbox = e.target;
    const card = checkbox.closest(".artisan-card");

    if (card.classList.contains("fixed-card")) {
      checkbox.checked = !checkbox.checked;
      showToast("Unable to inactive as minimum 4 Artisan should be active");
    }
  }
});

//  POPUP OPEN / CLOSE
function openPopup() {
  popupWasOpen = true;
  if (window.innerWidth <= 595) {
    popup.classList.add("mobile-full");
    popup.style.display = "block";
  } else {
    popup.classList.remove("mobile-full");
    popup.style.display = "flex";
  }
}

function closePopupHandler() {
  popup.classList.remove("mobile-full");
  popup.style.display = "none";
  popupWasOpen = false;
  resetPopupForm();
}

function setCancelButtonVisibility(visible) {
  const display = visible ? "block" : "none";
  const flexDisplay = visible ? "flex" : "none";
  if (cancelBtn) cancelBtn.style.display = display;
  if (cancelBtnRes) cancelBtnRes.style.display = display;
}

function openAddNewPopup() {
  isEditMode = false;
  currentEditCard = null;
  editImageDataUrl = null;
  popupTitle.textContent = "Add New Artisan Story";
  uploadText.textContent = "Upload Profile Photo";
  uploadPreview.innerHTML = "";
  inputName.value = "";
  inputLocation.value = "";
  inputCraft.value = "";
  inputBio.value = "";
  clearAllErrors();
  setCancelButtonVisibility(false);
  openPopup();
}

function openEditPopup(card) {
  isEditMode = true;
  currentEditCard = card;

  popupTitle.textContent = "Edit Artisan Story";
  uploadText.textContent = "Update Profile Photo";

  // Pre-fill fields
  const infoLabels = card.querySelectorAll(".artisan-info > div");
  inputName.value = infoLabels[0]
    ? infoLabels[0].querySelector("p").textContent.trim()
    : "";
  inputLocation.value = infoLabels[1]
    ? infoLabels[1].querySelector("p").textContent.trim()
    : "";
  inputCraft.value = infoLabels[2]
    ? infoLabels[2].querySelector("p").textContent.trim()
    : "";
  inputBio.value = card.querySelector(".artisan-bio p").textContent.trim();

  // Pre-fill image
  const cardImg = card.querySelector(".artisan-img-box img");
  if (cardImg) {
  editImageDataUrl = cardImg.src;

  uploadPreview.innerHTML = `
    <div class="preview-wrapper">
      <img src="${cardImg.src}" />
      <span class="remove-img" id="removeImageBtn">&times;</span>
    </div>
  `;
} else {
  editImageDataUrl = null;
  uploadPreview.innerHTML = "";
}

  clearAllErrors();
  setCancelButtonVisibility(true);
  openPopup();
}

function resetPopupForm() {
  isEditMode = false;
  currentEditCard = null;
  editImageDataUrl = null;
  popupTitle.textContent = "Add New Artisan Story";
  uploadText.textContent = "Upload Profile Photo";
  uploadPreview.innerHTML = "";
  inputName.value = "";
  inputLocation.value = "";
  inputCraft.value = "";
  inputBio.value = "";
  clearAllErrors();
  setCancelButtonVisibility(false);
  uploadInput.value = "";
}

//  VALIDATION
function clearAllErrors() {
  [
    "photoError",
    "nameError",
    "locationError",
    "craftError",
    "bioError",
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = "";
  });
  [inputName, inputLocation, inputCraft, inputBio].forEach((el) => {
    el.classList.remove("input-error");
  });
  uploadPreview.classList.remove("input-error");
}

function validateForm() {
  clearAllErrors();
  let valid = true;

  // Photo
  const hasPhoto =
    uploadPreview.querySelector("img") !== null || editImageDataUrl;
  if (!hasPhoto) {
    document.getElementById("photoError").textContent =
      "Profile photo is required.";
    uploadPreview.classList.add("input-error");
    valid = false;
  }

  // Name
  if (!inputName.value.trim()) {
    document.getElementById("nameError").textContent =
      "Artisan name is required.";
    inputName.classList.add("input-error");
    valid = false;
  }

  // Location
  if (!inputLocation.value.trim()) {
    document.getElementById("locationError").textContent =
      "Location is required.";
    inputLocation.classList.add("input-error");
    valid = false;
  }

  // Craft
  if (!inputCraft.value.trim()) {
    document.getElementById("craftError").textContent = "Craft is required.";
    inputCraft.classList.add("input-error");
    valid = false;
  }

  // Bio
  if (!inputBio.value.trim()) {
    document.getElementById("bioError").textContent = "Biography is required.";
    inputBio.classList.add("input-error");
    valid = false;
  }

  return valid;
}

//  PUBLISH
function handlePublish() {
  if (!validateForm()) return;

  const imgSrc = uploadPreview.querySelector("img")
    ? uploadPreview.querySelector("img").src
    : editImageDataUrl || "";

  const name = inputName.value.trim();
  const location = inputLocation.value.trim();
  const craft = inputCraft.value.trim();
  const bio = inputBio.value.trim();

  if (isEditMode && currentEditCard) {
    // UPDATE existing card
    const infoLabels = currentEditCard.querySelectorAll(".artisan-info > div");
    if (infoLabels[0]) infoLabels[0].querySelector("p").textContent = name;
    if (infoLabels[1]) infoLabels[1].querySelector("p").textContent = location;
    if (infoLabels[2]) infoLabels[2].querySelector("p").textContent = craft;
    currentEditCard.querySelector(".artisan-bio p").textContent = bio;
    if (imgSrc) {
      currentEditCard.querySelector(".artisan-img-box img").src = imgSrc;
    }
  } else {
    // ADD new card
    const newCard = createCardHTML(imgSrc, name, location, craft, bio);
    document.querySelector(".artisan-wrapper").appendChild(newCard);
  }

  closePopupHandler();
}

function createCardHTML(imgSrc, name, location, craft, bio) {
  const card = document.createElement("div");
  card.className = "artisan-card";
  card.innerHTML = `
    <div class="artisan-img-box">
      <img src="${imgSrc}" alt="artisan" />
    </div>
    <div class="artisan-content">
      <div class="artisan-top">
        <div class="artisan-info">
          <div>
            <label>Artisan Name</label>
            <p>${name}</p>
          </div>
          <div>
            <label>Location</label>
            <p>${location}</p>
          </div>
          <div>
            <label>Craft</label>
            <p>${craft}</p>
          </div>
        </div>
        <div class="artisan-actions">
          <img src="../assets/developerHMArtisanStory/delete.svg" class="delete-btn" />
          <img src="../assets/developerHMArtisanStory/edit.svg" class="edit-btn" />
        </div>
      </div>
      <div class="artisan-bio">
        <label>Biography</label>
        <p>${bio}</p>
      </div>
      <div class="artisan-bottom">
        <div class="artisan-divider"></div>
        <div class="artisan-status">
          <span>Active status</span>
          <label class="switch">
            <input type="checkbox" checked />
            <span class="slider"></span>
          </label>
        </div>
      </div>
    </div>
  `;
  return card;
}

//  BUTTON BINDINGS
if (addNewBtn) addNewBtn.addEventListener("click", openAddNewPopup);
if (floatingAddBtn) floatingAddBtn.addEventListener("click", openAddNewPopup);
if (closePopupBtn) closePopupBtn.addEventListener("click", closePopupHandler);
if (publishBtn) publishBtn.addEventListener("click", handlePublish);
if (publishBtnRes) publishBtnRes.addEventListener("click", handlePublish);
if (cancelBtn) cancelBtn.addEventListener("click", closePopupHandler);
if (cancelBtnRes) cancelBtnRes.addEventListener("click", closePopupHandler);

// Close popup on overlay click (desktop/tablet only)
popup.addEventListener("click", (e) => {
  if (window.innerWidth > 595 && e.target === popup) {
    closePopupHandler();
  }
});

document.addEventListener("click", (e) => {
  if (e.target.id === "removeImageBtn") {
    uploadPreview.innerHTML = "";
    editImageDataUrl = null;
    uploadInput.value = "";
  }
});
//IMAGE UPLOAD
if (uploadInput) {
  uploadInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      uploadPreview.innerHTML = `
  <div class="preview-wrapper">
    <img src="${e.target.result}" />
    <span class="remove-img" id="removeImageBtn">&times;</span>
  </div>
`;
      editImageDataUrl = e.target.result;
      uploadPreview.classList.remove("input-error");
      document.getElementById("photoError").textContent = "";
    };
    reader.readAsDataURL(file);
  });
}

if (uploadText) {
  uploadText.addEventListener("click", () => {
    uploadInput.click();
  });
}

//  RESIZE HANDLING
window.addEventListener("resize", () => {
  const newBreakpoint = getBreakpoint();

  if (popupWasOpen && newBreakpoint !== lastBreakpoint) {
    closePopupHandler();
  }

  lastBreakpoint = newBreakpoint;
});

document
  .querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(4)")
  ?.classList.add("sidebar-active");

document
  .querySelector("#account-menu .mobile-dropdown:nth-child(4) .dropdown-header")
  ?.classList.add("dropdown-header-active");
