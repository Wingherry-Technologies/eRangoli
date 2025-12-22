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



//  TRACK ORDER POPUP
const trackBtn = document.getElementById("myOrdersTrackBtn");
const trackOverlay = document.getElementById("trackOverlay");
const trackClose = document.getElementById("trackClose");

if (trackBtn) {
  trackBtn.addEventListener("click", () => {
    trackOverlay.style.display = "flex";
  });
}

trackClose.addEventListener("click", () => {
  trackOverlay.style.display = "none";
});

trackOverlay.addEventListener("click", (e) => {
  if (e.target === trackOverlay) {
    trackOverlay.style.display = "none";
  }
});

//  SEARCH 
const searchInput = document.getElementById("myOrdersSearchInput");
const orderCards = document.querySelectorAll(".myOrdersCard");

searchInput.addEventListener("input", function () {
  const searchValue = this.value.toLowerCase();
  orderCards.forEach((card) => {
    const title = card.querySelector(".myOrdersProductTitle")?.innerText.toLowerCase();
    card.style.display = title && title.includes(searchValue) ? "block" : "none";
  });
});

// RETURN POPUP OPEN / CLOSE 
const returnBtn = document.getElementById("myOrdersReturnBtn");
const returnOverlay = document.getElementById("returnOverlay");
const returnClose = document.getElementById("returnClose");

returnBtn.addEventListener("click", () => {
  returnOverlay.style.display = "flex";
  resetReturnForm(); 
});

returnClose.addEventListener("click", () => {
  returnOverlay.style.display = "none";
});

returnOverlay.addEventListener("click", (e) => {
  if (e.target === returnOverlay) {
    returnOverlay.style.display = "none";
  }
});

//  RETURN FORM ELEMENTS
const reasonCheckboxes = document.querySelectorAll(".returnCheckbox input");
const uploadInputs = document.querySelectorAll(".uploadBox input");
const issueText = document.getElementById("issueText");
const charCount = document.getElementById("charCount");
const returnBtnFinal = document.getElementById("finalReturnBtn");
const errorBox = document.getElementById("returnError");

const reasonTitle = document.querySelector(".returnSection .returnTitle");
const uploadTitle = document.getElementById("uploadTitle");
const descTitle = issueText.previousElementSibling;
let isSwitchingSection = false;

const returnModal = document.querySelector("#returnOverlay .returnModal");
returnModal.addEventListener("click", (e) => {
  const clickedInsideUpload = e.target.closest(".uploadBox");

  if (
    uploadTouched &&
    !isUploadValid() &&
    !clickedInsideUpload
  ) {
    showError(uploadTitle, "Please upload at least 1 image");
  }
});


let uploadedCount = 0;

//  HELPERS 
function clearErrors() {
  errorBox.style.display = "none";
  [reasonTitle, uploadTitle, descTitle].forEach((el) =>
    el.classList.remove("errorTitle")
  );
}


function showError(titleEl, msg) {
  clearErrors();
  titleEl.classList.add("errorTitle");

  errorBox.querySelector(".errorText").innerText = msg;
  errorBox.style.display = "flex";
}

function validateReasonOnBlur() {
  if (!isReasonValid()) {
    showError(reasonTitle, "Please select the reason for return");
  }
}

function validateUploadOnBlur() {
  if (!isUploadValid()) {
    showError(uploadTitle, "Please upload at least 1 image");
  }
}

function validateTextOnBlur() {
  if (!isTextValid()) {
    showError(descTitle, "Please describe your issue (minimum 5 words)");
  }
}

//  VALIDATION CHECKS 
function isReasonValid() {
  return [...reasonCheckboxes].some((cb) => cb.checked);
}

function isUploadValid() {
  return document.querySelectorAll(".uploadBox img.previewImg").length >= 1;
}

function isTextValid() {
  const text = issueText.value.replace(/\n/g, " ").trim();
  if (!text) return false;

  const words = text.split(" ").filter(word => word.length > 0);

  return words.length >= 5 && text.length <= 250;
}


