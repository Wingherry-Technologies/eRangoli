document.addEventListener("DOMContentLoaded", function () {
  const headingInput = document.querySelectorAll(
    ".DHMPAN-add-promotion-body input[type='text']",
  )[0];

  const marketplaceTextarea = document.querySelector(
    ".DHMPAN-add-promotion-body textarea",
  );

  const ctaInput = document.querySelectorAll(
    ".DHMPAN-add-promotion-body input[type='text']",
  )[1];

  const publishBtn = document.querySelector(".DHMPAN-publish-btn");
  const cancelBtn = document.getElementById("DHMPAN-cancelAddPromotion");

  const uploadBox = document.getElementById("DHMPAN-uploadContent");
  const fileInput = document.getElementById("DHMPAN-mediaInput");

  function showError(element, message) {
    removeError(element);
    const error = document.createElement("span");
    error.className = "DHMPAN-field-error";
    error.innerText = message;
    element.parentNode.insertBefore(error, element.nextSibling);
    element.style.border = "1px solid red";
  }

  function removeError(element) {
    const next = element.nextSibling;
    if (
      next &&
      next.classList &&
      next.classList.contains("DHMPAN-field-error")
    ) {
      next.remove();
    }
    element.style.border = "";
  }

  function allowOnlyCharacters(e) {
    const char = e.key;
    const regex = /^[a-zA-Z\s]$/;

    if (!regex.test(char) && e.key !== "Backspace") {
      e.preventDefault();
    }

    if (e.target.value.length === 0 && char === " ") {
      e.preventDefault();
    }
  }

  headingInput.addEventListener("keypress", allowOnlyCharacters);
  marketplaceTextarea.addEventListener("keypress", allowOnlyCharacters);

  headingInput.addEventListener("input", function () {
    removeError(this);
  });

  marketplaceTextarea.addEventListener("input", function () {
    removeError(this);
  });

  ctaInput.addEventListener("input", function () {
    removeError(this);
  });

  uploadBox.addEventListener("click", function () {
    fileInput.click();
  });

  fileInput.addEventListener("change", function () {
    removeError(uploadBox);

    const file = this.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showError(uploadBox, "Only image files allowed");
      fileInput.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      uploadBox.innerHTML = `<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;" />`;
    };
    reader.readAsDataURL(file);
  });

  function isValidURL(url) {
    const pattern = /^(https?:\/\/)[^\s$.?#].[^\s]*$/gm;
    return pattern.test(url);
  }

  publishBtn.addEventListener("click", function (e) {
    e.preventDefault();

    let isValid = true;

    if (headingInput.value.trim() === "") {
      showError(headingInput, "Heading is required");
      isValid = false;
    }

    if (marketplaceTextarea.value.trim() === "") {
      showError(marketplaceTextarea, "Traditional Marketplace is required");
      isValid = false;
    }

    // CTA
    if (ctaInput.value.trim() === "") {
      showError(ctaInput, "CTA Link is required");
      isValid = false;
    } else if (!isValidURL(ctaInput.value.trim())) {
      showError(ctaInput, "Enter valid URL (https://example.com)");
      isValid = false;
    }

    // Image
    if (!fileInput.files || fileInput.files.length === 0) {
      showError(uploadBox, "Cover Image is required");
      isValid = false;
    }

    if (isValid) {
      alert("Form Submitted Successfully");
    }
  });

  cancelBtn.addEventListener("click", function () {
    window.location.href = "../html/developerHMPromotions.html";
  });
});
