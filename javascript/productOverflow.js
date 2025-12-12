
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
(function () {
  const MOBILE_MAX = 594; 
  const LINES_COLLAPSED = 2; 

  function isMobile() {
    return window.innerWidth <= MOBILE_MAX;
  }

  function getLineHeightPx(el) {
    const cs = window.getComputedStyle(el);
    const lh = parseFloat(cs.lineHeight);
    if (!lh || Number.isNaN(lh)) {
      const fs = parseFloat(cs.fontSize) || 14;
      return fs * 1.2;
    }
    return lh;
  }

  function setupCard(card, idx) {
    if (!card) return;
    const text = card.querySelector(".productOverviewReviewText");
    let btn = card.querySelector(".reviewReadMoreBtn");
    if (!text) return;
    if (!btn) {
      btn = document.createElement("button");
      btn.type = "button";
      btn.className = "reviewReadMoreBtn";
      btn.textContent = "Read more";
      (card.querySelector(".reviewCardRight") || card).appendChild(btn);
    }

    // ensure aria control
    const contentId = text.id || `review-text-js-${idx}`;
    text.id = contentId;
    btn.setAttribute("aria-controls", contentId);

    // function to evaluate if we should show the button
    function evaluate() {
      // if not mobile, hide button and reset any JS styles
      if (!isMobile()) {
        btn.style.display = "none";
        text.style.maxHeight = "";
        text.style.overflow = "";
        card.classList.remove("expanded-mobile");
        btn.textContent = "Read more";
        btn.setAttribute("aria-expanded", "false");
        return;
      }

      // measure by temporarily collapsing to X lines
      const lineH = getLineHeightPx(text);
      const collapsedPx = lineH * LINES_COLLAPSED;

      // reset styles to get natural scrollHeight
      text.style.maxHeight = "none";
      text.style.overflow = "visible";

      // single-word / empty check
      const raw = (text.innerText || text.textContent || "").trim();
      const words = raw.split(/\s+/).filter(Boolean);
      if (words.length <= 1) {
        btn.style.display = "none";
        card.classList.remove("expanded-mobile");
        return;
      }

      // Now apply collapsed style to test overflow
      text.style.maxHeight = collapsedPx + "px";
      text.style.overflow = "hidden";

      const isOverflowing = text.scrollHeight > collapsedPx + 1;

      if (!isOverflowing) {
        // fits within collapsed height — hide button, ensure collapsed state
        btn.style.display = "none";
        card.classList.remove("expanded-mobile");
        btn.setAttribute("aria-expanded", "false");
        btn.textContent = "Read more";
      } else {
        // content overflows — show button
        btn.style.display = "inline-block";
        const expanded = card.classList.contains("expanded-mobile");

        if (expanded) {
          text.style.maxHeight = "none";
          text.style.overflow = "visible";
          btn.textContent = "Hide";
          btn.setAttribute("aria-expanded", "true");
        } else {
          text.style.maxHeight = collapsedPx + "px";
          text.style.overflow = "hidden";
          btn.textContent = "Read more";
          btn.setAttribute("aria-expanded", "false");
        }
      }
    } // end evaluate

    // button click to toggle expand/collapse
    if (!btn._jsBound) {
      btn.addEventListener("click", function () {
        card.classList.toggle("expanded-mobile");
        // small timeout to allow layout to settle, then re-evaluate
        setTimeout(evaluate, 60);
      });
      btn._jsBound = true;
    }

    // expose evaluate for global re-check
    card._jsEvalReadMore = evaluate;

    // initial evaluate (defer slightly so fonts & layout apply)
    setTimeout(evaluate, 30);
  } // end setupCard

  function runAll() {
    const cards = document.querySelectorAll(".productOverviewReviewCard");
    cards.forEach((card, idx) => {
      // set up if not yet set
      if (!card._jsEvalReadMore) setupCard(card, idx);
      // always re-evaluate (useful on resize)
      if (card._jsEvalReadMore) card._jsEvalReadMore();
    });
  }

  // Initial run after page load (small delay for layouts)
  window.addEventListener("load", () => setTimeout(runAll, 50));

  // Re-run on resize/orientation change (debounced)
  let rTimer;
  window.addEventListener("resize", () => {
    clearTimeout(rTimer);
    rTimer = setTimeout(runAll, 120);
  });
  window.addEventListener("orientationchange", () => {
    clearTimeout(rTimer);
    rTimer = setTimeout(runAll, 140);
  });

  // Observe dynamic changes inside the review list
  const wrapper = document.querySelector(".productOverviewReviewListWrapper");
  if (wrapper) {
    const mo = new MutationObserver(() => {
      clearTimeout(rTimer);
      rTimer = setTimeout(runAll, 80);
    });
    mo.observe(wrapper, { childList: true, subtree: true, characterData: true });
  }
})();
// HERE END THE RED MORE BUTTON FUNTION 


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

