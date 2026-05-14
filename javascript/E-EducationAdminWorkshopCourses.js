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
  const filterBtn = document.getElementById("EEAWC-filterBtn");
  const sortBtn = document.getElementById("EEAWC-sortBtn");

  const filterPopup = document.getElementById("EEAWC-filterPopup");
  const sortPopup = document.getElementById("EEAWC-sortPopup");

  const table = document.querySelector(".EEAWC-table");
  const countText = document.querySelector(".EEAWC-count");

  let rows = Array.from(
    document.querySelectorAll(".EEAWC-table .EEAWC-row:not(.EEAWC-header-row)"),
  );

  // COUNT FUNCTION
  function updateCount() {
    const visibleRows = rows.filter((row) => row.style.display !== "none");

    countText.innerText = visibleRows.length + " Ongoing";
  }

  // NO ROW FOUND MESSAGE
  function checkNoRows() {
    const visibleRows = rows.filter((row) => row.style.display !== "none");

    let noRow = document.getElementById("EEAWC-noRow");

    if (visibleRows.length === 0) {
      if (!noRow) {
        noRow = document.createElement("div");
        noRow.id = "EEAWC-noRow";
        noRow.className = "EEAWC-row";
        noRow.style.textAlign = "center";
        noRow.style.padding = "20px";
        noRow.innerHTML = "No rows found";

        table.appendChild(noRow);
      }
    } else {
      if (noRow) noRow.remove();
    }
  }

  // FILTER POPUP TOGGLE
  filterBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    filterPopup.style.display =
      filterPopup.style.display === "block" ? "none" : "block";

    sortPopup.style.display = "none";
  });

  // SORT POPUP TOGGLE
  sortBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    sortPopup.style.display =
      sortPopup.style.display === "block" ? "none" : "block";

    filterPopup.style.display = "none";
  });

  // CLICK OUTSIDE CLOSE POPUP
  document.addEventListener("click", function () {
    filterPopup.style.display = "none";
    sortPopup.style.display = "none";
  });

  // FILTER LOGIC
  const checkboxes = document.querySelectorAll(
    "#EEAWC-filterPopup input[type='checkbox']",
  );

  checkboxes.forEach((box) => {
    box.addEventListener("change", function () {
      const selected = Array.from(checkboxes)
        .filter((c) => c.checked)
        .map((c) => c.value);

      rows.forEach((row) => {
        const status = row
          .querySelector(".EEAWC-status-col span")
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

  // SORT FUNCTIONS

  const sortOptions = document.querySelectorAll("#EEAWC-sortPopup p");

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

  // HELPERS

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

  // INITIAL COUNT
  updateCount();
});

function updateMobCount() {
  const mobCount = document.querySelector(".EEAWC-mob-count");
  if (!mobCount) return;

  const mobItems = document.querySelectorAll(".EEAWC-acc-item");
  mobCount.innerText = `${mobItems.length} Ongoing`;
}

updateMobCount();

const accHeaders = document.querySelectorAll(".EEAWC-acc-header");

accHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    const body = header.nextElementSibling;
    const arrow = header.querySelector(".EEAWC-arrow");

    body.classList.toggle("active");
    item.classList.toggle("active");

    arrow.style.transform = body.classList.contains("active")
      ? "rotate(180deg)"
      : "rotate(0deg)";
  });
});

document.querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(7)").classList.add("sidebar-active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(4)").classList.add("active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(4)>li:nth-child(3)").classList.add("submenu-active-highlight");


document.querySelector("#account-menu .mobile-dropdown:nth-child(7) .dropdown-header").classList.add("dropdown-header-active");
document.querySelector("#account-menu .mobile-dropdown:nth-child(7)").classList.add("active-mobile-submenu");
document.querySelector("#account-menu .mobile-dropdown:nth-child(7) li:nth-child(3)").classList.add("submenu-active-page");
