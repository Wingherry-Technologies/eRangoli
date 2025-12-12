const upiSection=document.getElementById("upi-payment-method");
const netbankingSection=document.getElementById("netbanking-method");
const cardSection=document.getElementById("card-payment-method");

const cardList=document.getElementById("card-list");
const upiList=document.getElementById("upi-list");
const netbankingList=document.getElementById("netbanking-list");


upiList.addEventListener("click",function(){
    upiList.classList.add("active-option");
    cardList.classList.remove("active-option");
    netbankingList.classList.remove("active-option");
    upiSection.style.display="block";
    cardSection.style.display="none";
    netbankingSection.style.display="none";
});

cardList.addEventListener("click",function(){
    cardList.classList.add("active-option");
    upiList.classList.remove("active-option");
    netbankingList.classList.remove("active-option");
    cardSection.style.display="block";
    upiSection.style.display="none";
    netbankingSection.style.display="none";
});

netbankingList.addEventListener("click",function(){
    netbankingList.classList.add("active-option");
    upiList.classList.remove("active-option");
    cardList.classList.remove("active-option");
    netbankingSection.style.display="block";
    upiSection.style.display="none";
    cardSection.style.display="none";
});

// UPI validation and verification


const upiInput = document.getElementById("upiInput");
const upiBtn = document.getElementById("upiBtn");
const upiStatus = document.getElementById("upiStatus");

// List of valid UPI IDs & names
const validUpis = [
    { upi: "rahul@upi", name: "Rahul Sharma" },
    { upi: "test123@okicici", name: "Amit Kumar" },
    { upi: "john.doe@oksbi", name: "John Doe" },
    { upi: "myshop@okhdfcbank", name: "Shop Payment" }
];

// UPI validation pattern
const upiPattern = /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/;


// Input listener
upiInput.addEventListener("input", () => {
    const upi = upiInput.value.trim();

    upiBtn.textContent = "Verify & Pay";
    upiBtn.disabled = true;
    upiStatus.style.display = "none";

    if (upiPattern.test(upi)) {
        upiBtn.disabled = false;
    }
});


// Button click listener
upiBtn.addEventListener("click", () => {
    const enteredUpi = upiInput.value.trim();

    // If already verified → this click means "Pay"
    if (upiBtn.textContent === "Pay") {
        alert("Payment Successful!");

        // Reset everything
        upiInput.value = "";
        upiStatus.style.display = "none";
        upiBtn.textContent = "Verify & Pay";
        upiBtn.disabled = true;

        return;
    }

    // Normal verify process
    if (!upiPattern.test(enteredUpi)) {
        upiStatus.textContent = "Invalid UPI ID format";
        upiStatus.className = "upi-status error";
        upiStatus.style.display = "block";
        return;
    }

    const matched = validUpis.find(
        item => item.upi.toLowerCase() === enteredUpi.toLowerCase()
    );

    if (!matched) {
        upiStatus.textContent = "UPI not found! Please check the ID.";
        upiStatus.className = "upi-status error";
        upiStatus.style.display = "block";
        return;
    }

    // Success
    upiStatus.textContent = `UPI Verified: ${matched.name}`;
    upiStatus.className = "upi-status success";
    upiStatus.style.display = "block";

    // Change button to Pay mode
    upiBtn.textContent = "Pay";
});




// Card payment validation
const cardName = document.getElementById("cardName");
const cardNumber = document.getElementById("cardNumber");
const cardExpiry = document.getElementById("cardExpiry");
const cardCVV = document.getElementById("cardCVV");

const nameError = document.getElementById("nameError");
const numberError = document.getElementById("cardNumberError");
const expiryError = document.getElementById("expiryError");
const cvvError = document.getElementById("cvvError");

const payBtn = document.getElementById("payBtn");


