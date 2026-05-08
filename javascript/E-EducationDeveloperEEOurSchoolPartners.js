const filterBtn = document.getElementById("EEDEEOSP-filterBtn");
const sortBtn = document.getElementById("EEDEEOSP-sortBtn");
const filterPopup = document.getElementById("EEDEEOSP-filterPopup");
const sortPopup = document.getElementById("EEDEEOSP-sortPopup");
const clearBtn = document.querySelector(".EEDEEOSP-clear");
const applyBtn = document.querySelector(".EEDEEOSP-apply");
const tableBody = document.querySelector(".EEDEEOSP-table");
const countDesktop = document.querySelector(".EEDEEOSP-count");
const countMobile = document.querySelector(".EEDEEOSP-mob-count");

const filterGroups = filterPopup.querySelectorAll(
  ".EEDEEOSP-filter-group select",
);
const selBranch = filterGroups[0];
const selCity = filterGroups[1];
const selState = filterGroups[2];

const allDataRows = [
  ...tableBody.querySelectorAll(".EEDEEOSP-row:not(.EEDEEOSP-header-row)"),
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
noRowsEl.className = "EEDEEOSP-no-rows";
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

  const mobileItemCount =
    document.querySelectorAll(".EEDEEOSP-acc-item").length;
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

document.querySelectorAll(".EEDEEOSP-acc-header").forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.closest(".EEDEEOSP-acc-item");
    const body = item.querySelector(".EEDEEOSP-acc-body");
    const arrow = header.querySelector(".EEDEEOSP-arrow");
    const wasOpen = item.classList.contains("active");

    document.querySelectorAll(".EEDEEOSP-acc-item").forEach((i) => {
      i.classList.remove("active");
      i.querySelector(".EEDEEOSP-acc-body")?.classList.remove("active");
      const a = i.querySelector(".EEDEEOSP-arrow");
      if (a) a.style.transform = "rotate(0deg)";
    });

    if (!wasOpen) {
      item.classList.add("active");
      body?.classList.add("active");
      if (arrow) arrow.style.transform = "rotate(180deg)";
    }
  });
});

// MODAL OPEN/CLOSE
const addBtn = document.querySelector(".EEDEEOSP-add");
const floatingBtn = document.querySelector(".EEDEEOSP-floating-plus-btn");
const sponsorModal = document.getElementById("sponsorModal");
const closeModalBtn = document.getElementById("closeModal");

// Open modal from desktop add button
if (addBtn) {
  addBtn.addEventListener("click", () => {
    sponsorModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  });
}

// Open modal from mobile floating button
if (floatingBtn) {
  floatingBtn.addEventListener("click", () => {
    sponsorModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  });
}

// Close modal from close button
if (closeModalBtn) {
  closeModalBtn.addEventListener("click", () => {
    sponsorModal.style.display = "none";
    document.body.style.overflow = "auto";
  });
}

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === sponsorModal) {
    sponsorModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// ================= MODAL FORM FUNCTIONALITY =================

const orgNameInput = document.getElementById("orgName");
const branchNameInput = document.getElementById("branchName");
const citySelect = document.getElementById("citySelect");
const stateSelect = document.getElementById("stateSelect");
const logoUpload = document.getElementById("logoUpload");
const uploadBox = document.getElementById("uploadBox");
const publishModalBtn = document.getElementById("publishModalBtn");

const orgNameError = document.getElementById("orgNameError");
const branchNameError = document.getElementById("branchNameError");
const cityError = document.getElementById("cityError");
const stateError = document.getElementById("stateError");
const logoError = document.getElementById("logoError");

const desktopTable = document.querySelector(".EEDEEOSP-table");
const mobileItems = document.querySelector(".EEDEEOSP-mobile-itmes");

// ================= CITY / STATE OPTIONS =================

const cities = ["Mumbai", "Delhi", "Bangalore", "Pune", "Chennai", "Kolkata"];

const states = [
  "Maharashtra",
  "Delhi",
  "Karnataka",
  "Tamil Nadu",
  "West Bengal",
];

cities.forEach((city) => {
  const option = document.createElement("option");
  option.value = city;
  option.textContent = city;
  citySelect.appendChild(option);
});

states.forEach((state) => {
  const option = document.createElement("option");
  option.value = state;
  option.textContent = state;
  stateSelect.appendChild(option);
});

// ================= ALLOW ONLY CHARACTERS =================

function allowOnlyCharacters(inputField) {
  inputField.addEventListener("input", () => {
    inputField.value = inputField.value.replace(/[^a-zA-Z\s]/g, "");
  });
}

allowOnlyCharacters(orgNameInput);
allowOnlyCharacters(branchNameInput);

// ================= IMAGE UPLOAD =================

let uploadedLogo = "";

uploadBox.addEventListener("click", () => {
  logoUpload.click();
});

logoUpload.addEventListener("change", () => {
  const file = logoUpload.files[0];

  if (!file) return;

  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "image/svg+xml",
  ];

  if (!allowedTypes.includes(file.type)) {
    logoError.style.display = "block";
    logoError.textContent = "Only image files are allowed";
    logoUpload.value = "";
    uploadBox.textContent = "Upload here";
    uploadedLogo = "";
    return;
  }

  logoError.style.display = "none";

  uploadedLogo = URL.createObjectURL(file);

  uploadBox.textContent = file.name;
});

