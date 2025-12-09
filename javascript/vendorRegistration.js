document.addEventListener("DOMContentLoaded", function () {
  const fullNameInput = document.getElementById("vendorRegistrationFullName");
  const mobileInput = document.getElementById("vendorRegistrationMobile");
  const genderSelect = document.getElementById("vendorRegistrationGender");
  const emailInput = document.getElementById("vendorRegistrationEmail");
  const designationInput = document.getElementById(
    "vendorRegistrationDesignation"
  );
  const idTypeSelect = document.getElementById("vendorRegistrationIdType");
  const idNumberInput = document.getElementById("vendorRegistrationIdNumber");
  const idFrontInput = document.getElementById("vendorIdFront");
  const idBackInput = document.getElementById("vendorIdBack");
  const step1Form = document.getElementById("vendorRegistrationFormStep1");
  const step1Container = document.getElementById("vendorRegistrationStep1");
  const step2Container = document.getElementById("vendorRegistrationStep2");
  const steps = document.querySelectorAll(".vendorRegistrationStep");

  // STEP 2 inputs
  const houseInput = document.getElementById("vendorAddressHouse");
  const areaInput = document.getElementById("vendorAddressArea");
  const landmarkInput = document.getElementById("vendorAddressLandmark");
  const cityInput = document.getElementById("vendorAddressCity");
  const zipcodeInput = document.getElementById("vendorAddressZipcode");
  const stateInput = document.getElementById("vendorAddressState");

  // STEP 3 inputs
  const businessNameInput = document.getElementById("vendorBusinessName");
  const businessMobileInput = document.getElementById("vendorBusinessMobile");
  const businessEmailInput = document.getElementById("vendorBusinessEmail");
  const businessGstInput = document.getElementById("vendorBusinessGST");

  // STEP 4 inputs
  const shippingHouseInput = document.getElementById("shippingHouse");
  const shippingAreaInput = document.getElementById("shippingArea");
  const shippingLandmarkInput = document.getElementById("shippingLandmark");
  const shippingCityInput = document.getElementById("shippingCity");
  const shippingZipcodeInput = document.getElementById("shippingZipcode");
  const shippingStateInput = document.getElementById("shippingState");
  const shippingSameCheckbox = document.getElementById(
    "shippingSameAsPermanent"
  );

  // STEP 5 inputs
  const bankNameInput = document.getElementById("vendorBankName");
  const bankBranchInput = document.getElementById("vendorBankBranch");
  const bankHolderInput = document.getElementById("vendorBankAccountHolder");
  const bankAccountInput = document.getElementById("vendorBankAccountNumber");
  const bankIfscInput = document.getElementById("vendorBankIFSC");
  const bankTermsCheckbox = document.getElementById("vendorBankTerms");

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
    if (!/^[A-Za-z0-9@._-]+$/.test(value)) {
      error = "Email can contain only letters, numbers, @ . - _";
    } else if (/^[.@_-]/.test(value) || /[.@_-]$/.test(value)) {
      error = "Email cannot start or end with a special character";
    } else if (!value.includes("@") || !value.includes(".")) {
      error = "Email must contain @ and .";
    } else if (value.includes("..")) {
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
      "End",
    ];

    if (controlKeys.includes(key) || e.ctrlKey || e.metaKey) return;

    if (!isLetter && !isSpace) {
      e.preventDefault();
      return;
    }

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

  designationInput.addEventListener("input", function () {
    let v = this.value;

    v = v.replace(/[^A-Za-z\s]/g, ""); // only alphabets + spaces
    v = v.replace(/^\s+/, ""); // no leading space
    v = v.replace(/\s{2,}/g, " "); // no double spaces

    this.value = v;
  });

  // Validate Select Identity Proof (dropdown)
  function validateIdType() {
    if (idTypeSelect.value.trim() === "") {
      showError(
        idTypeSelect,
        "vendorRegistrationIdTypeError",
        "Please select identity proof"
      );
      return false;
    } else {
      clearError(idTypeSelect, "vendorRegistrationIdTypeError");
      return true;
    }
  }

  // Validate Mention Identity Number based on selected ID type
  function validateIdNumber() {
    let value = idNumberInput.value.replace(/\s+/g, "");
    const idType = idTypeSelect.value;
    let error = "";

    value = value.toUpperCase();
    idNumberInput.value = value; // show formatted value

    if (!value) {
      error = "Please enter identity number";
    } else if (idType === "Aadhar-Card") {
      // Aadhar: exactly 12 digits
      if (!/^\d{12}$/.test(value)) {
        error = "Aadhar number must be exactly 12 digits";
      }
    } else if (idType === "pan") {
      // PAN: 5 letters, 4 digits, 1 letter (e.g. ABCDE1234F)
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value)) {
        error = "Please enter a valid PAN (e.g. ABCDE1234F)";
      }
    } else if (idType === "voter") {
      // Voter ID: 3 letters + 7 digits (e.g. ABC1234567)
      if (!/^[A-Z]{3}[0-9]{7}$/.test(value)) {
        error =
          "Please enter a valid Voter ID (3 letters followed by 7 digits)";
      }
    } else if (idType === "passport") {
      // Passport: 1 letter + 7 digits (e.g. A1234567)
      if (!/^[A-Z][0-9]{7}$/.test(value)) {
        error =
          "Please enter a valid Passport number (1 letter followed by 7 digits)";
      }
    }

    if (error) {
      showError(idNumberInput, "vendorRegistrationIdNumberError", error);
      return false;
    } else {
      clearError(idNumberInput, "vendorRegistrationIdNumberError");
      return true;
    }
  }

  // Validate Identity Proof upload (front + back)
  function validateIdUpload() {
    const front = idFrontInput.files.length;
    const back = idBackInput.files.length;
    const errorSpan = document.getElementById("vendorIdUploadError");

    if (front === 0 || back === 0) {
      errorSpan.textContent =
        "Please upload both front and back of identity proof";
      errorSpan.style.display = "block";
      return false;
    } else {
      errorSpan.textContent = "";
      errorSpan.style.display = "none";
      return true;
    }
  }

  fullNameInput.addEventListener("blur", validateName);
  mobileInput.addEventListener("blur", validateMobile);
  emailInput.addEventListener("blur", validateEmail);
  genderSelect.addEventListener("change", validateGender);
  genderSelect.addEventListener("blur", validateGender);

  idTypeSelect.addEventListener("change", function () {
    validateIdType();
    // re-validate number when ID type changes (e.g., switch to Aadhar)
    if (idNumberInput.value.trim() !== "") {
      validateIdNumber();
    }
  });
  idNumberInput.addEventListener("blur", validateIdNumber);
  idFrontInput.addEventListener("change", validateIdUpload);
  idBackInput.addEventListener("change", validateIdUpload);

  // STEP 1 submit -> validation -> STEP 2
  step1Form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isGenderValid = validateGender();
    const isMobileValid = validateMobile();
    const isIdTypeValid = validateIdType();
    const isIdNumberValid = validateIdNumber();
    const isIdUploadValid = validateIdUpload();

    if (
      isNameValid &&
      isEmailValid &&
      isGenderValid &&
      isMobileValid &&
      isIdTypeValid &&
      isIdNumberValid &&
      isIdUploadValid
    ) {
      step1Container.style.display = "none";
      step2Container.style.display = "block";
      setStep(1);
    }
  });

  // Validatation for 2nd Step
  houseInput.addEventListener("keydown", function (e) {
    const key = e.key;
    const controlKeys = [
      "Backspace",
      "Tab",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];

    const allowedSpecials = ["@", "#", "*", ".", ",", "-", "_", "+", " "];
    const isLetter = /^[A-Za-z]$/.test(key);
    const isDigit = /^[0-9]$/.test(key);

    if (controlKeys.includes(key) || e.ctrlKey || e.metaKey) return;

    if (!isLetter && !isDigit && !allowedSpecials.includes(key)) {
      e.preventDefault();
    }
  });

  houseInput.addEventListener("input", function () {
    // keep only allowed chars
    this.value = this.value.replace(/[^A-Za-z0-9@#*.,\-_\+ ]/g, "");
  });

  // AREA / LANE - allowed: letters, digits, space, , . - _
  areaInput.addEventListener("keydown", function (e) {
    const key = e.key;
    const controlKeys = [
      "Backspace",
      "Tab",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];

    const allowedSpecials = [",", ".", "-", "_", " "];
    const isLetter = /^[A-Za-z]$/.test(key);
    const isDigit = /^[0-9]$/.test(key);

    if (controlKeys.includes(key) || e.ctrlKey || e.metaKey) return;

    if (!isLetter && !isDigit && !allowedSpecials.includes(key)) {
      e.preventDefault();
    }
  });

  areaInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^A-Za-z0-9,.\-_ ]/g, "");
  });

  // LANDMARK - only alphabets + space (optional field)
  landmarkInput.addEventListener("keydown", function (e) {
    const key = e.key;
    const controlKeys = [
      "Backspace",
      "Tab",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];
    const isLetter = /^[A-Za-z]$/.test(key);
    const isSpace = key === " ";

    if (controlKeys.includes(key) || e.ctrlKey || e.metaKey) return;

    if (!isLetter && !isSpace) {
      e.preventDefault();
    }
  });

  landmarkInput.addEventListener("input", function () {
    let v = this.value;
    v = v.replace(/[^A-Za-z\s]/g, ""); // only letters + spaces
    v = v.replace(/\s{2,}/g, " "); // no double spaces
    this.value = v;
  });

  // CITY - only alphabets + space
  cityInput.addEventListener("keydown", function (e) {
    const key = e.key;
    const controlKeys = [
      "Backspace",
      "Tab",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];
    const isLetter = /^[A-Za-z]$/.test(key);
    const isSpace = key === " ";

    if (controlKeys.includes(key) || e.ctrlKey || e.metaKey) return;

    if (!isLetter && !isSpace) {
      e.preventDefault();
    }
  });

  cityInput.addEventListener("input", function () {
    let v = this.value;
    v = v.replace(/[^A-Za-z\s]/g, "");
    v = v.replace(/\s{2,}/g, " ");
    this.value = v;
  });

  // PINCODE - only digits, max 6
  zipcodeInput.addEventListener("keydown", function (e) {
    const key = e.key;
    const controlKeys = [
      "Backspace",
      "Tab",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];
    const isDigit = /^[0-9]$/.test(key);

    if (controlKeys.includes(key) || e.ctrlKey || e.metaKey) return;

    if (!isDigit) {
      e.preventDefault();
      return;
    }

    // prevent typing more than 6 digits
    if (this.value.length >= 6 && this.selectionStart === this.selectionEnd) {
      e.preventDefault();
    }
  });

  zipcodeInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 6);
  });
  // STATE - only alphabets + space
  stateInput.addEventListener("keydown", function (e) {
    const key = e.key;
    const controlKeys = [
      "Backspace",
      "Tab",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];
    const isLetter = /^[A-Za-z]$/.test(key);
    const isSpace = key === " ";

    if (controlKeys.includes(key) || e.ctrlKey || e.metaKey) return;

    if (!isLetter && !isSpace) {
      e.preventDefault();
    }
  });

  stateInput.addEventListener("input", function () {
    let v = this.value;
    v = v.replace(/[^A-Za-z\s]/g, "");
    v = v.replace(/\s{2,}/g, " ");
    this.value = v;
  });

  // STEP 2 VALIDATION FUNCTIONS

  function validateHouse() {
    const value = houseInput.value.trim();
    let error = "";

    if (!value) {
      error = "Please enter house/society";
    } else if (!/^[A-Za-z0-9@#*.,\-_\+ ]+$/.test(value)) {
      error = "Only letters, numbers and @ # * . , - _ + are allowed";
    }

    if (error) {
      document.getElementById("vendorAddressHouseError").textContent = error;
      document.getElementById("vendorAddressHouseError").style.display =
        "block";
      houseInput.classList.add("error");
      return false;
    } else {
      document.getElementById("vendorAddressHouseError").textContent = "";
      document.getElementById("vendorAddressHouseError").style.display = "none";
      houseInput.classList.remove("error");
      return true;
    }
  }

  function validateArea() {
    const value = areaInput.value.trim();
    let error = "";

    if (!value) {
      error = "Please enter area/lane";
    } else if (!/^[A-Za-z0-9,.\-_ ]+$/.test(value)) {
      error = "Only letters, numbers, comma, period, - and _ are allowed";
    }

    if (error) {
      document.getElementById("vendorAddressAreaError").textContent = error;
      document.getElementById("vendorAddressAreaError").style.display = "block";
      areaInput.classList.add("error");
      return false;
    } else {
      document.getElementById("vendorAddressAreaError").textContent = "";
      document.getElementById("vendorAddressAreaError").style.display = "none";
      areaInput.classList.remove("error");
      return true;
    }
  }

  function validateCity() {
    const value = cityInput.value.trim();
    let error = "";

    if (!value) {
      error = "Please enter city";
    } else if (!/^[A-Za-z\s]+$/.test(value)) {
      error = "City should contain only alphabets";
    }

    if (error) {
      document.getElementById("vendorAddressCityError").textContent = error;
      document.getElementById("vendorAddressCityError").style.display = "block";
      cityInput.classList.add("error");
      return false;
    } else {
      document.getElementById("vendorAddressCityError").textContent = "";
      document.getElementById("vendorAddressCityError").style.display = "none";
      cityInput.classList.remove("error");
      return true;
    }
  }

  function validateZipcode() {
    const value = zipcodeInput.value.trim();
    let error = "";

    if (!value) {
      error = "Please enter zipcode";
    } else if (!/^\d{6}$/.test(value)) {
      error = "Zipcode must be 6 digits";
    }

    if (error) {
      document.getElementById("vendorAddressZipcodeError").textContent = error;
      document.getElementById("vendorAddressZipcodeError").style.display =
        "block";
      zipcodeInput.classList.add("error");
      return false;
    } else {
      document.getElementById("vendorAddressZipcodeError").textContent = "";
      document.getElementById("vendorAddressZipcodeError").style.display =
        "none";
      zipcodeInput.classList.remove("error");
      return true;
    }
  }

  function validateState() {
    const value = stateInput.value.trim();
    let error = "";

    if (!value) {
      error = "Please enter state";
    } else if (!/^[A-Za-z\s]+$/.test(value)) {
      error = "State should contain only alphabets";
    }

    if (error) {
      document.getElementById("vendorAddressStateError").textContent = error;
      document.getElementById("vendorAddressStateError").style.display =
        "block";
      stateInput.classList.add("error");
      return false;
    } else {
      document.getElementById("vendorAddressStateError").textContent = "";
      document.getElementById("vendorAddressStateError").style.display = "none";
      stateInput.classList.remove("error");
      return true;
    }
  }

  // MAIN STEP 2 VALIDATION (for Continue button)
  function validateStep2() {
    const h = validateHouse();
    const a = validateArea();
    const c = validateCity();
    const z = validateZipcode();
    const s = validateState();

    return h && a && c && z && s;
  }

  // STEP 2 blur validations
  houseInput.addEventListener("blur", validateHouse);
  areaInput.addEventListener("blur", validateArea);
  cityInput.addEventListener("blur", validateCity);
  zipcodeInput.addEventListener("blur", validateZipcode);
  stateInput.addEventListener("blur", validateState);

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
  // STEP 2 Previous -> go back to Personal Details (Step 1)
  document
    .getElementById("vendorRegistrationStep2Previous")
    .addEventListener("click", function () {
      step2Container.style.display = "none";
      step1Container.style.display = "block";
      setStep(0); // highlight first dot as active
    });

  // STEP 3 VALIDATION
  // BUSINESS NAME - only alphabets + spaces
  businessNameInput.addEventListener("keydown", function (e) {
    const key = e.key;
    const controlKeys = [
      "Backspace",
      "Tab",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];
    const isLetter = /^[A-Za-z]$/.test(key);
    const isSpace = key === " ";

    if (controlKeys.includes(key) || e.ctrlKey || e.metaKey) return;

    if (!isLetter && !isSpace) {
      e.preventDefault();
      return;
    }

    // no leading or double spaces
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

  businessNameInput.addEventListener("input", function () {
    let v = this.value;
    v = v.replace(/[^A-Za-z\s]/g, "");
    v = v.replace(/^\s+/, "");
    v = v.replace(/\s{2,}/g, " ");
    this.value = v;
  });
  // BUSINESS MOBILE - only digits from keyboard
  businessMobileInput.addEventListener("keydown", function (e) {
    const key = e.key;
    const controlKeys = [
      "Backspace",
      "Tab",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];
    const isDigit = /^[0-9]$/.test(key);

    if (controlKeys.includes(key) || e.ctrlKey || e.metaKey) return;

    if (!isDigit) {
      e.preventDefault();
      return;
    }
  });

  businessMobileInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 10);
  });

  businessEmailInput.addEventListener("keydown", function (e) {
    const key = e.key;
    const controlKeys = [
      "Backspace",
      "Tab",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];
    const isLetter = /^[A-Za-z]$/.test(key);
    const isDigit = /^[0-9]$/.test(key);
    const allowedSpecials = ["@", ".", "-", "_"];

    if (controlKeys.includes(key) || e.ctrlKey || e.metaKey) return;

    if (!isLetter && !isDigit && !allowedSpecials.includes(key)) {
      e.preventDefault();
      return;
    }
  });

  businessEmailInput.addEventListener("input", function () {
    let v = this.value;

    v = v.replace(/[^A-Za-z0-9@._-]/g, "");
    this.value = v;
  });

  businessGstInput.addEventListener("keydown", function (e) {
    const key = e.key;
    const controlKeys = [
      "Backspace",
      "Tab",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];
    const isLetter = /^[A-Za-z]$/.test(key);
    const isDigit = /^[0-9]$/.test(key);

    if (controlKeys.includes(key) || e.ctrlKey || e.metaKey) return;

    if (!isLetter && !isDigit) {
      e.preventDefault();
      return;
    }
  });

