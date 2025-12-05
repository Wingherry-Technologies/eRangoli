
const mobileInput = document.getElementById("custumerLoginMobile");
const mobileError = document.getElementById("mobileError");
const otpInput = document.getElementById("custumerLoginOTP");
const otpError = document.getElementById("otpError");
const resendOtpBtn = document.getElementById("resendOtpBtn");
const otpTimerSpan = document.getElementById("otpTimer");
const form = document.getElementById("custumerLoginForm");
const mobileLabel = document.querySelector('label[for="custumerLoginMobile"]');
const otpLabel    = document.querySelector('label[for="custumerLoginOTP"]');
const correctOTP = "123456"; 

let otpTimerInterval = null;
let otpTimeLeft = 30;      
let wasMobileValid = false; 
// ---------- OTP TIMER FUNCTIONS ----------
function updateOtpTimerDisplay() {
    const m = String(Math.floor(otpTimeLeft / 60)).padStart(2, "0");
    const s = String(otpTimeLeft % 60).padStart(2, "0");
    otpTimerSpan.textContent = `${m}:${s}`;
}
function startOtpTimer() {
    // Always reset to 30 seconds
    otpTimeLeft = 30;
    updateOtpTimerDisplay();

    // Show timer UI, hide resend button
    otpTimerSpan.style.display = "inline";      
    resendOtpBtn.style.display = "none";       
    resendOtpBtn.disabled = true;              

    // Clear any previous interval
    if (otpTimerInterval) {
        clearInterval(otpTimerInterval);
        otpTimerInterval = null;
    }

    // Start countdown
    otpTimerInterval = setInterval(() => {
        otpTimeLeft--;
        if (otpTimeLeft >= 0) {
            updateOtpTimerDisplay();
        }

        if (otpTimeLeft <= 0) {
            clearInterval(otpTimerInterval);
            otpTimerInterval = null;
            otpTimerSpan.textContent = "00:00";
            otpTimerSpan.style.display = "none";    
            resendOtpBtn.style.display = "inline"; 
            resendOtpBtn.disabled = false;         
        }
    }, 1000);
}
// ---------- MOBILE VALIDATION ----------
const otpExtraRow = document.getElementById("otpExtraRow");

function validateMobile() {
    mobileInput.value = mobileInput.value.replace(/[^0-9]/g, "");
    const mobile = mobileInput.value.trim();
    const isValid = /^[6-9]\d{9}$/.test(mobile);

    if (!isValid) {
        mobileInput.classList.add("error");
        mobileError.style.display = "block";
        mobileLabel.classList.add("error");      
        otpExtraRow.style.display = "none";     
    } else {
        mobileInput.classList.remove("error");
        mobileError.style.display = "none";
        mobileLabel.classList.remove("error");   
        otpExtraRow.style.display = "flex";     

        if (!wasMobileValid) {
            startOtpTimer();
        }
    }

    wasMobileValid = isValid;
    return isValid;
}

// ---------- OTP VALIDATION ----------
function validateOTP() {
    otpInput.value = otpInput.value.replace(/[^0-9]/g, "");
    const otp = otpInput.value.trim();
    const isValid = /^\d{6}$/.test(otp);

    if (!isValid) {
        otpInput.classList.add("error");
        otpError.style.display = "block";
        otpLabel.classList.add("error");        
    } else {
        otpInput.classList.remove("error");
        otpError.style.display = "none";
        otpLabel.classList.remove("error");     
    }
    return isValid;
}


// Real-time validation
mobileInput.addEventListener("input", validateMobile);
otpInput.addEventListener("input", validateOTP);


resendOtpBtn.addEventListener("click", () => {
    startOtpTimer();
});

document.getElementById("custumerLoginSkip").addEventListener("click", function () {
    window.history.back();
});

// Form submit validation
form.addEventListener("submit", function (e) {
    const mobileOk = validateMobile();
    const otpOk = validateOTP();

    if(otpInput.value !== correctOTP) {
        otpInput.classList.add("error");
        otpError.style.display = "block";   
        otpLabel.classList.add("error");     
        e.preventDefault();
        return;
    }

    if (!mobileOk || !otpOk) {
        e.preventDefault();
    }
});

