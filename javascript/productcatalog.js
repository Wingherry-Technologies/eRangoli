// Carousel Functionality

let index = 0;
const slide = document.querySelector(".carousel-slide");
const images = document.querySelectorAll(".carousel-slide img");
const dots = document.querySelectorAll(".dot");

function showSlide(i) {
  if (i >= images.length) index = 0;
  if (i < 0) index = images.length - 1;

  slide.style.transform = `translateX(${-index * 100}%)`;

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

dots.forEach((dot, i) => {
  dot.onclick = () => {
    index = i;
    showSlide(index);
  };
});

// Auto slide every 3 seconds
setInterval(() => {
  index++;
  showSlide(index);
}, 3000);

// Initial render
showSlide(index);

/* ================================
   GLOBALS (single source of truth)
   ================================ */
const productsWrap = document.querySelector(".products");
const cards = Array.from(document.querySelectorAll(".pd-card")); // <- single global list
const noProductMsg = document.getElementById("noProductMsg");
const paginationBar = document.querySelector(".pd-pagination-bar");
const pageCount = document.querySelector(".pd-page-count");
let filteredCards = [...cards];

/* Pagination state */
let currentPage = 1;
const perPage = 16;

/* Sidebar / overlay */
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

/* ===============================
   SIDEBAR / LEFT ICONS STUFF
   =============================== */
function syncSidebarHeight() {
  const sidebarEl = document.querySelector(".left-sidebar");
  const icons = document.querySelector(".left-icons");
  const wrapper = document.querySelector(".products-wrapper");

  if (!sidebarEl || !icons || !wrapper) return;

  // MOBILE — full screen
  if (window.innerWidth <= 480) {
    sidebarEl.style.height = "100vh";
    sidebarEl.style.top = "0px";
    return;
  }

  const iconsRect = icons.getBoundingClientRect();
  const wrapperRect = wrapper.getBoundingClientRect();

  const relativeTop = iconsRect.top - wrapperRect.top;
  sidebarEl.style.top = relativeTop + "px";

  // Match HEIGHT (if icons have auto height, use computed)
  sidebarEl.style.height = iconsRect.height + "px";
}

document.getElementById("openFilter").onclick = () => {
  syncSidebarHeight();
  sidebar.classList.add("active");
  overlay.classList.add("active");
};

document.getElementById("openSort").onclick = () => {
  syncSidebarHeight();
  sidebar.classList.add("active");
  overlay.classList.add("active");
};

overlay.onclick = () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
};

function closeSidebar() {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
}

window.addEventListener("resize", syncSidebarHeight);
window.addEventListener("scroll", syncSidebarHeight);

/* ===============================
   DROPDOWN TOGGLER (sidebar items)
   =============================== */
function toggleSub(el) {
  const next = el.nextElementSibling;
  if (!next || !next.classList.contains("sub-options")) return;

  next.classList.toggle("open");
  const img = el.querySelector("img");
  if (img) img.classList.toggle("rotate");
}

/* ===============================
   HELPER: update header count
   =============================== */
function updateHeaderCount(header, count, defaultText) {
  if (!header) return;
  const span = header.querySelector("span") || header; // some filter-item use span as label
  if (count > 0) {
    span.textContent = `${defaultText} (${count})`;
    header.classList.add("active");
  } else {
    span.textContent = defaultText;
    header.classList.remove("active");
  }
}

/* ===============================
   RADIO DESELECT (allow toggle)
   =============================== */
document.querySelectorAll('input[type="radio"]').forEach((radio) => {
  radio.addEventListener("click", function () {
    const name = this.name;
    // Toggle using dataset flag
    if (this.dataset.wasChecked === "true") {
      // deselect all radios in this group
      document.querySelectorAll(`input[name="${name}"]`).forEach((r) => {
        r.checked = false;
        r.dataset.wasChecked = "false";
      });
      // re-run filters (show all)
      applyFilters();
      return;
    }

    // mark this as checked and others as false
    document
      .querySelectorAll(`input[name="${name}"]`)
      .forEach((r) => (r.dataset.wasChecked = "false"));
    this.dataset.wasChecked = "true";

    // apply filters for newly selected radio
    applyFilters();
  });
});

/* ===============================
   INPUT CHANGE BINDING
   =============================== */
