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
    window.location.href='../html/index.html'
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
    window.location.href="../html/myOrders.html"
  })

  document.getElementById("mobile-my-profile").addEventListener("click",()=>{
    window.location.href="../html/aboutYou.html"
  })

  document.getElementById("mobile-referal").addEventListener("click",()=>{
    window.location.href="../html/coupons.html"
  })

  document.getElementById("mobile-faqs").addEventListener("click",()=>{
    window.location.href="../html/faq.html"
  })

document.getElementById("mobile-customer-care").addEventListener("click",()=>{
    window.location.href="../html/customercare.html"
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
    window.location.href='../html/index.html'

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

function handleScrollForMobile() {
    const bar = document.querySelector(".mobile-search-bar-main");
    const contentbar = document.querySelector(".mobile-search-bar");
    const desktopERan = document.getElementById("desktop-erangoli-logo");
    const mobileERan = document.getElementById("mobile-erangoli-logo");
    const maginfyingMobile = document.getElementById("maginfying-mobile");
    const mobileSuggestion = document.getElementById("mobile-suggestions");
    const notificationBox = document.querySelector(".notification-main-box");
    const pdthead=document.querySelector(".pdthead");

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
            contentbar.style.marginLeft="10px";

            desktopERan && (desktopERan.style.display = "none");
            mobileERan && (mobileERan.style.display = "inline-block");
            maginfyingMobile && (maginfyingMobile.style.display = "none");

            mobileSuggestion && (mobileSuggestion.style.top = "80px");
            notificationBox && (notificationBox.style.top = "130px");

            pdthead.style.top='75px'

        } else {
            bar.style.position = "relative";
            bar.style.backgroundColor = "#f7f7f7";
            bar.style.top = "75px";
            bar.style.left = "0px";

            contentbar.style.border = "none";
            contentbar.style.borderRadius = "30px";
            contentbar.style.backgroundColor = "white";
            contentbar.style.marginLeft="0px";

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


  const cartCountEl = document.getElementById("number-of-cart");
  const mobileCart=document.querySelector("#bottom-nav-cart .bottom-bar-numbers")
  let cartCount = parseInt(cartCountEl.textContent) || 0;
  let bottomcartCount=parseInt(mobileCart.textContent) || 0;

  document.querySelectorAll(".pd-cart-btn").forEach(button => {
    button.addEventListener("click", function () {

      // stop if already added
      if (this.classList.contains("added")) return;

      // change text
      this.textContent = "Added";

      // add multiple classes
      this.classList.add("added", "in-cart");

      // increase cart count
      cartCount++;
      bottomcartCount++;
      cartCountEl.textContent = cartCount;
      mobileCart.textContent=bottomcartCount
    });
  });

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
  if (!card) return;

  const headerCountEl = document.getElementById("number-of-wishlist");
  const bottomCountEl = document.querySelector(
    "#bottom-nav-wishlist .bottom-bar-numbers"
  );

  // 🎬 Animate removal
  card.style.transition = "0.3s ease";
  card.style.opacity = "0";
  card.style.transform = "scale(0.95)";

  setTimeout(() => {
    // ❌ Remove product
    card.remove();

    // 📦 Update data arrays
    cards = cards.filter(c => c !== card);
    filteredCards = filteredCards.filter(c => c !== card);

    // 🔽 Decrease both wishlist counts
    [headerCountEl, bottomCountEl].forEach(el => {
      if (!el) return;
      let count = parseInt(el.textContent, 10);
      if (count > 0) {
        el.textContent = count - 1;

        // Optional: hide when zero
        if (count - 1 === 0) {
          el.style.display = "none";
        }
      }
    });

    // 🟡 Handle empty list
    if (filteredCards.length === 0) {
      productsWrap.innerHTML =
        "<p style='text-align:center;padding:40px;'>No products found</p>";
      paginationBar.style.display = "none";
      pageCount.textContent = "";
      return;
    }

    // 📄 Pagination fix
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
document.querySelectorAll(".pd-name")
.forEach(pdName => {
  pdName.addEventListener("click",()=>{
    window.location.href='../html/productOverview.html'
  })
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


