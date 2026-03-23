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
  const header = document.querySelector(
    `.APOToggleHeader[data-target="${type}"]`,
  );
  const list = document.querySelector(listSelector);
  const icon = header?.querySelector(".APOToggleIcon");

  if (!header || !list || !icon) return;

  const items = list.querySelectorAll("li");
  const LIMIT = 1;

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
  APOConfirmText.textContent =
    "Are you sure you want to make this product live?";
  APOremoveModal.classList.add("active");
});

// Delete button
APODeleteButton?.addEventListener("click", () => {
  currentAction = "delete";
  APOConfirmText.textContent =
    "Are you sure you want to delete this product permanently?";
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

document
  .querySelector(".sidebar-main-vendor ul>li:nth-child(2)")
  .classList.add("sidebar-active");
document
  .querySelector(".sidebar-main-vendor ul>ul>li:nth-child(1)")
  .classList.add("submenu-active-highlight");
document.querySelector(".sidebar-main-vendor ul>ul").classList.add("active");

document
  .querySelector("#account-menu .mobile-dropdown:nth-child(2) .dropdown-header")
  .classList.add("dropdown-header-active");
document
  .querySelector(".mobile-submenu li:nth-child(1)")
  .classList.add("submenu-active-page");
document
  .querySelector("#account-menu .mobile-dropdown:nth-child(2)")
  .classList.add("active-mobile-submenu");

document.addEventListener("DOMContentLoaded", function () {
  const allSections = document.querySelectorAll(".APOProductDetailsInfo");

  allSections.forEach((section) => {
    const header = section.querySelector(".APOToggleHeader");
    const icon = section.querySelector(".APOToggleIcon");
    const items = section.querySelectorAll(".productOverviewDetailsList li");

    if (!header || items.length === 0) return;

    let isOpen = false;

    items.forEach((item, index) => {
      if (index !== 0) item.style.display = "none";
    });

    header.addEventListener("click", function () {
      isOpen = !isOpen;

      items.forEach((item, index) => {
        if (isOpen) {
          item.style.display = "flex";
        } else {
          item.style.display = index === 0 ? "flex" : "none";
        }
      });

      if (icon) {
        icon.src = isOpen
          ? "../assets/vendorProductPreview/Minus.svg"
          : "../assets/vendorProductPreview/Plus.svg";
      }
    });
  });
});
