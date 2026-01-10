/* ===============================
   GLOBAL STATE
================================ */
let activeRow = null;

/* ===============================
   GLOBAL CLICK HANDLER
================================ */
document.addEventListener("click", function (e) {
  /* ---- 3 DOT MENU ---- */
  const dots = e.target.closest(".my-customer-three-dots");
  if (dots) {
    e.stopPropagation();
    document.querySelectorAll(".my-customer-action-menu").forEach(m => m.classList.remove("show"));
    dots.closest(".my-customer-action-wrapper")
        .querySelector(".my-customer-action-menu")
        .classList.toggle("show");
    return;
  }

  document.querySelectorAll(".my-customer-action-menu").forEach(m => m.classList.remove("show"));

  /* ---- DELETE ---- */
  const removeItem = e.target.closest(".my-customer-action-item");
  if (removeItem && removeItem.textContent.trim() === "Remove") {
    activeRow = removeItem.closest("tr");
    document.getElementById("my-customer-confirmOverlay").style.display = "flex";
    return;
  }
});

/* ===============================
   DELETE CONFIRMATION
================================ */
document.getElementById("my-customer-cancelDelete").onclick = () => {
  document.getElementById("my-customer-confirmOverlay").style.display = "none";
  activeRow = null;
};

document.getElementById("my-customer-confirmDelete").onclick = () => {
  if (activeRow) activeRow.remove();
  document.getElementById("my-customer-confirmOverlay").style.display = "none";
  activeRow = null;
};

/* =====================================================
   PAGINATION LOGIC
===================================================== */
const rowsPerPage = 8;
let currentPage = 1;

const tableBody = document.getElementById("my-customer-tableBody");
const rows = Array.from(tableBody.querySelectorAll("tr"));

const totalRows = rows.length;
const totalPages = Math.ceil(totalRows / rowsPerPage);

const paginationInfo = document.getElementById("my-customer-paginationInfo");
const prevBtn = document.getElementById("my-customer-prevPage");
const nextBtn = document.getElementById("my-customer-nextPage");

/* ---------- RENDER PAGE ---------- */
function renderTable() {
  rows.forEach((row, index) => {
    row.style.display = "none";
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    if (index >= start && index < end) {
      row.style.display = "";
    }
  });

  paginationInfo.textContent = `${currentPage} / ${totalPages}`;

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

/* ---------- EVENTS ---------- */
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderTable();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    renderTable();
  }
});

/* ---------- INIT ---------- */
renderTable();