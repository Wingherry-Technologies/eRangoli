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

let itemToRemove = null;

// ----------------------------
// CLICK HANDLER
// ----------------------------
document.addEventListener("click", function (e) {
  // --------------------------
  // Table Three Dots
  // --------------------------
  if (e.target.classList.contains("three-dot")) {
    e.stopPropagation();
    const previewBox = e.target
      .closest(".previewing")
      .querySelector(".all-preview");
    // Close other table preview boxes
    document
      .querySelectorAll(".all-preview")
      .forEach((box) => box.classList.remove("active-preview"));
    previewBox.classList.add("active-preview");
    return;
  }

  // --------------------------
  // FAQ Three Dots
  // --------------------------
  if (e.target.classList.contains("mobile-three-dots")) {
    e.stopPropagation();
    const previewBox = e.target
      .closest(".main-threedots-mobile")
      .querySelector(".show-threedots-box");
    // Close other FAQ preview boxes
    document
      .querySelectorAll(".show-threedots-box")
      .forEach((box) => box.classList.remove("active-preview"));
    previewBox.classList.add("active-preview");
    return;
  }

  // --------------------------
  // Click Remove in Table
  // --------------------------
  const tableRemove = e.target.closest(".all-preview div");
  if (tableRemove && tableRemove.textContent.includes("Remove")) {
    itemToRemove = e.target.closest("tr"); // only table rows
    if (itemToRemove)
      document.getElementById("confirmModal").classList.add("active");
  }

  // --------------------------
  // Click Remove in FAQ
  // --------------------------
  const faqRemove = e.target.closest(".show-threedots-box div");
  if (faqRemove && faqRemove.textContent.includes("Remove")) {
    itemToRemove = e.target.closest(".faq-item"); // only faq items
    if (itemToRemove)
      document.getElementById("confirmModal").classList.add("active");
  }

  // Close preview boxes if clicked outside
  if (
    !e.target.closest(".all-preview") &&
    !e.target.classList.contains("three-dot")
  ) {
    document
      .querySelectorAll(".all-preview")
      .forEach((box) => box.classList.remove("active-preview"));
  }
  if (
    !e.target.closest(".show-threedots-box") &&
    !e.target.classList.contains("mobile-three-dots")
  ) {
    document
      .querySelectorAll(".show-threedots-box")
      .forEach((box) => box.classList.remove("active-preview"));
  }
});

// ----------------------------
// CONFIRM MODAL BUTTONS
// ----------------------------
document.getElementById("confirmYes").addEventListener("click", function () {
  if (itemToRemove) {
    itemToRemove.remove();
    itemToRemove = null;
  }
  closeModal();
});

document.getElementById("confirmNo").addEventListener("click", closeModal);

function closeModal() {
  document.getElementById("confirmModal").classList.remove("active");
}

// =========================
// GLOBAL VARIABLES
// =========================
/*************************************************
  GLOBAL STATE
*************************************************/
const popups = document.querySelectorAll(".modal-popup-main");
let currentItem = null; // active table row OR faq item

/*************************************************
  CLOSE ALL POPUPS
*************************************************/
function closeAllPopups() {
  popups.forEach((popup) => popup.classList.remove("active"));
  currentItem = null;
}

