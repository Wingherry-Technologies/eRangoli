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



document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     GLOBAL STATE
  =============================== */
  const cards = Array.from(document.querySelectorAll(".pd-card"));
  const productsWrap = document.querySelector(".products.pd-grid");
  const noProductMsg = document.getElementById("noProductMsg");
  const paginationBar = document.querySelector(".pd-pagination-bar");
  const pageCount = document.querySelector(".pd-page-count");

  let filteredCards = [...cards];
  let currentPage = 1;
  const perPage = 16;

  /* ===============================
     MENU → HEADING + CATEGORY FILTER
  =============================== */
  const heading = document.querySelector(".SBS-category-name-heading span");
  const menu = document.querySelector(".SBS-main-menu");
  const mainMenuItems = document.querySelectorAll(".SBS-menu-item");

  function resetActiveMain() {
    mainMenuItems.forEach(item =>
      item.classList.remove("SBS-catergory-active")
    );
  }

  menu.addEventListener("click", function (e) {
    const target = e.target;

    if (target.closest(".SBS-no-data")) return;

    const mainItem = target.closest(".SBS-menu-item");
    if (mainItem && target === mainItem) {
      heading.textContent = mainItem.dataset.mainCategory;
      resetActiveMain();
      mainItem.classList.add("SBS-catergory-active");

      // Filter by main category
      filterByMainCategory(mainItem.dataset.mainCategory.toLowerCase());
      return;
    }

    const clickedItem = target.closest("li");
    if (!clickedItem) return;

    const name = clickedItem.dataset.category || target.textContent.trim();
    heading.textContent = name;

    const parentMain = clickedItem.closest(".SBS-menu-item");
    if (parentMain) {
      resetActiveMain();
      parentMain.classList.add("SBS-catergory-active");
    }
  });

  function filterByMainCategory(category) {
    filteredCards = cards.filter(card =>
      card.dataset.category === category
    );
    renderFiltered();
  }

  /* ===============================
     PAGINATION
  =============================== */
  function showPage(page) {
    const total = filteredCards.length;
    const totalPages = Math.ceil(total / perPage);

    currentPage = Math.max(1, Math.min(page, totalPages));

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    cards.forEach(card => card.classList.add("is-hidden"));

    filteredCards.forEach((card, i) => {
      if (i >= start && i < end) card.classList.remove("is-hidden");
    });

    pageCount.textContent = `${start + 1}–${Math.min(end, total)} of ${total}`;
  }

  document.getElementById("pd-prev").onclick = () => {
    if (currentPage > 1) showPage(currentPage - 1);
  };

  document.getElementById("pd-next").onclick = () => {
    const totalPages = Math.ceil(filteredCards.length / perPage);
    if (currentPage < totalPages) showPage(currentPage + 1);
  };

  function renderFiltered() {
  cards.forEach(card => card.classList.add("is-hidden"));

  if (!filteredCards.length) {
    noProductMsg.style.display = "flex";
    paginationBar.style.display = "none";
    pageCount.textContent = "0 of 0";
    return;
  }

  noProductMsg.style.display = "none";
  paginationBar.style.display = "flex";
  showPage(1);
}


  /* ===============================
     SIDEBAR FILTERS (PRICE, STATE, ETC)
  =============================== */
  function applyFilters() {
    const priceRadio = document.querySelector('input[name="price"]:checked');
    const states = [...document.querySelectorAll(".state:checked")].map(i => i.parentElement.innerText.trim());
    const materials = [...document.querySelectorAll(".material:checked")].map(i => i.parentElement.innerText.trim());
    const brands = [...document.querySelectorAll(".brand:checked")].map(i => i.parentElement.innerText.trim());
    const sizes = [...document.querySelectorAll(".size:checked")].map(i => i.parentElement.innerText.trim());

    const [min, max] = priceRadio ? priceRadio.value.split("-").map(Number) : [0, 999999];

    filteredCards = cards.filter(card => {
      return (
        (+card.dataset.price >= min && +card.dataset.price <= max) &&
        (!states.length || states.includes(card.dataset.state)) &&
        (!materials.length || materials.includes(card.dataset.material)) &&
        (!brands.length || brands.includes(card.dataset.brand)) &&
        (!sizes.length || sizes.includes(card.dataset.size))
      );
    });

    renderFiltered();
  }

  function applySort() {
  const sortPrice = document.querySelector('input[name="sortPrice"]:checked')?.value;
  const sortRating = document.querySelector('input[name="sortRating"]:checked')?.value;
  const sortDelivery = document.querySelector('input[name="sortDelivery"]:checked')?.value;
  const sortDiscount = document.querySelector('input[name="sortDiscount"]:checked')?.value;

  if (sortPrice) {
    filteredCards.sort((a, b) =>
      sortPrice === "price_asc"
        ? +a.dataset.price - +b.dataset.price
        : +b.dataset.price - +a.dataset.price
    );
  }

  if (sortRating) {
    filteredCards.sort((a, b) =>
      sortRating === "rating_asc"
        ? +a.dataset.rating - +b.dataset.rating
        : +b.dataset.rating - +a.dataset.rating
    );
  }

  if (sortDelivery) {
    filteredCards.sort((a, b) => +a.dataset.delivery - +b.dataset.delivery);
  }

  if (sortDiscount) {
    filteredCards.sort((a, b) => +b.dataset.discount - +a.dataset.discount);
  }

  renderFiltered();
}


  document.querySelectorAll("input").forEach(input => {
  input.addEventListener("change", () => {
    applyFilters();
    applySort(); // 🔥 ADD THIS
  });
});


  window.clearAll = function () {
    document.querySelectorAll("input").forEach(i => i.checked = false);
    filteredCards = [...cards];
    renderFiltered();
  };

  /* ===============================
     SUB CATEGORY FILTER
  =============================== */
  window.filterProducts = function (category, subcategory) {
    filteredCards = cards.filter(card =>
      card.dataset.category === category &&
      card.dataset.subcategory === subcategory
    );
    renderFiltered();
  };

  /* ===============================
     SHARE POPUP
  =============================== */
  document.addEventListener("click", function (e) {
    const shareBtn = e.target.closest(".share-btn");

    if (!shareBtn) {
      document.querySelectorAll(".share-popup").forEach(p => p.classList.remove("active"));
      return;
    }

    e.stopPropagation();

    if (!window.signup) {
      document.getElementById("signupModal").style.display = "flex";
      return;
    }

    const popup = shareBtn.nextElementSibling;
    document.querySelectorAll(".share-popup").forEach(p => p.classList.remove("active"));
    popup.classList.toggle("active");
  });

  document.querySelectorAll(".share-option").forEach(option => {
    option.addEventListener("click", function () {
      const type = this.dataset.type;
      const card = this.closest(".pd-card");
      const name = card.querySelector(".pd-name")?.innerText || "Product";
      const url = window.location.href;

      if (type === "copy") navigator.clipboard.writeText(url);
      if (type === "whatsapp") window.open(`https://wa.me/?text=${encodeURIComponent(name + " " + url)}`);
      if (type === "telegram") window.open(`https://t.me/share/url?url=${url}&text=${name}`);
      if (type === "twitter") window.open(`https://twitter.com/intent/tweet?text=${name}&url=${url}`);
    });
  });

  /* ===============================
     WISHLIST
  =============================== */
  const wishlistCountEl = document.getElementById("number-of-wishlist");

  document.querySelectorAll(".wishlist-icon").forEach(icon => {
    icon.addEventListener("click", function (e) {
      e.stopPropagation();

      if (!window.signup) {
        document.getElementById("signupModal").style.display = "flex";
        return;
      }

      const normal = "../assets/productcatalog/Heart.svg";
      const active = "../assets/productcatalog/redHeart.svg";

      let count = parseInt(wishlistCountEl.textContent || "0");

      if (this.dataset.active === "true") {
        this.src = normal;
        this.dataset.active = "false";
        wishlistCountEl.textContent = Math.max(0, count - 1);
      } else {
        this.src = active;
        this.dataset.active = "true";
        wishlistCountEl.textContent = count + 1;
      }
    });
  });

  /* ===============================
     INIT
  =============================== */
  renderFiltered();
});
function syncSidebarHeight() {
  const sidebarEl = document.querySelector(".left-sidebar");
  const icons = document.querySelector(".left-icons");
  const wrapper = document.querySelector(".pro-wrapper");

  if (!sidebarEl || !icons || !wrapper) return;

  // MOBILE — full screen
  if (window.innerWidth <= 480) {
    sidebarEl.style.height = "100%";
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

window.addEventListener("resize", syncSidebarHeight);
window.addEventListener("scroll", syncSidebarHeight);
/* ===============================
   SIDEBAR OPEN / CLOSE FIX
=============================== */

const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const openFilterBtn = document.getElementById("openFilter");
const openSortBtn = document.getElementById("openSort");

// Safety check
if (sidebar && overlay && openFilterBtn && openSortBtn) {

  function openSidebar() {
    syncSidebarHeight();
    sidebar.classList.add("active");
    overlay.classList.add("active");
  }

  function closeSidebar() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  }

  openFilterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openSidebar();
  });

  openSortBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openSidebar();
  });

  overlay.addEventListener("click", closeSidebar);

  // Close button inside sidebar (your X icon)
  window.closeSidebar = closeSidebar;
}

/* ===============================
   SIDEBAR DROPDOWN TOGGLE
=============================== */
function toggleSub(el) {
  const next = el.nextElementSibling;
  if (!next || !next.classList.contains("sub-options")) return;

  next.classList.toggle("open");

  const arrow = el.querySelector("img");
  if (arrow) arrow.classList.toggle("rotate");
}
