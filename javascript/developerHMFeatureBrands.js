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
const addBtn = document.getElementById("DHMFB-addBtn");
const floatingPlusBtn = document.querySelector(".DHMFB-floating-plus-btn");

const addBrandWrapper = document.getElementById("DHMFB-addBrandWrapper");
const closeAddBrand = document.getElementById("DHMFB-closeAddBrand");
const pageHeader = document.getElementById("DHMFB-page-header");

const brandLogo = document.getElementById("DHMFB-brandLogo");
const brandPreview = document.getElementById("DHMFB-brandPreview");
const uploadPlus = document.getElementById("DHMFB-uploadPlus");

const countDesktop = document.querySelector(".DHMFB-count");
const countMobile = document.querySelector(".DHMFB-brandCount-mob");

const tableRows = document.querySelectorAll(".DHMFB-brand-table tbody tr");
const faqItems = document.querySelectorAll(".DHMFB-faq-item");

function updateCounts() {
  const totalDesktop = tableRows.length;
  const totalMobile = faqItems.length;

  if (countDesktop) countDesktop.textContent = totalDesktop + " Brands";
  if (countMobile) countMobile.textContent = totalMobile + " Brands";
}

updateCounts();

addBtn?.addEventListener("click", () => {
  if (window.innerWidth >= 1024) {
    if (pageHeader) pageHeader.style.display = "none";
    if (addBrandWrapper) addBrandWrapper.style.display = "block";
  } else {
    window.location.href = "../html/developerHMFeatureBrandsAddNew.html";
  }
});

floatingPlusBtn?.addEventListener("click", () => {
  if (window.innerWidth <= 595) {
    window.location.href = "../html/developerHMFeatureBrandsAddNew.html";
  }
});

closeAddBrand?.addEventListener("click", () => {
  if (addBrandWrapper) addBrandWrapper.style.display = "none";
  if (pageHeader) pageHeader.style.display = "flex";
  if (brandLogo) brandLogo.value = "";
  if (brandPreview) brandPreview.style.display = "none";
  if (uploadPlus) uploadPlus.style.display = "block";
});

brandLogo?.addEventListener("change", function () {
  const file = this.files[0];
  if (!file || !file.type.startsWith("image/")) {
    this.value = "";
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    brandPreview.src = reader.result;
    brandPreview.style.display = "block";
    uploadPlus.style.display = "none";
  };
  reader.readAsDataURL(file);
});

faqItems.forEach((item) => {
  const question = item.querySelector(".DHMFB-faq-question");
  question.addEventListener("click", () => {
    faqItems.forEach((el) => {
      if (el !== item) el.classList.remove("active");
    });
    item.classList.toggle("active");
  });
});

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

  const mobileAddNewPanel = document.getElementById("DHMFB-mobileAddNewPanel");
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
  .classList.add("sidebar-active");

document
  .querySelector("#account-menu .mobile-dropdown:nth-child(4) .dropdown-header")
  .classList.add("dropdown-header-active");