/*************************************************
  OPEN POPUP BASED ON STATUS CLASS
*************************************************/
function openPopupByStatus(statusEl) {
  if (!statusEl) return;

  if (statusEl.classList.contains("approved")) {
    const popup = document.getElementById("received-popup");
    if (!popup) return;

    const statusPill = popup.querySelector(".rp-status-pill");
    if (statusPill) {
      statusPill.textContent = "Approved";
      statusPill.className = "rp-status-pill approved";
    }

    const approveBtn = popup.querySelector("#mark-as-packed");
    if (approveBtn) {
      approveBtn.textContent = "Approved";
      approveBtn.style.backgroundColor = "#13685D";
      approveBtn.style.color = "#ffffff";
      approveBtn.style.cursor = "not-allowed";
      approveBtn.style.opacity = "1";
      approveBtn.disabled = true;
    }

    const cancelBtn = popup.querySelector("#reject-from-received");
    if (cancelBtn) {
      cancelBtn.textContent = "Cancel";
      cancelBtn.disabled = true;
      cancelBtn.style.cursor = "not-allowed";
      cancelBtn.style.opacity = "0.5";
      cancelBtn.style.backgroundColor = "";
      cancelBtn.style.color = "";
      cancelBtn.style.border = "";
    }

    const reasonSection = document.getElementById("rp-reason-section");
    if (reasonSection) reasonSection.style.display = "none";

    popup.classList.add("active");
    return;
  }

  if (statusEl.classList.contains("cancelled")) {
    const popup = document.getElementById("received-popup");
    if (!popup) return;

    // Update status pill to "Cancelled"
    const statusPill = popup.querySelector(".rp-status-pill");
    if (statusPill) {
      statusPill.textContent = "Cancelled";
      statusPill.className = "rp-status-pill cancelled";
    }

    // Approve button → original green design, text "Approve", disabled (faded)
    const approveBtn = popup.querySelector("#mark-as-packed");
    if (approveBtn) {
      approveBtn.textContent = "Approve";
      approveBtn.style.backgroundColor = "#13685D";
      approveBtn.style.color = "#ffffff";
      approveBtn.style.border = "none";
      approveBtn.style.cursor = "not-allowed";
      approveBtn.style.opacity = "0.5";
      approveBtn.disabled = true;
    }

    // Cancel button → white bg, #13685D text, #13685D border, disabled
    const cancelBtn = popup.querySelector("#reject-from-received");
    if (cancelBtn) {
      cancelBtn.textContent = "Cancelled";
      cancelBtn.style.backgroundColor = "#ffffff";
      cancelBtn.style.color = "#13685D";
      cancelBtn.style.border = "1.5px solid #13685D";
      cancelBtn.style.cursor = "not-allowed";
      cancelBtn.style.opacity = "1";
      cancelBtn.disabled = true;
    }

    // Show reason section with dummy read-only data
    const reasonSection = document.getElementById("rp-reason-section");
    if (reasonSection) {
      reasonSection.style.display = "block";

      // Update heading
      const heading = reasonSection.querySelector(".rp-reason-heading");
      if (heading) heading.textContent = "Reason for Cancellation";

      // Set dummy reason text, read-only
      const textarea = reasonSection.querySelector("#rp-reason-textarea");
      if (textarea) {
        textarea.value =
          "The item was found to be severely damaged beyond repair. The product packaging was completely torn and the artwork surface had deep scratches. Customer requested a full cancellation of the return process.";
        textarea.disabled = true;
        textarea.style.cursor = "not-allowed";
        textarea.style.backgroundColor = "#f5f5f5";
        textarea.style.color = "#555";
      }

      // Hide error message
      const errorMsg = document.getElementById("rp-reason-error");
      if (errorMsg) errorMsg.classList.remove("rp-error-visible");

      // Pull images from Customer Return Order Details section (2nd rp-section)
      const customerPhotos = popup.querySelectorAll(
        ".rp-section:nth-child(2) .rp-photo-grid img",
      );
      const uploadPreviews =
        reasonSection.querySelectorAll(".rp-upload-preview");

      uploadPreviews.forEach((preview, i) => {
        const oldImg = preview.querySelector(".rp-uploaded-img");
        if (oldImg) oldImg.remove();

        const svg = preview.querySelector("svg");
        const span = preview.querySelector("span");
        if (svg) svg.style.display = "none";
        if (span) span.style.display = "none";

        const img = document.createElement("img");
        img.src = customerPhotos[i]
          ? customerPhotos[i].src
          : "../assets/vendorOrderManagement/img.svg";
        img.classList.add("rp-uploaded-img");
        preview.appendChild(img);
      });

      // Disable file inputs
      reasonSection.querySelectorAll(".rp-file-input").forEach((input) => {
        input.disabled = true;
      });
    }

    popup.classList.add("active");
    return;
  }

  if (statusEl.classList.contains("received")) {
    const popup = document.getElementById("received-popup");
    if (!popup) return;

    const statusPill = popup.querySelector(".rp-status-pill");
    if (statusPill) {
      statusPill.textContent = "Received";
      statusPill.className = "rp-status-pill";
    }

    const approveBtn = popup.querySelector("#mark-as-packed");
    if (approveBtn) {
      approveBtn.textContent = "Approve";
      approveBtn.style.backgroundColor = "";
      approveBtn.style.color = "";
      approveBtn.style.cursor = "";
      approveBtn.style.opacity = "";
      approveBtn.disabled = false;
    }

    const cancelBtn = popup.querySelector("#reject-from-received");
    if (cancelBtn) {
      cancelBtn.textContent = "Cancel";
      cancelBtn.disabled = false;
      cancelBtn.style.backgroundColor = "";
      cancelBtn.style.color = "";
      cancelBtn.style.border = "";
      cancelBtn.style.cursor = "";
      cancelBtn.style.opacity = "";
    }

    // Reset all sections
    popup.querySelectorAll(".rp-section").forEach((section) => {
      section.style.display = "block";
    });

    // Show buttons again
    if (approveBtn) {
      approveBtn.style.display = "inline-flex";
    }

    if (cancelBtn) {
      cancelBtn.style.display = "inline-flex";
    }

    popup.classList.add("active");
    return;
  }

  if (statusEl.classList.contains("rejected")) {
    document.getElementById("rejected-popup")?.classList.add("active");
  }

  if (statusEl.classList.contains("refunded")) {
    document.getElementById("refunded-popup")?.classList.add("active");
  }

  if (statusEl.classList.contains("accepted")) {
    document.getElementById("accepted-popup")?.classList.add("active");
  }
  if (statusEl.classList.contains("under-review")) {
    const popup = document.getElementById("received-popup");
    if (!popup) return;

    // Status
    const statusPill = popup.querySelector(".rp-status-pill");

    if (statusPill) {
      statusPill.textContent = "Under Review";
      statusPill.style.background = "#8e8989";
      statusPill.style.color = "#fff";
    }

    // Hide all sections first
    popup.querySelectorAll(".rp-section").forEach((section) => {
      section.style.display = "none";
    });

    // Show only Product Details section
    const sections = popup.querySelectorAll(".rp-section");

    if (sections[0]) {
      sections[0].style.display = "block";
    }

    // Show only Customer Return Order Details section
    if (sections[1]) {
      sections[1].style.display = "block";
    }

    // Hide only approve and cancel buttons
    const approveBtn = popup.querySelector("#mark-as-packed");
    const cancelBtn = popup.querySelector("#reject-from-received");

    if (approveBtn) {
      approveBtn.style.display = "none";
    }

    if (cancelBtn) {
      cancelBtn.style.display = "none";
    }

    popup.classList.add("active");
    return;
  }
}

