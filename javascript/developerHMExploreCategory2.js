const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon = document.querySelector("#hamburger-menu>img");
var mobileBack = document.querySelector(".mobile-back-button");
const plusIcon = document.querySelector(".ECTwo-floating-add-btn");

hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display = "none";
    document.querySelector("body").style.overflow = "hidden";
    window.scrollTo(0, 0);
    mobileBack.style.display = "none";
    plusIcon.style.display = "none";
  } else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow = "auto";
    document.querySelector(".bottom-nav").style.display = "flex";
    mobileBack.style.display = "flex";
    plusIcon.style.display = "flex";
  }
});

// SIDEBAR ACTIVE STATE
document
  .querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(4)")
  ?.classList.add("sidebar-active");

document
  .querySelector("#account-menu .mobile-dropdown:nth-child(4) .dropdown-header")
  ?.classList.add("dropdown-header-active");

// ELEMENT REFERENCES
const modalOverlayECTwo = document.getElementById("modalOverlayECTwo");
const modalCloseECTwo = document.getElementById("modalCloseECTwo");
const modalSaveBtnECTwo = document.getElementById("modalSaveBtnECTwo");
const imageUploadECTwo = document.getElementById("imageUploadECTwo");
const uploadBoxECTwo = document.getElementById("uploadBoxECTwo");
const uploadTextECTwo = document.getElementById("uploadTextECTwo");
const labelInputECTwo = document.getElementById("labelInputECTwo");
const ctaInputECTwo = document.getElementById("ctaInputECTwo");
const imageErrorECTwo = document.getElementById("imageErrorECTwo");
const labelErrorECTwo = document.getElementById("labelErrorECTwo");
const ctaErrorECTwo = document.getElementById("ctaErrorECTwo");
const floatingAddBtnECTwo = document.querySelector(".ECTwo-floating-add-btn");
const btnAddNewECTwo = document.getElementById("btnAddNewECTwo");
const btnPublishECTwo = document.getElementById("btnPublishECTwo");
const btnDiscardECTwo = document.getElementById("btnDiscardECTwo");
const sectionImageList = document.querySelector(".sectionImageListECTwo");
const previewTitleECTwo = document.querySelector(".previewTitleECTwo");
const inputCategoryTitle = document.getElementById("inputCategoryTitleECTwo");

// STATE
let uploadedFileECTwo = null;
let uploadedDataURL = null;
let imageCardCounter = 5;
let hasUnsavedChanges = false;
let editingCardId = null;
const PREVIEW_SLOTS = ["1", "2", "3", "4"];
function initSlots() {
  const cards = Array.from(
    sectionImageList.querySelectorAll(".cardImageItemECTwo"),
  );
  cards.forEach((card, i) => {
    if (i < 4) {
      card.dataset.previewSlot = String(i + 1);
    } else {
      card.dataset.previewSlot = "none";
    }
  });
}
initSlots();
function findFreePreviewSlot() {
  const cards = Array.from(
    sectionImageList.querySelectorAll(".cardImageItemECTwo"),
  );
  for (const slot of PREVIEW_SLOTS) {
    const occupant = cards.find(
      (c) =>
        c.dataset.previewSlot === slot &&
        c.querySelector(".toggleInputECTwo")?.checked,
    );
    if (!occupant) return slot;
  }
  return "none";
}

