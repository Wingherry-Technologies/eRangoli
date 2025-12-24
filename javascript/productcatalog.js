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
console.log(signup)

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

  // click outside → hide
  document.addEventListener("click", () => {
    notificationBox.style.display = "none";
  });

  numberRounds.forEach(numberRound => {
    if(numberRound.innerText!=0){
      numberRound.style.display="block"
    }
  });

  logoutDesktop.addEventListener("click", logoutUserDesktop);


  welcomeName.innerText="John David"
  imageName.innerText="JD"
  
  mobileMenus.forEach(accountMen => {
    accountMen.classList.remove("not-logged-in")
  });

  document.getElementById("mobile-faqs").addEventListener("click",()=>{
    window.location.href="../html/faq.html"
  })

document.getElementById("mobile-customer-care").addEventListener("click",()=>{
    window.location.href="../html/customercare.html"
  })

  document.getElementById("mobile-privacy-policy").addEventListener("click",()=>{
    window.location.href="../html/privacyPolicy.html"
  })

logoutButton.addEventListener("click", logoutUserMobile);


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
    numberRounds.forEach(numberRound => {
      numberRound.style.display="none"
    });
    welcomeName.innerText="Sign Up"
    welcomeName.addEventListener("click",()=>{
      document.getElementById("signupModal").style.display = "flex";
    })
    imageName.innerText="eR"

    mobileMenus.forEach(accountMen => {
      accountMen.classList.add("not-logged-in");
      
    });
    logoutButton.style.display="none";

    bottomNumbers.forEach(bottomNumber => {
      bottomNumber.style.display="none"
    });

  }
}

roundWishlist.addEventListener("click", (e) => {
  if (!signup) {
    e.preventDefault();
    document.getElementById("signupModal").style.display = "flex";
    return;
  }
  window.location.href = "../html/wishlist.html";
});


roundCart.addEventListener("click", (e) => {
  if (!signup) {
    e.preventDefault();
    document.getElementById("signupModal").style.display = "flex";
    return;
  }
  window.location.href = "../html/cart.html";
});

document.querySelectorAll(".bottom-nav__item1").forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!signup) {
      document.getElementById("signupModal").style.display = "flex";
      return;
    }

    switch (item.id) {
      case "bottom-nav-wishlist":
        window.location.href = "../html/wishlist.html";
        break;

      case "bottom-nav-cart":
        window.location.href = "../html/cart.html";
        break;

      case "bottom-nav-notification":
        notificationBox.style.display =
          notificationBox.style.display === "block" ? "none" : "block";
        break;
    }
});

});


document.querySelectorAll(".mobile-dropdown1").forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!signup) {
      // ❌ NOT logged in → open signup modal
      document.getElementById("signupModal").style.display = "flex";
      return;
    }

    // ✅ Logged in → navigate correctly
    switch (item.id) {
      case "mobile-my-wishlist":
        window.location.href = "../html/wishlist.html";
        break;

      case "mobile-my-cart":
        window.location.href = "../html/cart.html";
        break;

      case "mobile-order":
        window.location.href = "../html/myOrders.html";
        break;

      case "mobile-my-profile":
        window.location.href = "../html/aboutYou.html";
        break;

      case "mobile-referal":
        window.location.href = "../html/coupons.html";
        break;
    }
  });
});



