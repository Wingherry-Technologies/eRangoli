document.addEventListener("DOMContentLoaded", function () {
  const uploadBox = document.getElementById("DHMFOES-uploadBox");
  const fileInput = document.getElementById("DHMFOES-coverImage");
  const imagePreview = document.getElementById("DHMFOES-imagePreview");
  const uploadContent = document.getElementById("DHMFOES-uploadContent");
  const deleteBtn = document.getElementById("DHMFOES-deleteBtn");
  const imageName = document.getElementById("DHMFOES-imageName");
  const ctaLink = document.getElementById("DHMFOES-ctaLink");
  const form = document.getElementById("DHMFOES-offerForm");
  const imageError = document.getElementById("DHMFOES-imageError");
  const nameError = document.getElementById("DHMFOES-nameError");
  const linkError = document.getElementById("DHMFOES-linkError");

  function isValidURL(url) {
    const pattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
    return pattern.test(url);
  }

  uploadBox?.addEventListener("click", () => fileInput.click());

  fileInput?.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowed.includes(file.type)) {
      imageError.textContent = "Only image files allowed (jpg, png, webp)";
      return;
    }

    imageError.textContent = "";

    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.src = e.target.result;
      imagePreview.style.display = "block";
      uploadContent.classList.add("hide");
      uploadBox.classList.add("preview-active");
    };
    reader.readAsDataURL(file);
  });

  deleteBtn?.addEventListener("click", function () {
    fileInput.value = "";
    imagePreview.style.display = "none";
    uploadContent.classList.remove("hide");
    uploadBox.classList.remove("preview-active");
    imageName.value = "";
    ctaLink.value = "";
    imageError.textContent = "";
    nameError.textContent = "";
    linkError.textContent = "";
  });

  form?.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    if (!fileInput.files.length) {
      imageError.textContent = "Image required";
      valid = false;
    } else imageError.textContent = "";

    if (imageName.value.trim() === "") {
      nameError.textContent = "Image name required";
      valid = false;
    } else nameError.textContent = "";

    if (ctaLink.value.trim() === "") {
      linkError.textContent = "CTA link required";
      valid = false;
    } else if (!isValidURL(ctaLink.value.trim())) {
      linkError.textContent = "Invalid URL";
      valid = false;
    } else linkError.textContent = "";

    if (valid) {
      alert("Offer Published Successfully!");
      form.reset();
      imagePreview.style.display = "none";
      uploadContent.classList.remove("hide");
      uploadBox.classList.remove("preview-active");
    }
  });

  // POPUP SECTION

  const modal = document.getElementById("DHMFOES-modal");
  const addBtn = document.querySelector(".DHMFOES-add-section");

  addBtn?.addEventListener("click", function () {
    modal.style.display = "flex";
  });

  modal?.addEventListener("click", function (e) {
    if (e.target.id === "popupCancelBtn") {
      closePopup();
    }

    if (e.target.closest("#popupUploadBox")) {
      document.getElementById("popupFileInput").click();
    }
  });

  document.addEventListener("change", function (e) {
    if (e.target.id === "popupFileInput") {
      const file = e.target.files[0];
      const preview = document.getElementById("popupPreview");
      const uploadContent = document.getElementById("popupUploadContent");
      const uploadBox = document.getElementById("popupUploadBox");
      const error = document.getElementById("popupImageError");

      if (!file) return;

      const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
      if (!allowed.includes(file.type)) {
        error.textContent = "Only image files allowed";
        return;
      }

      error.textContent = "";

      const reader = new FileReader();
      reader.onload = (ev) => {
        preview.src = ev.target.result;
        preview.style.display = "block";
        uploadContent.classList.add("hide");
        uploadBox.classList.add("preview-active");
      };
      reader.readAsDataURL(file);
    }
  });

  document.addEventListener("submit", function (e) {
    if (e.target.id === "DHMFOES-offerFormPopup") {
      e.preventDefault();

      const fileInput = document.getElementById("popupFileInput");
      const name = document.getElementById("popupImageName");
      const link = document.getElementById("popupCtaLink");

      const imageError = document.getElementById("popupImageError");
      const nameError = document.getElementById("popupNameError");
      const linkError = document.getElementById("popupLinkError");

      let valid = true;

      if (!fileInput.files.length) {
        imageError.textContent = "Image required";
        valid = false;
      } else imageError.textContent = "";

      if (name.value.trim() === "") {
        nameError.textContent = "Image name required";
        valid = false;
      } else nameError.textContent = "";

      if (link.value.trim() === "") {
        linkError.textContent = "CTA link required";
        valid = false;
      } else if (!isValidURL(link.value.trim())) {
        linkError.textContent = "Invalid URL";
        valid = false;
      } else linkError.textContent = "";

      if (valid) {
        alert("Offer Published Successfully!");
        closePopup();
      }
    }
  });

  function closePopup() {
    modal.style.display = "none";

    const form = document.getElementById("DHMFOES-offerFormPopup");
    const preview = document.getElementById("popupPreview");
    const uploadContent = document.getElementById("popupUploadContent");
    const uploadBox = document.getElementById("popupUploadBox");

    form?.reset();
    preview.style.display = "none";
    uploadContent.classList.remove("hide");
    uploadBox.classList.remove("preview-active");

    document.getElementById("popupImageError").textContent = "";
    document.getElementById("popupNameError").textContent = "";
    document.getElementById("popupLinkError").textContent = "";
  }

  // SECTION 2 IMAGE UPLOAD

  const uploadBox2 = document.getElementById("DHMFOES-uploadBox2");
  const fileInput2 = document.getElementById("DHMFOES-coverImage2");
  const imagePreview2 = document.getElementById("DHMFOES-imagePreview2");
  const uploadContent2 = document.getElementById("DHMFOES-uploadContent2");
  const imageError2 = document.getElementById("DHMFOES-imageError2");

  uploadBox2?.addEventListener("click", function () {
    fileInput2.click();
  });

  fileInput2?.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

    if (!allowed.includes(file.type)) {
      imageError2.textContent = "Only image files allowed (jpg, png, webp)";
      fileInput2.value = "";
      imagePreview2.style.display = "none";
      uploadContent2.classList.remove("hide");
      uploadBox2.classList.remove("preview-active");
      return;
    }

    imageError2.textContent = "";

    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview2.src = e.target.result;
      imagePreview2.style.display = "block";
      uploadContent2.classList.add("hide");
      uploadBox2.classList.add("preview-active");
    };

    reader.readAsDataURL(file);
  });

  // SECTION 2 VALIDATION

  const discountAmount = document.getElementById("discountAmount");
  const conditionField = document.getElementById("conditionField");
  const couponCode = document.getElementById("couponCode");
  const discountError = document.getElementById("discountError");
  const conditionError = document.getElementById("conditionError");
  const couponError = document.getElementById("couponError");
  const section2PublishBtn = document.getElementById("section2PublishBtn");

  discountAmount?.addEventListener("keypress", function (e) {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  });

  section2PublishBtn?.addEventListener("click", function () {
    let valid = true;

    if (!fileInput2.files.length) {
      imageError2.textContent = "Cover image is required";
      valid = false;
    } else imageError2.textContent = "";

    if (discountAmount.value.trim() === "") {
      discountError.textContent = "Discount amount is required";
      valid = false;
    } else discountError.textContent = "";

    if (conditionField.value.trim() === "") {
      conditionError.textContent = "Condition is required";
      valid = false;
    } else conditionError.textContent = "";

    if (couponCode.value.trim() === "") {
      couponError.textContent = "Coupon code is required";
      valid = false;
    } else couponError.textContent = "";

    if (valid) {
      alert("Section 2 Published Successfully!");
    }
  });
});
