// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon=document.querySelector("#hamburger-menu>img");
var mobileBack=document.querySelector(".mobile-back-button");


hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display="none"
    document.querySelector("body").style.overflow="hidden"
    window.scrollTo(0, 0);
    mobileBack.style.display="none"
  }
  else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow="auto";
    document.querySelector(".bottom-nav").style.display="flex";
    mobileBack.style.display="flex"
  }
});

// Thumbnail image switch
document.addEventListener("DOMContentLoaded", () => {
  const thumbnails = document.querySelectorAll(".DPOThumbnailItem");
  const mainImage = document.querySelector(".DPOMainProductImage img");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      thumbnails.forEach((t) => t.classList.remove("DPOActive"));
      thumb.classList.add("DPOActive");

      const thumbImg = thumb.querySelector("img");
      if (thumbImg && mainImage) {
        mainImage.src = thumbImg.src;
      }
    });
  });
});

// Product details & policy toggle
document.addEventListener("DOMContentLoaded", () => {
  DPOSetupFiveItemToggle("details", ".DPODetailsList");
  DPOSetupFiveItemToggle("policy", ".DPOPolicyList");
});

function DPOSetupFiveItemToggle(type, listSelector) {
  const header = document.querySelector(`.DPOToggleHeader[data-target="${type}"]`);
  const list = document.querySelector(listSelector);
  const icon = header?.querySelector(".DPOToggleIcon");

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


// send to admin
const sendToAdminBtn = document.querySelector(".DPOSendToAdminButton");

if (sendToAdminBtn) {
  sendToAdminBtn.addEventListener("click", () => {

    // (Optional) disable button to prevent double click
    sendToAdminBtn.disabled = true;

    // ✅ Show success animation
    const successOverlay = document.getElementById("successOverlay");
    successOverlay.classList.remove("hidden");

    // ⏳ Redirect after animation
    setTimeout(() => {
      window.location.href = "../html/developerPMRecentlyAddedList.html";
    }, 2500);
  });
}

/* =====================================================
   GLOBAL SAFE EXPORT
===================================================== */

window.DEV_enterEditMode = DEV_enterEditMode;
window.DEV_exitEditMode = DEV_exitEditMode;

document.querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(2)").classList.add("sidebar-active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(1)").classList.add("active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(1)>li:nth-child(1)").classList.add("submenu-active-highlight");


document.querySelector("#account-menu .mobile-dropdown:nth-child(2) .dropdown-header").classList.add("dropdown-header-active");
document.querySelector("#account-menu .mobile-dropdown:nth-child(2)").classList.add("active-mobile-submenu");
document.querySelector("#account-menu .mobile-dropdown:nth-child(2) li:nth-child(1)").classList.add("submenu-active-page");


