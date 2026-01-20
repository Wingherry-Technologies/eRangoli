// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon=document.querySelector("#hamburger-menu>img");
var mobileBack=document.querySelector(".mobile-back-button");


hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display="none"
    document.querySelector("body").style.overflow="hidden"
    window.scrollTo(0, 0);
    mobileBack.style.display="none"
  }
  else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow="auto";
    document.querySelector(".bottom-nav").style.display="flex";
    mobileBack.style.display="flex"
    
  }
});

const popup = document.getElementById("popup");
  const addNewBtn = document.getElementById("addNewBtn");
  const closeBtn = document.getElementById("closeBtn");
  const submitBtn = document.getElementById("submitBtn");
  const updateBtn = document.getElementById("updateBtn");
  const errorMsg = document.getElementById("errorMsg");
  const bankCards = document.getElementById("bankCards");
  const popupTitle = document.getElementById("popupTitle");

  let editingCard = null;

  addNewBtn.onclick = (e) => {
    e.preventDefault();
    openPopup("add");
  };

  closeBtn.onclick = () => closePopup();

  function openPopup(mode, card = null) {
    popup.style.display = "block";
    errorMsg.textContent = "";

    if (mode === "add") {
      popupTitle.textContent = "Add Bank Details";
      submitBtn.style.display = "inline-block";
      updateBtn.style.display = "none";
      clearFields();
    } else {
      popupTitle.textContent = "Edit Bank Details";
      submitBtn.style.display = "none";
      updateBtn.style.display = "inline-block";
      fillFields(card);
      editingCard = card;
    }
  }

  function closePopup() {
    popup.style.display = "none";
    clearFields();
    editingCard = null;
  }

  function getFormData() {
    return {
      bankName: bankName.value.trim(),
      accountHolder: accountHolder.value.trim(),
      branchName: branchName.value.trim(),
      ifsc: ifsc.value.trim(),
      accountNumber: accountNumber.value.trim(),
      upiId: upiId.value.trim()
    };
  }

  function validate(data) {
    if (Object.values(data).some(v => !v)) {
      return "All fields are mandatory";
    }
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(data.ifsc)) {
      return "Invalid IFSC format";
    }
    if (data.accountNumber.length < 8) {
      return "Account number must be at least 8 digits";
    }
    if (!/^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(data.upiId)) {
      return "Invalid UPI ID";
    }
    return "";
  }

  submitBtn.onclick = () => {
    const data = getFormData();
    const error = validate(data);
    if (error) {
      errorMsg.textContent = error;
      return;
    }

    const maskedAcc = "**** **** **** " + data.accountNumber.slice(-4);

    const card = document.createElement("div");
    card.className = "bank-card";
    card.innerHTML = `
      <span class="edit-btn"><img src="../assets/vendorpersonaldetails/PencilSimple.svg"/></span>
      <p>${data.bankName}</p>
      <p>${data.accountHolder}</p>
      <p>${data.branchName}</p>
      <p>(IFSC: ${data.ifsc})</p>
      <p>Account: ${maskedAcc}</p>
      <p>UPI ID: ${data.upiId}</p>
    `;

    card.querySelector(".edit-btn").onclick = () => openPopup("edit", card);

    bankCards.appendChild(card);
    addNewBtn.style.display = "none";
    closePopup();
  };

  updateBtn.onclick = () => {
    const data = getFormData();
    const error = validate(data);
    if (error) {
      errorMsg.textContent = error;
      return;
    }

    const maskedAcc = "**** **** **** " + data.accountNumber.slice(-4);

    editingCard.innerHTML = `
      <span class="edit-btn"><img src="../assets/vendorpersonaldetails/PencilSimple.svg"/></span>
      <p>${data.bankName}</p>
      <p>${data.accountHolder}</p>
      <p>${data.branchName}</p>
      <p>(IFSC: ${data.ifsc})</p>
      <p>Account: ${maskedAcc}</p>
      <p>UPI ID: ${data.upiId}</p>
    `;

    editingCard.querySelector(".edit-btn").onclick = () => openPopup("edit", editingCard);
    closePopup();
  };

  function fillFields(card) {
    const p = card.querySelectorAll("p");
    bankName.value = p[0].textContent;
    accountHolder.value = p[1].textContent;
    branchName.value = p[2].textContent;
    ifsc.value = p[3].textContent.match(/\((.*?)\)/)[1].replace("IFSC: ", "");
    accountNumber.value = "";
    upiId.value = p[5].textContent.replace("UPI ID: ", "");
  }

  function clearFields() {
    document.querySelectorAll(".popup-content input").forEach(i => i.value = "");
    errorMsg.textContent = "";
  }

document.querySelector("#sidebar-main-vendor ul>li:nth-child(2)").classList.add("sidebar-active");

document.querySelector("#account-menu li:nth-child(8) .dropdown-header").classList.add("dropdown-header-active");