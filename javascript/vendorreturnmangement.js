// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon=document.querySelector("#hamburger-menu>img");
var mobileBack=document.querySelector(".mobile-back-button");


hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display="none"
    document.querySelector("body").style.overflow="hidden"
    window.scrollTo(0, 0);
    mobileBack.style.display="none"
  }
  else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow="auto";
    document.querySelector(".bottom-nav").style.display="flex";
    mobileBack.style.display="flex"
  }
});

let itemToRemove = null;

// ----------------------------
// CLICK HANDLER
// ----------------------------
document.addEventListener("click", function (e) {
  // --------------------------
  // Table Three Dots
  // --------------------------
  if (e.target.classList.contains("three-dot")) {
    e.stopPropagation();
    const previewBox = e.target.closest(".previewing").querySelector(".all-preview");
    // Close other table preview boxes
    document.querySelectorAll(".all-preview").forEach(box => box.classList.remove("active-preview"));
    previewBox.classList.add("active-preview");
    return;
  }

  // --------------------------
  // FAQ Three Dots
  // --------------------------
  if (e.target.classList.contains("mobile-three-dots")) {
    e.stopPropagation();
    const previewBox = e.target.closest(".main-threedots-mobile").querySelector(".show-threedots-box");
    // Close other FAQ preview boxes
    document.querySelectorAll(".show-threedots-box").forEach(box => box.classList.remove("active-preview"));
    previewBox.classList.add("active-preview");
    return;
  }

  // --------------------------
  // Click Remove in Table
  // --------------------------
  const tableRemove = e.target.closest(".all-preview div");
  if (tableRemove && tableRemove.textContent.includes("Remove")) {
    itemToRemove = e.target.closest("tr"); // only table rows
    if (itemToRemove) document.getElementById("confirmModal").classList.add("active");
  }

  // --------------------------
  // Click Remove in FAQ
  // --------------------------
  const faqRemove = e.target.closest(".show-threedots-box div");
  if (faqRemove && faqRemove.textContent.includes("Remove")) {
    itemToRemove = e.target.closest(".faq-item"); // only faq items
    if (itemToRemove) document.getElementById("confirmModal").classList.add("active");
  }

  // Close preview boxes if clicked outside
  if (!e.target.closest(".all-preview") && !e.target.classList.contains("three-dot")) {
    document.querySelectorAll(".all-preview").forEach(box => box.classList.remove("active-preview"));
  }
  if (!e.target.closest(".show-threedots-box") && !e.target.classList.contains("mobile-three-dots")) {
    document.querySelectorAll(".show-threedots-box").forEach(box => box.classList.remove("active-preview"));
  }
});

// ----------------------------
// CONFIRM MODAL BUTTONS
// ----------------------------
document.getElementById("confirmYes").addEventListener("click", function () {
  if (itemToRemove) {
    itemToRemove.remove();
    itemToRemove = null;
  }
  closeModal();
});

document.getElementById("confirmNo").addEventListener("click", closeModal);

function closeModal() {
  document.getElementById("confirmModal").classList.remove("active");
}


// =========================
// GLOBAL VARIABLES
// =========================
const popups = document.querySelectorAll(".modal-popup-main");
let currentItem = null; // tracks current table row or FAQ item

// =========================
// CLOSE ALL POPUPS
// =========================
function closeAllPopups() {
  popups.forEach(popup => popup.classList.remove("active"));
  currentItem = null;
}

// =========================
// OPEN POPUP BY STATUS
// =========================
function openPopupByStatus(status) {
  if (status.classList.contains("received")) {
    document.getElementById("received-popup").classList.add("active");
  } 
  else if (status.classList.contains("refunded")) {
    document.getElementById("packed-popup").classList.add("active");
  } 
  else if (status.classList.contains("rejected")) {
    document.getElementById("delivered-popup").classList.add("active");
  }
}

// =========================
// TABLE ROW POPUP LOGIC
// =========================
document.querySelectorAll(".show-popup-btn").forEach(arrow => {
  arrow.addEventListener("click", () => {
    closeAllPopups();

    const row = arrow.closest("tr");
    if (!row) return;

    const status = row.querySelector(".order-status");
    if (!status) return;

    currentItem = row;
    openPopupByStatus(status);
  });
});

// =========================
// FAQ MOBILE POPUP LOGIC
// =========================
document.querySelectorAll(".open-modal-popup-mobile").forEach(btn => {
  btn.addEventListener("click", function () {
    closeAllPopups();

    const faqAnswer = this.closest(".faq-answer");
    if (!faqAnswer) return;

    const status = faqAnswer.querySelector(".received, .rejected, .refunded");
    if (!status) return;

    currentItem = faqAnswer;
    openPopupByStatus(status);
  });
});

