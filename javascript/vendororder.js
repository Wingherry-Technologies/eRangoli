/*************************************************
  GLOBAL STATE
*************************************************/
// let activeRow = null;

/*************************************************
  HAMBURGER MENU
*************************************************/
const hamburger = document.querySelector(".hamburger-menu");
const mobileMenu = document.getElementById("mobile-menu");
const hamberMenuIcon = document.querySelector("#hamburger-menu img");
const mobileBack = document.querySelector(".mobile-back-button");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("menu-open");

    if (mobileMenu.classList.contains("menu-open")) {
      hamberMenuIcon.src = "../assets/master/X.svg";
      document.body.style.overflow = "hidden";
      const bottomNav = document.querySelector(".bottom-nav");
      if (bottomNav) bottomNav.style.display = "none";
      if (mobileBack) mobileBack.style.display = "none";
      window.scrollTo(0, 0);
    } else {
      hamberMenuIcon.src = "../assets/master/List.svg";
      document.body.style.overflow = "auto";
      const bottomNav = document.querySelector(".bottom-nav");
      if (bottomNav) bottomNav.style.display = "flex";
      if (mobileBack) mobileBack.style.display = "flex";
    }
  });
}

/*************************************************
  TABLE + FAQ REFERENCES
*************************************************/
const tableRows = Array.from(
  document.querySelectorAll(".table-products tbody tr")
);
const faqItems = Array.from(document.querySelectorAll(".faq-item"));
const faqContainer = document.querySelector(".faq");

/*************************************************
  FILTER & SORT UI
*************************************************/
const filterBtn = document.getElementById("filter-bar-main-box");
const sortBtn = document.getElementById("sort-by-main-box");
const filterMain = document.getElementById("filter-main");
const statusBox = document.getElementById("status-box");
const colourBox = document.getElementById("colour-box");
const sizeBox = document.getElementById("size-box");
const sortBox = document.getElementById("sort-box");

function closeAllFilters() {
  document
    .querySelectorAll(".main-content-flows-main")
    .forEach(el => el.classList.remove("active-main-content-flows"));
}

function closeSubFilters() {
  statusBox.classList.remove("active-main-content-flows");
  colourBox.classList.remove("active-main-content-flows");
  sizeBox.classList.remove("active-main-content-flows");
}

document.addEventListener("click", e => {
  if (
    !e.target.closest(".main-content-flows-main") &&
    !e.target.closest("#filter-bar-main-box") &&
    !e.target.closest("#sort-by-main-box")
  ) {
    closeAllFilters();
  }
});

if (filterBtn) {
  filterBtn.addEventListener("click", e => {
    e.stopPropagation();
    closeAllFilters();
    filterMain.classList.add("active-main-content-flows");
  });
}

if (sortBtn) {
  sortBtn.addEventListener("click", e => {
    e.stopPropagation();
    closeAllFilters();
    sortBox.classList.add("active-main-content-flows");
  });
}

document.querySelectorAll("#filter-main li").forEach(item => {
  item.addEventListener("click", e => {
    e.stopPropagation();
    document
      .querySelectorAll("#filter-main li")
      .forEach(li => li.classList.remove("active-filter"));
    item.classList.add("active-filter");

    closeSubFilters();

    const text = item.innerText.toLowerCase();
    if (text.includes("status")) statusBox.classList.add("active-main-content-flows");
    if (text.includes("colour")) colourBox.classList.add("active-main-content-flows");
    if (text.includes("size")) sizeBox.classList.add("active-main-content-flows");
  });
});

/*************************************************
  GLOBAL STATE
*************************************************/
let activeRow = null;
let activeSKU = null;

/*************************************************
  HELPERS
*************************************************/
function getRowFromTarget(target) {
  return (
    target.closest("tr") ||
    target.closest(".faq-item")
  );
}