document.querySelectorAll("input").forEach((input) => {
  // For all inputs (checkboxes, radios), run filters when changed
  input.addEventListener("change", () => {
    // For radio groups we rely on radio click handler, but change is ok too
    applyFilters();
  });
});
function updatePaginationButtons() {
  const prevBtn = document.getElementById("pd-prev");
  const nextBtn = document.getElementById("pd-next");

  const totalCards = filteredCards.length;
  const totalPages = Math.ceil(totalCards / perPage);

  // No pagination needed
  if (totalCards <= perPage) {
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    prevBtn.classList.add("disabled");
    nextBtn.classList.add("disabled");
    return;
  }

  // First page
  if (currentPage === 1) {
    prevBtn.disabled = true;
    prevBtn.classList.add("disabled");
  } else {
    prevBtn.disabled = false;
    prevBtn.classList.remove("disabled");
  }

  // Last page
  if (currentPage === totalPages) {
    nextBtn.disabled = true;
    nextBtn.classList.add("disabled");
  } else {
    nextBtn.disabled = false;
    nextBtn.classList.remove("disabled");
  }
}

/* ===============================
   MAIN FILTER + SORT ENGINE
   =============================== */
function applyFilters() {
  // Read filter inputs
  const priceInput = document.querySelector('input[name="price"]:checked');
  const states = [...document.querySelectorAll(".state:checked")].map((i) =>
    i.parentElement.innerText.trim()
  );
  const materials = [...document.querySelectorAll(".material:checked")].map(
    (i) => i.parentElement.innerText.trim()
  );
  const brands = [...document.querySelectorAll(".brand:checked")].map((i) =>
    i.parentElement.innerText.trim()
  );
  const sizes = [...document.querySelectorAll(".size:checked")].map((i) =>
    i.parentElement.innerText.trim()
  );
  const recentChecked =
    !!document.getElementById("recentCheck") &&
    document.getElementById("recentCheck").checked;

  // parse price range
  const [min, max] = priceInput
    ? priceInput.value.split("-").map(Number)
    : [0, 999999];

  // Update header counts
  updateHeaderCount(
    document.querySelector("#priceLabel")?.closest(".filter-item"),
    priceInput ? 1 : 0,
    "Price Range"
  );
  updateHeaderCount(
    document.querySelector("#stateLabel")?.closest(".filter-item"),
    states.length,
    "By State"
  );
  updateHeaderCount(
    document.querySelectorAll(".filter-item")[2],
    materials.length,
    "Material"
  );
  updateHeaderCount(
    document.querySelectorAll(".filter-item")[3],
    brands.length,
    "Brand"
  );
  updateHeaderCount(
    document.querySelectorAll(".filter-item")[4],
    sizes.length,
    "Size"
  );

  updateHeaderCount(
    document.querySelectorAll(".filter-item")[5],
    document.querySelector('input[name="sortPrice"]:checked') ? 1 : 0,
    "Price Range"
  );
  updateHeaderCount(
    document.querySelectorAll(".filter-item")[6],
    document.querySelector('input[name="sortDelivery"]:checked') ? 1 : 0,
    "Delivery Date"
  );
  updateHeaderCount(
    document.querySelectorAll(".filter-item")[7],
    document.querySelector('input[name="sortRating"]:checked') ? 1 : 0,
    "Ratings"
  );
  updateHeaderCount(
    document.querySelectorAll(".filter-item")[8],
    document.querySelector('input[name="sortDiscount"]:checked') ? 1 : 0,
    "Discount"
  );
  // toggle Recently Added active class
  const recentHeader = document.querySelectorAll(".filter-item")[9];
  if (recentHeader) recentHeader.classList.toggle("active", recentChecked);

  // Build visible list by applying filters to global cards
  let visibleCards = cards.filter((card) => {
    const price = Number(card.dataset.price || 0);
    const state = (card.dataset.state || "").trim();
    const material = (card.dataset.material || "").trim();
    const brand = (card.dataset.brand || "").trim();
    const size = (card.dataset.size || "").trim();

    const priceMatch = price >= min && price <= max;
    const stateMatch = states.length === 0 || states.includes(state);
    const materialMatch =
      materials.length === 0 || materials.includes(material);
    const brandMatch = brands.length === 0 || brands.includes(brand);
    const sizeMatch = sizes.length === 0 || sizes.includes(size);

    return priceMatch && stateMatch && materialMatch && brandMatch && sizeMatch;
  });

  // Additional filter radios (delivery, discount)
  const deliveryRadio = document.querySelector(
    'input[name="sortDelivery"]:checked'
  );
  if (deliveryRadio) {
    const days = Number((deliveryRadio.value || "").split("_")[1] || 0);
    visibleCards = visibleCards.filter((c) => {
      const d = Number(c.dataset.delivery || 9999);
      return d <= days;
    });
  }

  const discountRadio = document.querySelector(
    'input[name="sortDiscount"]:checked'
  );
  if (discountRadio) {
    const minDisc = Number((discountRadio.value || "").split("_")[1] || 0);
    visibleCards = visibleCards.filter((c) => {
      const disc = Number(c.dataset.discount || 0);
      return disc >= minDisc;
    });
  }

  // Sorting priority: recentChecked > rating radio > price radio
  const ratingRadio = document.querySelector(
    'input[name="sortRating"]:checked'
  );
  const priceSortRadio = document.querySelector(
    'input[name="sortPrice"]:checked'
  );

  if (recentChecked) {
    visibleCards.sort(
      (a, b) => Number(b.dataset.date || 0) - Number(a.dataset.date || 0)
    );
  } else if (ratingRadio) {
    const v = ratingRadio.value || "";
    if (v.includes("desc")) {
      visibleCards.sort(
        (a, b) => Number(b.dataset.rating || 0) - Number(a.dataset.rating || 0)
      );
    } else {
      visibleCards.sort(
        (a, b) => Number(a.dataset.rating || 0) - Number(b.dataset.rating || 0)
      );
    }
  } else if (priceSortRadio) {
    const v = priceSortRadio.value || "";
    if (v.includes("asc")) {
      visibleCards.sort(
        (a, b) => Number(a.dataset.price || 0) - Number(b.dataset.price || 0)
      );
    } else {
      visibleCards.sort(
        (a, b) => Number(b.dataset.price || 0) - Number(a.dataset.price || 0)
      );
    }
  }
  // else: keep original DOM order

  // Hide all cards first
  cards.forEach((card) => card.classList.add("is-hidden"));

  // Save filtered list
  filteredCards = visibleCards;

  /* 🚫 NO RESULTS */
  if (filteredCards.length === 0) {
    noProductMsg.style.display = "flex";
    paginationBar.style.display = "none";
    productsWrap.classList.add("no-results");
    updateWrapperHeight();
    return;
  }

  /* ✅ RESULTS FOUND */
  productsWrap.classList.remove("no-results");
  noProductMsg.style.display = "none";
  paginationBar.style.display = "";

  // Reset pagination
  currentPage = 1;
  showPage(1, false);
}

