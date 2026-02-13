document.querySelectorAll(".edit-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    alert("Edit clicked");
  });
});

document.querySelectorAll(".delete-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete?")) {
      btn.closest(".artisan-card").remove();
    }
  });
});

const addNewBtn = document.querySelector(".add-btn");
const popup = document.getElementById("artisanPopup");
const closePopup = document.getElementById("closePopup");
const floatingAddBtn = document.querySelector(".floating-add-btn");

function openPopup() {
  if (window.innerWidth <= 595) {
    popup.classList.add("mobile-full");
    popup.style.display = "block";
  } else {
    popup.classList.remove("mobile-full");
    popup.style.display = "flex";
  }
}

function closePopupHandler() {
  popup.classList.remove("mobile-full");
  popup.style.display = "none";
}

if (addNewBtn) {
  addNewBtn.addEventListener("click", openPopup);
}

if (floatingAddBtn) {
  floatingAddBtn.addEventListener("click", openPopup);
}

if (closePopup) {
  closePopup.addEventListener("click", closePopupHandler);
}

popup.addEventListener("click", (e) => {
  if (window.innerWidth > 595 && e.target === popup) {
    closePopupHandler();
  }
});

const uploadInput = document.getElementById("profileUpload");
const uploadPreview = document.getElementById("uploadPreview");
const uploadText = document.querySelector(".upload-text");

if (uploadInput) {
  uploadInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      uploadPreview.innerHTML = `<img src="${e.target.result}" />`;
    };
    reader.readAsDataURL(file);
  });
}

if (uploadText) {
  uploadText.addEventListener("click", () => {
    uploadInput.click();
  });
}
