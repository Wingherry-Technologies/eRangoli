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


document.getElementById("back-btn").addEventListener("click", () => {
  window.location.href = "../html/productcatalog.html";
});

document.getElementById("back-btn-mob").addEventListener("click", () => {
  window.location.href = "../html/productcatalog.html";
});

document.getElementById("menu-item-payments").addEventListener("click", () => {
  window.location.href = "../html/payments.html";
});

document.getElementById("gift-voucher").addEventListener("click", () => {
  window.location.href = "../html/giftVoucher.html";
});

document.getElementById("settings").addEventListener("click", () => {
  window.location.href = "../html/settings.html";
});

/* profile popup */
const profilePopup = document.getElementById("profilePopup");
const closeProfileBtn = document.getElementById("closePopup");
function openProfilePopup() {
  const w = window.innerWidth;
  if (w >= 595 && w <= 1024) profilePopup.classList.add("active");
}
closeProfileBtn.addEventListener("click", () =>
  profilePopup.classList.remove("active")
);

/* about popup */
function openEditAbout() {
  closeAllAddressPopups();
  document.getElementById("editAboutPopup").style.display = "block";
}
function closeEditAbout() {
  document.getElementById("editAboutPopup").style.display = "none";
}

/* address popup */
function openEditAddress(el) {
  closeEditAbout();
  closeAllAddressPopups();
  el
    .closest(".address-block")
    .querySelector(".edit-address-popup").style.display = "block";
}
function closeEditAddress(el) {
  el.closest(".edit-address-popup").style.display = "none";
}
function closeAllAddressPopups() {
  document
    .querySelectorAll(".edit-address-popup")
    .forEach((p) => (p.style.display = "none"));
}

/* outside click close */
document.addEventListener("click", (e) => {
  const about = document.getElementById("editAboutPopup");
  if (
    about.style.display === "block" &&
    !about.contains(e.target) &&
    !e.target.classList.contains("edit-icon")
  )
    about.style.display = "none";

  document.querySelectorAll(".edit-address-popup").forEach((p) => {
    if (
      p.style.display === "block" &&
      !p.contains(e.target) &&
      !e.target.closest(".address-icons")
    )
      p.style.display = "none";
  });
});

/* Updated helpers to match cart.js validation style */
function showError(input, id, msg) {
  const e = document.getElementById(id);
  if (!e) return;
  e.textContent = msg;
  e.style.display = "block";
  input.classList.add("error");
}
function clearError(input, id) {
  const e = document.getElementById(id);
  if (!e) return;
  e.textContent = "";
  e.style.display = "none";
  input.classList.remove("error");
}

/* about inputs */
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

/* Updated input restrictions to match cart.js exactly */
nameInput.addEventListener("keydown", (e) => {
  if (nameInput.selectionStart === 0 && e.key === " ") e.preventDefault();
});
nameInput.addEventListener("input", function () {
  this.value = this.value.replace(/[^A-Za-z ]/g, "");
});
emailInput.addEventListener("keydown", (e) => {
  if (e.key === " ") e.preventDefault();
});

/* Updated about validation to match cart.js */
function validateAbout() {
  let valid = true;
  const nameValue = nameInput.value;
  const emailValue = emailInput.value.trim();

  if (nameValue.trim() === "") {
    showError(nameInput, "nameError", "Please enter your name");
    valid = false;
  } else if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(nameValue)) {
    showError(nameInput, "nameError", "Only alphabets allowed");
    valid = false;
  } else {
    clearError(nameInput, "nameError");
  }

  if (emailValue === "") {
    showError(emailInput, "emailError", "Please enter your email");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    showError(emailInput, "emailError", "Please enter a valid email address");
    valid = false;
  } else {
    clearError(emailInput, "emailError");
  }

  return valid;
}

/* Added blur + input listeners for about fields */
nameInput.addEventListener("blur", () => {
  validateAbout();
});
nameInput.addEventListener("input", function () {
  if (this.value.trim() !== "") {
    validateAbout();
  }
});

