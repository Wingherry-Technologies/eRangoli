// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon = document.querySelector("#hamburger-menu>img");
var mobileBack = document.querySelector(".mobile-back-button");

hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display = "none";
    document.querySelector("body").style.overflow = "hidden";
    window.scrollTo(0, 0);
    mobileBack.style.display = "none";
  } else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow = "auto";
    document.querySelector(".bottom-nav").style.display = "flex";
    mobileBack.style.display = "flex";
  }
});

function DHMHStoggleDropdown(id) {
  const all = document.querySelectorAll(".DHMHStile-dropdown");
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
  if (!e.target.closest(".DHMHSimg-tile")) {
    document
      .querySelectorAll(".DHMHStile-dropdown")
      .forEach((d) => d.classList.remove("open"));
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const editBtn = document.getElementById("DHMHSeditHeroBtn");
  const publishBtn = document.getElementById("DHMHSpublishHeroBtn");

  const viewMode = document.getElementById("DHMHSviewMode");
  const editMode = document.getElementById("DHMHSeditMode");

  const headingInput = document.getElementById("DHMHSheroHeading");
  const subTextInput = document.getElementById("DHMHSheroSubText");
  const ctaInput = document.getElementById("DHMHSheroCta");

  const viewHeading = document.getElementById("DHMHSviewHeading");
  const viewSubText = document.getElementById("DHMHSviewSubText");
  const viewCta = document.getElementById("DHMHSviewCta");

  // DELETE EXISTING IMAGES
  const deleteButtons = document.querySelectorAll(
    ".DHMHStile-dropdown .DHMHSdelete",
  );

  deleteButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const tileWrapper = btn.closest(".DHMHSimg-tile-wrapper");
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
  });

  //VALIDATIONS
  function validateTextField(input, message) {
    const errorSpan = input.nextElementSibling;
    const value = input.value.trim();

    if (value === "") {
      errorSpan.textContent = message;
      input.classList.add("DHMHSinput-error");
      return false;
    }

    if (!/^[A-Za-z ]+$/.test(value)) {
      errorSpan.textContent = "Only letters are allowed";
      input.classList.add("DHMHSinput-error");
      return false;
    }

    if (value.startsWith(" ")) {
      errorSpan.textContent = "First character cannot be space";
      input.classList.add("DHMHSinput-error");
      return false;
    }

    errorSpan.textContent = "";
    input.classList.remove("DHMHSinput-error");
    return true;
  }

  function validateUrl(input) {
    const errorSpan = input.nextElementSibling;
    const value = input.value.trim();

    if (value === "") {
      errorSpan.textContent = "CTA Link is required";
      input.classList.add("DHMHSinput-error");
      return false;
    }

    const urlPattern = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;

    if (!urlPattern.test(value)) {
      errorSpan.textContent = "Enter valid URL (http:// or https:// required)";
      input.classList.add("DHMHSinput-error");
      return false;
    }

    errorSpan.textContent = "";
    input.classList.remove("DHMHSinput-error");
    return true;
  }

  publishBtn.addEventListener("click", function () {
    let isValid = true;

    if (!validateTextField(headingInput, "Heading is required"))
      isValid = false;

    if (!validateTextField(subTextInput, "Sub Text is required"))
      isValid = false;

    if (!validateUrl(ctaInput)) isValid = false;

    if (isValid) {
      viewHeading.textContent = headingInput.value.trim();
      viewSubText.textContent = subTextInput.value.trim();
      viewCta.textContent = ctaInput.value.trim();

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

  const addTile = document.getElementById("DHMHSaddTile");
  const imageInput = document.getElementById("DHMHSimageInput");
  const imageGrid = document.querySelector(".DHMHSimage-grid");

  // MINIMUM 3 MEDIA VALIDATION

  const heroPublishBtn = document.querySelector(
    ".DHMHSimages-card .DHMHSpublish-btn",
  );
  const minPopup = document.getElementById("DHMSS-minCategoryPopup");
  const closeMinPopup = document.getElementById("DHMSS-closeMinPopup");

  if (heroPublishBtn) {
    heroPublishBtn.addEventListener("click", function () {
      const mediaTiles = document.querySelectorAll(
        ".DHMHSimg-tile-wrapper .DHMHSimg-tile",
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
    addTile.addEventListener("click", function () {
      imageInput.click();
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
        wrapper.className = "DHMHSimg-tile-wrapper";

        const uniqueId = Date.now();
        const tileId = "DHMHStile" + uniqueId;
        const dropdownId = "DHMHSdd" + uniqueId;

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
    <div class="DHMHSimg-tile" id="${tileId}">
      ${mediaElement}
      <span class="DHMHStile-menu-btn"
            onclick="DHMHStoggleDropdown('${dropdownId}')">
        <img src="../assets/developerHMHeroSection/3dot.svg" />
      </span>
      <div class="DHMHStile-dropdown" id="${dropdownId}">
        <button class="DHMHSdelete">Delete</button>
      </div>
    </div>
  `;

        wrapper
          .querySelector(".DHMHSdelete")
          .addEventListener("click", function (e) {
            e.stopPropagation();
            wrapper.remove();
          });

        imageGrid.insertBefore(wrapper, addTile.parentElement);
        imageInput.value = "";
      };

      reader.readAsDataURL(file);
    });
  }
  const existingInput = document.getElementById("DHMHSexistingMediaInput");
  let currentTile = null;

  const existingUploadButtons = document.querySelectorAll(
    ".DHMHStile-dropdown button:not(.DHMHSdelete)",
  );

  existingUploadButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();

      currentTile = btn.closest(".DHMHSimg-tile");

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

document.querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(4)").classList.add("sidebar-active");


document.querySelector("#account-menu .mobile-dropdown:nth-child(4) .dropdown-header").classList.add("dropdown-header-active");

