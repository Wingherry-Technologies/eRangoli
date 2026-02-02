document.addEventListener("DOMContentLoaded", function () {
  /* ================= FILTER DROPDOWN ================= */
  const filterBtn = document.querySelector(".APRAFilterDummy");
  const filterMain = document.getElementById("filter-main");
  const statusBox = document.getElementById("status-box");

  const searchInput = document.querySelector(".APRASearchInput");
  const statusCheckboxes = document.querySelectorAll(
    '#status-box input[type="checkbox"]',
  );
  const tableRows = document.querySelectorAll(".APRATableRow");

  function applyFilters() {
    const searchValue = searchInput.value.toLowerCase().trim();

    const selectedStatuses = Array.from(statusCheckboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.dataset.status);

    tableRows.forEach((row) => {
      const companyName = row.children[0].innerText.toLowerCase();
      const emailId = row.children[1].innerText.toLowerCase();
      const IdProof = row.children[4].innerText.toLowerCase();
      const vendorIDNumber = row.children[5].innerText.toLowerCase();

      const matchesSearch =
        companyName.includes(searchValue) ||
        emailId.includes(searchValue) ||
        IdProof.includes(searchValue) ||
        vendorIDNumber.includes(searchValue);

      const statusSpan = row.querySelector(
        ".APRATableCell.pending, .APRATableCell.sendToVerify",
      );

      const rowStatus = statusSpan?.classList.contains("pending")
        ? "pending"
        : statusSpan?.classList.contains("sendToVerify")
          ? "sendToVerify"
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

    //  RESET ONLY WHEN DROPDOWN CLOSES
    statusCheckboxes.forEach((cb) => (cb.checked = false));
    applyFilters();
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
    const btn = e.target.closest(".APRAActionButton");
    if (!btn) return;

    const row = btn.closest(".APRATableRow");
    const statusCell = row.querySelector(
      ".APRATableCell.pending, .APRATableCell.sendToVerify",
    );

    if (!statusCell) return;

    //  If status is "Send To Verify"
    if (statusCell.classList.contains("sendToVerify")) {
      window.location.href = "../html/adminDeveloperVerification.html";
    }
    // For Pending (or others)
    else {
      window.location.href = "../html/adminRecentVendorListOverview.html";
    }
  });

  /* ================= SORT ================= */
  const settingsBtn = document.querySelector(".APRASettingsDummy");
  const sortBox = document.getElementById("sort-box");
  const tableBody = document.querySelector(".APRATableBody");

  settingsBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    sortBox.classList.toggle("active-main-content-flows");
    filterMain.classList.remove("active-main-content-flows");
    statusBox.classList.remove("active-main-content-flows");
  });

  sortBox.addEventListener("click", function (e) {
    const sortType = e.target.dataset.sort;
    if (!sortType) return;

    const rows = Array.from(tableBody.querySelectorAll(".APRATableRow"));

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

document.querySelectorAll(".faq-caret").forEach((caret) => {
  caret.addEventListener("click", (e) => {
    e.stopPropagation();

    const faqItem = caret.closest(".faq-item");

    document.querySelectorAll(".faq-item").forEach((item) => {
      if (item !== faqItem) item.classList.remove("active");
    });

    faqItem.classList.toggle("active");
  });
});

document.addEventListener("click", function (e) {
  const btn = e.target.closest(".view");
  if (!btn) return;

  const faqItem = btn.closest(".faq-item");
  if (!faqItem) return;

  const status = faqItem.querySelector(".pending, .sendToVerify");
  if (!status) return;

  if (status.classList.contains("sendToVerify")) {
    window.location.href = "../html/adminDeveloperVerification.html";
  } else if (status.classList.contains("pending")) {
    window.location.href = "../html/adminRecentVendorListOverview.html";
  }
});
