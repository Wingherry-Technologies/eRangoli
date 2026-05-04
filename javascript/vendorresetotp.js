const correctOtp = "123456";

  const inputs = document.querySelectorAll(".vendorLoginOtpInput");
  const btn = document.getElementById("vendorLoginButton");
  const errEl = document.getElementById("vendorLoginError");
  const successEl = document.getElementById("vendorLoginSuccess");
  const resendBtn = document.getElementById("vendorLoginResendBtn");

  let timerVal = 31;
  let timerInterval = null;

  function startTimer() {
    clearInterval(timerInterval);
    timerVal = 31;
    resendBtn.disabled = true;
    timerInterval = setInterval(function () {
      timerVal--;
      const m = String(Math.floor(timerVal / 60)).padStart(2, "0");
      const s = String(timerVal % 60).padStart(2, "0");
      resendBtn.textContent = m + ":" + s;
      if (timerVal <= 0) {
        clearInterval(timerInterval);
        resendBtn.disabled = false;
        resendBtn.textContent = "Resend";
      }
    }, 1000);
  }

  startTimer();

  resendBtn.addEventListener("click", function () {
    if (!resendBtn.disabled) {
      inputs.forEach(function (i) {
        i.value = "";
        i.className = "vendorLoginOtpInput";
      });
      errEl.style.display = "none";
      successEl.style.display = "none";
      btn.style.background = "#a10404";
      btn.textContent = "Verify & Proceed";
      btn.disabled = false;
      inputs[0].focus();
      startTimer();
    }
  });

  inputs.forEach(function (input, idx) {
    input.addEventListener("focus", function () {
      this.style.borderBottomColor = "#a10404";
    });
    input.addEventListener("blur", function () {
      if (!this.value) this.style.borderBottomColor = "#d0d0d0";
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Backspace") {
        if (this.value) {
          this.value = "";
        } else if (idx > 0) {
          inputs[idx - 1].focus();
          inputs[idx - 1].value = "";
        }
        errEl.style.display = "none";
        successEl.style.display = "none";
      }
    });
    input.addEventListener("input", function () {
      const val = this.value.replace(/[^0-9]/g, "");
      this.value = val ? val[val.length - 1] : "";
      if (this.value && idx < inputs.length - 1) {
        inputs[idx + 1].focus();
      }
      errEl.style.display = "none";
      successEl.style.display = "none";
    });
    input.addEventListener("paste", function (e) {
      e.preventDefault();
      const pasted = (e.clipboardData || window.clipboardData)
        .getData("text").replace(/[^0-9]/g, "");
      pasted.split("").forEach(function (ch, i) {
        if (inputs[idx + i]) inputs[idx + i].value = ch;
      });
      const nextIdx = Math.min(idx + pasted.length, inputs.length - 1);
      inputs[nextIdx].focus();
    });
  });

  inputs[0].focus();

  btn.addEventListener("click", function () {
    const entered = Array.from(inputs).map(i => i.value).join("");
    if (entered.length < 6) {
      errEl.textContent = "Please enter all 6 digits.";
      errEl.style.display = "block";
      successEl.style.display = "none";
      return;
    }
    if (entered === correctOtp) {
        errEl.style.display = "none";
        successEl.style.display = "block";
        inputs.forEach(i => i.classList.add("vendorLoginInputSuccess"));
        btn.style.background = "#1aa329";
        btn.textContent = "Verified!";
        btn.disabled = true;

        setTimeout(function () {
            window.location.href = "../html/vendorresetpassword.html";
        }, 2000);
    } else {
      successEl.style.display = "none";
      errEl.textContent = "Incorrect OTP. Please try again.";
      errEl.style.display = "block";
      inputs.forEach(i => i.classList.add("vendorLoginInputError"));
      inputs[0].focus();
    }
  });