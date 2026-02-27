/* ================= PAYMENT METHOD SWITCH ================= */

const upiSection = document.getElementById("VSPG-upi-payment-method");
const netbankingSection = document.getElementById("VSPG-netbanking-method");
const cardSection = document.getElementById("VSPG-card-payment-method");

const cardList = document.getElementById("VSPG-card-list");
const upiList = document.getElementById("VSPG-upi-list");
const netbankingList = document.getElementById("VSPG-netbanking-list");

upiList.addEventListener("click", () => {
    upiList.classList.add("VSPG-active-option");
    cardList.classList.remove("VSPG-active-option");
    netbankingList.classList.remove("VSPG-active-option");

    upiSection.style.display = "block";
    cardSection.style.display = "none";
    netbankingSection.style.display = "none";
});

cardList.addEventListener("click", () => {
    cardList.classList.add("VSPG-active-option");
    upiList.classList.remove("VSPG-active-option");
    netbankingList.classList.remove("VSPG-active-option");

    cardSection.style.display = "block";
    upiSection.style.display = "none";
    netbankingSection.style.display = "none";
});

netbankingList.addEventListener("click", () => {
    netbankingList.classList.add("VSPG-active-option");
    upiList.classList.remove("VSPG-active-option");
    cardList.classList.remove("VSPG-active-option");

    netbankingSection.style.display = "block";
    upiSection.style.display = "none";
    cardSection.style.display = "none";
});


/* ================= MODALS ================= */

const processingModal = document.getElementById("VSPG-processing-modal");
const successModal = document.getElementById("VSPG-success-modal");
const failedModal = document.getElementById("VSPG-failed-modal");
const cancelBtn = processingModal.querySelector("button");

let isCancelled = false;
let processingTimeout;


function startPaymentProcess() {
    isCancelled = false;

    processingModal.style.display = "flex";

    processingTimeout = setTimeout(() => {
        processingModal.style.display = "none";
        showSuccessModal();
    }, 5000);
}


cancelBtn.addEventListener("click", () => {
    isCancelled = true;

    // ❌ Stop processing timer
    clearTimeout(processingTimeout);

    // ❌ Hide processing modal immediately
    processingModal.style.display = "none";

    // ✅ Show failed modal immediately
    showFailedModal();
});


function showFailedModal() {
    failedModal.style.display = "flex";

    setTimeout(() => {
        window.location.href='../html/vendorDashboard.html'
    }, 5000);
}

document.getElementById("VSPG-try-again").addEventListener("click",()=>{
    failedModal.style.display = "none";
})

function showSuccessModal() {
    successModal.style.display = "flex";

    setTimeout(() => {
        successModal.style.display = "none";
        window.location.href = "../html/vendorDashboard.html";
    }, 3000);
}


/* ================= UPI VALIDATION ================= */

const upiInput = document.getElementById("VSPG-upiInput");
const upiBtn = document.getElementById("VSPG-upiBtn");
const upiStatus = document.getElementById("VSPG-upiStatus");

const validUpis = [
    { upi: "rahul@upi", name: "Rahul Sharma" },
    { upi: "test123@okicici", name: "Amit Kumar" },
    { upi: "john.doe@oksbi", name: "John Doe" },
    { upi: "myshop@okhdfcbank", name: "Shop Payment" }
];

const upiPattern = /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/;

upiInput.addEventListener("input", () => {
    upiBtn.textContent = "Verify & Pay";
    upiBtn.disabled = !upiPattern.test(upiInput.value.trim());
    upiStatus.style.display = "none";
});

upiBtn.addEventListener("click", () => {
    const enteredUpi = upiInput.value.trim();

    if (upiBtn.textContent === "Pay") {
        startPaymentProcess();
        upiInput.value = "";
        upiBtn.textContent = "Verify & Pay";
        upiBtn.disabled = true;
        upiStatus.style.display = "none";
        return;
    }

    const match = validUpis.find(
        item => item.upi.toLowerCase() === enteredUpi.toLowerCase()
    );

    if (!match) {
        upiStatus.textContent = "UPI not found!";
        upiStatus.className = "VSPG-upi-status VSPG-error";
        upiStatus.style.display = "block";
        return;
    }

    upiStatus.textContent = `UPI Verified: ${match.name}`;
    upiStatus.className = "VSPG-upi-status VSPG-success";
    upiStatus.style.display = "block";
    upiBtn.textContent = "Pay";
});


/* ================= CARD PAYMENT ================= */

const cardName = document.getElementById("VSPG-cardName");
const cardNumber = document.getElementById("VSPG-cardNumber");
const cardExpiry = document.getElementById("VSPG-cardExpiry");
const cardCVV = document.getElementById("VSPG-cardCVV");

const nameError = document.getElementById("VSPG-nameError");
const numberError = document.getElementById("VSPG-cardNumberError");
const expiryError = document.getElementById("VSPG-expiryError");
const cvvError = document.getElementById("VSPG-cvvError");
const payBtn = document.getElementById("VSPG-payBtn");

cardName.addEventListener("input", () => {
    cardName.value = cardName.value.replace(/[^a-zA-Z ]/g, "");
    nameError.textContent = "";
});

cardNumber.addEventListener("input", () => {
    cardNumber.value = cardNumber.value.replace(/\D/g, "");
    numberError.textContent = "";
});

cardExpiry.addEventListener("input", () => {
    let v = cardExpiry.value.replace(/\D/g, "");
    if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2, 4);
    cardExpiry.value = v;
    expiryError.textContent = "";
});

cardCVV.addEventListener("input", () => {
    cardCVV.value = cardCVV.value.replace(/\D/g, "");
    cvvError.textContent = "";
});

payBtn.addEventListener("click", () => {
    nameError.textContent = numberError.textContent = expiryError.textContent = cvvError.textContent = "";

    if (
        cardName.value === "" ||
        cardNumber.value.length !== 16 ||
        cardExpiry.value.length !== 5 ||
        cardCVV.value.length !== 3
    ) return;

    const dummyCards = [
        { number: "0000000000000000", expiry: "00/00", cvv: "000" },
        { number: "1111111111111111", expiry: "11/11", cvv: "111" },
        { number: "2222222222222222", expiry: "22/22", cvv: "222" }
    ];

    const match = dummyCards.find(c =>
        c.number === cardNumber.value &&
        c.expiry === cardExpiry.value &&
        c.cvv === cardCVV.value
    );

    if (match) {
        startPaymentProcess();
        cardName.value = cardNumber.value = cardExpiry.value = cardCVV.value = "";
    }
});


/* ================= BANK SEARCH ================= */

document.getElementById("VSPG-bankSearch").addEventListener("input", e => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll("#VSPG-commonBanksList li, #VSPG-allBanksList li").forEach(bank => {
        const name = bank.querySelector(".VSPG-bank-name span").textContent.toLowerCase();
        bank.style.display = name.includes(q) ? "flex" : "none";
    });
});