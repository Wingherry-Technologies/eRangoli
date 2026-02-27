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

  let developerEl, adminEl;

  // ===== TABLE =====
  if (row) {
    developerEl = row.querySelector(
      ".developer-verified, .developer-pending, .developer-rejected, .developer-unverified"
    );

    adminEl = row.querySelector(
      ".admin-approved, .admin-rejected, .admin-unverified"
    );
  }

  // ===== FAQ =====
  if (faq) {
    developerEl = faq.querySelector(
      ".developer-verified, .developer-pending, .developer-rejected, .developer-unverified"
    );

    adminEl = faq.querySelector(
      ".admin-approved, .admin-rejected, .admin-unverified"
    );
  }

  if (!developerEl || !adminEl) return;

  // =============================
  // GET STATUS
  // =============================
  const developerStatus = developerEl.classList;
  const adminStatus = adminEl.classList;

  // =============================
  // CONDITIONS
  // =============================

  // 1️⃣ Developer = VERIFIED
  if (developerStatus.contains("developer-verified")) {
    if (adminStatus.contains("admin-approved")) {
      window.location.href = "../html/adminPMProductOverviewLive.html";
    } else if (adminStatus.contains("admin-rejected")) {
      window.location.href = "../html/adminPMProductOverviewRejectedLive.html";
    } else if (adminStatus.contains("admin-unverified")) {
      window.location.href = "../html/adminPMVerificationOverviewVerified.html";
    }
  }

  // 2️⃣ Developer = PENDING
  else if (developerStatus.contains("developer-pending")) {
    window.location.href = "../html/adminPMVerificationOverview.html";
  }

  // 3️⃣ Developer = REJECTED
  else if (developerStatus.contains("developer-rejected")) {
    if (adminStatus.contains("admin-approved")) {
      window.location.href = "../html/adminPMProductOverviewLive.html";
    } else if (adminStatus.contains("admin-rejected")) {
      window.location.href = "../html/adminPMProductOverviewRejectedLive.html";
    } else if (adminStatus.contains("admin-unverified")) {
      window.location.href = "../html/adminPMVerificationOverviewRejected.html";
    }
  }

  // 4️⃣ Developer = UNVERIFIED
  else if (developerStatus.contains("developer-unverified")) {
    if (adminStatus.contains("admin-approved")) {
      window.location.href = "../html/adminPMProductOverviewLive.html";
    } else if (adminStatus.contains("admin-rejected")) {
      window.location.href = "../html/adminPMProductOverviewRejectedLive.html";
    }
  }
});
});

document.querySelector(".sidebar-main-vendor ul>li:nth-child(2)").classList.add("sidebar-active");
document.querySelector(".sidebar-main-vendor ul>ul>li:nth-child(4)").classList.add("submenu-active-highlight");
document.querySelector(".sidebar-main-vendor ul>ul").classList.add("active");

document.querySelector("#account-menu .mobile-dropdown:nth-child(2) .dropdown-header").classList.add("dropdown-header-active");
document.querySelector(".mobile-submenu li:nth-child(4)").classList.add("submenu-active-page");
document.querySelector("#account-menu .mobile-dropdown:nth-child(2)").classList.add("active-mobile-submenu");

