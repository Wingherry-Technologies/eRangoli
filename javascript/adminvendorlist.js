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

// TOAST FOR SUCCESSFUL CREDENTIAL SEND
  const toastFlag = localStorage.getItem("vendorCredentialSuccess");

if (toastFlag === "true") {
  const toast = document.getElementById("vendorSuccessToast");
  const closeBtn = document.getElementById("toastCloseBtn");

  toast.classList.add("show");

  // Auto hide after 3 sec
  // const timer = setTimeout(() => {
  //   toast.classList.remove("show");
  // }, 3000);

  // Manual close
  closeBtn.addEventListener("click", () => {
    toast.classList.remove("show");
    clearTimeout(timer);
  });

  // remove flag so refresh pe na aaye
  localStorage.removeItem("vendorCredentialSuccess");
}

  /* =========================
     ELEMENTS
  ========================= */

  const searchInput = document.querySelector(".APMSearchInput");
  const tableBody = document.querySelector(".APMTableBody");
  const tableRows = [...document.querySelectorAll(".APMTableRow")];
  const mobileItems = [
    ...document.querySelectorAll(".APMMobileList .faq-item"),
  ];

  /* =========================
     SEARCH (BUYER)
  ========================= */

  searchInput.addEventListener("input", function () {
    const val = searchInput.value.toLowerCase().trim();

    // TABLE SEARCH
    tableRows.forEach((row) => {
      const name = row.children[0].innerText.toLowerCase();
      const uid = row.children[1].innerText.toLowerCase();
      const email = row.children[2].innerText.toLowerCase();
      const city = row.children[5].innerText.toLowerCase();

      row.style.display =
        name.includes(val) ||
        uid.includes(val) ||
        email.includes(val) ||
        city.includes(val)
          ? ""
          : "none";
    });

    // MOBILE SEARCH
    mobileItems.forEach((item) => {
      const content = item.innerText.toLowerCase();
      item.style.display = content.includes(val) ? "" : "none";
    });
  });

  /* =========================
     FILTER / SORT TOGGLE
  ========================= */

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

  /* =========================
     FILTER (STATE + CITY)
  ========================= */

  function applyVendorFilter() {
    const states = [
      ...document.querySelectorAll("#apm-state-box input:checked"),
    ].map((cb) => cb.dataset.state);

    const cities = [
      ...document.querySelectorAll("#apm-city-box input:checked"),
    ].map((cb) => cb.dataset.city);

    // TABLE FILTER
    tableRows.forEach((row) => {
      const state = row.children[5].innerText.trim(); // ✅ State
      const city = row.children[6].innerText.trim(); // ✅ City

      const show =
        (!states.length || states.includes(state)) &&
        (!cities.length || cities.includes(city));

      row.style.display = show ? "" : "none";
    });

    // MOBILE FILTER
    mobileItems.forEach((item) => {
      const values = [
        ...item.querySelectorAll(".all-answers span:last-child"),
      ].map((s) => s.innerText);

      const state = values[3]; // ✅ State
      const city = values[4]; // ✅ City

      const show =
        (!states.length || states.includes(state)) &&
        (!cities.length || cities.includes(city));

      item.style.display = show ? "" : "none";
    });
  }

  document
    .querySelectorAll("#apm-state-box input, #apm-city-box input")
    .forEach((cb) => cb.addEventListener("change", applyVendorFilter));

  /* =========================
     SORT (BUYER)
  ========================= */

  const sortRadios = document.querySelectorAll("#apm-sort-box input");

  sortRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      const type = radio.dataset.sort;

      // TABLE SORT
      const sortedRows = [...tableRows].sort((a, b) => {
        // Company Name
        if (type === "nameAZ" || type === "nameZA") {
          const A = a.children[0].innerText;
          const B = b.children[0].innerText;
          return type === "nameAZ" ? A.localeCompare(B) : B.localeCompare(A);
        }

        // Vendor Name
        if (type === "vendorAZ" || type === "vendorZA") {
          const A = a.children[1].innerText;
          const B = b.children[1].innerText;
          return type === "vendorAZ" ? A.localeCompare(B) : B.localeCompare(A);
        }
      });

      tableBody.innerHTML = "";
      sortedRows.forEach((r) => tableBody.appendChild(r));

      // MOBILE SORT (Company Name)
      const mobileContainer = document.querySelector(".APMMobileList");
      const sortedMobile = [...mobileItems].sort((a, b) => {
        const A = a.querySelector(".mobiletitle span").innerText;
        const B = b.querySelector(".mobiletitle span").innerText;
        return type.includes("AZ") ? A.localeCompare(B) : B.localeCompare(A);
      });

      mobileContainer.innerHTML = "";
      sortedMobile.forEach((i) => mobileContainer.appendChild(i));
    });
  });

  /* =========================
     MOBILE FAQ TOGGLE
  ========================= */

  document.addEventListener("click", function (e) {
    const question = e.target.closest(".main-faq-question");
    if (question) {
      question.closest(".faq-item").classList.toggle("active");
    }
  });

  /* =========================
     VIEW REDIRECT
  ========================= */

  document.addEventListener("click", function (e) {
    if (
      e.target.closest(".APMActionButton") ||
      e.target.textContent === "View"
    ) {
      window.location.href = "../html/adminVMVendorListOverview.html";
    }
  });

  /* =========================
     TOTAL COUNT
  ========================= */

  document.querySelector(".APMViewAllLink").innerText = `Total-${tableRows.length}`;
});
document.querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(3)").classList.add("sidebar-active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(2)").classList.add("active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(2)>li:nth-child(1)").classList.add("submenu-active-highlight");


document.querySelector("#account-menu .mobile-dropdown:nth-child(3) .dropdown-header").classList.add("dropdown-header-active");
document.querySelector("#account-menu .mobile-dropdown:nth-child(3)").classList.add("active-mobile-submenu");
document.querySelector("#account-menu .mobile-dropdown:nth-child(3) li:nth-child(1)").classList.add("submenu-active-page");

