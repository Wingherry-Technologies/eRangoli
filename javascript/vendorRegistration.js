document.addEventListener("DOMContentLoaded", function () {
  const fullNameInput = document.getElementById("vendorRegistrationFullName");
  const mobileInput = document.getElementById("vendorRegistrationMobile");
    const genderSelect = document.getElementById("vendorRegistrationGender");
     const emailInput = document.getElementById("vendorRegistrationEmail");
       const designationInput = document.getElementById("vendorRegistrationDesignation");
  const step1Form = document.getElementById("vendorRegistrationFormStep1");
  const step1Container = document.getElementById("vendorRegistrationStep1");
  const step2Container = document.getElementById("vendorRegistrationStep2");
  const steps = document.querySelectorAll(".vendorRegistrationStep");

  function setStep(index) {
    steps.forEach((step, i) => {
      if (i <= index) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });
  }

  setStep(0);

  // STEP 1 Show ERROR
  function showError(input, errorId, message) {
    const group = input.closest(".vendorRegistrationFormGroup");
    const label = group.querySelector(".vendorRegistrationLabel");
    const errorSpan = document.getElementById(errorId);

    if (errorSpan) {
      errorSpan.textContent = message;
      errorSpan.style.display = "block";
    }

    input.classList.add("error");
    if (label) label.classList.add("error");
  }

  //   CLEAR ERROR
  function clearError(input, errorId) {
    const group = input.closest(".vendorRegistrationFormGroup");
    const label = group.querySelector(".vendorRegistrationLabel");
    const errorSpan = document.getElementById(errorId);

    if (errorSpan) {
      errorSpan.textContent = "";
      errorSpan.style.display = "none";
    }

    input.classList.remove("error");
    if (label) label.classList.remove("error");
  }

  //   Validate Name Function
  function validateName() {
    let value = fullNameInput.value;
    value = value.replace(/[^A-Za-z\s]/g, ""); 
    value = value.replace(/^\s+/, ""); 
    value = value.replace(/\s{2,}/g, " "); 

    fullNameInput.value = value;
    value = value.trim();

    let error = "";

    if (!value) {
      error = "Please enter your full name";
    } else if (!/^[A-Za-z\s]+$/.test(value)) {
      error = "Only alphabets are allowed";
    } else {
      const words = value.split(/\s+/).filter(Boolean);
      if (words.length < 2) {
        error = "Please enter at least two words";
      }
    }

    if (error) {
      showError(fullNameInput, "vendorRegistrationFullNameError", error);
      return false;
    } else {
      clearError(fullNameInput, "vendorRegistrationFullNameError");
      return true;
    }
  }
  fullNameInput.addEventListener("keydown", function (e) {
    const key = e.key;

    if (key === "Enter") {
      e.preventDefault(); 
      if (validateName()) {
        document.getElementById("vendorRegistrationGender").focus();
      }
      return;
    }
    const isLetter = /^[A-Za-z]$/.test(key);
    const isSpace = key === " ";
    const controlKeys = [
      "Backspace",
      "Tab",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];

    if (controlKeys.includes(key) || e.ctrlKey || e.metaKey) {
      return;
    }

    if (!isLetter && !isSpace) {
      e.preventDefault();
      return;
    }

    if (isSpace) {
      const cursorPos = this.selectionStart;
      const value = this.value;

      if (value.length === 0 || cursorPos === 0) {
        e.preventDefault();
        return;
      }

      if (value[cursorPos - 1] === " ") {
        e.preventDefault();
        return;
      }
    }
  });

  // Extra safety for paste etc.
  fullNameInput.addEventListener("input", function () {
    let v = this.value;

    v = v.replace(/[^A-Za-z\s]/g, ""); // only letters + spaces
    v = v.replace(/^\s+/, ""); // no leading space
    v = v.replace(/\s{2,}/g, " "); // no multiple spaces

    this.value = v;
  });
// Validate Email 
  function validateEmail() {
  let value = emailInput.value.trim();

  // If empty -> no error, field is optional
  if (!value) {
    clearError(emailInput, "vendorRegistrationEmailError");
    return true;
  }

  let error = "";

  // 1) Allowed characters only: letters, numbers, @ . - _
  if (!/^[A-Za-z0-9@._-]+$/.test(value)) {
    error = "Email can contain only letters, numbers, @ . - _";
  }
  // 2) Should not start or end with special character
  else if (/^[.@_-]/.test(value) || /[.@_-]$/.test(value)) {
    error = "Email cannot start or end with a special character";
  }
  // 3) Must include @ and .
  else if (!value.includes("@") || !value.includes(".")) {
    error = "Email must contain @ and .";
  }
  // 4) No consecutive periods
  else if (value.includes("..")) {
    error = "Periods cannot appear consecutively";
  }

  if (error) {
    showError(emailInput, "vendorRegistrationEmailError", error);
    return false;
  } else {
    clearError(emailInput, "vendorRegistrationEmailError");
    return true;
  }
}
// Validate Gender
function validateGender() {
  const genderSelect = document.getElementById("vendorRegistrationGender");

  if (genderSelect.value.trim() === "") {
    showError(
      genderSelect,
      "vendorRegistrationGenderError",
      "Please select gender"
    );
    return false;
  } else {
    clearError(genderSelect, "vendorRegistrationGenderError");
    return true;
  }
}




  // Mobile Validation Function
  function validateMobile() {
    let value = mobileInput.value.replace(/\D/g, "");
    mobileInput.value = value;

    let error = "";

    if (!value) {
      error = "Please enter mobile number";
    } else if (!/^\d+$/.test(value)) {
      error = "Only digits are allowed";
    } else if (value.length !== 10) {
      error = "Mobile number must be 10 digits";
    } else if (!/^[6-9]/.test(value)) {
      error = "Number must start with 6, 7, 8 or 9";
    }

    if (error) {
      showError(mobileInput, "vendorRegistrationMobileError", error);
      return false;
    } else {
      clearError(mobileInput, "vendorRegistrationMobileError");
      return true;
    }
  }

  // Remove Non-digit form Mobile Input
  mobileInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
  });


  // validate DESIGNATION - ONLY ALPHABETS
