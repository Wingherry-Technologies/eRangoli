// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon = document.querySelector("#hamburger-menu>img");
var mobileBack = document.querySelector(".mobile-back-button");

hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
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

const DHMTC_addCard = document.querySelector(".DHMTC-add-card");
const DHMTC_popup = document.getElementById("DHMTC-addCategoryPopup");
const DHMTC_closePopup = document.getElementById("DHMTC-closePopup");
const DHMTC_pageWrapper = document.querySelector(".DHMTC-page-wrapper");
const DHMTC_page_header_mob = document.querySelector(".mobile-back-button h3");

const DHMTC_uploadBox = document.getElementById("DHMTC-uploadBox");
const DHMTC_mediaInput = document.getElementById("DHMTC-mediaInput");
const DHMTC_uploadContent = document.getElementById("DHMTC-uploadContent");

const DHMTC_minCategoryPopup = document.getElementById(
  "DHMTC-minCategoryPopup",
);
const DHMTC_closeMinPopup = document.getElementById("DHMTC-closeMinPopup");

const DHMTC_categoryCountEl = document.getElementById("DHMTC-categoryCount");
const DHMTC_publishBtn = document.getElementById("DHMTC-publishCategory");
const DHMTC_categoryGrid = document.querySelector(".DHMTC-category-grid");
const DHMTC_categoryName = document.getElementById("DHMTC-categoryName");
const DHMTC_ctaLink = document.getElementById("DHMTC-ctaLink");

const DHMTC_imageError = document.getElementById("DHMTC-imageError");
const DHMTC_categoryError = document.getElementById("DHMTC-categoryError");
const DHMTC_linkError = document.getElementById("DHMTC-linkError");

const DHMTC_deleteBtn = document.querySelector(".DHMTC-btn-outline");

let previewImage = null;

function resetUploadBox() {
  DHMTC_mediaInput.value = "";
  if (previewImage) {
    previewImage.remove();
    previewImage = null;
  }
  DHMTC_uploadContent.style.display = "flex";
}

DHMTC_addCard.addEventListener("click", () => {
  resetUploadBox();
  if (window.innerWidth <= 595) {
    DHMTC_pageWrapper.style.display = "none";
    DHMTC_popup.style.display = "block";
    DHMTC_page_header_mob.innerText = "Add New Category";
  } else {
    DHMTC_popup.style.display = "flex";
  }
});

DHMTC_closePopup.addEventListener("click", () => {
  DHMTC_popup.style.display = "none";
  resetUploadBox();
  if (window.innerWidth <= 595) {
    DHMTC_pageWrapper.style.display = "block";
  }
});

DHMTC_popup.addEventListener("click", (e) => {
  if (e.target === DHMTC_popup && window.innerWidth > 595) {
    DHMTC_popup.style.display = "none";
    resetUploadBox();
  }
});

DHMTC_uploadBox.addEventListener("click", () => {
  DHMTC_mediaInput.click();
});

DHMTC_mediaInput.addEventListener("change", () => {
  const file = DHMTC_mediaInput.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    DHMTC_mediaInput.value = "";
    return;
  }

  if (previewImage) previewImage.remove();

  previewImage = document.createElement("img");
  previewImage.src = URL.createObjectURL(file);

  DHMTC_uploadContent.style.display = "none";
  DHMTC_uploadBox.appendChild(previewImage);
});

function showMinCategoryError() {
  DHMTC_minCategoryPopup.style.display = "flex";
  setTimeout(() => {
    DHMTC_minCategoryPopup.style.display = "none";
  }, 4000);
}

DHMTC_closeMinPopup.addEventListener("click", () => {
  DHMTC_minCategoryPopup.style.display = "none";
});

function bindToggleValidation() {
  const toggles = document.querySelectorAll(".DHMTC-switch input");
  toggles.forEach((toggle) => {
    toggle.onchange = function () {
      const activeCount = document.querySelectorAll(
        ".DHMTC-switch input:checked",
      ).length;
      if (!this.checked && activeCount < 5) {
        this.checked = true;
        showMinCategoryError();
      }
    };
  });
}

bindToggleValidation();

function updateCategoryCount() {
  const totalCategories = document.querySelectorAll(
    ".DHMTC-category-card",
  ).length;
  DHMTC_categoryCountEl.innerText = `${totalCategories} categories`;
}

DHMTC_publishBtn.addEventListener("click", (e) => {
  e.preventDefault();

  DHMTC_imageError.innerText = "";
  DHMTC_categoryError.innerText = "";
  DHMTC_linkError.innerText = "";

  let hasError = false;
  const file = DHMTC_mediaInput.files[0];

  if (!file) {
    DHMTC_imageError.innerText = "Cover image is required";
    hasError = true;
  }

  if (!DHMTC_categoryName.value.trim()) {
    DHMTC_categoryError.innerText = "Category is required";
    hasError = true;
  }

  if (!DHMTC_ctaLink.value.trim()) {
    DHMTC_linkError.innerText = "CTA link is required";
    hasError = true;
  }

  if (hasError) return;

  const card = document.createElement("div");
  card.className = "DHMTC-category-card";

  const mediaURL = URL.createObjectURL(file);
  const totalCategories =
    document.querySelectorAll(".DHMTC-category-card").length + 1;

  card.innerHTML = `
    <div class="DHMTC-image-wrap">
      <img src="${mediaURL}" />
      <span class="DHMTC-edit-btn">
        <img src="../assets/developerHMTopCattegories/edit.svg" />
      </span>
    </div>
    <div class="DHMTC-card-body">
      <div class="DHMTC-card-top">
        <div>
          <h4>Category ${totalCategories}</h4>
          <p>${DHMTC_categoryName.value}</p>
        </div>
        <label class="DHMTC-switch">
          <input type="checkbox" checked />
          <span class="DHMTC-slider"></span>
        </label>
      </div>
      <span class="DHMTC-cta-title">CTA Link</span>
      <a href="${DHMTC_ctaLink.value}">${DHMTC_ctaLink.value}</a>
    </div>
  `;

  const DHMTC_addCardEl = document.querySelector(".DHMTC-add-card");
  DHMTC_categoryGrid.insertBefore(card, DHMTC_addCardEl);
  DHMTC_categoryGrid.appendChild(DHMTC_addCardEl);

  updateCategoryCount();
  bindToggleValidation();

  DHMTC_popup.style.display = "none";

  if (window.innerWidth <= 595) {
    DHMTC_pageWrapper.style.display = "block";
    document.querySelector(".mobile-back-button h3").innerText =
      "Top Categories";
  }

  DHMTC_categoryName.value = "";
  DHMTC_ctaLink.value = "";
  resetUploadBox();
});

DHMTC_deleteBtn.addEventListener("click", () => {
  DHMTC_popup.style.display = "none";
  resetUploadBox();
  if (window.innerWidth <= 595) {
    DHMTC_pageWrapper.style.display = "block";
  }
});

function DHMTC_handleResponsiveState() {
  if (window.innerWidth <= 595) {
    DHMTC_popup.style.display = "none";
    DHMTC_pageWrapper.style.display = "block";
  }
}

window.addEventListener("load", DHMTC_handleResponsiveState);
window.addEventListener("resize", DHMTC_handleResponsiveState);

document
  .querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(4)")
  .classList.add("sidebar-active");

document
  .querySelector("#account-menu .mobile-dropdown:nth-child(4) .dropdown-header")
  .classList.add("dropdown-header-active");
