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

document.addEventListener("DOMContentLoaded", () => {
  const thumbnails = document.querySelectorAll(".APVOThumbnailItem");
  const mainImage = document.querySelector(".APVOMainProductImage img");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      thumbnails.forEach((t) => t.classList.remove("APVOActive"));
      thumb.classList.add("APVOActive");

      const thumbImg = thumb.querySelector("img");
      if (thumbImg && mainImage) {
        mainImage.src = thumbImg.src;
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  APVOSetupFiveItemToggle("details", ".APVODetailsList");
  APVOSetupFiveItemToggle("policy", ".APVOPolicyList");
});

function APVOSetupFiveItemToggle(type, listSelector) {
  const header = document.querySelector(
    `.APVOToggleHeader[data-target="${type}"]`,
  );
  const list = document.querySelector(listSelector);
  const icon = header?.querySelector(".APVOToggleIcon");

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
function showSuccessAndRedirect(successEl, redirectUrl) {
  document.querySelector(".APVOMainContentBeyond").style.display = "none";
  successEl.classList.add("active");

  setTimeout(() => {
    window.location.href = redirectUrl;
  }, 3000);
}
const sentBtn = document.querySelector(".APVOSentButton");

sentBtn.addEventListener("click", () => {
  verifyModal.classList.add("active");
});

verifyYes.addEventListener("click", () => {
  verifyModal.classList.remove("active");
  showSuccessAndRedirect(
    document.getElementById("verifySuccess"),
    "../html/adminPMProductVerification.html",
  );
});
const APVOApproveBtn = document.querySelector(".APVOApproveButton");

verifyNo.addEventListener("click", () => {
  verifyModal.classList.remove("active");
});
APVOApproveBtn.addEventListener("click", () => {
  approveModal.classList.add("active");
});

// approveYes.addEventListener("click", () => {
//   approveModal.classList.remove("active");
//   showSuccessAndRedirect(
//     document.getElementById("approveSuccess"),
//     "../html/adminPMProductList.html"
//   );
// });
approveYes.addEventListener("click", () => {
  approveModal.classList.remove("active");

  // direct redirect
  window.location.href = "../html/adminPMAddCompanyProfit.html";
});
// const APVOrejectBtn = document.querySelector(".APVORejectButton");
const rejectModal = document.getElementById("rejectModal");
const rejectYes = document.getElementById("rejectYes");
const rejectNo = document.getElementById("rejectNo");
const rejectBtn = document.querySelector(".APVORejectButton");
const approveBtn = document.querySelector(".APVOApproveButton");
const sentBtnUI = document.querySelector(".APVOSentButton");
const cancelBtn = document.querySelector(".APVOCancelButton");
const verifyClose = document.getElementById("verifyClose");
const rejectClose = document.getElementById("rejectClose");
const approveClose = document.getElementById("approveClose");

const rejectBox = document.getElementById("rejectBox");

let rejectStep = 0;

// VERIFY CLOSE
verifyClose.addEventListener("click", () => {
  verifyModal.classList.remove("active");
});

// REJECT CLOSE
rejectClose.addEventListener("click", () => {
  rejectModal.classList.remove("active");
});

// APPROVE CLOSE
approveClose.addEventListener("click", () => {
  approveModal.classList.remove("active");
});
approveNo.addEventListener("click", () => {
  approveModal.classList.remove("active");
});

// REJECT BUTTON CLICK
rejectBtn.addEventListener("click", () => {
  if (rejectStep === 0) {
    rejectBox.style.display = "block";
    approveBtn.style.display = "none";
    sentBtnUI.style.display = "none";
    cancelBtn.style.display = "inline-block";

    rejectStep = 1;
    return;
  }

  // STEP 2 → open modal
  rejectModal.classList.add("active");
});

// CANCEL BUTTON
cancelBtn.addEventListener("click", () => {
  rejectBox.style.display = "none";
  approveBtn.style.display = "inline-block";
  sentBtnUI.style.display = "inline-block";
  cancelBtn.style.display = "none";

  rejectStep = 0;
});

rejectYes.addEventListener("click", () => {
  rejectModal.classList.remove("active");
  showSuccessAndRedirect(
    document.getElementById("rejectSuccess"),
    "../html/adminPMProductVerification.html",
  );
});

rejectNo.addEventListener("click", () => {
  rejectModal.classList.remove("active");
});
document
  .querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(2)")
  .classList.add("sidebar-active");
document
  .querySelector(".sidebar-main-vendor ul>ul:nth-of-type(1)")
  .classList.add("active");
document
  .querySelector(".sidebar-main-vendor ul>ul:nth-of-type(1)>li:nth-child(3)")
  .classList.add("submenu-active-highlight");

document
  .querySelector("#account-menu .mobile-dropdown:nth-child(2) .dropdown-header")
  .classList.add("dropdown-header-active");
document
  .querySelector("#account-menu .mobile-dropdown:nth-child(2)")
  .classList.add("active-mobile-submenu");
document
  .querySelector("#account-menu .mobile-dropdown:nth-child(2) li:nth-child(3)")
  .classList.add("submenu-active-page");

document.addEventListener("DOMContentLoaded", function () {
  const allSections = document.querySelectorAll(".APVOProductDetailsInfo");

  allSections.forEach((section) => {
    const header = section.querySelector(".APVOToggleHeader");
    const icon = section.querySelector(".APVOToggleIcon");
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
