// JS updated for static HTML table (rows moved from JS to HTML)

document.addEventListener("click", function (e) {
  document.querySelectorAll(".action-menu").forEach((menu) => {
    menu.classList.remove("show");
  });

  if (e.target.classList.contains("three-dots")) {
    const wrapper = e.target.closest(".action-wrapper");
    const menu = wrapper?.querySelector(".action-menu");
    if (menu) menu.classList.toggle("show");
    e.stopPropagation();
  }
});

const searchInput = document.getElementById("searchInput");
const pageDataEl = document.querySelector(".page-data");
const rows = document.querySelectorAll("#productTableBody tr");
const totalRows = rows.length;

function updatePageData() {
  let visibleCount = 0;

  rows.forEach((row) => {
    if (row.style.display !== "none") {
      visibleCount++;
    }
  });

  pageDataEl.textContent = `${visibleCount}/${totalRows}`;
}

searchInput.addEventListener("input", function () {
  const value = this.value.toLowerCase().trim();

  rows.forEach((row) => {
    const nameEl = row.querySelector(".product-name");
    const categoryEl = row.children[3];

    const nameText = nameEl ? nameEl.textContent.toLowerCase() : "";
    const categoryText = categoryEl ? categoryEl.textContent.toLowerCase() : "";

    if (nameText.includes(value) || categoryText.includes(value)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });

  updatePageData();
});

updatePageData();
