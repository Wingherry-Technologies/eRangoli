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

  const searchInput = document.querySelector(".APMSearchInput");
  const tableBody = document.querySelector(".APMTableBody");
  const tableRows = [...document.querySelectorAll(".APMTableRow")];

  /* ================= SEARCH ================= */
  searchInput.addEventListener("input", function () {
    const val = searchInput.value.toLowerCase().trim();

    tableRows.forEach((row) => {
      const name = row.children[0].innerText.toLowerCase();
      const sku = row.children[1].innerText.toLowerCase();
      const category = row.children[2].innerText.toLowerCase();
      const payment = row.children[4].innerText.toLowerCase();

      row.style.display =
        name.includes(val) ||
        sku.includes(val) ||
        category.includes(val) ||
        payment.includes(val)
          ? ""
          : "none";
    });
  });

  /* ================= FILTER / SORT TOGGLE ================= */
  const filterBtn = document.getElementById("apm-filter-btn");
  const sortBtn = document.getElementById("apm-sort-btn");
  const filterMain = document.getElementById("apm-filter-main");
  const sortBox = document.getElementById("apm-sort-box");
  const stateOpen = document.getElementById("apm-state-open");
  const cityOpen = document.getElementById("apm-city-open");
  const stateBox = document.getElementById("apm-state-box");
  const cityBox = document.getElementById("apm-city-box");

  filterBtn.onclick = () => {
    filterMain.classList.toggle("active-main-content-flows");
    sortBox.classList.remove("active-main-content-flows");
  };

  sortBtn.onclick = () => {
    sortBox.classList.toggle("active-main-content-flows");
    filterMain.classList.remove("active-main-content-flows");
  };

  stateOpen.onclick = () => {
    stateBox.classList.toggle("active-main-content-flows");
    cityBox.classList.remove("active-main-content-flows");
  };

  cityOpen.onclick = () => {
    cityBox.classList.toggle("active-main-content-flows");
    stateBox.classList.remove("active-main-content-flows");
  };

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".filter-bar-wrapper")) {
      filterMain.classList.remove("active-main-content-flows");
      sortBox.classList.remove("active-main-content-flows");
      stateBox.classList.remove("active-main-content-flows");
      cityBox.classList.remove("active-main-content-flows");
    }
  });

  /* ================= FILTER ================= */
  function applyFilter() {

    const payments = [...document.querySelectorAll("#apm-state-box input:checked")]
      .map(cb => cb.parentElement.textContent.trim());

    const status = [...document.querySelectorAll("#apm-city-box input:checked")]
      .map(cb => cb.parentElement.textContent.trim());

    tableRows.forEach(row => {
      const rowPayment = row.dataset.payment;
      const rowStatus = row.dataset.status;

      const matchPayment = !payments.length || payments.includes(rowPayment);
      const matchStatus = !status.length || status.includes(rowStatus);

      row.style.display = (matchPayment && matchStatus) ? "" : "none";
    });
  }

  document
    .querySelectorAll("#apm-state-box input, #apm-city-box input")
    .forEach(cb => cb.addEventListener("change", applyFilter));

  /* ================= SORT ================= */
  document.querySelectorAll("#apm-sort-box input").forEach((radio) => {
    radio.addEventListener("change", () => {
      const type = radio.dataset.sort;

      const sortedRows = [...tableRows].sort((a, b) => {

        if (type === "nameAZ" || type === "nameZA") {
          const A = a.children[0].innerText;
          const B = b.children[0].innerText;
          return type === "nameAZ"
            ? A.localeCompare(B)
            : B.localeCompare(A);
        }

        if (type === "uidASC" || type === "uidDESC") {
          const A = parseInt(a.children[1].innerText.replace("#", ""));
          const B = parseInt(b.children[1].innerText.replace("#", ""));
          return type === "uidASC" ? A - B : B - A;
        }
      });

      tableBody.innerHTML = "";
      sortedRows.forEach(r => tableBody.appendChild(r));
    });
  });

  /* ================= COUNT ================= */
  document.querySelector(".APMViewAllLink").innerText = tableRows.length;

  // document.querySelector(".APMViewAllLink").innerText = `Total-${tableRows.length}`;
});


