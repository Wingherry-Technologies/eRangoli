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

// Element References
const addBrandWrapper = document.getElementById("DHMFB-addBrandWrapper");
const pageHeader = document.getElementById("DHMFB-page-header");

// Desktop form fields
const desktopVendorSelect = document.getElementById("DHMFB-vendorSelect");
const desktopBrandNameInput = document.getElementById("DHMFB-brandNameInput");
const desktopBrandLogo = document.getElementById("DHMFB-brandLogo");
const desktopBrandPreview = document.getElementById("DHMFB-brandPreview");
const desktopUploadPlus = document.getElementById("DHMFB-uploadPlus");

const publishNextBtn = document.getElementById("DHMFB-publishNext");
const publishCloseBtn = document.getElementById("DHMFB-closeAddBrand");

// Mobile panel elements
const mobileAddNewPanel = document.getElementById("DHMFB-mobileAddNewPanel");
const anVendorSelect = document.getElementById("DHMFB-AN-vendorSelect");
const anBrandNameInput = document.getElementById("DHMFB-AN-brandNameInput");
const anFileInput = document.getElementById("DHMFB-AN-brandLogoMob");
const anUploadBox = document.getElementById("DHMFB-AN-uploadBoxMob");
const anPreviewImg = document.getElementById("DHMFB-AN-brandPreviewMob");
const anUploadPlus = document.getElementById("DHMFB-AN-uploadPlusMob");
const anPublishNext = document.getElementById("DHMFB-AN-publishNext");
const anPublishClose = document.getElementById("DHMFB-AN-publishClose");

// Count elements
const countDesktop = document.querySelector(".DHMFB-count");
const countMobile = document.querySelector(".DHMFB-brandCount-mob");

// Utility: Get current date as DD/MM/YY

