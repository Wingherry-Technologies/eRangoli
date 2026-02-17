document.addEventListener("DOMContentLoaded", function () {
  const uploadBox = document.getElementById("uploadBox");
  const fileInput = document.getElementById("coverImage");
  const imagePreview = document.getElementById("imagePreview");
  const uploadContent = document.getElementById("uploadContent");
  const deleteBtn = document.getElementById("deleteBtn");

  const imageName = document.getElementById("imageName");
  const ctaLink = document.getElementById("ctaLink");
  const form = document.getElementById("offerForm");

  const imageError = document.getElementById("imageError");
  const nameError = document.getElementById("nameError");
  const linkError = document.getElementById("linkError");

  /* CLICK UPLOAD */
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

  /* DELETE RESET */
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

  /* PREVENT FIRST SPACE */
  imageName.addEventListener("keydown", function (e) {
    if (this.selectionStart === 0 && e.key === " ") {
      e.preventDefault();
    }
  });

  /* URL VALIDATION */
  function isValidURL(url) {
    const pattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
    return pattern.test(url);
  }

  /* FORM VALIDATION */
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

const uploadBox2 = document.getElementById("uploadBox2");
const fileInput2 = document.getElementById("coverImage2");
const imagePreview2 = document.getElementById("imagePreview2");
const uploadContent2 = document.getElementById("uploadContent2");
const imageError2 = document.getElementById("imageError2");

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