designationInput.addEventListener("keydown", function (e) {
  const key = e.key;

  const isLetter = /^[A-Za-z]$/.test(key);
  const isSpace = key === " ";
  const controlKeys = [
    "Backspace",
    "Tab",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "Home",
    "End"
  ];

  // Allow navigation / control
  if (controlKeys.includes(key) || e.ctrlKey || e.metaKey) return;

  // Block anything that is not a letter or space
  if (!isLetter && !isSpace) {
    e.preventDefault();
    return;
  }

  // OPTIONAL: Prevent space as first character and double spaces
  if (isSpace) {
    const cursorPos = this.selectionStart;
    const value = this.value;

    if (cursorPos === 0) {
      e.preventDefault();
      return;
    }

    if (value[cursorPos - 1] === " ") {
      e.preventDefault();
      return;
    }
  }
});

// Clean pasted text
designationInput.addEventListener("input", function () {
  let v = this.value;

  v = v.replace(/[^A-Za-z\s]/g, ""); // only alphabets + spaces
  v = v.replace(/^\s+/, ""); // no leading space
  v = v.replace(/\s{2,}/g, " "); // no double spaces

  this.value = v;
});


  fullNameInput.addEventListener("blur", validateName);
  mobileInput.addEventListener("blur", validateMobile);
  emailInput.addEventListener("blur", validateEmail);
  genderSelect.addEventListener("change", validateGender);
