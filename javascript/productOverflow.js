// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon=document.querySelector("#hamburger-menu>img");
const bar1 = document.querySelector(".mobile-search-bar-main");

hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display="none"
    document.querySelector("body").style.overflow="hidden"
    bar1.style.display="none"
    window.scrollTo(0, 0);
  }
  else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector(".bottom-nav").style.display="flex"
    document.querySelector("body").style.overflow="auto"
     bar1.style.display="block"
  }
});

document.querySelectorAll(".nav-item>span, .dropdown>li>span, .submenu-dropdown-main>li , mobile-dropdown-sub>ul>li, .mobile-dropdown-sub>.extra-nav").forEach(item => {
    item.addEventListener("click", () => {
        window.location.href = "../html/productcatalog.html";
    });
});
// MOBILE DROPDOWN ACCORDION
// ===============================
// Level 1 Dropdown (Main Category)
// ===============================
const level1Dropdowns = document.querySelectorAll(".mobile-dropdown");

level1Dropdowns.forEach(item => {
    const header = item.querySelector(".dropdown-header");

    header.addEventListener("click", (e) => {
        e.stopPropagation();

        // Close other level 1 dropdowns
        level1Dropdowns.forEach(other => {
            if (other !== item) {
                other.classList.remove("open");
            }
        });

        item.classList.toggle("open");
    });
});


// ===============================
// Level 2 Dropdown (Inside Category)
// ===============================
const level2Dropdowns = document.querySelectorAll(".mobile-dropdown-sub");

level2Dropdowns.forEach(subItem => {
    const subHeader = subItem.querySelector("span");

    subHeader.addEventListener("click", (e) => {
        e.stopPropagation();

        // Close other level 2 menus inside the same main category only
        const parentSubmenu = subItem.closest(".mobile-submenu");
        const siblings = parentSubmenu.querySelectorAll(".mobile-dropdown-sub");

        siblings.forEach(other => {
            if (other !== subItem) {
                other.classList.remove("open-sub");
            }
        });

        subItem.classList.toggle("open-sub");
    });
});

var signup=true;

const userprofileIcon=document.getElementById("user-profile-icon");
const signupWrapper=document.getElementById("signup-wrapper");

const roundWishlist=document.getElementById("round-button-wishlist")
const roundCart=document.getElementById("round-button-cart")
const numberRounds=document.querySelectorAll(".number-of-round");
const logoutDesktop=document.querySelector(".logout-option-desktop");
const numberNoti=document.querySelector("#round-button-notification img");
const notificationBox=document.querySelector(".notification-main-box");

const addToCartBtn = document.querySelector(".productOverviewAddToCart");

// Mobile View
const welcomeName=document.getElementById("welcome-name");
const imageName=document.querySelector(".image-section .circle-image span")

const mobileMenus=document.querySelectorAll(".mobile-nav-menu")
const mobileDropdown=document.querySelectorAll(".mobile-dropdown1")
const mobileDropdown2=document.querySelectorAll(".mobile-dropdown2")

const bottomNav=document.querySelectorAll(".bottom-nav__item1")
const logoutButton=document.querySelector(".logout-button")
const mobileNotification=document.getElementById("bottom-nav-notification")

const bottomNumbers=document.querySelectorAll(".bottom-bar-numbers")
UpdateUI();