// =========================
// MARK AS PACKED BUTTON
// =========================
// =========================
// MARK AS PACKED BUTTON WITH DATE VALIDATION
// =========================
document.getElementById("mark-as-packed").addEventListener("click", function () {
  if (!currentItem) return;

  // find the date input inside the popup
  const dateInput = document.querySelector("#received-popup input[type='date']");
  
  // if no date selected, alert or just return
  if (!dateInput || !dateInput.value) {
    alert("Please select the 'Packed on' date before marking as packed.");
    return;
  }

  // find the status element in current item (table row or FAQ)
  const statusEl = currentItem.querySelector(".order-status, .received-orders");
  if (!statusEl) return;

  // update status text and class
  statusEl.textContent = "Packed";
  statusEl.classList.remove("received-orders");
  statusEl.classList.add("packed-order");

  // close popup
  closeAllPopups();

  // clear the input for next time
  dateInput.value = "";
});

// =========================
// MARK AS PICKED BUTTON WITH DATE VALIDATION
// =========================
document.getElementById("mark-as-picked").addEventListener("click", function () {
  // select the specific Pick Up input inside the popup
  const pickUpInput = document.querySelector("#pickup-date");

  if (!pickUpInput || pickUpInput.value.trim() === "") {
    // do nothing if empty
    alert("Please fill the Pick Up date before proceeding.");
    return;
  }

  // if filled, close the popup
  closeAllPopups();

  // clear only this Pick Up input for next time
  pickUpInput.value = "";
});




// =========================
// CLOSE BUTTONS
// =========================
document.querySelectorAll(".close-btn").forEach(btn => {
  btn.addEventListener("click", closeAllPopups);
});






// Search Functionality
// Unified Search (Table + FAQ)
const searchInput = document.getElementById("search-bar-table");

/* =========================
   TABLE SEARCH
========================= */
const tableRows = document.querySelectorAll(".table-products tbody tr");

/* =========================
   FAQ SEARCH
========================= */
const faqItems = document.querySelectorAll(".faq-item");

searchInput.addEventListener("input", function () {
  const searchValue = this.value.toLowerCase().trim();

  /* ===== TABLE FILTER ===== */
  tableRows.forEach(row => {
    const productName =
      row.querySelector(".product-col-rows span:first-child")
        ?.innerText.toLowerCase() || "";

    const category =
      row.children[3]?.innerText.toLowerCase() || "";

    const isMatch =
      productName.includes(searchValue) ||
      category.includes(searchValue);

    row.style.display = isMatch ? "" : "none";
  });

  /* ===== FAQ FILTER ===== */
  faqItems.forEach(item => {
    const productName =
      item.querySelector(".main-faq-question span")
        ?.innerText.toLowerCase() || "";

    const category =
      item.querySelector(".all-answers div:nth-child(3) span:nth-child(2)")
        ?.innerText.toLowerCase() || "";

    const isMatch =
      productName.includes(searchValue) ||
      category.includes(searchValue);

    item.style.display = isMatch ? "" : "none";
  });
});


// Filter Accordion Logic

// ----------------------------
// TOGGLE FILTER BOXES
// ----------------------------
// ----------------------------
// TOGGLE FILTER BOXES
// ----------------------------
const filterBar = document.getElementById("filter-bar-main-box");
const filterMain = document.getElementById("filter-main");
const statusBox = document.getElementById("status-box");
const statusFilterBtn = filterMain.querySelector("ul li"); // "Status" button

filterBar.addEventListener("click", () => {
  filterMain.classList.toggle("active-main-content-flows");
  statusBox.classList.remove("active-main-content-flows");
});

statusFilterBtn.addEventListener("click", () => {
  statusBox.classList.toggle("active-main-content-flows");
});

// ----------------------------
// TABLE AND FAQ FILTER
// ----------------------------
const tableRows1 = document.querySelectorAll(".table-products tbody tr");
const faqItems2 = document.querySelectorAll(".faq .faq-item");
const statusCheckboxes = document.querySelectorAll("#status-box input[type='checkbox']");
const searchInput1 = document.getElementById("search-bar-table");

// Helper function to get status text from a table row or faq item
function getStatus(element) {
  const statusSpan = element.querySelector(".order-status, .all-answers span.received-orders, .all-answers span.packed-order, .all-answers span.delivered-order");
  return statusSpan?.innerText.toLowerCase() || "";
}

// Main filter function
function filterContent() {
  const selectedStatuses = Array.from(statusCheckboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.dataset.status.toLowerCase());

  const searchValue = searchInput1?.value.toLowerCase().trim() || "";

  // --- TABLE FILTER ---
  tableRows1.forEach(row => {
    const status = row.querySelector(".order-status")?.innerText.toLowerCase() || "";
    const productName = row.querySelector(".product-col-rows span:first-child")?.innerText.toLowerCase() || "";
    const category = row.children[3]?.innerText.toLowerCase() || "";

    const matchesSearch = productName.includes(searchValue) || category.includes(searchValue);
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(status);

    row.style.display = matchesSearch && matchesStatus ? "" : "none";
  });

  // --- FAQ FILTER ---
  faqItems2.forEach(item => {
    const statusSpan = item.querySelector(".all-answers span.received-orders, .all-answers span.packed-order, .all-answers span.delivered-order");
    const status = statusSpan?.innerText.toLowerCase() || "";

    const questionText = item.querySelector(".main-faq-question span")?.innerText.toLowerCase() || "";
    const matchesSearch = questionText.includes(searchValue);
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(status);

    item.style.display = matchesSearch && matchesStatus ? "" : "none";
  });
}

