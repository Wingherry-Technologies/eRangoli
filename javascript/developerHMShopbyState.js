// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon=document.querySelector("#hamburger-menu>img");
var mobileBack=document.querySelector(".mobile-back-button");


hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display="none"
    document.querySelector("body").style.overflow="hidden"
    window.scrollTo(0, 0);
    mobileBack.style.display="none"
  }
  else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow="auto";
    document.querySelector(".bottom-nav").style.display="flex";
    mobileBack.style.display="flex"
  }
});

const addCard = document.querySelector(".DHMSS-add-card");
const popup = document.getElementById("DHMSS-addCategoryPopup");
const closePopup = document.getElementById("DHMSS-closePopup");
const pageWrapper = document.querySelector(".DHMSS-page-wrapper");

addCard.addEventListener("click", () => {
  if (window.innerWidth <= 595) {
    pageWrapper.style.display = "none";
    popup.style.display = "block";
  } else {
    popup.style.display = "flex";
  }
});

closePopup.addEventListener("click", () => {
  popup.style.display = "none";
  if (window.innerWidth <= 595) {
    pageWrapper.style.display = "block";
  }
});

popup.addEventListener("click", (e) => {
  if (e.target === popup && window.innerWidth > 595) {
    popup.style.display = "none";
  }
});

const uploadBox = document.getElementById("DHMSS-uploadBox");
const mediaInput = document.getElementById("DHMSS-mediaInput");
const uploadContent = document.getElementById("DHMSS-uploadContent");

uploadBox.addEventListener("click", () => {
  mediaInput.click();
});

uploadBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    mediaInput.click();
  }
});

mediaInput.addEventListener("change", () => {
  const file = mediaInput.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    mediaInput.value = "";
    return;
  }
  uploadBox.querySelectorAll("img").forEach((el) => el.remove());
  const previewEl = document.createElement("img");
  previewEl.src = URL.createObjectURL(file);
  uploadContent.style.display = "none";
  uploadBox.appendChild(previewEl);
});

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

const publishBtn = document.getElementById("DHMSS-publishCategory");
const categoryGrid = document.querySelector(".DHMSS-category-grid");
const categoryName = document.getElementById("DHMSS-categoryName");
const ctaLink = document.getElementById("DHMSS-ctaLink");
const ctaDescription = document.getElementById("DHMSS-ctaDescription");

const imageError = document.getElementById("DHMSS-imageError");
const stateError = document.getElementById("DHMSS-stateError");
const descError = document.getElementById("DHMSS-descError");
const linkError = document.getElementById("DHMSS-linkError");

publishBtn.addEventListener("click", (e) => {
  e.preventDefault();

  imageError.innerText = "";
  stateError.innerText = "";
  descError.innerText = "";
  linkError.innerText = "";

  let hasError = false;
  const file = mediaInput.files[0];

  if (!file) {
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

  const card = document.createElement("div");
  card.className = "DHMSS-category-card";

  const mediaURL = URL.createObjectURL(file);

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

  popup.style.display = "none";
  if (window.innerWidth <= 595) {
    pageWrapper.style.display = "block";
  }

  mediaInput.value = "";
  categoryName.value = "";
  ctaDescription.value = "";
  ctaLink.value = "";

  uploadBox.querySelectorAll("img").forEach((el) => el.remove());
  uploadContent.style.display = "flex";
});

const deleteBtn = document.querySelector(".DHMSS-btn-outline");

deleteBtn.addEventListener("click", () => {
  popup.style.display = "none";
  if (window.innerWidth <= 595) {
    pageWrapper.style.display = "block";
  }
});

function handleResponsiveState() {
  if (window.innerWidth <= 595) {
    popup.style.display = "none";
    pageWrapper.style.display = "block";
  }
}

window.addEventListener("load", handleResponsiveState);
window.addEventListener("resize", handleResponsiveState);

document.querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(4)").classList.add("sidebar-active");


document.querySelector("#account-menu .mobile-dropdown:nth-child(4) .dropdown-header").classList.add("dropdown-header-active");

