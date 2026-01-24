

document.addEventListener("DOMContentLoaded", () => {
  const thumbnails = document.querySelectorAll(".APPVOThumbnailItem");
  const mainImage = document.querySelector(".APPVOMainProductImage img");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      thumbnails.forEach((t) => t.classList.remove("APPVOActive"));
      thumb.classList.add("APPVOActive");

      const thumbImg = thumb.querySelector("img");
      if (thumbImg && mainImage) {
        mainImage.src = thumbImg.src;
      }
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  APPVOSetupFiveItemToggle("details", ".APPVODetailsList");
  APPVOSetupFiveItemToggle("policy", ".APPVOPolicyList");
});

function APPVOSetupFiveItemToggle(type, listSelector) {
  const header = document.querySelector(
    `.APPVOToggleHeader[data-target="${type}"]`,
  );
  const list = document.querySelector(listSelector);
  const icon = header?.querySelector(".APPVOToggleIcon");

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

const APPVODeleteButton = document.querySelector(".APPVODeleteButton");
if (APPVODeleteButton) {
  APPVODeleteButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this product?")) {
      alert("Product deleted successfully!");
      window.history.back();
    }
  });
}

const APPVORemoveButton = document.querySelector(".APPVORemoveButton");
if (APPVORemoveButton) {
  APPVORemoveButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to remove this product?")) {
      alert("Product removed successfully!");
      window.history.back();
    }
  });
}

/* ===== APPROVE CONFIRMATION POPUP ===== */
const APPVOapproveBtn = document.querySelector(".APPVOApproveButton");
const APPVOapproveModal = document.getElementById("APPVOapproveModal");
const APPVOcloseApproveModal = document.getElementById(
  "APPVOcloseApproveModal",
);
const APPVOapproveYes = document.getElementById("APPVOapproveYes");
const APPVOapproveNo = document.getElementById("APPVOapproveNo");

APPVOapproveBtn.addEventListener("click", () => {
  APPVOapproveModal.classList.add("active");
});

APPVOcloseApproveModal.addEventListener("click", () => {
  APPVOapproveModal.classList.remove("active");
});

APPVOapproveNo.addEventListener("click", () => {
  APPVOapproveModal.classList.remove("active");
});

APPVOapproveYes.addEventListener("click", () => {
  // popup close
  APPVOapproveModal.classList.remove("active");

  // poora page hide
  document.querySelector(".APPVOMainContentBeyond").style.display = "none";

  // success screen show
  document.getElementById("APPVOapproveSuccessScreen").classList.add("active");
});
