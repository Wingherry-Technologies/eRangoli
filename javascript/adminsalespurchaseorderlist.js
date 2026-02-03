document.addEventListener("DOMContentLoaded", function () {

  /*
   ELEMENTS
 */
  const searchInput = document.querySelector(".APMSearchInput");
  const tableBody = document.querySelector(".APMTableBody");
  const tableRows = [...document.querySelectorAll(".APMTableRow")];
  const mobileItems = [...document.querySelectorAll(".APMMobileList .faq-item")];

  /*
   SEARCH (BUYER)
 */
searchInput.addEventListener("input", function () {
  const val = searchInput.value.toLowerCase().trim();

  // TABLE SEARCH (SAFE)
  tableRows.forEach(row => {
    const rowText = row.innerText.toLowerCase();
    row.style.display = rowText.includes(val) ? "" : "none";
  });

  // MOBILE SEARCH
  mobileItems.forEach(item => {
    item.style.display =
      item.innerText.toLowerCase().includes(val) ? "" : "none";
  });
});


  /*
   FILTER / SORT TOGGLE
 */
  const filterBtn = document.getElementById("apm-filter-btn");
  const sortBtn = document.getElementById("apm-sort-btn");

  const filterMain = document.getElementById("apm-filter-main");
  const sortBox = document.getElementById("apm-sort-box");

  const ActionOpen = document.getElementById("aspo-action-open");


  const ActionBox = document.getElementById("aspo-action-box");

  filterBtn.onclick = () => {
    filterMain.classList.toggle("active-main-content-flows");
    sortBox.classList.remove("active-main-content-flows");
  };

  sortBtn.onclick = () => {
    sortBox.classList.toggle("active-main-content-flows");
    filterMain.classList.remove("active-main-content-flows");
  };

  ActionOpen.onclick = () => {
    ActionBox.classList.toggle("active-main-content-flows");
  };


  function closeAllFilters() {
  filterMain.classList.remove("active-main-content-flows");
  sortBox.classList.remove("active-main-content-flows");
  ActionBox.classList.remove("active-main-content-flows");
}

document.addEventListener("click", e => {
  if (!e.target.closest(".filter-bar-wrapper")) {
    closeAllFilters();
  }
});

  /*
   FILTER (STATE + CITY)
 */

function applyActionFilter() {
  const selectedActions = [
    ...document.querySelectorAll("#aspo-action-box input:checked")
  ].map(cb => cb.dataset.state);

  tableRows.forEach(row => {
    const actionCell = row.querySelector(
      ".refunded, .rejected, .approved-refund, .Initiate-refund"
    );

    if (!actionCell) {
      row.style.display = "none";
      return;
    }

    const match = [...actionCell.classList]
      .some(cls => selectedActions.includes(cls));

    row.style.display =
      selectedActions.length === 0 || match ? "" : "none";
  });
}

document
  .querySelectorAll("#aspo-action-box input")
  .forEach(cb =>
    cb.addEventListener("change", () => {
      applyActionFilter();
      applyMobileActionFilter();
      closeAllFilters();   
    })
  );

  /*
   SORT (BUYER)
 */
  const sortRadios = document.querySelectorAll("#apm-sort-box input");

  sortRadios.forEach(radio => {
    radio.addEventListener("change", () => {

      const type = radio.dataset.sort;

      // TABLE SORT
      const sortedRows = [...tableRows].sort((a, b) => {

        // Name sort
        if (type === "nameAZ" || type === "nameZA") {
          const A = a.children[0].innerText;
          const B = b.children[0].innerText;
          return type === "nameAZ"
            ? A.localeCompare(B)
            : B.localeCompare(A);
        }

        // UID sort
        if (type === "uidASC" || type === "uidDESC") {
          const A = parseInt(a.children[1].innerText.replace("#", ""));
          const B = parseInt(b.children[1].innerText.replace("#", ""));
          return type === "uidASC" ? A - B : B - A;
        }
      });

      tableBody.innerHTML = "";
      sortedRows.forEach(r => tableBody.appendChild(r));

      // MOBILE SORT (by name)
      const mobileContainer = document.querySelector(".APMMobileList");
      const sortedMobile = [...mobileItems].sort((a, b) => {
        const A = a.querySelector(".mobiletitle span").innerText;
        const B = b.querySelector(".mobiletitle span").innerText;
        return type === "nameAZ"
          ? A.localeCompare(B)
          : B.localeCompare(A);
      });

      mobileContainer.innerHTML = "";
      sortedMobile.forEach(i => mobileContainer.appendChild(i));
    });
  });

  /*
   MOBILE FAQ TOGGLE
 */function applyMobileActionFilter() {
  const selectedActions = [
    ...document.querySelectorAll("#aspo-action-box input:checked")
  ].map(cb => cb.dataset.state);

  mobileItems.forEach(item => {
    const statusEl = item.querySelector(
      ".refunded, .rejected, .approved-refund, .Initiate-refund"
    );

    if (!statusEl) {
      item.style.display = "none";
      return;
    }

    const match = [...statusEl.classList]
      .some(cls => selectedActions.includes(cls));

    item.style.display =
      selectedActions.length === 0 || match ? "" : "none";
  });
}


  document.addEventListener("click", function (e) {
    const question = e.target.closest(".main-faq-question");
    if (question) {
      question.closest(".faq-item").classList.toggle("active");
    }
  });


  /*
   TOTAL COUNT
 */
  document.querySelector(".APMViewAllLink").innerText = tableRows.length;

/*
   ===========================
   ASPO MODAL - Product Return Details
   ===========================
 */
  const aspoModal = document.getElementById("ASPOReturnModal");
  const aspoCloseBtn = document.getElementById("ASPOCloseBtn");
  const aspoStatusBadge = document.getElementById("ASPOStatusBadge");
  const aspoDeliverySection = document.getElementById("ASPODeliverySection");
  const aspoActions = document.getElementById("ASPOActions");
  const aspoAcceptBtn = document.getElementById("ASPOAcceptBtn");
  const aspoRejectBtn = document.getElementById("ASPORejectBtn");
  const arModal = document.getElementById("ASPOApprovedRejectedModal");
const arCloseBtn = document.getElementById("ASPOARCloseBtn");
const arStatusBadge = document.getElementById("ASPOARStatusBadge");
const arBankSection = document.getElementById("ASPOARBankSection");


  function openASPORefundModal() {
  aspoModal.classList.add("active");

  aspoStatusBadge.textContent = "Status";
  aspoStatusBadge.classList.remove("accepted");
  aspoDeliverySection.style.display = "none";
  aspoActions.style.display = "flex";
}
// MOBILE – Initiate Refund button
document.addEventListener("click", function (e) {
  const mobileBtn = e.target.closest(".mobile-view-btn.Initiate-refund");
  if (!mobileBtn) return;

  e.preventDefault();
  openASPORefundModal();
});
// DESKTOP – Action icon click (only Initiate Refund rows)
document.addEventListener("click", function (e) {
  const actionBtn = e.target.closest(".APMActionButton");
  if (!actionBtn) return;

  const row = actionBtn.closest(".APMTableRow");
  if (!row) return;
  
  const hasInitiateRefund = row.querySelector(".Initiate-refund");
  if (!hasInitiateRefund) return;

  e.preventDefault();
  openASPORefundModal();
});




  // Close modal
  aspoCloseBtn.addEventListener("click", () => {
    aspoModal.classList.remove("active");
  });

  // Close modal when clicking outside
  aspoModal.addEventListener("click", (e) => {
    if (e.target.id === "ASPOReturnModal") {
      aspoModal.classList.remove("active");
    }
  });

  // Accept button functionality
  aspoAcceptBtn.addEventListener("click", () => {
    // Update status badge
    aspoStatusBadge.textContent = "Accepted";
    aspoStatusBadge.classList.add("accepted");
    
    // Hide action buttons
    aspoActions.style.display = "none";
    
    // Show delivery section
    aspoDeliverySection.style.display = "block";
  });

  // Reject button functionality
  aspoRejectBtn.addEventListener("click", () => {
    // Just close the modal for now
    aspoModal.classList.remove("active");
  });

  /*
   ===========================
   ASPO TRACKING MODAL
   ===========================
 */
  const aspoTrackingModal = document.getElementById("ASPOTrackingModal");
  const aspoTrackingClose = document.getElementById("ASPOTrackingClose");
  const aspoTrackLink = document.getElementById("ASPOTrackLink");

  // Open tracking modal when "Track Here" is clicked
  aspoTrackLink.addEventListener("click", () => {
    aspoTrackingModal.classList.add("active");
    aspoModal.classList.remove("active");
  });

  // Close tracking modal
  aspoTrackingClose.addEventListener("click", () => {
    aspoTrackingModal.classList.remove("active");
  });

  // Close tracking modal when clicking outside
  aspoTrackingModal.addEventListener("click", (e) => {
    if (e.target.id === "ASPOTrackingModal") {
      aspoTrackingModal.classList.remove("active");
    }
  });
  /* ===============================
   APPROVED / REJECTED POPUP JS
================================ */

const statusModal = document.getElementById("ASPOStatusModal");
const statusClose = document.getElementById("ASPOStatusClose");
const refundStatus = document.getElementById("ASPORefundStatus");
const payBtn = document.getElementById("ASPOPayBtn");
const bankDetails = document.getElementById("ASPOBankDetails");
const statusPaySection = document.getElementById("ASPOStatusPaySection");
const vendorApprovalSection = document.getElementById("ASPOVendorApprovalSection");


const refundDetails = document.getElementById("ASPORefundDetails");
const finalPayBtn = document.getElementById("ASPOFinalPayBtn");


// OPEN ON ICON CLICK
document.addEventListener("click", function (e) {
  const actionBtn = e.target.closest(".APMActionButton");
  if (!actionBtn) return;

  const row = actionBtn.closest(".APMTableRow");
  if (!row) return;

  resetStatusModal();

  // RESET STATE
  refundStatus.classList.remove("refund-rejected");
  bankDetails.style.display = "none";
  refundDetails.style.display = "none";
statusPaySection.style.display = "block";
  payBtn.disabled = false;
  payBtn.classList.remove("disabled");

  // APPROVED
  if (row.querySelector(".approved-refund")) {
    refundStatus.textContent = "Approved";
    statusModal.classList.add("active");
  }

  // REJECTED
  if (row.querySelector(".rejected")) {
    refundStatus.textContent = "Rejected";
    refundStatus.classList.add("refund-rejected");
    payBtn.disabled = true;
    payBtn.classList.add("disabled");
    statusModal.classList.add("active");
  }

  // REFUNDED
  // REFUNDED → DIRECT FINAL POPUP
if (row.querySelector(".refunded")) {

  // hide other sections
  statusPaySection.style.display = "none";
  bankDetails.style.display = "none";

  // show refund payment details
  refundDetails.style.display = "block";

  // change top badge to Refunded
  const badge = statusModal.querySelector(".ASPOAcceptBtn");
  if (badge) {
    badge.textContent = "Refunded";

  }

  statusModal.classList.add("active");
  return; // 
}

});

// PAY CLICK → SHOW BANK DETAILS
// PAY CLICK → SWITCH UI (SCREENSHOT LIKE)
payBtn.addEventListener("click", () => {
  // hide status + pay section
  vendorApprovalSection.style.display = "none";

  // show bank details section
  bankDetails.style.display = "block";
});


// CLOSE POPUP
statusClose.addEventListener("click", () => {
  statusModal.classList.remove("active");
});


// FINAL PAY CLICK → SHOW REFUNDED STATE
finalPayBtn.addEventListener("click", () => {
  // hide bank details
  bankDetails.style.display = "none";

  // hide status + pay (safety)
  statusPaySection.style.display = "none";

  // show refund payment details
  refundDetails.style.display = "block";

  // change top badge to Refunded
  const badge = statusModal.querySelector(".ASPOAcceptBtn");
  if (badge) {
    badge.textContent = "Refunded";

  }
});



  //  MOBILE – STATUS POPUP HANDLER


document.addEventListener("click", function (e) {
  const mobileBtn = e.target.closest(".mobile-view-btn");
  if (!mobileBtn) return;
  resetStatusModal();

  // RESET (same as desktop)
  refundStatus.classList.remove("refund-rejected");
  bankDetails.style.display = "none";
  refundDetails.style.display = "none";
  statusPaySection.style.display = "block";
  payBtn.disabled = false;
  payBtn.classList.remove("disabled");

  // APPROVED
  if (mobileBtn.classList.contains("approved-refund")) {
    refundStatus.textContent = "Approved";
    statusModal.classList.add("active");
    return;
  }

  // REJECTED
  if (mobileBtn.classList.contains("rejected")) {
    refundStatus.textContent = "Rejected";
    refundStatus.classList.add("refund-rejected");
    payBtn.disabled = true;
    payBtn.classList.add("disabled");
    statusModal.classList.add("active");
    return;
  }

  // REFUNDED (DIRECT FINAL STATE)
  if (mobileBtn.classList.contains("refunded")) {
    statusPaySection.style.display = "none";
    bankDetails.style.display = "none";
    refundDetails.style.display = "block";

    const badge = statusModal.querySelector(".ASPOAcceptBtn");
    if (badge) {
      badge.textContent = "Refunded";
      // badge.style.background = "#0abf53";
    }

    statusModal.classList.add("active");
    return;
  }

  // INITIATE REFUND (OLD FLOW)
  if (mobileBtn.classList.contains("Initiate-refund")) {
    openASPORefundModal();
  }
});


function resetStatusModal() {
  // hide all dynamic sections
  vendorApprovalSection.style.display = "block";
  statusPaySection.style.display = "block";
  bankDetails.style.display = "none";
  refundDetails.style.display = "none";

  // reset status text & color
  refundStatus.textContent = "";
  refundStatus.classList.remove("refund-rejected");

  // reset pay button
  payBtn.disabled = false;
  payBtn.classList.remove("disabled");

  // reset top badge
  const badge = statusModal.querySelector(".ASPOAcceptBtn");
  if (badge) {
    badge.textContent = "Received";
    badge.style.background = "#0ea5e9";
  }
}

});





