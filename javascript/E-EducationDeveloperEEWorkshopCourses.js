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
    document.querySelector(".bottom-nav").style.display = "none";
    document.querySelector("body").style.overflow = "hidden";
    window.scrollTo(0, 0);
  } else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow = "auto";
    document.querySelector(".bottom-nav").style.display = "flex";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const filterBtn = document.getElementById("EEDWCT-filterBtn");
  const sortBtn = document.getElementById("EEDWCT-sortBtn");

  const filterPopup = document.getElementById("EEDWCT-filterPopup");
  const sortPopup = document.getElementById("EEDWCT-sortPopup");

  const table = document.querySelector(".EEDWCT-table");
  const countText = document.querySelector(".EEDWCT-count");

  let rows = Array.from(
    document.querySelectorAll(
      ".EEDWCT-table .EEDWCT-row:not(.EEDWCT-header-row)",
    ),
  );

  function updateCount() {
    const visibleRows = rows.filter((row) => row.style.display !== "none");

    countText.innerText = visibleRows.length + " Ongoing";
  }

  function checkNoRows() {
    const visibleRows = rows.filter((row) => row.style.display !== "none");

    let noRow = document.getElementById("EEDWCT-noRow");

    if (visibleRows.length === 0) {
      if (!noRow) {
        noRow = document.createElement("div");
        noRow.id = "EEDWCT-noRow";
        noRow.className = "EEDWCT-row";
        noRow.style.textAlign = "center";
        noRow.style.padding = "20px";
        noRow.innerHTML = "No rows found";

        table.appendChild(noRow);
      }
    } else {
      if (noRow) noRow.remove();
    }
  }

  filterBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    filterPopup.style.display =
      filterPopup.style.display === "block" ? "none" : "block";

    sortPopup.style.display = "none";
  });

  sortBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    sortPopup.style.display =
      sortPopup.style.display === "block" ? "none" : "block";

    filterPopup.style.display = "none";
  });

  document.addEventListener("click", function () {
    filterPopup.style.display = "none";
    sortPopup.style.display = "none";
  });

  const checkboxes = document.querySelectorAll(
    "#EEDWCT-filterPopup input[type='checkbox']",
  );

  checkboxes.forEach((box) => {
    box.addEventListener("change", function () {
      const selected = Array.from(checkboxes)
        .filter((c) => c.checked)
        .map((c) => c.value);

      rows.forEach((row) => {
        const status = row
          .querySelector(".EEDWCT-status-col span")
          .innerText.trim();

        if (selected.length === 0 || selected.includes(status)) {
          row.style.display = "grid";
        } else {
          row.style.display = "none";
        }
      });

      updateCount();
      checkNoRows();
    });
  });

  const sortOptions = document.querySelectorAll("#EEDWCT-sortPopup p");

  sortOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const text = option.innerText;

      if (text.includes("Latest")) {
        rows.sort((a, b) => {
          return getDate(b) - getDate(a);
        });
      }

      if (text.includes("Oldest")) {
        rows.sort((a, b) => {
          return getDate(a) - getDate(b);
        });
      }

      if (text.includes("High to Low") && text.includes("Amount")) {
        rows.sort((a, b) => {
          return getAmount(b) - getAmount(a);
        });
      }

      if (text.includes("Low to High") && text.includes("Amount")) {
        rows.sort((a, b) => {
          return getAmount(a) - getAmount(b);
        });
      }

      renderRows();
    });
  });

  function getDate(row) {
    const dateText = row.children[1].innerText;
    const parts = dateText.split("/");

    return new Date("20" + parts[2], parts[1] - 1, parts[0]);
  }

  function getAmount(row) {
    const text = row.children[4].innerText.replace(/[₹,]/g, "");
    return parseInt(text);
  }

  function renderRows() {
    rows.forEach((row) => table.appendChild(row));
  }

  updateCount();
});

function updateMobCount() {
  const mobCount = document.querySelector(".EEDWCT-mob-count");
  if (!mobCount) return;
  const mobItems = document.querySelectorAll(".EEDWCT-acc-item");
  mobCount.innerText = `${mobItems.length} Ongoing`;
}

updateMobCount();

const accHeaders = document.querySelectorAll(".EEDWCT-acc-header");

accHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    const body = header.nextElementSibling;
    const arrow = header.querySelector(".EEDWCT-arrow");

    body.classList.toggle("active");
    item.classList.toggle("active");

    arrow.style.transform = body.classList.contains("active")
      ? "rotate(180deg)"
      : "rotate(0deg)";
  });
});

const modal = document.getElementById("sponsorModal");
const closeModal = document.getElementById("closeModal");
const addNewBtn = document.querySelector(".add-new-btn");
const floatingPlusBtn = document.querySelector(".EEDWCT-floating-plus-btn");

function openModal() {
  modal.style.display = "flex";
  clearAllModalErrors();
  resetModalFields();
}

function closeModalFn() {
  modal.style.display = "none";
}

if (addNewBtn) addNewBtn.addEventListener("click", openModal);
if (floatingPlusBtn) floatingPlusBtn.addEventListener("click", openModal);
if (closeModal) closeModal.addEventListener("click", closeModalFn);

window.addEventListener("click", function (e) {
  if (e.target === modal) closeModalFn();
});

document
  .querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(5)")
  .classList.add("sidebar-active");
document
  .querySelector(".sidebar-main-vendor ul>ul:nth-of-type(3)")
  .classList.add("active");
document
  .querySelector(".sidebar-main-vendor ul>ul:nth-of-type(3)>li:nth-child(4)")
  .classList.add("submenu-active-highlight");

document
  .querySelector("#account-menu .mobile-dropdown:nth-child(5) .dropdown-header")
  .classList.add("dropdown-header-active");
document
  .querySelector("#account-menu .mobile-dropdown:nth-child(5)")
  .classList.add("active-mobile-submenu");
document
  .querySelector("#account-menu .mobile-dropdown:nth-child(5) li:nth-child(4)")
  .classList.add("submenu-active-page");

// Add Workshop Popup

const addBtn = document.querySelector(".EEDWCT-add");
const workshopModal = document.getElementById("EEDWCT-modal");
const closeWorkshopModal = document.getElementById("EEDWCT-close");
const floatingBtn = document.querySelector(".EEDWCT-floating-plus-btn");

function openWorkshopModal() {
  workshopModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeWorkshopPopup() {
  workshopModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

if (addBtn) {
  addBtn.addEventListener("click", openWorkshopModal);
}

if (floatingBtn) {
  floatingBtn.addEventListener("click", openWorkshopModal);
}

if (closeWorkshopModal) {
  closeWorkshopModal.addEventListener("click", closeWorkshopPopup);
}

window.addEventListener("click", (e) => {
  if (e.target === workshopModal) {
    closeWorkshopPopup();
  }
});

// Schedule Popup

const firstContinueBtn = document.querySelector(
  "#EEDWCT-modal .EEDWCT-continue-btn",
);

const scheduleModal = document.getElementById("EEDWCT-schedule-modal");

const scheduleCloseBtn = document.getElementById("EEDWCT-schedule-close");

if (firstContinueBtn) {
  firstContinueBtn.addEventListener("click", () => {
    // First popup hide
    workshopModal.classList.remove("active");

    // Second popup show
    scheduleModal.classList.add("active");
  });
}

if (scheduleCloseBtn) {
  scheduleCloseBtn.addEventListener("click", () => {
    scheduleModal.classList.remove("active");
    document.body.style.overflow = "auto";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === scheduleModal) {
    scheduleModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Coordinator Popup

const scheduleContinueBtn = document.querySelector(
  "#EEDWCT-schedule-modal .EEDWCT-continue-btn",
);

const coordinatorModal = document.getElementById("EEDWCT-coordinator-modal");

const coordinatorCloseBtn = document.getElementById("EEDWCT-coordinator-close");

if (scheduleContinueBtn) {
  scheduleContinueBtn.addEventListener("click", () => {
    // Schedule popup hide
    scheduleModal.classList.remove("active");

    // Coordinator popup show
    coordinatorModal.classList.add("active");
  });
}

if (coordinatorCloseBtn) {
  coordinatorCloseBtn.addEventListener("click", () => {
    coordinatorModal.classList.remove("active");
    document.body.style.overflow = "auto";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === coordinatorModal) {
    coordinatorModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});
