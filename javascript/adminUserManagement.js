document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("AUMSearchInput");
  const tableBody = document.querySelector(".AUMTable tbody");
  const rows = tableBody.querySelectorAll("tr:not(.AUMNoDataRow)");
  const noDataRow = document.querySelector(".AUMNoDataRow");

  searchInput.addEventListener("input", function () {
    const value = this.value.toLowerCase().trim();
    let visibleCount = 0;

    rows.forEach((row) => {
      const userName = row.children[0].innerText.toLowerCase();
      const type = row.children[1].innerText.toLowerCase();
      const email = row.children[5].innerText.toLowerCase();

      if (
        userName.includes(value) ||
        type.includes(value) ||
        email.includes(value)
      ) {
        row.style.display = "";
        visibleCount++;
      } else {
        row.style.display = "none";
      }
    });

    noDataRow.style.display = visibleCount === 0 ? "" : "none";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  /* =========================
     FILTER POPUP TOGGLE
  ========================== */

  const filterBtn = document.getElementById("filter-bar-main-box");
  const filterMain = document.getElementById("filter-main");
  const statusBox = document.getElementById("status-box");

  // Filter icon click
  filterBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    filterMain.classList.toggle("active-main-content-flows");
    statusBox.classList.remove("active-main-content-flows");
  });

  // Filter > Status click
  filterMain.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
      filterMain.classList.remove("active-main-content-flows");
      statusBox.classList.add("active-main-content-flows");
    }
  });

  // Outside click → close all
  document.addEventListener("click", function () {
    filterMain.classList.remove("active-main-content-flows");
    statusBox.classList.remove("active-main-content-flows");
  });

  filterMain.addEventListener("click", (e) => e.stopPropagation());
  statusBox.addEventListener("click", (e) => e.stopPropagation());

  /* =========================
     STATUS FILTER LOGIC
  ========================== */

  const checkboxes = document.querySelectorAll(
    '#status-box input[type="checkbox"]',
  );
  const rows = document.querySelectorAll(
    ".AUMTable tbody tr:not(.AUMNoDataRow)",
  );
  const noDataRow = document.querySelector(".AUMNoDataRow");

  function applyStatusFilter() {
    const selectedStatuses = Array.from(checkboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.dataset.status);

    let visibleCount = 0;

    rows.forEach((row) => {
      const statusSpan = row.querySelector(".AUMStatus");
      const rowStatus = statusSpan ? statusSpan.classList[1] : "";

      if (
        selectedStatuses.length === 0 ||
        selectedStatuses.includes(rowStatus)
      ) {
        row.style.display = "";
        visibleCount++;
      } else {
        row.style.display = "none";
      }
    });

    if (noDataRow) {
      noDataRow.style.display = visibleCount === 0 ? "" : "none";
    }
  }

  // Checkbox change → filter apply
  checkboxes.forEach((cb) => {
    cb.addEventListener("change", applyStatusFilter);
  });
});

function parseDDMMYY(dateStr) {
  const [dd, mm, yy] = dateStr.split("/");
  const fullYear = yy.length === 2 ? "20" + yy : yy;
  return new Date(`${fullYear}-${mm}-${dd}`);
}

document.addEventListener("DOMContentLoaded", function () {
  const sortBtn = document.querySelector('.AUMActionIcon img[src*="sort"]');
  const sortBox = document.getElementById("sort-box");
  const tableBody = document.querySelector(".AUMTable tbody");

  /* =====================
     SORT POPUP TOGGLE
  ====================== */
  sortBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    sortBox.classList.toggle("active-main-content-flows");
  });

  document.addEventListener("click", function () {
    sortBox.classList.remove("active-main-content-flows");
  });

  sortBox.addEventListener("click", (e) => e.stopPropagation());

  /* =====================
     SORT LOGIC
  ====================== */
  sortBox.querySelectorAll("li").forEach((item) => {
    item.addEventListener("click", function () {
      const type = this.dataset.sort;
      const rows = Array.from(
        tableBody.querySelectorAll("tr:not(.AUMNoDataRow)"),
      );

      let sortedRows;

      switch (type) {
        case "name-asc":
          sortedRows = rows.sort((a, b) =>
            a.children[0].innerText
              .trim()
              .localeCompare(b.children[0].innerText.trim()),
          );
          break;

        case "name-desc":
          sortedRows = rows.sort((a, b) =>
            b.children[0].innerText
              .trim()
              .localeCompare(a.children[0].innerText.trim()),
          );
          break;

        case "date-new":
          sortedRows = rows.sort(
            (a, b) =>
              parseDDMMYY(b.children[2].innerText.trim()) -
              parseDDMMYY(a.children[2].innerText.trim()),
          );
          break;

        case "date-old":
          sortedRows = rows.sort(
            (a, b) =>
              parseDDMMYY(a.children[2].innerText.trim()) -
              parseDDMMYY(b.children[2].innerText.trim()),
          );
          break;
      }

      // Re-append sorted rows
      sortedRows.forEach((row) => tableBody.appendChild(row));

      sortBox.classList.remove("active-main-content-flows");
    });
  });
});

document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".faq-item").classList.toggle("active");
  });
});
