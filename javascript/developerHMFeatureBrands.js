const addBtn = document.getElementById("addBtn");
const floatingPlusBtn = document.querySelector(".floating-plus-btn");

const addBrandWrapper = document.getElementById("addBrandWrapper");
const closeAddBrand = document.getElementById("closeAddBrand");
const pageHeader = document.getElementById("page-header");

const brandLogo = document.getElementById("brandLogo");
const brandPreview = document.getElementById("brandPreview");
const uploadPlus = document.getElementById("uploadPlus");

const countDesktop = document.querySelector(".count");
const countMobile = document.querySelector(".brandCount-mob");

const tableRows = document.querySelectorAll(".brand-table tbody tr");
const faqItems = document.querySelectorAll(".faq-item");

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
  const question = item.querySelector(".faq-question");
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
}

window.addEventListener("resize", handleResize);
window.addEventListener("load", handleResize);
