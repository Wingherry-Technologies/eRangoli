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

document.addEventListener("DOMContentLoaded", function () {
  const plusIcons = document.querySelectorAll(".DHMHSESplus-icon");

  const publishButtons = document.querySelectorAll(
    ".DHMHSES-hero-publish-btn, .DHMHSES-hero-publish-btn-mob",
  );

  const headingInput = document.getElementById("DHMHSESheroHeading");
  const subTextInput = document.getElementById("DHMHSESheroSubText");
  const ctaInput = document.getElementById("DHMHSESheroCta");

  plusIcons.forEach(function (icon) {
    icon.addEventListener("click", function (e) {
      e.stopPropagation();

      document
        .querySelectorAll(".DHMHSESmedia-popup")
        .forEach(function (popup) {
          popup.classList.remove("DHMHSESshow");
        });

      const popup = icon.parentElement.querySelector(".DHMHSESmedia-popup");
      if (popup) {
        popup.classList.toggle("DHMHSESshow");
      }
    });
  });

  document.querySelectorAll(".DHMHSESmedia-popup").forEach(function (popup) {
    popup.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  });

  document.addEventListener("click", function () {
    document.querySelectorAll(".DHMHSESmedia-popup").forEach(function (popup) {
      popup.classList.remove("DHMHSESshow");
    });
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

  publishButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      let isValid = true;

      if (!validateTextField(headingInput, "Heading is required")) {
        isValid = false;
      }

      if (!validateTextField(subTextInput, "Sub Text is required")) {
        isValid = false;
      }

      if (!validateUrl(ctaInput)) {
        isValid = false;
      }

      if (isValid) {
        const desktopBtn = document.querySelector(
          ".DHMHSESsection-top .DHMHSES-hero-publish-btn",
        );
        if (desktopBtn) desktopBtn.style.display = "none";

        const mobileBtn = document.querySelector(
          ".DHMHSES-hero-publish-btn-mob",
        );
        if (mobileBtn) mobileBtn.style.display = "none";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("DHMHSESedit-btn");

        document.querySelector(".DHMHSESsection-top").appendChild(editBtn);

        convertToViewMode();

        editBtn.addEventListener("click", function () {
          location.reload();
        });
      }
    });
  });

  function validateTextField(input, message) {
    const errorSpan = input.nextElementSibling;
    const value = input.value.trim();

    if (value === "") {
      errorSpan.textContent = message;
      input.classList.add("DHMHSESinput-error");
      return false;
    }

    if (!/^[A-Za-z ]+$/.test(value)) {
      errorSpan.textContent = "Only letters are allowed";
      input.classList.add("DHMHSESinput-error");
      return false;
    }

    if (input.value.startsWith(" ")) {
      errorSpan.textContent = "First character cannot be space";
      input.classList.add("DHMHSESinput-error");
      return false;
    }

    errorSpan.textContent = "";
    input.classList.remove("DHMHSESinput-error");
    return true;
  }

  function validateUrl(input) {
    const errorSpan = input.nextElementSibling;
    const value = input.value.trim();

    if (value === "") {
      errorSpan.textContent = "CTA Link is required";
      input.classList.add("DHMHSESinput-error");
      return false;
    }

    const urlPattern = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;

    if (!urlPattern.test(value)) {
      errorSpan.textContent = "Enter valid URL (http:// or https:// required)";
      input.classList.add("DHMHSESinput-error");
      return false;
    }

    errorSpan.textContent = "";
    input.classList.remove("DHMHSESinput-error");
    return true;
  }

  const uploadBoxes = document.querySelectorAll(
    ".DHMHSESupload-box:not(.DHMHSESadd-media-box)",
  );

  uploadBoxes.forEach((box) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";
    box.appendChild(fileInput);

    box.addEventListener("click", function () {
      fileInput.click();
    });

    fileInput.addEventListener("change", function () {
      const file = this.files[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        alert("Only image files allowed");
        return;
      }

      const reader = new FileReader();

      reader.onload = function (e) {
        const oldImg = box.querySelector("img.preview-image");
        if (oldImg) oldImg.remove();

        const uploadText = box.querySelector("p");
        if (uploadText) uploadText.style.display = "none";

        const uploadIcon = box.querySelector(".DHMHSESupload-icon");
        if (uploadIcon) uploadIcon.style.display = "none";

        box.style.padding = "0";

        const img = document.createElement("img");
        img.src = e.target.result;
        img.classList.add("preview-image");

        box.appendChild(img);
      };

      reader.readAsDataURL(file);
    });
  });

  // ADD MEDIA BOX (IMAGE + VIDEO)

  function attachAddMediaLogic(box) {
    const popup = box.querySelector(".DHMHSESmedia-popup");
    const options = box.querySelectorAll(".DHMHSESmedia-option");

    options.forEach((btn) => {
      btn.addEventListener("click", function () {
        const type = btn.textContent.trim();
        popup.classList.remove("DHMHSESshow");

        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = type === "Image" ? "image/*" : "video/*";
        fileInput.style.display = "none";
        document.body.appendChild(fileInput);
        fileInput.click();

        fileInput.addEventListener("change", function () {
          const file = this.files[0];
          if (!file) return;

          const reader = new FileReader();

          reader.onload = function (e) {
            box.innerHTML = "";
            box.style.padding = "0";
            if (type === "Image") {
              const img = document.createElement("img");
              img.src = e.target.result;
              img.classList.add("preview-image");
              box.appendChild(img);
            } else {
              const video = document.createElement("video");
              video.src = e.target.result;
              video.controls = true;
              video.style.width = "100%";
              video.style.height = "100%";
              video.style.objectFit = "cover";
              box.appendChild(video);
            }

            createNewAddBox();
          };

          reader.readAsDataURL(file);
        });
      });
    });
  }

  function createNewAddBox() {
    const wrapper = document.querySelector(".DHMHSESupload-wrapper");

    const newBox = document.createElement("div");
    newBox.className = "DHMHSESupload-box DHMHSESadd-media-box";

    newBox.innerHTML = `
      <div class="DHMHSESplus-icon">+</div>
      <div class="DHMHSESmedia-popup">
        <button class="DHMHSESmedia-option">Image</button>
        <button class="DHMHSESmedia-option">Video</button>
      </div>
    `;

    wrapper.appendChild(newBox);

    const newPlusIcon = newBox.querySelector(".DHMHSESplus-icon");
    newPlusIcon.addEventListener("click", function (e) {
      e.stopPropagation();
      document
        .querySelectorAll(".DHMHSESmedia-popup")
        .forEach(function (popup) {
          popup.classList.remove("DHMHSESshow");
        });
      newBox
        .querySelector(".DHMHSESmedia-popup")
        .classList.toggle("DHMHSESshow");
    });

    attachAddMediaLogic(newBox);
  }

  document
    .querySelectorAll(".DHMHSESadd-media-box")
    .forEach((box) => attachAddMediaLogic(box));

  const imagesPublishButtons = document.querySelectorAll(
    ".DHMHSES-images-publish-btn, .DHMHSES-images-publish-btn-mob",
  );

  imagesPublishButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const uploadWrapper = document.querySelector(".DHMHSESupload-wrapper");
      const previewImages = uploadWrapper.querySelectorAll("img.preview-image");
      const previewVideos = uploadWrapper.querySelectorAll("video");
      const totalMediaCount = previewImages.length + previewVideos.length;

      if (totalMediaCount < 3) {
        const minPopup = document.getElementById("DHMSS-minCategoryPopup");
        if (minPopup) {
          minPopup.style.display = "flex";
        }

        setTimeout(function () {
          minPopup.style.display = "none";
        }, 3000);

        const closePopupBtn = document.getElementById("DHMSS-closeMinPopup");
        if (closePopupBtn) {
          closePopupBtn.addEventListener("click", function () {
            minPopup.style.display = "none";
          });
        }
      }
    });
  });
});

function convertToViewMode() {
  const formGroups = document.querySelectorAll(
    ".DHMHSEScard-body .DHMHSESform-group",
  );

  formGroups.forEach(function (group) {
    const input = group.querySelector("input");
    const value = input.value;

    input.style.display = "none";

    const viewText = document.createElement("div");
    viewText.classList.add("DHMHSESview-text");
    viewText.textContent = value;

    group.appendChild(viewText);
  });
}

document
  .querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(4)")
  .classList.add("sidebar-active");

document
  .querySelector("#account-menu .mobile-dropdown:nth-child(4) .dropdown-header")
  .classList.add("dropdown-header-active");