// ----------------------------
// EVENT LISTENERS
// ----------------------------
statusCheckboxes.forEach(cb => cb.addEventListener("change", filterContent));
if (searchInput1) searchInput1.addEventListener("input", filterContent);

// ----------------------------
// OPTIONAL: close filter on click outside
// ----------------------------
document.addEventListener("click", function(e) {
  if (!filterMain.contains(e.target) && !filterBar.contains(e.target)) {
    filterMain.classList.remove("active-main-content-flows");
    statusBox.classList.remove("active-main-content-flows");
  }
});


// Sort By
// ----------------------------
// TOGGLE SORT BOX
// ----------------------------
const sortByBox = document.getElementById("sort-by-main-box");
const sortBox = document.getElementById("sort-box");

sortByBox.addEventListener("click", () => {
  sortBox.classList.toggle("active-main-content-flows");
  // Close filter boxes if open
  filterMain.classList.remove("active-main-content-flows");
  statusBox.classList.remove("active-main-content-flows");
});

// ----------------------------
// SORT FUNCTION (PRICE BASED)
// ----------------------------

const sortRadios = document.querySelectorAll("#sort-box input[type='radio']");
sortRadios.forEach(radio => radio.addEventListener("change", sortContent));

function sortContent() {
  const lowToHigh = document.getElementById("price-lowtohigh").checked;
  const highToLow = document.getElementById("price-hightolow").checked;

  if (!lowToHigh && !highToLow) return;

  const direction = lowToHigh ? 1 : -1;

  // ----------------------------
  // TABLE SORT
  // ----------------------------
  const tableBody = document.querySelector(".table-products tbody");
  if (tableBody) {
    const rows = Array.from(tableBody.querySelectorAll("tr"));

    rows.sort((a, b) => {
      const priceA = parseInt(
        a.children[3].innerText.replace(/[₹,]/g, "")
      );
      const priceB = parseInt(
        b.children[3].innerText.replace(/[₹,]/g, "")
      );
      return (priceA - priceB) * direction;
    });

    rows.forEach(row => tableBody.appendChild(row));
  }

  // ----------------------------
  // FAQ SORT
  // ----------------------------
  const faqContainer = document.querySelector(".faq");
  if (faqContainer) {
    const faqItems = Array.from(faqContainer.querySelectorAll(".faq-item"));

    faqItems.sort((a, b) => {
      const priceA = parseInt(
        a.querySelector(".all-answers div:nth-child(3) span:last-child")
          .innerText.replace(/[₹,]/g, "")
      );
      const priceB = parseInt(
        b.querySelector(".all-answers div:nth-child(3) span:last-child")
          .innerText.replace(/[₹,]/g, "")
      );
      return (priceA - priceB) * direction;
    });

    faqItems.forEach(item => faqContainer.appendChild(item));
  }
}


// ----------------------------
// EVENT LISTENERS
// ----------------------------
sortRadios.forEach(radio => radio.addEventListener("change", sortContent));

// Optional: close sort box when clicking outside
document.addEventListener("click", function(e) {
  if (!sortBox.contains(e.target) && !sortByBox.contains(e.target)) {
    sortBox.classList.remove("active-main-content-flows");
  }
});






const faqItems1 = document.querySelectorAll(".faq-item");

faqItems1.forEach(item => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    // Close all other items
    faqItems1.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
      }
    });

    // Toggle current item
    item.classList.toggle("active");
  });
});

  // Select all three-dots buttons
const threeDotsButtons = document.querySelectorAll('.mobile-three-dots');

threeDotsButtons.forEach(threeDotbutton => {
  threeDotbutton.addEventListener('click', () => {
    // Correctly get the sibling div
    const showBox = threeDotbutton.nextElementSibling;
    if (!showBox) return; // safety check

    // Find the parent .faq-item
    const faqItem = threeDotbutton.closest('.faq-item');

    // Get status element safely
    const statusElement = faqItem.querySelector(
      '.faq-answer .all-answers .payment-credited, ' +
      '.faq-answer .all-answers .payment-pending, ' +
      '.faq-answer .all-answers .payment-rejected'
    );
    const statusText = statusElement ? statusElement.textContent.trim() : '';

    // Toggle the show-threedots-box
    showBox.classList.toggle('active-threedots');

    // Find the "Request to Remove" div safely
    const requestToRemoveDiv = Array.from(showBox.children).find(div => div.textContent.includes('Request to Remove'));
    if (requestToRemoveDiv) {
      requestToRemoveDiv.style.display = (statusText === 'Approved') ? 'flex' : 'none';
    }
  });
});





document.querySelector("#sidebar-main-vendor ul>li:nth-child(3)").classList.add("sidebar-active");

document.querySelector("#account-menu li:nth-child(3) .dropdown-header").classList.add("dropdown-header-active");