document.addEventListener("DOMContentLoaded", function () {
  const plusIcons = document.querySelectorAll(".plus-icon");
  const publishButtons = document.querySelectorAll(
    ".publish-btn, .publish-btn-mob",
  );

  const headingInput = document.getElementById("heroHeading");
  const subTextInput = document.getElementById("heroSubText");
  const ctaInput = document.getElementById("heroCta");

  plusIcons.forEach(function (icon) {
    icon.addEventListener("click", function (e) {
      e.stopPropagation();

      document.querySelectorAll(".media-popup").forEach(function (popup) {
        popup.classList.remove("show");
      });

      const popup = icon.parentElement.querySelector(".media-popup");
      if (popup) {
        popup.classList.toggle("show");
      }
    });
  });

  document.querySelectorAll(".media-popup").forEach(function (popup) {
    popup.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  });

  document.addEventListener("click", function () {
    document.querySelectorAll(".media-popup").forEach(function (popup) {
      popup.classList.remove("show");
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
        document.querySelector(".section-top .publish-btn").style.display =
          "none";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");

        document.querySelector(".section-top").appendChild(editBtn);

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
      input.classList.add("input-error");
      return false;
    }

    if (!/^[A-Za-z ]+$/.test(value)) {
      errorSpan.textContent = "Only letters are allowed";
      input.classList.add("input-error");
      return false;
    }

    if (input.value.startsWith(" ")) {
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
});

function convertToViewMode() {
  const formGroups = document.querySelectorAll(".card-body .form-group");

  formGroups.forEach(function (group) {
    const input = group.querySelector("input");
    const value = input.value;

    input.style.display = "none";

    const viewText = document.createElement("div");
    viewText.classList.add("view-text");
    viewText.textContent = value;

    group.appendChild(viewText);
  });
}
