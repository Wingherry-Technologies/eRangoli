document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     ELEMENTS
  ========================= */

  const searchInput = document.querySelector(".APMSearchInput");
  const tableBody = document.querySelector(".APMTableBody");
  const tableRows = [...document.querySelectorAll(".APMTableRow")];
  const mobileItems = [...document.querySelectorAll(".APMMobileList .faq-item")];

  /* =========================
     SEARCH (BUYER)
  ========================= */

  searchInput.addEventListener("input", function () {
    const val = searchInput.value.toLowerCase().trim();

    // TABLE SEARCH
    tableRows.forEach(row => {
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
    mobileItems.forEach(item => {
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

  document.addEventListener("click", e => {
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

  function applyBuyerFilter() {

    const states = [...document.querySelectorAll("#apm-state-box input:checked")]
      .map(cb => cb.dataset.state);

    const cities = [...document.querySelectorAll("#apm-city-box input:checked")]
      .map(cb => cb.dataset.city);

    // TABLE FILTER
    tableRows.forEach(row => {
      const state = row.children[4].innerText.trim();
      const city = row.children[5].innerText.trim();

      const show =
        (!states.length || states.includes(state)) &&
        (!cities.length || cities.includes(city));

      row.style.display = show ? "" : "none";
    });

    // MOBILE FILTER
    mobileItems.forEach(item => {
      const values = [...item.querySelectorAll(".all-answers span:last-child")]
        .map(s => s.innerText);

      const show =
        (!states.length || states.includes(values[2])) &&
        (!cities.length || cities.includes(values[3]));

      item.style.display = show ? "" : "none";
    });
  }

  document
    .querySelectorAll("#apm-state-box input, #apm-city-box input")
    .forEach(cb => cb.addEventListener("change", applyBuyerFilter));

  /* =========================
     SORT (BUYER)
  ========================= */

  const sortRadios = document.querySelectorAll("#apm-sort-box input");

  sortRadios.forEach(radio => {
    radio.addEventListener("change", () => {

      const type = radio.dataset.sort;

      // TABLE SORT
      const sortedRows = [...tableRows].sort((a, b) => {

        // Name sort
        if (type === "nameAZ" || type === "nameZA") {
          const A = a.children[0].innerText;
          const B = b.children[0].innerText;
          return type === "nameAZ"
            ? A.localeCompare(B)
            : B.localeCompare(A);
        }

        // UID sort
        if (type === "uidASC" || type === "uidDESC") {
          const A = parseInt(a.children[1].innerText.replace("#", ""));
          const B = parseInt(b.children[1].innerText.replace("#", ""));
          return type === "uidASC" ? A - B : B - A;
        }
      });

      tableBody.innerHTML = "";
      sortedRows.forEach(r => tableBody.appendChild(r));

      // MOBILE SORT (by name)
      const mobileContainer = document.querySelector(".APMMobileList");
      const sortedMobile = [...mobileItems].sort((a, b) => {
        const A = a.querySelector(".mobiletitle span").innerText;
        const B = b.querySelector(".mobiletitle span").innerText;
        return type === "nameAZ"
          ? A.localeCompare(B)
          : B.localeCompare(A);
      });

      mobileContainer.innerHTML = "";
      sortedMobile.forEach(i => mobileContainer.appendChild(i));
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
      window.location.href = "../html/adminbuyerlistoverview.html";
    }
  });

  /* =========================
     TOTAL COUNT
  ========================= */

  document.querySelector(".APMViewAllLink").innerText = `Total - ${tableRows.length}`;

});



