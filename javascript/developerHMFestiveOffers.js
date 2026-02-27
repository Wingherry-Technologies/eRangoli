document.addEventListener("DOMContentLoaded", function () {
  const openPopupBtn = document.querySelector(".DHMFO-add-card");
  const popup = document.getElementById("DHMFOofferPopup");
  const deleteBtn = document.getElementById("DHMFOdeleteBtn");
  const container = document.querySelector(".DHMFOcontainer");

  const uploadBox = document.getElementById("DHMFOuploadBox");
  const fileInput = document.getElementById("DHMFOcoverImage");
  const uploadContent = document.getElementById("DHMFOuploadContent");
  const previewImg = document.getElementById("DHMFOimagePreview");

  const imageName = document.getElementById("DHMFOimageName");
  const ctaLink = document.getElementById("DHMFOctaLink");

  const imageError = document.getElementById("DHMFOimageError");
  const nameError = document.getElementById("DHMFOnnameError");
  const linkError = document.getElementById("DHMFOlinkError");

  const publishBtn = document.querySelector(".DHMFOpublish-btn");

  function handleMobileHeading() {
    const existingHeading = document.querySelector(
      ".DHMFOmobile-create-heading",
    );

    if (window.innerWidth <= 595) {
      if (!existingHeading) {
        const heading = document.createElement("h3");
        heading.textContent = "Create New Offer";
        heading.classList.add("DHMFOmobile-create-heading");
        uploadBox.parentNode.insertBefore(heading, uploadBox);
      }
      uploadBox.style.padding = "20px";
    } else {
      if (existingHeading) existingHeading.remove();
      uploadBox.style.padding = "";
    }
  }

  handleMobileHeading();
  window.addEventListener("resize", handleMobileHeading);

  function openPopup() {
    if (window.innerWidth <= 595) {
      container.style.display = "none";
      popup.style.display = "block";
      popup.style.position = "fixed";
      popup.style.top = "0";
      popup.style.left = "0";
      popup.style.width = "100%";
      popup.style.height = "100vh";
      popup.style.background = "#ffffff";
      popup.style.zIndex = "9999";
    } else {
      popup.classList.add("active");
    }
  }

  function closePopup() {
    if (window.innerWidth <= 595) {
      container.style.display = "block";
      popup.style.display = "none";
    } else {
      popup.classList.remove("active");
    }

    fileInput.value = "";
    previewImg.src = "";
    previewImg.style.display = "none";
    uploadContent.style.display = "block";
    uploadBox.style.padding = "";
    imageName.value = "";
    ctaLink.value = "";
    imageError.textContent = "";
    nameError.textContent = "";
    linkError.textContent = "";
  }

  openPopupBtn.addEventListener("click", openPopup);
  deleteBtn.addEventListener("click", closePopup);

  popup.addEventListener("click", function (e) {
    if (e.target === popup && window.innerWidth > 595) closePopup();
  });

  uploadBox.addEventListener("click", function () {
    fileInput.click();
  });

  fileInput.addEventListener("change", function () {
    const file = fileInput.files[0];
    if (file) previewImage(file);
  });

  uploadBox.addEventListener("dragover", function (e) {
    e.preventDefault();
  });

  uploadBox.addEventListener("drop", function (e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) previewImage(file);
  });

  function previewImage(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src = e.target.result;
      previewImg.style.display = "block";
      uploadContent.style.display = "none";
      uploadBox.style.padding = "0";
    };
    reader.readAsDataURL(file);
  }

  imageName.addEventListener("keydown", function (e) {
    const value = imageName.value;
    if (e.key >= "0" && e.key <= "9") e.preventDefault();
    if (e.key === " " && value.length === 0) e.preventDefault();
  });

  imageName.addEventListener("input", function () {
    imageName.value = imageName.value.replace(/[^A-Za-z\s]/g, "");
  });

  publishBtn.addEventListener("click", function () {
    let valid = true;

    imageError.textContent = "";
    nameError.textContent = "";
    linkError.textContent = "";

    const urlPattern = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;

    if (!previewImg.src) {
      imageError.textContent = "Cover image is required";
      valid = false;
    }

    if (imageName.value.trim() === "") {
      nameError.textContent = "Image name is required";
      valid = false;
    }

    if (ctaLink.value.trim() === "") {
      linkError.textContent = "CTA link is required";
      valid = false;
    } else if (!urlPattern.test(ctaLink.value.trim())) {
      linkError.textContent = "Enter a valid URL starting with http or https";
      valid = false;
    }

    if (!valid) return;

    const grid = document.querySelector(".DHMFO-category-grid");
    const addCard = document.querySelector(".DHMFO-add-card");
    const totalCards =
      document.querySelectorAll(".DHMFO-category-card").length + 1;

    const newCard = document.createElement("div");
    newCard.classList.add("DHMFO-category-card");

    newCard.innerHTML = `
      <div class="DHMFO-image-wrap">
        <img src="${previewImg.src}" />
        <span class="DHMFO-edit-btn">
          <img src="../assets/developerHMTopCattegories/edit.svg" />
        </span>
      </div>
      <div class="DHMFO-card-body">
        <div class="DHMFO-card-top">
          <div>
            <h4>Category ${totalCards}</h4>
            <p>${imageName.value.trim()}</p>
          </div>
          <label class="DHMFO-switch">
            <input type="checkbox" checked />
            <span class="DHMFO-slider"></span>
          </label>
        </div>
        <span class="DHMFO-cta-title">CTA Link</span>
        <a href="${ctaLink.value.trim()}" target="_blank">${ctaLink.value.trim()}</a>
      </div>
    `;

    grid.insertBefore(newCard, addCard);
    closePopup();
  });

  // SECTION 2 INLINE EDIT

  const section2EditBtn = document.querySelector(".section2-edit");
  const section2View = document.querySelector(".DHMFOsection2-body");
  const section2Edit = document.querySelector(".DHMFOES-section-2-edit");

  const editDiscount = document.getElementById("editDiscountAmount");
  const editCondition = document.getElementById("editConditionField");
  const editSubCondition = document.getElementById("editSubConditionField");
  const editCoupon = document.getElementById("editCouponCode");

  const editUploadBox = document.getElementById("editUploadBox2");
  const editFileInput = document.getElementById("editCoverImage2");
  const editPreview = document.getElementById("editImagePreview2");

  const editSaveBtn = document.getElementById("editSaveBtn");
  const editCancelBtn = document.getElementById("editCancelBtn");

  if (section2EditBtn && section2View && section2Edit) {
    //  OPEN EDIT MODE
    section2EditBtn.addEventListener("click", function () {
      const paragraphs = section2View.querySelectorAll(".DHMFOform-group p");
      const viewImage = section2View.querySelector(".DHMFOcover-image img");

      editDiscount.value = paragraphs[0]?.textContent.trim() || "";
      editCondition.value = paragraphs[1]?.textContent.trim() || "";
      editSubCondition.value = paragraphs[2]?.textContent.trim() || "";
      editCoupon.value = paragraphs[3]?.textContent.trim() || "";

      editPreview.src = viewImage?.src || "";
      editPreview.style.display = "block";

      section2View.style.display = "none";
      section2Edit.style.display = "block";
    });

    // IMAGE REPLACE
    if (editUploadBox && editFileInput) {
      editUploadBox.addEventListener("click", function () {
        editFileInput.click();
      });

      editFileInput.addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
          editPreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
      });
    }

    //  SAVE CHANGES
    if (editSaveBtn) {
      editSaveBtn.addEventListener("click", function () {
        const paragraphs = section2View.querySelectorAll(".DHMFOform-group p");
        const viewImage = section2View.querySelector(".DHMFOcover-image img");

        // Update view mode values
        if (paragraphs.length >= 4) {
          paragraphs[0].textContent = editDiscount.value.trim();
          paragraphs[1].textContent = editCondition.value.trim();
          paragraphs[2].textContent = editSubCondition.value.trim();
          paragraphs[3].textContent = editCoupon.value.trim();
        }

        // Update image
        if (viewImage && editPreview.src) {
          viewImage.src = editPreview.src;
        }

        section2Edit.style.display = "none";
        section2View.style.display = "block";
      });
    }

    //  CANCEL EDIT
    if (editCancelBtn) {
      editCancelBtn.addEventListener("click", function () {
        section2Edit.style.display = "none";
        section2View.style.display = "block";
      });
    }
  }
});
