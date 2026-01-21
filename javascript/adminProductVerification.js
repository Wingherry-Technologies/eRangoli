document.addEventListener("DOMContentLoaded", function () {
  /* ================= FILTER DROPDOWN ================= */
  const filterBtn = document.querySelector(".APVFilterDummy");
  const filterMain = document.getElementById("filter-main");
  const statusBox = document.getElementById("status-box");

  const searchInput = document.querySelector(".APVSearchInput");
  const statusCheckboxes = document.querySelectorAll(
    '#status-box input[type="checkbox"]',
  );
  const tableRows = document.querySelectorAll(".APVTableRow");

  function applyFilters() {
    const searchValue = searchInput.value.toLowerCase().trim();

    const selectedStatuses = Array.from(statusCheckboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.dataset.status);

    tableRows.forEach((row) => {
      const productName = row.children[0].innerText.toLowerCase();
      const requestId = row.children[1].innerText.toLowerCase();
      const category = row.children[2].innerText.toLowerCase();

      const matchesSearch =
        productName.includes(searchValue) ||
        requestId.includes(searchValue) ||
        category.includes(searchValue);

      const statusSpan = row.querySelector(
        ".APVTableCell.pending, .APVTableCell.verified",
      );

      const rowStatus = statusSpan?.classList.contains("pending")
        ? "pending"
        : statusSpan?.classList.contains("verified")
          ? "verified"
          : "";

      const matchesStatus =
        selectedStatuses.length === 0 || selectedStatuses.includes(rowStatus);

      row.style.display = matchesSearch && matchesStatus ? "" : "none";
    });
  }

  /* ================= OPEN / CLOSE FILTER ================= */
  filterBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    filterMain.classList.toggle("active-main-content-flows");
    statusBox.classList.remove("active-main-content-flows");
  });

  const statusItem = filterMain.querySelector("li");
  statusItem.addEventListener("click", function (e) {
    e.stopPropagation();
    filterMain.classList.remove("active-main-content-flows");
    statusBox.classList.add("active-main-content-flows");
  });

  /* ================= CLOSE & RESET ================= */
  document.addEventListener("click", function () {
    filterMain.classList.remove("active-main-content-flows");
    statusBox.classList.remove("active-main-content-flows");
  });

  filterMain.addEventListener("click", (e) => e.stopPropagation());
  statusBox.addEventListener("click", (e) => e.stopPropagation());

  /* ================= EVENTS ================= */
  searchInput.addEventListener("input", applyFilters);

  statusCheckboxes.forEach((cb) => {
    cb.addEventListener("change", applyFilters);
  });

  /* ================= ACTION BUTTON ================= */
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".APVActionButton");
    if (!btn) return;

    const row = btn.closest(".APVTableRow");
    if (!row) return;

    const statusSpan = row.querySelector(
      ".APVTableCell.pending, .APVTableCell.verified",
    );

    if (!statusSpan) return;

    if (statusSpan.classList.contains("pending")) {
      window.location.href =
        "../html/adminPendingProductVerificationOverview.html";
    } else if (statusSpan.classList.contains("verified")) {
      window.location.href = "../html/adminProductVerificationOverview.html";
    }
  });

  /* ================= SORT ================= */
  const settingsBtn = document.querySelector(".APVSettingsDummy");
  const sortBox = document.getElementById("sort-box");
  const tableBody = document.querySelector(".APVTableBody");

  settingsBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    sortBox.classList.toggle("active-main-content-flows");
    filterMain.classList.remove("active-main-content-flows");
    statusBox.classList.remove("active-main-content-flows");
  });

  sortBox.addEventListener("click", function (e) {
    const sortType = e.target.dataset.sort;
    if (!sortType) return;

    const rows = Array.from(tableBody.querySelectorAll(".APVTableRow"));

    rows.sort((a, b) => {
      if (sortType.includes("qty")) {
        const qtyA = parseInt(a.children[3].innerText.trim());
        const qtyB = parseInt(b.children[3].innerText.trim());
        return sortType === "qty-asc" ? qtyA - qtyB : qtyB - qtyA;
      }

      if (sortType.includes("price")) {
        const priceA = parseInt(a.children[4].innerText.replace(/[₹, ]/g, ""));
        const priceB = parseInt(b.children[4].innerText.replace(/[₹, ]/g, ""));
        return sortType === "price-asc" ? priceA - priceB : priceB - priceA;
      }
    });

    rows.forEach((row) => tableBody.appendChild(row));
    sortBox.classList.remove("active-main-content-flows");
  });

  /* close on outside click */
  document.addEventListener("click", function () {
    sortBox.classList.remove("active-main-content-flows");
  });
});