//  BUTTON STATE 
function updateButtonState() {
  if (isReasonValid() && isUploadValid() && isTextValid()) {
    returnBtnFinal.classList.add("active");
    returnBtnFinal.disabled = false;
  } else {
    returnBtnFinal.classList.remove("active");
    returnBtnFinal.disabled = true;
  }
}

//  RESET FORM 
function resetReturnForm() {
  uploadedCount = 0;

  reasonCheckboxes.forEach(cb => cb.checked = false);

  document.querySelectorAll(".uploadBox img.previewImg").forEach(img => img.remove());

  uploadInputs.forEach(input => input.value = "");

  document.querySelectorAll(".uploadPlaceholder").forEach(ph => {
    ph.style.display = "flex";
  });

  issueText.value = "";
  charCount.innerText = "0/250";

  clearErrors();
  updateButtonState();
}


//  EVENTS 
/* CHECKBOX */
reasonCheckboxes.forEach(cb => {
  cb.addEventListener("change", () => {
    clearErrors();
    updateButtonState();
  });

  cb.addEventListener("blur", validateReasonOnBlur);
});

/* IMAGE UPLOAD */
uploadInputs.forEach((input) => {
  input.addEventListener("change", function () {
    if (uploadedCount >= 5) return;

    const file = this.files[0];
    if (!file) return;

    uploadedCount++;

const img = document.createElement("img");
img.src = URL.createObjectURL(file);
img.classList.add("previewImg");   
this.parentElement.appendChild(img);

// hide placeholder
this.parentElement.querySelector(".uploadPlaceholder").style.display = "none";
    clearErrors();
    updateButtonState(); 
    uploadTouched = false;
  });
});

// uploadInputs.forEach(input => {
//   input.addEventListener("blur", () => {
//     if (!isUploadValid()) {
//       showError(uploadTitle, "please upload at least 1 image");
//     }
//   });
// });

let uploadTouched = false;

/* TEXTAREA + COUNTER */
issueText.addEventListener("input", () => {
  charCount.innerText = `${issueText.value.length}/250`;
  clearErrors();
  updateButtonState();
});

issueText.addEventListener("blur", () => {
  if (!isTextValid()) {
    showError(descTitle, "Please describe your issue (minimum 5 words)");
  }
});

//  SEQUENCE ERRORS 
uploadInputs[0].addEventListener("focus", () => {
  uploadTouched = true;
  if (!isReasonValid()) {
    showError(reasonTitle, "Please select the reason for return");
  }
});

issueText.addEventListener("focus", () => {
  if (!isReasonValid()) {
    showError(reasonTitle, "Please select the reason for return");
  } else if (!isUploadValid()) {
    showError(uploadTitle, "Please upload at least 1 image");
  }
});


// close error 
const errorClose = document.querySelector(".errorClose");
if (errorClose) {
  errorClose.addEventListener("click", clearErrors);
}

//  SUBMIT 
returnBtnFinal.addEventListener("click", () => {
  if (returnBtnFinal.disabled) return;

  returnOverlay.style.display = "none";
  resetConfirmModal();              // 👈 ADD
  confirmOverlay.style.display = "flex";
});





// confirm modal logic
const confirmOverlay = document.getElementById("confirmOverlay");
const confirmClose = document.getElementById("confirmClose");
const paymentBox = document.getElementById("paymentBox");
const confirmBtn = document.getElementById("confirmBtn");
const paymentOptions = document.querySelectorAll(".paymentCheckbox input");

