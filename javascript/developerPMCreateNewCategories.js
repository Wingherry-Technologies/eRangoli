document.addEventListener("DOMContentLoaded", function () {
  const createBtn = document.querySelector(".create-submit");
  const backBtn = document.getElementById("backToList");

  const categoryName = document.getElementById("categoryName");
  const subCategoryName = document.getElementById("subCategoryName");

  const categoryNameError = document.getElementById("categorynameError");
  const subCategoryNameError = document.getElementById("subcategorynameError");

  const uploadContainers = document.querySelectorAll(".upload-container");

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
    const img = container.querySelector(".upload-box img");
    const errorDiv = container.querySelector(".error");
    const uploadBox = container.querySelector(".upload-box");

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
            uploadBox.classList.remove("upload-error");
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
        const errorDiv = container.querySelector(".error");
        const uploadBox = container.querySelector(".upload-box");

        if (errorDiv) {
          if (!input.files || input.files.length === 0) {
            errorDiv.innerText = "Image is required";
            errorDiv.style.display = "block";
            if (uploadBox) {
              uploadBox.classList.add("upload-error");
            }
            isValid = false;
          } else {
            errorDiv.innerText = "";
            errorDiv.style.display = "none";
            if (uploadBox) {
              uploadBox.classList.remove("upload-error");
            }
          }
        }
      });

      if (isValid) {
        alert("Category Created Successfully");
      }
    });
  }
});