(function () {
  const mobileAddNewPanel = document.getElementById("DHMFB-mobileAddNewPanel");
  const mainContentBeyond = document.querySelector(".main-content-beyond");

  function openMobileAddNewPanel() {
    if (mainContentBeyond)
      mainContentBeyond.classList.add("DHMFB-main-content-hidden");
    if (mobileAddNewPanel) mobileAddNewPanel.style.display = "flex";
    const bottomNav = document.querySelector(".bottom-nav");
    if (bottomNav) bottomNav.style.display = "none";
  }

  function closeMobileAddNewPanel() {
    if (mobileAddNewPanel) mobileAddNewPanel.style.display = "none";
    if (mainContentBeyond)
      mainContentBeyond.classList.remove("DHMFB-main-content-hidden");
    const bottomNav = document.querySelector(".bottom-nav");
    if (bottomNav) bottomNav.style.display = "flex";
    resetANForm();
  }

  if (addBtn) {
    const newAddBtn = addBtn.cloneNode(true);
    addBtn.parentNode.replaceChild(newAddBtn, addBtn);

    newAddBtn.addEventListener("click", () => {
      if (window.innerWidth >= 1024) {
        if (pageHeader) pageHeader.style.display = "none";
        if (addBrandWrapper) addBrandWrapper.style.display = "block";
      } else {
        openMobileAddNewPanel();
      }
    });
  }

  if (floatingPlusBtn) {
    const newFloatingBtn = floatingPlusBtn.cloneNode(true);
    floatingPlusBtn.parentNode.replaceChild(newFloatingBtn, floatingPlusBtn);

    newFloatingBtn.addEventListener("click", () => {
      if (window.innerWidth <= 595) {
        openMobileAddNewPanel();
      }
    });
  }

  const anVendorSelect = document.getElementById("DHMFB-AN-vendorSelect");
  const anBrandNameInput = document.getElementById("DHMFB-AN-brandNameInput");
  const anFileInput = document.getElementById("DHMFB-AN-brandLogoMob");
  const anUploadBox = document.getElementById("DHMFB-AN-uploadBoxMob");
  const anPreviewImg = document.getElementById("DHMFB-AN-brandPreviewMob");
  const anUploadPlus = document.getElementById("DHMFB-AN-uploadPlusMob");
  const anPublishNext = document.getElementById("DHMFB-AN-publishNext");
  const anPublishClose = document.getElementById("DHMFB-AN-publishClose");

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
    document.querySelectorAll(".DHMFB-AN-error-message").forEach(function (e) {
      e.remove();
    });
    if (anVendorSelect) anVendorSelect.style.border = "";
    if (anBrandNameInput) anBrandNameInput.style.border = "";
    if (anUploadBox) anUploadBox.style.border = "";
  }

  function anValidateForm() {
    var isValid = true;
    if (!anVendorSelect || !anVendorSelect.value) {
      anShowError(anVendorSelect, "Select the vendor is required");
      isValid = false;
    }
    if (!anBrandNameInput || !anBrandNameInput.value.trim()) {
      anShowError(anBrandNameInput, "Enter brand name is required");
      isValid = false;
    }
    if (!anFileInput || !anFileInput.files.length) {
      anShowError(anUploadBox, "Upload brand logo is required");
      isValid = false;
    }
    return isValid;
  }

  function resetANForm() {
    if (anVendorSelect) anVendorSelect.selectedIndex = 0;
    if (anBrandNameInput) anBrandNameInput.value = "";
    if (anFileInput) anFileInput.value = "";
    if (anPreviewImg) {
      anPreviewImg.src = "";
      anPreviewImg.style.display = "none";
    }
    if (anUploadPlus) anUploadPlus.style.display = "flex";
    if (anUploadBox) anUploadBox.style.padding = "";
    anRemoveAllErrors();
  }

  if (anUploadBox && anFileInput) {
    anUploadBox.addEventListener("click", function () {
      anFileInput.click();
    });

    anFileInput.addEventListener("change", function () {
      var file = this.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        anShowError(anUploadBox, "Only image files are allowed");
        anFileInput.value = "";
        if (anPreviewImg) anPreviewImg.style.display = "none";
        if (anUploadPlus) anUploadPlus.style.display = "flex";
        return;
      }
      anRemoveAllErrors();
      var reader = new FileReader();
      reader.onload = function (e) {
        if (anPreviewImg) {
          anPreviewImg.src = e.target.result;
          anPreviewImg.style.display = "block";
          anPreviewImg.style.borderRadius = "8px";
        }
        if (anUploadPlus) anUploadPlus.style.display = "none";
        if (anUploadBox) anUploadBox.style.padding = "0";
      };
      reader.readAsDataURL(file);
    });
  }

  if (anBrandNameInput) {
    anBrandNameInput.addEventListener("keydown", function (e) {
      var key = e.key;
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

  if (anPublishNext) {
    anPublishNext.addEventListener("click", function () {
      if (anValidateForm()) {
        resetANForm();
      }
    });
  }

  if (anPublishClose) {
    anPublishClose.addEventListener("click", function () {
      if (anValidateForm()) {
        closeMobileAddNewPanel();
      }
    });
  }
})();
