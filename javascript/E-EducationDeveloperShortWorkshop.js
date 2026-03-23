// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon = document.querySelector("#hamburger-menu>img");
var mobileBack = document.querySelector(".mobile-back-button");

hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display = "none";
    document.querySelector("body").style.overflow = "hidden";
    window.scrollTo(0, 0);
    mobileBack.style.display = "none";
  } else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow = "auto";
    document.querySelector(".bottom-nav").style.display = "flex";
    mobileBack.style.display = "flex";
  }
});

document.querySelectorAll(".DHMEP-three-dots").forEach((dot) => {
  dot.addEventListener("click", function (e) {
    e.stopPropagation();

    document.querySelectorAll(".DHMEP-popup-menu").forEach((menu) => {
      menu.style.display = "none";
    });

    const popup = this.closest("td").querySelector(".DHMEP-popup-menu");
    popup.style.display = "flex";
  });
});

document.addEventListener("click", function () {
  document.querySelectorAll(".DHMEP-popup-menu").forEach((menu) => {
    menu.style.display = "none";
  });
});

const addBtn = document.getElementById("DHMEP-addBtn");
const floatingBtn = document.querySelector(".DHMEP-floating-plus-btn");
const popup = document.getElementById("DHMEP-addProductPopup");
const closePopup = document.getElementById("DHMEP-closePopup");

addBtn.addEventListener("click", () => {
  popup.style.display = "flex";
});

floatingBtn.addEventListener("click", () => {
  popup.style.display = "flex";
});

closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});

const faqItems = document.querySelectorAll(".DHMEP-faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".DHMEP-faq-question");

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqItems.forEach((el) => el.classList.remove("active"));

    if (!isActive) {
      item.classList.add("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const tableRows = document.querySelectorAll(".DHMEP-brand-table tbody tr");
  const countElement = document.querySelector(".DHMEP-count");

  if (countElement) {
    countElement.textContent = tableRows.length + " Products";
  }

  const faqItems = document.querySelectorAll(
    ".DHMEP-MobileFAQ .DHMEP-faq-item",
  );
  const mobileCountElement = document.querySelector(".DHMEP-brandCount-mob");

  if (mobileCountElement) {
    mobileCountElement.textContent = faqItems.length + " Products";
  }
});

// DELETE ROW (TABLE)
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("DHMEP-delete-icon")) {
    const row = e.target.closest("tr");
    if (row) {
      row.remove();
      updateProductCount();
    }
  }
});

// DELETE FAQ ITEM (MOBILE)
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("DHMEP-delete-icon")) {
    const faqItem = e.target.closest(".DHMEP-faq-item");
    if (faqItem) {
      faqItem.remove();
      updateProductCount();
    }
  }
});

function updateProductCount() {
  const tableRows = document.querySelectorAll(".DHMEP-brand-table tbody tr");
  const countElement = document.querySelector(".DHMEP-count");

  if (countElement) {
    countElement.textContent = tableRows.length + " Products";
  }

  const faqItems = document.querySelectorAll(
    ".DHMEP-MobileFAQ .DHMEP-faq-item",
  );
  const mobileCountElement = document.querySelector(".DHMEP-brandCount-mob");

  if (mobileCountElement) {
    mobileCountElement.textContent = faqItems.length + " Products";
  }
}

document
  .querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(4)")
  .classList.add("sidebar-active");

document
  .querySelector("#account-menu .mobile-dropdown:nth-child(4) .dropdown-header")
  .classList.add("dropdown-header-active");

// ---- SEARCH IN MODAL ----
const searchInput = document.getElementById("DHMEP-searchInput");
const noResults = document.getElementById("DHMEP-noResults");

