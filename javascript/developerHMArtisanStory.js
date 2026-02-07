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

addNewBtn.addEventListener("click", () => {
  popup.style.display = "flex";
});

closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});

popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});

const uploadInput = document.getElementById("profileUpload");
const uploadPreview = document.getElementById("uploadPreview");
const uploadText = document.querySelector(".upload-text");

uploadInput.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    uploadPreview.innerHTML = `<img src="${e.target.result}" />`;
  };
  reader.readAsDataURL(file);
});

uploadText.addEventListener("click", () => {
  uploadInput.click();
});

const floatingAddBtn = document.querySelector(".floating-add-btn");

if (floatingAddBtn) {
  floatingAddBtn.addEventListener("click", () => {
    popup.style.display = "flex";
  });
}
