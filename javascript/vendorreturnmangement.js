/* =========================================================
   GLOBAL STATE
========================================================= */
let activeRow = null;

/* =========================================================
   MODAL HELPERS
========================================================= */
function closeAllModals() {
  document.querySelectorAll(".order-modal").forEach(modal => {
    modal.style.display = "none";
  });
}

function showModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = "flex";
}

/* =========================================================
   STATUS UPDATE
========================================================= */
function updateStatus(row, text, cls) {
  if (!row) return;

  const badge = row.querySelector(".status-badge");
  if (!badge) return;

  badge.textContent = text;
  badge.className = `status-badge ${cls}`;
}

/* =========================================================
   CLICK HANDLER
========================================================= */
document.addEventListener("click", function (e) {

  /* ---------- 3 DOT MENU ---------- */
  const dots = e.target.closest(".three-dots");
  if (dots) {
    e.stopPropagation();
    document.querySelectorAll(".action-menu").forEach(m => m.classList.remove("show"));
    dots.closest(".action-wrapper")
      .querySelector(".action-menu")
      .classList.toggle("show");
    return;
  }

  document.querySelectorAll(".action-menu").forEach(m => m.classList.remove("show"));

  /* ---------- REMOVE ORDER ---------- */
  const removeBtn = e.target.closest(".action-item");
  if (removeBtn && removeBtn.textContent.trim() === "Remove") {
    activeRow = removeBtn.closest("tr");
    document.getElementById("confirmOverlay").style.display = "flex";
    return;
  }

  /* ---------- OPEN RETURN DETAILS ---------- */
  const arrow = e.target.closest("img[alt='arrow']");
  if (arrow) {
    activeRow = arrow.closest("tr");
    showModal("modal-return");
    return;
  }

  /* ---------- CLOSE MODAL ON BACKDROP ---------- */
  if (e.target.classList.contains("order-modal")) {
    e.target.style.display = "none";
  }
});

/* =========================================================
   DELETE CONFIRMATION
========================================================= */
document.getElementById("cancelDelete")?.addEventListener("click", () => {
  document.getElementById("confirmOverlay").style.display = "none";
  activeRow = null;
});

document.getElementById("confirmDelete")?.addEventListener("click", () => {
  if (activeRow) activeRow.remove();
  document.getElementById("confirmOverlay").style.display = "none";
  activeRow = null;
});

/* =========================================================
   REFUND ACTIONS (MODAL BUTTONS)
========================================================= */
document.getElementById("approveRefund")?.addEventListener("click", () => {
  if (!activeRow) return;

  updateStatus(activeRow, "Refunded", "refunded");
  closeAllModals();
});

document.getElementById("rejectRefund")?.addEventListener("click", () => {
  if (!activeRow) return;

  updateStatus(activeRow, "Rejected", "rejected");
  closeAllModals();
});

/* =========================================================
   CLOSE BUTTON (X)
========================================================= */
document.querySelectorAll(".close-order").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".order-modal").style.display = "none";
  });
});

/* =========================================================
   ESC KEY CLOSE MODALS
========================================================= */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeAllModals();
});
