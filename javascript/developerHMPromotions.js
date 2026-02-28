document.addEventListener("DOMContentLoaded", function () {
  const listView = document.getElementById("DHMP-listView");
  const formView = document.getElementById("DHMP-formView");
  const categoryGrid = document.getElementById("DHMP-categoryGrid");
  const addNewCard = document.getElementById("DHMP-addNewCard");

  // Form elements
  const headingInput = document.getElementById("DHMPAN-headingInput");
  const marketplaceTextarea = document.getElementById(
    "DHMPAN-marketplaceTextarea",
  );
  const ctaInput = document.getElementById("DHMPAN-ctaInput");
  const uploadBox = document.getElementById("DHMPAN-uploadContent");
  const publishBtn = document.getElementById("DHMPAN-publishBtn");
  const cancelBtn = document.getElementById("DHMPAN-cancelBtn");
  const formHeader = document.getElementById("DHMPAN-formHeader");
  const formHeaderTab = document.getElementById("DHMPAN-formHeaderTab");

  // Error popup
  const minPopup = document.getElementById("DHMP-minCategoryPopup");
  const closePopup = document.getElementById("DHMP-closeMinPopup");
  let currentEditCard = null;
  let currentImageDataURL = null;
  function updateCounts() {
    const allCards = categoryGrid.querySelectorAll(".DHMP-category-card");
    const total = allCards.length;
    const desktopCount = document.getElementById("DHMP-stateCount");
    const mobileCount = document.querySelector(".DHMP-stateCount-mob");
    if (desktopCount) desktopCount.textContent = total + " Campaign";
    if (mobileCount) mobileCount.textContent = total + " Campaign";
  }

  function showForm(editCard) {
    currentEditCard = editCard || null;
    listView.style.display = "none";
    formView.style.display = "block";

    if (editCard) {
      // Edit mode
      const title = editCard.getAttribute("data-heading") || "";
      const mkt = editCard.getAttribute("data-marketplace") || "";
      const cta = editCard.getAttribute("data-cta") || "";
      const img = editCard.getAttribute("data-image") || null;

      headingInput.value = title;
      marketplaceTextarea.value = mkt;
      ctaInput.value = cta;

      // Show image preview if exists
      if (img) {
        setUploadBoxPreview(img);
        currentImageDataURL = img;
      } else {
        resetUploadBox();
        currentImageDataURL = null;
      }

      publishBtn.textContent = "Update";
      formHeader.textContent = "Edit Promotion Campaign";
      formHeaderTab.textContent = "Edit Promotion Campaign";

      cancelBtn.textContent = "Delete";
      cancelBtn.className = "DHMPAN-delete-btn";
      cancelBtn.id = "DHMPAN-cancelBtn";
    } else {
      // Add mode — reset form
      headingInput.value = "";
      marketplaceTextarea.value = "";
      ctaInput.value = "";
      resetUploadBox();
      currentImageDataURL = null;
      clearAllErrors();

      publishBtn.textContent = "Publish";
      formHeader.textContent = "Add New Promotion Campaign";
      formHeaderTab.textContent = "Add New Promotion Campaign";

      cancelBtn.textContent = "Cancel";
      cancelBtn.className = "DHMPAN-cancel-btn";
    }
  }

  function showList() {
    formView.style.display = "none";
    listView.style.display = "block";
    currentEditCard = null;
    currentImageDataURL = null;
    clearAllErrors();
  }

  // UPLOAD BOX RESET
  function resetUploadBox() {
    uploadBox.innerHTML = `
      <div>
        <img src="../assets/developerHMTopCattegories/add.svg" class="DHMPAN-upload-icon" />
      </div>
      <p>Upload Cover Image or<br />drag & drop</p>
      <input type="file" id="DHMPAN-mediaInput" accept="image/*" hidden />
    `;
    bindFileInput();
  }

  function setUploadBoxPreview(imgSrc) {
    uploadBox.innerHTML = `
      <img src="${imgSrc}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;border-radius:8px;pointer-events:none;" />
      <input type="file" id="DHMPAN-mediaInput" accept="image/*" hidden />
    `;
    uploadBox.style.position = "relative";
    uploadBox.style.overflow = "hidden";
    bindFileInput();
  }

  function bindFileInput() {
    const newFileInput = document.getElementById("DHMPAN-mediaInput");
    if (newFileInput) {
      newFileInput.addEventListener("change", handleFileChange);
    }
  }

  //    VALIDATION HELPERS
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

  function clearAllErrors() {
    [headingInput, marketplaceTextarea, ctaInput, uploadBox].forEach((el) => {
      if (el) removeError(el);
    });
  }

  function isValidURL(url) {
    const pattern = /^(https?:\/\/)[^\s$.?#].[^\s]*$/gm;
    return pattern.test(url);
  }

  //    CHARACTER RESTRICTION
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

  //  FILE CHANGE HANDLER
  function handleFileChange() {
    const activeFileInput = document.getElementById("DHMPAN-mediaInput");
    if (!activeFileInput) return;

    removeError(uploadBox);
    const file = activeFileInput.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showError(uploadBox, "Only image files allowed");
      activeFileInput.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      currentImageDataURL = e.target.result;
      setUploadBoxPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  //    UPLOAD BOX CLICK → trigger file input
  uploadBox.addEventListener("click", function () {
    const activeFileInput = document.getElementById("DHMPAN-mediaInput");
    if (activeFileInput) activeFileInput.click();
  });

  bindFileInput();

  //    INLINE INPUT VALIDATION CLEARING
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

  //    PUBLISH / UPDATE BUTTON
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

    if (ctaInput.value.trim() === "") {
      showError(ctaInput, "CTA Link is required");
      isValid = false;
    } else if (!isValidURL(ctaInput.value.trim())) {
      showError(ctaInput, "Enter valid URL (https://example.com)");
      isValid = false;
    }

    if (!currentImageDataURL) {
      showError(uploadBox, "Cover Image is required");
      isValid = false;
    }

    if (!isValid) return;

    const heading = headingInput.value.trim();
    const marketplace = marketplaceTextarea.value.trim();
    const cta = ctaInput.value.trim();
    const imgSrc = currentImageDataURL;

    if (currentEditCard) {
      // UPDATE existing card
      currentEditCard.setAttribute("data-heading", heading);
      currentEditCard.setAttribute("data-marketplace", marketplace);
      currentEditCard.setAttribute("data-cta", cta);
      currentEditCard.setAttribute("data-image", imgSrc);

      currentEditCard.querySelector(".DHMP-card-top div h4").textContent =
        "Heading";
      currentEditCard.querySelector(".DHMP-card-top div p").textContent =
        heading;

      currentEditCard.querySelector(".DHMP-cta-describe").textContent =
        marketplace;
      currentEditCard.querySelector(".DHMP-card-body a").textContent = cta;
      currentEditCard.querySelector(".DHMP-card-body a").href = cta;
      currentEditCard.querySelector(".DHMP-image-wrap img").src = imgSrc;

      showList();
    } else {
      // ADD new card
      const newCard = createCard(heading, marketplace, cta, imgSrc);
      categoryGrid.insertBefore(
        newCard,
        document.getElementById("DHMP-addNewCard"),
      );
      updateCounts();
      showList();
    }
  });

  //    CANCEL / DELETE BUTTON
  cancelBtn.addEventListener("click", function () {
    if (currentEditCard) {
      // Delete mode
      currentEditCard.remove();
      updateCounts();
    }
    showList();
  });

  addNewCard.addEventListener("click", function () {
    showForm(null);
  });
  categoryGrid.addEventListener("click", function (e) {
    const editBtn = e.target.closest(".DHMP-edit-btn");
    if (editBtn) {
      const card = editBtn.closest(".DHMP-category-card");
      if (card) showForm(card);
    }
  });

  categoryGrid.addEventListener("change", function (e) {
    if (e.target.type === "checkbox") {
      const allSwitches = categoryGrid.querySelectorAll(
        ".DHMP-switch input[type='checkbox']",
      );
      const activeCount = Array.from(allSwitches).filter(
        (s) => s.checked,
      ).length;

      if (!e.target.checked && activeCount < 5) {
        e.target.checked = true;
        minPopup.style.display = "flex";
      }
    }
  });

  if (closePopup) {
    closePopup.addEventListener("click", function () {
      minPopup.style.display = "none";
    });
  }

  //    CREATE CARD HELPER
  function createCard(heading, marketplace, cta, imgSrc) {
    const card = document.createElement("div");
    card.className = "DHMP-category-card";
    card.setAttribute("data-heading", heading);
    card.setAttribute("data-marketplace", marketplace);
    card.setAttribute("data-cta", cta);
    card.setAttribute("data-image", imgSrc);

    card.innerHTML = `
      <div class="DHMP-image-wrap">
        <img src="${imgSrc}" />
        <span class="DHMP-edit-btn">
          <img src="../assets/developerHMShopbyState/edit.svg" />
        </span>
      </div>
      <div class="DHMP-card-body">
        <div class="DHMP-card-top">
          <div>
            <h4>Heading</h4>
            <p>${escapeHTML(heading)}</p>
          </div>
          <label class="DHMP-switch">
            <input type="checkbox" checked />
            <span class="DHMP-slider"></span>
          </label>
        </div>
        <span class="DHMP-cta-description">Description</span>
        <p class="DHMP-cta-describe">${escapeHTML(marketplace)}</p>
        <span class="DHMP-cta-title">CTA Link</span>
        <a href="${escapeHTML(cta)}">${escapeHTML(cta)}</a>
      </div>
    `;
    return card;
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  updateCounts();
});
