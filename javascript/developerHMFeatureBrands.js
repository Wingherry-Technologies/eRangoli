const pageHeader = document.getElementById("page-header");
const addBtn = document.getElementById("addBtn");
const addBrandWrapper = document.getElementById("addBrandWrapper");
const closeAddBrand = document.getElementById("closeAddBrand");

const brandLogo = document.getElementById("brandLogo");
const brandPreview = document.getElementById("brandPreview");
const uploadPlus = document.getElementById("uploadPlus");

/* Add button click */
addBtn.addEventListener("click", () => {
  pageHeader.style.display = "none";
  addBrandWrapper.style.display = "block";
});

/* Publish & Close */
closeAddBrand.addEventListener("click", () => {
  addBrandWrapper.style.display = "none";
  pageHeader.style.display = "flex";
  brandLogo.value = "";
  brandPreview.style.display = "none";
  uploadPlus.style.display = "block";
});

/* Image upload + preview INSIDE box */
brandLogo.addEventListener("change", function () {
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
