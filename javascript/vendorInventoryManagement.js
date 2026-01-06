const totalStocks=document.querySelectorAll(".total-stock");

totalStocks.forEach(totalStock => {
  const countofStock=totalStock.innerHTML;
  if(countofStock>99){
    totalStock.style.backgroundColor="#C9E1C7"
    totalStock.style.color="#3F3F3F"
  }
  else if(countofStock>10){
    totalStock.style.backgroundColor="#FAC097"
    totalStock.style.color="#3F3F3F"
  }
  else if(countofStock<=10){
    totalStock.style.backgroundColor="#FF4B4B"
    totalStock.style.color="#FFF"
  }
});

// Three Dots
document.addEventListener("click", function (e) {
  const isThreeDot = e.target.classList.contains("three-dot");

  // Close all previews first
  document.querySelectorAll(".all-preview").forEach(popup => {
    popup.classList.remove("active-preview");
  });

  // If clicked on a 3-dot, open its popup
  if (isThreeDot) {
    e.stopPropagation(); // prevent immediate close
    const previewBox = e.target.closest(".previewing").querySelector(".all-preview");
    previewBox.classList.add("active-preview");
  }
});


// Filter option Logic

document.addEventListener("click", (e) => {
  if (!e.target.closest(".main-content-flows-main") &&
      !e.target.closest("#filter-bar-main-box") &&
      !e.target.closest("#sort-by-main-box")) {
    closeAll();
  }
});

const filterBtn = document.getElementById("filter-bar-main-box");
const sortBtn = document.getElementById("sort-by-main-box");

const filterMain = document.getElementById("filter-main");
const statusBox = document.getElementById("status-box");
const colourBox = document.getElementById("colour-box");
const sizeBox = document.getElementById("size-box");
const sortBox = document.getElementById("sort-box");

function closeAll() {
  document.querySelectorAll(".main-content-flows-main")
    .forEach(box => box.classList.remove("active-main-content-flows"));
}

function closeSubFilters() {
  statusBox.classList.remove("active-main-content-flows");
  colourBox.classList.remove("active-main-content-flows");
  sizeBox.classList.remove("active-main-content-flows");
}

// Filter icon
filterBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  closeAll();
  filterMain.classList.add("active-main-content-flows");
});

// Sort icon
sortBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  closeAll();
  sortBox.classList.add("active-main-content-flows");
});

// Filter menu options
document.querySelectorAll("#filter-main li").forEach(item => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();
    closeSubFilters();

    if (item.textContent.includes("Status")) statusBox.classList.add("active-main-content-flows");
    if (item.textContent.includes("Colour")) colourBox.classList.add("active-main-content-flows");
    if (item.textContent.includes("Size")) sizeBox.classList.add("active-main-content-flows");
  });
});

const rows = document.querySelectorAll(".table-products tbody tr");

document.querySelectorAll("#status-box input").forEach(cb => {
  cb.addEventListener("change", filterTable);
});

document.querySelectorAll("#colour-box input").forEach(cb => {
  cb.addEventListener("change", filterTable);
});

document.querySelectorAll("#size-box input").forEach(cb => {
  cb.addEventListener("change", filterTable);
});

function filterTable() {
  const selectedStatus = [...document.querySelectorAll("#status-box input:checked")]
    .map(cb => cb.nextElementSibling.textContent.trim().toLowerCase());

  const selectedSizes = [...document.querySelectorAll("#size-box input:checked")]
    .map(cb => cb.nextElementSibling.textContent.trim());

  const selectedColours = [...document.querySelectorAll("#colour-box input:checked")]
  .map(cb => cb.nextElementSibling.querySelector("span:last-child").textContent.trim().toLowerCase());
  console.log(selectedColours)


  rows.forEach(row => {
    const status = row.querySelector("td:last-child span").textContent.toLowerCase();
    const size = row.children[4].textContent.trim();

    // Assuming your color is stored in td[5] as a span with id/color
    const colour = row.children[5].querySelector("span").id.toLowerCase(); // or .textContent

    const statusMatch = !selectedStatus.length || selectedStatus.includes(status);
    const sizeMatch = !selectedSizes.length || selectedSizes.includes(size);
    const colourMatch = !selectedColours.length || selectedColours.includes(colour);

    row.style.display = statusMatch && sizeMatch && colourMatch ? "" : "none";
  });

}
// Select all filter options inside main filter
const filterOptions = document.querySelectorAll("#filter-main li");

filterOptions.forEach(option => {
  option.addEventListener("click", (e) => {
    // Remove active class from all options
    filterOptions.forEach(opt => opt.classList.remove("active-filter"));

    // Add active class to clicked option
    option.classList.add("active-filter");

    // Your existing logic: open sub filter boxes
    closeSubFilters(); // hide all sub-filters first

    const text = option.textContent.trim().toLowerCase();
    if (text === "status") statusBox.classList.add("active-main-content-flows");
    if (text === "colour") colourBox.classList.add("active-main-content-flows");
    if (text === "size") sizeBox.classList.add("active-main-content-flows");
  });
});

document.querySelectorAll("#sort-box input").forEach(rb => {
  rb.addEventListener("change", () => {
    sortTable(rb.id);
  });
});

function sortTable(sortId) {
  const tbody = document.querySelector(".table-products tbody");
  const rowsArray = Array.from(tbody.querySelectorAll("tr"));

  rowsArray.sort((a, b) => {
    let aVal, bVal;

    switch(sortId) {
      case "price-low-high":
        aVal = parseFloat(a.children[9].textContent.replace(/[₹,]/g, ""));
        bVal = parseFloat(b.children[9].textContent.replace(/[₹,]/g, ""));
        return aVal - bVal;

      case "price-high-low":
        aVal = parseFloat(a.children[9].textContent.replace(/[₹,]/g, ""));
        bVal = parseFloat(b.children[9].textContent.replace(/[₹,]/g, ""));
        return bVal - aVal;

      case "stock-low-high":
        aVal = parseInt(a.children[8].textContent);
        bVal = parseInt(b.children[8].textContent);
        return aVal - bVal;

      case "stock-high-low":
        aVal = parseInt(a.children[8].textContent);
        bVal = parseInt(b.children[8].textContent);
        return bVal - aVal;
    }
  });

  // Remove old rows and append sorted rows
  tbody.innerHTML = "";
  rowsArray.forEach(row => tbody.appendChild(row));
}



