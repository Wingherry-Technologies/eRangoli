// FAQ Accordion Toggle for Mobile
document.querySelectorAll(".APRAfaq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".APRAfaq-item").classList.toggle("active");
  });
});

// Screen Navigation
const mainContent = document.querySelector(".main-content-beyond");
const createScreen = document.getElementById("createCategoryScreen");
const openCreateBtn = document.querySelector(".create-btn");
const floatingBtn = document.querySelector(".floating-plus-btn");
const backBtn = document.getElementById("backToList");

// Open Create Screen
openCreateBtn?.addEventListener("click", () => {
  mainContent.style.display = "none";
  createScreen.style.display = "block";

});

floatingBtn?.addEventListener("click", () => {
  mainContent.style.display = "none";
  createScreen.style.display = "block";
  floatingBtn.style.display="none";
});

// Back to List
backBtn?.addEventListener("click", () => {
  createScreen.style.display = "none";
  mainContent.style.display = "block";
   floatingBtn.style.display="flex";
  resetForm();
});

// Form Elements
const categorySelect = document.getElementById("selectCategory");
const subcategorySelect = document.getElementById("selectSubcategory");
const discountInput = document.getElementById("discountPercentage");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const submitBtns = document.querySelectorAll(".create-submit");

// Error Elements
const categoryError = document.getElementById("categoryError");
const subcategoryError = document.getElementById("subcategoryError");
const discountError = document.getElementById("discountError");
const startDateError = document.getElementById("startDateError");
const endDateError = document.getElementById("endDateError");

submitBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const isCategoryValid = validateCategory();
    const isSubcategoryValid = validateSubcategory();
    const isDiscountValid = validateDiscount();
    const isStartDateValid = validateStartDate();
    const isEndDateValid = validateEndDate();

    if (
      isCategoryValid &&
      isSubcategoryValid &&
      isDiscountValid &&
      isStartDateValid &&
      isEndDateValid
    ) {
      createScreen.style.display = "none";
      mainContent.style.display = "block";
       floatingBtn.style.display="flex";
      resetForm();
    }
  });
});


// Validation Functions
function validateCategory() {
  const value = categorySelect.value.trim();
  if (value === "") {
    categoryError.innerText = "Category is required";
    categoryError.style.display = "block";
    categorySelect.classList.add("input-error");
    return false;
  }
  categoryError.style.display = "none";
  categorySelect.classList.remove("input-error");
  return true;
}

function validateSubcategory() {
  const value = subcategorySelect.value.trim();
  if (value === "") {
    subcategoryError.innerText = "Subcategory is required";
    subcategoryError.style.display = "block";
    subcategorySelect.classList.add("input-error");
    return false;
  }
  subcategoryError.style.display = "none";
  subcategorySelect.classList.remove("input-error");
  return true;
}

function validateDiscount() {
  const value = discountInput.value.trim();
  if (value === "") {
    discountError.innerText = "Discount percentage is required";
    discountError.style.display = "block";
    discountInput.classList.add("input-error");
    return false;
  }
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 100) {
    discountError.innerText = "Discount must be between 0 and 100";
    discountError.style.display = "block";
    discountInput.classList.add("input-error");
    return false;
  }
  discountError.style.display = "none";
  discountInput.classList.remove("input-error");
  return true;
}

function validateStartDate() {
  const value = startDateInput.value.trim();
  if (value === "") {
    startDateError.innerText = "Start date is required";
    startDateError.style.display = "block";
    startDateInput.classList.add("input-error");
    return false;
  }
  startDateError.style.display = "none";
  startDateInput.classList.remove("input-error");
  return true;
}

function validateEndDate() {
  const value = endDateInput.value.trim();
  if (value === "") {
    endDateError.innerText = "End date is required";
    endDateError.style.display = "block";
    endDateInput.classList.add("input-error");
    return false;
  }
  
  // Check if end date is after start date
  if (startDateInput.value && value <= startDateInput.value) {
    endDateError.innerText = "End date must be after start date";
    endDateError.style.display = "block";
    endDateInput.classList.add("input-error");
    return false;
  }
  
  endDateError.style.display = "none";
  endDateInput.classList.remove("input-error");
  return true;
}

// Add Event Listeners for Real-time Validation
categorySelect?.addEventListener("change", validateCategory);
subcategorySelect?.addEventListener("change", validateSubcategory);
discountInput?.addEventListener("input", validateDiscount);
startDateInput?.addEventListener("change", () => {
  validateStartDate();
  if (endDateInput.value) {
    validateEndDate();
  }
});
endDateInput?.addEventListener("change", validateEndDate);

// Restrict discount input to numbers only
discountInput?.addEventListener("keypress", (e) => {
  const key = e.key;
  if (
    key === "Backspace" ||
    key === "Delete" ||
    key === "ArrowLeft" ||
    key === "ArrowRight" ||
    key === "Tab" ||
    key === "." ||
    (key >= "0" && key <= "9")
  ) {
    return;
  }
  e.preventDefault();
});

// Form Submission
// submitBtns?.addEventListener("click", (e) => {
//   e.preventDefault();
  
//   const isCategoryValid = validateCategory();
//   const isSubcategoryValid = validateSubcategory();
//   const isDiscountValid = validateDiscount();
//   const isStartDateValid = validateStartDate();
//   const isEndDateValid = validateEndDate();
  
//   if (
//     isCategoryValid &&
//     isSubcategoryValid &&
//     isDiscountValid &&
//     isStartDateValid &&
//     isEndDateValid
//   ) {
//     // All validations passed
//     const formData = {
//       category: categorySelect.value,
//       subcategory: subcategorySelect.value,
//       discount: discountInput.value,
//       startDate: startDateInput.value,
//       endDate: endDateInput.value,
//     };
    
    
//     // Return to list view
//     createScreen.style.display = "none";
//     mainContent.style.display = "block";
//     resetForm();
//   } else {
//     console.log("Form validation failed");
//   }
// });

// Reset Form
function resetForm() {
  categorySelect.value = "";
  subcategorySelect.value = "";
  discountInput.value = "";
  startDateInput.value = "";
  endDateInput.value = "";
  
  // Hide all errors
  categoryError.style.display = "none";
  subcategoryError.style.display = "none";
  discountError.style.display = "none";
  startDateError.style.display = "none";
  endDateError.style.display = "none";
  
  // Remove error classes
  categorySelect.classList.remove("input-error");
  subcategorySelect.classList.remove("input-error");
  discountInput.classList.remove("input-error");
  startDateInput.classList.remove("input-error");
  endDateInput.classList.remove("input-error");
}

// Optional: Add functionality for edit and delete actions
document.addEventListener("click", (e) => {
  if (e.target.alt === "Edit") {
    console.log("Edit clicked");
    // Implement edit functionality
  }
  
  if (e.target.alt === "Delete") {
    if (confirm("Are you sure you want to delete this discount?")) {
      console.log("Delete confirmed");
      // Implement delete functionality
    }
  }
});