// HELPERS
function showError(el, msg) {
  el.classList.add("errorVisibleECTwo");
  el.innerText = msg;
}
function hideError(el) {
  el.classList.remove("errorVisibleECTwo");
}
function isValidLabel(val) {
  return /^[A-Za-z\s]+$/.test(val.trim()) && val.trim() !== "";
}
function isValidURL(val) {
  try {
    const u = new URL(val.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}
function markChanges() {
  hasUnsavedChanges = true;
  btnPublishECTwo.classList.remove("btnPublishHiddenECTwo");
}

// CATEGORY TITLE EDIT FEATURE
(function initCategoryTitleEdit() {
  const editIconWrapper = document.createElement("div");
  editIconWrapper.className = "categoryInputWrapperECTwo";

  const inputClone = inputCategoryTitle.cloneNode(true);
  inputCategoryTitle.replaceWith(editIconWrapper);
  editIconWrapper.appendChild(inputClone);

  const inputEl = editIconWrapper.querySelector("#inputCategoryTitleECTwo");

  const publishInlineBtn = document.createElement("button");
  publishInlineBtn.textContent = "Publish";
  publishInlineBtn.className =
    "publishInlineBtnECTwo publishInlineBtnHiddenECTwo";
  editIconWrapper.appendChild(publishInlineBtn);

  const editIconEl = document.createElement("span");
  editIconEl.className = "editIconSpanECTwo";
  editIconEl.innerHTML = `<img src="../assets/developerHMFeatureBrands/edit.svg" class="editIconImgECTwo" />`;
  editIconWrapper.appendChild(editIconEl);

  const originalTitle = inputEl.value;

  inputEl.addEventListener("keydown", (e) => {
    const allowed = /^[A-Za-z ]$/.test(e.key);
    const ctrl = e.ctrlKey || e.metaKey;
    const nav = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "Home",
      "End",
    ].includes(e.key);
    if (!allowed && !ctrl && !nav) e.preventDefault();
  });

  inputEl.addEventListener("input", () => {
    inputEl.value = inputEl.value.replace(/[^A-Za-z\s]/g, "");
    if (inputEl.value !== originalTitle) {
      publishInlineBtn.classList.remove("publishInlineBtnHiddenECTwo");
    } else {
      publishInlineBtn.classList.add("publishInlineBtnHiddenECTwo");
    }
    if (previewTitleECTwo)
      previewTitleECTwo.textContent = inputEl.value || "Title";
  });

  editIconEl.addEventListener("click", () => {
    inputEl.disabled = false;
    inputEl.classList.add("inputCategoryActiveECTwo");
    inputEl.focus();
    inputEl.select();
  });

  publishInlineBtn.addEventListener("click", () => {
    const val = inputEl.value.trim();
    if (!isValidLabel(val)) {
      alert("Category title can only contain letters and spaces.");
      return;
    }
    inputEl.disabled = true;
    inputEl.classList.remove("inputCategoryActiveECTwo");
    publishInlineBtn.classList.add("publishInlineBtnHiddenECTwo");
    markChanges();
  });
})();
btnPublishECTwo.classList.add("btnPublishHiddenECTwo");

// MODAL OPEN / CLOSE
function openModal(editId) {
  editingCardId = editId || null;
  if (editingCardId) {
    const card = document.getElementById(editingCardId);
    if (card) {
      const thumb = card.querySelector(".thumbImageECTwo");
      const labelVal = card.querySelector(".valueItemECTwo").textContent;
      const ctaVal = card.dataset.cta || "";

      labelInputECTwo.value = labelVal;
      ctaInputECTwo.value = ctaVal;

      const oldImg = uploadBoxECTwo.querySelector(".uploadPreviewImgECTwo");
      if (oldImg) oldImg.remove();
      if (thumb && thumb.src) {
        const prevImg = document.createElement("img");
        prevImg.className = "uploadPreviewImgECTwo";
        prevImg.src = thumb.src;
        uploadBoxECTwo.appendChild(prevImg);
        if (uploadTextECTwo)
          uploadTextECTwo.classList.add("uploadTextHiddenECTwo");
        uploadedDataURL = thumb.src;
      }
    }
    document.querySelector(".modalBoxECTwo h3").textContent =
      "Edit Category Image";
  } else {
    document.querySelector(".modalBoxECTwo h3").textContent =
      "Add an Category Image";
  }

  modalOverlayECTwo.classList.add("modalOverlayVisibleECTwo");
  document.body.classList.add("bodyModalOpenECTwo");
}

function closeModalECTwo() {
  modalOverlayECTwo.classList.remove("modalOverlayVisibleECTwo");
  document.body.classList.remove("bodyModalOpenECTwo");
  resetModalFormECTwo();
  editingCardId = null;
}

function resetModalFormECTwo() {
  labelInputECTwo.value = "";
  ctaInputECTwo.value = "";
  uploadedFileECTwo = null;
  uploadedDataURL = null;
  imageUploadECTwo.value = "";

  const oldImg = uploadBoxECTwo.querySelector(".uploadPreviewImgECTwo");
  if (oldImg) oldImg.remove();
  if (uploadTextECTwo)
    uploadTextECTwo.classList.remove("uploadTextHiddenECTwo");

  hideError(imageErrorECTwo);
  hideError(labelErrorECTwo);
  hideError(ctaErrorECTwo);
  labelInputECTwo.classList.remove("inputErrorECTwo");
  ctaInputECTwo.classList.remove("inputErrorECTwo");
}

btnAddNewECTwo.addEventListener("click", () => openModal(null));
floatingAddBtnECTwo.addEventListener("click", () => openModal(null));
modalCloseECTwo.addEventListener("click", closeModalECTwo);
modalOverlayECTwo.addEventListener("click", (e) => {
  if (e.target === modalOverlayECTwo) closeModalECTwo();
});

// IMAGE UPLOAD VALIDATION
uploadBoxECTwo.addEventListener("click", () => imageUploadECTwo.click());

imageUploadECTwo.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
    "image/bmp",
    "image/avif",
  ];
  const blockedExt = ["pdf", "doc", "docx", "zip", "exe"];
  const ext = file.name.split(".").pop().toLowerCase();

  if (blockedExt.includes(ext)) {
    showError(
      imageErrorECTwo,
      "File type not allowed. Please upload an image file.",
    );
    imageUploadECTwo.value = "";
    return;
  }
  if (!allowedTypes.includes(file.type) && !file.type.startsWith("image/")) {
    showError(
      imageErrorECTwo,
      "Only image files are allowed (jpg, jpeg, png, webp, gif, svg, bmp, avif).",
    );
    imageUploadECTwo.value = "";
    return;
  }

  uploadedFileECTwo = file;
  hideError(imageErrorECTwo);

  const reader = new FileReader();
  reader.onload = (ev) => {
    uploadedDataURL = ev.target.result;
    const oldImg = uploadBoxECTwo.querySelector(".uploadPreviewImgECTwo");
    if (oldImg) oldImg.remove();
    const img = document.createElement("img");
    img.className = "uploadPreviewImgECTwo";
    img.src = uploadedDataURL;
    uploadBoxECTwo.appendChild(img);
    if (uploadTextECTwo) uploadTextECTwo.classList.add("uploadTextHiddenECTwo");
  };
  reader.readAsDataURL(file);
});