emailInput.addEventListener("blur", () => {
  validateAbout();
});
emailInput.addEventListener("input", function () {
  if (this.value.trim() !== "") {
    validateAbout();
  }
});

/* Updated address validation functions to match cart.js exactly */
function validateHno(index) {
  const input = document.getElementById(`hno${index}`);
  const value = input.value;

  if (value.trim() === "") {
    showError(input, `hnoError${index}`, "Please enter house number / society");
    return false;
  }

  if (/^\s|\s$/.test(value)) {
    showError(input, `hnoError${index}`, "Space not allowed at start or end");
    return false;
  }

  const hnoRegex = /^[A-Za-z0-9#@_\-=+&*][A-Za-z0-9#@_\-=+&* ]*$/;
  if (!hnoRegex.test(value)) {
    showError(
      input,
      `hnoError${index}`,
      "Allowed: letters, numbers, #, @, -, _, +, =, &, *"
    );
    return false;
  }

  if (!/[A-Za-z0-9]/.test(value)) {
    showError(
      input,
      `hnoError${index}`,
      "House number must contain letters or numbers"
    );
    return false;
  }

  clearError(input, `hnoError${index}`);
  return true;
}

function validateLane(index) {
  const input = document.getElementById(`lane${index}`);
  const value = input.value;

  if (value.trim() === "") {
    showError(input, `laneError${index}`, "Please enter area / lane");
    return false;
  }

  if (/^\s/.test(value)) {
    showError(input, `laneError${index}`, "Space not allowed at first");
    return false;
  }

  const laneRegex = /^[A-Za-z0-9][A-Za-z0-9 ]*$/;
  if (!laneRegex.test(value)) {
    showError(
      input,
      `laneError${index}`,
      "Only letters, numbers and spaces allowed"
    );
    return false;
  }

  clearError(input, `laneError${index}`);
  return true;
}

function validateLandmark(index) {
  const input = document.getElementById(`landmark${index}`);
  const value = input.value;

  if (value.trim() === "") {
    clearError(input, `landmarkError${index}`);
    return true;
  }

  if (/^\s/.test(value)) {
    showError(input, `landmarkError${index}`, "Space not allowed at first");
    return false;
  }

  const regex = /^[A-Za-z0-9.,#@&!$* ]+$/;
  if (!regex.test(value)) {
    showError(input, `landmarkError${index}`, "Invalid characters used");
    return false;
  }

  clearError(input, `landmarkError${index}`);
  return true;
}

function validateCity(index) {
  const input = document.getElementById(`city${index}`);
  const value = input.value;

  if (value.trim() === "") {
    showError(input, `cityError${index}`, "Please enter city");
    return false;
  }

  if (/^\s/.test(value)) {
    showError(input, `cityError${index}`, "City cannot start with space");
    return false;
  }

  const cityRegex = /^[A-Za-z][A-Za-z ]*$/;
  if (!cityRegex.test(value)) {
    showError(input, `cityError${index}`, "Only alphabets allowed");
    return false;
  }

  clearError(input, `cityError${index}`);
  return true;
}

function validateZip(index) {
  const input = document.getElementById(`zip${index}`);
  const value = input.value;

  if (!/^[1-9][0-9]{5}$/.test(value)) {
    showError(input, `zipError${index}`, "Enter valid 6-digit pincode");
    return false;
  }

  if (/^(\d)\1+$/.test(value)) {
    showError(
      input,
      `zipError${index}`,
      "Pincode cannot contain repeating digits"
    );
    return false;
  }

  clearError(input, `zipError${index}`);
  return true;
}

function validateState(index) {
  const input = document.getElementById(`state${index}`);
  const value = input.value;

  if (value.trim() === "") {
    showError(input, `stateError${index}`, "Please enter state");
    return false;
  }

  if (/^\s/.test(value)) {
    showError(input, `stateError${index}`, "State cannot start with space");
    return false;
  }

  const regex = /^[A-Za-z][A-Za-z ]*$/;
  if (!regex.test(value)) {
    showError(input, `stateError${index}`, "Only alphabets allowed");
    return false;
  }

  clearError(input, `stateError${index}`);
  return true;
}

/* Updated address validation to call individual field validators */
function validateAddress(index) {
  const isHnoValid = validateHno(index);
  const isLaneValid = validateLane(index);
  const isLandmarkValid = validateLandmark(index);
  const isCityValid = validateCity(index);
  const isZipValid = validateZip(index);
  const isStateValid = validateState(index);

  return (
    isHnoValid &&
    isLaneValid &&
    isLandmarkValid &&
    isCityValid &&
    isZipValid &&
    isStateValid
  );
}
/* Added input restrictions and blur/input listeners for address fields */
[1, 2].forEach((i) => {
  const hno = document.getElementById(`hno${i}`);
  const lane = document.getElementById(`lane${i}`);
  const landmark = document.getElementById(`landmark${i}`);
  const city = document.getElementById(`city${i}`);
  const zip = document.getElementById(`zip${i}`);
  const state = document.getElementById(`state${i}`);

  if (hno) {
    hno.addEventListener("keydown", (e) => {
      if (hno.selectionStart === 0 && e.key === " ") e.preventDefault();
    });
    hno.addEventListener("blur", () => validateHno(i));
    hno.addEventListener("input", function () {
      if (this.value.trim() !== "") validateHno(i);
    });
  }

  if (lane) {
    lane.addEventListener("keydown", (e) => {
      if (lane.selectionStart === 0 && e.key === " ") e.preventDefault();
    });
    lane.addEventListener("input", function () {
      this.value = this.value.replace(/[^A-Za-z0-9 ]/g, "");
      if (this.value.trim() !== "") validateLane(i);
    });
    lane.addEventListener("blur", () => validateLane(i));
  }

  if (landmark) {
    landmark.addEventListener("keydown", (e) => {
      if (landmark.selectionStart === 0 && e.key === " ") e.preventDefault();
    });
    landmark.addEventListener("blur", () => validateLandmark(i));
    landmark.addEventListener("input", function () {
      if (this.value.trim() !== "") validateLandmark(i);
    });
  }

  if (city) {
    city.addEventListener("keydown", (e) => {
      if (city.selectionStart === 0 && e.key === " ") e.preventDefault();
    });
    city.addEventListener("input", function () {
      this.value = this.value.replace(/[^A-Za-z ]/g, "");
      if (this.value.trim() !== "") validateCity(i);
    });
    city.addEventListener("blur", () => validateCity(i));
  }

  if (zip) {
    zip.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "").slice(0, 6);
      if (this.value.trim() !== "") validateZip(i);
    });
    zip.addEventListener("blur", () => validateZip(i));
  }

  if (state) {
    state.addEventListener("keydown", (e) => {
      if (state.selectionStart === 0 && e.key === " ") e.preventDefault();
    });
    state.addEventListener("input", function () {
      this.value = this.value.replace(/[^A-Za-z ]/g, "");
      if (this.value.trim() !== "") validateState(i);
    });
    state.addEventListener("blur", () => validateState(i));
  }
});