if (searchInput) {
  searchInput.addEventListener("input", function () {
    const query = this.value.trim().toLowerCase();
    const items = document.querySelectorAll(
      "#DHMEP-productList .DHMEP-product-item",
    );
    let visibleCount = 0;

    items.forEach((item) => {
      const name = (item.dataset.name || "").toLowerCase();
      const sku = (item.dataset.sku || "").toLowerCase();
      const matches = name.includes(query) || sku.includes(query);
      item.style.display = matches ? "flex" : "none";
      if (matches) visibleCount++;
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? "block" : "none";
    }
  });
}

// ---- ADD BUTTON VALIDATION + ADD TO TABLE ----
const addProductBtn = document.getElementById("DHMEP-addProductBtn");
const validationMsg = document.getElementById("DHMEP-validationMsg");

function createTableRow(name, sku, imgSrc, price, stock) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>
      <div class="DHMEP-product-info">
        <img src="${imgSrc}" class="DHMEP-product-img" />
        <span>${name}</span>
      </div>
    </td>
    <td>${sku}</td>
    <td>${price}</td>
    <td>${stock}</td>
    <td>
      <div class="DHMEP-action-area">
        <label class="DHMEP-switch">
          <input type="checkbox" checked />
          <span class="DHMEP-slider"></span>
        </label>
        <img src="../assets/develoeprHMExclusiveProducts/delete.svg" class="DHMEP-delete-icon" />
      </div>
    </td>
  `;
  return tr;
}

function createFaqItem(name, sku, imgSrc, price, stock) {
  const div = document.createElement("div");
  div.classList.add("DHMEP-faq-item");
  div.innerHTML = `
    <button class="DHMEP-faq-question">
      <div class="DHMEP-faq-title">
        <img src="${imgSrc}" class="DHMEP-product-img" />
        <div class="DHMEP-faq-user-text">
          <span class="DHMEP-faq-username">${name}</span>
        </div>
      </div>
      <img src="../assets/adminProductRecentlyAdded/CaretDown.svg" />
    </button>
    <div class="DHMEP-faq-answer">
      <div class="DHMEP-faq-row"><span>SKU ID Number</span><span>${sku}</span></div>
      <div class="DHMEP-faq-row"><span>Price</span><span>${price}</span></div>
      <div class="DHMEP-faq-row"><span>Stock</span><span>${stock}</span></div>
      <div class="DHMEP-faq-row">
        <span>Action</span>
        <span class="DHMEP-action-area">
          <label class="DHMEP-switch">
            <input type="checkbox" checked />
            <span class="DHMEP-slider"></span>
          </label>
        </span>
        <span>
          <img src="../assets/develoeprHMExclusiveProducts/delete.svg" class="DHMEP-delete-icon" />
        </span>
      </div>
    </div>
  `;
  // attach accordion toggle to new FAQ item
  const question = div.querySelector(".DHMEP-faq-question");
  question.addEventListener("click", () => {
    const isActive = div.classList.contains("active");
    document
      .querySelectorAll(".DHMEP-MobileFAQ .DHMEP-faq-item")
      .forEach((el) => el.classList.remove("active"));
    if (!isActive) div.classList.add("active");
  });
  return div;
}

if (addProductBtn) {
  addProductBtn.addEventListener("click", function () {
    const checkedItems = document.querySelectorAll(
      "#DHMEP-productList .DHMEP-product-item input[type='checkbox']:checked",
    );

    if (checkedItems.length === 0) {
      addProductBtn.classList.add("DHMEP-btn-error");
      if (validationMsg) validationMsg.classList.add("show");
      setTimeout(() => {
        addProductBtn.classList.remove("DHMEP-btn-error");
      }, 600);
      return;
    }

    // Add checked products to table & mobile FAQ
    const tbody = document.querySelector(".DHMEP-brand-table tbody");
    const faqContainer = document.querySelector(".DHMEP-MobileFAQ .DHMEP-faq");

    checkedItems.forEach((checkbox) => {
      const item = checkbox.closest(".DHMEP-product-item");
      const name = item.dataset.name || "Product Name";
      const sku = item.dataset.sku || "#0000000000000";
      const price = item.dataset.price || "₹2,674";
      const stock = item.dataset.stock || "4";
      const imgSrc = item.querySelector("img")
        ? item.querySelector("img").src
        : "../assets/develoeprHMExclusiveProducts/img.png";

      if (tbody)
        tbody.appendChild(createTableRow(name, sku, imgSrc, price, stock));

      if (faqContainer)
        faqContainer.appendChild(
          createFaqItem(name, sku, imgSrc, price, stock),
        );

      checkbox.checked = false;
      item.style.display = "none";
    });

    updateProductCount();

    // Close modal and reset
    const popupOverlay = document.getElementById("DHMEP-addProductPopup");
    if (popupOverlay) popupOverlay.style.display = "none";
    resetModal();
  });
}

// Clear validation on checkbox change
document.addEventListener("change", function (e) {
  if (e.target.closest("#DHMEP-productList")) {
    if (validationMsg) validationMsg.classList.remove("show");
    if (addProductBtn) addProductBtn.classList.remove("DHMEP-btn-error");
  }
});

// Clear search & reset on modal close
function resetModal() {
  if (searchInput) {
    searchInput.value = "";
    const items = document.querySelectorAll(
      "#DHMEP-productList .DHMEP-product-item",
    );
    items.forEach((item) => (item.style.display = "flex"));
    if (noResults) noResults.style.display = "none";
  }
  if (validationMsg) validationMsg.classList.remove("show");
  if (addProductBtn) addProductBtn.classList.remove("DHMEP-btn-error");
}

// Hook reset into close events
const closePopupBtn = document.getElementById("DHMEP-closePopup");
if (closePopupBtn) closePopupBtn.addEventListener("click", resetModal);
window.addEventListener("click", (e) => {
  const popupOverlay = document.getElementById("DHMEP-addProductPopup");
  if (e.target === popupOverlay) resetModal();
});