// LABEL VALIDATION
labelInputECTwo.addEventListener("keydown", (e) => {
  const allowed = /^[A-Za-z ]$/.test(e.key);
  const ctrl = e.ctrlKey || e.metaKey;
  const nav = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "Tab",
    "Home",
    "End",
  ].includes(e.key);
  if (!allowed && !ctrl && !nav) e.preventDefault();
});
labelInputECTwo.addEventListener("blur", () => {
  if (!isValidLabel(labelInputECTwo.value)) {
    showError(labelErrorECTwo, "Label must contain letters only.");
    labelInputECTwo.classList.add("inputErrorECTwo");
  } else {
    hideError(labelErrorECTwo);
    labelInputECTwo.classList.remove("inputErrorECTwo");
  }
});

// CTA LINK VALIDATION
ctaInputECTwo.addEventListener("keydown", (e) => {
  const blocked = /^[!@#$%^&*()\[\]{};'"\\,<>?`~]$/.test(e.key);
  if (blocked) e.preventDefault();
});
ctaInputECTwo.addEventListener("blur", () => {
  if (!isValidURL(ctaInputECTwo.value)) {
    showError(ctaErrorECTwo, "Enter a valid URL (e.g. https://example.com).");
    ctaInputECTwo.classList.add("inputErrorECTwo");
  } else {
    hideError(ctaErrorECTwo);
    ctaInputECTwo.classList.remove("inputErrorECTwo");
  }
});

// SAVE BUTTON
modalSaveBtnECTwo.addEventListener("click", () => {
  let valid = true;

  if (!uploadedDataURL) {
    showError(imageErrorECTwo, "Image is required.");
    valid = false;
  }
  if (!isValidLabel(labelInputECTwo.value)) {
    showError(labelErrorECTwo, "Label must contain letters only.");
    labelInputECTwo.classList.add("inputErrorECTwo");
    valid = false;
  }
  if (!isValidURL(ctaInputECTwo.value)) {
    showError(ctaErrorECTwo, "Enter a valid URL (e.g. https://example.com).");
    ctaInputECTwo.classList.add("inputErrorECTwo");
    valid = false;
  }
  if (!valid) return;

  if (editingCardId) {
    updateCard(
      editingCardId,
      uploadedDataURL,
      labelInputECTwo.value.trim(),
      ctaInputECTwo.value.trim(),
    );
  } else {
    addNewCard(
      uploadedDataURL,
      labelInputECTwo.value.trim(),
      ctaInputECTwo.value.trim(),
    );
  }

  markChanges();
  updatePreview();
  closeModalECTwo();
});

// ADD NEW CARD
function addNewCard(imgSrc, label, cta) {
  const cardId = `cardImageItemECTwo_${imageCardCounter}`;
  const numLabel = `Image ${imageCardCounter}`;
  imageCardCounter++;
  const assignedSlot = findFreePreviewSlot();
  const card = buildCardElement(cardId, numLabel, imgSrc, label, cta, false);
  card.dataset.previewSlot = assignedSlot;
  sectionImageList.appendChild(card);
  bindCardEvents(card);
}

// BUILD CARD ELEMENT
function buildCardElement(cardId, numLabel, imgSrc, label, cta, toggleOn) {
  const card = document.createElement("div");
  card.className = "cardImageItemECTwo";
  card.id = cardId;
  card.dataset.cta = cta;

  card.innerHTML = `
    <div class="headerCardItemECTwo">
      <span class="iconEditECTwo">
        <img src="../assets/developerHMExplorecategory1/Notches.svg" alt="">
      </span>
      <span class="textImageNumECTwo">${numLabel}</span>
      <button class="btnMenuECTwo">
        <img src="../assets/developerHMExplorecategory1/DotsThreeOutlineVertical.svg" alt="">
      </button>
    </div>
    <div class="bodyCardItemECTwo">
      <img src="${imgSrc}" alt="${label}" class="thumbImageECTwo">
      <div class="infoCardItemECTwo">
        <span class="labelItemECTwo">Label</span>
        <span class="valueItemECTwo">${label}</span>
        <span class="statusTextECTwo">Active status</span>
      </div>
      <label class="toggleSwitchECTwo">
        <input type="checkbox" class="toggleInputECTwo"${toggleOn ? " checked" : ""}>
        <span class="sliderECTwo"></span>
      </label>
    </div>
  `;
  return card;
}

function updateCard(cardId, imgSrc, label, cta) {
  const card = document.getElementById(cardId);
  if (!card) return;
  card.dataset.cta = cta;
  card.querySelector(".thumbImageECTwo").src = imgSrc;
  card.querySelector(".valueItemECTwo").textContent = label;
}

// BIND CARD EVENTS
function bindCardEvents(card) {
  const toggle = card.querySelector(".toggleInputECTwo");

  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      if (!card.dataset.previewSlot || card.dataset.previewSlot === "none") {
        card.dataset.previewSlot = findFreePreviewSlot();
      }
    }
    markChanges();
    updatePreview();
  });

  const menuBtn = card.querySelector(".btnMenuECTwo");
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeAllDropdowns();
    showCardDropdown(card, menuBtn);
  });
}