// RESET CONFIRM PAYMENT MODAL
function resetConfirmModal() {
  paymentOptions.forEach(opt => opt.checked = false);
  paymentBox.innerHTML = "";
  confirmBtn.disabled = true;
  confirmBtn.classList.remove("active");
}
// NAYA CODE - Bank accounts ko preserve karta hai
paymentOptions.forEach(option => {
  option.addEventListener("change", () => {
    // Uncheck other options
    paymentOptions.forEach(o => {
      if (o !== option) o.checked = false;
    });

    // BANK TRANSFER
    if (option.checked && option.value === "bank") {
      // Agar bank accounts already saved hain toh unhe show karo
      if (bankAccounts.length > 0) {
        renderBankAccounts();
      } else {
        // Nahi toh "No account" message show karo
        paymentBox.innerHTML = `
          <p>No bank account added</p>
          <span class="changeAccount" id="addAccountBtn">Add Account</span>
        `;
        confirmBtn.disabled = true;
        confirmBtn.classList.remove("active");
        
        document.getElementById("addAccountBtn").addEventListener("click", () => {
          resetBankForm();
          bankForm.style.display = "flex";
          paymentBox.style.display = "none";
          confirmBtn.style.display = "none";
        });
      }
    }
    // UPI
    else if (option.checked && option.value === "upi") {
      paymentBox.innerHTML = `
        <span>UPI ID</span><br>
        davidjohn@upi
      `;
      confirmBtn.disabled = false;
      confirmBtn.classList.add("active");
    }
    // NONE SELECTED
    else {
      paymentBox.innerHTML = "";
      confirmBtn.disabled = true;
      confirmBtn.classList.remove("active");
    }
  });
});
// BANK FORM ELEMENTS
const bankForm = document.getElementById("bankForm");
const bankSaveBtn = document.getElementById("bankSaveBtn");
const bankClose = document.getElementById("bankClose");

// OPEN ADD ACCOUNT (exactly like screenshot)
paymentBox.addEventListener("click", (e) => {
  if (e.target.classList.contains("changeAccount")) {
    paymentBox.style.display = "none";
    confirmBtn.style.display = "none";
    bankForm.style.display = "block";
  }
});

// CLOSE ICON
bankClose.addEventListener("click", () => {
  bankForm.style.display = "none";
  paymentBox.style.display = "block";
  confirmBtn.style.display = "block";
});

// Store bank accounts
// Store bank accounts
let bankAccounts = [];

bankSaveBtn.addEventListener("click", () => {
  const bank = document.getElementById("bankName").value.trim();
  const branch = document.getElementById("branchName").value.trim();
  const holder = document.getElementById("accountHolderName").value.trim();
  const acc = document.getElementById("accountNumber").value.trim();
  const ifsc = document.getElementById("ifscCode").value.trim();

  if (!bank || !branch || !holder || !acc || !ifsc) {
    alert("Please fill all bank details");
    return;
  }

  // Add account to array
  bankAccounts.push({ bank, branch, holder, acc, ifsc });

  // Render all accounts
  renderBankAccounts();

  // close bank modal
  bankForm.style.display = "none";
  paymentBox.style.display = "block";

  // Reset form
  resetBankForm();
});

function renderBankAccounts() {
  if (bankAccounts.length === 0) {
    paymentBox.innerHTML = `
      <p>No bank account added</p>
      <span class="changeAccount" id="addAccountBtn">Add Account</span>
    `;
    confirmBtn.disabled = true;
    confirmBtn.classList.remove("active");
    confirmBtn.style.display = "block";
    
    document.getElementById("addAccountBtn").addEventListener("click", () => {
      resetBankForm();
      bankForm.style.display = "flex";
      paymentBox.style.display = "none";
      confirmBtn.style.display = "none";
    });
    return;
  }

  let html = '';
  
  bankAccounts.forEach((account, index) => {
    html += `
      <div class="bankAccountItem">
        <label class="bankAccountCheckbox">
          <input type="checkbox" name="selectedBank" value="${index}" />
          <span class="customBox">Account ${index + 1}</span>
          <div class="bankAccountDetails">
            <strong>${account.holder}</strong>
            <span>${account.bank}, ${account.branch}</span>
            <span>A/C: ${account.acc}</span>
            <span>IFSC: ${account.ifsc}</span>
          </div>
        </label>
      </div>
    `;
  });

  html += `<span class="changeAccount" id="addAnotherAccountBtn">Add Another Account</span>`;

  paymentBox.innerHTML = html;
  
  confirmBtn.style.display = "block";
  confirmBtn.disabled = true;
  confirmBtn.classList.remove("active");

  // Checkboxes ke event listeners
  const bankCheckboxes = paymentBox.querySelectorAll('input[name="selectedBank"]');
  bankCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        bankCheckboxes.forEach(cb => {
          if (cb !== checkbox) cb.checked = false;
        });
        confirmBtn.disabled = false;
        confirmBtn.classList.add("active");
      } else {
        const anyChecked = [...bankCheckboxes].some(cb => cb.checked);
        confirmBtn.disabled = !anyChecked;
        confirmBtn.classList.toggle("active", anyChecked);
      }
    });
  });

  document.getElementById("addAnotherAccountBtn").addEventListener("click", () => {
    resetBankForm();
    bankForm.style.display = "flex";
    paymentBox.style.display = "none";
    confirmBtn.style.display = "none";
  });
}
// BANK FORM VALIDATION
// BANK FORM VALIDATION
function showInputError(id, msg) {
  const el = document.getElementById(id);
  el.innerText = msg;
  el.style.display = "block";
}

