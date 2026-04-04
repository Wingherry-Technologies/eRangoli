const filterBtn = document.getElementById("EEDUWT-filterBtn");
const sortBtn = document.getElementById("EEDUWT-sortBtn");

const filterPopup = document.getElementById("EEDUWT-filterPopup");
const sortPopup = document.getElementById("EEDUWT-sortPopup");

const rows = document.querySelectorAll(".EEDUWT-row:not(.EEDUWT-header-row)");
const countText = document.querySelector(".EEDUWT-count");

/* POPUP TOGGLE */
filterBtn.onclick = () => {
  filterPopup.style.display =
    filterPopup.style.display === "block" ? "none" : "block";
  sortPopup.style.display = "none";
};

sortBtn.onclick = () => {
  sortPopup.style.display =
    sortPopup.style.display === "block" ? "none" : "block";
  filterPopup.style.display = "none";
};

/* CLICK OUTSIDE CLOSE */
document.addEventListener("click", (e) => {
  if (!filterPopup.contains(e.target) && e.target !== filterBtn) {
    filterPopup.style.display = "none";
  }
  if (!sortPopup.contains(e.target) && e.target !== sortBtn) {
    sortPopup.style.display = "none";
  }
});

/* FILTER */
const checkboxes = document.querySelectorAll(
  "#EEDUWT-filterPopup input[type='checkbox']",
);

checkboxes.forEach((cb) => {
  cb.addEventListener("change", applyFilter);
});

function applyFilter() {
  let selected = [];

  checkboxes.forEach((cb) => {
    if (cb.checked) selected.push(cb.value);
  });

  rows.forEach((row) => {
    const type = row.children[1].innerText;
    const location = row.children[3].innerText;

    if (
      selected.length === 0 ||
      selected.includes(type) ||
      selected.includes(location)
    ) {
      row.style.display = "grid";
    } else {
      row.style.display = "none";
    }
  });

  updateCount();
}

/* SORT */
function sortTable(type) {
  const table = document.querySelector(".EEDUWT-table");
  const rowsArray = Array.from(rows);

  if (type === "price") {
    rowsArray.sort((a, b) => {
      const priceA = parseInt(a.children[4].innerText.replace("₹", ""));
      const priceB = parseInt(b.children[4].innerText.replace("₹", ""));
      return priceA - priceB;
    });
  }

  if (type === "date") {
    rowsArray.sort((a, b) => {
      const dateA = new Date(a.children[5].innerText);
      const dateB = new Date(b.children[5].innerText);
      return dateB - dateA;
    });
  }

  rowsArray.forEach((row) => table.appendChild(row));
}

/* COUNT */
function updateCount() {
  let visible = 0;

  rows.forEach((row) => {
    if (row.style.display !== "none") visible++;
  });

  countText.innerText = `${visible} Ongoing`;
}

/* INIT COUNT */
updateCount();

/* MOBILE COUNT */
function updateMobCount() {
  const mobCount = document.querySelector(".EEDUWT-mob-count");
  if (!mobCount) return;
  const mobItems = document.querySelectorAll(".EEDUWT-acc-item");
  mobCount.innerText = `${mobItems.length} Ongoing`;
}

updateMobCount();

const accHeaders = document.querySelectorAll(".EEDUWT-acc-header");

accHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    const body = header.nextElementSibling;
    const arrow = header.querySelector(".EEDUWT-arrow");

    body.classList.toggle("active");
    item.classList.toggle("active");

    arrow.style.transform = body.classList.contains("active")
      ? "rotate(180deg)"
      : "rotate(0deg)";
  });
});

/* CALENDAR POPUP */

