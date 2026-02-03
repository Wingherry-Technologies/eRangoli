/* ===== APPROVE CONFIRMATION POPUP ===== */
const ADVOFaApproveBtn = document.querySelector(".ADVOFaApproveButton");
const ADVOFaApproveModal = document.getElementById("ADVOFaApproveModal");
const ADVOFaCloseApproveModal = document.getElementById("ADVOFaCloseApproveModal");
const ADVOFaApproveYes = document.getElementById("ADVOFaApproveYes");
const ADVOFaApproveNo = document.getElementById("ADVOFaApproveNo");

const ADVOFaRejectBtn = document.querySelector(".ADVOFaRejectButton");
const ADVOFaRejectModal = document.getElementById("ADVOFaRejectModal");
const ADVOFaRejectYes = document.getElementById("ADVOFaRejectYes");
const ADVOFaRejectNo = document.getElementById("ADVOFaRejectNo");
const ADVOFaCloseRejectModal = document.getElementById("ADVOFaCloseRejectModal");
// ============ VALIDATION LOGIC FOR SEND TO VERIFY BUTTON ============
const sentToVerifyBtn = document.getElementById('ADVOSentToVerifyBtn');
const reviewTextarea = document.getElementById('ADVOReviewTextarea');
const reviewError = document.getElementById('ADVOReviewError');
const sentModal = document.getElementById('FAsentModal');
const closeSentModal = document.getElementById('FAcloseSentModal');
const sentNo = document.getElementById('FAsentNo');
const sentYes = document.getElementById('FAsentYes');
const sentSuccessScreen = document.getElementById('FAsentSuccessScreen');

// Function to count words in text
function countWords(text) {
  // Trim and split by whitespace, then filter out empty strings
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  return words.length;
}

// Validation function
function validateReview() {
  const reviewText = reviewTextarea.value.trim();
  const wordCount = countWords(reviewText);

  // Check if textarea is empty or has less than 5 words
  if (reviewText === '' || wordCount < 5) {
    reviewError.style.display = 'block';
    reviewTextarea.style.borderColor = '#ff0000';
    return false;
  } else {
    reviewError.style.display = 'none';
    reviewTextarea.style.borderColor = '#d9d9d9';
    return true;
  }
}

// Event listener for "Sent to Verify" button
sentToVerifyBtn.addEventListener('click', function() {
  if (validateReview()) {
    // If validation passes, show confirmation modal
    sentModal.classList.add('active');
  }
  // If validation fails, error message will be shown (no modal)
});

// Hide error when user starts typing
reviewTextarea.addEventListener('input', function() {
  if (reviewError.style.display === 'block') {
    const reviewText = this.value.trim();
    const wordCount = countWords(reviewText);
    
    if (reviewText !== '' && wordCount >= 5) {
      reviewError.style.display = 'none';
      reviewTextarea.style.borderColor = '#d9d9d9';
    }
  }
});

// Close modal handlers
closeSentModal.addEventListener('click', function() {
  sentModal.classList.remove('active');
});

sentNo.addEventListener('click', function() {
  sentModal.classList.remove('active');
});

// Yes button - proceed with sending to verify
sentYes.addEventListener('click', function() {
  sentModal.classList.remove('active');
  sentSuccessScreen.classList.add('active');
  
  // Hide success screen after 2 seconds
  setTimeout(function() {
    sentSuccessScreen.classList.remove('active');
  }, 2000);
});

// Close modal when clicking outside
sentModal.addEventListener('click', function(e) {
  if (e.target === sentModal) {
    sentModal.classList.remove('active');
  }
});


ADVOFaApproveBtn.addEventListener("click", () => {
  ADVOFaApproveModal.classList.add("active");
});

ADVOFaCloseApproveModal.addEventListener("click", () => {
  ADVOFaApproveModal.classList.remove("active");
});

ADVOFaApproveNo.addEventListener("click", () => {
  ADVOFaApproveModal.classList.remove("active");
});

ADVOFaApproveYes.addEventListener("click", () => {
  ADVOFaApproveModal.classList.remove("active");

  // document.querySelector(".ADVOBdContainer").style.display = "none";
  document.querySelector(".ADVOBdContainer").classList.add("ADVOBlur");


  const successScreen = document.getElementById("ADVOFaApproveSuccessScreen");
  successScreen.classList.add("active");

  // After 3 seconds
  setTimeout(() => {
    successScreen.classList.remove("active");
    openVendorCredentialPopup();
  }, 3000);
});


// Open reject confirmation
ADVOFaRejectBtn.addEventListener("click", () => {
  ADVOFaRejectModal.classList.add("active");
});