document.querySelectorAll(".cardImageItemECTwo").forEach((card) => {
  bindCardEvents(card);
});

const cardDropdownMenu = document.getElementById("cardDropdownECTwo");
const cardDropdownEdit = document.getElementById("cardDropdownEditECTwo");
const cardDropdownDelete = document.getElementById("cardDropdownDeleteECTwo");
let dropdownTargetCard = null;

function showCardDropdown(card, btn) {
  dropdownTargetCard = card;

  const rect = btn.getBoundingClientRect();
  cardDropdownMenu.style.top = rect.bottom + window.scrollY + 4 + "px";
  cardDropdownMenu.style.left = rect.left + window.scrollX - 60 + "px";

  cardDropdownMenu.classList.add("cardDropdownVisibleECTwo");
}

function closeAllDropdowns() {
  cardDropdownMenu.classList.remove("cardDropdownVisibleECTwo");
  dropdownTargetCard = null;
}

// Edit action
cardDropdownEdit.addEventListener("click", (e) => {
  e.stopPropagation();
  const card = dropdownTargetCard;
  closeAllDropdowns();
  if (card) openModal(card.id);
});

// Delete action
cardDropdownDelete.addEventListener("click", (e) => {
  e.stopPropagation();
  const card = dropdownTargetCard;
  closeAllDropdowns();
  if (card) {
    card.remove();
    markChanges();
    updatePreview();
  }
});

