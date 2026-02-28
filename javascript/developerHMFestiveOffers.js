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

  // ── Offer Title Inline Edit ──────────────────────────────────────────────
  const offerTitleText = document.getElementById("DHMFOofferTitleText");
  const offerTitleInput = document.getElementById("DHMFOofferTitleInput");
  const offerTitleEditBtn = document.getElementById("DHMFOofferTitleEditBtn");

  if (offerTitleEditBtn && offerTitleText && offerTitleInput) {
    offerTitleEditBtn.addEventListener("click", function () {
      // Populate input with current title value and switch to edit mode
      offerTitleInput.value = offerTitleText.textContent.trim();
      offerTitleText.style.display = "none";
      offerTitleInput.style.display = "block";
      offerTitleInput.focus();
    });

    offerTitleInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        const newValue = offerTitleInput.value.trim();
        if (newValue !== "") {
          offerTitleText.textContent = newValue;
        }
        // Revert to view mode regardless (keep old value if empty)
        offerTitleInput.style.display = "none";
        offerTitleText.style.display = "block";
      }
    });

    // Also exit edit mode on blur, preserving old value if empty
    offerTitleInput.addEventListener("blur", function () {
      const newValue = offerTitleInput.value.trim();
      if (newValue !== "") {
        offerTitleText.textContent = newValue;
      }
      offerTitleInput.style.display = "none";
      offerTitleText.style.display = "block";
    });
  }
  // ────────────────────────────────────────────────────────────────────────

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

    if (popup._editTargetCard) {
      const card = popup._editTargetCard;

      const cardImg = card.querySelector(".DHMFO-image-wrap img");
      const cardName = card.querySelector(".DHMFO-card-body p");
      const cardLink = card.querySelector(".DHMFO-card-body a");

      if (cardImg) cardImg.src = previewImg.src;
      if (cardName) cardName.textContent = imageName.value.trim();
      if (cardLink) {
        cardLink.href = ctaLink.value.trim();
        cardLink.textContent = ctaLink.value.trim();
      }

      popup._editTargetCard = null;
      closePopup();
      return;
    }

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

    if (editSaveBtn) {
      editSaveBtn.addEventListener("click", function () {
        const paragraphs = section2View.querySelectorAll(".DHMFOform-group p");
        const viewImage = section2View.querySelector(".DHMFOcover-image img");

        if (paragraphs.length >= 4) {
          paragraphs[0].textContent = editDiscount.value.trim();
          paragraphs[1].textContent = editCondition.value.trim();
          paragraphs[2].textContent = editSubCondition.value.trim();
          paragraphs[3].textContent = editCoupon.value.trim();
        }

        if (viewImage && editPreview.src) {
          viewImage.src = editPreview.src;
        }

        section2Edit.style.display = "none";
        section2View.style.display = "block";
      });
    }

    if (editCancelBtn) {
      editCancelBtn.addEventListener("click", function () {
        section2Edit.style.display = "none";
        section2View.style.display = "block";
      });
    }
  }

  function openCardEditPopup(card) {
    const cardImg = card.querySelector(".DHMFO-image-wrap img");
    const cardName = card.querySelector(".DHMFO-card-body p");
    const cardLink = card.querySelector(".DHMFO-card-body a");

    imageName.value = cardName ? cardName.textContent.trim() : "";
    ctaLink.value = cardLink ? cardLink.getAttribute("href") : "";

    if (cardImg && cardImg.src) {
      previewImg.src = cardImg.src;
      previewImg.style.display = "block";
      uploadContent.style.display = "none";
      uploadBox.style.padding = "0";
    }

    imageError.textContent = "";
    nameError.textContent = "";
    linkError.textContent = "";

    popup._editTargetCard = card;

    openPopup();
  }

  function handleCardEditBtnClick(e) {
    const editBtn = e.target.closest(".DHMFO-edit-btn");
    if (!editBtn) return;

    const card = editBtn.closest(".DHMFO-category-card");
    if (!card) return;

    e.stopPropagation();
    openCardEditPopup(card);
  }

  const categoryGrid = document.querySelector(".DHMFO-category-grid");
  if (categoryGrid) {
    categoryGrid.addEventListener("click", handleCardEditBtnClick);
  }

  deleteBtn.removeEventListener("click", closePopup);
  deleteBtn.addEventListener("click", function () {
    if (popup._editTargetCard) {
      popup._editTargetCard.remove();
      popup._editTargetCard = null;
    }
    closePopup();
  });

  popup.addEventListener("click", function (e) {
    if (e.target === popup && window.innerWidth > 595) {
      popup._editTargetCard = null;
    }
  });
});