function UpdateUI(){
  if(signup){
  userprofileIcon.style.display="block"
  signupWrapper.style.display="none"
  function toggleNotification(event) {
    event.stopPropagation(); // VERY IMPORTANT
    notificationBox.style.display =
      notificationBox.style.display === "block" ? "none" : "block";
      if(notificationBox.style.display==="block"){
        document.querySelector("body").style.overflow="hidden"
      }
      else{
        document.querySelector("body").style.overflow="auto"
      }
  }

  // desktop click
  numberNoti.addEventListener("click", toggleNotification);

  // mobile click
  mobileNotification.addEventListener("click", toggleNotification);

  // click outside → hide
  document.addEventListener("click", () => {
    notificationBox.style.display = "none";
  });

  // prevent box clicks from closing itself
  notificationBox.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  roundWishlist.addEventListener("click",()=>{
    window.location.href="../html/wishlist.html"
  })
  roundCart.addEventListener("click",()=>{
    window.location.href="../html/cart.html"
  })

  numberRounds.forEach(numberRound => {
    if(numberRound.innerText!=0){
      numberRound.style.display="block"
    }
  });

  logoutDesktop.addEventListener("click",()=>{
    signup=false;
    UpdateUI()
  })

  welcomeName.innerText="John David"
  imageName.innerText="JD"
  
  mobileMenus.forEach(accountMen => {
    accountMen.classList.remove("not-logged-in")
  });

  document.getElementById("mobile-my-wishlist").addEventListener("click",()=>{
    window.location.href="../html/wishlist.html"
  })

  document.getElementById("mobile-my-cart").addEventListener("click",()=>{
    window.location.href="../html/cart.html"
  })

  document.getElementById("mobile-order").addEventListener("click",()=>{
    window.location.href="../html/mywishlist.html"
  })

  document.getElementById("mobile-my-profile").addEventListener("click",()=>{
    window.location.href="../html/mywishlist.html"
  })

  document.getElementById("mobile-referal").addEventListener("click",()=>{
    window.location.href="../html/mywishlist.html"
  })

  document.getElementById("mobile-faqs").addEventListener("click",()=>{
    window.location.href="../html/faq.html"
  })

  document.getElementById("mobile-customer-care").addEventListener("click",()=>{
    window.location.href="../html/mywishlist.html"
  })

  document.getElementById("mobile-privacy-policy").addEventListener("click",()=>{
    window.location.href="../html/privacyPolicy.html"
  })

  document.getElementById("bottom-nav-wishlist").addEventListener("click",()=>{
    window.location.href="../html/wishlist.html"
  })

  document.getElementById("bottom-nav-cart").addEventListener("click",()=>{
    window.location.href="../html/cart.html"
  })

  logoutButton.style.display="flex";
  logoutButton.addEventListener("click",()=>{
    mobileMenu.classList.remove("menu-open");
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector(".bottom-nav").style.display="flex";
    signup=false
    UpdateUI()

    document.querySelector(".mobile-search-bar-main").style.display='block';
    document.querySelector("body").style.overflow="auto";
    
  })

  bottomNumbers.forEach(bottomNumber => {
    if(bottomNumber.innerText>0){
      bottomNumber.style.display="block"
    }
  });

  
}
else{
    userprofileIcon.style.display="none"
    signupWrapper.style.display="block"
    numberNoti.addEventListener("click", () => {
      document.getElementById("signupModal").style.display="flex"
      notificationBox.style.display="none";
      document.querySelector("body").style.overflow="auto"
    });
    roundWishlist.addEventListener("click",()=>{
      document.getElementById("signupModal").style.display="flex"
    })
    roundCart.addEventListener("click",()=>{
      document.getElementById("signupModal").style.display="flex"
    })
    numberRounds.forEach(numberRound => {
      numberRound.style.display="none"
    });
    welcomeName.innerText="Sign Up"
    welcomeName.addEventListener("click",()=>{
      window.location.href="../html/whoareyou.html"
    })
    imageName.innerText="eR"

    mobileMenus.forEach(accountMen => {
      accountMen.classList.add("not-logged-in");

      mobileDropdown.forEach(mobileDrop =>{
        mobileDrop.addEventListener("click",()=>{
          document.getElementById("signupModal").style.display="flex"
        })
      })
      mobileDropdown2.forEach(mobileDrop2 =>{
        mobileDrop2.addEventListener("click",()=>{
          document.getElementById("signupModal").style.display="flex"
        })
      })
      bottomNav.forEach(bottomNa=>{
        bottomNa.addEventListener("click",()=>{
          document.getElementById("signupModal").style.display="flex"
        })
      })
    });
    logoutButton.style.display="none";

    bottomNumbers.forEach(bottomNumber => {
      bottomNumber.style.display="none"
    });

  }
}

const cartCountEl = document.getElementById("number-of-cart");

addToCartBtn.addEventListener("click", function () {
  if (!signup) {
    document.getElementById("signupModal").style.display = "flex";
    return;
  }

  // Hide Add to Cart button
  addToCartBtn.style.display = "none";

  // Show "Added to Cart"
  const counter = document.createElement("div");
  counter.className = "quantityCounterBox";
  counter.textContent = "Added to Cart";
  addToCartBtn.parentElement.appendChild(counter);

  // ✅ Increase cart count by 1
  let count = parseInt(cartCountEl.textContent, 10) || 0;
  cartCountEl.textContent = count + 1;
});