genderSelect.addEventListener("blur", validateGender);

  // STEP 1 submit -> validation -> STEP 2
  step1Form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isGenderValid = validateGender();
    const isMobileValid = validateMobile();

    if (isNameValid && isEmailValid && isGenderValid && isMobileValid) {
      step1Container.style.display = "none";
      step2Container.style.display = "block";
      setStep(1); // second dot green
    }
  });

  // Validatation for 2nd Step
  function validateStep2() {
    let valid = true;

    const fields = [
      {
        input: "vendorAddressHouse",
        error: "vendorAddressHouseError",
        msg: "Please enter house/society",
      },
      {
        input: "vendorAddressArea",
        error: "vendorAddressAreaError",
        msg: "Please enter area/lane",
      },
      {
        input: "vendorAddressCity",
        error: "vendorAddressCityError",
        msg: "Please enter city",
      },
      {
        input: "vendorAddressZipcode",
        error: "vendorAddressZipcodeError",
        msg: "Please enter zipcode",
      },
      {
        input: "vendorAddressState",
        error: "vendorAddressStateError",
        msg: "Please enter state",
      },
    ];

    fields.forEach((f) => {
      const input = document.getElementById(f.input);
      const errorSpan = document.getElementById(f.error);

      if (input.value.trim() === "") {
        errorSpan.textContent = f.msg;
        errorSpan.style.display = "block";
        input.classList.add("error");
        valid = false;
      } else {
        errorSpan.textContent = "";
        errorSpan.style.display = "none";
        input.classList.remove("error");
      }
    });

    return valid;
  }

  // Step 2 -> STEP 3
  document
    .getElementById("vendorRegistrationStep2Continue")
    .addEventListener("click", function () {
      if (!validateStep2()) return;
      document.getElementById("vendorRegistrationStep2").style.display = "none";
      document.getElementById("vendorRegistrationStep3").style.display =
        "block";
      setStep(2);
    });

  // STEP 3 VALIDATION

  function validateStep3() {
    let valid = true;

    const fields = [
      {
        input: "vendorBusinessName",
        error: "vendorBusinessNameError",
        msg: "Enter business name",
      },
      {
        input: "vendorBusinessMobile",
        error: "vendorBusinessMobileError",
        msg: "Enter valid mobile",
        pattern: /^[6-9]\d{9}$/,
      },
      {
        input: "vendorBusinessEmail",
        error: "vendorBusinessEmailError",
        msg: "Enter valid email",
        pattern: /^\S+@\S+\.\S+$/,
      },
      {
        input: "vendorBusinessGST",
        error: "vendorBusinessGSTError",
        msg: "Enter GST number",
      },
    ];

    fields.forEach((f) => {
      const input = document.getElementById(f.input);
      const errorSpan = document.getElementById(f.error);

      let val = input.value.trim();
      let isValid = true;

      if (f.pattern) isValid = f.pattern.test(val);
      else isValid = val !== "";

      if (!isValid) {
        errorSpan.textContent = f.msg;
        errorSpan.style.display = "block";
        input.classList.add("error");
        valid = false;
      } else {
        errorSpan.textContent = "";
        errorSpan.style.display = "none";
        input.classList.remove("error");
      }
    });

    return valid;
  }

  // STEP 3 -> STEP 4
  document
    .getElementById("vendorRegistrationStep3Continue")
    .addEventListener("click", function () {
      if (!validateStep3()) return;

      document.getElementById("vendorRegistrationStep3").style.display = "none";
      document.getElementById("vendorRegistrationStep4").style.display =
        "block";

      setStep(3);
    });

  // STEP 4 VALIDATION

  function validateStep4() {
    let valid = true;

    const fields = [
      {
        input: "shippingHouse",
        error: "shippingHouseError",
        msg: "Please enter house/society",
      },
      {
        input: "shippingArea",
        error: "shippingAreaError",
        msg: "Please enter area/lane",
      },
      {
        input: "shippingCity",
        error: "shippingCityError",
        msg: "Please enter city",
      },
      {
        input: "shippingZipcode",
        error: "shippingZipcodeError",
        msg: "Please enter zipcode",
      },
      {
        input: "shippingState",
        error: "shippingStateError",
        msg: "Please enter state",
      },
    ];

    fields.forEach((f) => {
      const input = document.getElementById(f.input);
      const errorSpan = document.getElementById(f.error);

      if (input.value.trim() === "") {
        errorSpan.textContent = f.msg;
        errorSpan.style.display = "block";
        input.classList.add("error");
        valid = false;
      } else {
        errorSpan.textContent = "";
        errorSpan.style.display = "none";
        input.classList.remove("error");
      }
    });

    return valid;
  }

  document
    .getElementById("shippingSameAsPermanent")
    .addEventListener("change", function () {
      if (this.checked) {
        shippingHouse.value = vendorAddressHouse.value;
        shippingArea.value = vendorAddressArea.value;
        shippingLandmark.value = vendorAddressLandmark.value;
        shippingCity.value = vendorAddressCity.value;
        shippingZipcode.value = vendorAddressZipcode.value;
        shippingState.value = vendorAddressState.value;
      }
    });

  // STEP 4 -> STEP 5
  document
    .getElementById("vendorRegistrationStep4Continue")
    .addEventListener("click", function () {
      if (!validateStep4()) return;

      document.getElementById("vendorRegistrationStep4").style.display = "none";
      document.getElementById("vendorRegistrationStep5").style.display =
        "block";

      setStep(4);
    });

  // STEP 5 VALIDATION

  function validateStep5() {
    let valid = true;

    const fields = [
      {
        input: "vendorBankName",
        error: "vendorBankNameError",
        msg: "Please enter bank name",
      },
      {
        input: "vendorBankBranch",
        error: "vendorBankBranchError",
        msg: "Please enter branch name",
      },
      {
        input: "vendorBankAccountHolder",
        error: "vendorBankAccountHolderError",
        msg: "Please enter account holder name",
      },
      {
        input: "vendorBankAccountNumber",
        error: "vendorBankAccountNumberError",
        msg: "Please enter valid account number",
        pattern: /^\d{9,18}$/, // 9-18 digits
      },
      {
        input: "vendorBankIFSC",
        error: "vendorBankIFSCError",
        msg: "Please enter valid IFSC code",
        pattern: /^[A-Z]{4}0[0-9A-Z]{6}$/i, // simple IFSC pattern
      },
    ];

    fields.forEach((f) => {
      const input = document.getElementById(f.input);
      const errorSpan = document.getElementById(f.error);

      let val = input.value.trim();
      let isValid = true;

      if (f.pattern) {
        isValid = f.pattern.test(val);
      } else {
        isValid = val !== "";
      }

      if (!isValid) {
        errorSpan.textContent = f.msg;
        errorSpan.style.display = "block";
        input.classList.add("error");
        valid = false;
      } else {
        errorSpan.textContent = "";
        errorSpan.style.display = "none";
        input.classList.remove("error");
      }
    });

    // Terms & conditions checkbox
    const terms = document.getElementById("vendorBankTerms");
    const termsError = document.getElementById("vendorBankTermsError");

    if (!terms.checked) {
      termsError.textContent = "Please agree to the terms and conditions";
      termsError.style.display = "block";
      valid = false;
    } else {
      termsError.textContent = "";
      termsError.style.display = "none";
    }

    return valid;
  }

  // STEP 5 -> SHOW OTP SCREEN
  document
    .getElementById("vendorRegistrationStep5Register")
    .addEventListener("click", function () {
      if (!validateStep5()) return;

      // registration form card hide
      document.getElementById("vendorRegistrationCard").style.display = "none";

      // OTP card show
      const otpCard = document.getElementById("vendorOtpCard");
      otpCard.style.display = "flex";

      // first OTP box focus
      const firstOtpInput = document.getElementById("vendorOtp1");
      if (firstOtpInput) firstOtpInput.focus();

      // timer start
      startOtpTimer();
    });

  // OTP INPUT LOGIC
  const otpInputs = document.querySelectorAll(".vendorOtpInput");
  otpInputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, ""); // only digit

      if (this.value && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "Backspace" && !this.value && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
  });

  function getOtpValue() {
    let otp = "";
    otpInputs.forEach((inp) => (otp += inp.value));
    return otp;
  }

  function validateOtp() {
    const otp = getOtpValue();
    const error = document.getElementById("vendorOtpError");

    const DUMMY_OTP = "123456";

    let message = "";

    if (otp.length !== 6) {
      message = "Please enter 6-digit OTP";
    } else if (otp !== DUMMY_OTP) {
      message = "Invalid OTP. Please try again.";
    }

    if (message) {
      error.textContent = message;
      error.style.display = "block";
      return false;
    } else {
      error.textContent = "";
      error.style.display = "none";
      return true;
    }
  }

  document
    .getElementById("vendorOtpVerifyBtn")
    .addEventListener("click", function () {
      if (!validateOtp()) return;

      window.location.href = "../html/vendorLogin.html?registered=1";
    });

  // OTP TIMER + RESEND

  let otpTimerInterval;

  function startOtpTimer() {
    clearInterval(otpTimerInterval);

    const timerSpan = document.getElementById("vendorOtpTimer");
    const resendBtn = document.getElementById("vendorOtpResendBtn");

    let remaining = 30; // seconds
    resendBtn.disabled = true;

    timerSpan.textContent = "00:30";

    otpTimerInterval = setInterval(() => {
      remaining--;

      const sec = remaining.toString().padStart(2, "0");
      timerSpan.textContent = `00:${sec}`;

      if (remaining <= 0) {
        clearInterval(otpTimerInterval);
        timerSpan.textContent = "00:00";
        resendBtn.disabled = false;
      }
    }, 1000);
  }

  // resend click
  document
    .getElementById("vendorOtpResendBtn")
    .addEventListener("click", function () {
      startOtpTimer();
    });
});