/* Updated save handlers to only close popup if validation passes */
function handleAddressSave(index, btn) {
  if (!validateAddress(index)) return;

  const block = btn.closest(".address-block");

  const hno = document.getElementById(`hno${index}`).value;
  const lane = document.getElementById(`lane${index}`).value;
  const city = document.getElementById(`city${index}`).value;
  const zip = document.getElementById(`zip${index}`).value;
  const state = document.getElementById(`state${index}`).value;

  block.querySelector(
    ".address-text"
  ).innerText = `${hno}, ${lane}, ${city}, ${state}, ${zip}`;

  // clear popup fields
  ["hno", "lane", "landmark", "city", "zip", "state"].forEach((f) => {
    const el = document.getElementById(`${f}${index}`);
    if (el) el.value = "";
  });

  btn.closest(".edit-address-popup").style.display = "none";
}

function handleAboutSave() {
  if (!validateAbout()) return;

  // update main view values
  document.querySelector(
    ".about-you-block .field:nth-child(2) .value"
  ).innerText = nameInput.value;

  document.querySelector(
    ".about-you-block .field:nth-child(3) .value"
  ).innerText = emailInput.value;

  // clear popup inputs
  nameInput.value = "";
  emailInput.value = "";

  closeEditAbout();
}

/* delete address */
const deleteWarning = document.getElementById("deleteWarning");
const closeWarning = document.getElementById("closeWarning");