document.addEventListener("click", closeAllDropdowns);
const previewSlotEls = {
  1: document.querySelector(".cardImageLargeECTwo"),
  2: document.querySelectorAll(".cardImageSmallECTwo")[0],
  3: document.querySelectorAll(".cardImageSmallECTwo")[1],
  4: document.querySelector(".cardImageWideECTwo"),
};

function updatePreview() {
  const allCards = Array.from(
    sectionImageList.querySelectorAll(".cardImageItemECTwo"),
  );

  PREVIEW_SLOTS.forEach((slotNum) => {
    const slot = previewSlotEls[slotNum];
    if (!slot) return;

    const img = slot.querySelector(".imgCardECTwo");
    const tag = slot.querySelector(".tagLabelECTwo");
    const btn = slot.querySelector(".btnExploreECTwo");
    const activeCard =
      allCards.find(
        (c) =>
          c.dataset.previewSlot === slotNum &&
          c.querySelector(".toggleInputECTwo")?.checked,
      ) || null;

    if (activeCard) {
      const thumbSrc = activeCard.querySelector(".thumbImageECTwo").src;
      const labelText = activeCard.querySelector(".valueItemECTwo").textContent;
      const ctaLink = activeCard.dataset.cta || "#";

      slot.classList.remove("previewSlotEmptyECTwo");
      if (img) {
        img.src = thumbSrc;
        img.classList.remove("previewImgHiddenECTwo");
      }
      if (tag) {
        tag.classList.remove("previewTagHiddenECTwo");
        tag.textContent = labelText;
      }
      if (btn) {
        btn.classList.remove("previewBtnHiddenECTwo");
        btn.onclick = () => window.open(ctaLink, "_blank");
      }
    } else {
      slot.classList.add("previewSlotEmptyECTwo");
      if (img) img.classList.add("previewImgHiddenECTwo");
      if (tag) tag.classList.add("previewTagHiddenECTwo");
      if (btn) btn.classList.add("previewBtnHiddenECTwo");
    }
  });
}

updatePreview();

// PUBLISH BUTTON
const publishErrorBanner = document.getElementById("publishErrorBannerECTwo");
const publishErrorText = document.getElementById("publishErrorTextECTwo");

btnPublishECTwo.addEventListener("click", () => {
  const allCards = Array.from(
    sectionImageList.querySelectorAll(".cardImageItemECTwo"),
  );
  const onCount = allCards.filter(
    (c) => c.querySelector(".toggleInputECTwo")?.checked,
  ).length;

  if (onCount < 4) {
    const needed = 4 - onCount;
    showPopupECTwo(
      "error",
      `Toggle ON at least ${needed} more image${needed > 1 ? "s" : ""} before publishing. (${onCount}/4 active)`,
      "bottom",
    );
    return;
  }

  showPopupECTwo("success", "Published successfully", "bottom");
  setTimeout(() => {
    window.location.href = "../html/developerHMDashboard.html";
  }, 2000);
});

btnDiscardECTwo.addEventListener("click", () => {
  location.reload();
});

const globalPopupEl = document.getElementById("globalPopupECTwo");
const globalPopupTextEl = document.getElementById("globalPopupTextECTwo");
let popupDismissTimer = null;

function showPopupECTwo(type, message, position = "top") {
  if (popupDismissTimer) {
    clearTimeout(popupDismissTimer);
    popupDismissTimer = null;
  }

  globalPopupTextEl.textContent = message;
  globalPopupEl.classList.remove(
    "globalPopupSuccessECTwo",
    "globalPopupErrorECTwo",
    "globalPopupFadeECTwo",
    "globalPopupVisibleECTwo",
    "globalPopupTopECTwo",
    "globalPopupBottomECTwo",
  );
  globalPopupEl.classList.add(
    type === "success" ? "globalPopupSuccessECTwo" : "globalPopupErrorECTwo",
    position === "bottom" ? "globalPopupBottomECTwo" : "globalPopupTopECTwo",
    "globalPopupVisibleECTwo",
  );

  if (type === "error") {
    popupDismissTimer = setTimeout(() => {
      globalPopupEl.classList.add("globalPopupFadeECTwo");
      popupDismissTimer = setTimeout(() => {
        globalPopupEl.classList.remove(
          "globalPopupVisibleECTwo",
          "globalPopupFadeECTwo",
        );
      }, 400);
    }, 3000);
  }
}