/* ------------ NAME VALIDATION ------------ */
cardName.addEventListener("input", () => {
    if (cardName.value.startsWith(" ")) {
        cardName.value = cardName.value.trimStart();
    }
    cardName.value = cardName.value.replace(/[^a-zA-Z ]/g, "");
    nameError.textContent = "";
});


/* ------------ CARD NUMBER VALIDATION ------------ */
cardNumber.addEventListener("input", () => {
    cardNumber.value = cardNumber.value.replace(/\D/g, "");
    numberError.textContent = "";
});


/* ------------ EXPIRY INPUT AUTO FORMAT ------------ */
cardExpiry.addEventListener("input", () => {
    let value = cardExpiry.value.replace(/[^0-9]/g, "");
    if (value.length >= 3) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    cardExpiry.value = value;
    expiryError.textContent = "";
});


/* ------------ CVV VALIDATION ------------ */
cardCVV.addEventListener("input", () => {
    cardCVV.value = cardCVV.value.replace(/\D/g, "");
    cvvError.textContent = "";
});


/* ------------ ON PAY CLICK ------------ */
payBtn.addEventListener("click", () => {
    let valid = true;

    // Clear old errors
    nameError.textContent = "";
    numberError.textContent = "";
    expiryError.textContent = "";
    cvvError.textContent = "";

    /* --- Basic validation --- */
    if (cardName.value.trim() === "") {
        nameError.textContent = "Enter a valid name";
        valid = false;
    }

    if (cardNumber.value.length !== 16) {
        numberError.textContent = "Card number must be 16 digits";
        valid = false;
    }

    if (cardExpiry.value.length !== 5 || !cardExpiry.value.includes("/")) {
        expiryError.textContent = "Enter valid expiry (MM/YY)";
        valid = false;
    }

    if (cardCVV.value.length !== 3) {
        cvvError.textContent = "CVV must be 3 digits";
        valid = false;
    }

    if (!valid) return;


    /* --- Dummy card data --- */
    const dummyCards = [
        { number: "0000000000000000", expiry: "00/00", cvv: "000" },
        { number: "1111111111111111", expiry: "11/11", cvv: "111" },
        { number: "2222222222222222", expiry: "22/22", cvv: "222" }
    ];

    /* --- Check if input matches any dummy card --- */
    const match = dummyCards.find(card =>
        card.number === cardNumber.value &&
        card.expiry === cardExpiry.value &&
        card.cvv === cardCVV.value
    );

    if (match) {
        alert("Payment Details Validated Successfully!");
        console.log("Matched dummy card:", match);

        // ✅ Reset all inputs and errors
        cardName.value = "";
        cardNumber.value = "";
        cardExpiry.value = "";
        cardCVV.value = "";

        nameError.textContent = "";
        numberError.textContent = "";
        expiryError.textContent = "";
        cvvError.textContent = "";

        return;
    }

    /* --- If no match → show error messages --- */
    numberError.textContent = "Card number does not match any valid card";
    expiryError.textContent = "Expiry date does not match";
    cvvError.textContent = "CVV does not match";
});







// Bank search functionality

document.getElementById('bankSearch').addEventListener('input', function(event) {
    let searchQuery = event.target.value.toLowerCase();
    filterBanks(searchQuery);
});

function filterBanks(query) {
    let commonBanks = document.querySelectorAll('#commonBanksList li');
    let allBanks = document.querySelectorAll('#allBanksList li');

    // Filter common banks
    commonBanks.forEach(function(bank) {
        let bankName = bank.querySelector('.bank-name span').textContent.toLowerCase();
        if (bankName.includes(query)) {
            bank.style.display = 'flex';
        } else {
            bank.style.display = 'none';
        }
    });

    // Filter all banks
    allBanks.forEach(function(bank) {
        let bankName = bank.querySelector('.bank-name span').textContent.toLowerCase();
        if (bankName.includes(query)) {
            bank.style.display = 'flex';
        } else {
            bank.style.display = 'none';
        }
    });
}