/* ===============================
   CLEAR ALL
   =============================== */
function clearAll() {
  // Reset all inputs and dataset flags
  document.querySelectorAll("input").forEach((i) => {
    i.checked = false;
    if (i.type === "radio" || i.type === "checkbox")
      i.dataset.wasChecked = "false";
  });

  // Reset UI header counters
  document.querySelectorAll(".filter-item").forEach((i) => {
    i.classList.remove("active");
    const span = i.querySelector("span");
    if (span) span.textContent = span.textContent.split("(")[0].trim();
  });

  // Show all cards
  // cards.forEach(card => card.style.display = "block");

  // Show pagination and hide no-product message
  // if (paginationBar) paginationBar.style.display = "";
  // noProductMsg.style.display = "none";
  // ✅ RESET FILTER SOURCE
  // Reset all inputs
  document.querySelectorAll("input").forEach((i) => {
    i.checked = false;
    if (i.type === "radio" || i.type === "checkbox") {
      i.dataset.wasChecked = "false";
    }
  });

  // Reset filter headers
  document.querySelectorAll(".filter-item").forEach((i) => {
    i.classList.remove("active");
    const span = i.querySelector("span");
    if (span) span.textContent = span.textContent.split("(")[0].trim();
  });

  // ✅ IMPORTANT: remove no-results state
  productsWrap.classList.remove("no-results");

  // Hide no-results message
  noProductMsg.style.display = "none";

  // Restore pagination
  paginationBar.style.display = "";

  // Reset filtered source
  filteredCards = [...cards];

  // Reset pagination
  currentPage = 1;

  // Show first page properly
  showPage(1, false);
}

function updateWrapperHeight() {
  const wrapper = document.querySelector(".products-wrapper");
  const grid = document.querySelector(".products.pd-grid");

  if (!wrapper || !grid) return;

  // 🚫 When no results → do NOT measure cards
  if (filteredCards.length === 0) {
    wrapper.style.minHeight = "60vh";
    return;
  }

  // Measure grid height AS-IS (no card toggling)
  const height = grid.scrollHeight;
  wrapper.style.minHeight = `${height}px`;
}

