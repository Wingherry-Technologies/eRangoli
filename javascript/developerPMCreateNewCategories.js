// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon = document.querySelector("#hamburger-menu>img");
var mobileBack = document.querySelector(".mobile-back-button");

hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
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
  const createBtn = document.querySelector(".DPMCNC-create-submit");
  const backBtn = document.getElementById("DPMCNC-backToList");

  const categoryName = document.getElementById("DPMCNC-categoryName");
  const subCategoryName = document.getElementById("DPMCNC-subCategoryName");

  const categoryNameError = document.getElementById("DPMCNC-categorynameError");
  const subCategoryNameError = document.getElementById(
    "DPMCNC-subcategorynameError",
  );

  const uploadContainers = document.querySelectorAll(
    ".DPMCNC-upload-container",
  );

  function restrictInput(inputField) {
    inputField.addEventListener("keypress", function (e) {
      const char = String.fromCharCode(e.which);
      if (!/[a-zA-Z ]/.test(char)) {
        e.preventDefault();
      }
    });

    inputField.addEventListener("input", function () {
      this.value = this.value.replace(/[^a-zA-Z ]/g, "");
      if (this.value.startsWith(" ")) {
        this.value = this.value.trimStart();
      }
    });
  }

  restrictInput(categoryName);
  restrictInput(subCategoryName);

  if (backBtn) {
    backBtn.addEventListener("click", function () {
      window.location.href = "../html/developerPMProductCategories.html";
    });
  }

  uploadContainers.forEach(function (container) {
    const input = container.querySelector("input[type='file']");
    const img = container.querySelector(".DPMCNC-upload-box img");
    const errorDiv = container.querySelector(".DPMCNC-error");
    const uploadBox = container.querySelector(".DPMCNC-upload-box");

    if (input) {
      input.addEventListener("change", function () {
        const file = this.files[0];

        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            img.src = e.target.result;
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "cover";
          };
          reader.readAsDataURL(file);

          if (errorDiv) {
            errorDiv.innerText = "";
            errorDiv.style.display = "none";
          }

          if (uploadBox) {
            uploadBox.classList.remove("DPMCNC-upload-error");
          }
        }
      });
    }
  });

  if (createBtn) {
    createBtn.addEventListener("click", function () {
      let isValid = true;

      if (categoryName.value.trim() === "") {
        categoryNameError.innerText = "Category Name is required";
        categoryNameError.style.display = "block";
        isValid = false;
      } else {
        categoryNameError.innerText = "";
        categoryNameError.style.display = "none";
      }

      if (subCategoryName.value.trim() === "") {
        subCategoryNameError.innerText = "Sub Category Name is required";
        subCategoryNameError.style.display = "block";
        isValid = false;
      } else {
        subCategoryNameError.innerText = "";
        subCategoryNameError.style.display = "none";
      }

      uploadContainers.forEach(function (container) {
        const input = container.querySelector("input[type='file']");
        const errorDiv = container.querySelector(".DPMCNC-error");
        const uploadBox = container.querySelector(".DPMCNC-upload-box");

        if (errorDiv) {
          if (!input.files || input.files.length === 0) {
            errorDiv.innerText = "Image is required";
            errorDiv.style.display = "block";
            if (uploadBox) {
              uploadBox.classList.add("DPMCNC-upload-error");
            }
            isValid = false;
          } else {
            errorDiv.innerText = "";
            errorDiv.style.display = "none";
            if (uploadBox) {
              uploadBox.classList.remove("DPMCNC-upload-error");
            }
          }
        }
      });

      if (isValid) {
        alert("Category Created Successfully");
      }
    });
  }

  // ==========================
  // FORCE START FROM 4TH LEVEL
  // ==========================

  const addBtn = document.querySelector(".DPMCNC-AddBtn");
  const createForm = document.querySelector(".DPMCNC-create-form");

  let dynamicLevel = 3; // because already 3 levels exist

  addBtn?.addEventListener("click", function () {
    dynamicLevel++; // now 4th level first time

    const subPrefix = "Sub - ".repeat(dynamicLevel);

    const wrapper = document.createElement("div");
    wrapper.classList.add("DPMCNC-dynamic-sub");

    wrapper.innerHTML = `
      <label>${subPrefix}Category Name (if applicable)</label>
      <input type="text" placeholder="Enter Name" />

      <div class="DPMCNC-upload-container">
        <p class="DPMCNC-upload-title">
          Upload ${subPrefix}Category Icon
        </p>

        <label class="DPMCNC-upload-box">
          <input type="file" hidden />
          <img
            src="../assets/adminProductCategories/upload.svg"
            alt="upload"
          />
        </label>
        <div class="DPMCNC-error DPMCNC-imageError"></div>
      </div>
  `;

    const submitBtn = document.querySelector(".DPMCNC-create-submit");
    createForm.insertBefore(wrapper, submitBtn);
  });
});

document
  .querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(2)")
  .classList.add("sidebar-active");
document
  .querySelector(".sidebar-main-vendor ul>ul:nth-of-type(1)")
  .classList.add("active");
document
  .querySelector(".sidebar-main-vendor ul>ul:nth-of-type(1)>li:nth-child(2)")
  .classList.add("submenu-active-highlight");

document
  .querySelector("#account-menu .mobile-dropdown:nth-child(2) .dropdown-header")
  .classList.add("dropdown-header-active");
document
  .querySelector("#account-menu .mobile-dropdown:nth-child(2)")
  .classList.add("active-mobile-submenu");
document
  .querySelector("#account-menu .mobile-dropdown:nth-child(2) li:nth-child(2)")
  .classList.add("submenu-active-page");
