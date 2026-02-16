function toggleDropdown(id) {
  const all = document.querySelectorAll(".tile-dropdown");
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
  if (!e.target.closest(".img-tile")) {
    document
      .querySelectorAll(".tile-dropdown")
      .forEach((d) => d.classList.remove("open"));
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const editBtn = document.getElementById("editHeroBtn");
  const publishBtn = document.getElementById("publishHeroBtn");

  const viewMode = document.getElementById("viewMode");
  const editMode = document.getElementById("editMode");

  const headingInput = document.getElementById("heroHeading");
  const subTextInput = document.getElementById("heroSubText");
  const ctaInput = document.getElementById("heroCta");

  const viewHeading = document.getElementById("viewHeading");
  const viewSubText = document.getElementById("viewSubText");
  const viewCta = document.getElementById("viewCta");

  const deleteButtons = document.querySelectorAll(".tile-dropdown .delete");

  deleteButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();

      const tileWrapper = btn.closest(".img-tile-wrapper");
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

  function validateTextField(input, message) {
    const errorSpan = input.nextElementSibling;
    const value = input.value.trim();

    if (value === "") {
      errorSpan.textContent = message;
      input.classList.add("input-error");
      return false;
    }

    if (!/^[A-Za-z ]+$/.test(value)) {
      errorSpan.textContent = "Only letters are allowed";
      input.classList.add("input-error");
      return false;
    }

    if (value.startsWith(" ")) {
      errorSpan.textContent = "First character cannot be space";
      input.classList.add("input-error");
      return false;
    }

    errorSpan.textContent = "";
    input.classList.remove("input-error");
    return true;
  }

  function validateUrl(input) {
    const errorSpan = input.nextElementSibling;
    const value = input.value.trim();

    if (value === "") {
      errorSpan.textContent = "CTA Link is required";
      input.classList.add("input-error");
      return false;
    }

    const urlPattern = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;

    if (!urlPattern.test(value)) {
      errorSpan.textContent = "Enter valid URL (http:// or https:// required)";
      input.classList.add("input-error");
      return false;
    }

    errorSpan.textContent = "";
    input.classList.remove("input-error");
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
});
