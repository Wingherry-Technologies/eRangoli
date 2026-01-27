document.addEventListener("DOMContentLoaded", function () {
  // basic selectors
  const searchInput = document.querySelector(".APVSearchInput");
  const filterBtn = document.querySelector(".APVFilterDummy");
  const sortBtn = document.querySelector(".APVSettingsDummy");

  // filter dropdowns
  const filterMain = document.getElementById("filter-main");
  const statusBox = document.getElementById("status-box");
  const sortBox = document.getElementById("sort-box");

  // status checkboxes
  const statusCheckboxes = document.querySelectorAll(
    '#status-box input[type="checkbox"]',
  );

  // table & mobile
  const tableBody = document.querySelector(".APVTableBody");
  const tableRows = Array.from(document.querySelectorAll(".APVTableRow"));
  const mobileFaqContainer = document.querySelector(".APVMobileFAQ");
  const noDataBox = document.querySelector(".APVNoData");

  // desktop table filter
  function applyTable() {
    const q = searchInput.value.toLowerCase().trim();
    const activeStatuses = Array.from(statusCheckboxes)
      .filter((c) => c.checked)
      .map((c) => c.dataset.status);

    let visible = 0;

    tableRows.forEach((row) => {
      const name = row.children[0].innerText.toLowerCase();
      const requestId = row.children[1].innerText.toLowerCase();
      const category = row.children[2].innerText.toLowerCase();

      const statusEl = row.querySelector(
        ".APVTableCell.pending, .APVTableCell.verified",
      );

      const status = statusEl
        ? statusEl.classList.contains("verified")
          ? "verified"
          : "pending"
        : "";

      const matchSearch =
        name.includes(q) || requestId.includes(q) || category.includes(q);

      const matchStatus =
        activeStatuses.length === 0 || activeStatuses.includes(status);

      if (matchSearch && matchStatus) {
        row.style.display = "";
        visible++;
      } else {
        row.style.display = "none";
      }
    });

    noDataBox.style.display = visible === 0 ? "block" : "none";
  }

  // mobile filter
  function applyMobile() {
    const q = searchInput.value.toLowerCase().trim();
    const activeStatuses = Array.from(statusCheckboxes)
      .filter((c) => c.checked)
      .map((c) => c.dataset.status);

    let visible = 0;

    mobileFaqContainer.querySelectorAll(".APVfaq-item").forEach((item) => {
      const name = item
        .querySelector(".APVfaq-username")
        ?.innerText.toLowerCase();

      const category = item
        .querySelector(".APVfaq-usertype")
        ?.innerText.toLowerCase();

      const statusEl = item.querySelector(
        ".APVStatus.pending, .APVStatus.verified",
      );

      const status = statusEl
        ? statusEl.classList.contains("verified")
          ? "verified"
          : "pending"
        : "";

      const matchSearch = name?.includes(q) || category?.includes(q);

      const matchStatus =
        activeStatuses.length === 0 || activeStatuses.includes(status);

      if (matchSearch && matchStatus) {
        item.style.display = "";
        visible++;
      } else {
        item.style.display = "none";
      }
    });

    noDataBox.style.display = visible === 0 ? "block" : "none";
  }

  // decide mode
  function applyAll() {
    if (window.innerWidth <= 595) {
      applyMobile();
    } else {
      applyTable();
    }
  }

  // search & status events
  searchInput.addEventListener("input", applyAll);
  statusCheckboxes.forEach((cb) => cb.addEventListener("change", applyAll));

  // filter icon click
  filterBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    filterMain.classList.toggle("active-main-content-flows");
    statusBox.classList.remove("active-main-content-flows");
    sortBox.classList.remove("active-main-content-flows");
  });

  // status click inside filter
  filterMain.addEventListener("click", (e) => {
    e.stopPropagation();
    const li = e.target.closest("li");
    if (!li) return;

    filterMain.classList.remove("active-main-content-flows");
    statusBox.classList.add("active-main-content-flows");
  });

  // prevent status box close
  statusBox.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // sort icon click
  sortBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    sortBox.classList.toggle("active-main-content-flows");
    filterMain.classList.remove("active-main-content-flows");
    statusBox.classList.remove("active-main-content-flows");
  });

  // close on outside click
  document.addEventListener("click", () => {
    filterMain.classList.remove("active-main-content-flows");
    statusBox.classList.remove("active-main-content-flows");
    sortBox.classList.remove("active-main-content-flows");
  });

  // sorting logic
  document.querySelectorAll("#sort-box li").forEach((item) => {
    item.addEventListener("click", () => {
      const type = item.dataset.sort;

      if (window.innerWidth <= 595) {
        const items = Array.from(
          mobileFaqContainer.querySelectorAll(".APVfaq-item"),
        );

        items.sort((a, b) => {
          const qa = parseInt(
            a.querySelector(".APVfaq-row:nth-child(3) span:last-child")
              .innerText,
          );
          const qb = parseInt(
            b.querySelector(".APVfaq-row:nth-child(3) span:last-child")
              .innerText,
          );
          const pa = parseInt(
            a
              .querySelector(".APVfaq-row:nth-child(4) span:last-child")
              .innerText.replace(/[₹, ]/g, ""),
          );
          const pb = parseInt(
            b
              .querySelector(".APVfaq-row:nth-child(4) span:last-child")
              .innerText.replace(/[₹, ]/g, ""),
          );

          if (type === "qty-asc") return qa - qb;
          if (type === "qty-desc") return qb - qa;
          if (type === "price-asc") return pa - pb;
          if (type === "price-desc") return pb - pa;
        });

        items.forEach((i) => mobileFaqContainer.appendChild(i));
      } else {
        tableRows.sort((a, b) => {
          const qa = parseInt(a.children[3].innerText);
          const qb = parseInt(b.children[3].innerText);
          const pa = parseInt(a.children[4].innerText.replace(/[₹, ]/g, ""));
          const pb = parseInt(b.children[4].innerText.replace(/[₹, ]/g, ""));

          if (type === "qty-asc") return qa - qb;
          if (type === "qty-desc") return qb - qa;
          if (type === "price-asc") return pa - pb;
          if (type === "price-desc") return pb - pa;
        });

        tableRows.forEach((r) => tableBody.appendChild(r));
      }

      sortBox.classList.remove("active-main-content-flows");
    });
  });

  // mobile accordion
  document.querySelectorAll(".APVfaq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".APVfaq-item").classList.toggle("active");
    });
  });

  // navigation logic
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".view, .APVActionButton");
    if (!btn) return;

    const row = btn.closest(".APVTableRow");
    const faq = btn.closest(".APVfaq-item");

    let statusEl;

    if (row) {
      statusEl = row.querySelector(
        ".APVTableCell.pending, .APVTableCell.verified",
      );
    }

    if (faq) {
      statusEl = faq.querySelector(".APVStatus.pending, .APVStatus.verified");
    }

    if (!statusEl) return;

    if (statusEl.classList.contains("verified")) {
      window.location.href = "../html/adminPMProductOverviewLive.html";
    } else if (statusEl.classList.contains("pending")) {
      window.location.href = "../html/adminPMVerificationOverview.html";
    }
  });
});