function clearInputError(id) {
  const el = document.getElementById(id);
  el.innerText = "";
  el.style.display = "none";
}

// Bank Name Validation - only letters and spaces, no digits or special characters
const bankNameInput = document.getElementById("bankName");
bankNameInput.addEventListener("input", (e) => {
  let value = e.target.value;
  // Remove digits and special characters, keep only letters and spaces
  value = value.replace(/[^a-zA-Z\s]/g, "");
  e.target.value = value;
  
  if (value.trim() === "") {
    showInputError("bankNameError", "Bank name is required");
  } else if (value.trim().length < 2) {
    showInputError("bankNameError", "Bank name must be at least 2 characters");
  } else {
    clearInputError("bankNameError");
  }
});

// Branch Name Validation - only letters and spaces, no digits or special characters
const branchNameInput = document.getElementById("branchName");
branchNameInput.addEventListener("input", (e) => {
  let value = e.target.value;
  // Remove digits and special characters, keep only letters and spaces
  value = value.replace(/[^a-zA-Z\s]/g, "");
  e.target.value = value;
  
  if (value.trim() === "") {
    showInputError("branchNameError", "Branch name is required");
  } else if (value.trim().length < 2) {
    showInputError("branchNameError", "Branch name must be at least 2 characters");
  } else {
    clearInputError("branchNameError");
  }
});

// Account Holder Name Validation - only letters and spaces, no digits or special characters
const accountHolderInput = document.getElementById("accountHolderName");
accountHolderInput.addEventListener("input", (e) => {
  let value = e.target.value;
  // Remove digits and special characters, keep only letters and spaces
  value = value.replace(/[^a-zA-Z\s]/g, "");
  e.target.value = value;
  
  if (value.trim() === "") {
    showInputError("accountHolderNameError", "Account holder name is required");
  } else if (value.trim().length < 2) {
    showInputError("accountHolderNameError", "Name must be at least 2 characters");
  } else {
    clearInputError("accountHolderNameError");
  }
});

// Account Number Validation - only digits, 9-18 digits
const accountNumberInput = document.getElementById("accountNumber");
accountNumberInput.addEventListener("input", (e) => {
  let value = e.target.value;
  // Remove everything except digits
  value = value.replace(/\D/g, "");
  e.target.value = value;
  
  if (value === "") {
    showInputError("accountNumberError", "Account number is required");
  } else if (value.length < 9) {
    showInputError("accountNumberError", "Account number must be at least 9 digits");
  } else if (value.length > 18) {
    showInputError("accountNumberError", "Account number cannot exceed 18 digits");
  } else {
    clearInputError("accountNumberError");
  }
});