businessGstInput.addEventListener("input", function () {
  let v = this.value;
  v = v.replace(/[^A-Za-z0-9]/g, ""); 
  v = v.toUpperCase();               
  v = v.slice(0, 15);                
  this.value = v;
});


  // STEP 3 VALIDATION

  function validateBusinessName() {
    const value = businessNameInput.value.trim();
    let error = "";

    if (!value) {
      error = "Please enter business name";
    } else if (!/^[A-Za-z\s]+$/.test(value)) {
      error = "Business name should contain only alphabets";
    }

    if (error) {
      showError(businessNameInput, "vendorBusinessNameError", error);
      return false;
    } else {
      clearError(businessNameInput, "vendorBusinessNameError");
      return true;
    }
  }

  function validateBusinessMobile() {
    let value = businessMobileInput.value.replace(/\D/g, "");
    businessMobileInput.value = value;

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
      showError(businessMobileInput, "vendorBusinessMobileError", error);
      return false;
    } else {
      clearError(businessMobileInput, "vendorBusinessMobileError");
      return true;
    }
  }

  function validateBusinessEmail() {
    let value = businessEmailInput.value.trim();
    let error = "";

    if (!value) {
      error = "Please enter email address";
    } else if (!/^[A-Za-z0-9@._-]+$/.test(value)) {
      error = "Email can contain only letters, numbers, @ . - _";
    } else if (/^[.@_-]/.test(value) || /[.@_-]$/.test(value)) {
      error = "Email cannot start or end with a special character";
    } else if (!value.includes("@") || !value.includes(".")) {
      error = "Email must contain @ and .";
    } else if (value.includes("..")) {
      error = "Periods cannot appear consecutively";
    }

    if (error) {
      showError(businessEmailInput, "vendorBusinessEmailError", error);
      return false;
    } else {
      clearError(businessEmailInput, "vendorBusinessEmailError");
      return true;
    }
  }

