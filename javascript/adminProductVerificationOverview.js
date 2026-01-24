
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
/* ===== APPROVE CONFIRMATION POPUP ===== */
/* ===== APPROVE CONFIRMATION POPUP ===== */
const APVOapproveBtn = document.querySelector(".APVOSentButton");
const APVOapproveModal = document.getElementById("APVOapproveModal");
const APVOcloseApproveModal = document.getElementById("APVOcloseApproveModal");
const APVOapproveYes = document.getElementById("APVOapproveYes");
const APVOapproveNo = document.getElementById("APVOapproveNo");

if (APVOapproveBtn) {
  APVOapproveBtn.addEventListener("click", () => {
    APVOapproveModal.classList.add("active");
  });
}

APVOcloseApproveModal.addEventListener("click", () => {
  APVOapproveModal.classList.remove("active");
});

APVOapproveNo.addEventListener("click", () => {
  APVOapproveModal.classList.remove("active");
});

APVOapproveYes.addEventListener("click", () => {
  // popup close
  APVOapproveModal.classList.remove("active");

  // poora page hide
  document.querySelector(".APVOMainContentBeyond").style.display = "none";

  //  success screen show
  document.getElementById("APVOapproveSuccessScreen").classList.add("active");
});

/* ===== REJECT CONFIRMATION POPUP ===== */
const APVOrejectBtn = document.querySelector(".APVORejectButton");
const APVOrejectModal = document.getElementById("APVOrejectModal");
const APVOcloseRejectModal = document.getElementById("APVOcloseRejectModal");
const APVOrejectYes = document.getElementById("APVOrejectYes");
const APVOrejectNo = document.getElementById("APVOrejectNo");

if (APVOrejectBtn) {
  APVOrejectBtn.addEventListener("click", () => {
    APVOrejectModal.classList.add("active");
  });
}

APVOcloseRejectModal.addEventListener("click", () => {
  APVOrejectModal.classList.remove("active");
});

APVOrejectNo.addEventListener("click", () => {
  APVOrejectModal.classList.remove("active");
});

APVOrejectYes.addEventListener("click", () => {
  // popup close
  APVOrejectModal.classList.remove("active");

  // main page hide
  document.querySelector(".APVOMainContentBeyond").style.display = "none";

  // reject success screen show
  document.getElementById("APVOrejectSuccessScreen").classList.add("active");
});
