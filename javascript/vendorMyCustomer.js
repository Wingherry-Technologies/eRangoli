/*
   GLOBAL STATE
*/
let activeRow = null;

/*
   GLOBAL CLICK HANDLER
*/
document.addEventListener("click", function (e) {
  /* ---- 3 DOT MENU ---- */
  const dots = e.target.closest(".my-customer-three-dots");
  if (dots) {
    e.stopPropagation();
    document.querySelectorAll(".my-customer-action-menu").forEach(m => m.classList.remove("show"));
    dots.closest(".my-customer-action-wrapper")
        .querySelector(".my-customer-action-menu")
        .classList.toggle("show");
    return;
  }

  document.querySelectorAll(".my-customer-action-menu").forEach(m => m.classList.remove("show"));

  /* ---- DELETE ---- */
  const removeItem = e.target.closest(".my-customer-action-item");
  if (removeItem && removeItem.textContent.trim() === "Remove") {
    activeRow = removeItem.closest("tr");
    document.getElementById("my-customer-confirmOverlay").style.display = "flex";
    return;
  }

  /* ---- ARROW CLICK - OPEN POPUP ---- */
  const arrowCell = e.target.closest("td:last-child");
  if (arrowCell && arrowCell.querySelector("img[src*='ArrowCircle']")) {
    const row = arrowCell.closest("tr");
    openCustomerDetailsPopup(row);
    return;
  }
});

/*
   DELETE CONFIRMATION
*/
document.getElementById("my-customer-cancelDelete").onclick = () => {
  document.getElementById("my-customer-confirmOverlay").style.display = "none";
  activeRow = null;
};

document.getElementById("my-customer-confirmDelete").onclick = () => {
  if (activeRow) activeRow.remove();
  document.getElementById("my-customer-confirmOverlay").style.display = "none";
  activeRow = null;
  renderMobileCustomers();
};

/*
   CUSTOMER DETAILS POPUP
*/
function openCustomerDetailsPopup(row) {
  const cells = row.querySelectorAll("td");
  
  // Extract data from row
  const name = row.querySelector(".my-customer-name").innerText.trim();
  const email = row.querySelector(".my-customer-email").innerText.trim();
  const customerId = cells[2].innerText.trim();
  const contact = cells[3].innerText.trim();
  const signedUp = cells[4].innerText.trim();
  const purchaseTime = cells[5].innerText.trim();
  const lastPurchase = cells[6].innerText.trim();

  // Populate popup with data
  document.getElementById("popupCustomerName").innerText = name;
  document.getElementById("popupCustomerId").innerText = customerId;
  document.getElementById("popupName").innerText = name;
  document.getElementById("popupEmail").innerText = email;
  document.getElementById("popupContact").innerText = contact;
  document.getElementById("popupLocation").innerText = "Delhi";
  document.getElementById("popupAddress").innerText = "C - 605, Eden Park, Mudhuban colony, parsi road, Near Appolo Hospital, Pune, Maharashta, 234 678";
  
  // Show popup
  document.getElementById("customerDetailsOverlay").classList.add("show");
}

// Close popup
document.getElementById("closePopup").onclick = () => {
  document.getElementById("customerDetailsOverlay").classList.remove("show");
};

// Close on overlay click
document.getElementById("customerDetailsOverlay").onclick = (e) => {
  if (e.target.id === "customerDetailsOverlay") {
    document.getElementById("customerDetailsOverlay").classList.remove("show");
  }
};

// Tab switching
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.onclick = () => {
    // Remove active from all tabs
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
    
    // Add active to clicked tab
    btn.classList.add("active");
    const tabName = btn.getAttribute("data-tab");
    document.getElementById(tabName + "Tab").classList.add("active");
  };
});

/*
   HELPER FUNCTIONS
*/
function getInitials(fullName) {
  if (!fullName) return "";

  const parts = fullName.trim().split(" ");

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (
    parts[0].charAt(0).toUpperCase() +
    parts[parts.length - 1].charAt(0).toUpperCase()
  );
}

/*
   MOBILE VIEW
*/
function renderMobileCustomers() {
  const container = document.querySelector(".my-customer-mobile-table");
  if (!container) return;

  const rows = Array.from(document.querySelectorAll("#my-customer-tableBody tr"))
  .filter(row => row.style.display !== "none");


  container.innerHTML = "";

  rows.forEach(row => {
    const cells = row.querySelectorAll("td");

    const name = row.querySelector(".my-customer-name").innerText.trim();
    const id = cells[2].innerText.trim();
    const contact = cells[3].innerText.trim();
    const signup = cells[4].innerText.trim();
    const purchase = cells[5].innerText.trim();
    const last = cells[6].innerText.trim();

    const div = document.createElement("div");
    div.className = "my-customer-mobile-item";

    div.innerHTML = `
      <div class="my-customer-mobile-header">
        <div class="mobile-user-info">
          <div class="mobile-avatar">${getInitials(name)}</div>
          <div>
            <div class="mobile-name">${name}</div>
            <div class="mobile-email">${row.querySelector('.my-customer-email').innerText}</div>
          </div>
        </div>
        <div class="mobile-toggle"> <img src="../assets/vendorCustomerManagement/mobileArrow.svg" alt=""> </div>
      </div>

      <div class="my-customer-mobile-body">
        <div class="mobile-row"><span>Customer Id</span><span>${id}</span></div>
        <div class="mobile-row"><span>Contact</span><span>${contact}</span></div>
        <div class="mobile-row"><span>Signed Up</span><span>${signup}</span></div>
        <div class="mobile-row"><span>Purchase time</span><span>${purchase}</span></div>
        <div class="mobile-row"><span>Last Purchase</span><span>${last} </span></div>
        <div class="mobile-last-arrow"><img src="../assets/vendorCustomerManagement/ArrowCircleUpRight.svg"  alt=""> </div>
      </div>
    `;
const mobileArrow = div.querySelector(".mobile-last-arrow");
    if (mobileArrow) {
  mobileArrow.onclick = (e) => {
    e.stopPropagation();
    openCustomerDetailsPopup(row);
  };
}

    div.querySelector(".my-customer-mobile-header").onclick = () => {
      div.classList.toggle("active");
    };

    container.appendChild(div);
  });
}