/*************************************************
  DESKTOP TABLE ROW POPUP
*************************************************/
document.querySelectorAll(".show-popup-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    closeAllPopups();

    const row = btn.closest("tr");
    if (!row) return;

    const statusEl = row.querySelector(
      ".received, .under-review, .rejected, .refunded, .approved, .cancelled, .accepted",
    );
    if (!statusEl) return;

    currentItem = row;
    openPopupByStatus(statusEl);
  });
});

/*************************************************
  MOBILE FAQ POPUP
*************************************************/
document.querySelectorAll(".open-modal-popup-mobile").forEach((btn) => {
  btn.addEventListener("click", () => {
    closeAllPopups();

    const faqItem = btn.closest(".faq-answer");
    if (!faqItem) return;

    const statusEl = faqItem.querySelector(
      ".received, .under-review, .rejected, .refunded, .approved, .cancelled, .accepted",
    );
    if (!statusEl) return;

    currentItem = faqItem;
    openPopupByStatus(statusEl);
  });
});

/*************************************************
  RECEIVED → APPROVE BUTTON
*************************************************/
const markAsPackedBtn = document.getElementById("mark-as-packed");
if (markAsPackedBtn) {
  markAsPackedBtn.addEventListener("click", () => {
    if (currentItem) {
      const statusEl = currentItem.querySelector(".order-status");
      if (statusEl) {
        statusEl.textContent = "Approved";
        statusEl.className = "order-status approved";
      }
    }
    closeAllPopups();
    alert("Return has been approved successfully.");
  });
}
/*************************************************
  RECEIVED → REJECT ACTION
*************************************************/
/*************************************************
  RECEIVED → CANCEL BUTTON
*************************************************/
const rejectFromReceivedBtn = document.getElementById("reject-from-received");

