// Carousel Functionality

let index = 0;
const slide = document.querySelector('.carousel-slide');
const images = document.querySelectorAll('.carousel-slide img');
const dots = document.querySelectorAll('.dot');

function showSlide(i) {
    if (i >= images.length) index = 0;
    if (i < 0) index = images.length - 1;

    slide.style.transform = `translateX(${-index * 100}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
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


/* ===============================
   ✅ SIDEBAR OPEN / CLOSE
================================ */
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

document.getElementById("openFilter").onclick = () => {
  sidebar.classList.add("active");
  overlay.classList.add("active");
};
document.getElementById("openSort").onclick = () => {
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

/* ===============================
   ✅ TOGGLE DROPDOWN
================================ */
function toggleSub(el) {
  const next = el.nextElementSibling;
  if (!next || !next.classList.contains("sub-options")) return;

  next.classList.toggle("open");
  const img = el.querySelector("img");
  if (img) img.classList.toggle("rotate");
}

/* ===============================
   ✅ GLOBALS
================================ */
const cards = document.querySelectorAll(".rv-card");
const noProductMsg = document.getElementById("noProductMsg");

/* ===============================
   ✅ INPUT EVENTS
================================ */
document.querySelectorAll("input").forEach(input => {
  input.addEventListener("change", applyFilters);
});

/* ===============================
   ✅ ACTIVE + COUNT HANDLER
================================ */
function updateHeaderCount(header, count, defaultText) {
  const span = header.querySelector("span");
  if (count > 0) {
    span.textContent = `${defaultText} (${count})`;
    header.classList.add("active");
  } else {
    span.textContent = defaultText;
    header.classList.remove("active");
  }
}

/* ===============================
   ✅ MAIN FILTER + SORT ENGINE
================================ */
function applyFilters() {

  const priceInput = document.querySelector('input[name="price"]:checked');

  const states    = [...document.querySelectorAll(".state:checked")].map(i => i.parentElement.innerText.trim());
  const materials = [...document.querySelectorAll(".material:checked")].map(i => i.parentElement.innerText.trim());
  const brands    = [...document.querySelectorAll(".brand:checked")].map(i => i.parentElement.innerText.trim());
  const sizes     = [...document.querySelectorAll(".size:checked")].map(i => i.parentElement.innerText.trim());

  const sortInputs = document.querySelectorAll('input[name="sort"]:checked');
  const recentChecked = document.getElementById("recentCheck").checked;

  const [min, max] = priceInput ? priceInput.value.split("-").map(Number) : [0, 999999];

  /* ===============================
     ✅ FILTER COUNTS
  =============================== */
  updateHeaderCount(document.querySelector("#priceLabel").closest(".filter-item"), priceInput ? 1 : 0, "Price Range");
  updateHeaderCount(document.querySelector("#stateLabel").closest(".filter-item"), states.length, "By State");
  updateHeaderCount(document.querySelectorAll(".filter-item")[2], materials.length, "Material");
  updateHeaderCount(document.querySelectorAll(".filter-item")[3], brands.length, "Brand");
  updateHeaderCount(document.querySelectorAll(".filter-item")[4], sizes.length, "Size");

  /* ===============================
     ✅ SORT COUNTS (✅ FIXED – EACH ONE IS INDEPENDENT)
  =============================== */
  updateHeaderCount(document.querySelectorAll(".filter-item")[5],
    document.querySelector('input[value="price_asc"]:checked') || document.querySelector('input[value="price_desc"]:checked') ? 1 : 0,
    "Price Range"
  );

  updateHeaderCount(document.querySelectorAll(".filter-item")[6],
    document.querySelector('input[value^="delivery"]:checked') ? 1 : 0,
    "Delivery Date"
  );

  updateHeaderCount(document.querySelectorAll(".filter-item")[7],
    document.querySelector('input[value^="rating"]:checked') ? 1 : 0,
    "Ratings"
  );

  updateHeaderCount(document.querySelectorAll(".filter-item")[8],
    document.querySelector('input[value^="discount"]:checked') ? 1 : 0,
    "Discount"
  );

  if (recentChecked) {
    document.querySelectorAll(".filter-item")[9].classList.add("active");
  } else {
    document.querySelectorAll(".filter-item")[9].classList.remove("active");
  }

  /* ===============================
     ✅ APPLY FILTERS TO PRODUCTS
  =============================== */
  let visibleCards = [];

  cards.forEach(card => {
    const price = Number(card.dataset.price);
    const state = card.dataset.state;
    const material = card.dataset.material;
    const brand = card.dataset.brand;
    const size = card.dataset.size;

    const match =
      price >= min && price <= max &&
      (states.length === 0 || states.includes(state)) &&
      (materials.length === 0 || materials.includes(material)) &&
      (brands.length === 0 || brands.includes(brand)) &&
      (sizes.length === 0 || sizes.includes(size));

    card.style.display = match ? "block" : "none";
    if (match) visibleCards.push(card);
  });

  applySortLogic(visibleCards);

  noProductMsg.style.display = visibleCards.length === 0 ? "block" : "none";
}

/* ===============================
   ✅ SORT ENGINE (✅ FIXED)
================================ */
function applySortLogic(visibleCards) {

  const activeSort = document.querySelector('input[name="sort"]:checked')?.value;
  const recentChecked = document.getElementById("recentCheck").checked;

  if (activeSort === "price_asc")
    visibleCards.sort((a, b) => a.dataset.price - b.dataset.price);

  if (activeSort === "price_desc")
    visibleCards.sort((a, b) => b.dataset.price - a.dataset.price);

  if (activeSort === "rating_desc")
    visibleCards.sort((a, b) => b.dataset.rating - a.dataset.rating);

  if (activeSort === "rating_asc")
    visibleCards.sort((a, b) => a.dataset.rating - b.dataset.rating);

  if (activeSort?.includes("delivery")) {
    const days = Number(activeSort.split("_")[1]);
    visibleCards = visibleCards.filter(c => c.dataset.delivery <= days);
  }

  if (activeSort?.includes("discount")) {
    const disc = Number(activeSort.split("_")[1]);
    visibleCards = visibleCards.filter(c => c.dataset.discount >= disc);
  }

  if (recentChecked) {
    visibleCards.sort((a, b) => b.dataset.date - a.dataset.date);
  }

  document.querySelector(".products").append(...visibleCards);
}

/* ===============================
   ✅ CLEAR ALL (✅ FULL RESET FIXED)
================================ */
function clearAll() {
  document.querySelectorAll("input").forEach(i => (i.checked = false));
  document.querySelectorAll(".filter-item").forEach(i => {
    i.classList.remove("active");
    const span = i.querySelector("span");
    if (span) span.textContent = span.textContent.split("(")[0];
  });

  cards.forEach(card => (card.style.display = "block"));
  noProductMsg.style.display = "none";
}
/* ✅ ALLOW RADIO TOGGLE (SELECT + DESELECT) */
document.querySelectorAll('input[type="radio"]').forEach(radio => {
  radio.addEventListener("click", function () {
    if (this.wasChecked) {
      this.checked = false;
      this.wasChecked = false;
      applyFilters();
    } else {
      document.querySelectorAll(`input[name="${this.name}"]`).forEach(r => r.wasChecked = false);
      this.wasChecked = true;
    }
  });
});

// ==============================
// LEFT ICON SMART SCROLL
// ==============================
// const leftIcons = document.querySelector(".left-icons");
// const productWrapper = document.querySelector(".rv-grid");

// window.addEventListener("scroll", () => {
//   const rect = productWrapper.getBoundingClientRect();

//   if (rect.top <= 100 && rect.bottom > 200) {
//     // Stick while products are visible
//     // leftIcons.classList.add("fixed");
//   } else {
//     // Remove sticky after section ends
//     // leftIcons.classList.remove("fixed");
//   }
// });
function handleLeftIconsPlacement() {
  const leftIcons = document.querySelector(".left-icons");
  const heading = document.querySelector(".pdthead");
  const wrapper = document.querySelector(".pc-wapper");

  if (window.innerWidth <= 480) {
    // Move to heading in mobile
    if (!heading.contains(leftIcons)) {
      heading.appendChild(leftIcons);
      leftIcons.classList.add("mobile-in-header");
    }
  } else {
    // Move back to wrapper in desktop/tablet
    if (!wrapper.contains(leftIcons)) {
      wrapper.insertBefore(leftIcons, wrapper.firstChild);
      leftIcons.classList.remove("mobile-in-header");
    }
  }
}

// Run on load
handleLeftIconsPlacement();

// Run on resize
window.addEventListener("resize", handleLeftIconsPlacement);