function handleScrollForMobile() {
    const bar = document.querySelector(".mobile-search-bar-main");
    const contentbar = document.querySelector(".mobile-search-bar");
    const desktopERan = document.getElementById("desktop-erangoli-logo");
    const mobileERan = document.getElementById("mobile-erangoli-logo");
    const maginfyingMobile = document.getElementById("maginfying-mobile");
    const mobileSuggestion = document.getElementById("mobile-suggestions");
    const notificationBox = document.querySelector(".notification-main-box");

    // ⛔ stop if core elements are missing
    if (!bar || !contentbar) return;

    if (window.innerWidth <= 595) {
        if (window.scrollY > 10) {
            bar.style.position = "fixed";
            bar.style.backgroundColor = "transparent";
            bar.style.top = "-2px";
            bar.style.left = "40px";

            contentbar.style.border = "1px solid #D9D9D9";
            contentbar.style.backgroundColor = "transparent";
            contentbar.style.borderLeft = "0px";
            contentbar.style.borderRadius = "0px 30px 30px 0px";
            contentbar.style.zIndex = 999;
            contentbar.style.padding = "8px 10px";

            desktopERan && (desktopERan.style.display = "none");
            mobileERan && (mobileERan.style.display = "inline-block");
            maginfyingMobile && (maginfyingMobile.style.display = "none");

            mobileSuggestion && (mobileSuggestion.style.top = "80px");
            notificationBox && (notificationBox.style.top = "130px");

        } else {
            bar.style.position = "relative";
            bar.style.backgroundColor = "#f7f7f7";
            bar.style.top = "75px";
            bar.style.left = "0px";

            contentbar.style.border = "none";
            contentbar.style.borderRadius = "30px";
            contentbar.style.backgroundColor = "white";

            desktopERan && (desktopERan.style.display = "flex");
            mobileERan && (mobileERan.style.display = "none");
            maginfyingMobile && (maginfyingMobile.style.display = "block");

            mobileSuggestion && (mobileSuggestion.style.top = "150px");
        }
    } else {
        bar.style = "";
        contentbar.style = "";

        desktopERan && (desktopERan.style.display = "flex");
        mobileERan && (mobileERan.style.display = "none");
        maginfyingMobile && (maginfyingMobile.style.display = "block");
    }
}


// Run on scroll
window.addEventListener("scroll", handleScrollForMobile);

// Run when screen resizes (mobile ↔ desktop)
window.addEventListener("resize", handleScrollForMobile);

// Run once on initial load
handleScrollForMobile();







function showSuggestions(inputElement) {

    let input = inputElement.value.toLowerCase();

    // Pick correct suggestion box (desktop or mobile)
    let suggestionsBox =
        inputElement.id === "desktop-search"
            ? document.getElementById("desktop-suggestions")
            : document.getElementById("mobile-suggestions");

    suggestionsBox.innerHTML = ""; // clear previous suggestions

    if (input.trim() === "") {
        suggestionsBox.style.display = "none";
        return;
    }

    let allItems = document.querySelectorAll("#account-menu li");
    let matches = [];

    allItems.forEach(li => {
        let text = li.innerText.trim();

        if (!text.includes("\n") && text.toLowerCase().includes(input)) {
            matches.push(text);
        }
    });

    if (matches.length > 0) {
        matches.forEach(item => {
            let li = document.createElement("li");
            li.textContent = item;

            li.addEventListener("click", () => {
                window.location.href = "newpage.html";
            });

            suggestionsBox.appendChild(li);
        });

        suggestionsBox.style.display = "block";
    } else {
        suggestionsBox.style.display = "none";
    }
}


// Close suggestions when clicking outside
document.addEventListener("click", function (event) {
    const desktopInput = document.getElementById("desktop-search");
    const mobileInput = document.getElementById("mobile-search");
    const desktopBox = document.getElementById("desktop-suggestions");
    const mobileBox = document.getElementById("mobile-suggestions");

    if (!desktopInput.contains(event.target) && !desktopBox.contains(event.target)) {
        desktopBox.style.display = "none";
    }

    if (!mobileInput.contains(event.target) && !mobileBox.contains(event.target)) {
        mobileBox.style.display = "none";
    }
});



