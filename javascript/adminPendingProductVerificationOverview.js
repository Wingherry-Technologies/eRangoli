document.addEventListener("DOMContentLoaded", () => {
  // Thumbnail image switch
  const thumbnails = document.querySelectorAll(".APPVOThumbnailItem");
  const mainImage = document.querySelector(".APPVOMainProductImage img");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      thumbnails.forEach((t) => t.classList.remove("APPVOActive"));
      thumb.classList.add("APPVOActive");
      const img = thumb.querySelector("img");
      if (img && mainImage) mainImage.src = img.src;
    });
  });

  // Toggle setup for details and policy
  setupToggle("details", ".APPVODetailsList");
  setupToggle("policy", ".APPVOPolicyList");

  function setupToggle(type, listSelector) {
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

    items.forEach((li, i) => {
      if (i >= LIMIT) li.style.display = "none";
    });
    let expanded = false;

    header.addEventListener("click", () => {
      expanded = !expanded;
      items.forEach((li, i) => {
        if (i >= LIMIT) li.style.display = expanded ? "list-item" : "none";
      });
      icon.src = expanded
        ? "../assets/vendorProductPreview/Minus.svg"
        : "../assets/vendorProductPreview/Plus.svg";
    });
  }

  // Common approve modal elements
  const approveModal = document.getElementById("APPVOapproveModal");
  const approveClose = document.getElementById("APPVOcloseApproveModal");
  const approveNo = document.getElementById("APPVOapproveNo");
  const approveYes = document.getElementById("APPVOapproveYes");

  // Success screens
  const sentSuccess = document.getElementById("APPVOapproveSuccessScreen");
  const approveSuccessLive = document.getElementById(
    "APPVOapproveSuccessScreenLive",
  );

  // State to know which button opened modal
  let currentAction = null;

  // Sent to Verify button
  document.querySelector(".APPVOSentButton")?.addEventListener("click", () => {
    currentAction = "sent";
    approveModal.style.display = "flex";
  });

  // Approve button
  document
    .querySelector(".APPVOApproveButton")
    ?.addEventListener("click", () => {
      currentAction = "approve";
      approveModal.style.display = "flex";
    });

  // Close approve modal
  approveClose?.addEventListener("click", () => {
    approveModal.style.display = "none";
    currentAction = null;
  });

  // No button in approve modal
  approveNo?.addEventListener("click", () => {
    approveModal.style.display = "none";
    currentAction = null;
  });

  // Yes button in approve modal
  approveYes?.addEventListener("click", () => {
    approveModal.style.display = "none";
    document.querySelector(".APPVOMainContentBeyond").style.display = "none";

    if (currentAction === "sent") {
      sentSuccess.style.display = "flex";
    }

    if (currentAction === "approve") {
      approveSuccessLive.style.display = "flex";
    }

    currentAction = null;
  });

  // Reject flow
  const rejectBtn = document.querySelector(".APPVORejectButton");
  const rejectModal = document.getElementById("APPVOrejectModal");
  const rejectClose = document.getElementById("APPVOcloseRejectModal");
  const rejectNo = document.getElementById("APPVOrejectNo");
  const rejectYes = document.getElementById("APPVOrejectYes");
  const rejectSuccess = document.getElementById("APPVOrejectSuccessScreen");

  rejectBtn?.addEventListener("click", () => {
    rejectModal.style.display = "flex";
  });

  rejectClose?.addEventListener("click", () => {
    rejectModal.style.display = "none";
  });

  rejectNo?.addEventListener("click", () => {
    rejectModal.style.display = "none";
  });

  rejectYes?.addEventListener("click", () => {
    rejectModal.style.display = "none";
    document.querySelector(".APPVOMainContentBeyond").style.display = "none";
    rejectSuccess.style.display = "flex";
  });

  // Overlay click close
  window.addEventListener("click", (e) => {
    if (e.target === approveModal) approveModal.style.display = "none";
    if (e.target === rejectModal) rejectModal.style.display = "none";
  });
});
