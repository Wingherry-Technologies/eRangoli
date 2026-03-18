function EDHStoggleDropdown(id) {
  const all = document.querySelectorAll(".EDHStile-dropdown");
  all.forEach((dropdown) => {
    if (dropdown.id !== id) {
      dropdown.classList.remove("open");
    }
  });
  const current = document.getElementById(id);
  if (current) {
    current.classList.toggle("open");
  }
}

document.addEventListener("click", function (e) {
  if (!e.target.closest(".EDHSimg-tile")) {
    document
      .querySelectorAll(".EDHStile-dropdown")
      .forEach((d) => d.classList.remove("open"));
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const editBtn = document.getElementById("EDHSeditHeroBtn");
  const publishBtn = document.getElementById("EDHSpublishHeroBtn");

  const viewMode = document.getElementById("EDHSviewMode");
  const editMode = document.getElementById("EDHSeditMode");

  const headingInput = document.getElementById("EDHSheroHeading");
  const subTextInput = document.getElementById("EDHSheroSubText");
  const ctaInput = document.getElementById("EDHSheroCta");
  const secondaryCtaInput = document.getElementById("EDHSheroSecondaryCta");

  const viewHeading = document.getElementById("EDHSviewHeading");
  const viewSubText = document.getElementById("EDHSviewSubText");
  const viewCta = document.getElementById("EDHSviewCta");
  const viewSecondaryCta = document.getElementById("EDHSviewSecondaryCta");

  // DELETE EXISTING IMAGES
  const deleteButtons = document.querySelectorAll(
    ".EDHStile-dropdown .EDHSdelete"
  );

  deleteButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const tileWrapper = btn.closest(".EDHSimg-tile-wrapper");
      if (tileWrapper) {
        tileWrapper.remove();
      }
    });
  });

  if (!viewHeading.textContent.trim()) {
    viewHeading.textContent = headingInput.placeholder;
  }

  if (!viewSubText.textContent.trim()) {
    viewSubText.textContent = subTextInput.placeholder;
  }

  if (!viewCta.textContent.trim()) {
    viewCta.textContent = ctaInput.placeholder;
  }

  if (!viewSecondaryCta.textContent.trim()) {
    viewSecondaryCta.textContent = secondaryCtaInput.placeholder;
  }

  // EDIT BUTTON
  editBtn.addEventListener("click", function () {
    editMode.style.display = "block";
    viewMode.style.display = "none";
    editBtn.style.display = "none";
    publishBtn.style.display = "inline-block";

    headingInput.value =
      viewHeading.textContent === headingInput.placeholder
        ? ""
        : viewHeading.textContent;

    subTextInput.value =
      viewSubText.textContent === subTextInput.placeholder
        ? ""
        : viewSubText.textContent;

    ctaInput.value =
      viewCta.textContent === ctaInput.placeholder ? "" : viewCta.textContent;

    secondaryCtaInput.value =
      viewSecondaryCta.textContent === secondaryCtaInput.placeholder
        ? ""
        : viewSecondaryCta.textContent;
  });

  // VALIDATIONS
  function validateTextField(input, message) {
    const errorSpan = input.nextElementSibling;
    const value = input.value.trim();

    if (value === "") {
      errorSpan.textContent = message;
      input.classList.add("EDHSinput-error");
      return false;
    }

    if (!/^[A-Za-z ]+$/.test(value)) {
      errorSpan.textContent = "Only letters are allowed";
      input.classList.add("EDHSinput-error");
      return false;
    }

    if (value.startsWith(" ")) {
      errorSpan.textContent = "First character cannot be space";
      input.classList.add("EDHSinput-error");
      return false;
    }

    errorSpan.textContent = "";
    input.classList.remove("EDHSinput-error");
    return true;
  }

  function validateUrl(input) {
    const errorSpan = input.nextElementSibling;
    const value = input.value.trim();

    if (value === "") {
      errorSpan.textContent = "CTA Link is required";
      input.classList.add("EDHSinput-error");
      return false;
    }

    const urlPattern = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;

    if (!urlPattern.test(value)) {
      errorSpan.textContent = "Enter valid URL (http:// or https:// required)";
      input.classList.add("EDHSinput-error");
      return false;
    }

    errorSpan.textContent = "";
    input.classList.remove("EDHSinput-error");
    return true;
  }

  publishBtn.addEventListener("click", function () {
    let isValid = true;

    if (!validateTextField(headingInput, "Heading is required"))
      isValid = false;

    if (!validateTextField(subTextInput, "Sub Text is required"))
      isValid = false;

    if (!validateUrl(ctaInput)) isValid = false;
    if (!validateUrl(secondaryCtaInput)) isValid = false;

    if (isValid) {
      viewHeading.textContent = headingInput.value.trim();
      viewSubText.textContent = subTextInput.value.trim();
      viewCta.textContent = ctaInput.value.trim();
      viewSecondaryCta.textContent = secondaryCtaInput.value.trim();

      editMode.style.display = "none";
      viewMode.style.display = "block";

      publishBtn.style.display = "none";
      editBtn.style.display = "inline-block";
    }
  });

  function restrictTextInput(input) {
    input.addEventListener("input", function () {
      this.value = this.value.replace(/[^a-zA-Z\s]/g, "");
      if (this.value.startsWith(" ")) {
        this.value = this.value.trimStart();
      }
      this.value = this.value.replace(/\s{2,}/g, " ");
    });
  }

  restrictTextInput(headingInput);
  restrictTextInput(subTextInput);

  const addTile = document.getElementById("EDHSaddTile");
  const imageInput = document.getElementById("EDHSimageInput");
  const imageGrid = document.querySelector(".EDHSimage-grid");

  // MINIMUM 3 MEDIA VALIDATION
  const heroPublishBtn = document.querySelector(
    ".EDHSimages-card .EDHSpublish-btn"
  );
  const minPopup = document.getElementById("EDHS-minCategoryPopup");
  const closeMinPopup = document.getElementById("EDHS-closeMinPopup");

  if (heroPublishBtn) {
    heroPublishBtn.addEventListener("click", function () {
      const mediaTiles = document.querySelectorAll(
        ".EDHSimg-tile-wrapper .EDHSimg-tile"
      );

      if (mediaTiles.length < 3) {
        minPopup.style.display = "flex";
        return;
      }

      // If valid
      alert("Hero media published successfully!");
    });
  }

  // Close popup
  if (closeMinPopup) {
    closeMinPopup.addEventListener("click", function () {
      minPopup.style.display = "none";
    });
  }

  if (addTile && imageInput && imageGrid) {
const plusIcon = document.querySelector(".EDHSadd-icon");
const popup = document.querySelector(".EDHSmedia-popup");

plusIcon.addEventListener("click",function(e){

e.stopPropagation();

popup.classList.toggle("show");

});

document.addEventListener("click",function(){

popup.classList.remove("show");

});
document.querySelectorAll(".EDHSmedia-option")
.forEach(function(btn){

btn.addEventListener("click",function(){

const type = btn.textContent.trim();

popup.classList.remove("show");

imageInput.accept = type === "Image"
? "image/*"
: "video/*";

imageInput.click();

});

});

    imageInput.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (!file) return;

      if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
        imageInput.value = "";
        return;
      }

      const reader = new FileReader();

      reader.onload = function (event) {
        const wrapper = document.createElement("div");
        wrapper.className = "EDHSimg-tile-wrapper";

        const uniqueId = Date.now();
        const tileId = "EDHStile" + uniqueId;
        const dropdownId = "EDHSdd" + uniqueId;

        let mediaElement = "";

        if (file.type.startsWith("image/")) {
          mediaElement = `<img src="${event.target.result}" alt="Hero Media" />`;
        } else if (file.type.startsWith("video/")) {
          mediaElement = `
            <video controls>
              <source src="${event.target.result}" type="${file.type}">
              Your browser does not support the video tag.
            </video>
          `;
        }

        wrapper.innerHTML = `
          <div class="EDHSimg-tile" id="${tileId}">
            ${mediaElement}
            <span class="EDHStile-menu-btn"
                  onclick="EDHStoggleDropdown('${dropdownId}')">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 256 256'%3E%3Ccircle cx='128' cy='60' r='16' fill='%23fff'/%3E%3Ccircle cx='128' cy='128' r='16' fill='%23fff'/%3E%3Ccircle cx='128' cy='196' r='16' fill='%23fff'/%3E%3C/svg%3E" />
            </span>
            <div class="EDHStile-dropdown" id="${dropdownId}">
              <button class="EDHSdelete">Delete</button>
              <button class="EDHSupload-existing">Upload</button>
            </div>
          </div>
        `;

        wrapper
          .querySelector(".EDHSdelete")
          .addEventListener("click", function (e) {
            e.stopPropagation();
            wrapper.remove();
          });

        wrapper
          .querySelector(".EDHSupload-existing")
          .addEventListener("click", function (e) {
            e.stopPropagation();
            currentTile = wrapper.querySelector(".EDHSimg-tile");
            if (currentTile) {
              existingInput.click();
            }
          });

        imageGrid.insertBefore(wrapper, addTile.parentElement);
        imageInput.value = "";
      };

      reader.readAsDataURL(file);
    });
  }

  const existingInput = document.getElementById("EDHSexistingMediaInput");
  let currentTile = null;

  const existingUploadButtons = document.querySelectorAll(
    ".EDHStile-dropdown .EDHSupload-existing"
  );

  existingUploadButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();

      currentTile = btn.closest(".EDHSimg-tile");

      if (currentTile) {
        existingInput.click();
      }
    });
  });

  existingInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file || !currentTile) return;

    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      alert("Only image or video files allowed");
      existingInput.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
      const oldMedia = currentTile.querySelector("img, video");
      if (oldMedia) oldMedia.remove();

      let newMedia;

      if (file.type.startsWith("image/")) {
        newMedia = document.createElement("img");
        newMedia.src = event.target.result;
        newMedia.alt = "Hero Media";
      } else {
        newMedia = document.createElement("video");
        newMedia.controls = true;
        newMedia.src = event.target.result;
      }

      currentTile.insertBefore(newMedia, currentTile.firstChild);

      existingInput.value = "";
    };

    reader.readAsDataURL(file);
  });
});