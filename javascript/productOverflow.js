
//    Thumbnails & main image switching
const productOverviewThumbnails = document.querySelectorAll(".productOverviewThumbnail");
const productOverviewMainImg = document.getElementById("productOverviewMainImg");

// thumbil image click function
productOverviewThumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", function () {
    // Remove active class from all thumbnails
    productOverviewThumbnails.forEach((t) =>
      t.classList.remove("productOverviewActive")
    );

    // Add active class to clicked thumbnail
    this.classList.add("productOverviewActive");

    // Update main image
    const thumbImg = this.querySelector("img");
    productOverviewMainImg.src = thumbImg.src;
  });
});


//    Product Details & Return Policy toggles

const detailSections = document.querySelectorAll(".productOverviewDetailsSection");

detailSections.forEach((section) => {
  const toggleIcon = section.querySelector(".sectionToggleIcon");
  if (!toggleIcon) return;

  toggleIcon.addEventListener("click", () => {
    section.classList.toggle("expanded");

    // set icon based on expanded state
    if (section.classList.contains("expanded")) {
      toggleIcon.src = "../assets/productOverview/Minus.svg";  // minus icon
    } else {
      toggleIcon.src = "../assets/productOverview/PlusSign.svg";   // plus icon
    }
  });
});


//    Simple Read More toggle for review cards
const reviewCards = document.querySelectorAll(".productOverviewReviewCard");

reviewCards.forEach(card => {
  const btn = card.querySelector(".reviewReadMoreBtn");
  const text = card.querySelector(".productOverviewReviewText");

  if (!btn) return;

  btn.addEventListener("click", () => {
    card.classList.toggle("expanded");

    btn.textContent = card.classList.contains("expanded")
      ? "Hide"
      : "Read more";
  });
});


//    Main Image Arrow Navigation

const allThumbImgs = Array.from(document.querySelectorAll(".productOverviewThumbnail img"));
let currentIndex = 0;

// LEFT ARROW
document.querySelector(".leftArrow").addEventListener("click", function () {
  currentIndex = (currentIndex - 1 + allThumbImgs.length) % allThumbImgs.length;
  updateMainImage();
});

// RIGHT ARROW
document.querySelector(".rightArrow").addEventListener("click", function () {
  currentIndex = (currentIndex + 1) % allThumbImgs.length;
  updateMainImage();
});

// Function to update main image + active thumbnail
function updateMainImage() {
  productOverviewMainImg.src = allThumbImgs[currentIndex].src;

  document.querySelectorAll(".productOverviewThumbnail")
    .forEach(t => t.classList.remove("productOverviewActive"));

  document.querySelectorAll(".productOverviewThumbnail")[currentIndex]
    .classList.add("productOverviewActive");
}

productOverviewThumbnails.forEach((thumb, i) => {
  thumb.addEventListener("click", function () {
    currentIndex = i;
  });
});

/* -------------------------------------
   Pincode input handling and delivery UI
   (validation, show/hide messages)
   ------------------------------------- */