if (rejectFromReceivedBtn) {
  rejectFromReceivedBtn.addEventListener("click", () => {
    const reasonSection = document.getElementById("rp-reason-section");
    const approveBtn = document.getElementById("mark-as-packed");
    const textarea = document.getElementById("rp-reason-textarea");
    const errorMsg = document.getElementById("rp-reason-error");

    // If reason section not yet visible, show it and disable approve
    if (
      reasonSection.style.display === "none" ||
      reasonSection.style.display === ""
    ) {
      reasonSection.style.display = "block";
      approveBtn.disabled = true;

      // Scroll to reason section
      reasonSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }

    // If reason section already visible, validate textarea
    const reasonValue = textarea.value.trim();

    if (!reasonValue) {
      textarea.classList.add("rp-error-border");
      errorMsg.classList.add("rp-error-visible");
      return;
    }

    // Valid — close popup and show success
    textarea.classList.remove("rp-error-border");
    errorMsg.classList.remove("rp-error-visible");

    // Reset for next open
    textarea.value = "";
    reasonSection.style.display = "none";
    approveBtn.disabled = false;

    // Reset file previews
    document.querySelectorAll(".rp-upload-preview").forEach((preview) => {
      const uploaded = preview.querySelector(".rp-uploaded-img");
      if (uploaded) uploaded.remove();
      preview.querySelector("svg").style.display = "block";
      preview.querySelector("span").style.display = "block";
    });

    if (currentItem) {
      const statusEl = currentItem.querySelector(".order-status");
      if (statusEl) {
        statusEl.textContent = "Cancelled";
        statusEl.className = "order-status cancelled";
      }
    }
    closeAllPopups();
    alert("Return has been cancelled successfully.");
  });
}

/*************************************************
  FILE UPLOAD PREVIEW
*************************************************/
document.querySelectorAll(".rp-file-input").forEach((input, index) => {
  input.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const previewId = `rp-preview-${index + 1}`;
    const preview = document.getElementById(previewId);
    if (!preview) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      // Remove old uploaded img if any
      const oldImg = preview.querySelector(".rp-uploaded-img");
      if (oldImg) oldImg.remove();

      // Hide icon and label
      preview.querySelector("svg").style.display = "none";
      preview.querySelector("span").style.display = "none";

      // Show image
      const img = document.createElement("img");
      img.src = e.target.result;
      img.classList.add("rp-uploaded-img");
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

/*************************************************
  RESET REASON SECTION WHEN POPUP CLOSES
*************************************************/
document.querySelectorAll("#received-popup .close-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const reasonSection = document.getElementById("rp-reason-section");
    const approveBtn = document.getElementById("mark-as-packed");
    const cancelBtn = document.getElementById("reject-from-received");
    const textarea = document.getElementById("rp-reason-textarea");
    const errorMsg = document.getElementById("rp-reason-error");
    const statusPill = document.querySelector(
      "#received-popup .rp-status-pill",
    );

    if (reasonSection) reasonSection.style.display = "none";

    if (approveBtn) {
      approveBtn.disabled = false;
      approveBtn.textContent = "Approve";
      approveBtn.style.backgroundColor = "";
      approveBtn.style.color = "";
      approveBtn.style.cursor = "";
      approveBtn.style.opacity = "";
    }
    if (cancelBtn) {
      cancelBtn.disabled = false;
      cancelBtn.textContent = "Cancel";
      cancelBtn.style.backgroundColor = "";
      cancelBtn.style.color = "";
      cancelBtn.style.border = "";
      cancelBtn.style.cursor = "";
      cancelBtn.style.opacity = "";
    }
    if (statusPill) {
      statusPill.textContent = "Received";
      statusPill.className = "rp-status-pill";
      statusPill.style.background = "";
      statusPill.style.color = "";
    }
    if (textarea) {
      textarea.value = "";
      textarea.disabled = false;
      textarea.style.cursor = "";
      textarea.style.backgroundColor = "";
    }
    if (errorMsg) errorMsg.classList.remove("rp-error-visible");

    // Re-enable file inputs
    document.querySelectorAll(".rp-file-input").forEach((input) => {
      input.disabled = false;
    });

    document
      .querySelectorAll(".rp-reason-textarea")
      .forEach((t) => t.classList.remove("rp-error-border"));
    document.querySelectorAll(".rp-upload-preview").forEach((preview) => {
      const uploaded = preview.querySelector(".rp-uploaded-img");
      if (uploaded) uploaded.remove();
      const svg = preview.querySelector("svg");
      const span = preview.querySelector("span");
      if (svg) svg.style.display = "block";
      if (span) span.style.display = "block";
    });
  });
});

