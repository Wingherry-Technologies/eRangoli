// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon = document.querySelector("#hamburger-menu>img");


hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display = "none"
    document.querySelector("body").style.overflow = "hidden"
    window.scrollTo(0, 0);
  }
  else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow = "auto";
    document.querySelector(".bottom-nav").style.display = "flex";
  }
});
document.addEventListener("DOMContentLoaded", function () {
  /* ================= FILTER DROPDOWN ================= */
  const filterBtn = document.querySelector(".ADVLFilterDummy");
  const filterMain = document.getElementById("filter-main");
  const statusBox = document.getElementById("status-box");

  const searchInput = document.querySelector(".ADVLSearchInput");
  const statusCheckboxes = document.querySelectorAll(
    '#status-box input[type="checkbox"]',
  );
  const tableRows = document.querySelectorAll(".ADVLTableRow");

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
  ".ADVLTableCell.pending, .ADVLTableCell.sendToVerify, .ADVLTableCell.rejected"
);

let rowStatus = "";

if (statusSpan?.classList.contains("pending")) {
  rowStatus = "pending";
} else if (statusSpan?.classList.contains("sendToVerify")) {
  rowStatus = "sendToVerify";
} else if (statusSpan?.classList.contains("rejected")) {
  rowStatus = "rejected";
}


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

    // 🔥 RESET ONLY WHEN DROPDOWN CLOSES
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
  const btn = e.target.closest(".ADVLActionButton");
  if (!btn) return;

  const row = btn.closest(".ADVLTableRow");
  const statusCell = row.querySelector(".ADVLTableCell.pending, .ADVLTableCell.sendToVerify, .ADVLTableCell.rejected");

  if (!statusCell) return;

  //  If status is "Send To Verify"
  if (statusCell.classList.contains("sendToVerify")) {
    window.location.href = "../html/adminVMVendorVerificationOverview.html";
  } 
  else if (statusCell.classList.contains("pending")) {
    window.location.href = "../html/adminVMVendorVerificationOverview.html";
  }
  // For Pending (or others)
  else {
    window.location.href = "../html/adminVMVendorVerificationOverview.html";
  }
});

  /* ================= SORT ================= */
  const settingsBtn = document.querySelector(".ADVLSettingsDummy");
  const sortBox = document.getElementById("sort-box");
  const tableBody = document.querySelector(".ADVLTableBody");

  settingsBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    sortBox.classList.toggle("active-main-content-flows");
    filterMain.classList.remove("active-main-content-flows");
    statusBox.classList.remove("active-main-content-flows");
  });

  sortBox.addEventListener("click", function (e) {
    const sortType = e.target.dataset.sort;
    if (!sortType) return;

    const rows = Array.from(tableBody.querySelectorAll(".ADVLTableRow"));

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
document.querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(3)").classList.add("sidebar-active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(2)").classList.add("active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(2)>li:nth-child(3)").classList.add("submenu-active-highlight");


document.querySelector("#account-menu .mobile-dropdown:nth-child(3) .dropdown-header").classList.add("dropdown-header-active");
document.querySelector("#account-menu .mobile-dropdown:nth-child(3)").classList.add("active-mobile-submenu");
document.querySelector("#account-menu .mobile-dropdown:nth-child(3) li:nth-child(3)").classList.add("submenu-active-page");

