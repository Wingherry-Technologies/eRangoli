


/* ===============================
   GLOBAL STATE
================================ */
let activeRow = null;

/* ===============================
   HELPERS
================================ */
function closeAllModals() {
  document.querySelectorAll(".order-modal").forEach(modal => {
    modal.style.display = "none";
  });
}

function showModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = "flex";
}

function normalizeStatus(text) {
  return text.trim().toLowerCase();
}

/* ===============================
   OPEN POPUP BASED ON STATUS
================================ */
function openModalByStatus(status) {
  closeAllModals();

  switch (status) {
    case "received":
      showModal("modal-received");
      updateProgress("received");
      break;

    case "packed":
      showModal("modal-packed");
      updateProgress("packed");
      break;

    case "in transit":
      showModal("modal-transit");
      updateProgress("in transit");
      break;

    case "delivered":
      showModal("modal-delivered");
      updateProgress("delivered");
      break;

    case "return":
      showModal("modal-return");
      break;
  }
}

/* ===============================
   PROGRESS BAR ANIMATION
================================ */
function updateProgress(status) {
  document.querySelectorAll(".order-progress").forEach(progress => {
    const dots = progress.querySelectorAll(".dot");
    dots.forEach(d => d.classList.remove("active"));

    if (status === "received") {
      dots[0]?.classList.add("active");
    }

    if (status === "packed") {
      dots[0]?.classList.add("active");
      dots[1]?.classList.add("active");
    }

    if (status === "in transit") {
      dots[0]?.classList.add("active");
      dots[1]?.classList.add("active");
      dots[2]?.classList.add("active");
    }

    if (status === "delivered") {
      dots.forEach(d => d.classList.add("active"));
    }
  });
}

/* ===============================
   UPDATE TABLE STATUS BADGE
================================ */
function updateTableStatus(text, className) {
  if (!activeRow) return;

  const badge = activeRow.querySelector(".status-badge");
  badge.textContent = text;
  badge.className = `status-badge ${className}`;

  openModalByStatus(normalizeStatus(text));
}

/* ===============================
   GLOBAL CLICK HANDLER
================================ */
document.addEventListener("click", function (e) {

  /* ---- 3 DOT MENU ---- */
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

  /* ---- DELETE ---- */
  const removeItem = e.target.closest(".action-item");
  if (removeItem && removeItem.textContent.trim() === "Remove") {
    activeRow = removeItem.closest("tr");
    document.getElementById("confirmOverlay").style.display = "flex";
    return;
  }

  /* ---- ARROW CLICK ---- */
  const arrow = e.target.closest("img[alt='arrow']");
  if (arrow) {
    activeRow = arrow.closest("tr");

    const statusText = normalizeStatus(
      activeRow.querySelector(".status-badge").textContent
    );

    openModalByStatus(statusText);
    return;
  }

  /* ---- CLOSE MODAL ON BACKDROP ---- */
  if (e.target.classList.contains("order-modal")) {
    e.target.style.display = "none";
  }
});

/* ===============================
   DELETE CONFIRMATION
================================ */
document.getElementById("cancelDelete").onclick = () => {
  document.getElementById("confirmOverlay").style.display = "none";
  activeRow = null;
};

document.getElementById("confirmDelete").onclick = () => {
  if (activeRow) activeRow.remove();
  document.getElementById("confirmOverlay").style.display = "none";
  activeRow = null;
};

/* ===============================
   STATUS CHANGE BUTTONS
================================ */
document.addEventListener("click", function (e) {

  if (e.target.id === "markPacked") {
    updateTableStatus("Packed", "packed");
  }

  if (e.target.id === "markTransit") {
    updateTableStatus("In transit", "transit");
  }

  if (e.target.id === "markDelivered") {
    updateTableStatus("Delivered", "delivered");
  }
});

/* ===============================
   CLOSE BUTTON (ALL MODALS)
================================ */
document.querySelectorAll(".close-order").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".order-modal").style.display = "none";
  });
});
/* =====================================================
   PAGINATION LOGIC
===================================================== */
// const rowsPerPage = 8;
// let currentPage = 1;

// const tableBody = document.getElementById("productTableBody");
// const rows = Array.from(tableBody.querySelectorAll("tr"));

// const totalRows = rows.length;
// const totalPages = Math.ceil(totalRows / rowsPerPage);

// const paginationInfo = document.getElementById("paginationInfo");
// const prevBtn = document.getElementById("prevPage");
// const nextBtn = document.getElementById("nextPage");

// /* ---------- RENDER PAGE ---------- */
// function renderTable() {
//   rows.forEach((row, index) => {
//     row.style.display = "none";
//     const start = (currentPage - 1) * rowsPerPage;
//     const end = start + rowsPerPage;

//     if (index >= start && index < end) {
//       row.style.display = "";
//     }
//   });

//   paginationInfo.textContent = `${currentPage} / ${totalPages}`;

//   prevBtn.disabled = currentPage === 1;
//   nextBtn.disabled = currentPage === totalPages;
// }

// /* ---------- EVENTS ---------- */
// prevBtn.addEventListener("click", () => {
//   if (currentPage > 1) {
//     currentPage--;
//     renderTable();
//   }
// });

// nextBtn.addEventListener("click", () => {
//   if (currentPage < totalPages) {
//     currentPage++;
//     renderTable();
//   }
// });

// /* ---------- INIT ---------- */
// renderTable();


const searchInput = document.getElementById("orderSearchInput");
const rows = document.querySelectorAll("#productTableBody tr");

searchInput.addEventListener("keyup", () => {
  const value = searchInput.value.toLowerCase();
  let visible = 0;

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    const match = text.includes(value);
    row.style.display = match ? "" : "none";
    if (match) visible++;
  });
});