function showPage(page, shouldScroll = true) {
  if (!filteredCards.length) return;

  const totalVisible = filteredCards.length;
  const totalPages = Math.ceil(totalVisible / perPage);

  page = Math.max(1, Math.min(page, totalPages));
  currentPage = page;

  const start = (page - 1) * perPage;
  const end = start + perPage;

  // Hide all cards
  cards.forEach((card) => card.classList.add("is-hidden"));

  // Show only current page cards
  filteredCards.forEach((card, idx) => {
    if (idx >= start && idx < end) {
      card.classList.remove("is-hidden");
    }
  });

  pageCount.textContent = `${start + 1}–${Math.min(
    end,
    totalVisible
  )} of ${totalVisible}`;
  updatePaginationButtons();
  updateWrapperHeight();

  if (shouldScroll) {
    document.querySelector(".products").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}
window.addEventListener("resize", () => {
  updateWrapperHeight();
});

/* Prev / Next */
document.getElementById("pd-prev").addEventListener("click", (e) => {
  e.preventDefault();
  if (currentPage > 1) showPage(currentPage - 1, true);
});

document.getElementById("pd-next").addEventListener("click", (e) => {
  e.preventDefault();
  const totalPages = Math.ceil(filteredCards.length / perPage);
  if (currentPage < totalPages) showPage(currentPage + 1, true);
});

/* ===============================
   INITIALIZE
   =============================== */
// place left-icons to header on mobile and back on resize
function handleLeftIconsPlacement() {
  const leftIcons = document.querySelector(".left-icons");
  const heading = document.querySelector(".pdthead");
  const wrapper = document.querySelector(".products-wrapper");
  if (!leftIcons || !heading || !wrapper) return;

  if (window.innerWidth <= 480) {
    if (!heading.contains(leftIcons)) {
      heading.appendChild(leftIcons);
      leftIcons.classList.add("mobile-in-header");
    }
  } else {
    if (!wrapper.contains(leftIcons)) {
      wrapper.insertBefore(leftIcons, wrapper.firstChild);
      leftIcons.classList.remove("mobile-in-header");
    }
  }
}

handleLeftIconsPlacement();
window.addEventListener("resize", handleLeftIconsPlacement);

/* Run initial sync and render */
syncSidebarHeight();
applyFilters(); // initial render: applies no filters => shows all and prepares pagination

// ================= SHARE =================
document.addEventListener("click", function (e) {

  const shareBtn = e.target.closest(".share-btn");

  // Click outside → close all
  if (!shareBtn) {
    document.querySelectorAll(".share-popup").forEach(popup => {
      popup.classList.remove("active");
    });
    return;
  }

  e.stopPropagation();

  const popup = shareBtn.nextElementSibling;
  const isOpen = popup.classList.contains("active");

  // Close all popups first
  document.querySelectorAll(".share-popup").forEach(p => {
    p.classList.remove("active");
  });

  // Open only if it was closed
  if (!isOpen) {
    popup.classList.add("active");
  }
});


// ================= SHARE ACTIONS =================
document.querySelectorAll(".share-option").forEach(icon => {
  icon.addEventListener("click", function (e) {
    e.stopPropagation();

    const type = this.dataset.type;
    const card = this.closest(".pd-card, .rv-card");
    const productName =
      card.querySelector(".pd-name, .rv-name").innerText;

    const url =
      window.location.origin +
      window.location.pathname +
      "#" +
      productName.replace(/\s+/g, "-");

    if (type === "copy") {
      navigator.clipboard.writeText(url);
      alert("Link copied!");
    }

    if (type === "whatsapp") {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(productName + " " + url)}`,
        "_blank"
      );
    }

    if (type === "telegram") {
      window.open(
        `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(productName)}`,
        "_blank"
      );
    }

    if (type === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(productName)}&url=${encodeURIComponent(url)}`,
        "_blank"
      );
    }
  });
});


document.querySelectorAll(".wishlist-icon").forEach(icon => {
  icon.addEventListener("click", function (e) {
    e.stopPropagation();

    const normalImg = "../assets/productcatalog/Heart.svg";
    const activeImg = "../assets/productcatalog/redHeart.svg";

    if (this.dataset.active === "true") {
      this.src = normalImg;
      this.dataset.active = "false";
    } else {
      this.src = activeImg;
      this.dataset.active = "true";
    }
  });
});