function logoutUserMobile() {
  signup = false;

  // close menu if open
  mobileMenu.classList.remove("menu-open");
  hamberMenuIcon.src = "../assets/master/List.svg";
  document.querySelector(".bottom-nav").style.display = "flex";
  document.querySelector(".mobile-search-bar-main").style.display = "block";
  document.body.style.overflow = "auto";

  UpdateUI();
}
function logoutUserDesktop() {
  signup = false;
  UpdateUI();
}

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
            contentbar.style.marginLeft='10px'

            desktopERan && (desktopERan.style.display = "none");
            mobileERan && (mobileERan.style.display = "inline-block");
            maginfyingMobile && (maginfyingMobile.style.display = "none");

            mobileSuggestion && (mobileSuggestion.style.top = "80px");
            notificationBox && (notificationBox.style.top = "75px");

        } else {
            bar.style.position = "relative";
            bar.style.backgroundColor = "#f7f7f7";
            bar.style.top = "75px";
            bar.style.left = "0px";

            contentbar.style.border = "none";
            contentbar.style.borderRadius = "30px";
            contentbar.style.backgroundColor = "white";
            contentbar.style.marginLeft='0px'

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


// Run on scroll
window.addEventListener("scroll", handleScrollForMobile);

// Run when screen resizes (mobile ↔ desktop)
window.addEventListener("resize", handleScrollForMobile);

// Run once on initial load
handleScrollForMobile();


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
  const wrapper = document.querySelector(".pro-wrapper");

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
  const wrapper = document.querySelector(".pro-wrapper");
  const grid = document.querySelector(".products.pd-grid");
  const leftIcons = document.querySelector(".left-icons");

  if (!wrapper || !grid) return;

  // 🚫 When no results
  if (filteredCards.length === 0) {
    wrapper.style.minHeight = "60vh";

    if (leftIcons) {
      leftIcons.style.minHeight = "60vh";
      leftIcons.style.height = "60vh";
    }
    return;
  }

  // Measure grid height
  const height = grid.scrollHeight;

  // Apply height to wrapper
  wrapper.style.minHeight = `${height}px`;

  // 🔗 Sync left-icons height with wrapper
  if (leftIcons) {
    leftIcons.style.minHeight = "60vh";
    leftIcons.style.height = `${height}px`;
  }
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

document.querySelectorAll(".pd-name")
.forEach(pdName => {
  pdName.addEventListener("click",()=>{
    window.location.href='../html/productOverview.html'
  })
});
/* ===============================
   INITIALIZE
   =============================== */
// place left-icons to header on mobile and back on resize
function handleLeftIconsPlacement() {
  const leftIcons = document.querySelector(".left-icons");
  const heading = document.querySelector(".pdthead");
  const wrapper = document.querySelector(".pro-wrapper");
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

  // 🔐 Signup check
  if (!signup) {
    document.getElementById("signupModal").style.display = "flex";
    pdthead.style.display='none'
    return;
  }

  const popup = shareBtn.nextElementSibling;
  const isOpen = popup.classList.contains("active");

  // Close all first
  document.querySelectorAll(".share-popup").forEach(p => {
    p.classList.remove("active");
  });

  if (!isOpen) popup.classList.add("active");
});

document.querySelectorAll(".share-option").forEach(option => {
  option.addEventListener("click", function (e) {
    e.stopPropagation();

    const type = this.dataset.type;
    const card = this.closest(".pd-card, .rv-card");

    const productName =
      card.querySelector(".pd-name, .rv-name")?.innerText || "Product";

    const url = window.location.href;

    switch (type) {
      case "copy":
        navigator.clipboard.writeText(url);
        alert("Link copied!");
        break;

      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(productName + " " + url)}`,
          "_blank"
        );
        break;

      case "telegram":
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(productName)}`,
          "_blank"
        );
        break;

      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(productName)}&url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
    }
  });
});

const wishlistCountEl = document.getElementById("number-of-wishlist");
document.querySelectorAll(".wishlist-icon").forEach(icon => {
  icon.addEventListener("click", function (e) {
    e.stopPropagation();

    // 🔐 Signup check
    if (!signup) {
      document.getElementById("signupModal").style.display = "flex";
      pdthead.style.display='none'
      return;
    }

    const normalImg = "../assets/productcatalog/Heart.svg";
    const activeImg = "../assets/productcatalog/redHeart.svg";

    let count = parseInt(wishlistCountEl?.textContent || "0", 10);

    if (this.dataset.active === "true") {
      this.src = normalImg;
      this.dataset.active = "false";
      if (wishlistCountEl) wishlistCountEl.textContent = Math.max(0, count - 1);
    } else {
      this.src = activeImg;
      this.dataset.active = "true";
      if (wishlistCountEl) wishlistCountEl.textContent = count + 1;
    }
  });
});

function resetUserProductState() {
  // Reset wishlist icons
  document.querySelectorAll(".wishlist-icon").forEach(icon => {
    icon.src = "../assets/productcatalog/Heart.svg";
    icon.dataset.active = "false";
  });

  // Reset wishlist count
  const wishlistCountEl = document.getElementById("number-of-wishlist");
  if (wishlistCountEl) wishlistCountEl.textContent = "0";

  // Close all share popups
  document.querySelectorAll(".share-popup").forEach(popup => {
    popup.classList.remove("active");
  });
}
