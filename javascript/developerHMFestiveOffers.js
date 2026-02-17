document.addEventListener("DOMContentLoaded", function () {
  const openPopupBtn = document.querySelector(".DHMTC-add-card");
  const popup = document.getElementById("offerPopup");
  const deleteBtn = document.getElementById("deleteBtn");
  const container = document.querySelector(".container");

  const uploadBox = document.getElementById("uploadBox");
  const fileInput = document.getElementById("coverImage");
  const uploadContent = document.getElementById("uploadContent");
  const previewImg = document.getElementById("imagePreview");

  const imageName = document.getElementById("imageName");
  const ctaLink = document.getElementById("ctaLink");

  const imageError = document.getElementById("imageError");
  const nameError = document.getElementById("nameError");
  const linkError = document.getElementById("linkError");

  const publishBtn = document.querySelector(".publish-btn");

  function handleMobileHeading() {
    const existingHeading = document.querySelector(".mobile-create-heading");

    if (window.innerWidth <= 595) {
      if (!existingHeading) {
        const heading = document.createElement("h3");
        heading.textContent = "Create New Offer";
        heading.classList.add("mobile-create-heading");
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

    const grid = document.querySelector(".DHMTC-category-grid");
    const addCard = document.querySelector(".DHMTC-add-card");
    const totalCards =
      document.querySelectorAll(".DHMTC-category-card").length + 1;

    const newCard = document.createElement("div");
    newCard.classList.add("DHMTC-category-card");

    newCard.innerHTML = `
      <div class="DHMTC-image-wrap">
        <img src="${previewImg.src}" />
        <span class="DHMTC-edit-btn">
          <img src="../assets/developerHMTopCattegories/edit.svg" />
        </span>
      </div>
      <div class="DHMTC-card-body">
        <div class="DHMTC-card-top">
          <div>
            <h4>Category ${totalCards}</h4>
            <p>${imageName.value.trim()}</p>
          </div>
          <label class="DHMTC-switch">
            <input type="checkbox" checked />
            <span class="DHMTC-slider"></span>
          </label>
        </div>
        <span class="DHMTC-cta-title">CTA Link</span>
        <a href="${ctaLink.value.trim()}" target="_blank">${ctaLink.value.trim()}</a>
      </div>
    `;

    grid.insertBefore(newCard, addCard);
    closePopup();
  });
});