/*************************************************
  REJECTED → CONFIRM REJECT
*************************************************/
const rejectBtn = document.getElementById("confirm-reject");
if (rejectBtn) {
  rejectBtn.addEventListener("click", () => {
    if (!currentItem) return;

    const statusEl = currentItem.querySelector(
      ".order-status, .received, .refunded",
    );

    if (!statusEl) return;

    statusEl.textContent = "Rejected";
    statusEl.className = "order-status rejected";

    closeAllPopups();
  });
}

/*************************************************
  REFUNDED → CONFIRM REFUND
*************************************************/
const refundBtn = document.getElementById("confirm-refund");
if (refundBtn) {
  refundBtn.addEventListener("click", () => {
    if (!currentItem) return;

    const statusEl = currentItem.querySelector(
      ".order-status, .received, .packed",
    );

    if (!statusEl) return;

    statusEl.textContent = "Refunded";
    statusEl.className = "order-status refunded";

    closeAllPopups();
  });
}

/*************************************************
  CLOSE BUTTONS
*************************************************/
document.querySelectorAll(".close-btn").forEach((btn) => {
  btn.addEventListener("click", closeAllPopups);
});

/*************************************************
  CLICK OUTSIDE TO CLOSE (OPTIONAL)
*************************************************/
popups.forEach((popup) => {
  popup.addEventListener("click", (e) => {
    if (e.target === popup) closeAllPopups();
  });
});

// Search Functionality
// Unified Search (Table + FAQ)
const searchInput = document.getElementById("search-bar-table");

/* =========================
   TABLE SEARCH
========================= */
const tableRows = document.querySelectorAll(".table-products tbody tr");

/* =========================
   FAQ SEARCH
========================= */
const faqItems = document.querySelectorAll(".faq-item");

searchInput.addEventListener("input", function () {
  const searchValue = this.value.toLowerCase().trim();

  /* ===== TABLE FILTER ===== */
  tableRows.forEach((row) => {
    const productName =
      row
        .querySelector(".product-col-rows span:first-child")
        ?.innerText.toLowerCase() || "";

    const category = row.children[3]?.innerText.toLowerCase() || "";

    const isMatch =
      productName.includes(searchValue) || category.includes(searchValue);

    row.style.display = isMatch ? "" : "none";
  });

  /* ===== FAQ FILTER ===== */
  faqItems.forEach((item) => {
    const productName =
      item.querySelector(".main-faq-question span")?.innerText.toLowerCase() ||
      "";

    const category =
      item
        .querySelector(".all-answers div:nth-child(3) span:nth-child(2)")
        ?.innerText.toLowerCase() || "";

    const isMatch =
      productName.includes(searchValue) || category.includes(searchValue);

    item.style.display = isMatch ? "" : "none";
  });
});

// Filter Accordion Logic

// ----------------------------
// TOGGLE FILTER BOXES
// ----------------------------
// ----------------------------
// TOGGLE FILTER BOXES
// ----------------------------
const filterBar = document.getElementById("filter-bar-main-box");
const filterMain = document.getElementById("filter-main");
const statusBox = document.getElementById("status-box");
const statusFilterBtn = filterMain.querySelector("ul li"); // "Status" button

filterBar.addEventListener("click", () => {
  filterMain.classList.toggle("active-main-content-flows");
  statusBox.classList.remove("active-main-content-flows");
});

