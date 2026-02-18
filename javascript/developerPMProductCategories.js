document.querySelectorAll(".APRAfaq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".APRAfaq-item").classList.toggle("active");
  });
});

const mainContent = document.querySelector(".main-content-beyond");
const createScreen = document.getElementById("createCategoryScreen");
const openCreateBtn = document.querySelector(".create-btn");
const floatingBtn = document.querySelector(".floating-plus-btn");
const backBtn = document.getElementById("backToList");

openCreateBtn?.addEventListener("click", () => {
  mainContent.style.display = "none";
  createScreen.style.display = "block";
});

floatingBtn?.addEventListener("click", () => {
  mainContent.style.display = "none";
  createScreen.style.display = "block";
});

backBtn?.addEventListener("click", () => {
  createScreen.style.display = "none";
  mainContent.style.display = "block";
});

const submitBtn = document.querySelector(".create-submit");
const categoryInput = document.getElementById("categoryName");
const subCategoryInput = document.getElementById("subCategoryName");
const categorynameError = document.getElementById("categorynameError");
const subcategorynameError = document.getElementById("subcategorynameError");

function blockInvalidKeys(e) {
  const key = e.key;
  if (
    key === "Backspace" ||
    key === "Delete" ||
    key === "ArrowLeft" ||
    key === "ArrowRight" ||
    key === "Tab"
  ) {
    return;
  }
  if (key === " " && e.target.selectionStart === 0) {
    e.preventDefault();
    return;
  }
  if (!/^[A-Za-z ]$/.test(key)) {
    e.preventDefault();
  }
}

function validateCategory() {
  const v = categoryInput.value;
  if (v.trim() === "") {
    categorynameError.innerText = "Category Name is required";
    categorynameError.style.display = "block";
    categoryInput.classList.add("input-error");
    return false;
  }
  if (/^\s/.test(v)) {
    categorynameError.innerText = "1st place space not allowed";
    categorynameError.style.display = "block";
    categoryInput.classList.add("input-error");
    return false;
  }
  if (!/^[A-Za-z ]+$/.test(v)) {
    categorynameError.innerText = "Only characters allowed";
    categorynameError.style.display = "block";
    categoryInput.classList.add("input-error");
    return false;
  }
  categorynameError.innerText = "";
  categorynameError.style.display = "none";
  categoryInput.classList.remove("input-error");
  return true;
}

function validateSubCategory() {
  const v = subCategoryInput.value;
  if (v.trim() === "") {
    subcategorynameError.innerText = "Sub-Category Name is required";
    subcategorynameError.style.display = "block";
    subCategoryInput.classList.add("input-error");
    return false;
  }
  if (/^\s/.test(v)) {
    subcategorynameError.innerText = "1st place space not allowed";
    subcategorynameError.style.display = "block";
    subCategoryInput.classList.add("input-error");
    return false;
  }
  if (!/^[A-Za-z ]+$/.test(v)) {
    subcategorynameError.innerText = "Only characters allowed";
    subcategorynameError.style.display = "block";
    subCategoryInput.classList.add("input-error");
    return false;
  }
  subcategorynameError.innerText = "";
  subcategorynameError.style.display = "none";
  subCategoryInput.classList.remove("input-error");
  return true;
}

categoryInput.addEventListener("keydown", blockInvalidKeys);
subCategoryInput.addEventListener("keydown", blockInvalidKeys);

categoryInput.addEventListener("input", validateCategory);
subCategoryInput.addEventListener("input", validateSubCategory);

const uploadInputs = document.querySelectorAll(
  ".upload-box input, .upload-box-res input",
);

function handleImagePreview(input) {
  const file = input.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    const uploadBox = input.closest("label");
    uploadBox.innerHTML = "";

    const img = document.createElement("img");
    img.src = e.target.result;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.borderRadius = "8px";

    uploadBox.appendChild(img);
  };

  reader.readAsDataURL(file);
}

function validateImages() {
  let valid = true;

  uploadInputs.forEach((input, index) => {
    let errorDiv =
      input.closest(".upload-container")?.querySelector(".imageError") ||
      input.closest(".upload-container-res")?.querySelector(".imageError");

    if (!errorDiv) {
      errorDiv = document.createElement("div");
      errorDiv.classList.add("error", "imageError");
      input.closest("label").after(errorDiv);
    }

    if (index < 2) {
      if (!input.files || input.files.length === 0) {
        errorDiv.innerText = "Image is required";
        errorDiv.style.display = "block";
        valid = false;
      } else {
        errorDiv.innerText = "";
        errorDiv.style.display = "none";
      }
    } else {
      errorDiv.innerText = "";
      errorDiv.style.display = "none";
    }
  });

  return valid;
}

uploadInputs.forEach((input) => {
  input.addEventListener("change", function () {
    handleImagePreview(this);

    let errorDiv =
      this.closest(".upload-container")?.querySelector(".imageError") ||
      this.closest(".upload-container-res")?.querySelector(".imageError");

    if (errorDiv) {
      errorDiv.innerText = "";
      errorDiv.style.display = "none";
    }
  });
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const c = validateCategory();
  const s = validateSubCategory();
  const imgValid = validateImages();

  if (c && s && imgValid) {
    console.log("valid");
  }
});
