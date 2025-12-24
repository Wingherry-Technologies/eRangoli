// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon=document.querySelector("#hamburger-menu>img");

hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display="none"
    document.querySelector("body").style.overflow="hidden"
    window.scrollTo(0, 0);
  }
  else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector(".bottom-nav").style.display="flex"
    document.querySelector("body").style.overflow="auto"
  }
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
    const overLay=document.querySelector(".faq-header-section");

    // ⛔ stop if core elements are missin  g
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

            overLay.style.position="sticky";
            overLay.style.top='75px';

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