// FEATURES SECTION INTERACTION
document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('marqueeContent');
  if (!content) return;

  // capture original children (live NodeList -> convert to array)
  const originalItems = Array.from(content.children);

  // if no items, nothing to do
  if (!originalItems.length) return;

  // Wait a tick for images to load/layout
  function setupMarquee() {
    // Measure width of original content
    const originalWidth = calculateOriginalWidth();

    // If originalWidth is zero (images not loaded yet), try again
    if (!originalWidth) {
      // try again shortly
      setTimeout(setupMarquee, 60);
      return;
    }

    // Duplicate original items directly into content to form [orig][orig]
    originalItems.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true'); // hide from screen readers
      content.appendChild(clone);
    });

    // Now set CSS variable --move to exactly originalWidth px
    content.style.setProperty('--move', `${originalWidth}px`);

    // Determine animation duration based on desired px/sec speed
    const root = getComputedStyle(document.documentElement);
    // fallback px/sec if CSS var not read
    const pxPerSec = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--speed-px-per-sec')) || 120;
    const durationSec = Math.max(6, (originalWidth / pxPerSec)); // min 6s to avoid too fast

    // Apply duration to the content animation
    content.style.animationDuration = `${durationSec}s`;

    // Ensure layout won't wrap or overlap
    // If track is still too short for seamless loop (rare for very few items), duplicate once more
    requestAnimationFrame(() => {
      const viewportWidth = content.parentElement.clientWidth;
      if (content.scrollWidth < viewportWidth * 2) {
        // duplicate again to lengthen the track
        originalItems.forEach(item => {
          const clone = item.cloneNode(true);
          clone.setAttribute('aria-hidden', 'true');
          content.appendChild(clone);
        });
        // recalc originalWidth still same, but animation duration can remain acceptable
      }
    });
  }

  function calculateOriginalWidth() {
    // original items are the first N children where N = originalItems.length
    let width = 0;
    for (let i = 0; i < originalItems.length; i++) {
      const el = originalItems[i];
      const rect = el.getBoundingClientRect();
      // get margin gap from computed gap (we'll rely on flex gap; approximate by computed style)
      width += rect.width;
    }
    // include gaps: computed gap from CSS
    const gap = parseFloat(getComputedStyle(content).gap) || 0;
    width += gap * Math.max(0, originalItems.length - 1);
    return Math.round(width);
  }

  // run setup after small delay to let images settle
  setTimeout(setupMarquee, 50);

  // Recompute on window resize (optional)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Reset clones -> keep first set only, then rerun setup
      // Remove all children after originalItems.length
      const children = Array.from(content.children);
      children.slice(originalItems.length).forEach(c => content.removeChild(c));
      // Rerun measure & duplicate
      setupMarquee();
    }, 120);
  });
});


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



const productOverviewIcon =
  document.querySelectorAll(".productOverviewIcon")[1];

const wishlistCountEl = document.getElementById("number-of-wishlist");

productOverviewIcon.addEventListener("click", function () {
  if (!signup) {
    document.getElementById("signupModal").style.display = "flex";
    return;
  }

  const img = this.querySelector("img");

  // Get current count safely
  let count = parseInt(wishlistCountEl.textContent, 10) || 0;

  if (img.dataset.liked === "true") {
    // ❌ Remove from wishlist
    img.src = "../assets/productOverview/Heart.svg";
    img.dataset.liked = "false";

    // Decrement (not below 0)
    wishlistCountEl.textContent = Math.max(0, count - 1);
  } else {
    // ❤️ Add to wishlist
    img.src = "../assets/productOverview/RedHeart.svg";
    img.dataset.liked = "true";

    // Increment
    wishlistCountEl.textContent = count + 1;
  }
});


const shareIcon = document.querySelector(".productOverviewIcon");
const sharePopup = document.getElementById("productOverviewSharePopup");

shareIcon.addEventListener("click", function (e) {
  e.stopPropagation();

  if (!signup) {
    document.getElementById("signupModal").style.display = "flex";
    return;
  }

  sharePopup.classList.toggle("show");
});