(function () {
  const PINCODE_MATCH = "474001"; // dummy ZIP that shows delivery date
  const pincodeInput = document.querySelector(".productOverviewPincodeInput");
  const pincodeBtn = document.querySelector(".productOverviewPincodeBtn");
  const deliveryEstimate = document.querySelector(".productOverviewDeliveryEstimate");

  if (!pincodeInput || !pincodeBtn || !deliveryEstimate) return;

  deliveryEstimate.innerHTML = '<span class="deliveryLabel">Delivery by</span> <span class="deliveryDate">Dec 15th</span> <span class="pincodeError"></span>';
  deliveryEstimate.classList.remove("show-date", "show-error");

  // input attributes & sanitize behavior
  pincodeInput.setAttribute("maxlength", "6");
  pincodeInput.setAttribute("inputmode", "numeric");

  const strayError = document.querySelectorAll(".pincodeError:not(.in-delivery)");
  strayError.forEach(el => {
    if (!el.closest(".productOverviewDeliveryEstimate")) el.remove();
  });

  function showInlineError(msg) {
    const err = deliveryEstimate.querySelector(".pincodeError");
    if (!err) return;
    err.textContent = msg;
    deliveryEstimate.classList.remove("show-date");
    deliveryEstimate.classList.add("show-error");
  }

  function showDeliveryDate(dateText) {
    const dateEl = deliveryEstimate.querySelector(".deliveryDate");
    const err = deliveryEstimate.querySelector(".pincodeError");
    if (!dateEl || !err) return;
    dateEl.textContent = dateText;
    deliveryEstimate.classList.remove("show-error");
    deliveryEstimate.classList.add("show-date");
    err.textContent = "";
  }

  function showOnlyLabel() {
    deliveryEstimate.classList.remove("show-error", "show-date");
    const err = deliveryEstimate.querySelector(".pincodeError");
    if (err) err.textContent = "";
  }

  pincodeInput.addEventListener("input", function () {
    const cleaned = this.value.replace(/\D/g, ""); // remove non-digits
    if (this.value !== cleaned) this.value = cleaned;
    showOnlyLabel();
  });

  pincodeInput.addEventListener("keydown", function (e) {
    const allowed = ["Backspace","ArrowLeft","ArrowRight","Tab","Delete","Home","End"];
    if (allowed.includes(e.key)) return;
    if (!/^\d$/.test(e.key)) e.preventDefault();
  });

  pincodeBtn.addEventListener("click", function (ev) {
    ev.preventDefault();
    const val = (pincodeInput.value || "").trim();

    // Validation: exactly 6 digits
    if (!/^\d{6}$/.test(val)) {
      showInlineError("Please enter a valid 6-digit PIN code.");
      return;
    }

    if (val === PINCODE_MATCH) {
      showDeliveryDate("Dec 15th");
    } else {
      showInlineError("Service not available at this PIN code.");
    }
  });

  pincodeInput.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      pincodeInput.value = "";
      showOnlyLabel();
    }
  });

  // initial state
  showOnlyLabel();
})();

//    Color option selection
const productOverviewColorOptions = document.querySelectorAll(".productOverviewColorOption");
productOverviewColorOptions.forEach((option) => {
  option.addEventListener("click", function () {
    productOverviewColorOptions.forEach((opt) =>
      opt.classList.remove("productOverviewActive")
    );
    this.classList.add("productOverviewActive");
  });
});

//    Personalization character counter
const productOverviewPersonalizationText = document.getElementById(
  "productOverviewPersonalizationText"
);
const productOverviewCharCount = document.getElementById(
  "productOverviewCharCount"
);

productOverviewPersonalizationText.addEventListener("input", function () {
  const currentLength = this.value.length;
  productOverviewCharCount.textContent = currentLength;
});


//    Buy now / Add to cart / Load more / View all placeholders

document
  .querySelector(".productOverviewBuyNow")
  .addEventListener("click", function () {
  });

document
  .querySelector(".productOverviewAddToCart")
  .addEventListener("click", function () {
    alert("Product added to cart!");
  });

document
  .querySelector(".productOverviewLoadMoreBtn")
  .addEventListener("click", function () {
    alert("Loading more products...");
  });

const productOverviewViewAllBtns = document.querySelectorAll(
  ".productOverviewViewAll"
);
productOverviewViewAllBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
  });
});


//    Share and wishlist icons behavior
document
  .querySelectorAll(".productOverviewIcon")[0]
  .addEventListener("click", function () {
    alert("Share this product");
  });

document.querySelectorAll(".productOverviewIcon")[1].addEventListener("click", function () {
    const img = this.querySelector("img");

    if (img.dataset.liked === "true") {
        img.src = "../assets/productOverview/Heart.svg";
        img.dataset.liked = "false";
    } else {
        img.src = "../assets/productOverview/RedHeart.svg";
        img.dataset.liked = "true";
    }
});

/* -------------------------------------
   Responsive DOM reflow:
   Move reviews after "Similar Finds" on small screens
   ------------------------------------- */
