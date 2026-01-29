// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon=document.querySelector("#hamburger-menu>img");


hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display="none"
    document.querySelector("body").style.overflow="hidden"
    window.scrollTo(0, 0);
  }
  else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow="auto";
    document.querySelector(".bottom-nav").style.display="flex";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("AUMSearchInput");

  const filterBtn = document.getElementById("filter-bar-main-box");
  const filterMain = document.getElementById("filter-main");
  const statusBox = document.getElementById("status-box");

  const sortBtn = document.querySelector('.AUMActionIcon img[src*="sort"]');
  const sortBox = document.getElementById("sort-box");

  const tableBody = document.querySelector(".AUMTable tbody");
  const tableRows = Array.from(
    document.querySelectorAll(".AUMTable tbody tr:not(.AUMNoDataRow)"),
  );
  const noDataRow = document.querySelector(".AUMNoDataRow");

  const checkboxes = document.querySelectorAll(
    '#status-box input[type="checkbox"]',
  );

  const faqContainer = document.querySelector(".AUMMobileFAQ");

  function parseDDMMYY(dateStr) {
    const [dd, mm, yy] = dateStr.split("/");
    return new Date(`20${yy}-${mm}-${dd}`);
  }

  function applyTableFilter() {
    const q = searchInput.value.toLowerCase().trim();
    const selected = Array.from(checkboxes)
      .filter((c) => c.checked)
      .map((c) => c.dataset.status);

    let count = 0;

    tableRows.forEach((row) => {
      const name = row.children[0].innerText.toLowerCase();
      const type = row.children[1].innerText.toLowerCase();
      const email = row.children[5].innerText.toLowerCase();

      const statusEl = row.querySelector(".AUMStatus");
      const status = statusEl ? statusEl.classList[1] : "";

      const matchSearch =
        name.includes(q) || type.includes(q) || email.includes(q);

      const matchStatus = selected.length === 0 || selected.includes(status);

      row.style.display = matchSearch && matchStatus ? "" : "none";
      if (matchSearch && matchStatus) count++;
    });

    noDataRow.style.display = count === 0 ? "" : "none";
  }

  function applyMobileFilter() {
    const q = searchInput.value.toLowerCase().trim();
    const selected = Array.from(checkboxes)
      .filter((c) => c.checked)
      .map((c) => c.dataset.status);

    let count = 0;

    faqContainer.querySelectorAll(".faq-item").forEach((item) => {
      const name = item.querySelector(".faq-username")?.innerText.toLowerCase();

      const type = item.querySelector(".faq-usertype")?.innerText.toLowerCase();

      const email = item
        .querySelector(".faq-row:nth-child(5) span:last-child")
        ?.innerText.toLowerCase();

      const statusEl = item.querySelector(".AUMStatus");
      const status = statusEl
        ? statusEl.className.replace("AUMStatus", "").replace("-mob", "").trim()
        : "";

      const matchSearch =
        name?.includes(q) || type?.includes(q) || email?.includes(q);

      const matchStatus = selected.length === 0 || selected.includes(status);

      item.style.display = matchSearch && matchStatus ? "" : "none";
      if (matchSearch && matchStatus) count++;
    });
  }

  function applyFilter() {
    if (window.innerWidth <= 595) {
      applyMobileFilter();
    } else {
      applyTableFilter();
    }
  }

  searchInput.addEventListener("input", applyFilter);
  checkboxes.forEach((c) => c.addEventListener("change", applyFilter));

  filterBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    filterMain.classList.toggle("active-main-content-flows");
    statusBox.classList.remove("active-main-content-flows");
    sortBox.classList.remove("active-main-content-flows");
  });

  filterMain.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
      filterMain.classList.remove("active-main-content-flows");
      statusBox.classList.add("active-main-content-flows");
    }
  });

  sortBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    sortBox.classList.toggle("active-main-content-flows");
    filterMain.classList.remove("active-main-content-flows");
    statusBox.classList.remove("active-main-content-flows");
  });

  sortBox.querySelectorAll("li").forEach((item) => {
    item.addEventListener("click", function () {
      const type = this.dataset.sort;

      if (window.innerWidth <= 595) {
        const items = Array.from(faqContainer.querySelectorAll(".faq-item"));

        items.sort((a, b) => {
          const na = a.querySelector(".faq-username").innerText.trim();
          const nb = b.querySelector(".faq-username").innerText.trim();

          const da = parseDDMMYY(
            a.querySelector(".faq-row:nth-child(2) span:last-child").innerText,
          );
          const db = parseDDMMYY(
            b.querySelector(".faq-row:nth-child(2) span:last-child").innerText,
          );

          if (type === "name-asc") return na.localeCompare(nb);
          if (type === "name-desc") return nb.localeCompare(na);
          if (type === "date-new") return db - da;
          if (type === "date-old") return da - db;
        });

        items.forEach((i) => faqContainer.appendChild(i));
      } else {
        const rows = Array.from(
          tableBody.querySelectorAll("tr:not(.AUMNoDataRow)"),
        );

        rows.sort((a, b) => {
          const na = a.children[0].innerText.trim();
          const nb = b.children[0].innerText.trim();

          const da = parseDDMMYY(a.children[2].innerText.trim());
          const db = parseDDMMYY(b.children[2].innerText.trim());

          if (type === "name-asc") return na.localeCompare(nb);
          if (type === "name-desc") return nb.localeCompare(na);
          if (type === "date-new") return db - da;
          if (type === "date-old") return da - db;
        });

        rows.forEach((r) => tableBody.appendChild(r));
      }

      sortBox.classList.remove("active-main-content-flows");
    });
  });

  document.addEventListener("click", function () {
    filterMain.classList.remove("active-main-content-flows");
    statusBox.classList.remove("active-main-content-flows");
    sortBox.classList.remove("active-main-content-flows");
  });

  filterMain.addEventListener("click", (e) => e.stopPropagation());
  statusBox.addEventListener("click", (e) => e.stopPropagation());
  sortBox.addEventListener("click", (e) => e.stopPropagation());

  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".faq-item").classList.toggle("active");
    });
  });
});

document.querySelector(".sidebar-main-vendor > article > ul > li:nth-of-type(5)").classList.add("sidebar-active");


document.querySelector("#account-menu .mobile-dropdown:nth-child(5) .dropdown-header").classList.add("dropdown-header-active");