renderMobileCustomers();
window.addEventListener("resize", renderMobileCustomers);


const customerSortBtn = document.getElementById("sort-by-main-box");
const customerSortBox = document.getElementById("customer-sort-box");

customerSortBtn.addEventListener("click", (e) => {
  e.stopPropagation();


  customerFilterMain.classList.remove("active-main-content-flows");
  customerDateBox.classList.remove("active-main-content-flows");


  customerSortBox.classList.toggle("active-main-content-flows");
});

const customerRows = Array.from(document.querySelectorAll(".my-customer-table tbody tr"));

document.querySelectorAll("#customer-sort-box input").forEach(rb => {
  rb.addEventListener("change", () => {
    sortCustomersByPurchase(rb.id);
    customerSortBox.classList.remove("active-main-content-flows"); // auto close popup
  });
});

function getPurchaseTime(row) {
  const val = row.querySelector(".purchase-time").innerText.trim().toLowerCase();

  if (val === "once") return 1;
  if (val === "twice") return 2;

  const num = parseInt(val);
  return isNaN(num) ? 0 : num;
}


function sortCustomersByPurchase(type) {
  const tbody = document.querySelector(".my-customer-table tbody");

  let filteredRows = [...customerRows];

  switch (type) {
    case "purchase-once":
      filteredRows = filteredRows.filter(r => getPurchaseTime(r) === 1);
      break;

    case "purchase-twice":
      filteredRows = filteredRows.filter(r => getPurchaseTime(r) === 2);
      break;

    case "purchase-less-five":
      filteredRows = filteredRows.filter(r => getPurchaseTime(r) < 5);
      break;

    case "purchase-more-five":
      filteredRows = filteredRows.filter(r => getPurchaseTime(r) > 5);
      break;
  }

  tbody.innerHTML = "";
  filteredRows.forEach(r => tbody.appendChild(r));

  renderMobileCustomers();
}


const customerFilterBtn = document.getElementById("customer-filter-btn");
const customerFilterMain = document.getElementById("customer-filter-main");
const customerDateBox = document.getElementById("customer-date-filter-box");

if (customerFilterBtn) {
customerFilterBtn.onclick = (e) => {
  e.stopPropagation();


  customerSortBox.classList.remove("active-main-content-flows");

  customerFilterMain.classList.toggle("active-main-content-flows");

  customerDateBox.classList.remove("active-main-content-flows");
};

}

document.addEventListener("click", (e) => {
  if (!e.target.closest(".main-content-flows-main") &&
      !e.target.closest("#customer-filter-btn")) {
    customerFilterMain.classList.remove("active-main-content-flows");
    customerDateBox.classList.remove("active-main-content-flows");
  }
});
let activeDateColumn = null;

document.getElementById("filter-last-purchase").onclick = () => {
  activeDateColumn = 6; // last purchase column
  customerDateBox.classList.add("active-main-content-flows");
};

document.getElementById("filter-signed-up").onclick = () => {
  activeDateColumn = 4; // signed up column
  customerDateBox.classList.add("active-main-content-flows");
};
const fromDateInput = document.getElementById("filter-from-date");
const toDateInput = document.getElementById("filter-to-date");

toDateInput.addEventListener("change", () => {
  if (!fromDateInput.value || !toDateInput.value) return;
  applyDateFilter();
});
function applyDateFilter() {
  const from = new Date(fromDateInput.value);
  const to = new Date(toDateInput.value);

  const tbody = document.getElementById("my-customer-tableBody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  rows.forEach(row => {
    const dateText = row.children[activeDateColumn].innerText.trim();
    const parts = dateText.split("/");
    const rowDate = new Date(`20${parts[2]}-${parts[1]}-${parts[0]}`);

    if (rowDate >= from && rowDate <= to) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });

  customerDateBox.classList.remove("active-main-content-flows");
  customerFilterMain.classList.remove("active-main-content-flows");

  renderMobileCustomers();
}
(function setMaxDateForFilters() {
  const fromDateInput = document.getElementById("filter-from-date");
  const toDateInput = document.getElementById("filter-to-date");

  const today = new Date().toISOString().split("T")[0];

  if (fromDateInput) {
    fromDateInput.setAttribute("max", today);
  }

  if (toDateInput) {
    toDateInput.setAttribute("max", today);
  }
})();

const customerSearchInput = document.getElementById("my-customer-searchInput");
customerSearchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase().trim();
  filterCustomersBySearch(query);
});
function filterCustomersBySearch(query) {
  const rows = document.querySelectorAll("#my-customer-tableBody tr");

  rows.forEach(row => {
    const name = row.querySelector(".my-customer-name")?.innerText.toLowerCase() || "";
    const id = row.children[2]?.innerText.toLowerCase() || "";
    const contact = row.children[3]?.innerText.toLowerCase() || "";

    const match =
      name.includes(query) ||
      id.includes(query) ||
      contact.includes(query);

    row.style.display = match ? "" : "none";
  });

  // refresh mobile cards
  renderMobileCustomers();
}
