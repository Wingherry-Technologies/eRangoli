// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon=document.querySelector("#hamburger-menu>img");
var mobileBack=document.querySelector(".mobile-back-button");


hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display="none"
    document.querySelector("body").style.overflow="hidden"
    window.scrollTo(0, 0);
    mobileBack.style.display="none"
  }
  else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow="auto";
    document.querySelector(".bottom-nav").style.display="flex";
    mobileBack.style.display="flex"
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const plusIcons = document.querySelectorAll(".DHMHSESplus-icon");
  const publishButtons = document.querySelectorAll(
    ".DHMHSESpublish-btn, .DHMHSESpublish-btn-mob",
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
        document.querySelector(
          ".DHMHSESsection-top .DHMHSESpublish-btn",
        ).style.display = "none";

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

document.querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(4)").classList.add("sidebar-active");


document.querySelector("#account-menu .mobile-dropdown:nth-child(4) .dropdown-header").classList.add("dropdown-header-active");
