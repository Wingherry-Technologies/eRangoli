document.addEventListener("DOMContentLoaded", function () {
  const uploadBox = document.getElementById("DHMFOES-uploadBox");
  const fileInput = document.getElementById("DHMFOES-coverImage");
  const imagePreview = document.getElementById("DHMFOES-imagePreview");
  const uploadContent = document.getElementById("DHMFOES-uploadContent");
  const deleteBtn = document.getElementById("DHMFOES-deleteBtn");
  const imageName = document.getElementById("DHMFOES-imageName");
  const ctaLink = document.getElementById("DHMFOES-ctaLink");
  const form = document.getElementById("DHMFOES-offerForm");
  const imageError = document.getElementById("DHMFOES-imageError");
  const nameError = document.getElementById("DHMFOES-nameError");
  const linkError = document.getElementById("DHMFOES-linkError");
  uploadBox.addEventListener("click", function () {
    fileInput.click();
  });
  fileInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      imageError.textContent = "Only image files allowed (jpg, png, webp)";
      fileInput.value = "";
      imagePreview.style.display = "none";
      uploadContent.classList.remove("hide");
      return;
    }
    imageError.textContent = "";
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      imagePreview.style.display = "block";
      uploadContent.classList.add("hide");
      uploadBox.classList.add("preview-active");
    };
    reader.readAsDataURL(file);
  });
  deleteBtn.addEventListener("click", function () {
    fileInput.value = "";
    imagePreview.src = "";
    imagePreview.style.display = "none";
    uploadContent.classList.remove("hide");
    uploadBox.classList.remove("preview-active");
    imageName.value = "";
    ctaLink.value = "";
    imageError.textContent = "";
    nameError.textContent = "";
    linkError.textContent = "";
  });
  imageName.addEventListener("keydown", function (e) {
    if (this.selectionStart === 0 && e.key === " ") {
      e.preventDefault();
    }
  });
  function isValidURL(url) {
    const pattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
    return pattern.test(url);
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;
    if (!fileInput.files.length) {
      imageError.textContent = "Image is required";
      isValid = false;
    } else {
      imageError.textContent = "";
    }
    if (imageName.value.trim() === "") {
      nameError.textContent = "Image name is required";
      isValid = false;
    } else {
      nameError.textContent = "";
    }
    if (ctaLink.value.trim() === "") {
      linkError.textContent = "CTA Link is required";
      isValid = false;
    } else if (!isValidURL(ctaLink.value.trim())) {
      linkError.textContent = "Enter valid URL starting with http/https";
      isValid = false;
    } else {
      linkError.textContent = "";
    }
    if (isValid) {
      alert("Offer Published Successfully!");
      form.reset();
      imagePreview.style.display = "none";
      uploadContent.classList.remove("hide");
    }
  });
});
const uploadBox2 = document.getElementById("DHMFOES-uploadBox2");
const fileInput2 = document.getElementById("DHMFOES-coverImage2");
const imagePreview2 = document.getElementById("DHMFOES-imagePreview2");
const uploadContent2 = document.getElementById("DHMFOES-uploadContent2");
const imageError2 = document.getElementById("DHMFOES-imageError2");
uploadBox2.addEventListener("click", function () {
  fileInput2.click();
});
fileInput2.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    imageError2.textContent = "Only image files allowed";
    fileInput2.value = "";
    imagePreview2.style.display = "none";
    uploadContent2.classList.remove("hide");
    uploadBox2.classList.remove("preview-active");
    return;
  }
  imageError2.textContent = "";
  const reader = new FileReader();
  reader.onload = function (e) {
    imagePreview2.src = e.target.result;
    imagePreview2.style.display = "block";
    uploadContent2.classList.add("hide");
    uploadBox2.classList.add("preview-active");
  };
  reader.readAsDataURL(file);
});
