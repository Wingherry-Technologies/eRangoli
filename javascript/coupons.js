/* =========================
   ELEMENTS
   ========================= */
const menuItems = document.querySelectorAll(".coupon-menu li");
const coupons = document.querySelectorAll(".coupon-item");
const noCoupons = document.querySelector(".no-coupons");

const referralPopup = document.getElementById("referralPopup");

const sidebar = document.querySelector(".coupon-sidebar");
const overlay = document.querySelector(".sidebar-overlay");
const closeBtn = document.querySelector(".sidebar-close");

/* =========================
   SIDEBAR FUNCTIONS
   ========================= */
function openSidebar() {
  sidebar.classList.add("open");
  overlay.classList.add("show");
}

function closeSidebar() {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
}

/* =========================
   MENU CLICK (FILTER + OPEN)
   ========================= */
menuItems.forEach(item => {
  item.addEventListener("click", () => {

    /* Tablet → open sidebar only */
    if (window.innerWidth <= 1024) {
      openSidebar();
    }

    /* Active state */
    menuItems.forEach(li => li.classList.remove("active"));
    item.classList.add("active");

    const type = item.innerText.toLowerCase();

    /* Referral popup */
    if (type.includes("referral")) {
      referralPopup.classList.add("show");
      return;
    }

    let visible = 0;

    /* FILTER WITH ANIMATION */
    coupons.forEach(coupon => {
      const box = coupon.closest(".cop-bx");

      const shouldShow =
        type.includes("all") ||
        (coupon.dataset.type === "discount" && type.includes("discount")) ||
        (coupon.dataset.type === "bank" && type.includes("bank"));

      if (shouldShow) {
        box.style.display = "block";
        requestAnimationFrame(() => {
          box.classList.remove("hide");
        });
        visible++;
      } else {
        box.classList.add("hide");
        setTimeout(() => {
          box.style.display = "none";
        }, 250);
      }
    });

    noCoupons.style.display = visible ? "none" : "block";
  });
});

/* =========================
   SIDEBAR CLOSE
   ========================= */
if (closeBtn) closeBtn.addEventListener("click", closeSidebar);
if (overlay) overlay.addEventListener("click", closeSidebar);

/* =========================
   POPUP CLOSE
   ========================= */
document.querySelector(".close-popup").addEventListener("click", () => {
  referralPopup.classList.remove("show");
});

/* COPY CODE */
document.querySelector(".copy-btn").addEventListener("click", () => {
  navigator.clipboard.writeText("DAVID200");
  alert("Referral code copied!");
});


// share
/* =========================
   SHARE BUTTON FUNCTIONALITY
   ========================= */

document.addEventListener("click", function (e) {

  /* -------------------------
     SHARE BUTTON CLICK
     ------------------------- */
  const shareBtn = e.target.closest(".share-btn");

  if (shareBtn) {
    e.stopPropagation();

    const popup = shareBtn.nextElementSibling;
    const isOpen = popup.classList.contains("active");

    /* Close all popups first */
    document.querySelectorAll(".share-popup").forEach(p => {
      p.classList.remove("active");
    });

    /* Toggle current popup */
    if (!isOpen) {
      popup.classList.add("active");
    }

    return;
  }

  /* -------------------------
     SHARE OPTION CLICK
     ------------------------- */
  const option = e.target.closest(".share-option");

  if (option) {
    e.stopPropagation();

    const type = option.dataset.type;
    const card = option.closest(".product-card") || option.closest(".pd-card");

    const productName =
      card?.querySelector(".product-name")?.innerText ||
      "Product";

    const url =
      window.location.origin +
      window.location.pathname +
      "#" +
      productName.replace(/\s+/g, "-").toLowerCase();

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

    /* Close popup after action */
    option.closest(".share-popup").classList.remove("active");
    return;
  }

  /* -------------------------
     OUTSIDE CLICK → CLOSE
     ------------------------- */
  document.querySelectorAll(".share-popup").forEach(p => {
    p.classList.remove("active");
  });
});