// Close actions
ADVOFaRejectNo.addEventListener("click", () => {
  ADVOFaRejectModal.classList.remove("active");
});

ADVOFaCloseRejectModal.addEventListener("click", () => {
  ADVOFaRejectModal.classList.remove("active");
});


ADVOFaRejectYes.addEventListener("click", () => {
  ADVOFaRejectModal.classList.remove("active");

  document.querySelector(".ADVOBdContainer").classList.add("ADVOBlur");

  // Show reject success popup
  const rejectSuccess = document.getElementById("ADVOFaRejectSuccessScreen");
  rejectSuccess.classList.add("active");

  // After 3 seconds 
  setTimeout(() => {
    rejectSuccess.classList.remove("active");

    // blur remove
    document.querySelector(".ADVOBdContainer").classList.remove("ADVOBlur");

    // redirect
    window.location.href = "../html/adminVMVendorVerificationList.html";
  }, 3000);
});



let actualVendorPassword = "";

function openVendorCredentialPopup() {
  const modal = document.getElementById("ADVOVendorCredentialModal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Mobile autofill
  document.getElementById("ADVOVendorMobile").value = "9536789905";

  // Username autofill
  document.getElementById("ADVOVendorUsername").value = "David John";

  // Generate real password
  actualVendorPassword = generatePassword();

  // UI me sirf ######
  document.getElementById("ADVOVendorPassword").value = "######";
}




document.getElementById("ADVOCloseVendorCredentialModal").addEventListener("click", () => {
  const modal = document.getElementById("ADVOVendorCredentialModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
  document.querySelector(".ADVOBdContainer").classList.remove("ADVOBlur");
});

function showError(input, message) {
  const error = input.parentElement.querySelector(".ADVOError");
  error.innerText = message;
  input.style.borderColor = "red";
}

function clearError(input) {
  const error = input.parentElement.querySelector(".ADVOError");
  error.innerText = "";
  input.style.borderColor = "#ccc";
}

function validateUsername() {
  const input = document.getElementById("ADVOVendorUsername");
  const value = input.value;

  if (value.trim() === "") {
    showError(input, "Username is required");
    return false;
  }

  if (/^\s/.test(value)) {
    showError(input, "Username cannot start with space");
    return false;
  }

  if (!/^[A-Za-z ]+$/.test(value)) {
    showError(input, "Only letters allowed");
    return false;
  }

  clearError(input);
  return true;
}

// function validatePassword() {
//   const input = document.getElementById("ADVOVendorPassword");
//   const value = input.value;

//   // Empty check
//   if (value.trim() === "") {
//     showError(input, "Password is required");
//     return false;
//   }

//   // Minimum length
//   if (value.length < 6) {
//     showError(input, "Password must be at least 6 characters long");
//     return false;
//   }

//   // Strong password regex
//   const strongRegex =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

//   if (!strongRegex.test(value)) {
//     showError(
//       input,
//       "Password must contain uppercase, lowercase, number & special character"
//     );
//     return false;
//   }

//   clearError(input);
//   return true;
// }

function generatePassword() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&";
  let password = "";

  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return password;
}






// function validateConfirmPassword() {
//   const pass = document.getElementById("ADVOVendorPassword");
//   const confirm = document.getElementById("ADVOVendorConfirmPassword");

//   if (confirm.value !== pass.value || confirm.value === "") {
//     showError(confirm, "Passwords do not match");
//     return false;
//   }
//   clearError(confirm);
//   return true;
// }
document.getElementById("ADVOVendorUsername").addEventListener("blur", validateUsername);
// document.getElementById("ADVOVendorPassword").addEventListener("blur", validatePassword);
// document
//   .getElementById("ADVOVendorConfirmPassword")
//   .addEventListener("blur", validateConfirmPassword);
document.getElementById("ADVOSendVendorCredentialBtn").addEventListener("click", () => {


  localStorage.setItem("vendorCredentialSuccess", "true");
  window.location.href = "../html/adminVMVendorList.html";
});

document.querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(3)").classList.add("sidebar-active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(2)").classList.add("active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(2)>li:nth-child(3)").classList.add("submenu-active-highlight");


document.querySelector("#account-menu .mobile-dropdown:nth-child(3) .dropdown-header").classList.add("dropdown-header-active");
document.querySelector("#account-menu .mobile-dropdown:nth-child(3)").classList.add("active-mobile-submenu");
document.querySelector("#account-menu .mobile-dropdown:nth-child(3) li:nth-child(3)").classList.add("submenu-active-page");