function validateBusinessGST() {
  const value = businessGstInput.value.trim().toUpperCase();
  businessGstInput.value = value;

  // GST FORMAT:
  const gstRegex = /^[0-9]{2}[A-Z0-9]{10}[A-Z0-9]Z[A-Z0-9]$/;

  let error = "";

  if (!value) {
    error = "Please enter GST number";
  } else if (!gstRegex.test(value)) {
    error =
      "GST must be 15 characters";
  }

  if (error) {
    showError(businessGstInput, "vendorBusinessGSTError", error);
    return false;
  } else {
    clearError(businessGstInput, "vendorBusinessGSTError");
    return true;
  }
}


  // MAIN STEP 3 VALIDATION (for Continue button)
  function validateStep3() {
    const b = validateBusinessName();
    const m = validateBusinessMobile();
    const e = validateBusinessEmail();
    const g = validateBusinessGST();

    return b && m && e && g;
  }

  // STEP 3 blur validations
  businessNameInput.addEventListener("blur", validateBusinessName);
  businessMobileInput.addEventListener("blur", validateBusinessMobile);
  businessEmailInput.addEventListener("blur", validateBusinessEmail);
  businessGstInput.addEventListener("blur", validateBusinessGST);

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

  // STEP 3 Previous -> go back to Step 2
  document
    .getElementById("vendorRegistrationStep3Previous")
    .addEventListener("click", function () {
      document.getElementById("vendorRegistrationStep3").style.display = "none";
      document.getElementById("vendorRegistrationStep2").style.display =
        "block";
      setStep(1); // step index for Step 2
    });

  // STEP 4 VALIDATION

  shippingHouseInput.addEventListener("keydown", function (e) {
    const key = e.key;
    const controlKeys = [
      "Backspace",
      "Tab",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];

    const allowedSpecials = ["@", "#", "*", ".", ",", "-", "_", "+", " "];
    const isLetter = /^[A-Za-z]$/.test(key);
    const isDigit = /^[0-9]$/.test(key);

    if (controlKeys.includes(key) || e.ctrlKey || e.metaKey) return;

    if (!isLetter && !isDigit && !allowedSpecials.includes(key)) {
      e.preventDefault();
    }
  });

  shippingHouseInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^A-Za-z0-9@#*.,\-_\+ ]/g, "");
  });

  shippingAreaInput.addEventListener("keydown", function (e) {
    const key = e.key;
    const controlKeys = [
      "Backspace",
      "Tab",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];

    const allowedSpecials = [",", ".", "-", "_", " "];
    const isLetter = /^[A-Za-z]$/.test(key);
    const isDigit = /^[0-9]$/.test(key);

    if (controlKeys.includes(key) || e.ctrlKey || e.metaKey) return;

    if (!isLetter && !isDigit && !allowedSpecials.includes(key)) {
      e.preventDefault();
    }
  });

  shippingAreaInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^A-Za-z0-9,.\-_ ]/g, "");
  });

  shippingLandmarkInput.addEventListener("keydown", function (e) {
    const key = e.key;
    const controlKeys = [
      "Backspace",
      "Tab",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];
    const isLetter = /^[A-Za-z]$/.test(key);
    const isSpace = key === " ";

    if (controlKeys.includes(key) || e.ctrlKey || e.metaKey) return;

    if (!isLetter && !isSpace) {
      e.preventDefault();
    }
  });

  shippingLandmarkInput.addEventListener("input", function () {
    let v = this.value;
    v = v.replace(/[^A-Za-z\s]/g, "");
    v = v.replace(/\s{2,}/g, " ");
    this.value = v;
  });

  // CITY - only alphabets + spaces
  shippingCityInput.addEventListener("keydown", function (e) {
    const key = e.key;
    const controlKeys = [
      "Backspace",
      "Tab",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];
    const isLetter = /^[A-Za-z]$/.test(key);
    const isSpace = key === " ";

    if (controlKeys.includes(key) || e.ctrlKey || e.metaKey) return;

    if (!isLetter && !isSpace) {
      e.preventDefault();
    }
  });

  shippingCityInput.addEventListener("input", function () {
    let v = this.value;
    v = v.replace(/[^A-Za-z\s]/g, "");
    v = v.replace(/\s{2,}/g, " ");
    this.value = v;
  });

  // PINCODE - only 6 digits
  shippingZipcodeInput.addEventListener("keydown", function (e) {
    const key = e.key;
    const controlKeys = [
      "Backspace",
      "Tab",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];
    const isDigit = /^[0-9]$/.test(key);

    if (controlKeys.includes(key) || e.ctrlKey || e.metaKey) return;

    if (!isDigit) {
      e.preventDefault();
      return;
    }

    if (this.value.length >= 6 && this.selectionStart === this.selectionEnd) {
      e.preventDefault();
    }
  });

  shippingZipcodeInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 6);
  });

  // STATE - only alphabets + spaces
  shippingStateInput.addEventListener("keydown", function (e) {
    const key = e.key;
    const controlKeys = [
      "Backspace",
      "Tab",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];
    const isLetter = /^[A-Za-z]$/.test(key);
    const isSpace = key === " ";

    if (controlKeys.includes(key) || e.ctrlKey || e.metaKey) return;

    if (!isLetter && !isSpace) {
      e.preventDefault();
    }
  });

  shippingStateInput.addEventListener("input", function () {
    let v = this.value;
    v = v.replace(/[^A-Za-z\s]/g, "");
    v = v.replace(/\s{2,}/g, " ");
    this.value = v;
  });

  // ---------- VALIDATION FUNCTIONS (for errors) ----------

  function validateShippingHouse() {
    if (shippingSameCheckbox.checked) {
      document.getElementById("shippingHouseError").textContent = "";
      document.getElementById("shippingHouseError").style.display = "none";
      shippingHouseInput.classList.remove("error");
      return true;
    }

    const value = shippingHouseInput.value.trim();
    let error = "";

    if (!value) {
      error = "Please enter house/society";
    } else if (!/^[A-Za-z0-9@#*.,\-_\+ ]+$/.test(value)) {
      error = "Only letters, numbers and @ # * . , - _ + are allowed";
    }

    if (error) {
      document.getElementById("shippingHouseError").textContent = error;
      document.getElementById("shippingHouseError").style.display = "block";
      shippingHouseInput.classList.add("error");
      return false;
    } else {
      document.getElementById("shippingHouseError").textContent = "";
      document.getElementById("shippingHouseError").style.display = "none";
      shippingHouseInput.classList.remove("error");
      return true;
    }
  }

  function validateShippingArea() {
    if (shippingSameCheckbox.checked) {
      document.getElementById("shippingAreaError").textContent = "";
      document.getElementById("shippingAreaError").style.display = "none";
      shippingAreaInput.classList.remove("error");
      return true;
    }

    const value = shippingAreaInput.value.trim();
    let error = "";

    if (!value) {
      error = "Please enter area/lane";
    } else if (!/^[A-Za-z0-9,.\-_ ]+$/.test(value)) {
      error = "Only letters, numbers, comma, period, - and _ are allowed";
    }

    if (error) {
      document.getElementById("shippingAreaError").textContent = error;
      document.getElementById("shippingAreaError").style.display = "block";
      shippingAreaInput.classList.add("error");
      return false;
    } else {
      document.getElementById("shippingAreaError").textContent = "";
      document.getElementById("shippingAreaError").style.display = "none";
      shippingAreaInput.classList.remove("error");
      return true;
    }
  }

  function validateShippingCity() {
    if (shippingSameCheckbox.checked) {
      document.getElementById("shippingCityError").textContent = "";
      document.getElementById("shippingCityError").style.display = "none";
      shippingCityInput.classList.remove("error");
      return true;
    }

    const value = shippingCityInput.value.trim();
    let error = "";

    if (!value) {
      error = "Please enter city";
    } else if (!/^[A-Za-z\s]+$/.test(value)) {
      error = "City should contain only alphabets";
    }

    if (error) {
      document.getElementById("shippingCityError").textContent = error;
      document.getElementById("shippingCityError").style.display = "block";
      shippingCityInput.classList.add("error");
      return false;
    } else {
      document.getElementById("shippingCityError").textContent = "";
      document.getElementById("shippingCityError").style.display = "none";
      shippingCityInput.classList.remove("error");
      return true;
    }
  }

  function validateShippingZipcode() {
    if (shippingSameCheckbox.checked) {
      document.getElementById("shippingZipcodeError").textContent = "";
      document.getElementById("shippingZipcodeError").style.display = "none";
      shippingZipcodeInput.classList.remove("error");
      return true;
    }

    const value = shippingZipcodeInput.value.trim();
    let error = "";

    if (!value) {
      error = "Please enter zipcode";
    } else if (!/^\d{6}$/.test(value)) {
      error = "Zipcode must be 6 digits";
    }

    if (error) {
      document.getElementById("shippingZipcodeError").textContent = error;
      document.getElementById("shippingZipcodeError").style.display = "block";
      shippingZipcodeInput.classList.add("error");
      return false;
    } else {
      document.getElementById("shippingZipcodeError").textContent = "";
      document.getElementById("shippingZipcodeError").style.display = "none";
      shippingZipcodeInput.classList.remove("error");
      return true;
    }
  }

  function validateShippingState() {
    if (shippingSameCheckbox.checked) {
      document.getElementById("shippingStateError").textContent = "";
      document.getElementById("shippingStateError").style.display = "none";
      shippingStateInput.classList.remove("error");
      return true;
    }

    const value = shippingStateInput.value.trim();
    let error = "";

    if (!value) {
      error = "Please enter state";
    } else if (!/^[A-Za-z\s]+$/.test(value)) {
      error = "State should contain only alphabets";
    }

    if (error) {
      document.getElementById("shippingStateError").textContent = error;
      document.getElementById("shippingStateError").style.display = "block";
      shippingStateInput.classList.add("error");
      return false;
    } else {
      document.getElementById("shippingStateError").textContent = "";
      document.getElementById("shippingStateError").style.display = "none";
      shippingStateInput.classList.remove("error");
      return true;
    }
  }

  // MAIN STEP 4 VALIDATION (for Continue button)
  function validateStep4() {
    // If "Same as permanent address" is checked, just clear errors & allow
    if (shippingSameCheckbox.checked) {
      validateShippingHouse();
      validateShippingArea();
      validateShippingCity();
      validateShippingZipcode();
      validateShippingState();
      return true;
    }

    const h = validateShippingHouse();
    const a = validateShippingArea();
    const c = validateShippingCity();
    const z = validateShippingZipcode();
    const s = validateShippingState();

    return h && a && c && z && s;
  }

// ---------- CHECKBOX: Same as permanent address ----------

shippingSameCheckbox.addEventListener("change", function () {
  if (this.checked) {
    // Copy from permanent (Step 2) to shipping (Step 4)
    shippingHouseInput.value = houseInput.value;
    shippingAreaInput.value = areaInput.value;
    shippingLandmarkInput.value = landmarkInput.value;
    shippingCityInput.value = cityInput.value;
    shippingZipcodeInput.value = zipcodeInput.value;
    shippingStateInput.value = stateInput.value;

    // Disable all shipping inputs so user cannot edit
    shippingHouseInput.disabled = true;
    shippingAreaInput.disabled = true;
    shippingLandmarkInput.disabled = true;
    shippingCityInput.disabled = true;
    shippingZipcodeInput.disabled = true;
    shippingStateInput.disabled = true;

    // Clear any previous shipping errors
    document.getElementById("shippingHouseError").textContent = "";
    document.getElementById("shippingHouseError").style.display = "none";
    document.getElementById("shippingAreaError").textContent = "";
    document.getElementById("shippingAreaError").style.display = "none";
    document.getElementById("shippingCityError").textContent = "";
    document.getElementById("shippingCityError").style.display = "none";
    document.getElementById("shippingZipcodeError").textContent = "";
    document.getElementById("shippingZipcodeError").style.display = "none";
    document.getElementById("shippingStateError").textContent = "";
    document.getElementById("shippingStateError").style.display = "none";

    shippingHouseInput.classList.remove("error");
    shippingAreaInput.classList.remove("error");
    shippingCityInput.classList.remove("error");
    shippingZipcodeInput.classList.remove("error");
    shippingStateInput.classList.remove("error");
  } else {
    // Unchecked → clear the autofilled data
    shippingHouseInput.value = "";
    shippingAreaInput.value = "";
    shippingLandmarkInput.value = "";
    shippingCityInput.value = "";
    shippingZipcodeInput.value = "";
    shippingStateInput.value = "";

    // Enable all shipping inputs again
    shippingHouseInput.disabled = false;
    shippingAreaInput.disabled = false;
    shippingLandmarkInput.disabled = false;
    shippingCityInput.disabled = false;
    shippingZipcodeInput.disabled = false;
    shippingStateInput.disabled = false;

    // Also clear any errors
    document.getElementById("shippingHouseError").textContent = "";
    document.getElementById("shippingHouseError").style.display = "none";
    document.getElementById("shippingAreaError").textContent = "";
    document.getElementById("shippingAreaError").style.display = "none";
    document.getElementById("shippingCityError").textContent = "";
    document.getElementById("shippingCityError").style.display = "none";
    document.getElementById("shippingZipcodeError").textContent = "";
    document.getElementById("shippingZipcodeError").style.display = "none";
    document.getElementById("shippingStateError").textContent = "";
    document.getElementById("shippingStateError").style.display = "none";

    shippingHouseInput.classList.remove("error");
    shippingAreaInput.classList.remove("error");
    shippingCityInput.classList.remove("error");
    shippingZipcodeInput.classList.remove("error");
    shippingStateInput.classList.remove("error");
  }
});


  // ---------- BLUR VALIDATIONS (show error when leaving field) ----------

  shippingHouseInput.addEventListener("blur", validateShippingHouse);
  shippingAreaInput.addEventListener("blur", validateShippingArea);
  shippingCityInput.addEventListener("blur", validateShippingCity);
  shippingZipcodeInput.addEventListener("blur", validateShippingZipcode);
  shippingStateInput.addEventListener("blur", validateShippingState);

  // ---------- STEP 4 -> STEP 5 (Continue button) ----------

  document
    .getElementById("vendorRegistrationStep4Continue")
    .addEventListener("click", function () {
      if (!validateStep4()) return;

      document.getElementById("vendorRegistrationStep4").style.display = "none";
      document.getElementById("vendorRegistrationStep5").style.display =
        "block";

      setStep(4);
    });
  // STEP 4 Previous -> go back to Step 3
  document
    .getElementById("vendorRegistrationStep4Previous")
    .addEventListener("click", function () {
      document.getElementById("vendorRegistrationStep4").style.display = "none";
      document.getElementById("vendorRegistrationStep3").style.display =
        "block";
      setStep(2); // step index for Step 3
    });

  // STEP 5 VALIDATION

  // BANK NAME / BRANCH / ACCOUNT HOLDER - only alphabets + spaces, no leading space
  function alphaWithSpaceKeydown(e) {
    const key = e.key;
    const controlKeys = [
      "Backspace",
      "Tab",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];
    const isLetter = /^[A-Za-z]$/.test(key);
    const isSpace = key === " ";

    if (controlKeys.includes(key) || e.ctrlKey || e.metaKey) return;

    if (!isLetter && !isSpace) {
      e.preventDefault();
      return;
    }

    // no leading or double spaces
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
  }

  function alphaWithSpaceInput(e) {
    let v = this.value;
    v = v.replace(/[^A-Za-z\s]/g, "");
    v = v.replace(/^\s+/, "");
    v = v.replace(/\s{2,}/g, " ");
    this.value = v;
  }

  bankNameInput.addEventListener("keydown", alphaWithSpaceKeydown);
  bankNameInput.addEventListener("input", alphaWithSpaceInput);

  bankBranchInput.addEventListener("keydown", alphaWithSpaceKeydown);
  bankBranchInput.addEventListener("input", alphaWithSpaceInput);

  bankHolderInput.addEventListener("keydown", alphaWithSpaceKeydown);
  bankHolderInput.addEventListener("input", alphaWithSpaceInput);

  // ACCOUNT NUMBER - only digits from keyboard
  bankAccountInput.addEventListener("keydown", function (e) {
    const key = e.key;
    const controlKeys = [
      "Backspace",
      "Tab",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];
    const isDigit = /^[0-9]$/.test(key);

    if (controlKeys.includes(key) || e.ctrlKey || e.metaKey) return;

    if (!isDigit) {
      e.preventDefault();
      return;
    }
  });

  bankAccountInput.addEventListener("input", function () {
    // keep only digits, you can keep 9–18 like earlier or just digits
    this.value = this.value.replace(/\D/g, "");
  });

  // IFSC - only alphabets + numbers
  bankIfscInput.addEventListener("keydown", function (e) {
    const key = e.key;
    const controlKeys = [
      "Backspace",
      "Tab",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];
    const isLetter = /^[A-Za-z]$/.test(key);
    const isDigit = /^[0-9]$/.test(key);

    if (controlKeys.includes(key) || e.ctrlKey || e.metaKey) return;

    if (!isLetter && !isDigit) {
      e.preventDefault();
      return;
    }
  });

  bankIfscInput.addEventListener("input", function () {
    let v = this.value;
    v = v.replace(/[^A-Za-z0-9]/g, ""); // only alphanumeric
    this.value = v.toUpperCase();
  });

  // STEP 5 VALIDATION

  function validateBankName() {
    const value = bankNameInput.value.trim();
    let error = "";

    if (!value) {
      error = "Please enter bank name";
    } else if (!/^[A-Za-z\s]+$/.test(value)) {
      error = "Bank name should contain only alphabets";
    }

    if (error) {
      showError(bankNameInput, "vendorBankNameError", error);
      return false;
    } else {
      clearError(bankNameInput, "vendorBankNameError");
      return true;
    }
  }

  function validateBankBranch() {
    const value = bankBranchInput.value.trim();
    let error = "";

    if (!value) {
      error = "Please enter branch name";
    } else if (!/^[A-Za-z\s]+$/.test(value)) {
      error = "Branch name should contain only alphabets";
    }

    if (error) {
      showError(bankBranchInput, "vendorBankBranchError", error);
      return false;
    } else {
      clearError(bankBranchInput, "vendorBankBranchError");
      return true;
    }
  }

  function validateBankHolder() {
    const value = bankHolderInput.value.trim();
    let error = "";

    if (!value) {
      error = "Please enter account holder name";
    } else if (!/^[A-Za-z\s]+$/.test(value)) {
      error = "Account holder name should contain only alphabets";
    }

    if (error) {
      showError(bankHolderInput, "vendorBankAccountHolderError", error);
      return false;
    } else {
      clearError(bankHolderInput, "vendorBankAccountHolderError");
      return true;
    }
  }

  function validateBankAccount() {
    let value = bankAccountInput.value.replace(/\D/g, "");
    bankAccountInput.value = value;

    let error = "";

    if (!value) {
      error = "Please enter account number";
    } else if (!/^\d+$/.test(value)) {
      error = "Account number should contain only digits";
    } else if (value.length < 9 || value.length > 18) {
      // keep your previous 9–18 digit rule
      error = "Account number must be between 9 and 18 digits";
    }

    if (error) {
      showError(bankAccountInput, "vendorBankAccountNumberError", error);
      return false;
    } else {
      clearError(bankAccountInput, "vendorBankAccountNumberError");
      return true;
    }
  }

  function validateBankIFSC() {
    let value = bankIfscInput.value.trim().toUpperCase();
    bankIfscInput.value = value;

    let error = "";

    if (!value) {
      error = "Please enter IFSC code";
    } else if (!/^[A-Za-z0-9]+$/.test(value)) {
      error = "IFSC should contain only letters and numbers";
    }

    if (error) {
      showError(bankIfscInput, "vendorBankIFSCError", error);
      return false;
    } else {
      clearError(bankIfscInput, "vendorBankIFSCError");
      return true;
    }
  }

  function validateBankTerms() {
    const termsError = document.getElementById("vendorBankTermsError");

    if (!bankTermsCheckbox.checked) {
      termsError.textContent = "Please agree to the terms and conditions";
      termsError.style.display = "block";
      return false;
    } else {
      termsError.textContent = "";
      termsError.style.display = "none";
      return true;
    }
  }

  function validateStep5() {
    const n = validateBankName();
    const b = validateBankBranch();
    const h = validateBankHolder();
    const a = validateBankAccount();
    const i = validateBankIFSC();
    const t = validateBankTerms();

    return n && b && h && a && i && t;
  }

  // STEP 5 blur validations
  bankNameInput.addEventListener("blur", validateBankName);
  bankBranchInput.addEventListener("blur", validateBankBranch);
  bankHolderInput.addEventListener("blur", validateBankHolder);
  bankAccountInput.addEventListener("blur", validateBankAccount);
  bankIfscInput.addEventListener("blur", validateBankIFSC);

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

  // STEP 5 Previous -> go back to Step 4
  document
    .getElementById("vendorRegistrationStep5Previous")
    .addEventListener("click", function () {
      document.getElementById("vendorRegistrationStep5").style.display = "none";
      document.getElementById("vendorRegistrationStep4").style.display =
        "block";
      setStep(3); // step index for Step 4
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

    // show timer again when starting
    timerSpan.style.display = "inline-block";
    timerSpan.textContent = "00:30";

    otpTimerInterval = setInterval(() => {
      remaining--;

      const sec = remaining.toString().padStart(2, "0");
      timerSpan.textContent = `00:${sec}`;

      if (remaining <= 0) {
        clearInterval(otpTimerInterval);
        timerSpan.textContent = "00:00";
        resendBtn.disabled = false;

        // hide timer when it finishes
        timerSpan.style.display = "none";
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