document.addEventListener("click", (e) => {
  if (
    e.target.closest(".address-icons img") &&
    e.target.src.includes("delete")
  ) {
    const blocks = document.querySelectorAll(".address-block");
    const current = e.target.closest(".address-block");
    if (blocks.length > 1) current.remove();
    else deleteWarning.classList.remove("hidden");
  }
});

closeWarning.addEventListener("click", () =>
  deleteWarning.classList.add("hidden")
);

function handleLocationSave() {
  const popup = document.getElementById("locationPopup");
  const view = document.getElementById("locationView");

  const selects = popup.querySelectorAll("select");
  const values = view.querySelectorAll(".location-value");

  selects.forEach((s, i) => {
    values[i].innerText = s.value;
    s.selectedIndex = 0;
  });

  closeLocationPopup();
}

// location popup open
function openLocationPopup() {
  document.getElementById("locationPopup").style.display = "block";
  document.getElementById("locationView").style.display = "none";
}

// location popup close
function closeLocationPopup() {
  document.getElementById("locationPopup").style.display = "none";
  document.getElementById("locationView").style.display = "block";
}

// About You menu click (mobile)
const aboutMenuItem = document.getElementById("about-you");

if (aboutMenuItem) {
  aboutMenuItem.addEventListener("click", () => {
    if (window.innerWidth <= 595) {
      openAboutMobile();
    }
  });
}


if (aboutMenuItem) {
  aboutMenuItem.addEventListener("click", () => {
    if (window.innerWidth <= 595) {
      document.body.classList.add("about-active");
    }
  });
}

// Back button inside AY header (mobile)
document.querySelectorAll(".AY-header-banner .back-row-mob").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (window.innerWidth <= 595) {
      document.body.classList.remove("about-active");
    }
  });
});

function createAYHeader() {
  if (document.querySelector(".AY-header-banner")) return;

  const header = document.createElement("div");
  header.className = "AY-header-banner";

  header.innerHTML = `
    <div class="AY-overlay">
      <div class="header-content">
        <div class="header">
          <div class="back-row-mob ay-back-btn">
            <img src="../assets/cart/back.svg" />
          </div>
          <h1 class="AY-header">About You</h1>
        </div>
      </div>
    </div>
  `;

  document.body.prepend(header);

  header.querySelector(".ay-back-btn").addEventListener("click", () => {
    document.body.classList.remove("about-active");

    document.querySelector(".left-panel").style.display = "block";
    document.querySelector(".right-panel").style.display = "none";
    document.querySelector(".profile-wrapper").style.marginTop="0px"

    header.remove();
  });
}

window.addEventListener("load", () => {
  if (window.innerWidth <= 595) {
    document.body.classList.add("about-active");

    document.querySelector(".left-panel").style.display = "none";
    document.querySelector(".right-panel").style.display = "block";
    document.querySelector(".pro-wrapper").style.marginTop="75px"

    createAYHeader();
  }
});

function openAboutMobile() {
  if (window.innerWidth > 595) return;

  document.body.classList.add("about-active");

  document.querySelector(".left-panel").style.display = "none";
  document.querySelector(".right-panel").style.display = "block";
  document.querySelector(".pro-wrapper").style.marginTop="0px"

  createAYHeader();
}

