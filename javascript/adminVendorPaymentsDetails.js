document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".AVPDSearchInput");
  const tableRows = Array.from(document.querySelectorAll(".AVPDTableRow"));
  const mobileItems = Array.from(document.querySelectorAll(".AVPDfaq-item"));
  const totalText = document.querySelector(".AVPDTotalLink");

  const filterBtn = document.querySelector(".AVPDFilterDummy");
  const sortBtn = document.querySelector(".AVPDSettingsDummy");

  const filterMain = document.getElementById("avpd-filter-main");
  const statusBox = document.getElementById("avpd-status-box");
  const sortBox = document.getElementById("avpd-sort-box");

  const statusChecks = document.querySelectorAll(
    "#avpd-status-box input[type='checkbox']",
  );
  const sortOptions = document.querySelectorAll("#avpd-sort-box li");

  let activeStatuses = [];
  let activeSort = "";

  function getPriceFromRow(row) {
    return parseInt(row.children[2].innerText.replace(/[₹,\s]/g, ""), 10);
  }

  function updateTotal() {
    const visible = mobileItems.filter(
      (item) => item.style.display !== "none",
    ).length;

    totalText.innerText = `Total - ${visible}`;

    const noRowsEl = document.querySelector(".AVPDNoRows");

    if (visible === 0) {
      noRowsEl.style.display = "block";
    } else {
      noRowsEl.style.display = "none";
    }
  }

  function applyMobileFilter(searchValue) {
    mobileItems.forEach((item) => {
      const text = item.innerText.toLowerCase();
      const statusEl = item.querySelector(".AVPDStatus");
      const status = statusEl ? statusEl.innerText.toLowerCase() : "";

      const searchMatch = text.includes(searchValue);
      const statusMatch =
        activeStatuses.length === 0 || activeStatuses.includes(status);

      item.style.display = searchMatch && statusMatch ? "" : "none";
    });
  }

  function applyAll() {
    const searchValue = searchInput.value.toLowerCase();

    tableRows.forEach((row) => {
      const text = row.innerText.toLowerCase();
      const statusEl = row.querySelector(".delivered, .refunded");
      const status = statusEl ? statusEl.innerText.toLowerCase() : "";

      const searchMatch = text.includes(searchValue);
      const statusMatch =
        activeStatuses.length === 0 || activeStatuses.includes(status);

      row.style.display = searchMatch && statusMatch ? "" : "none";
    });

    let visibleRows = tableRows.filter((row) => row.style.display !== "none");

    if (activeSort === "vprice-asc") {
      visibleRows.sort((a, b) => getPriceFromRow(a) - getPriceFromRow(b));
    }

    if (activeSort === "vprice-desc") {
      visibleRows.sort((a, b) => getPriceFromRow(b) - getPriceFromRow(a));
    }

    const tbody = document.querySelector(".AVPDTableBody");
    visibleRows.forEach((row) => tbody.appendChild(row));

    applyMobileFilter(searchValue);
    updateTotal();
  }

  searchInput.addEventListener("input", applyAll);

  filterBtn.addEventListener("click", () => {
    filterMain.classList.toggle("active-main-content-flows");
    statusBox.classList.remove("active-main-content-flows");
    sortBox.classList.remove("active-main-content-flows");
  });

  filterMain.querySelector("li").addEventListener("click", () => {
    filterMain.classList.remove("active-main-content-flows");
    statusBox.classList.toggle("active-main-content-flows");
  });

  statusChecks.forEach((check) => {
    check.addEventListener("change", () => {
      activeStatuses = Array.from(statusChecks)
        .filter((c) => c.checked)
        .map((c) => c.dataset.status);
      applyAll();
    });
  });

  sortBtn.addEventListener("click", () => {
    sortBox.classList.toggle("active-main-content-flows");
    filterMain.classList.remove("active-main-content-flows");
    statusBox.classList.remove("active-main-content-flows");
  });

  sortOptions.forEach((option) => {
    option.addEventListener("click", () => {
      activeSort = option.dataset.sort;
      sortBox.classList.remove("active-main-content-flows");
      applyAll();
    });
  });

  const faqItems = document.querySelectorAll(".AVPDfaq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".AVPDfaq-question");
    question.addEventListener("click", () => {
      faqItems.forEach((el) => {
        if (el !== item) el.classList.remove("active");
      });
      item.classList.toggle("active");
    });
  });

  updateTotal();
});
