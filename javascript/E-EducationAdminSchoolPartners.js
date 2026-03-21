const filterBtn = document.getElementById("EEASP-filterBtn");
const sortBtn = document.getElementById("EEASP-sortBtn");
const filterPopup = document.getElementById("EEASP-filterPopup");
const sortPopup = document.getElementById("EEASP-sortPopup");
const clearBtn = document.querySelector(".EEASP-clear");
const applyBtn = document.querySelector(".EEASP-apply");
const tableBody = document.querySelector(".EEASP-table");
const countDesktop = document.querySelector(".EEASP-count");
const countMobile = document.querySelector(".EEASP-mob-count");

const filterGroups = filterPopup.querySelectorAll(".EEASP-filter-group select");
const selBranch = filterGroups[0];
const selCity = filterGroups[1];
const selState = filterGroups[2];

const allDataRows = [
  ...tableBody.querySelectorAll(".EEASP-row:not(.EEASP-header-row)"),
];

const schoolData = allDataRows.map((row) => {
  const cells = row.querySelectorAll(":scope > div");
  return {
    el: row,
    name: cells[0]?.querySelector("span")?.textContent.trim() ?? "",
    branch: cells[1]?.textContent.trim() ?? "",
    city: cells[2]?.textContent.trim() ?? "",
    state: cells[3]?.textContent.trim() ?? "",
  };
});

function populateDropdown(selectEl, key) {
  const unique = [
    ...new Set(schoolData.map((d) => d[key]).filter(Boolean)),
  ].sort();
  selectEl.innerHTML = '<option value="">All</option>';
  unique.forEach((v) => {
    const opt = document.createElement("option");
    opt.value = v;
    opt.textContent = v;
    selectEl.appendChild(opt);
  });
}

populateDropdown(selBranch, "branch");
populateDropdown(selCity, "city");
populateDropdown(selState, "state");

const noRowsEl = document.createElement("div");
noRowsEl.className = "EEASP-no-rows";
noRowsEl.textContent = "No records found";
Object.assign(noRowsEl.style, {
  padding: "30px",
  textAlign: "center",
  color: "#888",
  fontSize: "14px",
  display: "none",
});
tableBody.appendChild(noRowsEl);

let activeFilters = { branch: "", city: "", state: "" };
let activeSort = "nameAsc";

function render() {
  const filtered = schoolData.filter((d) => {
    if (activeFilters.branch && d.branch !== activeFilters.branch) return false;
    if (activeFilters.city && d.city !== activeFilters.city) return false;
    if (activeFilters.state && d.state !== activeFilters.state) return false;
    return true;
  });

  filtered.sort((a, b) => {
    switch (activeSort) {
      case "nameAsc":
        return a.name.localeCompare(b.name);
      case "nameDesc":
        return b.name.localeCompare(a.name);
      case "city":
        return a.city.localeCompare(b.city);
      case "state":
        return a.state.localeCompare(b.state);
      default:
        return 0;
    }
  });

  schoolData.forEach((d) => d.el.remove());

  filtered.forEach((d) => tableBody.appendChild(d.el));

  noRowsEl.style.display = filtered.length === 0 ? "block" : "none";

  if (countDesktop) countDesktop.textContent = `${filtered.length} Ongoing`;

  const mobileItemCount = document.querySelectorAll(".EEASP-acc-item").length;
  if (countMobile) countMobile.textContent = `${mobileItemCount} Ongoing`;
}

render();

filterBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  filterPopup.classList.toggle("active");
  sortPopup.classList.remove("active");
});

sortBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  sortPopup.classList.toggle("active");
  filterPopup.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (!filterPopup.contains(e.target) && e.target !== filterBtn) {
    filterPopup.classList.remove("active");
  }
  if (!sortPopup.contains(e.target) && e.target !== sortBtn) {
    sortPopup.classList.remove("active");
  }
});

clearBtn.addEventListener("click", () => {
  selBranch.value = "";
  selCity.value = "";
  selState.value = "";
  activeFilters = { branch: "", city: "", state: "" };
  render();
});

applyBtn.addEventListener("click", () => {
  activeFilters.branch = selBranch.value;
  activeFilters.city = selCity.value;
  activeFilters.state = selState.value;
  filterPopup.classList.remove("active");
  render();
});

sortPopup.querySelectorAll('input[type="radio"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.checked) {
      activeSort = radio.id;
      render();
    }
  });
});

document.querySelectorAll(".EEASP-acc-header").forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.closest(".EEASP-acc-item");
    const body = item.querySelector(".EEASP-acc-body");
    const arrow = header.querySelector(".EEASP-arrow");
    const wasOpen = item.classList.contains("active");

    document.querySelectorAll(".EEASP-acc-item").forEach((i) => {
      i.classList.remove("active");
      i.querySelector(".EEASP-acc-body")?.classList.remove("active");
      const a = i.querySelector(".EEASP-arrow");
      if (a) a.style.transform = "rotate(0deg)";
    });

    if (!wasOpen) {
      item.classList.add("active");
      body?.classList.add("active");
      if (arrow) arrow.style.transform = "rotate(180deg)";
    }
  });
});