statusFilterBtn.addEventListener("click", () => {
  statusBox.classList.toggle("active-main-content-flows");
});

// ----------------------------
// TABLE AND FAQ FILTER
// ----------------------------
const tableRows1 = document.querySelectorAll(".table-products tbody tr");
const faqItems2 = document.querySelectorAll(".faq .faq-item");
const statusCheckboxes = document.querySelectorAll(
  "#status-box input[type='checkbox']",
);
const searchInput1 = document.getElementById("search-bar-table");

// Helper function to get status text from a table row or faq item
function getStatus(element) {
  const statusSpan = element.querySelector(
    ".order-status, .all-answers span.received-orders, .all-answers span.packed-order, .all-answers span.delivered-order",
  );
  return statusSpan?.innerText.toLowerCase() || "";
}

// Main filter function
function filterContent() {
  const selectedStatuses = Array.from(statusCheckboxes)
    .filter((cb) => cb.checked)
    .map((cb) => cb.dataset.status.toLowerCase());

  const searchValue = searchInput1?.value.toLowerCase().trim() || "";

  // --- TABLE FILTER ---
  tableRows1.forEach((row) => {
    const status =
      row.querySelector(".order-status")?.innerText.toLowerCase() || "";
    const productName =
      row
        .querySelector(".product-col-rows span:first-child")
        ?.innerText.toLowerCase() || "";
    const category = row.children[3]?.innerText.toLowerCase() || "";

    const matchesSearch =
      productName.includes(searchValue) || category.includes(searchValue);
    const matchesStatus =
      selectedStatuses.length === 0 || selectedStatuses.includes(status);

    row.style.display = matchesSearch && matchesStatus ? "" : "none";
  });

  // --- FAQ FILTER ---
  faqItems2.forEach((item) => {
    const statusSpan = item.querySelector(
      ".all-answers span.received-orders, .all-answers span.packed-order, .all-answers span.delivered-order",
    );
    const status = statusSpan?.innerText.toLowerCase() || "";

    const questionText =
      item.querySelector(".main-faq-question span")?.innerText.toLowerCase() ||
      "";
    const matchesSearch = questionText.includes(searchValue);
    const matchesStatus =
      selectedStatuses.length === 0 || selectedStatuses.includes(status);

    item.style.display = matchesSearch && matchesStatus ? "" : "none";
  });
}

// ----------------------------
// EVENT LISTENERS
// ----------------------------
statusCheckboxes.forEach((cb) => cb.addEventListener("change", filterContent));
if (searchInput1) searchInput1.addEventListener("input", filterContent);

// ----------------------------
// OPTIONAL: close filter on click outside
// ----------------------------
document.addEventListener("click", function (e) {
  if (!filterMain.contains(e.target) && !filterBar.contains(e.target)) {
    filterMain.classList.remove("active-main-content-flows");
    statusBox.classList.remove("active-main-content-flows");
  }
});

// Sort By
// ----------------------------
// TOGGLE SORT BOX
// ----------------------------
const sortByBox = document.getElementById("sort-by-main-box");
const sortBox = document.getElementById("sort-box");

sortByBox.addEventListener("click", () => {
  sortBox.classList.toggle("active-main-content-flows");
  // Close filter boxes if open
  filterMain.classList.remove("active-main-content-flows");
  statusBox.classList.remove("active-main-content-flows");
});

// ----------------------------
// SORT FUNCTION (PRICE BASED)
// ----------------------------

const sortRadios = document.querySelectorAll("#sort-box input[type='radio']");
sortRadios.forEach((radio) => radio.addEventListener("change", sortContent));