(function() {
  const reviewsSection = document.querySelector('.productOverviewReviewsSection');
  const similarSection = document.querySelector('.productOverviewSimilarSection');
  const leftSection = document.querySelector('.productOverviewLeftSection');

  if (!reviewsSection || !similarSection || !leftSection) return;

  // Store original position
  const originalParent = reviewsSection.parentElement;
  const originalNextSibling = reviewsSection.nextElementSibling;
  let reviewsMoved = false;

  function handleResize() {
    const width = window.innerWidth;
    const isMobileOrTablet = width <= 1025;

    if (isMobileOrTablet && !reviewsMoved) {
      // Move reviews section AFTER Similar Finds section
      if (similarSection.parentElement) {
        similarSection.parentElement.insertBefore(reviewsSection, similarSection.nextSibling);
        reviewsMoved = true;
      }
    } else if (!isMobileOrTablet && reviewsMoved) {
      // Restore to original position inside leftSection
      if (originalNextSibling && originalNextSibling.parentElement === originalParent) {
        originalParent.insertBefore(reviewsSection, originalNextSibling);
      } else {
        originalParent.appendChild(reviewsSection);
      }
      reviewsMoved = false;
    }
  }

  // Run on load
  handleResize();

  // Run on resize with debounce
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 100);
  });
})();


//    Review: View All / Hide toggle for review list wrapper

(function () {

  const wrapper = document.querySelector(".productOverviewReviewListWrapper");
  const toggle = document.querySelector(".productOverviewReviewsSection .productOverflowViewAllReviewBtn");

  if (!wrapper || !toggle) return;

  toggle.textContent = wrapper.classList.contains("expanded") ? "Hide" : "View All";

  toggle.addEventListener("click", function () {
    const isExpanded = wrapper.classList.toggle("expanded");
    toggle.textContent = isExpanded ? "Hide" : "View All";
    if (!isExpanded) wrapper.scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();

//    Photo gallery modal: collect images, populate grid, show/hide
var galleryModal = document.getElementById("photoGalleryModal");
var galleryGrid = document.getElementById("photoGalleryGrid");
var galleryCloseBtn = document.querySelector(".photoGalleryClose");
var viewAllButtons = document.querySelectorAll(".reviewImagesViewAll");

if (!galleryModal || !galleryGrid) {
} else {
  function collectReviewImages() {
    var thumbImgs = document.querySelectorAll(".productOverviewReviewImages .productOverviewReviewImage img");
    if (thumbImgs && thumbImgs.length > 0) {
      return Array.prototype.slice.call(thumbImgs);
    }
    var altThumbs = document.querySelectorAll(".productOverviewThumbnail img");
    return Array.prototype.slice.call(altThumbs);
  }
  function populateGalleryGrid() {
    galleryGrid.innerHTML = "";
    var imgs = collectReviewImages();
    if (imgs.length === 0) {
      var placeholder = document.createElement("div");
      placeholder.className = "photoGalleryItem";
      placeholder.textContent = "No photos available";
      galleryGrid.appendChild(placeholder);
      return;
    }
    imgs.forEach(function (imgEl) {
      var tile = document.createElement("div");
      tile.className = "photoGalleryItem";
      var clone = document.createElement("img");
      clone.src = imgEl.src;
      clone.alt = imgEl.alt || "Photo";

      tile.appendChild(clone);
      galleryGrid.appendChild(tile);
    });
  }

  /* Show / Hide functions */
  function showGallery() {
    populateGalleryGrid();
    galleryModal.classList.add("show");
    galleryModal.setAttribute("aria-hidden", "false");
    // disable page scroll while modal open
    document.body.style.overflow = "hidden";
  }

  function hideGallery() {
    galleryModal.classList.remove("show");
    galleryModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  /* Hook up events */

  // 1) Open gallery when any "View all" clicked
  if (viewAllButtons && viewAllButtons.length > 0) {
    viewAllButtons.forEach(function (btn) {
      btn.addEventListener("click", function (ev) {
        ev.preventDefault();
        showGallery();
      });
    });
  }

  // 2) Close when clicking the close button (image button)
  if (galleryCloseBtn) {
    galleryCloseBtn.addEventListener("click", function (ev) {
      ev.preventDefault();
      hideGallery();
    });
  }

  // 3) Close when clicking outside the content (on overlay)
  galleryModal.addEventListener("click", function (ev) {
    // if the clicked element IS the overlay (modal root), close
    if (ev.target === galleryModal) {
      hideGallery();
    }
  });

  // 4) Close on Escape key
  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape" && galleryModal.classList.contains("show")) {
      hideGallery();
    }
  });

}