/* ================= POPUP LOGIC ================= */

const orderPopup = document.getElementById("orderDetailsPopup");
const trackingPopup = document.getElementById("transportTrackingPopup");
const inlineContainer = document.getElementById("orderDetailsInline");
const modalContent = document.querySelector(".ODModal");
const dashboard = document.querySelector(".APMDashboardContainer");

/* Order details open */
function openOrderView() {
  if (window.innerWidth <= 1024) {
    inlineContainer.innerHTML = modalContent.innerHTML;
    inlineContainer.style.display = "block";
    dashboard.style.display = "none";
  } else {
    orderPopup.classList.add("active");
  }
}

/* Order details close (tab/mobile back) */
function closeOrderView() {
  inlineContainer.style.display = "none";
  dashboard.style.display = "";
}

/* Open order */
document.querySelectorAll(".APMActionButton").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    openOrderView();
  });
});

/* Back button (tab/mobile) */
document.addEventListener("click", (e) => {
  if (e.target.closest("#odBackBtn") && window.innerWidth <= 1024) {
    inlineContainer.style.display = "none";
    dashboard.style.display = "";

    const mobileFaq = document.querySelector(".ASPROMobileFAQ");
    if (mobileFaq) mobileFaq.style.display = "block";
  }
});
document.addEventListener("click", function (e) {
  const inTransit = e.target.closest(".ODStatusSuccess");
  if (!inTransit) return;

  e.preventDefault();
  if (window.innerWidth > 1024) {
    orderPopup.classList.remove("active");
  }

  trackingPopup.classList.add("active");
});

document.getElementById("closeOD").onclick = () => {
  orderPopup.classList.remove("active");
};

document.getElementById("closeTT").onclick = () => {
  trackingPopup.classList.remove("active");
};

trackingPopup.addEventListener("click", (e) => {
  if (e.target.id === "transportTrackingPopup") {
    trackingPopup.classList.remove("active");
  }
});

/* ASPRO MOBILE FAQ DROPDOWN */

document.addEventListener("click", function (e) {
  const question = e.target.closest(".ASPROfaq-question");
  if (!question) return;

  const item = question.closest(".ASPROfaq-item");
  if (!item) return;

  const allItems = document.querySelectorAll(".ASPROfaq-item");

  allItems.forEach((el) => {
    if (el !== item) el.classList.remove("active");
  });

  item.classList.toggle("active");
});

/*  ASPRO VIEW BUTTON → ORDER DETAILS  */

document.addEventListener("click", function (e) {
  const viewBtn = e.target.closest(".ASPROfaq-row .view");
  if (!viewBtn) return;

  e.preventDefault();

  const clone = modalContent.cloneNode(true);

  const closeBtn = clone.querySelector("#closeOD");
  if (closeBtn) closeBtn.remove();

  clone.classList.remove("ODModal");

  inlineContainer.innerHTML = "";
  inlineContainer.appendChild(clone);
  inlineContainer.style.display = "block";

  const mobileFaq = document.querySelector(".ASPROMobileFAQ");
  if (mobileFaq) mobileFaq.style.display = "none";
  dashboard.style.display = "none";
});

document.querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(6)").classList.add("sidebar-active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(3)").classList.add("active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(3)>li:nth-child(2)").classList.add("submenu-active-highlight");


document.querySelector("#account-menu .mobile-dropdown:nth-child(6) .dropdown-header").classList.add("dropdown-header-active");
document.querySelector("#account-menu .mobile-dropdown:nth-child(6)").classList.add("active-mobile-submenu");
document.querySelector("#account-menu .mobile-dropdown:nth-child(6) li:nth-child(2)").classList.add("submenu-active-page");
