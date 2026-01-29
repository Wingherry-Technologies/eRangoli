/* ===== APPROVE CONFIRMATION POPUP ===== */
const FAapproveBtn = document.querySelector(".FAApproveButton");
const FAapproveModal = document.getElementById("FAapproveModal");
const FAcloseApproveModal = document.getElementById("FAcloseApproveModal");
const FAapproveYes = document.getElementById("FAapproveYes");
const FAapproveNo = document.getElementById("FAapproveNo");

FAapproveBtn.addEventListener("click", () => {
  FAapproveModal.classList.add("active");
});

FAcloseApproveModal.addEventListener("click", () => {
  FAapproveModal.classList.remove("active");
});

FAapproveNo.addEventListener("click", () => {
  FAapproveModal.classList.remove("active");
});

FAapproveYes.addEventListener("click", () => {
  FAapproveModal.classList.remove("active");

  // document.querySelector(".BDContainer").style.display = "none";
  document.querySelector(".BDContainer").classList.add("blur");


  const successScreen = document.getElementById("FAapproveSuccessScreen");
  successScreen.classList.add("active");

  // After 3 seconds
  setTimeout(() => {
    successScreen.classList.remove("active");
    openVendorCredentialPopup();
  }, 3000);
});


function openVendorCredentialPopup() {
  const modal = document.getElementById("vendorCredentialModal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";


  // auto fill mobile from personal details
  const mobile = "9536789905"; // dynamic bhi kar sakte ho
  document.getElementById("vendorMobile").value = mobile;
}

document.getElementById("closeVendorCredentialModal").addEventListener("click", () => {
  const modal = document.getElementById("vendorCredentialModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
  document.querySelector(".BDContainer").classList.remove("blur");
});

function showError(input, message) {
  const error = input.parentElement.querySelector(".error");
  error.innerText = message;
  input.style.borderColor = "red";
}

function clearError(input) {
  const error = input.parentElement.querySelector(".error");
  error.innerText = "";
  input.style.borderColor = "#ccc";
}

function validateUsername() {
  const input = document.getElementById("vendorUsername");
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

function validatePassword() {
  const input = document.getElementById("vendorPassword");
  const value = input.value;

  // Empty check
  if (value.trim() === "") {
    showError(input, "Password is required");
    return false;
  }

  // Minimum length
  if (value.length < 6) {
    showError(input, "Password must be at least 6 characters long");
    return false;
  }

  // Strong password regex
  const strongRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  if (!strongRegex.test(value)) {
    showError(
      input,
      "Password must contain uppercase, lowercase, number & special character"
    );
    return false;
  }

  clearError(input);
  return true;
}


// function validateConfirmPassword() {
//   const pass = document.getElementById("vendorPassword");
//   const confirm = document.getElementById("vendorConfirmPassword");

//   if (confirm.value !== pass.value || confirm.value === "") {
//     showError(confirm, "Passwords do not match");
//     return false;
//   }
//   clearError(confirm);
//   return true;
// }
document.getElementById("vendorUsername").addEventListener("blur", validateUsername);
document.getElementById("vendorPassword").addEventListener("blur", validatePassword);
// document
//   .getElementById("vendorConfirmPassword")
//   .addEventListener("blur", validateConfirmPassword);
document
  .getElementById("sendVendorCredentialBtn")
  .addEventListener("click", () => {
    const u = validateUsername();
    const p = validatePassword();
    // const c = validateConfirmPassword();

    if (u && p ) {
      // flag set so vendor list page knows we came from credential submit
localStorage.setItem("vendorCredentialSuccess", "true");

// redirect to vendor list page
window.location.href = "../html/adminvendorlist.html";


      // document
      //   .getElementById("vendorCredentialModal")
      //   .classList.remove("active");
      //   document.body.style.overflow = "auto";
      //   document.querySelector(".BDContainer").classList.remove("blur");

    }
  });

