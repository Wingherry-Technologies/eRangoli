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
  const thumbnails = document.querySelectorAll(".APVSVThumbnailItem");
  const mainImage = document.querySelector(".APVSVMainProductImage img");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      thumbnails.forEach((t) => t.classList.remove("APVSVActive"));
      thumb.classList.add("APVSVActive");

      const thumbImg = thumb.querySelector("img");
      if (thumbImg && mainImage) {
        mainImage.src = thumbImg.src;
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  APVSVSetupFiveItemToggle("details", ".APVSVDetailsList");
  APVSVSetupFiveItemToggle("policy", ".APVSVPolicyList");
});

function APVSVSetupFiveItemToggle(type, listSelector) {
  const header = document.querySelector(
    `.APVSVToggleHeader[data-target="${type}"]`,
  );
  const list = document.querySelector(listSelector);
  const icon = header?.querySelector(".APVSVToggleIcon");

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
/* APPROVE CONFIRMATION POPUP */
const APVSVapproveBtn = document.querySelector(".APVSVSentButton");
const APVSVapproveModal = document.getElementById("APVSVapproveModal");
const APVSVcloseApproveModal = document.getElementById(
  "APVSVcloseApproveModal",
);
const APVSVapproveYes = document.getElementById("APVSVapproveYes");
const APVSVapproveNo = document.getElementById("APVSVapproveNo");

if (APVSVapproveBtn) {
  APVSVapproveBtn.addEventListener("click", () => {
    APVSVapproveModal.classList.add("active");
  });
}

APVSVcloseApproveModal.addEventListener("click", () => {
  APVSVapproveModal.classList.remove("active");
});

APVSVapproveNo.addEventListener("click", () => {
  APVSVapproveModal.classList.remove("active");
});

APVSVapproveYes.addEventListener("click", () => {
  // popup close
  APVSVapproveModal.classList.remove("active");

  // poora page hide
  document.querySelector(".APVSVMainContentBeyond").style.display = "none";

  //  success screen show
  document.getElementById("APVSVapproveSuccessScreen").classList.add("active");
});

/* ===== REJECT CONFIRMATION POPUP ===== */
const APVSVrejectBtn = document.querySelector(".APVSVRejectButton");
const APVSVrejectModal = document.getElementById("APVSVrejectModal");
const APVSVcloseRejectModal = document.getElementById("APVSVcloseRejectModal");
const APVSVrejectYes = document.getElementById("APVSVrejectYes");
const APVSVrejectNo = document.getElementById("APVSVrejectNo");

if (APVSVrejectBtn) {
  APVSVrejectBtn.addEventListener("click", () => {
    APVSVrejectModal.classList.add("active");
  });
}

APVSVcloseRejectModal.addEventListener("click", () => {
  APVSVrejectModal.classList.remove("active");
});

APVSVrejectNo.addEventListener("click", () => {
  APVSVrejectModal.classList.remove("active");
});

APVSVrejectYes.addEventListener("click", () => {
  // popup close
  APVSVrejectModal.classList.remove("active");

  // main page hide
  document.querySelector(".APVSVMainContentBeyond").style.display = "none";

  // reject success screen show
  document.getElementById("APVSVrejectSuccessScreen").classList.add("active");
});

document
  .querySelector(".sidebar-main-vendor ul>li:nth-child(2)")
  .classList.add("sidebar-active");
document
  .querySelector(".sidebar-main-vendor ul>ul>li:nth-child(3)")
  .classList.add("submenu-active-highlight");
document.querySelector(".sidebar-main-vendor ul>ul").classList.add("active");

document
  .querySelector("#account-menu .mobile-dropdown:nth-child(2) .dropdown-header")
  .classList.add("dropdown-header-active");
document
  .querySelector(".mobile-submenu li:nth-child(3)")
  .classList.add("submenu-active-page");
document
  .querySelector("#account-menu .mobile-dropdown:nth-child(2)")
  .classList.add("active-mobile-submenu");

const APVSVApproveBtn = document.querySelector(".APVSVApproveButton");
const APVSVApproveModalLive = document.getElementById("APVSVapproveModal");
const APVSVCloseApproveLive = document.getElementById("APVSVcloseApproveModal");
const APVSVApproveYesLive = document.getElementById("APVSVapproveYes");
const APVSVApproveNoLive = document.getElementById("APVSVapproveNo");
const APVSVApproveSuccessLive = document.getElementById(
  "APVSVapproveSuccessScreenLive",
);

APVSVApproveBtn?.addEventListener("click", () => {
  APVSVApproveModalLive.classList.add("active");
});

APVSVCloseApproveLive?.addEventListener("click", () => {
  APVSVApproveModalLive.classList.remove("active");
});

APVSVApproveNoLive?.addEventListener("click", () => {
  APVSVApproveModalLive.classList.remove("active");
});

APVSVApproveYesLive?.addEventListener("click", () => {
  APVSVApproveModalLive.classList.remove("active");
  document.querySelector(".APVSVMainContentBeyond").style.display = "none";
  APVSVApproveSuccessLive.classList.add("active");
});

document.addEventListener("DOMContentLoaded", function () {
  const allSections = document.querySelectorAll(".APVOProductDetailsInfo");

  allSections.forEach((section) => {
    const header = section.querySelector(".APVSVToggleHeader");
    const icon = section.querySelector(".APVSVToggleIcon");
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