// ================= SHOW ERROR =================

function showError(element, message) {
  element.style.display = "block";
  element.textContent = message;
}

function hideError(element) {
  element.style.display = "none";
}

// ================= ADD DATA =================

publishModalBtn.addEventListener("click", () => {
  let isValid = true;

  const orgName = orgNameInput.value.trim();
  const branchName = branchNameInput.value.trim();
  const city = citySelect.value;
  const state = stateSelect.value;

  // ORG NAME
  if (orgName === "") {
    showError(orgNameError, "Organization name is required");
    isValid = false;
  } else {
    hideError(orgNameError);
  }

  // BRANCH
  if (branchName === "") {
    showError(branchNameError, "Branch is required");
    isValid = false;
  } else {
    hideError(branchNameError);
  }

  // CITY
  if (city === "") {
    showError(cityError, "City is required");
    isValid = false;
  } else {
    hideError(cityError);
  }

  // STATE
  if (state === "") {
    showError(stateError, "State is required");
    isValid = false;
  } else {
    hideError(stateError);
  }

  // LOGO
  if (uploadedLogo === "") {
    showError(logoError, "Logo is required");
    isValid = false;
  } else {
    hideError(logoError);
  }

  if (!isValid) return;

  // ================= DESKTOP ROW =================

  const desktopRow = document.createElement("div");
  desktopRow.className = "EEDEEOSP-row";

  desktopRow.innerHTML = `
    <div class="EEDEEOSP-school">
      <img src="${uploadedLogo}" alt="School Logo" />
      <span>${orgName}</span>
    </div>

    <div>${branchName}</div>

    <div>${city}</div>

    <div>${state}</div>

    <div class="EEDEEOSP-action">
      <label class="EEDEEOSP-switch">
        <input type="checkbox" checked />
        <span class="EEDEEOSP-slider"></span>
      </label>
    </div>
  `;

  desktopTable.appendChild(desktopRow);

  // ================= MOBILE CARD =================

  const mobileCard = document.createElement("div");

  mobileCard.className = "EEDEEOSP-acc-item";

  mobileCard.innerHTML = `
    <div class="EEDEEOSP-acc-header">
      <div class="EEDEEOSP-workshop">
        <img src="${uploadedLogo}" />
        <span>${orgName}</span>
      </div>

      <img
        src="../assets/E-EducationAdminSchoolPartners/down.png"
        class="EEDEEOSP-arrow"
      />
    </div>

    <div class="EEDEEOSP-acc-body">
      <div>
        <span>Branch</span>
        <span>${branchName}</span>
      </div>

      <div>
        <span>City</span>
        <span>${city}</span>
      </div>

      <div>
        <span>State</span>
        <span>${state}</span>
      </div>

      <div class="action-row">
        <span>Action</span>

        <div class="EEDEEOSP-mob-action">
          <label class="EEDEEOSP-mob-switch">
            <input type="checkbox" checked />
            <span class="EEDEEOSP-mob-slider"></span>
          </label>
        </div>
      </div>
    </div>
  `;

  mobileItems.appendChild(mobileCard);

  // ================= MOBILE ACCORDION =================

  const header = mobileCard.querySelector(".EEDEEOSP-acc-header");

  header.addEventListener("click", () => {
    const item = header.closest(".EEDEEOSP-acc-item");
    const body = item.querySelector(".EEDEEOSP-acc-body");
    const arrow = header.querySelector(".EEDEEOSP-arrow");

    const wasOpen = item.classList.contains("active");

    document.querySelectorAll(".EEDEEOSP-acc-item").forEach((i) => {
      i.classList.remove("active");

      i.querySelector(".EEDEEOSP-acc-body")?.classList.remove("active");

      const a = i.querySelector(".EEDEEOSP-arrow");

      if (a) {
        a.style.transform = "rotate(0deg)";
      }
    });

    if (!wasOpen) {
      item.classList.add("active");

      body.classList.add("active");

      arrow.style.transform = "rotate(180deg)";
    }
  });

  // ================= RESET FORM =================

  orgNameInput.value = "";
  branchNameInput.value = "";
  citySelect.value = "";
  stateSelect.value = "";
  logoUpload.value = "";
  uploadBox.textContent = "Upload here";

  uploadedLogo = "";

  // ================= CLOSE MODAL =================

  sponsorModal.style.display = "none";
  document.body.style.overflow = "auto";
});