// IFSC Code Validation - uppercase letters and digits only, no special characters
const ifscCodeInput = document.getElementById("ifscCode");
ifscCodeInput.addEventListener("input", (e) => {
  let value = e.target.value;
  // Remove special characters and spaces, keep only letters and digits
  value = value.replace(/[^a-zA-Z0-9]/g, "");
  // Convert to uppercase
  value = value.toUpperCase();
  e.target.value = value;
  
  if (value === "") {
    showInputError("ifscError", "IFSC code is required");
  } else if (value.length !== 11) {
    showInputError("ifscError", "IFSC code must be exactly 11 characters");
  } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) {
    showInputError("ifscError", "Invalid IFSC format (e.g., SBIN0001234)");
  } else {
    clearInputError("ifscError");
  }
});

function resetBankForm() {
  document.getElementById("bankName").value = "";
  document.getElementById("branchName").value = "";
  document.getElementById("accountHolderName").value = "";
  document.getElementById("accountNumber").value = "";
  document.getElementById("ifscCode").value = "";
}




const successOverlay = document.getElementById("successOverlay");
const successClose = document.getElementById("successClose");

confirmBtn.addEventListener("click", () => {
  confirmOverlay.style.display = "none";
  resetConfirmModal();
  bankAccounts = [];
  
  const img = document.querySelector(".successAnimation img");
  img.style.animation = "none";
  img.offsetHeight; 
  img.style.animation = "";

  successOverlay.style.display = "flex";

  setTimeout(() => {
    window.location.href = "../html/index.html";
  }, 3000);
});

/* close success popup */
successClose.addEventListener("click", () => {
  successOverlay.style.display = "none";
});


confirmClose.addEventListener("click", () => {
  confirmOverlay.style.display = "none";
  resetConfirmModal();   
});



//  REVIEW POPUP 

const reviewOverlay = document.getElementById("reviewOverlay");
const reviewClose = document.getElementById("reviewClose");
const reviewPostBtn = document.getElementById("reviewPostBtn");
const reviewTextarea = document.querySelector(".reviewTextarea");
const reviewStars = document.querySelectorAll("#reviewStars img");
const cancelSuccessTitle = document.querySelector("#cancelSuccessOverlay h2");
const cancelSuccessText = document.querySelector("#cancelSuccessOverlay p");

const reviewUploadInputs = document.querySelectorAll(
  ".reviewUploadRow .uploadBox input[type='file']"
);

// RESET REVIEW MODAL
function resetReviewModal() {
  hasStar = false;
  hasText = false;
  hasImage = false;

  // reset textarea
  reviewTextarea.value = "";

  // reset stars
  reviewStars.forEach(star => {
    star.src = "../assets/myOrders/Star.svg";
  });

  // reset upload previews
  document
    .querySelectorAll(".reviewUploadRow img.previewImg")
    .forEach(img => img.remove());

  // show upload placeholders again
  document
    .querySelectorAll(".reviewUploadRow .uploadPlaceholder")
    .forEach(ph => ph.style.display = "flex");

  // reset button
  reviewPostBtn.disabled = true;
  reviewPostBtn.classList.remove("active");
}



// stars section in order card
const ratingSections = document.querySelectorAll(".myOrdersStars, .myOrdersRatingText");


let hasStar = false;
let hasText = false;
let hasImage = false;


function updatePostButton() {
  if (hasStar || hasText || hasImage) {
    reviewPostBtn.disabled = false;
    reviewPostBtn.classList.add("active");
  } else {
    reviewPostBtn.disabled = true;
    reviewPostBtn.classList.remove("active");
  }
}


reviewStars.forEach((star, index) => {
  star.addEventListener("click", () => {
    hasStar = true;

    reviewStars.forEach((s, i) => {
      s.src =
        i <= index
          ? "../assets/myOrders/YellowStar.svg"
          : "../assets/myOrders/Star.svg";
    });

    updatePostButton();
  });
});


reviewTextarea.addEventListener("input", () => {
  hasText = reviewTextarea.value.trim().length > 0;
  updatePostButton();
});

reviewUploadInputs.forEach(input => {
  input.addEventListener("change", () => {
    hasImage = true;
    updatePostButton();
  });
});



// open review modal
ratingSections.forEach(el => {
  el.addEventListener("click", () => {
    reviewOverlay.style.display = "flex";

 resetReviewModal();
initReviewUploadPreview();

  });
});