// Close popup when clicking outside
document.addEventListener("click", function () {
  sharePopup.classList.remove("show");
});

// Share actions
sharePopup.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();

  const item = e.target.closest(".shareItem");
  if (!item) return;

  const type = item.dataset.type;
  const url = window.location.href;
  const text = "Check out this product";

  switch (type) {
    case "copy":
      navigator.clipboard.writeText(url);
      alert("Link copied!");
      break;

    case "whatsapp":
      window.open(`https://wa.me/?text=${encodeURIComponent(url)}`);
      break;

    case "telegram":
      window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}`);
      break;

    case "twitter":
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
      break;
  }
});


let redirectAfterSignup = false; 

document.getElementById("buy-now-button").addEventListener("click",()=>{
  if(!signup){
    document.getElementById("signupModal").style.display='flex';
    return;
  } 
  else{
    window.location.href="../html/cart.html"
  }
});

function buyNow() {
  if (!signup) {
    redirectAfterSignup = true;   // remember intent
    document.getElementById("signupModal").style.display = "block";
  } else {
    window.location.href = "cart.html";
  }
}




// Signup overlay functions
function closeSignupModal() {
  document.getElementById("signupModal").style.display = "none";
}

// ===== ELEMENTS =====
const mobileInput = document.getElementById("overlay-mobile");
const otpInput = document.getElementById("overlay-otp");
const signupBtn = document.querySelector(".overlay-button-group button");

const mobileError = document.getElementById("mobile-error");
const otpError = document.getElementById("otp-error");

const resendText = document.getElementById("resend-otp");
const timerText = document.getElementById("otp-timer");

// ===== CONSTANT OTP =====
const VERIFIED_OTP = "123456";
let timer = null;
let timeLeft = 30;
let timerRunning = false;

// ===== TIMER =====
function startTimer() {
  if (timerRunning) return;

  timerRunning = true;
  timeLeft = 30;
  resendText.classList.add("disabled");
  timerText.textContent = `00:${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    if (timeLeft > 9) {
      timerText.textContent = `00:${timeLeft}`;
    }
    else{
        timerText.textContent = `00:0${timeLeft}`;
    }

    if (timeLeft === 0) {
      clearInterval(timer);
      timerRunning = false;
      timerText.textContent = "";
      resendText.classList.remove("disabled");
    }
  }, 1000);
}

// ===== MOBILE VALIDATION =====
mobileInput.addEventListener("input", () => {
  mobileInput.value = mobileInput.value.replace(/\D/g, "").slice(0, 10);

  if (mobileInput.value.length > 0 && !/^[6-9]/.test(mobileInput.value)) {
    mobileError.textContent =
      "Mobile number must start with 6, 7, 8, or 9";
    mobileInput.value = "";
    return;
  }

  if (mobileInput.value.length === 10) {
    mobileError.textContent = "";
    startTimer();
  }
});

mobileInput.addEventListener("blur", () => {
  if (mobileInput.value.length !== 10) {
    mobileError.textContent = "Please enter a valid 10-digit mobile number";
  }
});

// ===== OTP VALIDATION =====
otpInput.addEventListener("input", () => {
  otpInput.value = otpInput.value.replace(/\D/g, "").slice(0, 6);
});

otpInput.addEventListener("blur", () => {
  if (otpInput.value.length !== 6) {
    otpError.textContent = "Please enter a 6-digit OTP";
  }
});

// ===== SIGNUP =====
signupBtn.addEventListener("click", () => {
  let valid = true;

  if (mobileInput.value.length !== 10) {
    mobileError.textContent = "Please enter a valid mobile number";
    valid = false;
  }

  if (otpInput.value !== VERIFIED_OTP) {
    otpError.textContent = "Invalid OTP";
    valid = false;
  }

  if (valid) {
    signup = true;
    UpdateUI();
    closeSignupModal();

    if (redirectAfterSignup) {
      redirectAfterSignup = false;
      window.location.href = "../html/cart.html";
    }
  }
});


// ===== RESEND OTP =====
resendText.addEventListener("click", () => {
  if (timerRunning) return;
  otpInput.value = "";
  otpError.textContent = "";
  startTimer();
});




