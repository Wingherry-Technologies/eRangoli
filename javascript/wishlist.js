/* ================================
   GLOBALS (single source of truth)
   ================================ */
/* ===============================
   GLOBALS (PAGINATION ONLY)
   =============================== */
const productsWrap = document.querySelector(".products");
let cards = Array.from(document.querySelectorAll(".pd-card"));
let filteredCards = [...cards];

const paginationBar = document.querySelector(".pd-pagination-bar");
const pageCount = document.querySelector(".pd-page-count");

let currentPage = 1;
const perPage = 16;

/* ===============================
   PAGINATION BUTTON STATE
   =============================== */
function updatePaginationButtons() {
  const prevBtn = document.getElementById("pd-prev");
  const nextBtn = document.getElementById("pd-next");

  const totalCards = filteredCards.length;
  const totalPages = Math.ceil(totalCards / perPage);

  if (totalCards <= perPage) {
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    prevBtn.classList.add("disabled");
    nextBtn.classList.add("disabled");
    return;
  }

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;

  prevBtn.classList.toggle("disabled", currentPage === 1);
  nextBtn.classList.toggle("disabled", currentPage === totalPages);
}

/* ===============================
   SHOW PAGE
   =============================== */
function showPage(page, shouldScroll = true) {
  if (!filteredCards.length) return;

  const total = filteredCards.length;
  const totalPages = Math.ceil(total / perPage);

  currentPage = Math.max(1, Math.min(page, totalPages));

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  cards.forEach(card => card.classList.add("is-hidden"));

  filteredCards.forEach((card, index) => {
    if (index >= start && index < end) {
      card.classList.remove("is-hidden");
    }
  });

  pageCount.textContent = `${start + 1}–${Math.min(end, total)} of ${total}`;
  updatePaginationButtons();

  if (shouldScroll) {
    productsWrap.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* ===============================
   PREV / NEXT
   =============================== */
document.getElementById("pd-prev").addEventListener("click", (e) => {
  e.preventDefault();
  if (currentPage > 1) showPage(currentPage - 1);
});

document.getElementById("pd-next").addEventListener("click", (e) => {
  e.preventDefault();
  const totalPages = Math.ceil(filteredCards.length / perPage);
  if (currentPage < totalPages) showPage(currentPage + 1);
});
/* ===============================
   HANDLE CARD REMOVAL (WISHLIST)
   =============================== */
document.addEventListener("click", function (e) {
  const wishlistIcon = e.target.closest(".pd-wishlist img");
  if (!wishlistIcon) return;

  const card = wishlistIcon.closest(".pd-card");

  card.style.transition = "0.3s ease";
  card.style.opacity = "0";
  card.style.transform = "scale(0.95)";

  setTimeout(() => {
    card.remove();

    // update sources
    cards = cards.filter(c => c !== card);
    filteredCards = filteredCards.filter(c => c !== card);

    if (filteredCards.length === 0) {
      productsWrap.innerHTML =
        "<p style='text-align:center;padding:40px;'>No products found</p>";
      paginationBar.style.display = "none";
      pageCount.textContent = "";
      return;
    }

    const totalPages = Math.ceil(filteredCards.length / perPage);
    if (currentPage > totalPages) currentPage = totalPages;

    showPage(currentPage, false);
  }, 300);
});

/* ===============================
   INIT
   =============================== */
showPage(1, false);
/* ================= STOCK STATUS ================= */
function applyStockStatus() {
  document.querySelectorAll(".pd-card").forEach((card) => {
    const stock = card.dataset.stock;
    const cartBtn = card.querySelector(".pd-cart-btn");
    const outBtn = card.querySelector(".pd-out-btn");
    const notify = card.querySelector(".pd-notify");

    if (stock === "out") {
      card.classList.add("out-of-stock");
      cartBtn.style.display = "none";
      outBtn.style.display = "block";
      notify.style.display = "block";
    } else {
      card.classList.remove("out-of-stock");
      cartBtn.style.display = "block";
      outBtn.style.display = "none";
      notify.style.display = "none";
    }
  });
}
applyStockStatus();
/* ================= NOTIFY ME ALERT ================= */
document.addEventListener("click", function (e) {
  const notifyBtn = e.target.closest(".pd-notify");
  if (!notifyBtn) return;

  e.stopPropagation();

  const card = notifyBtn.closest(".pd-card");
  const productName = card.querySelector(".pd-name").innerText;

  alert(`You will be notified when "${productName}" is back in stock.`);
});

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

    const normalImg = "../assets/master/Heart2.svg";
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

// ================= WISHLIST REMOVE (UNLIKE) =================
// ================= WISHLIST REMOVE (UNLIKE) =================
// document.addEventListener("click", function (e) {

//   const wishlistIcon = e.target.closest(".pd-wishlist img");
//   if (!wishlistIcon) return;

//   e.stopPropagation();

//   const card = wishlistIcon.closest(".pd-card");

//   card.style.transition = "0.3s ease";
//   card.style.opacity = "0";
//   card.style.transform = "scale(0.95)";

//   setTimeout(() => {
//     /* 1️⃣ Remove from DOM */
//     card.remove();

//     /* 2️⃣ Update cards source */
//     cards = cards.filter(c => c !== card);

//     /* 3️⃣ Update filtered source */
//     filteredCards = filteredCards.filter(c => c !== card);

//     /* 4️⃣ Handle empty wishlist */
//     if (filteredCards.length === 0) {
//       document.querySelector(".pd-grid").innerHTML =
//         "<p style='text-align:center;width:100%;padding:40px; margin:10px auto;'>No items in wishlist ❤️</p>";
//       paginationBar.style.display = "none";
//       pageCount.textContent = "";
//       return;
//     }

//     /* 5️⃣ Fix pagination */
//     const totalPages = Math.ceil(filteredCards.length / perPage);
//     if (currentPage > totalPages) currentPage = totalPages;

//     showPage(currentPage, false);
//   }, 300);
// });


