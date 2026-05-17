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


/* ===== ADD WORKSHOP MODAL ===== */

(function () {

  /* ══════════════════════════════════════
     POPUP 1 — Add Workshop
  ══════════════════════════════════════ */
  const overlay      = document.getElementById("EEDUWT-modal-overlay");
  const addBtn       = document.querySelector(".EEDUWT-add");
  const mobileAddBtn =
document.querySelector(".EEDUWT-floating-plus-btn");

  const closeBtn     = document.getElementById("EEDUWT-modal-close");

  const inputName     = document.getElementById("EEDUWT-input-name");
  const inputType     = document.getElementById("EEDUWT-input-type");
  const inputDuration = document.getElementById("EEDUWT-input-duration");
  const inputPrice    = document.getElementById("EEDUWT-input-price");
  const inputLocation = document.getElementById("EEDUWT-input-location");

  const errName     = document.getElementById("EEDUWT-err-name");
  const errType     = document.getElementById("EEDUWT-err-type");
  const errDuration = document.getElementById("EEDUWT-err-duration");
  const errPrice    = document.getElementById("EEDUWT-err-price");
  const errLocation = document.getElementById("EEDUWT-err-location");

  const btnNow   = document.getElementById("EEDUWT-btn-schedule-now");
  const btnLater = document.getElementById("EEDUWT-btn-schedule-later");

  /* Shared state between all three popups */
  let pendingWorkshop  = null;
  let pendingSchedule  = null;

  /* ── Open / Close Popup 1 ── */
  function openModal() {
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
    clearForm();
  }

  function clearForm() {
    inputName.value     = "";
    inputType.value     = "";
    inputDuration.value = "";
    inputPrice.value    = "";
    inputLocation.value = "";
    clearErrors1();
  }

  function clearErrors1() {
    [errName, errType, errDuration, errPrice, errLocation]
      .forEach(e => e.textContent = "");
    inputName.classList.remove("input-error");
    inputType.classList.remove("input-error");
    inputDuration.classList.remove("input-error");
    const wrap = document.querySelector(".EEDUWT-input-prefix-wrap");
    if (wrap) wrap.classList.remove("input-error");
    inputLocation.classList.remove("input-error");
  }

  addBtn.addEventListener("click", openModal);
  mobileAddBtn?.addEventListener(
"click",
openModal
);
  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", e => { if (e.target === overlay) closeModal(); });

  /* ── Duration auto-format ── */
  function parseDuration(raw) {
    const s = raw.trim().replace(/mins?/i, "").trim();
    let h, m;
    if (/^\d{1,2}:\d{2}$/.test(s))       { [h, m] = s.split(":").map(Number); }
    else if (/^\d{1,2}\s\d{2}$/.test(s)) { [h, m] = s.split(/\s+/).map(Number); }
    else if (/^\d{3,4}$/.test(s))        { m = parseInt(s.slice(-2), 10); h = parseInt(s.slice(0, -2), 10); }
    else return null;
    if (isNaN(h) || isNaN(m) || m > 59 || h < 0) return null;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}mins`;
  }

  inputDuration.addEventListener("blur", function () {
    const f = parseDuration(inputDuration.value);
    if (f) { inputDuration.value = f; errDuration.textContent = ""; inputDuration.classList.remove("input-error"); }
    else validateDuration(true);
  });

  /* ── Validators Popup 1 ── */
  function validateName(show) {
    const v = inputName.value.trim();
    const ok = /^[a-zA-Z\s]+$/.test(v) && v.length > 0;
    if (show) {
      errName.textContent = !v.length ? "Workshop name is required." : !ok ? "Only letters and spaces allowed." : "";
      inputName.classList.toggle("input-error", !ok);
    }
    return ok;
  }

  function validateType(show) {
    const ok = inputType.value !== "";
    if (show) { errType.textContent = ok ? "" : "Please select a type."; inputType.classList.toggle("input-error", !ok); }
    return ok;
  }

  function validateDuration(show) {
    const ok = !!parseDuration(inputDuration.value);
    if (show) { errDuration.textContent = ok ? "" : "Enter duration e.g. 2 30 or 02:30"; inputDuration.classList.toggle("input-error", !ok); }
    return ok;
  }

  function validatePrice(show) {
    const v = inputPrice.value.trim();
    const ok = /^\d+$/.test(v);
    const wrap = document.querySelector(".EEDUWT-input-prefix-wrap");
    if (show) {
      errPrice.textContent = !v.length ? "Price is required." : !ok ? "Numbers only." : "";
      if (wrap) wrap.classList.toggle("input-error", !ok);
    }
    return ok;
  }

  function validateLocation(show) {
    const ok = inputLocation.value !== "";
    if (show) { errLocation.textContent = ok ? "" : "Please select a location."; inputLocation.classList.toggle("input-error", !ok); }
    return ok;
  }

  inputName.addEventListener("blur",     () => validateName(true));
  inputType.addEventListener("change",   () => validateType(true));
  inputPrice.addEventListener("blur",    () => validatePrice(true));
  inputLocation.addEventListener("blur", () => validateLocation(true));

  function validateAll1() {
    const f = parseDuration(inputDuration.value);
    if (f) inputDuration.value = f;
    return validateName(true) & validateType(true) & validateDuration(true) & validatePrice(true) & validateLocation(true);
  }

  /* ══════════════════════════════════════
     POPUP 2 — Schedule Workshop
  ══════════════════════════════════════ */
  const scheduleOverlay  = document.getElementById("EEDUWT-schedule-overlay");
  const scheduleCloseBtn = document.getElementById("EEDUWT-schedule-close");
  const startDateInput   = document.getElementById("EEDUWT-start-date");
  const endDateInput     = document.getElementById("EEDUWT-end-date");
  const scheduleDuration = document.getElementById("EEDUWT-schedule-duration");
  const errStart         = document.getElementById("EEDUWT-err-start");
  const errEnd           = document.getElementById("EEDUWT-err-end");
  const continueBtn      = document.getElementById("EEDUWT-btn-continue");

  /* Set min date to today */
  function todayISO() {
    const n = new Date();
    return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`;
  }

  function openSchedulePopup() {
    /* ── FIX: pull duration from first popup, not dummy text ── */
    scheduleDuration.value = inputDuration.value || "";
    startDateInput.value   = "";
    endDateInput.value     = "";
    startDateInput.min     = todayISO();
    endDateInput.min       = todayISO();
    errStart.textContent   = "";
    errEnd.textContent     = "";
    startDateInput.classList.remove("input-error");
    endDateInput.classList.remove("input-error");
    scheduleOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeSchedulePopup() {
    scheduleOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  scheduleCloseBtn.addEventListener("click", closeSchedulePopup);
  scheduleOverlay.addEventListener("click", e => { if (e.target === scheduleOverlay) closeSchedulePopup(); });

  /* ── When start date changes, end date min = start date ── */
  startDateInput.addEventListener("change", function () {
    errStart.textContent = "";
    startDateInput.classList.remove("input-error");
    /* end date must be >= start date */
    endDateInput.min = startDateInput.value || todayISO();
    /* if end is already set and now less than start, clear it */
    if (endDateInput.value && endDateInput.value < startDateInput.value) {
      endDateInput.value = "";
    }
  });

  endDateInput.addEventListener("change", function () {
    errEnd.textContent = "";
    endDateInput.classList.remove("input-error");
  });

  /* Blur validators for popup 2 */
  startDateInput.addEventListener("blur", function () {
    if (!startDateInput.value) {
      errStart.textContent = "Please select a start date.";
      startDateInput.classList.add("input-error");
    }
  });

  endDateInput.addEventListener("blur", function () {
    if (!endDateInput.value) {
      errEnd.textContent = "Please select an end date.";
      endDateInput.classList.add("input-error");
    } else if (endDateInput.value < startDateInput.value) {
      errEnd.textContent = "End date must be on or after start date.";
      endDateInput.classList.add("input-error");
    }
  });

  continueBtn.addEventListener("click", function () {
    let valid = true;

    if (!startDateInput.value) {
      errStart.textContent = "Please select a start date.";
      startDateInput.classList.add("input-error");
      valid = false;
    } else {
      errStart.textContent = "";
      startDateInput.classList.remove("input-error");
    }

    if (!endDateInput.value) {
      errEnd.textContent = "Please select an end date.";
      endDateInput.classList.add("input-error");
      valid = false;
    } else if (endDateInput.value < startDateInput.value) {
      errEnd.textContent = "End date must be on or after start date.";
      endDateInput.classList.add("input-error");
      valid = false;
    } else {
      errEnd.textContent = "";
      endDateInput.classList.remove("input-error");
    }

    if (!valid) return;

    /* Format start date as DD/MM/YY for the table row */
    const sd  = new Date(startDateInput.value);
    const dd  = String(sd.getDate()).padStart(2, "0");
    const mm  = String(sd.getMonth() + 1).padStart(2, "0");
    const yy  = String(sd.getFullYear()).slice(-2);
    pendingSchedule = { displayDate: `${dd}/${mm}/${yy}` };

    closeSchedulePopup();
    openCoordinatorPopup();
  });

  /* ══════════════════════════════════════
     POPUP 3 — Co-ordinator Details
  ══════════════════════════════════════ */
  const coordOverlay  = document.getElementById("EEDUWT-coordinator-overlay");
  const coordClose    = document.getElementById("EEDUWT-coordinator-close");
  const coordName     = document.getElementById("EEDUWT-coord-name");
  const coordMobile   = document.getElementById("EEDUWT-coord-mobile");
  const coordAlt      = document.getElementById("EEDUWT-coord-alt");
  const errCoordName   = document.getElementById("EEDUWT-err-coord-name");
  const errCoordMobile = document.getElementById("EEDUWT-err-coord-mobile");
  const errCoordAlt    = document.getElementById("EEDUWT-err-coord-alt");
  const saveBtn        = document.getElementById("EEDUWT-btn-save");

  function openCoordinatorPopup() {
    coordName.value   = "";
    coordMobile.value = "";
    coordAlt.value    = "";
    errCoordName.textContent   = "";
    errCoordMobile.textContent = "";
    errCoordAlt.textContent    = "";
    coordName.classList.remove("input-error");
    coordMobile.classList.remove("input-error");
    coordAlt.classList.remove("input-error");
    coordOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeCoordinatorPopup() {
    coordOverlay.classList.remove("active");
    document.body.style.overflow = "";
    pendingWorkshop = null;
    pendingSchedule = null;
  }

  coordClose.addEventListener("click", closeCoordinatorPopup);
  coordOverlay.addEventListener("click", e => { if (e.target === coordOverlay) closeCoordinatorPopup(); });

  /* ── Validators Popup 3 ── */
  function validateCoordName(show) {
    const v  = coordName.value.trim();
    const ok = /^[a-zA-Z\s]+$/.test(v) && v.length > 0;
    if (show) {
      errCoordName.textContent = !v.length ? "Co-ordinator name is required." : !ok ? "Only letters and spaces allowed." : "";
      coordName.classList.toggle("input-error", !ok);
    }
    return ok;
  }

  function validateCoordMobile(show) {
    const v  = coordMobile.value.trim().replace(/\s/g, "");
    const ok = /^\d{10}$/.test(v);
    if (show) {
      errCoordMobile.textContent = !v.length ? "Mobile number is required." : !ok ? "Enter a valid 10-digit number." : "";
      coordMobile.classList.toggle("input-error", !ok);
    }
    return ok;
  }

  function validateCoordAlt(show) {
    const v = coordAlt.value.trim().replace(/\s/g, "");
    /* Alternate is optional — if filled, must be 10 digits */
    if (!v.length) { if (show) { errCoordAlt.textContent = ""; coordAlt.classList.remove("input-error"); } return true; }
    const ok = /^\d{10}$/.test(v);
    if (show) {
      errCoordAlt.textContent = ok ? "" : "Enter a valid 10-digit number.";
      coordAlt.classList.toggle("input-error", !ok);
    }
    return ok;
  }

  coordName.addEventListener("blur",   () => validateCoordName(true));
  coordMobile.addEventListener("blur", () => validateCoordMobile(true));
  coordAlt.addEventListener("blur",    () => validateCoordAlt(true));

  /* ── Save: validate → add row → close all ── */
  saveBtn.addEventListener("click", function () {
    const ok = validateCoordName(true) & validateCoordMobile(true) & validateCoordAlt(true);
    if (!ok) return;

    if (pendingWorkshop && pendingSchedule) {
      addRowWithDate(pendingWorkshop, pendingSchedule.displayDate);
    }

    closeCoordinatorPopup();
  });

  /* ══════════════════════════════════════
     ROW BUILDERS
  ══════════════════════════════════════ */
  function addRowWithDate(data, displayDate) {
    const table = document.querySelector(".EEDUWT-table");
    table.appendChild(buildRowWithDate(data.name, data.type, data.duration, data.price, data.location, displayDate));

    const mobList = document.querySelector(".EEDUWT-mobile-itmes");
    if (mobList) mobList.appendChild(buildMobItemWithDate(data.name, data.type, data.duration, data.price, data.location, displayDate));

    updateCount();
    updateMobCount();
  }

  function buildRowWithDate(name, type, duration, price, location, displayDate) {
    const row = document.createElement("div");
    row.className = "EEDUWT-row";

    const nameCell = document.createElement("div");
    nameCell.className = "EEDUWT-workshop";
    nameCell.innerHTML = `
      <svg width="35" height="35" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
        <circle cx="17.5" cy="17.5" r="17.5" fill="#d9d9d9"/>
      </svg>
      <span>${name}</span>`;

    const cells = [type, duration, location, `₹${price}`, displayDate];
    const typeCell = document.createElement("div"); typeCell.textContent = type;
    const durCell  = document.createElement("div"); durCell.textContent  = duration;
    const locCell  = document.createElement("div"); locCell.textContent  = location;
    const priCell  = document.createElement("div"); priCell.textContent  = `₹${price}`;
    const schCell  = document.createElement("div"); schCell.textContent  = displayDate;
    const actCell  = document.createElement("div");
    actCell.innerHTML = `<img class="EEDUWT-edit" src="../assets/E-EducationAdminShortWorkshop/edit.png" />`;

    [nameCell, typeCell, durCell, locCell, priCell, schCell, actCell]
      .forEach(c => row.appendChild(c));

    return row;
  }

  function buildMobItemWithDate(name, type, duration, price, location, displayDate) {
    const item = document.createElement("div");
    item.className = "EEDUWT-acc-item";
    item.innerHTML = `
      <div class="EEDUWT-acc-header">
        <div class="EEDUWT-workshop">
          <svg width="25" height="25" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12.5" cy="12.5" r="12.5" fill="#d9d9d9"/>
          </svg>
          <span>${name}</span>
        </div>
        <img src="../assets/E-EducationAdminShortWorkshop/down.png" class="EEDUWT-arrow" />
      </div>
      <div class="EEDUWT-acc-body">
        <div><span>Type</span><span>${type}</span><span><img src="../assets/E-EducationAdminShortWorkshop/edit.png" alt="Edit" class="EEDUWT-mob-edit"/></span></div>
        <div><span>Duration</span><span>${duration}</span><span></span></div>
        <div><span>Location</span><span>${location}</span><span></span></div>
        <div><span>Price</span><span>₹${price}</span><span></span></div>
        <div><span>Scheduled</span><span>${displayDate}</span><span></span></div>
      </div>`;

    item.querySelector(".EEDUWT-acc-header").addEventListener("click", function () {
      const body  = this.nextElementSibling;
      const arrow = this.querySelector(".EEDUWT-arrow");
      body.classList.toggle("active");
      item.classList.toggle("active");
      arrow.style.transform = body.classList.contains("active") ? "rotate(180deg)" : "rotate(0deg)";
    });

    return item;
  }

  /* ── Schedule Later: calendar icon row, no popups 2 & 3 ── */
  function buildRow(name, type, duration, price, location, scheduleLater) {
    const row = document.createElement("div");
    row.className = "EEDUWT-row";

    const nameCell = document.createElement("div");
    nameCell.className = "EEDUWT-workshop";
    nameCell.innerHTML = `
      <svg width="35" height="35" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
        <circle cx="17.5" cy="17.5" r="17.5" fill="#d9d9d9"/>
      </svg>
      <span>${name}</span>`;

    const typeCell = document.createElement("div"); typeCell.textContent = type;
    const durCell  = document.createElement("div"); durCell.textContent  = duration;
    const locCell  = document.createElement("div"); locCell.textContent  = location;
    const priCell  = document.createElement("div"); priCell.textContent  = `₹${price}`;

    const schCell = document.createElement("div");
    if (scheduleLater) {
      schCell.innerHTML = `<img src="../assets/E-EducationAdminShortWorkshop/calendar.png" alt="Calendar" class="calendar" />`;
      const calIcon = schCell.querySelector(".calendar");
      calIcon.addEventListener("click", e => {
        e.stopPropagation();
        calIcon.dispatchEvent(new CustomEvent("EEDUWT-open-cal", { bubbles: true, detail: { icon: calIcon, target: schCell } }));
      });
    }

    const actCell = document.createElement("div");
    actCell.innerHTML = `<img class="EEDUWT-edit" src="../assets/E-EducationAdminShortWorkshop/edit.png" />`;

    [nameCell, typeCell, durCell, locCell, priCell, schCell, actCell]
      .forEach(c => row.appendChild(c));

    return row;
  }

  function addRow(scheduleLater) {
    const name     = inputName.value.trim();
    const type     = inputType.value;
    const duration = inputDuration.value.trim();
    const price    = inputPrice.value.trim();
    const location = inputLocation.value;

    document.querySelector(".EEDUWT-table").appendChild(
      buildRow(name, type, duration, price, location, scheduleLater)
    );

    const mobList = document.querySelector(".EEDUWT-mobile-itmes");
    if (mobList) {
      const item = document.createElement("div");
      item.className = "EEDUWT-acc-item";
      const schHTML = scheduleLater
        ? `<span>Scheduled</span><span><img src="../assets/E-EducationAdminShortWorkshop/calendar.png" alt="calendar" class="EEDUWT-mob-calendar"/></span><span></span>`
        : `<span>Scheduled</span><span></span><span></span>`;
      item.innerHTML = `
        <div class="EEDUWT-acc-header">
          <div class="EEDUWT-workshop">
            <svg width="25" height="25" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12.5" cy="12.5" r="12.5" fill="#d9d9d9"/>
            </svg>
            <span>${name}</span>
          </div>
          <img src="../assets/E-EducationAdminShortWorkshop/down.png" class="EEDUWT-arrow" />
        </div>
        <div class="EEDUWT-acc-body">
          <div><span>Type</span><span>${type}</span><span><img src="../assets/E-EducationAdminShortWorkshop/edit.png" alt="Edit" class="EEDUWT-mob-edit"/></span></div>
          <div><span>Duration</span><span>${duration}</span><span></span></div>
          <div><span>Location</span><span>${location}</span><span></span></div>
          <div><span>Price</span><span>₹${price}</span><span></span></div>
          <div>${schHTML}</div>
        </div>`;
      item.querySelector(".EEDUWT-acc-header").addEventListener("click", function () {
        const body  = this.nextElementSibling;
        const arrow = this.querySelector(".EEDUWT-arrow");
        body.classList.toggle("active");
        item.classList.toggle("active");
        arrow.style.transform = body.classList.contains("active") ? "rotate(180deg)" : "rotate(0deg)";
      });
      mobList.appendChild(item);
    }

    updateCount();
    updateMobCount();
  }

  /* ══════════════════════════════════════
     BUTTON ACTIONS — Popup 1
  ══════════════════════════════════════ */
  btnNow.addEventListener("click", function () {
    if (!validateAll1()) return;
    pendingWorkshop = {
      name:     inputName.value.trim(),
      type:     inputType.value,
      duration: inputDuration.value.trim(),
      price:    inputPrice.value.trim(),
      location: inputLocation.value
    };
    closeModal();
    openSchedulePopup();
  });

  btnLater.addEventListener("click", function () {
    if (!validateAll1()) return;
    addRow(true);
    closeModal();
  });

  /* ══════════════════════════════════════
     RE-ATTACH CALENDAR EVENTS (existing rows)
  ══════════════════════════════════════ */
  document.addEventListener("EEDUWT-open-cal", function (e) {
    if (typeof openCalendar === "function") openCalendar(e.detail.icon, e.detail.target);
  });
  document.addEventListener("EEDUWT-open-mob-cal", function (e) {
    if (typeof openCalendar === "function") openCalendar(e.detail.icon, e.detail.target);
  });

})();
/* Handle dynamically added desktop calendar icons */
  document.addEventListener("EEDUWT-open-cal", function (e) {
    openCalendar(e.detail.icon, e.detail.target);
  });

  /* Handle dynamically added mobile calendar icons */
  document.addEventListener("EEDUWT-open-mob-cal", function (e) {
    openCalendar(e.detail.icon, e.detail.target);
  });



document.querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(5)").classList.add("sidebar-active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(3)").classList.add("active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(3)>li:nth-child(5)").classList.add("submenu-active-highlight");


document.querySelector("#account-menu .mobile-dropdown:nth-child(5) .dropdown-header").classList.add("dropdown-header-active");
document.querySelector("#account-menu .mobile-dropdown:nth-child(5)").classList.add("active-mobile-submenu");
document.querySelector("#account-menu .mobile-dropdown:nth-child(5) li:nth-child(5)").classList.add("submenu-active-page");