function sortContent() {
  const lowToHigh = document.getElementById("price-lowtohigh").checked;
  const highToLow = document.getElementById("price-hightolow").checked;

  if (!lowToHigh && !highToLow) return;

  const direction = lowToHigh ? 1 : -1;

  // ----------------------------
  // TABLE SORT
  // ----------------------------
  const tableBody = document.querySelector(".table-products tbody");
  if (tableBody) {
    const rows = Array.from(tableBody.querySelectorAll("tr"));

    rows.sort((a, b) => {
      const priceA = parseInt(a.children[3].innerText.replace(/[₹,]/g, ""));
      const priceB = parseInt(b.children[3].innerText.replace(/[₹,]/g, ""));
      return (priceA - priceB) * direction;
    });

    rows.forEach((row) => tableBody.appendChild(row));
  }

  // ----------------------------
  // FAQ SORT
  // ----------------------------
  const faqContainer = document.querySelector(".faq");
  if (faqContainer) {
    const faqItems = Array.from(faqContainer.querySelectorAll(".faq-item"));

    faqItems.sort((a, b) => {
      const priceA = parseInt(
        a
          .querySelector(".all-answers div:nth-child(3) span:last-child")
          .innerText.replace(/[₹,]/g, ""),
      );
      const priceB = parseInt(
        b
          .querySelector(".all-answers div:nth-child(3) span:last-child")
          .innerText.replace(/[₹,]/g, ""),
      );
      return (priceA - priceB) * direction;
    });

    faqItems.forEach((item) => faqContainer.appendChild(item));
  }
}

// ----------------------------
// EVENT LISTENERS
// ----------------------------
sortRadios.forEach((radio) => radio.addEventListener("change", sortContent));

// Optional: close sort box when clicking outside
document.addEventListener("click", function (e) {
  if (!sortBox.contains(e.target) && !sortByBox.contains(e.target)) {
    sortBox.classList.remove("active-main-content-flows");
  }
});

const faqItems1 = document.querySelectorAll(".faq-item");

faqItems1.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    // Close all other items
    faqItems1.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
      }
    });

    // Toggle current item
    item.classList.toggle("active");
  });
});

// Select all three-dots buttons
const threeDotsButtons = document.querySelectorAll(".mobile-three-dots");

threeDotsButtons.forEach((threeDotbutton) => {
  threeDotbutton.addEventListener("click", () => {
    // Correctly get the sibling div
    const showBox = threeDotbutton.nextElementSibling;
    if (!showBox) return; // safety check

    // Find the parent .faq-item
    const faqItem = threeDotbutton.closest(".faq-item");

    // Get status element safely
    const statusElement = faqItem.querySelector(
      ".faq-answer .all-answers .payment-credited, " +
        ".faq-answer .all-answers .payment-pending, " +
        ".faq-answer .all-answers .payment-rejected",
    );
    const statusText = statusElement ? statusElement.textContent.trim() : "";

    // Toggle the show-threedots-box
    showBox.classList.toggle("active-threedots");

    // Find the "Request to Remove" div safely
    const requestToRemoveDiv = Array.from(showBox.children).find((div) =>
      div.textContent.includes("Request to Remove"),
    );
    if (requestToRemoveDiv) {
      requestToRemoveDiv.style.display =
        statusText === "Approved" ? "flex" : "none";
    }
  });
});

document
  .querySelector("#sidebar-main-vendor ul>li:nth-child(4)")
  .classList.add("sidebar-active");

document
  .querySelector("#account-menu li:nth-child(4) .dropdown-header")
  .classList.add("dropdown-header-active");

/* =============================================
   RETURN TRANSPORT TRACKING POPUP (RTT)
   Opens when "Track Here" link is clicked
   inside the accepted-popup transit section
============================================= */

const rttOverlay = document.getElementById("returnTrackingPopup");
const rttCloseBtn = document.getElementById("rttClose");

// Open RTT popup on "Track Here" click

document.addEventListener("click", function (e) {
  const trackLink = e.target.closest(".rp-track-link");
  if (!trackLink) return;

  e.preventDefault();
  // Close accepted popup first
  const acceptedPopup = document.getElementById("accepted-popup");
  if (acceptedPopup) acceptedPopup.classList.remove("active");

  if (rttOverlay) rttOverlay.classList.add("active");
});

// Close on × button
if (rttCloseBtn) {
  rttCloseBtn.addEventListener("click", () => {
    rttOverlay.classList.remove("active");
  });
}

// Close on overlay background click
if (rttOverlay) {
  rttOverlay.addEventListener("click", (e) => {
    if (e.target === rttOverlay) {
      rttOverlay.classList.remove("active");
    }
  });
}
