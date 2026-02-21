document.addEventListener("DOMContentLoaded", function () {
  const vendorSelect = document.querySelector(".DHMFBANvendorSelect");
  const brandNameInput = document.querySelector(".DHMFBANbrandNameInput");
  const fileInput = document.getElementById("DHMFBANbrandLogoMob");
  const uploadBox = document.getElementById("DHMFBANuploadBoxMob");
  const previewImg = document.getElementById("DHMFBANbrandPreviewMob");
  const uploadPlus = document.getElementById("DHMFBANuploadPlusMob");
  const publishNextBtn = document.querySelector(".DHMFBANprimary-btn-mob");
  const publishCloseBtn = document.querySelector(".DHMFBANoutline-btn-mob");

  function showError(element, message) {
    removeAllErrors();

    const error = document.createElement("div");
    error.className = "error-message";
    error.style.color = "red";
    error.style.fontSize = "12px";
    error.style.marginTop = "4px";
    error.innerText = message;

    if (element === uploadBox) {
      uploadBox.style.border = "1px solid red";
      uploadBox.parentNode.insertBefore(error, uploadBox.nextSibling);
    } else {
      element.style.border = "1px solid red";
      element.parentNode.insertBefore(error, element.nextSibling);
    }
  }

  function removeAllErrors() {
    document.querySelectorAll(".error-message").forEach((e) => e.remove());
    vendorSelect.style.border = "";
    brandNameInput.style.border = "";
    uploadBox.style.border = "";
  }

  uploadBox.addEventListener("click", function () {
    fileInput.click();
  });

  fileInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showError(uploadBox, "Only image files are allowed");
      fileInput.value = "";
      previewImg.style.display = "none";
      uploadPlus.style.display = "flex";
      return;
    }

    removeAllErrors();

    const reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src = e.target.result;
      previewImg.style.display = "block";
      previewImg.style.borderRadius = "8px";
      uploadPlus.style.display = "none";
      uploadBox.style.padding = "0";
    };
    reader.readAsDataURL(file);
  });

  brandNameInput.addEventListener("keydown", function (e) {
    const key = e.key;

    if (this.value.length === 0 && key === " ") {
      e.preventDefault();
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

  function validateForm() {
    let isValid = true;

    if (!vendorSelect.value) {
      showError(vendorSelect, "Select the vendor is required");
      isValid = false;
    }

    if (!brandNameInput.value.trim()) {
      showError(brandNameInput, "Enter brand name is required");
      isValid = false;
    }

    if (!fileInput.files.length) {
      showError(uploadBox, "Upload brand logo is required");
      isValid = false;
    }

    return isValid;
  }

  function resetForm() {
    vendorSelect.selectedIndex = 0;
    brandNameInput.value = "";
    fileInput.value = "";
    previewImg.src = "";
    previewImg.style.display = "none";
    uploadPlus.style.display = "flex";
    uploadBox.style.padding = "";
    removeAllErrors();
  }

  publishNextBtn.addEventListener("click", function () {
    if (validateForm()) {
      resetForm();
    }
  });

  publishCloseBtn.addEventListener("click", function () {
    if (validateForm()) {
      window.location.href = "../html/developerHMFeatureBrands.html";
    }
  });
});