function getCurrentDate() {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = String(d.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}

// Update Counts

function updateCounts() {
  const totalDesktop = document.querySelectorAll(
    ".DHMFB-brand-table tbody tr",
  ).length;
  const totalMobile = document.querySelectorAll(".DHMFB-faq-item").length;
  if (countDesktop) countDesktop.textContent = totalDesktop + " Brands";
  if (countMobile) countMobile.textContent = totalMobile + " Brands";
}

updateCounts();
let editingRow = null;
let editingFaqItem = null;
let desktopLogoDataUrl = "";
let mobileLogoDataUrl = "";

// Desktop Validation
function desktopShowError(element, message) {
  desktopRemoveAllErrors();
  const error = document.createElement("div");
  error.className = "DHMFB-desktop-error-message";
  error.style.cssText = "color:red;font-size:12px;margin-top:4px;";
  error.innerText = message;
  element.style.border = "1px solid red";
  element.parentNode.insertBefore(error, element.nextSibling);
}

function desktopUploadBoxShowError(message) {
  desktopRemoveAllErrors();
  const uploadBox = document.querySelector(".DHMFB-upload-box");
  if (!uploadBox) return;
  const error = document.createElement("div");
  error.className = "DHMFB-desktop-error-message";
  error.style.cssText = "color:red;font-size:12px;margin-top:4px;";
  error.innerText = message;
  uploadBox.style.border = "1px solid red";
  uploadBox.parentNode.insertBefore(error, uploadBox.nextSibling);
}

function desktopRemoveAllErrors() {
  document
    .querySelectorAll(".DHMFB-desktop-error-message")
    .forEach((e) => e.remove());
  if (desktopVendorSelect) desktopVendorSelect.style.border = "";
  if (desktopBrandNameInput) desktopBrandNameInput.style.border = "";
  const uploadBox = document.querySelector(".DHMFB-upload-box");
  if (uploadBox) uploadBox.style.border = "";
}

function desktopValidateForm() {
  let isValid = true;
  if (!desktopVendorSelect || !desktopVendorSelect.value) {
    desktopShowError(desktopVendorSelect, "Select the vendor is required");
    isValid = false;
  } else if (!desktopBrandNameInput || !desktopBrandNameInput.value.trim()) {
    desktopShowError(desktopBrandNameInput, "Enter brand name is required");
    isValid = false;
  } else if (
    !desktopLogoDataUrl &&
    (!desktopBrandLogo || !desktopBrandLogo.files.length)
  ) {
    desktopUploadBoxShowError("Upload brand logo is required");
    isValid = false;
  }
  return isValid;
}

// Desktop form logo upload
desktopBrandLogo?.addEventListener("change", function () {
  const file = this.files[0];
  if (!file || !file.type.startsWith("image/")) {
    this.value = "";
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    desktopLogoDataUrl = reader.result;
    desktopBrandPreview.src = desktopLogoDataUrl;
    desktopBrandPreview.style.display = "block";
    desktopUploadPlus.style.display = "none";
    desktopRemoveAllErrors();
  };
  reader.readAsDataURL(file);
});

function desktopResetForm() {
  if (desktopVendorSelect) desktopVendorSelect.value = "";
  if (desktopBrandNameInput) desktopBrandNameInput.value = "";
  if (desktopBrandLogo) desktopBrandLogo.value = "";
  if (desktopBrandPreview) desktopBrandPreview.style.display = "none";
  if (desktopUploadPlus) desktopUploadPlus.style.display = "block";
  desktopLogoDataUrl = "";
  editingRow = null;
  desktopRemoveAllErrors();
  const wrapperTitle = addBrandWrapper?.querySelector("h3");
  if (wrapperTitle) wrapperTitle.textContent = "Featured Brands";
}

// Add or Update Table Row
function buildTableRow(logoSrc, brandName, vendorName, featuredDate) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td class="DHMFB-brand-col">
      <img src="${logoSrc}" class="DHMFB-brand-img" />
      <span>${brandName}</span>
    </td>
    <td>${vendorName}</td>
    <td>${vendorName}</td>
    <td>${featuredDate}</td>
    <td class="DHMFB-action-col">
      <label class="DHMFB-switch">
        <input type="checkbox" checked />
        <span class="DHMFB-slider"></span>
      </label>
    </td>
    <td>
      <img src="../assets/developerHMFeatureBrands/edit.svg" class="DHMFB-edit-icon" />
    </td>
  `;
  return tr;
}

function updateTableRow(tr, logoSrc, brandName, vendorName) {
  const imgEl = tr.querySelector(".DHMFB-brand-img");
  const nameEl = tr.querySelector(".DHMFB-brand-col span");
  const cells = tr.querySelectorAll("td");
  if (imgEl) imgEl.src = logoSrc;
  if (nameEl) nameEl.textContent = brandName;
  if (cells[1]) cells[1].textContent = vendorName;
  if (cells[2]) cells[2].textContent = vendorName;
}

// Add or Update FAQ Item
function buildFaqItem(logoSrc, brandName, vendorName, featuredDate) {
  const div = document.createElement("div");
  div.className = "DHMFB-faq-item";
  div.innerHTML = `
    <button class="DHMFB-faq-question">
      <div class="DHMFB-faq-title">
        <img src="${logoSrc}" width="40" height="40" style="border-radius:4px;object-fit:cover;" />
        <div class="DHMFB-faq-user-text">
          <span class="DHMFB-faq-username">${brandName}</span>
        </div>
      </div>
      <img src="../assets/adminProductRecentlyAdded/CaretDown.svg" />
    </button>
    <div class="DHMFB-faq-answer">
      <div class="DHMFB-faq-row"><span>Company Name</span><span>${vendorName}</span></div>
      <div class="DHMFB-faq-row"><span>Vendor Name</span><span>${vendorName}</span></div>
      <div class="DHMFB-faq-row"><span>Featured on</span><span>${featuredDate}</span></div>
      <div class="DHMFB-faq-row">
        <span>Action</span>
        <span class="DHMFB-action-col">
          <label class="DHMFB-switch">
            <input type="checkbox" checked />
            <span class="DHMFB-slider"></span>
          </label>
        </span>
        <span><img src="../assets/developerHMFeatureBrands/edit.svg" class="DHMFB-mob-edit" /></span>
      </div>
    </div>
  `;
  // Attach accordion listener
  const question = div.querySelector(".DHMFB-faq-question");
  question.addEventListener("click", () => {
    document.querySelectorAll(".DHMFB-faq-item").forEach((el) => {
      if (el !== div) el.classList.remove("active");
    });
    div.classList.toggle("active");
  });
  return div;
}

function updateFaqItem(faqItem, logoSrc, brandName, vendorName) {
  const imgEl = faqItem.querySelector(".DHMFB-faq-title img");
  const nameEl = faqItem.querySelector(".DHMFB-faq-username");
  const rows = faqItem.querySelectorAll(".DHMFB-faq-row");
  if (imgEl) imgEl.src = logoSrc;
  if (nameEl) nameEl.textContent = brandName;
  if (rows[0])
    rows[0].querySelector("span:last-child").textContent = vendorName;
  if (rows[1])
    rows[1].querySelector("span:last-child").textContent = vendorName;
}

// Open Desktop Add Brand Wrapper
function openDesktopAddBrand() {
  if (pageHeader) pageHeader.style.display = "none";
  if (addBrandWrapper) addBrandWrapper.style.display = "block";
}

// Desktop: Add Brand Button
const addBtnEl = document.getElementById("DHMFB-addBtn");
if (addBtnEl) {
  const newAddBtn = addBtnEl.cloneNode(true);
  addBtnEl.parentNode.replaceChild(newAddBtn, addBtnEl);
  newAddBtn.addEventListener("click", () => {
    if (window.innerWidth >= 1024) {
      editingRow = null;
      openDesktopAddBrand();
    } else {
      editingRow = null;
      editingFaqItem = null;
      openMobileAddNewPanel();
    }
  });
}

// Desktop: Publish & Next
publishNextBtn?.addEventListener("click", () => {
  if (!desktopValidateForm()) return;

  const logoSrc =
    desktopLogoDataUrl || "../assets/developerHMFeatureBrands/img.png";
  const brandName = desktopBrandNameInput.value.trim();
  const vendorName = desktopVendorSelect.value;
  const featuredDate = getCurrentDate();

  const tbody = document.querySelector(".DHMFB-brand-table tbody");
  if (editingRow) {
    updateTableRow(editingRow, logoSrc, brandName, vendorName);
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const idx = rows.indexOf(editingRow);
    const faqItems = document.querySelectorAll(".DHMFB-faq-item");
    if (faqItems[idx])
      updateFaqItem(faqItems[idx], logoSrc, brandName, vendorName);
    editingRow = null;
  } else {
    const tr = buildTableRow(logoSrc, brandName, vendorName, featuredDate);
    tbody.appendChild(tr);
    const faqContainer = document.querySelector(".DHMFB-MobileFAQ");
    if (faqContainer)
      faqContainer.appendChild(
        buildFaqItem(logoSrc, brandName, vendorName, featuredDate),
      );
  }

  updateCounts();
  desktopResetForm();
});

// Desktop: Publish & Close
publishCloseBtn?.addEventListener("click", () => {
  if (!desktopValidateForm()) return;

  const logoSrc =
    desktopLogoDataUrl || "../assets/developerHMFeatureBrands/img.png";
  const brandName = desktopBrandNameInput.value.trim();
  const vendorName = desktopVendorSelect.value;
  const featuredDate = getCurrentDate();

  const tbody = document.querySelector(".DHMFB-brand-table tbody");
  if (editingRow) {
    updateTableRow(editingRow, logoSrc, brandName, vendorName);
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const idx = rows.indexOf(editingRow);
    const faqItems = document.querySelectorAll(".DHMFB-faq-item");
    if (faqItems[idx])
      updateFaqItem(faqItems[idx], logoSrc, brandName, vendorName);
    editingRow = null;
  } else {
    const tr = buildTableRow(logoSrc, brandName, vendorName, featuredDate);
    tbody.appendChild(tr);
    const faqContainer = document.querySelector(".DHMFB-MobileFAQ");
    if (faqContainer)
      faqContainer.appendChild(
        buildFaqItem(logoSrc, brandName, vendorName, featuredDate),
      );
  }

  updateCounts();
  desktopResetForm();
  if (addBrandWrapper) addBrandWrapper.style.display = "none";
  if (pageHeader) pageHeader.style.display = "flex";
});

// Desktop Edit: Event Delegation on tbody
document
  .querySelector(".DHMFB-brand-table tbody")
  ?.addEventListener("click", (e) => {
    const editIcon = e.target.closest(".DHMFB-edit-icon");
    if (!editIcon) return;

    const tr = editIcon.closest("tr");
    if (!tr) return;

    editingRow = tr;
    const imgEl = tr.querySelector(".DHMFB-brand-img");
    const nameEl = tr.querySelector(".DHMFB-brand-col span");
    const cells = tr.querySelectorAll("td");

    const logoSrc = imgEl ? imgEl.src : "";
    const brandName = nameEl ? nameEl.textContent : "";
    const vendorName = cells[1] ? cells[1].textContent.trim() : "";

    if (desktopVendorSelect) desktopVendorSelect.value = vendorName;
    if (desktopBrandNameInput) desktopBrandNameInput.value = brandName;

    desktopLogoDataUrl = logoSrc;
    if (desktopBrandPreview) {
      desktopBrandPreview.src = logoSrc;
      desktopBrandPreview.style.display = "block";
    }
    if (desktopUploadPlus) desktopUploadPlus.style.display = "none";

    if (window.innerWidth >= 1024) {
      openDesktopAddBrand();
    } else {
      const tbody = document.querySelector(".DHMFB-brand-table tbody");
      const rows = Array.from(tbody.querySelectorAll("tr"));
      const idx = rows.indexOf(tr);
      const faqItems = document.querySelectorAll(".DHMFB-faq-item");
      editingFaqItem = faqItems[idx] || null;

      if (anVendorSelect) anVendorSelect.value = vendorName;
      if (anBrandNameInput) anBrandNameInput.value = brandName;
      mobileLogoDataUrl = logoSrc;
      if (anPreviewImg) {
        anPreviewImg.src = logoSrc;
        anPreviewImg.style.display = "block";
      }
      if (anUploadPlus) anUploadPlus.style.display = "none";

      openMobileAddNewPanel();
    }
  });

function openMobileAddNewPanel() {
  const mainContentBeyond = document.querySelector(".main-content-beyond");
  if (mainContentBeyond)
    mainContentBeyond.classList.add("DHMFB-main-content-hidden");
  if (mobileAddNewPanel) mobileAddNewPanel.style.display = "flex";
  const bottomNav = document.querySelector(".bottom-nav");
  if (bottomNav) bottomNav.style.display = "none";
}

function closeMobileAddNewPanel() {
  if (mobileAddNewPanel) mobileAddNewPanel.style.display = "none";
  const mainContentBeyond = document.querySelector(".main-content-beyond");
  if (mainContentBeyond)
    mainContentBeyond.classList.remove("DHMFB-main-content-hidden");
  const bottomNav = document.querySelector(".bottom-nav");
  if (bottomNav) bottomNav.style.display = "flex";
  mobileResetForm();
}

document.querySelector(".DHMFB-MobileFAQ")?.addEventListener("click", (e) => {
  const editIcon = e.target.closest(".DHMFB-mob-edit");
  if (!editIcon) return;

  const faqItem = editIcon.closest(".DHMFB-faq-item");
  if (!faqItem) return;

  editingFaqItem = faqItem;

  const allFaqItems = Array.from(document.querySelectorAll(".DHMFB-faq-item"));
  const idx = allFaqItems.indexOf(faqItem);
  const tbody = document.querySelector(".DHMFB-brand-table tbody");
  const rows = tbody ? Array.from(tbody.querySelectorAll("tr")) : [];
  editingRow = rows[idx] || null;

  const imgEl = faqItem.querySelector(".DHMFB-faq-title img");
  const nameEl = faqItem.querySelector(".DHMFB-faq-username");
  const faqRows = faqItem.querySelectorAll(".DHMFB-faq-row");
  const vendorName = faqRows[0]
    ? faqRows[0].querySelector("span:last-child").textContent.trim()
    : "";
  const brandName = nameEl ? nameEl.textContent.trim() : "";
  const logoSrc = imgEl ? imgEl.src : "";

  if (anVendorSelect) anVendorSelect.value = vendorName;
  if (anBrandNameInput) anBrandNameInput.value = brandName;
  mobileLogoDataUrl = logoSrc;
  if (anPreviewImg) {
    anPreviewImg.src = logoSrc;
    anPreviewImg.style.display = "block";
  }
  if (anUploadPlus) anUploadPlus.style.display = "none";

  openMobileAddNewPanel();
});

const floatingPlusBtnEl = document.querySelector(".DHMFB-floating-plus-btn");
if (floatingPlusBtnEl) {
  const newFloatingBtn = floatingPlusBtnEl.cloneNode(true);
  floatingPlusBtnEl.parentNode.replaceChild(newFloatingBtn, floatingPlusBtnEl);
  newFloatingBtn.addEventListener("click", () => {
    if (window.innerWidth <= 595) {
      editingRow = null;
      editingFaqItem = null;
      mobileResetForm();
      openMobileAddNewPanel();
    }
  });
}

function anShowError(element, message) {
  anRemoveAllErrors();
  const error = document.createElement("div");
  error.className = "DHMFB-AN-error-message";
  error.style.cssText = "color:red;font-size:12px;margin-top:4px;";
  error.innerText = message;
  if (element === anUploadBox) {
    anUploadBox.style.border = "1px solid red";
    anUploadBox.parentNode.insertBefore(error, anUploadBox.nextSibling);
  } else {
    element.style.border = "1px solid red";
    element.parentNode.insertBefore(error, element.nextSibling);
  }
}

function anRemoveAllErrors() {
  document
    .querySelectorAll(".DHMFB-AN-error-message")
    .forEach((e) => e.remove());
  if (anVendorSelect) anVendorSelect.style.border = "";
  if (anBrandNameInput) anBrandNameInput.style.border = "";
  if (anUploadBox) anUploadBox.style.border = "";
}

function anValidateForm() {
  if (!anVendorSelect || !anVendorSelect.value) {
    anShowError(anVendorSelect, "Select the vendor is required");
    return false;
  }
  if (!anBrandNameInput || !anBrandNameInput.value.trim()) {
    anShowError(anBrandNameInput, "Enter brand name is required");
    return false;
  }
  if (!mobileLogoDataUrl && (!anFileInput || !anFileInput.files.length)) {
    anShowError(anUploadBox, "Upload brand logo is required");
    return false;
  }
  return true;
}

function mobileResetForm() {
  if (anVendorSelect) anVendorSelect.value = "";
  if (anBrandNameInput) anBrandNameInput.value = "";
  if (anFileInput) anFileInput.value = "";
  if (anPreviewImg) {
    anPreviewImg.src = "";
    anPreviewImg.style.display = "none";
  }
  if (anUploadPlus) anUploadPlus.style.display = "flex";
  if (anUploadBox) anUploadBox.style.padding = "";
  mobileLogoDataUrl = "";
  editingFaqItem = null;
  editingRow = null;
  anRemoveAllErrors();
}

if (anUploadBox && anFileInput) {
  anUploadBox.addEventListener("click", function () {
    anFileInput.click();
  });

  anFileInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      anShowError(anUploadBox, "Only image files are allowed");
      anFileInput.value = "";
      if (anPreviewImg) anPreviewImg.style.display = "none";
      if (anUploadPlus) anUploadPlus.style.display = "flex";
      return;
    }
    anRemoveAllErrors();
    const reader = new FileReader();
    reader.onload = function (e) {
      mobileLogoDataUrl = e.target.result;
      if (anPreviewImg) {
        anPreviewImg.src = mobileLogoDataUrl;
        anPreviewImg.style.display = "block";
        anPreviewImg.style.borderRadius = "8px";
      }
      if (anUploadPlus) anUploadPlus.style.display = "none";
      if (anUploadBox) anUploadBox.style.padding = "0";
    };
    reader.readAsDataURL(file);
  });
}

// Mobile: Brand Name keydown restriction
if (anBrandNameInput) {
  anBrandNameInput.addEventListener("keydown", function (e) {
    const key = e.key;
    if (this.value.length === 0 && key === " ") {
      e.preventDefault();
      return;
    }
    if (
      !/^[a-zA-Z ]$/.test(key) &&
      key !== "Backspace" &&
      key !== "Tab" &&
      key !== "ArrowLeft" &&
      key !== "ArrowRight" &&
      key !== "Delete"
    ) {
      e.preventDefault();
    }
  });
}

// Mobile Publish & Next
anPublishNext?.addEventListener("click", function () {
  if (!anValidateForm()) return;

  const logoSrc =
    mobileLogoDataUrl || "../assets/developerHMFeatureBrands/img.png";
  const brandName = anBrandNameInput.value.trim();
  const vendorName = anVendorSelect.value;
  const featuredDate = getCurrentDate();

  const tbody = document.querySelector(".DHMFB-brand-table tbody");
  const faqContainer = document.querySelector(".DHMFB-MobileFAQ");

  if (editingFaqItem) {
    updateFaqItem(editingFaqItem, logoSrc, brandName, vendorName);
    if (editingRow) updateTableRow(editingRow, logoSrc, brandName, vendorName);
    editingFaqItem = null;
    editingRow = null;
  } else {
    if (tbody)
      tbody.appendChild(
        buildTableRow(logoSrc, brandName, vendorName, featuredDate),
      );
    if (faqContainer)
      faqContainer.appendChild(
        buildFaqItem(logoSrc, brandName, vendorName, featuredDate),
      );
  }

  updateCounts();
  mobileResetForm();
});

// Mobile Publish & Close
anPublishClose?.addEventListener("click", function () {
  if (!anValidateForm()) return;

  const logoSrc =
    mobileLogoDataUrl || "../assets/developerHMFeatureBrands/img.png";
  const brandName = anBrandNameInput.value.trim();
  const vendorName = anVendorSelect.value;
  const featuredDate = getCurrentDate();

  const tbody = document.querySelector(".DHMFB-brand-table tbody");
  const faqContainer = document.querySelector(".DHMFB-MobileFAQ");

  if (editingFaqItem) {
    updateFaqItem(editingFaqItem, logoSrc, brandName, vendorName);
    if (editingRow) updateTableRow(editingRow, logoSrc, brandName, vendorName);
    editingFaqItem = null;
    editingRow = null;
  } else {
    if (tbody)
      tbody.appendChild(
        buildTableRow(logoSrc, brandName, vendorName, featuredDate),
      );
    if (faqContainer)
      faqContainer.appendChild(
        buildFaqItem(logoSrc, brandName, vendorName, featuredDate),
      );
  }

  updateCounts();
  closeMobileAddNewPanel();
});

// FAQ Accordion for existing items
document.querySelectorAll(".DHMFB-faq-item").forEach((item) => {
  const question = item.querySelector(".DHMFB-faq-question");
  question?.addEventListener("click", () => {
    document.querySelectorAll(".DHMFB-faq-item").forEach((el) => {
      if (el !== item) el.classList.remove("active");
    });
    item.classList.toggle("active");
  });
});

// Resize Handler
function handleResize() {
  if (window.innerWidth < 1024) {
    if (addBrandWrapper) addBrandWrapper.style.display = "none";
  }

  if (window.innerWidth <= 595) {
    if (pageHeader) pageHeader.style.display = "none";
  } else {
    if (addBrandWrapper && addBrandWrapper.style.display !== "block") {
      if (pageHeader) pageHeader.style.display = "flex";
    }
  }

  if (mobileAddNewPanel && mobileAddNewPanel.style.display === "flex") {
    if (window.innerWidth >= 1024) {
      mobileAddNewPanel.style.display = "none";
      const mainContentBeyond = document.querySelector(".main-content-beyond");
      if (mainContentBeyond)
        mainContentBeyond.classList.remove("DHMFB-main-content-hidden");
      const bottomNav = document.querySelector(".bottom-nav");
      if (bottomNav) bottomNav.style.display = "flex";
    }
  }
}

window.addEventListener("resize", handleResize);
window.addEventListener("load", handleResize);

document
  .querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(4)")
  ?.classList.add("sidebar-active");

document
  .querySelector("#account-menu .mobile-dropdown:nth-child(4) .dropdown-header")
  ?.classList.add("dropdown-header-active");