// back button function navigation
document.querySelector(".productOverviewBackBtn").addEventListener("click", function(){
        window.location.href="../html/productcatalog.html"
});

// Personalization Save button validation
const saveBtn = document.querySelector(".personalSaveBtn");
const personalizationInput = document.getElementById("productOverviewPersonalizationText");
const personalizationError = document.getElementById("personalizationError");

saveBtn.addEventListener("click", function () {
  const text = personalizationInput.value.trim();

  if (text === "") {
    personalizationError.style.display = "inline";
  } else {
    personalizationError.style.display = "none";
    alert("Saved!");
  }
});

// Hide error when user starts typing
personalizationInput.addEventListener("input", function () {
  if (personalizationError.style.display === "inline") {
    personalizationError.style.display = "none";
  }
});


//    Buy now / Add to cart / Load more / View all placeholders

document
  .querySelector(".productOverviewBuyNow")
  .addEventListener("click", function () {
    window.location.href="../html/cart.html"
  });

// Add to card 
const addToCartBtn = document.querySelector(".productOverviewAddToCart");
addToCartBtn.addEventListener("click", function () {
  // Hide the Add to Cart button
  addToCartBtn.style.display = "none";
  // Create Counter Box
  const counter = document.createElement("div");
  counter.className = "quantityCounterBox";
  counter.innerHTML = `
    <span class="quantityCounterBtn" id="qtyMinus">−</span>
    <span class="quantityCounterValue" id="qtyValue">1</span>
    <span class="quantityCounterBtn" id="qtyPlus">+</span>
  `;
  // Insert Counter in same place
  addToCartBtn.parentElement.appendChild(counter);
  let qty = 1;
  document.getElementById("qtyPlus").addEventListener("click", function () {
    qty++;
    document.getElementById("qtyValue").textContent = qty;
  });
  document.getElementById("qtyMinus").addEventListener("click", function () {
    if (qty > 1) {
      qty--;
      document.getElementById("qtyValue").textContent = qty;
    }
  });
});
// Add to card end


document
  .querySelector(".productOverviewLoadMoreBtn")
  .addEventListener("click", function () {
     window.location.href="../html/productcatalog.html"
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

// SIMPLE REVIEW VIEW-ALL LOGIC
// Review: View All / Hide toggle for review list wrapper
(function () {
  const wrapper = document.querySelector(".productOverviewReviewListWrapper");
  const button = document.querySelector(".productOverflowViewAllReviewBtn");

  if (!wrapper || !button) return;

  // count total review cards
  const count = wrapper.querySelectorAll(".productOverviewReviewCard").length;

  // hide button if 2 or fewer reviews
  if (count <= 2) {
    button.style.display = "none";
    return;
  }

  // Toggle logic
  button.addEventListener("click", () => {
    wrapper.classList.toggle("expanded");

    if (wrapper.classList.contains("expanded")) {
      button.textContent = "Hide";
    } else {
      button.textContent = "View All";
    }
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



// review image overlay function
function updateReviewImageOverlay() {
  const container = document.querySelector(".productOverviewReviewImages");
  const viewAll = document.querySelector(".reviewImagesViewAll");
  if (!container) return;

  const items = [...container.querySelectorAll(".productOverviewReviewImage")];
  const total = items.length;

  // Determine limits based on screen size
  let maxVisible = 4; // desktop default
  const w = window.innerWidth;

  if (w >= 1025) maxVisible = 4;   // desktop
  else if (w >= 595) maxVisible = 3; // tablet
  else maxVisible = 2;             // mobile

  // Clear all old overlays
  items.forEach(img => {
    img.classList.remove("reviewImageMore");
    img.querySelector(".reviewImageMoreOverlay")?.remove();
  });

  // Hide view all if total <= max
  if (viewAll) viewAll.style.display = total <= maxVisible ? "none" : "";

  // If more images than visible, show overlay on last visible
  if (total > maxVisible) {
    const lastVisible = items[maxVisible - 1];
    const remaining = total - maxVisible;

    lastVisible.classList.add("reviewImageMore");

    const overlay = document.createElement("div");
    overlay.className = "reviewImageMoreOverlay";
    overlay.innerHTML = `<span>${remaining}+</span><span>Photos</span>`;

    lastVisible.appendChild(overlay);
  }
}

// Initial run
updateReviewImageOverlay();

// Re-run on resize
window.addEventListener("resize", () => {
  updateReviewImageOverlay();
});
