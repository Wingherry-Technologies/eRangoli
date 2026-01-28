document.addEventListener("DOMContentLoaded", function () {
  const filterBtn = document.querySelector(".ABPDFilterDummy");
  const filterMain = document.getElementById("abpd-filter-main");
  const statusBox = document.getElementById("abpd-status-box");
  const settingsBtn = document.querySelector(".ABPDSettingsDummy");
  const sortBox = document.getElementById("abpd-sort-box");

  const searchInput = document.querySelector(".ABPDSearchInput");
  const statusCheckboxes = document.querySelectorAll(
    '#abpd-status-box input[type="checkbox"]',
  );

  const tableBody = document.querySelector(".ABPDTableBody");
  const tableRows = document.querySelectorAll(".ABPDTableRow");

  const faqContainer = document.querySelector(".ABPDMobileFAQ");

  function applyTableFilters() {
    const searchValue = searchInput.value.toLowerCase().trim();

    const selectedStatuses = Array.from(statusCheckboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.dataset.status);

    tableRows.forEach((row) => {
      const productName = row.children[0].innerText.toLowerCase();
      const transactionId = row.children[7].innerText.toLowerCase();
      const paymentMode = row.children[5].innerText.toLowerCase();

      const matchesSearch =
        productName.includes(searchValue) ||
        transactionId.includes(searchValue) ||
        paymentMode.includes(searchValue);

      const statusSpan = row.querySelector(
        ".ABPDTableCell.received, .ABPDTableCell.refunded",
      );

      const rowStatus = statusSpan
        ? statusSpan.classList.contains("received")
          ? "received"
          : statusSpan.classList.contains("refunded")
            ? "refunded"
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

    document.querySelectorAll(".ABPDfaq-item").forEach((item) => {
      const name = item
        .querySelector(".ABPDfaq-username")
        ?.innerText.toLowerCase();

      const transactionId = item
        .querySelector(".ABPDfaq-row:nth-child(7) span:last-child")
        ?.innerText.toLowerCase();

      const paymentMode = item
        .querySelector(".ABPDfaq-row:nth-child(5) span:last-child")
        ?.innerText.toLowerCase();

      const statusEl = item.querySelector(".ABPDStatus");
      const status = statusEl
        ? statusEl.classList.contains("received")
          ? "received"
          : statusEl.classList.contains("refunded")
            ? "refunded"
            : ""
        : "";

      const matchesSearch =
        name?.includes(searchValue) ||
        transactionId?.includes(searchValue) ||
        paymentMode?.includes(searchValue);

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
      const items = Array.from(faqContainer.querySelectorAll(".ABPDfaq-item"));

      items.sort((a, b) => {
        if (sortType.includes("vprice")) {
          const va = parseInt(
            a
              .querySelector(".ABPDfaq-row:nth-child(2) span:last-child")
              .innerText.replace(/[₹, ]/g, ""),
          );
          const vb = parseInt(
            b
              .querySelector(".ABPDfaq-row:nth-child(2) span:last-child")
              .innerText.replace(/[₹, ]/g, ""),
          );
          return sortType === "vprice-asc" ? va - vb : vb - va;
        }

        if (sortType.includes("sprice")) {
          const sa = parseInt(
            a
              .querySelector(".ABPDfaq-row:nth-child(3) span:last-child")
              .innerText.replace(/[₹, ]/g, ""),
          );
          const sb = parseInt(
            b
              .querySelector(".ABPDfaq-row:nth-child(3) span:last-child")
              .innerText.replace(/[₹, ]/g, ""),
          );
          return sortType === "sprice-asc" ? sa - sb : sb - sa;
        }
      });

      items.forEach((i) => faqContainer.appendChild(i));
    } else {
      const rows = Array.from(tableBody.querySelectorAll(".ABPDTableRow"));

      rows.sort((a, b) => {
        if (sortType.includes("vprice")) {
          const va = parseInt(a.children[2].innerText.replace(/[₹, ]/g, ""));
          const vb = parseInt(b.children[2].innerText.replace(/[₹, ]/g, ""));
          return sortType === "vprice-asc" ? va - vb : vb - va;
        }

        if (sortType.includes("sprice")) {
          const sa = parseInt(a.children[3].innerText.replace(/[₹, ]/g, ""));
          const sb = parseInt(b.children[3].innerText.replace(/[₹, ]/g, ""));
          return sortType === "sprice-asc" ? sa - sb : sb - sa;
        }
      });

      rows.forEach((row) => tableBody.appendChild(row));
    }

    sortBox.classList.remove("active-main-content-flows");
  });

  document.querySelectorAll(".ABPDfaq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".ABPDfaq-item").classList.toggle("active");
    });
  });


  function updateTotalCount() {
  const totalLink = document.querySelector(".ABPDTotalLink");
  const rows = document.querySelectorAll(".ABPDTableRow");

  totalLink.innerText = `Total - ${rows.length}`;
}

// Page load par call karo
updateTotalCount();

});