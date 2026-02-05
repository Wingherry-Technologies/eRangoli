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
  subCategoryInput.classList.remove("input-error");
  return true;
}

categoryInput.addEventListener("keydown", blockInvalidKeys);
subCategoryInput.addEventListener("keydown", blockInvalidKeys);

categoryInput.addEventListener("input", validateCategory);
subCategoryInput.addEventListener("input", validateSubCategory);

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const c = validateCategory();
  const s = validateSubCategory();
  if (c && s) {
    console.log("valid");
  }
});