(function () {
  /* Build calendar DOM once and reuse */
  const overlay = document.createElement("div");
  overlay.className = "EEDUWT-cal-overlay";

  const cal = document.createElement("div");
  cal.className = "EEDUWT-cal-popup";
  cal.innerHTML = `
    <div class="EEDUWT-cal-nav">
      <button id="EEDUWT-cal-prev">&#8249;</button>
      <span id="EEDUWT-cal-label"></span>
      <button id="EEDUWT-cal-next">&#8250;</button>
    </div>
    <div class="EEDUWT-cal-days">
      <span>Su</span><span>Mo</span><span>Tu</span><span>We</span>
      <span>Th</span><span>Fr</span><span>Sa</span>
    </div>
    <div class="EEDUWT-cal-dates" id="EEDUWT-cal-dates"></div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(cal);

  const label = cal.querySelector("#EEDUWT-cal-label");
  const datesGrid = cal.querySelector("#EEDUWT-cal-dates");
  const prevBtn = cal.querySelector("#EEDUWT-cal-prev");
  const nextBtn = cal.querySelector("#EEDUWT-cal-next");

  let viewYear, viewMonth;
  let targetEl = null;

  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  /* Format date as DD/MM/YY */
  function formatDate(y, m, d) {
    const dd = String(d).padStart(2, "0");
    const mm = String(m + 1).padStart(2, "0");
    const yy = String(y).slice(-2);
    return `${dd}/${mm}/${yy}`;
  }

  function renderCalendar() {
    label.textContent = `${MONTHS[viewMonth]} ${viewYear}`;
    datesGrid.innerHTML = "";

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement("button");
      empty.className = "empty";
      datesGrid.appendChild(empty);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const btn = document.createElement("button");
      btn.textContent = d;

      const thisDate = new Date(viewYear, viewMonth, d);
      thisDate.setHours(0, 0, 0, 0);

      if (thisDate < tomorrow) {
        btn.disabled = true;
      } else {
        btn.addEventListener("click", () => {
          if (targetEl) {
            targetEl.textContent = formatDate(viewYear, viewMonth, d);
          }
          closeCalendar();
        });
      }

      datesGrid.appendChild(btn);
    }

    const now = new Date();
    prevBtn.disabled =
      viewYear < now.getFullYear() ||
      (viewYear === now.getFullYear() && viewMonth <= now.getMonth());
  }

  function openCalendar(iconEl, dateTarget) {
    targetEl = dateTarget;

    const rect = iconEl.getBoundingClientRect();
    const calW = 280;
    const calH = 260;

    let left = rect.left;
    let top = rect.bottom + 6;

    if (left + calW > window.innerWidth - 8) {
      left = window.innerWidth - calW - 8;
    }
    if (top + calH > window.innerHeight - 8) {
      top = rect.top - calH - 6;
    }

    cal.style.left = `${left}px`;
    cal.style.top = `${top}px`;

    const now = new Date();
    viewYear = now.getFullYear();
    viewMonth = now.getMonth();
    renderCalendar();

    overlay.classList.add("active");
    cal.classList.add("active");
  }

  function closeCalendar() {
    overlay.classList.remove("active");
    cal.classList.remove("active");
    targetEl = null;
  }

  /* Prev / Next month navigation */
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const now = new Date();
    if (viewMonth === 0) {
      viewMonth = 11;
      viewYear--;
    } else {
      viewMonth--;
    }
    if (
      viewYear < now.getFullYear() ||
      (viewYear === now.getFullYear() && viewMonth < now.getMonth())
    ) {
      viewMonth = now.getMonth();
      viewYear = now.getFullYear();
    }
    renderCalendar();
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      viewMonth = 0;
      viewYear++;
    } else {
      viewMonth++;
    }
    renderCalendar();
  });

  overlay.addEventListener("click", closeCalendar);

  cal.addEventListener("click", (e) => e.stopPropagation());

  document.querySelectorAll(".calendar").forEach((icon) => {
    icon.addEventListener("click", (e) => {
      e.stopPropagation();
      const row = icon.closest(".EEDUWT-row");
      if (!row) return;
      const scheduledCell = row.children[5];
      openCalendar(icon, scheduledCell);
    });
  });
  document.querySelectorAll(".EEDUWT-mob-calendar").forEach((icon) => {
    icon.addEventListener("click", (e) => {
      e.stopPropagation();
      const row = icon.closest("div");
      if (!row) return;
      const valueSpan = row.querySelector("span:nth-child(2)");
      openCalendar(icon, valueSpan);
    });
  });
})();