function getSKUFromRow(row) {
  // FAQ already has data-sku
  if (row.dataset?.sku) return row.dataset.sku;

  // TABLE → extract from SKU column or product text
  const skuText = row.innerText.match(/#(\d+)/);
  return skuText ? skuText[1] : null;
}

function getStatusFromRow(row) {
  const badge = row.querySelector(".status-badge");
  return badge ? badge.innerText.toLowerCase() : null;
}

function removeBySKU(sku) {
  // Remove table row
  document
    .querySelectorAll(".table-products tbody tr")
    .forEach(tr => {
      if (getSKUFromRow(tr) === sku) tr.remove();
    });

  // Remove mobile FAQ
  document
    .querySelectorAll(".faq-item")
    .forEach(item => {
      if (item.dataset.sku === sku) item.remove();
    });
}

/*************************************************
  SEARCH (TABLE + FAQ)
*************************************************/
const searchInput = document.getElementById("search-bar-table");
const faqNoResults = document.getElementById("faq-no-results");

if (searchInput) {
  searchInput.addEventListener("keyup", function () {
    const value = this.value.toLowerCase().trim();
    let faqCount = 0;

    document.querySelectorAll(".table-products tbody tr").forEach(row => {
      row.style.display = row.innerText.toLowerCase().includes(value) ? "" : "none";
    });

    document.querySelectorAll(".faq-item").forEach(item => {
      const match = item.innerText.toLowerCase().includes(value);
      item.style.display = match ? "" : "none";
      if (match) faqCount++;
    });

    if (faqNoResults) {
      faqNoResults.style.display = faqCount === 0 ? "block" : "none";
    }
  });
}

/*************************************************
  MOBILE FAQ ACCORDION (FIXED)
*************************************************/
document.querySelectorAll(".faq-item").forEach(item => {
  const btn = item.querySelector(".faq-question");
  if (!btn) return;

  btn.addEventListener("click", (e) => {

    // ❌ BLOCK FAQ TOGGLE IF ANY ACTION CLICKED
    if (
      e.target.closest(".order-actions") ||
      e.target.closest(".mobile-preview") ||
      e.target.closest(".three-dot") ||
      e.target.closest(".mobile-order-arrow") ||
      e.target.closest(".all-preview")
    ) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    document.querySelectorAll(".faq-item").forEach(i => {
      if (i !== item) i.classList.remove("active");
    });

    item.classList.toggle("active");
  });
});


/*************************************************
  3 DOT MENU (DESKTOP + MOBILE FIX)
*************************************************/
document.addEventListener("click", function (e) {
  const threeDot = e.target.closest(".three-dot");
  if (!threeDot) return;

  e.stopPropagation();
  e.preventDefault();

  const wrapper =
    threeDot.closest(".previewing") ||
    threeDot.closest(".mobile-preview");

  if (!wrapper) return;

  const menu = wrapper.querySelector(".all-preview");
  if (!menu) return;

  // close others
  document.querySelectorAll(".all-preview").forEach(m => {
    if (m !== menu) m.classList.remove("active-preview");
  });

  menu.classList.toggle("active-preview");
});


// PREVENT FAQ TOGGLE WHEN CLICKING ACTIONS
// document.addEventListener("click", function (e) {
//   if (
//     e.target.closest(".mobile-preview") ||
//     e.target.closest(".mobile-order-arrow") ||
//     e.target.closest(".all-preview")
//   ) {
//     e.stopPropagation();
//   }
// });

/*************************************************
  REMOVE (SYNC DELETE)
*************************************************/
document.addEventListener("click", function (e) {
  const removeBtn = e.target.closest(".all-preview div");
  if (!removeBtn) return;

  activeRow = getRowFromTarget(removeBtn);
  if (!activeRow) return;

  activeSKU = getSKUFromRow(activeRow);
  if (!activeSKU) return;

  document.getElementById("confirmOverlay").style.display = "flex";

  document.querySelectorAll(".all-preview").forEach(menu => {
    menu.style.display = "none";
  });
});

/*************************************************
  CONFIRM DELETE
*************************************************/
document.getElementById("confirmDelete").onclick = function () {
  if (activeSKU) {
    removeBySKU(activeSKU);
  }

  document.getElementById("confirmOverlay").style.display = "none";
  activeRow = null;
  activeSKU = null;
};

document.getElementById("cancelDelete").onclick = function () {
  document.getElementById("confirmOverlay").style.display = "none";
  activeRow = null;
  activeSKU = null;
};

document.getElementById("confirmOverlay").addEventListener("click", function (e) {
  if (e.target === this) {
    this.style.display = "none";
    activeRow = null;
    activeSKU = null;
  }
});

/*************************************************
  MODAL HANDLING
*************************************************/
function closeAllModals() {
  document.querySelectorAll(".order-modal").forEach(m => {
    m.style.display = "none";
  });
}

function showModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = "flex";
}

function openModalByStatus(status) {
  closeAllModals();

  if (status === "received") showModal("modal-received");
  if (status === "packed") showModal("modal-packed");
  if (status === "in transit") showModal("modal-transit");
  if (status === "delivered") showModal("modal-delivered");
  if (status === "return") showModal("modal-return");
}

/*************************************************
  OPEN MODAL (DESKTOP + MOBILE FIXED)
*************************************************/
document.addEventListener("click", function (e) {
  const arrow =
    e.target.closest(".order-arrow") ||
    e.target.closest(".mobile-order-arrow");

  if (!arrow) return;

  e.stopPropagation();
  e.preventDefault();

  const row =
    arrow.closest("tr") ||
    arrow.closest(".faq-item");

  if (!row) return;

  activeRow = row;
  activeSKU = row.dataset.sku || row.innerText.match(/#(\d+)/)?.[1];

  const badge = row.querySelector(".status-badge");
  if (!badge) return;

  const status = badge.innerText.toLowerCase();

  openModalByStatus(status);
});



/*************************************************
  CLOSE MODAL
*************************************************/
document.querySelectorAll(".close-order").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".order-modal").style.display = "none";
  });
});

/*************************************************
  STATUS UPDATE (SYNC TABLE + FAQ)
*************************************************/
document.addEventListener("click", function (e) {
  if (!activeSKU) return;

  if (e.target.id === "markPacked") updateStatus("Packed", "packed");
  if (e.target.id === "markTransit") updateStatus("In transit", "transit");
  if (e.target.id === "markDelivered") updateStatus("Delivered", "delivered");
});

function updateStatus(text, cls) {
  document.querySelectorAll(".status-badge").forEach(badge => {
    const row = badge.closest("tr") || badge.closest(".faq-item");
    if (!row) return;

    if (getSKUFromRow(row) === activeSKU) {
      badge.innerText = text;
      badge.className = "status-badge " + cls;
    }
  });

  openModalByStatus(text.toLowerCase());
}