// close modal
reviewClose.addEventListener("click", () => {
  reviewOverlay.style.display = "none";
  resetReviewModal(); 
});


reviewPostBtn.addEventListener("click", () => {
  if (reviewPostBtn.disabled) return;

  // close review modal
  reviewOverlay.style.display = "none";
  resetReviewModal();

  // ✨ UPDATE SUCCESS MODAL TEXT (REVIEW FLOW)
  cancelSuccessTitle.innerText = "Thank you for your review!";
  cancelSuccessText.innerText =
    "Your feedback has been submitted successfully.";

  // open existing cancel success modal
  cancelSuccessOverlay.style.display = "flex";
});





//  REVIEW MODAL – UPLOAD IMAGE PREVIEW (NO VALIDATION)

function initReviewUploadPreview() {
  const reviewUploadInputs = document.querySelectorAll(
    ".reviewUploadRow .uploadBox input[type='file']"
  );
  
  reviewUploadInputs.forEach(input => {
    input.addEventListener("change", function () {
      const file = this.files[0];
      if (!file) return;

      const uploadBox = this.parentElement;

      // remove old preview if exists
      const oldPreview = uploadBox.querySelector("img.previewImg");
      if (oldPreview) {
        URL.revokeObjectURL(oldPreview.src);
        oldPreview.remove();
      }

      // create new preview image
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.className = "previewImg";

      uploadBox.appendChild(img);

      // hide upload placeholder
      const placeholder = uploadBox.querySelector(".uploadPlaceholder");
      if (placeholder) {
        placeholder.style.display = "none";
      }
    });
  });
}


/* CANCEL MODAL LOGIC */

const cancelOverlay = document.getElementById("cancelOverlay");
const cancelSuccessOverlay = document.getElementById("cancelSuccessOverlay");

const cancelConfirmBtn = document.getElementById("cancelConfirmBtn");
const cancelClose = document.getElementById("cancelClose");
const cancelSuccessClose = document.getElementById("cancelSuccessClose");
const continueShoppingBtn = document.getElementById("continueShoppingBtn");

const cancelCheckboxes = document.querySelectorAll(".cancelCheckbox input");

/* OPEN CANCEL MODAL (example trigger) */
document.querySelectorAll(".openCancelModal").forEach(btn => {
  btn.addEventListener("click", () => {
    console.log("yeds");
    cancelOverlay.style.display = "flex";
    resetCancelModal();
  });
});

/* CLOSE CANCEL MODAL */
cancelClose.addEventListener("click", () => {
  cancelOverlay.style.display = "none";
});

/* ENABLE BUTTON IF AT LEAST ONE CHECKED */
cancelCheckboxes.forEach(cb => {
  cb.addEventListener("change", () => {
    const checked = [...cancelCheckboxes].some(c => c.checked);
    cancelConfirmBtn.disabled = !checked;
    cancelConfirmBtn.classList.toggle("active", checked);
  });
});

/* CONFIRM CANCEL */
cancelConfirmBtn.addEventListener("click", () => {
  if (cancelConfirmBtn.disabled) return;

  cancelOverlay.style.display = "none";
  cancelSuccessOverlay.style.display = "flex";
});

/* CLOSE SUCCESS */
cancelSuccessClose.addEventListener("click", () => {
  cancelSuccessOverlay.style.display = "none";

  // reset to cancel default text
  cancelSuccessTitle.innerText = "Your order has been cancelled";
  cancelSuccessText.innerText =
    "Your refund will be processed within 7 business days";
});

/* CONTINUE SHOPPING */
continueShoppingBtn.addEventListener("click", () => {
  cancelSuccessOverlay.style.display = "none";
  // optional redirect
  window.location.href = "../html/index.html";
});

/* RESET CANCEL MODAL */
function resetCancelModal() {
  cancelCheckboxes.forEach(cb => cb.checked = false);
  cancelConfirmBtn.disabled = true;
  cancelConfirmBtn.classList.remove("active");
}
