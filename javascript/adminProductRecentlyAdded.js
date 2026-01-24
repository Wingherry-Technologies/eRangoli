document.addEventListener("DOMContentLoaded", function () {
  const filterBtn = document.querySelector(".APRAFilterDummy");
  const filterMain = document.getElementById("filter-main");
  const statusBox = document.getElementById("status-box");
  const settingsBtn = document.querySelector(".APRASettingsDummy");
  const sortBox = document.getElementById("sort-box");

  const searchInput = document.querySelector(".APRASearchInput");
  const statusCheckboxes = document.querySelectorAll(
    '#status-box input[type="checkbox"]',
  );

  const tableBody = document.querySelector(".APRATableBody");
  const tableRows = document.querySelectorAll(".APRATableRow");

  const faqContainer = document.querySelector(".APRAMobileFAQ");

  function applyTableFilters() {
    const searchValue = searchInput.value.toLowerCase().trim();

    const selectedStatuses = Array.from(statusCheckboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.dataset.status);

    tableRows.forEach((row) => {
      const productName = row.children[0].innerText.toLowerCase();
      const requestId = row.children[1].innerText.toLowerCase();
      const category = row.children[2].innerText.toLowerCase();
      const vendorName = row.children[7].innerText.toLowerCase();

      const matchesSearch =
        productName.includes(searchValue) ||
        requestId.includes(searchValue) ||
        category.includes(searchValue) ||
        vendorName.includes(searchValue);

      const statusSpan = row.querySelector(
        ".APRATableCell.pending, .APRATableCell.verified, .APRATableCell.rejected, .APRATableCell.sent",
      );

      const rowStatus = statusSpan
        ? statusSpan.classList.contains("pending")
          ? "pending"
          : statusSpan.classList.contains("verified")
            ? "verified"
            : statusSpan.classList.contains("rejected")
              ? "rejected"
              : statusSpan.classList.contains("sent")
                ? "sent"
                : ""
        : "";

      const matchesStatus =
        selectedStatuses.length === 0 || selectedStatuses.includes(rowStatus);

      row.style.display = matchesSearch && matchesStatus ? "" : "none";
    });
  }

  function applyMobileFilters() {
    const searchValue = searchInput.value.toLowerCase().trim();

    const selectedStatuses = Array.from(statusCheckboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.dataset.status);

    document.querySelectorAll(".APRAfaq-item").forEach((item) => {
      const name = item
        .querySelector(".APRAfaq-username")
        ?.innerText.toLowerCase();

      const category = item
        .querySelector(".APRAfaq-usertype")
        ?.innerText.toLowerCase();

      const vendor = item
        .querySelector(".APRAfaq-row:nth-child(7) span:last-child")
        ?.innerText.toLowerCase();

      const statusEl = item.querySelector(".APRAStatus");
      const status = statusEl
        ? statusEl.classList.contains("pending")
          ? "pending"
          : statusEl.classList.contains("verified")
            ? "verified"
            : statusEl.classList.contains("rejected")
              ? "rejected"
              : statusEl.classList.contains("sent")
                ? "sent"
                : ""
        : "";

      const matchesSearch =
        name?.includes(searchValue) ||
        category?.includes(searchValue) ||
        vendor?.includes(searchValue);

      const matchesStatus =
        selectedStatuses.length === 0 || selectedStatuses.includes(status);

      item.style.display = matchesSearch && matchesStatus ? "" : "none";
    });
  }

  function applyFilters() {
    if (window.innerWidth <= 595) {
      applyMobileFilters();
    } else {
      applyTableFilters();
    }
  }

  filterBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    filterMain.classList.toggle("active-main-content-flows");
    statusBox.classList.remove("active-main-content-flows");
    sortBox.classList.remove("active-main-content-flows");
  });

  filterMain.querySelector("li").addEventListener("click", function (e) {
    e.stopPropagation();
    filterMain.classList.remove("active-main-content-flows");
    statusBox.classList.add("active-main-content-flows");
  });

  settingsBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    sortBox.classList.toggle("active-main-content-flows");
    filterMain.classList.remove("active-main-content-flows");
    statusBox.classList.remove("active-main-content-flows");
  });

  document.addEventListener("click", function () {
    filterMain.classList.remove("active-main-content-flows");
    statusBox.classList.remove("active-main-content-flows");
    sortBox.classList.remove("active-main-content-flows");
  });

  filterMain.addEventListener("click", (e) => e.stopPropagation());
  statusBox.addEventListener("click", (e) => e.stopPropagation());
  sortBox.addEventListener("click", (e) => e.stopPropagation());

  searchInput.addEventListener("input", applyFilters);
  statusCheckboxes.forEach((cb) => cb.addEventListener("change", applyFilters));

  sortBox.addEventListener("click", function (e) {
    const sortType = e.target.dataset.sort;
    if (!sortType) return;

    if (window.innerWidth <= 595) {
      const items = Array.from(faqContainer.querySelectorAll(".APRAfaq-item"));

      items.sort((a, b) => {
        if (sortType.includes("qty")) {
          const qa = parseInt(
            a.querySelector(".APRAfaq-row:nth-child(3) span:last-child")
              .innerText,
          );
          const qb = parseInt(
            b.querySelector(".APRAfaq-row:nth-child(3) span:last-child")
              .innerText,
          );
          return sortType === "qty-asc" ? qa - qb : qb - qa;
        }

        if (sortType.includes("price")) {
          const pa = parseInt(
            a
              .querySelector(".APRAfaq-row:nth-child(4) span:last-child")
              .innerText.replace(/[₹, ]/g, ""),
          );
          const pb = parseInt(
            b
              .querySelector(".APRAfaq-row:nth-child(4) span:last-child")
              .innerText.replace(/[₹, ]/g, ""),
          );
          return sortType === "price-asc" ? pa - pb : pb - pa;
        }
      });

      items.forEach((i) => faqContainer.appendChild(i));
    } else {
      const rows = Array.from(tableBody.querySelectorAll(".APRATableRow"));

      rows.sort((a, b) => {
        if (sortType.includes("qty")) {
          const qa = parseInt(a.children[3].innerText.trim());
          const qb = parseInt(b.children[3].innerText.trim());
          return sortType === "qty-asc" ? qa - qb : qb - qa;
        }

        if (sortType.includes("price")) {
          const pa = parseInt(a.children[4].innerText.replace(/[₹, ]/g, ""));
          const pb = parseInt(b.children[4].innerText.replace(/[₹, ]/g, ""));
          return sortType === "price-asc" ? pa - pb : pb - pa;
        }
      });

      rows.forEach((row) => tableBody.appendChild(row));
    }

    sortBox.classList.remove("active-main-content-flows");
  });

  document.querySelectorAll(".APRAfaq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".APRAfaq-item").classList.toggle("active");
    });
  });

  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".APRAActionButton");
    if (!btn) return;
    window.location.href = "../html/adminProductVerificationOverview.html";
  });
});
