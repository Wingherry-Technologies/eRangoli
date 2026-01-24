document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".APMSearchInput");
    const tableBody = document.querySelector(".APMTableBody");
    const tableRows = tableBody.querySelectorAll(".APMTableRow");

searchInput.addEventListener("input", function () {
  const searchValue = searchInput.value.toLowerCase().trim();

  // ===== TABLE SEARCH =====
  tableRows.forEach(row => {
    const productName = row.children[0].innerText.toLowerCase();
    const skuId = row.children[1].innerText.toLowerCase();
    const category = row.children[2].innerText.toLowerCase();

    const isMatch =
      productName.includes(searchValue) ||
      skuId.includes(searchValue) ||
      category.includes(searchValue);

    row.style.display = isMatch ? "" : "none";
  });

  // ===== MOBILE SEARCH =====
  mobileItems.forEach(item => {
    const name =
      item.querySelector(".mobiletitle span")?.innerText.toLowerCase() || "";
    const category =
      item.querySelector(".mobiletitle small")?.innerText.toLowerCase() || "";
    const sku =
      item.querySelector(".all-answers div span:nth-child(2)")?.innerText.toLowerCase() || "";

    const isMatch =
      name.includes(searchValue) ||
      category.includes(searchValue) ||
      sku.includes(searchValue);

    item.style.display = isMatch ? "" : "none";
  });
});



document.addEventListener("click", function (e) {
  const btn = e.target.closest(".APMActionButton");
  if (!btn) return;

  // find the table row
  const row = btn.closest(".APMTableRow");
  if (!row) return;

  // find the status span inside this row
  const statusEl = row.querySelector(".APMStatus");
  if (!statusEl) return;

  const statusText = statusEl.textContent.trim().toLowerCase();

  // routing logic
  if (statusText === "live" || statusText === "out of stock") {
    window.location.href = "../html/adminPMProductOverviewLive.html";
  } else if (statusText === "removed") {
    window.location.href = "../html/adminPMProductOverviewRemoved.html";
  }
});



    const filterBtn = document.getElementById("apm-filter-btn");
const sortBtn = document.getElementById("apm-sort-btn");
const filterMain = document.getElementById("apm-filter-main");
const statusBox = document.getElementById("apm-status-box");
const sortBox = document.getElementById("apm-sort-box");
const statusOpen = document.getElementById("apm-status-open");
const mobileItems = document.querySelectorAll(".APMMobileList .faq-item");


filterBtn.onclick = () => {
  filterMain.classList.toggle("active-main-content-flows");
  statusBox.classList.remove("active-main-content-flows");
  sortBox.classList.remove("active-main-content-flows");
};

statusOpen.onclick = () => {
  statusBox.classList.toggle("active-main-content-flows");
};

sortBtn.onclick = () => {
  sortBox.classList.toggle("active-main-content-flows");
  filterMain.classList.remove("active-main-content-flows");
  statusBox.classList.remove("active-main-content-flows");
};

document.addEventListener("click", e => {
  if (!e.target.closest(".filter-bar-wrapper")) {
    filterMain.classList.remove("active-main-content-flows");
    statusBox.classList.remove("active-main-content-flows");
    sortBox.classList.remove("active-main-content-flows");
  }
});

/* ===== STATUS FILTER ===== */

const statusCheckboxes = document.querySelectorAll("#apm-status-box input");
const rows = document.querySelectorAll(".APMTableRow");

function applyStatusFilter() {
  const selected = [...statusCheckboxes]
    .filter(cb => cb.checked)
    .map(cb => cb.dataset.status);

  // ===== TABLE FILTER =====
  rows.forEach(row => {
    const status = row.querySelector(".APMStatus")?.classList[1];
    row.style.display =
      selected.length === 0 || selected.includes(status) ? "" : "none";
  });

  // ===== MOBILE FILTER =====
  mobileItems.forEach(item => {
    const statusEl = item.querySelector(".APMStatus");
    const status = statusEl?.classList[1];

    item.style.display =
      selected.length === 0 || selected.includes(status) ? "" : "none";
  });
}


statusCheckboxes.forEach(cb => cb.addEventListener("change", applyStatusFilter));

/* ===== SORT BY QUANTITY ===== */

const sortRadios = document.querySelectorAll("#apm-sort-box input");

sortRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    const type = radio.dataset.sort;
    const tbody = document.querySelector(".APMTableBody");
    const rowsArr = [...rows];

    const filtered = rowsArr.filter(row => {
      const qty = parseInt(row.children[4].innerText);

      if (type === "lt500") return qty < 500;
      if (type === "lt1000") return qty < 1000;
      if (type === "gt1000") return qty > 1000;
      if (type === "gt2000") return qty > 2000;
    });

    tbody.innerHTML = "";
    filtered.forEach(r => tbody.appendChild(r));



    // MOBILE SORT ALSO
const sortedMobile = [...mobileItems].filter(item => {
  const qtyText = item.querySelector(".all-answers div:nth-child(2) span:last-child")
                    ?.innerText || "0";
  const qty = parseInt(qtyText);

  if (type === "lt500") return qty < 500;
  if (type === "lt1000") return qty < 1000;
  if (type === "gt1000") return qty > 1000;
  if (type === "gt2000") return qty > 2000;
});

const mobileContainer = document.querySelector(".APMMobileList");
mobileContainer.innerHTML = "";
sortedMobile.forEach(i => mobileContainer.appendChild(i));

  });

  
});


// Mobile FAQ toggle
document.addEventListener("click", function(e){

  // Expand / collapse card
  const question = e.target.closest(".main-faq-question");
  if(question){
    const faq = question.closest(".faq-item");
    faq.classList.toggle("active");
  }

  // 3 dots menu
//   if(e.target.classList.contains("mobile-three-dots")){
//     e.stopPropagation();

//     const box = e.target.closest(".faq-item")
//                         .querySelector(".show-threedots-box");

//     document.querySelectorAll(".show-threedots-box")
//       .forEach(b => b.classList.remove("active-preview"));

//     box.classList.add("active-preview");
//   }

  // Close outside
  if(!e.target.closest(".show-threedots-box")){
    document.querySelectorAll(".show-threedots-box")
      .forEach(b => b.classList.remove("active-preview"));
  }

});


document.addEventListener("click", e=>{
  if(e.target.textContent === "View"){
     window.location.href = "../html/adminProductOverview.html";
  }
});

});
