document.addEventListener("DOMContentLoaded", function () {
  /* ================= SEARCH FILTER ================= */
  const searchInput = document.querySelector(".APVSearchInput");
  const tableRows = document.querySelectorAll(".APVTableRow");

  function applySearch() {
    const searchValue = searchInput.value.toLowerCase().trim();

    tableRows.forEach((row) => {
      const company = row.children[0].innerText.toLowerCase();
      const uid = row.children[1].innerText.toLowerCase();
      const email = row.children[2].innerText.toLowerCase();
      const contact = row.children[3].innerText.toLowerCase();
      const designation = row.children[4].innerText.toLowerCase();
      const state = row.children[5].innerText.toLowerCase();
      const city = row.children[6].innerText.toLowerCase();

      const matchesSearch =
        company.includes(searchValue) ||
        uid.includes(searchValue) ||
        email.includes(searchValue) ||
        contact.includes(searchValue) ||
        designation.includes(searchValue) ||
        state.includes(searchValue) ||
        city.includes(searchValue);

      row.style.display = matchesSearch ? "" : "none";
    });
  }

  searchInput.addEventListener("input", applySearch);

  /* ================= ACTION BUTTON ================= */
 document.addEventListener("click", function (e) {
  const actionBtn = e.target.closest(".APVActionButton");
  if (!actionBtn) return;

  e.preventDefault();
  e.stopPropagation();

  // Optional: get UID from row
  const row = actionBtn.closest(".APVTableRow");
  const uid = row ? row.children[1].innerText.trim() : "";

  // Navigate
  window.location.href = "../html/adminvendorlistoverview.html";
  // OR with UID
  // window.location.href = `../html/adminvendoroverview.html?uid=${uid}`;
});


  /* ================= SORT ================= */
  const settingsBtn = document.querySelector(".APVSettingsDummy");
  const sortBox = document.getElementById("sort-box");
  const tableBody = document.querySelector(".APVTableBody");

  settingsBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    sortBox.classList.toggle("active-main-content-flows");
  });

  sortBox.addEventListener("click", function (e) {
    const sortType = e.target.dataset.sort;
    if (!sortType) return;

    const rows = Array.from(tableBody.querySelectorAll(".APVTableRow"));

    rows.sort((a, b) => {
      if (sortType === "company-asc") {
        return a.children[0].innerText.localeCompare(b.children[0].innerText);
      }
      if (sortType === "company-desc") {
        return b.children[0].innerText.localeCompare(a.children[0].innerText);
      }
      if (sortType === "state-asc") {
        return a.children[5].innerText.localeCompare(b.children[5].innerText);
      }
      if (sortType === "state-desc") {
        return b.children[5].innerText.localeCompare(a.children[5].innerText);
      }
      if (sortType === "city-asc") {
        return a.children[6].innerText.localeCompare(b.children[6].innerText);
      }
      if (sortType === "city-desc") {
        return b.children[6].innerText.localeCompare(a.children[6].innerText);
      }
    });

    rows.forEach((row) => tableBody.appendChild(row));
    sortBox.classList.remove("active-main-content-flows");
  });

  document.addEventListener("click", function () {
    sortBox.classList.remove("active-main-content-flows");
  });
});
