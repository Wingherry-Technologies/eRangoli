// Thumbnail image switch
document.addEventListener("DOMContentLoaded", () => {
  const thumbnails = document.querySelectorAll(".APOThumbnailItem");
  const mainImage = document.querySelector(".APOMainProductImage img");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      thumbnails.forEach((t) => t.classList.remove("APOActive"));
      thumb.classList.add("APOActive");

      const thumbImg = thumb.querySelector("img");
      if (thumbImg && mainImage) {
        mainImage.src = thumbImg.src;
      }
    });
  });
});
// Product details & policy toggle
document.addEventListener("DOMContentLoaded", () => {
  APOSetupFiveItemToggle("details", ".APODetailsList");
  APOSetupFiveItemToggle("policy", ".APOPolicyList");
});

function APOSetupFiveItemToggle(type, listSelector) {
  const header = document.querySelector(`.APOToggleHeader[data-target="${type}"]`);
  const list = document.querySelector(listSelector);
  const icon = header?.querySelector(".APOToggleIcon");

  if (!header || !list || !icon) return;

  const items = list.querySelectorAll("li");
  const LIMIT = 5;

  if (items.length <= LIMIT) {
    icon.style.display = "none";
    return;
  }

  items.forEach((li, index) => {
    if (index >= LIMIT) li.style.display = "none";
  });

  let expanded = false;
  icon.src = "../assets/vendorProductPreview/Plus.svg";

  header.addEventListener("click", () => {
    expanded = !expanded;

    items.forEach((li, index) => {
      if (index >= LIMIT) {
        li.style.display = expanded ? "list-item" : "none";
      }
    });

    icon.src = expanded
      ? "../assets/vendorProductPreview/Minus.svg"
      : "../assets/vendorProductPreview/Plus.svg";
  });
}

const APORemoveButton = document.querySelector(".APORemoveButton");
const APODeleteButton = document.querySelector(".APODeleteButton");

const APOremoveModal = document.getElementById("APOremoveModal");
const APOcloseRemoveModal = document.getElementById("APOcloseRemoveModal");
const APOremoveNo = document.getElementById("APOremoveNo");
const APOremoveYes = document.getElementById("APOremoveYes");
const APOConfirmText = document.getElementById("APOConfirmText");

let currentAction = ""; // "remove" or "delete"

// Remove button
APORemoveButton?.addEventListener("click", () => {
  currentAction = "remove";
  APOConfirmText.textContent = "Are you sure you want to make this product live?";
  APOremoveModal.classList.add("active");
});

// Delete button
APODeleteButton?.addEventListener("click", () => {
  currentAction = "delete";
  APOConfirmText.textContent = "Are you sure you want to delete this product permanently?";
  APOremoveModal.classList.add("active");
});

// Close modal
APOcloseRemoveModal?.addEventListener("click", closeModal);
APOremoveNo?.addEventListener("click", closeModal);

function closeModal() {
  APOremoveModal.classList.remove("active");
  currentAction = "";
}

// Yes button
APOremoveYes?.addEventListener("click", () => {
  APOremoveModal.classList.remove("active");

  if (currentAction === "remove") {
    window.location.href = "../html/adminPMProductList.html";
  }

  if (currentAction === "delete") {
    window.location.href = "../html/adminPMProductList.html";
  }

  currentAction = "";
});
