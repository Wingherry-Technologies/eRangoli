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

document.querySelectorAll(".faq-question").forEach((button) => {
  // har button pe click listener lagao
  button.addEventListener("click", () => {
    const faqItem = button.closest(".faq-item"); // parent item lo
    faqItem.classList.toggle("active"); // open / close toggle
  });
});

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
        ".APRATableCell.verified, .APRATableCell.rejected",
      );

      const rowStatus = statusSpan?.classList.contains("verified")
        ? "verified"
        : statusSpan?.classList.contains("rejected")
          ? "rejected"
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
      ".APRATableCell.verified, .APRATableCell.rejected",
    );

    if (!statusCell) return;

    //  If status is "Send To Verify"
    if (statusCell.classList.contains("rejected")) {
      window.location.href = "../html/developerVMVerificationOverview.html";
    }
    // For verified (or others)
    else {
      window.location.href = "../html/developerVMVerificationOverview.html";
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

  const status = faqItem.querySelector(".verified, .rejected");
  if (!status) return;

  if (status.classList.contains("rejected")) {
    window.location.href = "../html/developerVMVerificationOverview.html";
  } else if (status.classList.contains("verified")) {
    window.location.href = "../html/developerVMVerificationOverview.html";
  }
});

document.querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(3)").classList.add("sidebar-active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(2)").classList.add("active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(2)>li:nth-child(1)").classList.add("submenu-active-highlight");


document.querySelector("#account-menu .mobile-dropdown:nth-child(3) .dropdown-header").classList.add("dropdown-header-active");
document.querySelector("#account-menu .mobile-dropdown:nth-child(3)").classList.add("active-mobile-submenu");
document.querySelector("#account-menu .mobile-dropdown:nth-child(3) li:nth-child(1)").classList.add("submenu-active-page");
