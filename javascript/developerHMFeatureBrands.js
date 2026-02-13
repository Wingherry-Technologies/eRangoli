const pageHeader = document.getElementById("page-header");
const addBtn = document.getElementById("addBtn");
const addBrandWrapper = document.getElementById("addBrandWrapper");
const closeAddBrand = document.getElementById("closeAddBrand");

const brandLogo = document.getElementById("brandLogo");
const brandPreview = document.getElementById("brandPreview");
const uploadPlus = document.getElementById("uploadPlus");

const mobileFAQ = document.querySelector(".MobileFAQ");
const pageHeaderMob = document.querySelector(".page-header-mob");
const brandCountMob = document.querySelector(".brandCount-mob");
const floatingPlusBtn = document.querySelector(".floating-plus-btn");

const addBrandMobile = document.querySelector(".add-brand-mobile");

const uploadBoxMob = document.getElementById("uploadBoxMob");
const brandLogoMob = document.getElementById("brandLogoMob");
const brandPreviewMob = document.getElementById("brandPreviewMob");
const uploadPlusMob = document.getElementById("uploadPlusMob");

if (addBrandMobile) addBrandMobile.style.display = "none";

addBtn?.addEventListener("click", () => {
  if (window.innerWidth >= 596) {
    pageHeader.style.display = "none";
    addBrandWrapper.style.display = "block";
  }
});

closeAddBrand?.addEventListener("click", () => {
  if (window.innerWidth >= 596) {
    addBrandWrapper.style.display = "none";
    pageHeader.style.display = "flex";
    brandLogo.value = "";
    brandPreview.style.display = "none";
    uploadPlus.style.display = "block";
  }
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

floatingPlusBtn?.addEventListener("click", () => {
  if (window.innerWidth <= 595) {
    if (addBrandMobile) addBrandMobile.style.display = "block";
    if (mobileFAQ) mobileFAQ.style.display = "none";
    if (pageHeaderMob) pageHeaderMob.style.display = "none";
    if (brandCountMob) brandCountMob.style.display = "none";
    if (floatingPlusBtn) floatingPlusBtn.style.display = "none";
  }
});

document.querySelectorAll(".outline-btn-mob").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (window.innerWidth <= 595) {
      if (addBrandMobile) addBrandMobile.style.display = "none";
      if (mobileFAQ) mobileFAQ.style.display = "block";
      if (pageHeaderMob) pageHeaderMob.style.display = "flex";
      if (brandCountMob) brandCountMob.style.display = "flex";
      if (floatingPlusBtn) floatingPlusBtn.style.display = "flex";
      if (brandLogoMob) brandLogoMob.value = "";
      if (brandPreviewMob) brandPreviewMob.style.display = "none";
      if (uploadPlusMob) uploadPlusMob.style.display = "block";
    }
  });
});

uploadBoxMob?.addEventListener("click", () => {
  if (window.innerWidth <= 595) {
    brandLogoMob?.click();
  }
});

brandLogoMob?.addEventListener("change", function () {
  if (window.innerWidth <= 595) {
    const file = this.files[0];
    if (!file || !file.type.startsWith("image/")) {
      this.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      brandPreviewMob.src = reader.result;
      brandPreviewMob.style.display = "block";
      if (uploadPlusMob) uploadPlusMob.style.display = "none";
    };
    reader.readAsDataURL(file);
  }
});

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});
